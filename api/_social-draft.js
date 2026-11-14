// Seb Saathi — the AI drafts the next week of Facebook + Instagram posts (Vercel serverless function)
// POST /api/social-draft  { n: 3..7, lang: "hn"|"hi"|"en" }   Header: Authorization: Bearer <admin's Supabase token>
//                         { kind: "wa", lang }        one WhatsApp channel tip for this week (saved as a draft, kind "wa")
//                         { kind: "videos", done: [] } 12 short-video ideas for the coming month (returned, not saved)
//                         { kind: "custom", ask, lang } one post written to what the admin asked (saved as a draft)
//                         { kind: "wamsg", ask, lang }  one WhatsApp message as asked (saved as a draft, kind "wa")
//                         { kind: "video", ask, lang }  words for the Video Studio: title, scenes, end card, what to film, caption
//                         { kind: "repurpose", ask, lang } one finished video → Facebook text, Instagram Reel caption,
//                                                YouTube Short title + description, WhatsApp message (returned, not saved)
// Every kind may also send best: ["post text", ...] (the posts that did best) to copy their style.
// Every draft is told what orchards need this month (SEASON) and which problems growers checked most by photo lately.
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
  for await (const c of req) { raw += c; if (raw.length > 16000) break; }
  try { return JSON.parse(raw || "{}"); } catch (e) { return {}; }
}
const sbH = (token, extra) => Object.assign({ apikey: SB_KEY, Authorization: "Bearer " + token, "Content-Type": "application/json" }, extra || {});
const istNow = () => new Date(Date.now() + 330 * 60000);   /* India time, read with getUTC* */
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

/* what orchards need each month in the apple hills (mid hills, about 1,500–2,500 m; higher orchards run a few weeks later).
   Work only, never a chemical or dose: those come from the state spray schedule. */
const SEASON = [
  "January: dormant trees. Pruning and training, cutting out cankers and dead wood, cleaning the orchard, digging pits and planting new plants, care in snow and frost.",
  "February: finish pruning and planting before buds move; manure and fertiliser as the soil test says; lower orchards get ready for green tip; the dormant-stage spray as per the state schedule.",
  "March: green tip to pink bud in lower and mid hills; watch for scab after rain; arrange bee boxes and pollinizer branches; frost risk at night.",
  "April: bloom and petal fall; keep bees safe (no sprays during bloom unless the schedule says); frost and hail risk, put up hail nets; watch for scab and powdery mildew.",
  "May: fruit set and thinning; hail; watch for mites, scab and leaf miner; irrigation and mulching in dry spells.",
  "June: fruit growth; monsoon starts, watch for premature leaf fall and Alternaria; clean drains; book cartons and labour for harvest; early varieties get close.",
  "July: harvest starts in lower areas with early varieties; monsoon leaf diseases; grading and packing; mandi or ladhani or theka; record every lot.",
  "August: main harvest in the mid hills; grading, packing, selling; record each lot, rate and expense; check payments that are still to come.",
  "September: harvest in higher and late areas; post-harvest care of trees; add up the season's expenses.",
  "October: after harvest: leaf fall, collect and destroy fallen leaves (scab starts there next spring), soil testing, basins, look back at the season's profit per box.",
  "November: trees go dormant; soil test and manure, orchard sanitation, plan new planting and pits, fencing; work out the real profit of the season and plan next year.",
  "December: dormancy, snow; pruning starts in some areas; planting pits; close the year's orchard records."
];

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

/* "Ask the AI" boxes on the Marketing tab: the admin says what they want */
const WAMSG_BRIEF = `You write WhatsApp messages for "Seb Saathi" (सेब साथी), a free website (sebsaathi.com) for apple growers in Himachal Pradesh, Kashmir and Uttarakhand, made by an apple grower from Rohru. The admin tells you what message they want and who it is for.
The message: warm, personal, short (30 to 110 words), short lines, at most 3 emojis, no hashtags. WhatsApp formatting (*bold*) is fine. If it fits, end with the link https://sebsaathi.com/?src=wa
Safety rules (always): never name a chemical, pesticide, fungicide, fertiliser brand or dose; never quote or guess prices, scheme amounts or rules; no made-up statistics, quotes or growers; never promise results.
Reply with ONLY a JSON array with one item, no other text: [{"topic": "3-6 word topic", "text": "the full message"}]`;

const VIDEO_BRIEF = `You write short phone videos (under 60 seconds) for "Seb Saathi" (सेब साथी), a free website (sebsaathi.com) for apple growers in Himachal Pradesh, Kashmir and Uttarakhand. The founder is an apple grower from Rohru and films in his own orchards. The admin tells you what video they want.
The video is made in a simple editor: 3 to 6 scenes, each shown for 2 to 4 seconds with a photo or clip behind the words. Each scene has a small tag (1-3 words, or a step number like "1"), main words (at most 9 words, big on screen) and a second line (at most 10 words). The first scene is the hook. Then an end card with a short call to action.
What the website does today: orchard record, spray and work diary with expenses, season sales record (Mandi, Adani per kilo, Theka), real profit per box, disease check from one photo, Saathi chatbot (also by voice), spray schedule and season calendar, family sharing, invite friends.
Safety rules: never name a chemical, brand or dose (for sprays say follow the state spray schedule and the label); never quote prices; no made-up growers or testimonials; never promise results.
Reply with ONLY a JSON array with one item, no other text:
[{"title": "YouTube title, at most 70 characters", "scenes": [{"label": "...", "title": "...", "sub": "..."}], "cta": "end card call to action, at most 8 words", "shoot": "what to film for each scene, in English, one or two lines", "caption": "post caption for Reels/YouTube, 40-90 words, ending with 4-6 hashtags"}]`;

/* one finished video → a caption for each place it will go */
const REPURPOSE_BRIEF = `You prepare one finished short phone video from "Seb Saathi" (सेब साथी), a free website (sebsaathi.com) for apple growers in Himachal Pradesh, Kashmir and Uttarakhand, made by an apple grower from Rohru, to go out in four places. You are given what the video shows (its caption or words).
Write:
- "fb": a Facebook video post, 40 to 100 words, short lines, strong first line, ends with one call to action with the link sebsaathi.com, then 3 to 5 hashtags.
- "ig": an Instagram Reel caption, 30 to 80 words, a hook first line, no link (say "link bio mein" or the same idea in the language), then 6 to 10 hashtags.
- "yt_title": a YouTube Shorts title, at most 70 characters, no hashtags (#Shorts is added for you).
- "yt_desc": a YouTube description, 40 to 90 words, with the link https://sebsaathi.com/?src=yt and 3 to 5 hashtags at the end.
- "wa": a WhatsApp message to share the video with growers, 25 to 60 words, warm and personal, at most 2 emojis, no hashtags, ending with https://sebsaathi.com/?src=wa
Safety rules (always): never name a chemical, pesticide, fungicide, fertiliser brand or dose; never quote or guess prices; no made-up statistics, quotes or growers; never promise results.
Reply with ONLY a JSON array with one item, no other text: [{"fb": "...", "ig": "...", "yt_title": "...", "yt_desc": "...", "wa": "..."}]`;

/* the most common problems growers checked by photo in the last 30 days (admins can read diagnoses) */
async function commonProblems(token) {
  try {
    const since = new Date(Date.now() - 30 * 86400000).toISOString();
    const r = await fetch(SB_URL + "/rest/v1/diagnoses?select=top:result->matches->0->>id&created_at=gte." + encodeURIComponent(since) + "&limit=1000", { headers: sbH(token) });
    if (!r.ok) return "";
    const n = {};
    (await r.json()).forEach(x => { const k = String(x.top || "").replace(/[^a-z0-9_]/gi, ""); if (k && !/^(healthy|other|unsure|unknown|none)$/i.test(k)) n[k] = (n[k] || 0) + 1; });
    const top = Object.entries(n).sort((a, b) => b[1] - a[1]).slice(0, 5);
    return top.length ? "Problems growers checked most on the website's photo check in the last 30 days (photo checks): " + top.map(x => x[0].replace(/_/g, " ") + " (" + x[1] + ")").join(", ") + ". Where it fits the month, a post about one of these is timely." : "";
  } catch (e) { return ""; }
}

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
  const kind = ["wa", "videos", "custom", "wamsg", "video", "repurpose"].indexOf(b.kind) >= 0 ? b.kind : "post";
  const want = String(b.ask || "").replace(/\s+/g, " ").trim().slice(0, 800);
  if ((kind === "custom" || kind === "wamsg" || kind === "video" || kind === "repurpose") && !want) return send(res, 400, { error: "empty" });
  const n = kind === "post" || kind === "videos" ? Math.max(1, Math.min(7, Math.round(+b.n || 3))) : 1;
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
  const nextI = (now.getUTCMonth() + (now.getUTCDate() > 20 ? 1 : 0)) % 12, nextM = MONTHS[nextI];
  /* the season and what growers are checking, so the week matches what is happening in the orchards */
  const season = "What apple orchards need now: " + SEASON[now.getUTCMonth()] + (nextI !== now.getUTCMonth() ? " Coming next: " + SEASON[nextI] : "");
  const probs = kind === "videos" || kind === "repurpose" ? "" : await commonProblems(token);
  const best = (Array.isArray(b.best) ? b.best : []).map(x => String(x || "").replace(/\s+/g, " ").trim().slice(0, 900)).filter(Boolean).slice(0, 3);
  const bestLine = best.length ? "\nThese of our posts did best with growers (most sign-ups, likes and shares). Copy what works in them: the kind of first line, length, tone and call to action. Do not copy their words or repeat their topics:\n" + best.map((x, i) => (i + 1) + ". " + x).join("\n") : "";
  const ctx = "\n" + season + (probs ? "\n" + probs : "") + bestLine;
  const vl = lang === "hi" ? "Write every on-screen word and the caption in simple Hindi (Devanagari script)." : lang === "en" ? "Write the on-screen words and caption in simple English." : "Write the on-screen words and caption in Hinglish (Hindi in English letters, Hindi sentence order).";
  const ask = kind === "custom" ? today + "Write ONE post. What the admin wants: " + want + "\n" + langLine + ctx
    : kind === "wamsg" ? today + "What the admin wants: " + want + "\n" + langLine + ctx
    : kind === "video" ? today + "What the admin wants: " + want + "\n" + vl + ctx
    : kind === "repurpose" ? today + "What the video shows:\n" + want + "\n" + langLine.replace(/every post/g, "everything") + bestLine
    : kind === "videos" ? today + "Plan the videos for " + nextM + ". What orchards need then: " + SEASON[nextI] + (Array.isArray(b.done) && b.done.length ? "\nAlready made (do not repeat): " + b.done.slice(0, 40).map(x => String(x).slice(0, 60)).join("; ") : "")
    : kind === "wa" ? today + "Write this week's tip. " + langLine + ctx + (recent.length ? "\nRecent topics (do not repeat): " + recent.slice(0, 30).join("; ") : "")
    : today + "Write " + n + " posts for the coming 7 days. Plan the week around what the orchards need now (below): most posts should be about this month's work, risks or selling, in the order growers will need them. " + langLine + ctx + (recent.length ? "\nRecent topics (do not repeat): " + recent.slice(0, 30).join("; ") : "");

  let posts = [];
  try {
    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "x-api-key": process.env.ANTHROPIC_API_KEY, "anthropic-version": "2023-06-01", "content-type": "application/json" },
      body: JSON.stringify({ model: MODEL, max_tokens: 4000, system: kind === "repurpose" ? REPURPOSE_BRIEF : kind === "wa" ? WA_BRIEF : kind === "videos" ? VID_BRIEF : kind === "wamsg" ? WAMSG_BRIEF : kind === "video" ? VIDEO_BRIEF : BRIEF, messages: [{ role: "user", content: ask }] })
    });
    if (!r.ok) { console.error("ai", r.status, await r.text()); return send(res, 502, { error: "ai" }); }
    const j = await r.json();
    const txt = (j.content || []).filter(x => x.type === "text").map(x => x.text).join("");
    const m = txt.match(/\[[\s\S]*\]/);
    posts = JSON.parse(m ? m[0] : txt);
    if (!Array.isArray(posts)) throw new Error("not a list");
  } catch (e) { console.error("ai-parse", e); return send(res, 502, { error: "ai" }); }

  if (kind === "repurpose") {   /* captions for one video, for each place: returned, the admin page makes the drafts */
    const v = posts[0] || {}, t = (x, m) => String(x || "").trim().slice(0, m);
    const out = { fb: t(v.fb, 2200), ig: t(v.ig, 2200), yt_title: t(v.yt_title, 90).replace(/#shorts/ig, "").trim(), yt_desc: t(v.yt_desc, 4800), wa: t(v.wa, 2200) };
    if (!out.fb && !out.ig) return send(res, 502, { error: "ai" });
    return send(res, 200, { repurpose: out });
  }
  if (kind === "video") {   /* words for the Video Studio: returned, not saved */
    const v = posts[0] || {};
    const scenes = (Array.isArray(v.scenes) ? v.scenes : []).slice(0, 8).map(x => ({ label: String(x.label || "").slice(0, 30), title: String(x.title || "").slice(0, 90), sub: String(x.sub || "").slice(0, 90) })).filter(x => x.title);
    if (!scenes.length) return send(res, 502, { error: "ai" });
    return send(res, 200, { video: { title: String(v.title || "").slice(0, 90), scenes, cta: String(v.cta || "").slice(0, 80), shoot: String(v.shoot || "").slice(0, 400), caption: String(v.caption || "").slice(0, 2000) } });
  }
  if (kind === "videos") {   /* ideas only: the admin page keeps them (admin_marketing) */
    const ideas = posts.map(p => ({ week: Math.max(1, Math.min(4, Math.round(+p.week || 1))), name: String(p.name || "").slice(0, 60), hook: String(p.hook || "").slice(0, 120), show: String(p.show || "").slice(0, 160) }))
      .filter(x => x.name && x.hook).slice(0, 12);
    if (!ideas.length) return send(res, 502, { error: "ai" });
    return send(res, 200, { month: nextM, ideas });
  }
  if (kind === "wa" || kind === "wamsg") {   /* one tip/message, dated next Monday 8 am India time (= 02:30 UTC) */
    const p = posts[0] || {}, add = ((8 - now.getUTCDay()) % 7) || 7;
    const row = { kind: "wa", status: "draft", text: String(p.text || "").trim().slice(0, 2200), topic: String(p.topic || "").slice(0, 200) || null, fb: false, ig: false,
      post_at: kind === "wamsg" ? new Date().toISOString() : new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + add, 2, 30)).toISOString() };
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
