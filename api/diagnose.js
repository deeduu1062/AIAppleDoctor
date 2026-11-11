// Seb Saathi — photo diagnosis (Vercel serverless function)
// POST /api/diagnose  { images: [dataUrl or base64 jpeg, ...1-3], part, note, lang }
// Header: Authorization: Bearer <Supabase access token of the signed-in grower>
//
// Needs in Vercel → Settings → Environment Variables:
//   ANTHROPIC_API_KEY   (required)
//   ANTHROPIC_MODEL     (optional, default below)
//   OWN_MODEL_URL       (optional, later) Seb Saathi's own trained model. When set, it is asked first and its answer is
//   OWN_MODEL_KEY       (optional)        given to the big AI as a second opinion; both answers are saved in model_votes.
//                       Contract: POST {images:[{type,data(base64)}], part, stage} → {model:"name", predictions:[{id:"scab", score:0.91}, ...]}
//                       ids from the IDS list below. Nothing else changes when the model is swapped or retrained.
//   Photo checks per calendar month (India time) by plan: free 3, Saathi 15, Saathi Plus 50 (see PLAN_LIMIT).
// Needs the "diagnoses" table from supabase/diagnoses.sql.

const SB_URL = "https://rylqzyylbsephirwslce.supabase.co";
const SB_KEY = "sb_publishable_EYVtP0ljYd-jta5ENmX9Jg_mCtYLzJo"; // public key, same as the website
const MODEL = process.env.ANTHROPIC_MODEL || "claude-sonnet-5-5";
const PLAN_LIMIT = { free: 3, basic: 15, premium: 50 };   /* photo checks a month; keep in step with the plans page */
const ADMIN_EMAILS = ["deeduu@gmail.com", "admin@sebsaathi.com"];
const ADMIN_LIMIT = 50;

const IDS = ["scab", "mars", "alt", "pm", "sooty", "pit", "canker", "collar", "wrr", "woolly", "mite", "sjs", "borer", "rborer", "brot", "core", "mosaic", "miner", "thrips", "zn", "bor", "hail", "sburn", "other", "healthy"];
const PARTS = ["leaf", "fruit", "bark", "tree"];
const SEV = ["mild", "moderate", "severe"];
const STAGES = { st1: "dormant", st2: "green tip", st3: "pink bud", st4: "full bloom", st5: "petal fall", st6: "fruit set", st7: "fruit growth", st8: "pre-harvest", st9: "after harvest / leaf fall" };
const BUCKET = "dx-photos";

const SYSTEM = `You are "Seb Saathi", helping apple growers in Himachal Pradesh, Jammu & Kashmir and Uttarakhand (mostly Royal Delicious and other Delicious types, also spur types and Gala on clonal rootstocks, grown at roughly 1,500 to 2,700 m).

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
borer = stem borer: holes in trunk/branches with fresh sawdust-like frass, branches above may wilt or break
rborer = root borer: tree wilting, yellowing and declining with no trunk holes; big white grubs tunnelling in the roots
brot = brown rot / fruit rot: soft brown rot on fruit spreading fast, often with grey or buff spore rings; shrivelled mummified fruit; near harvest and in storage
core = core rot / mouldy core: fruit looks fine outside but the core is mouldy or brown when cut; early colouring or drop
mosaic = apple mosaic virus: bright cream or yellow patches, rings or vein bands on leaves, mostly spring leaves
miner = leaf miner: winding silvery or white trails or blotch mines inside leaves
thrips = blossom thrips: tiny thin insects in flowers, browned or scarred petals, rough russet scars on young fruit
zn = zinc shortage (little leaf / rosette): small narrow leaves bunched at shoot tips, short shoots, yellowing between veins
bor = boron shortage: brown corky patches inside or on fruit, cracked or misshapen fruit, shoot tip dieback (bitter pit is just under the skin; boron cork is spread through the flesh)
hail = hail damage: dents, bruises and wounds on fruit, torn or holed leaves, bark wounds, mostly on one side
sburn = spray burn / chemical injury: scorched leaf edges or spots, or russet on fruit, a few days after a spray, often even over many trees
other = a different problem not in this list (e.g. frost, sunburn, another nutrient shortage, another pest) — explain in "why"
healthy = no clear problem visible

Also say how bad it looks on what is visible: "severity" is "mild" (a few spots), "moderate" (clearly spreading on this part) or "severe" (heavy damage, many leaves/fruit, or a tree at risk). Leave it "" for healthy or unclear photos.
Give "name": a short disease name in LANGUAGE for every match (for apple ids too).

Rules:
- Be honest about uncertainty. Give 1 to 3 matches, best first, with confidence "high", "medium" or "low". Use "high" only when the signs are clear and typical.
- If the photo is blurry, too far, too dark, or not an apple tree/fruit, set photo_ok to false and explain what photo to take instead.
- NEVER name chemicals, products, brands or doses, and never invent a spray. For anything to spray, say to follow the official apple spray schedule of the grower's state (Himachal Pradesh, Jammu & Kashmir or Uttarakhand) for the tree's current stage and the product label.
- Next steps must be practical things a grower can do: sanitation, pruning, drainage, checking more trees, taking a better photo, contacting the horticulture officer or KVK.
- Set see_expert to true for root/collar problems (including root borer), fast spreading problems, or when you are unsure.
- "recheck_days": in how many days the grower should look at the same trees again to see if it is spreading or getting better (3 to 21; sooner for fast or severe problems).
- If a "Second opinion from Seb Saathi's own model" is given, weigh it with what you see. It is trained on local photos but can be wrong; the photo decides.
- The grower is shown only the first (most likely) match, so write "summary" and "next_steps" about that one problem only; do not list other possibilities there.
- LANGUAGE is the language the grower selected on the website. Write "name", "why", "summary", "photo_issue" and "next_steps" ONLY in LANGUAGE, even if the grower's note or the orchard record is in another language. Short and simple, for a farmer. Hindi means simple Devanagari Hindi; Hinglish means simple Hindi written in English letters; English means simple English. Common English farm words (spray, scab, KVK) are fine.

Reply with ONLY this JSON, no other text:
{"photo_ok":true,"photo_issue":"","matches":[{"id":"scab","name":"...","confidence":"medium","why":"..."}],"severity":"mild","summary":"...","next_steps":["..."],"see_expert":false,"recheck_days":7}`;

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
    .map(m => ({ id: m.id, name: str(m.name, 80), confidence: conf.includes(m.confidence) ? m.confidence : "low", why: str(m.why, 400) }));
  return {
    photo_ok: r.photo_ok !== false,
    photo_issue: str(r.photo_issue, 300),
    matches,
    summary: str(r.summary, 600),
    next_steps: (Array.isArray(r.next_steps) ? r.next_steps : []).slice(0, 6).map(s => str(s, 300)),
    see_expert: !!r.see_expert,
    severity: SEV.includes(r.severity) ? r.severity : "",
    recheck_days: Math.max(3, Math.min(21, Math.round(+r.recheck_days) || 7))
  };
}

/* the grower's plan: latest approved payment that is still valid (India date) */
async function planOf(token, userId) {
  try {
    const today = new Date(Date.now() + 330 * 60000).toISOString().slice(0, 10);
    const r = await fetch(SB_URL + "/rest/v1/payments?select=plan&user_id=eq." + encodeURIComponent(userId) + "&status=eq.approved&valid_until=gte." + today + "&order=valid_until.desc&limit=5", { headers: sbHeaders(token) });
    if (!r.ok) return "free";
    const rows = await r.json();
    return (rows || []).some(x => x.plan === "premium") ? "premium" : (rows || []).some(x => x.plan === "basic") ? "basic" : "free";
  } catch (e) { return "free"; }
}
function istMonthStart() {
  const d = new Date(Date.now() + 330 * 60000);
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), 1) - 330 * 60000).toISOString();
}

/* ---- the chosen orchard's record, so the AI can weigh the photo against variety, sprays, weather, soil and past problems ---- */
const n0 = v => { const x = parseFloat(v); return isFinite(x) ? x : 0; };
const clip = (t, k) => String(t || "").replace(/\s+/g, " ").trim().slice(0, k);
const istToday = () => new Date(Date.now() + 330 * 60000).toISOString().slice(0, 10);
const daysAgo = (d, today) => { const a = Date.parse(d + "T00:00:00Z"), b = Date.parse(today + "T00:00:00Z"); return isFinite(a) && isFinite(b) ? Math.round((b - a) / 864e5) : null; };
const SOIL = { ph: "pH", ec: "EC", oc: "organic carbon %", n: "N", p: "P", k: "K", s: "S", zn: "Zn", fe: "Fe", cu: "Cu", mn: "Mn", b: "B" };
async function weatherLines(P, sum) {
  if (!isFinite(parseFloat(P.lat)) || !isFinite(parseFloat(P.lon))) return "";
  try {
    const ac = new AbortController(), t = setTimeout(() => ac.abort(), 3500);
    const r = await fetch("https://api.open-meteo.com/v1/forecast?latitude=" + (+P.lat) + "&longitude=" + (+P.lon) +
      "&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,relative_humidity_2m_mean&past_days=10&forecast_days=4&timezone=Asia%2FKolkata", { signal: ac.signal });
    clearTimeout(t);
    if (!r.ok) return "";
    const d = (await r.json()).daily; if (!d || !d.time) return "";
    const today = istToday(), past = [], next = [];
    d.time.forEach((day, i) => {
      const line = day.slice(5) + " " + Math.round(n0(d.temperature_2m_min[i])) + "-" + Math.round(n0(d.temperature_2m_max[i])) + "C rain " + n0(d.precipitation_sum[i]).toFixed(1) + "mm" +
        (d.relative_humidity_2m_mean ? " RH " + Math.round(n0(d.relative_humidity_2m_mean[i])) + "%" : "");
      (day < today ? past : next).push(line);
    });
    if (sum) {   /* last 7 days before today, for the training record */
      const ix = d.time.map((day, i) => i).filter(i => d.time[i] < today).slice(-7);
      const avg = a => ix.length ? Math.round(ix.reduce((t, i) => t + n0(a[i]), 0) / ix.length * 10) / 10 : null;
      sum.rain7 = Math.round(ix.reduce((t, i) => t + n0(d.precipitation_sum[i]), 0) * 10) / 10;
      sum.wet_days7 = ix.filter(i => n0(d.precipitation_sum[i]) >= 1).length;
      sum.rh7 = d.relative_humidity_2m_mean ? avg(d.relative_humidity_2m_mean) : null;
      sum.tmax7 = avg(d.temperature_2m_max); sum.tmin7 = avg(d.temperature_2m_min);
      sum.rain_next3 = Math.round(d.time.map((day, i) => i).filter(i => d.time[i] >= today).slice(0, 3).reduce((t, i) => t + n0(d.precipitation_sum[i]), 0) * 10) / 10;
    }
    return "Weather, last 10 days: " + past.join("; ") + "\nForecast: " + next.join("; ");
  } catch (e) { return ""; }
}
async function orchardContext(token, userId, oid) {
  if (!oid) return { text: "", name: "", ctx: null };
  let data = null, checks = [];
  try {
    const ac = new AbortController(), t = setTimeout(() => ac.abort(), 3500);
    const [lr, dr] = await Promise.all([
      fetch(SB_URL + "/rest/v1/ledgers?select=data&user_id=eq." + encodeURIComponent(userId), { headers: sbHeaders(token), signal: ac.signal }),
      fetch(SB_URL + "/rest/v1/diagnoses?select=created_at,part,result,feedback&user_id=eq." + encodeURIComponent(userId) + "&orchard_id=eq." + encodeURIComponent(oid) + "&order=created_at.desc&limit=6", { headers: sbHeaders(token), signal: ac.signal })
    ]);
    clearTimeout(t);
    if (lr.ok) { const rows = await lr.json(); data = rows && rows[0] ? rows[0].data : null; }
    if (dr.ok) checks = await dr.json();
  } catch (e) { /* go on without */ }
  const o = data && Array.isArray(data.orchards) ? data.orchards.find(x => x && x.id === oid && !x.ex) : null;
  if (!o) return { text: "", name: "", ctx: null };
  const Pl = o.profile || {}, la = parseFloat(Pl.lat), lo = parseFloat(Pl.lon);
  const where = { area: clip(Pl.village, 60), lat2: isFinite(la) ? Math.round(la * 100) / 100 : null, lon2: isFinite(lo) ? Math.round(lo * 100) / 100 : null };
  const P = o.profile || {}, today = istToday(), L = ["Today is " + today + " (India)."];
  const vt = (o.varTrees || []).filter(x => x && x.v && n0(x.n) > 0).map(x => clip(x.v, 30) + " " + Math.round(n0(x.n)));
  const facts = [];
  if (P.village) facts.push("place " + clip(P.village, 50));
  if (n0(P.alt)) facts.push(Math.round(n0(P.alt)) + " m altitude");
  if (vt.length) facts.push("trees by variety: " + vt.join(", ")); else if (P.var) facts.push("varieties " + clip(P.var, 80));
  if (n0(o.trees)) facts.push(Math.round(n0(o.trees)) + " trees");
  if (P.root) facts.push("rootstock " + clip(P.root, 30));
  if (n0(P.planted)) facts.push("planted " + n0(P.planted) + " (" + (+today.slice(0, 4) - n0(P.planted)) + " years old)");
  if (P.irr) facts.push("irrigation " + clip(P.irr, 20));
  if (P.hail) facts.push("hail net " + clip(P.hail, 20));
  L.push("Orchard \"" + clip(o.name || "Orchard", 40) + "\": " + (facts.length ? facts.join(", ") : "no details added") + ".");
  const diary = (o.diary || []).filter(d => d && d.date && d.date <= today).sort((a, b) => (a.date < b.date ? 1 : -1));
  const recent = diary.filter(d => { const k = daysAgo(d.date, today); return k != null && k <= 75; }).slice(0, 12);
  const lastSpray = diary.find(d => d.kind === "spray");
  L.push(lastSpray ? "Last spray: " + lastSpray.date + " (" + daysAgo(lastSpray.date, today) + " days ago)" + (lastSpray.text ? ": " + clip(lastSpray.text, 90) : "") + "." : "No spray recorded in the diary.");
  if (recent.length) L.push("Diary, last 75 days: " + recent.map(d => d.date + " " + d.kind + (d.stage ? " [" + clip(d.stage, 20) + "]" : "") + (d.text ? " - " + clip(d.text, 70) : "")).join("; "));
  const soil = (o.soil || []).filter(x => x && x.date).sort((a, b) => (a.date < b.date ? 1 : -1))[0];
  if (soil) L.push("Latest soil test " + soil.date + ": " + Object.keys(SOIL).filter(k => n0(soil[k])).map(k => SOIL[k] + " " + n0(soil[k])).join(", ") + (soil.note ? " (" + clip(soil.note, 80) + ")" : ""));
  const ctx = { alt: n0(P.alt) || null, variety: vt.length ? vt.join(", ") : clip(P.var, 80) || null, root: clip(P.root, 30) || null,
    age: n0(P.planted) ? +today.slice(0, 4) - n0(P.planted) : null, trees: n0(o.trees) || null, irrigation: clip(P.irr, 20) || null, hail_net: clip(P.hail, 20) || null,
    spray_days: lastSpray ? daysAgo(lastSpray.date, today) : null, soil: soil ? Object.keys(SOIL).reduce((a, k) => { if (n0(soil[k])) a[k] = n0(soil[k]); return a; }, {}) : null };
  const wx = await weatherLines(P, ctx);
  if (wx) L.push(wx); else L.push("No orchard location saved, so no local weather.");
  const ck = (checks || []).map(c => {
    const m = c.result && Array.isArray(c.result.matches) && c.result.matches[0];
    return String(c.created_at || "").slice(0, 10) + (c.part ? " " + c.part : "") + ": " + (m ? m.id + " (" + m.confidence + ")" : "unclear photo") + (c.feedback ? ", grower marked it " + c.feedback : "");
  });
  if (ck.length) L.push("Earlier photo checks in this orchard: " + ck.join("; "));
  return { text: L.join("\n").slice(0, 3500), name: clip(o.name, 40), where, ctx };
}

/* keep the photos in the private store, in the grower's own folder (only when they said yes) */
async function keepPhotos(token, userId, diagId, images) {
  const paths = [];
  await Promise.all(images.map(async (im, i) => {
    const ext = im.type === "image/png" ? "png" : im.type === "image/webp" ? "webp" : "jpg";
    const path = userId + "/" + diagId + "/" + (i + 1) + "." + ext;
    try {
      const r = await fetch(SB_URL + "/storage/v1/object/" + BUCKET + "/" + path, {
        method: "POST", headers: { apikey: SB_KEY, Authorization: "Bearer " + token, "Content-Type": im.type, "x-upsert": "false" },
        body: Buffer.from(im.data, "base64")
      });
      if (r.ok) paths[i] = path; else console.error("keep", r.status, (await r.text()).slice(0, 200));
    } catch (e) { console.error("keep-fail", e); }
  }));
  return paths.filter(Boolean);
}
/* Seb Saathi's own model (when OWN_MODEL_URL is set): a quick first answer, never blocks the check */
async function ownModel(images, part, stage) {
  const url = process.env.OWN_MODEL_URL; if (!url) return null;
  try {
    const ac = new AbortController(), t = setTimeout(() => ac.abort(), 6000);
    const r = await fetch(url, { method: "POST", signal: ac.signal,
      headers: Object.assign({ "Content-Type": "application/json" }, process.env.OWN_MODEL_KEY ? { Authorization: "Bearer " + process.env.OWN_MODEL_KEY } : {}),
      body: JSON.stringify({ images: images.map(im => ({ type: im.type, data: im.data })), part, stage }) });
    clearTimeout(t);
    if (!r.ok) return null;
    const j = await r.json();
    const preds = (Array.isArray(j.predictions) ? j.predictions : []).filter(p => p && IDS.includes(p.id) && isFinite(+p.score))
      .map(p => ({ id: p.id, score: Math.round(Math.max(0, Math.min(1, +p.score)) * 1000) / 1000 })).sort((a, b) => b.score - a.score).slice(0, 3);
    return preds.length ? { model: String(j.model || "own").slice(0, 40), predictions: preds } : null;
  } catch (e) { return null; }
}
function readImages(list) {
  if (!Array.isArray(list) || list.length < 1 || list.length > 3) return null;
  const out = [];
  for (const im of list) {
    const m = /^(?:data:(image\/(?:jpeg|png|webp));base64,)?([A-Za-z0-9+/=]+)$/.exec(String(im || ""));
    if (!m || m[2].length > 1200000) return null;
    out.push({ type: m[1] || "image/jpeg", data: m[2] });
  }
  return out;
}
/* a check needs an expert's eye when the AI is unsure, says so itself, or the problem can kill trees */
function needsReview(r) {
  const top = r.matches[0];
  return !top || top.confidence === "low" || r.see_expert || ["collar", "wrr"].includes(top.id) || r.severity === "severe";
}

module.exports = async (req, res) => {
  if (req.method !== "POST") return send(res, 405, { error: "method" });

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

  let body = req.body;
  if (typeof body === "string") { try { body = JSON.parse(body); } catch (e) { body = null; } }
  if (!body) return send(res, 400, { error: "photos" });

  if (!process.env.ANTHROPIC_API_KEY) return send(res, 503, { error: "not_setup" });

  // 2. Check the request
  const images = readImages(body.images);
  if (!images) return send(res, 400, { error: "photos" });
  const part = PARTS.includes(body.part) ? body.part : "";
  const crop = "apple";   /* diagnosis is apple only */
  const consent = body.consent === true;
  const note = String(body.note || "").slice(0, 400);
  const lang = body.lang === "hi" || body.lang === "hn" ? body.lang : "en";
  const stage = STAGES[body.stage] ? body.stage : "";
  const orchardId = /^[A-Za-z0-9_-]{1,40}$/.test(String(body.orchard_id || "")) ? String(body.orchard_id) : "";

  // 3. Limit by plan (this grower's checks this month, India time); admin keeps a daily limit for testing
  const isAdmin = ADMIN_EMAILS.includes(String(user.email || "").toLowerCase());
  const plan = isAdmin ? "admin" : await planOf(token, user.id);
  const limit = isAdmin ? ADMIN_LIMIT : PLAN_LIMIT[plan], per = isAdmin ? "day" : "month";
  try {
    const since = isAdmin ? istDayStart() : istMonthStart();
    const c = await fetch(SB_URL + "/rest/v1/diagnoses?select=id&user_id=eq." + encodeURIComponent(user.id) + "&created_at=gte." + encodeURIComponent(since), { headers: sbHeaders(token) });
    if (!c.ok) return send(res, 503, { error: "not_setup" });
    const rows = await c.json();
    if (rows.length >= limit) return send(res, 429, { error: "limit", limit, per, plan });
  } catch (e) { return send(res, 502, { error: "db_down" }); }

  // 4. Ask the AI (with the chosen orchard's record as background)
  const [oc, own] = await Promise.all([orchardContext(token, user.id, orchardId).catch(() => ({ text: "", name: "", ctx: null })), ownModel(images, part, stage)]);
  const partWord = { leaf: "leaves", fruit: "fruit", bark: "branch, bark or trunk", tree: "whole tree or roots" }[part] || "not said";
  const userText = "Part of the tree in the photo: " + partWord + ".\n" +
    (stage ? "Tree stage now (grower says): " + STAGES[stage] + ".\n" : "") +
    (own ? "Second opinion from Seb Saathi's own model (trained on local photos): " + own.predictions.map(p => p.id + " " + Math.round(p.score * 100) + "%").join(", ") + "\n" : "") +
    (note ? "Grower's note: " + note + "\n" : "") +
    (oc.text ? "Orchard record (background from the grower's own records; the photo comes first, use this to weigh likely causes, e.g. recent rain and humidity, days since the last spray, variety, altitude, soil calcium or boron, and problems seen here before):\n" + oc.text + "\n" : "") +
    "LANGUAGE (selected by the grower; write every text field only in this): " + (lang === "hi" ? "Hindi" : lang === "hn" ? "Hinglish (simple Hindi written in English/Roman letters, like \"Patton par kaale daag hain\")" : "English");
  let result;
  try {
    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "x-api-key": process.env.ANTHROPIC_API_KEY, "anthropic-version": "2023-06-01", "content-type": "application/json" },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 1400,
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

  // 5. Keep the photos (only with the grower's permission), then save the check
  const id = require("crypto").randomUUID();
  const paths = consent ? await keepPhotos(token, user.id, id, images) : [];
  const base = { id, user_id: user.id, part, note, lang, photos: images.length, result };
  const where = oc.where || {};
  const full = Object.assign({}, base, orchardId ? { orchard_id: orchardId } : {}, {
    crop, severity: result.severity || null, area: where.area || null, lat2: where.lat2 == null ? null : where.lat2, lon2: where.lon2 == null ? null : where.lon2,
    consent, photo_paths: paths.length ? paths : null, needs_review: needsReview(result)
  });
  let saved = false;
  const ins = body => fetch(SB_URL + "/rest/v1/diagnoses", { method: "POST", headers: sbHeaders(token, { Prefer: "return=minimal" }), body: JSON.stringify(body) })
    .then(async r => { if (!r.ok) console.error("save", r.status, (await r.text()).slice(0, 300)); return r.ok; }).catch(e => { console.error("save-fail", e); return false; });
  /* newest columns first; if supabase/diagnosis_plus.sql has not been run yet, fall back to the older columns */
  const today = istToday(), recheck = new Date(Date.parse(today + "T00:00:00Z") + result.recheck_days * 864e5).toISOString().slice(0, 10);
  const v3 = { stage: stage || null, context: oc.ctx || null, recheck_on: null,
    model_votes: { ai: { model: MODEL, top: result.matches.map(m => ({ id: m.id, confidence: m.confidence })) }, own: own || null } };
  /* newest (supabase/diagnosis_v3.sql) first */
  saved = await ins(Object.assign({}, full, v3));
  if (!saved) saved = await ins(full);
  if (!saved && orchardId) saved = await ins(Object.assign({}, base, { orchard_id: orchardId }));
  if (!saved) saved = await ins(base);

  return send(res, 200, { id: saved ? id : null, result, orchard: oc.name || "", kept: paths.length, review: full.needs_review, recheck_on: recheck });
};
