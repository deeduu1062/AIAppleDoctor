// Seb Saathi — photo diagnosis (Vercel serverless function)
// POST /api/diagnose  { images: [dataUrl or base64 jpeg, ...1-3], part, note, lang }
// Header: Authorization: Bearer <Supabase access token of the signed-in grower>
//
// Needs in Vercel → Settings → Environment Variables:
//   ANTHROPIC_API_KEY   (required)
//   ANTHROPIC_MODEL     (optional, default below)
//   DAILY_LIMIT         (optional, photo checks per grower per day, default 5)
// Needs the "diagnoses" table from supabase/diagnoses.sql.

const SB_URL = "https://rylqzyylbsephirwslce.supabase.co";
const SB_KEY = "sb_publishable_EYVtP0ljYd-jta5ENmX9Jg_mCtYLzJo"; // public key, same as the website
const MODEL = process.env.ANTHROPIC_MODEL || "claude-sonnet-5-5";
const LIMIT = Math.max(1, parseInt(process.env.DAILY_LIMIT || "5", 10) || 5);
const ADMIN_EMAILS = ["deeduu@gmail.com", "admin@sebsaathi.com"];
const ADMIN_LIMIT = 50;

const IDS = ["scab", "mars", "alt", "pm", "sooty", "pit", "canker", "collar", "wrr", "woolly", "mite", "sjs", "borer", "other", "healthy"];
const PARTS = ["leaf", "fruit", "bark", "tree"];

const SYSTEM = `You are "Seb Saathi", helping apple growers in Himachal Pradesh and Kashmir (mostly Royal Delicious and other Delicious types, also spur types and Gala on clonal rootstocks, grown at roughly 1,500 to 2,700 m).

Look at the grower's photo(s) and say what the most likely problem is. Choose ids ONLY from this list:
scab = apple scab (Venturia): olive to black velvety spots on leaves, dark corky scabby spots and cracks on fruit
mars = premature leaf fall / Marssonina blotch: dark brown to blackish patches on upper leaf surface, leaves yellow and fall early, mostly July–September after monsoon rain
alt = Alternaria leaf spot/blotch: small round brown or purple-bordered spots, sometimes with rings, in summer/monsoon
pm = powdery mildew: white powdery coating on young leaves, shoots and blossoms; leaves narrow and curled
sooty = sooty blotch and flyspeck: dark smudges or clusters of tiny black dots on fruit skin only
pit = bitter pit (calcium disorder): small sunken brown spots on fruit, brown spongy tissue just under the skin, often at the calyx end
canker = bark cankers (e.g. smoky blight, papery bark, Nectria): sunken, cracked, discoloured or peeling bark patches, dieback of branches
collar = collar rot (Phytophthora): bark rotting and darkening at the trunk base near soil, tree declining
wrr = white root rot (Dematophora): white fungal threads/fans on roots, tree with small yellow leaves, slow decline or sudden collapse
woolly = woolly apple aphid: white cottony masses on twigs, pruning cuts or roots, with swellings
mite = red spider / European red mite: dull, bronzed or speckled leaves, tiny red dots on leaf underside, fine webbing
sjs = San Jose scale: grey crusty scales on bark/twigs, small red-ringed spots on fruit
borer = stem or root borer: holes in trunk/branches with sawdust-like frass, or wilting from root damage
other = a different problem (e.g. hail, nutrient deficiency, spray burn, frost, sunburn, other pest) — explain in "why"
healthy = no clear problem visible

Rules:
- Be honest about uncertainty. Give 1 to 3 matches, best first, with confidence "high", "medium" or "low". Use "high" only when the signs are clear and typical.
- If the photo is blurry, too far, too dark, or not an apple tree/fruit, set photo_ok to false and explain what photo to take instead.
- NEVER name chemicals, products, brands or doses, and never invent a spray. For anything to spray, say to follow the official Himachal Pradesh apple spray schedule for the tree's current stage and the product label.
- Next steps must be practical things a grower can do: sanitation, pruning, drainage, checking more trees, taking a better photo, contacting the horticulture officer or KVK.
- Set see_expert to true for root/collar problems, fast spreading problems, or when you are unsure.
- Write "why", "summary", "photo_issue" and "next_steps" in LANGUAGE, short and simple, for a farmer. Hindi means simple Devanagari Hindi; common English farm words (spray, scab, KVK) are fine.

Reply with ONLY this JSON, no other text:
{"photo_ok":true,"photo_issue":"","matches":[{"id":"scab","confidence":"medium","why":"..."}],"summary":"...","next_steps":["..."],"see_expert":false}`;

function send(res, code, obj) {
  res.statusCode = code;
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(obj));
}

function sbHeaders(token, extra) {
  return Object.assign({ apikey: SB_KEY, Authorization: "Bearer " + token, "Content-Type": "application/json" }, extra || {});
}

// Start of today in India (IST, UTC+5:30), as an ISO string
function istDayStart() {
  const off = 330 * 60000, day = 86400000;
  return new Date(Math.floor((Date.now() + off) / day) * day - off).toISOString();
}

function parseJson(text) {
  const a = text.indexOf("{"), b = text.lastIndexOf("}");
  if (a < 0 || b <= a) return null;
  try { return JSON.parse(text.slice(a, b + 1)); } catch (e) { return null; }
}

function clean(r) {
  const str = (v, n) => String(v == null ? "" : v).slice(0, n);
  const conf = ["high", "medium", "low"];
  const matches = (Array.isArray(r.matches) ? r.matches : [])
    .filter(m => m && IDS.includes(m.id))
    .slice(0, 3)
    .map(m => ({ id: m.id, confidence: conf.includes(m.confidence) ? m.confidence : "low", why: str(m.why, 400) }));
  return {
    photo_ok: r.photo_ok !== false,
    photo_issue: str(r.photo_issue, 300),
    matches,
    summary: str(r.summary, 600),
    next_steps: (Array.isArray(r.next_steps) ? r.next_steps : []).slice(0, 6).map(s => str(s, 300)),
    see_expert: !!r.see_expert
  };
}

module.exports = async (req, res) => {
  if (req.method !== "POST") return send(res, 405, { error: "method" });
  if (!process.env.ANTHROPIC_API_KEY) return send(res, 503, { error: "not_setup" });

  // 1. Who is asking? (must be signed in)
  const auth = String(req.headers.authorization || "");
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";
  if (!token) return send(res, 401, { error: "signin" });
  let user;
  try {
    const u = await fetch(SB_URL + "/auth/v1/user", { headers: sbHeaders(token) });
    if (!u.ok) return send(res, 401, { error: "signin" });
    user = await u.json();
  } catch (e) { return send(res, 502, { error: "auth_down" }); }

  // 2. Check the request
  let body = req.body;
  if (typeof body === "string") { try { body = JSON.parse(body); } catch (e) { body = null; } }
  if (!body || !Array.isArray(body.images) || body.images.length < 1 || body.images.length > 3) return send(res, 400, { error: "photos" });
  const images = [];
  for (const im of body.images) {
    const m = /^(?:data:(image\/(?:jpeg|png|webp));base64,)?([A-Za-z0-9+/=]+)$/.exec(String(im || ""));
    if (!m || m[2].length > 1200000) return send(res, 400, { error: "photos" });
    images.push({ type: m[1] || "image/jpeg", data: m[2] });
  }
  const part = PARTS.includes(body.part) ? body.part : "";
  const note = String(body.note || "").slice(0, 400);
  const lang = body.lang === "hi" || body.lang === "hn" ? body.lang : "en";

  // 3. Daily limit (counts this grower's checks today, India time)
  const isAdmin = ADMIN_EMAILS.includes(String(user.email || "").toLowerCase());
  const limit = isAdmin ? ADMIN_LIMIT : LIMIT;
  try {
    const c = await fetch(SB_URL + "/rest/v1/diagnoses?select=id&created_at=gte." + encodeURIComponent(istDayStart()), { headers: sbHeaders(token) });
    if (!c.ok) return send(res, 503, { error: "not_setup" });
    const rows = await c.json();
    if (rows.length >= limit) return send(res, 429, { error: "limit", limit });
  } catch (e) { return send(res, 502, { error: "db_down" }); }

  // 4. Ask the AI
  const partWord = { leaf: "leaves", fruit: "fruit", bark: "branch, bark or trunk", tree: "whole tree or roots" }[part] || "not said";
  const userText = "Part of the tree in the photo: " + partWord + ".\n" +
    (note ? "Grower's note: " + note + "\n" : "") +
    "LANGUAGE: " + (lang === "hi" ? "Hindi" : lang === "hn" ? "Hinglish (simple Hindi written in English/Roman letters, like \"Patton par kaale daag hain\")" : "English");
  let result;
  try {
    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "x-api-key": process.env.ANTHROPIC_API_KEY, "anthropic-version": "2023-06-01", "content-type": "application/json" },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 1200,
        system: SYSTEM,
        messages: [{
          role: "user",
          content: images.map(im => ({ type: "image", source: { type: "base64", media_type: im.type, data: im.data } }))
            .concat([{ type: "text", text: userText }])
        }]
      })
    });
    if (!r.ok) { console.error("ai", r.status, await r.text()); return send(res, 502, { error: "ai" }); }
    const j = await r.json();
    const text = (j.content || []).filter(b => b.type === "text").map(b => b.text).join("");
    const parsed = parseJson(text);
    if (!parsed) { console.error("ai-json", text.slice(0, 500)); return send(res, 502, { error: "ai" }); }
    result = clean(parsed);
  } catch (e) { console.error("ai-fail", e); return send(res, 502, { error: "ai" }); }

  // 5. Save the check (counts toward the limit; grower can mark it right or wrong later)
  let id = null;
  try {
    const ins = await fetch(SB_URL + "/rest/v1/diagnoses", {
      method: "POST",
      headers: sbHeaders(token, { Prefer: "return=representation" }),
      body: JSON.stringify({ user_id: user.id, part, note, lang, photos: images.length, result })
    });
    if (ins.ok) { const rows = await ins.json(); id = rows && rows[0] && rows[0].id; }
    else console.error("save", ins.status, await ins.text());
  } catch (e) { console.error("save-fail", e); }

  return send(res, 200, { id, result });
};
