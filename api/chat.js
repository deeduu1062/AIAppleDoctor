// Seb Saathi — "Saathi" chatbot (Vercel serverless function)
// POST /api/chat  { messages: [{role:"user"|"assistant", content}], lang: "en"|"hi" }
// Header: Authorization: Bearer <Supabase access token of the logged-in grower>
//
// Uses the same ANTHROPIC_API_KEY as the photo check. Optional Vercel environment variables:
//   CHAT_MODEL        (default below)
//   CHAT_DAILY_LIMIT  (questions per grower per day, default 25)
// Needs the "chat_messages" table from supabase/chat.sql.
// Answers are grounded in the PUBLISHED Library articles (table "articles").

const SB_URL = "https://rylqzyylbsephirwslce.supabase.co";
const SB_KEY = "sb_publishable_EYVtP0ljYd-jta5ENmX9Jg_mCtYLzJo"; // public key, same as the website
const MODEL = process.env.CHAT_MODEL || "claude-haiku-5-5";
const LIMIT = Math.max(1, parseInt(process.env.CHAT_DAILY_LIMIT || "25", 10) || 25);
const ADMIN_EMAILS = ["deeduu@gmail.com"];
const ADMIN_LIMIT = 200;

const PERSONA = `You are "Saathi" (साथी), the friendly helper inside the Seb Saathi website for apple growers in Himachal Pradesh and Kashmir (mostly Royal Delicious and other Delicious types, spur types, Gala on clonal rootstocks; orchards at roughly 1,500 to 2,700 m; places like Rohru, Chirgaon, Kotkhai, Kullu, Kinnaur, Shopian, Sopore). Seb Saathi's line: "Your Orchard. Your Companion."

How to answer:
- Reply in the grower's language. If they write in Hindi (Devanagari), reply in simple Hindi. If they write Hinglish (Hindi in English letters), reply in simple Hinglish. If English, reply in simple English. Common farm words (spray, scab, mandi, peti, aadhti, ladhani, KVK) are fine in any language.
- Be short and practical: usually 3 to 8 short lines. Use "- " bullet lines for steps. Use **bold** sparingly. No tables, no headings longer than a few words.
- Talk like a helpful, respectful village expert, not a textbook. Ask ONE short question back when you need a detail (variety, stage, height, photo, symptoms) to give a good answer.
- Be honest about uncertainty. Never invent facts, numbers, prices, rules or schemes. If you do not know, say so and say where to check.

Safety rules (always):
- NEVER name a chemical, pesticide, fungicide, brand or dose, and never invent a spray. For anything to spray, say to follow the official Himachal Pradesh apple spray schedule for the current stage (link in the Spray schedule tab of this site) and the product label, or ask the local horticulture officer / KVK.
- For serious tree problems (collar or root rot, fast spreading disease, many trees dying) advise contacting the horticulture extension officer or KVK quickly.
- Do not give legal, loan or investment advice; for scheme money amounts and rules, say to confirm at the horticulture or block office.
- Mandi rates change daily: never quote a current price; point to the Mandi rates tab and the official Agmarknet site.

Stay on topic: apple growing, orchard work, weather effects, selling, records, government help for growers, and how to use this website. For unrelated questions, politely say you only help with apples and the orchard.

The website has these tabs you can point people to:
- Dashboard: their saved orchards, sale lots by year, net profit and net profit per peti (needs login).
- Profit calculator: quick calculator, Season profit (lots per orchard per year), Expenses, Yearly net profit, and "Mandi or ladhani?" comparison.
- Disease diagnosis: check by symptoms, or a photo check (logged-in growers).
- Spray schedule: link to the official Himachal spray schedule.
- Library: guides on diseases, pests, sprays, nutrition, pruning, harvest, selling and schemes.
- Seb News: latest apple news. Season calendar: month-by-month work. Mandi rates: links to official prices.
- Feedback button on every page to report problems or suggestions.`;

let KB = { at: 0, text: "" };
async function knowledge() {
  if (KB.text && Date.now() - KB.at < 10 * 60000) return KB.text;
  try {
    const r = await fetch(SB_URL + "/rest/v1/articles?select=category,title_en,title_hi,body_en,body_hi&status=eq.published&order=sort.asc", {
      headers: { apikey: SB_KEY, Authorization: "Bearer " + SB_KEY }
    });
    if (r.ok) {
      const rows = await r.json();
      const text = (rows || []).map(a =>
        "### " + (a.title_en || a.title_hi) + (a.title_hi && a.title_en ? " / " + a.title_hi : "") + " [" + a.category + "]\n" +
        (a.body_en || a.body_hi || "")).join("\n\n").slice(0, 60000);
      KB = { at: Date.now(), text };
    }
  } catch (e) { /* use whatever we had */ }
  return KB.text;
}

function send(res, code, obj) {
  res.statusCode = code;
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(obj));
}
const sbHeaders = (token, extra) => Object.assign({ apikey: SB_KEY, Authorization: "Bearer " + token, "Content-Type": "application/json" }, extra || {});
function istDayStart() {
  const off = 330 * 60000, day = 86400000;
  return new Date(Math.floor((Date.now() + off) / day) * day - off).toISOString();
}

module.exports = async (req, res) => {
  if (req.method !== "POST") return send(res, 405, { error: "method" });
  if (!process.env.ANTHROPIC_API_KEY) return send(res, 503, { error: "not_setup" });

  // 1. Who is asking? (must be logged in)
  const auth = String(req.headers.authorization || "");
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";
  if (!token) return send(res, 401, { error: "signin" });
  let user;
  try {
    const u = await fetch(SB_URL + "/auth/v1/user", { headers: sbHeaders(token) });
    if (!u.ok) return send(res, 401, { error: "signin" });
    user = await u.json();
  } catch (e) { return send(res, 502, { error: "auth_down" }); }

  // 2. Check the conversation
  let body = req.body;
  if (typeof body === "string") { try { body = JSON.parse(body); } catch (e) { body = null; } }
  const lang = body && body.lang === "hi" ? "hi" : "en";
  const raw = body && Array.isArray(body.messages) ? body.messages.slice(-12) : [];
  const msgs = [];
  for (const m of raw) {
    const role = m && m.role === "assistant" ? "assistant" : "user";
    const content = String((m && m.content) || "").trim().slice(0, 2000);
    if (!content) continue;
    if (msgs.length && msgs[msgs.length - 1].role === role) msgs[msgs.length - 1].content += "\n" + content;
    else msgs.push({ role, content });
  }
  while (msgs.length && msgs[0].role !== "user") msgs.shift();
  if (!msgs.length || msgs[msgs.length - 1].role !== "user") return send(res, 400, { error: "empty" });
  const question = msgs[msgs.length - 1].content;

  // 3. Daily limit (this grower's questions today, India time)
  const isAdmin = ADMIN_EMAILS.includes(String(user.email || "").toLowerCase());
  const limit = isAdmin ? ADMIN_LIMIT : LIMIT;
  let used = 0;
  try {
    const c = await fetch(SB_URL + "/rest/v1/chat_messages?select=id&role=eq.user&created_at=gte." + encodeURIComponent(istDayStart()), { headers: sbHeaders(token) });
    if (!c.ok) return send(res, 503, { error: "not_setup" });
    used = (await c.json()).length;
    if (used >= limit) return send(res, 429, { error: "limit", limit });
  } catch (e) { return send(res, 502, { error: "db_down" }); }

  // 4. Ask the AI, with the Library as background knowledge
  const kb = await knowledge();
  const system = [{ type: "text", text: PERSONA }];
  if (kb) system.push({ type: "text", text: "Seb Saathi Library (trusted background; prefer it, and mention the Library tab when a guide covers the question):\n\n" + kb, cache_control: { type: "ephemeral" } });
  system.push({ type: "text", text: "The website is currently set to " + (lang === "hi" ? "Hindi" : "English") + ". Still reply in the language the grower writes in." });
  let reply = "";
  try {
    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "x-api-key": process.env.ANTHROPIC_API_KEY, "anthropic-version": "2023-06-01", "content-type": "application/json" },
      body: JSON.stringify({ model: MODEL, max_tokens: 900, system, messages: msgs })
    });
    if (!r.ok) { console.error("ai", r.status, await r.text()); return send(res, 502, { error: "ai" }); }
    const j = await r.json();
    reply = (j.content || []).filter(b => b.type === "text").map(b => b.text).join("").trim().slice(0, 6000);
    if (!reply) return send(res, 502, { error: "ai" });
  } catch (e) { console.error("ai-fail", e); return send(res, 502, { error: "ai" }); }

  // 5. Save the question and answer (counts toward the limit; lets the grower see past chats)
  try {
    const ins = await fetch(SB_URL + "/rest/v1/chat_messages", {
      method: "POST",
      headers: sbHeaders(token, { Prefer: "return=minimal" }),
      body: JSON.stringify([{ user_id: user.id, role: "user", content: question.slice(0, 4000), lang }, { user_id: user.id, role: "assistant", content: reply.slice(0, 8000), lang }])
    });
    if (!ins.ok) console.error("save", ins.status, await ins.text());
  } catch (e) { console.error("save-fail", e); }

  return send(res, 200, { reply, left: Math.max(0, limit - used - 1) });
};
