// Seb Saathi — the AI drafts the next week of Facebook + Instagram posts (Vercel serverless function)
// POST /api/social-draft  { n: 3..7, lang: "hn"|"hi"|"en" }   Header: Authorization: Bearer <admin's Supabase token>
//                         { kind: "wa", lang }        one WhatsApp channel tip for this week (saved as a draft, kind "wa")
//                         { kind: "videos", done: [] } 12 short-video ideas for the coming month (returned, not saved)
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

/* the weekly WhatsApp channel tip: same rules, shorter, sent by hand from the admin page */
const WA_BRIEF = `You write the weekly WhatsApp channel tip for "Seb Saathi" (सेब साथी), a free website (sebsaathi.com) for apple growers in Himachal Pradesh, Kashmir and Uttarakhand.
The tip: one practical orchard job for this week of the month given, 40 to 80 words, starting with "🍎 Is hafte bagiche mein:" (or the same idea in the language asked). Short lines, at most 2 emojis, no hashtags. End with one short line pointing to the free photo check or orchard record at sebsaathi.com.
Safety rules (always): NEVER name a chemical, pesticide, fungicide, fertiliser brand or dose, and never invent a spray; for sprays say to follow the official state spray schedule for the current stage and the product label, or ask the horticulture officer / KVK. Never quote or guess prices, scheme amounts or rules. No made-up statistics, quotes or growers.
Reply with ONLY a JSON array with one item, no other text: [{"topic": "3-6 word topic", "text": "the full tip"}]`;

/* short-video ideas for the coming month, filmed by the admin in their own orchards */
const VID_BRIEF = `You plan short phone videos (under 60 seconds) for "Seb Saathi" (सेब साथी), a free website (sebsaathi.com) for apple growers in Himachal Pradesh, Kashmir and Uttarakhand. The founder is an apple grower from Rohru and films the videos in his own orchards.
What the website does today: orchard record (trees, varieties, soil health), spray and work diary with expenses, season sales record by grade and by sale type (Mandi, Adani per kilo, Theka fixed-rate deal), real profit per box and per orchard, disease check from one photo with the answer shareable on WhatsApp, Saathi the chatbot (also by voice), spray schedule and season calendar, sharing the records with up to 2 family members (view-only or edit), invite friends (3 friends = 1 free month).
Plan 12 videos for the 4 weeks of the coming month, 3 a week: mix timely orchard work for that month, one or two website features shown on the phone, and one grower question. The hook is the first 3 seconds, spoken in Hinglish (Hindi in English letters, Hindi sentence order), at most 12 words.
Safety rules: never name a chemical, brand or dose; never quote prices; no made-up growers or testimonials.
Reply with ONLY a JSON array, no other text: [{"week": 1, "name": "2-4 word Hinglish title", "hook": "the first 3 seconds", "show": "what to film, in English, one line"}]`;

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
  const kind = b.kind === "wa" ? "wa" : b.kind === "videos" ? "videos" : "post";
  const n = kind === "wa" ? 1 : Math.max(1, Math.min(7, Math.round(+b.n || 3)));
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
    : "Write every post in Hinglish: Hindi as a Himachali grower speaks it, written in English letters, with Hindi words and Hindi sentence order (e.g. \"Is mahine bagiche mein kya karein?\"). No English sentences; English only for common farm words like spray, scab, mandi.";
  const today = "Today is " + now.getUTCDate() + " " + MONTHS[now.getUTCMonth()] + " " + now.getUTCFullYear() + " (India). ";
  const nextM = MONTHS[(now.getUTCMonth() + (now.getUTCDate() > 20 ? 1 : 0)) % 12];
  const ask = kind === "videos" ? today + "Plan the videos for " + nextM + "." + (Array.isArray(b.done) && b.done.length ? "\nAlready made (do not repeat): " + b.done.slice(0, 40).map(x => String(x).slice(0, 60)).join("; ") : "")
    : kind === "wa" ? today + "Write this week's tip. " + langLine + (recent.length ? "\nRecent topics (do not repeat): " + recent.slice(0, 30).join("; ") : "")
    : today + "Write " + n + " posts for the coming 7 days. " + langLine + (recent.length ? "\nRecent topics (do not repeat): " + recent.slice(0, 30).join("; ") : "");

  let posts = [];
  try {
    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "x-api-key": process.env.ANTHROPIC_API_KEY, "anthropic-version": "2023-06-01", "content-type": "application/json" },
      body: JSON.stringify({ model: MODEL, max_tokens: 4000, system: kind === "wa" ? WA_BRIEF : kind === "videos" ? VID_BRIEF : BRIEF, messages: [{ role: "user", content: ask }] })
    });
    if (!r.ok) { console.error("ai", r.status, await r.text()); return send(res, 502, { error: "ai" }); }
    const j = await r.json();
    const txt = (j.content || []).filter(x => x.type === "text").map(x => x.text).join("");
    const m = txt.match(/\[[\s\S]*\]/);
    posts = JSON.parse(m ? m[0] : txt);
    if (!Array.isArray(posts)) throw new Error("not a list");
  } catch (e) { console.error("ai-parse", e); return send(res, 502, { error: "ai" }); }

  if (kind === "videos") {   /* ideas only: the admin page keeps them (admin_marketing) */
    const ideas = posts.map(p => ({ week: Math.max(1, Math.min(4, Math.round(+p.week || 1))), name: String(p.name || "").slice(0, 60), hook: String(p.hook || "").slice(0, 120), show: String(p.show || "").slice(0, 160) }))
      .filter(x => x.name && x.hook).slice(0, 12);
    if (!ideas.length) return send(res, 502, { error: "ai" });
    return send(res, 200, { month: nextM, ideas });
  }
  if (kind === "wa") {   /* one tip, dated next Monday 8 am India time (= 02:30 UTC) */
    const p = posts[0] || {}, add = ((8 - now.getUTCDay()) % 7) || 7;
    const row = { kind: "wa", status: "draft", text: String(p.text || "").trim().slice(0, 2200), topic: String(p.topic || "").slice(0, 200) || null, fb: false, ig: false,
      post_at: new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + add, 2, 30)).toISOString() };
    if (!row.text) return send(res, 502, { error: "ai" });
    try {
      const r = await fetch(SB_URL + "/rest/v1/social_queue", { method: "POST", headers: sbH(token, { Prefer: "return=representation" }), body: JSON.stringify([row]) });
      if (!r.ok) { console.error("save", r.status, await r.text()); return send(res, 503, { error: "not_setup_v2" }); }
      return send(res, 200, { drafts: await r.json() });
    } catch (e) { return send(res, 502, { error: "db_down" }); }
  }
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
