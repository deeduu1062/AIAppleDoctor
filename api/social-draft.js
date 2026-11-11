// Seb Saathi — the AI drafts the next week of Facebook + Instagram posts (Vercel serverless function)
// POST /api/social-draft  { n: 3..7, lang: "hn"|"hi"|"en" }   Header: Authorization: Bearer <admin's Supabase token>
// Saves the drafts in public.social_queue (status "draft", 7:30 pm India time on spread-out days)
// so the admin can check them, add photos and tap "Approve all".
// Uses the same ANTHROPIC_API_KEY as Saathi. Optional Vercel setting: SOCIAL_MODEL.
// Needs supabase/social_queue.sql.

const SB_URL = "https://rylqzyylbsephirwslce.supabase.co";
const SB_KEY = "sb_publishable_EYVtP0ljYd-jta5ENmX9Jg_mCtYLzJo"; // public key, same as the website
const ADMIN_EMAILS = ["deeduu@gmail.com", "admin@sebsaathi.com"];
const MODEL = process.env.SOCIAL_MODEL || "claude-sonnet-5-5";

function send(res, code, obj) {
  res.statusCode = code;
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(obj));
}
async function readBody(req) {
  if (req.body && typeof req.body === "object") return req.body;
  if (typeof req.body === "string") { try { return JSON.parse(req.body); } catch (e) { return {}; } }
  let raw = "";
  for await (const c of req) { raw += c; if (raw.length > 5000) break; }
  try { return JSON.parse(raw || "{}"); } catch (e) { return {}; }
}
const sbH = (token, extra) => Object.assign({ apikey: SB_KEY, Authorization: "Bearer " + token, "Content-Type": "application/json" }, extra || {});
const istNow = () => new Date(Date.now() + 330 * 60000);   /* India time, read with getUTC* */
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const BRIEF = `You write social media posts for "Seb Saathi" (सेब साथी), a free website (sebsaathi.com) for apple growers in Himachal Pradesh, Kashmir and Uttarakhand. Tagline: "Your Orchard Manager". It helps growers keep an orchard record, work out real profit per peti (box) after all costs, compare mandi vs ladhani, check apple diseases from a photo, follow the season calendar and spray stages, and ask "Saathi", the chatbot, in Hindi or Hinglish.

The audience: apple growers (bagwan), mostly on phones, who know Hindi well and some English. Facebook and Instagram.

Each post:
- Is timely for the month given (orchard work, weather risks, harvest/selling, record keeping, planning) and useful on its own: one clear, practical idea a grower can use today.
- 50 to 120 words. Short lines. A strong first line (a question or a surprising fact). At most 2 emojis.
- Ends with one gentle call to action that fits the post (for example try the free profit calculator / photo check / orchard record at sebsaathi.com), then 4 to 6 hashtags such as #SebSaathi #AppleFarming #Himachal #Kashmir #Uttarakhand #Bagwani.
- Mix the topics across the week: tips, a profit/record keeping idea, a disease or pest to watch for this month, a feature of the website, a question to get comments. Do not repeat the recent topics listed.

Safety rules (always):
- NEVER name a chemical, pesticide, fungicide, fertiliser brand or dose, and never invent a spray. For sprays say to follow the official state spray schedule for the current stage and the product label, or ask the horticulture officer / KVK.
- Never quote or guess apple prices, scheme amounts or rules. Never promise results or say the photo check is always right.
- No made-up statistics, quotes, growers or testimonials.

For each post also give "photo_idea": one short line describing a photo the admin could take in their own orchard to go with it (Instagram needs a photo).

Reply with ONLY a JSON array, no other text:
[{"topic": "3-6 word topic", "text": "the full post", "photo_idea": "..."}]`;

module.exports = async (req, res) => {
  if (req.method !== "POST") return send(res, 405, { error: "method" });
  const auth = String(req.headers.authorization || "");
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";
  if (!token) return send(res, 401, { error: "signin" });
  try {
    const u = await fetch(SB_URL + "/auth/v1/user", { headers: { apikey: SB_KEY, Authorization: "Bearer " + token } });
    if (!u.ok) return send(res, 401, { error: "signin" });
    const user = await u.json();
    if (!ADMIN_EMAILS.includes(String(user.email || "").toLowerCase())) return send(res, 403, { error: "admin" });
  } catch (e) { return send(res, 502, { error: "auth_down" }); }
  if (!process.env.ANTHROPIC_API_KEY) return send(res, 503, { error: "no_ai_key" });

  const b = await readBody(req);
  const n = Math.max(1, Math.min(7, Math.round(+b.n || 3)));
  const lang = b.lang === "hi" ? "hi" : b.lang === "en" ? "en" : "hn";

  /* recent topics, so the week does not repeat itself (also checks the table exists) */
  let recent = [];
  try {
    const r = await fetch(SB_URL + "/rest/v1/social_queue?select=topic&order=created_at.desc&limit=30", { headers: sbH(token) });
    if (!r.ok) return send(res, 503, { error: "not_setup" });
    recent = (await r.json()).map(x => x.topic).filter(Boolean);
  } catch (e) { return send(res, 502, { error: "db_down" }); }

  const now = istNow();
  const langLine = lang === "hi" ? "Write every post in simple Hindi (Devanagari script); common farm words in English letters are fine."
    : lang === "en" ? "Write every post in simple English, with one short Hinglish line where it feels natural."
    : "Write every post in simple Hinglish (Hindi in English letters, e.g. \"Is mahine bagiche mein kya karein?\").";
  const ask = "Today is " + now.getUTCDate() + " " + MONTHS[now.getUTCMonth()] + " " + now.getUTCFullYear() + " (India). Write " + n + " posts for the coming 7 days. " + langLine +
    (recent.length ? "\nRecent topics (do not repeat): " + recent.slice(0, 30).join("; ") : "");

  let posts = [];
  try {
    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "x-api-key": process.env.ANTHROPIC_API_KEY, "anthropic-version": "2023-06-01", "content-type": "application/json" },
      body: JSON.stringify({ model: MODEL, max_tokens: 4000, system: BRIEF, messages: [{ role: "user", content: ask }] })
    });
    if (!r.ok) { console.error("ai", r.status, await r.text()); return send(res, 502, { error: "ai" }); }
    const j = await r.json();
    const txt = (j.content || []).filter(x => x.type === "text").map(x => x.text).join("");
    const m = txt.match(/\[[\s\S]*\]/);
    posts = JSON.parse(m ? m[0] : txt);
    if (!Array.isArray(posts)) throw new Error("not a list");
  } catch (e) { console.error("ai-parse", e); return send(res, 502, { error: "ai" }); }

  /* spread over the next 7 days, 7:30 pm India time (= 14:00 UTC) */
  const rows = posts.slice(0, n).map((p, i) => {
    const day = 1 + Math.floor(i * 7 / n);
    const d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + day, 14, 0));
    return {
      status: "draft", text: String(p.text || "").trim().slice(0, 2200), topic: String(p.topic || "").slice(0, 200) || null,
      photo_idea: String(p.photo_idea || "").slice(0, 400) || null, fb: true, ig: false, post_at: d.toISOString()
    };
  }).filter(x => x.text);
  if (!rows.length) return send(res, 502, { error: "ai" });

  try {
    const r = await fetch(SB_URL + "/rest/v1/social_queue", { method: "POST", headers: sbH(token, { Prefer: "return=representation" }), body: JSON.stringify(rows) });
    if (!r.ok) { console.error("save", r.status, await r.text()); return send(res, 503, { error: "not_setup" }); }
    return send(res, 200, { drafts: await r.json() });
  } catch (e) { return send(res, 502, { error: "db_down" }); }
};
