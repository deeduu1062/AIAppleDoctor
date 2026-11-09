// Seb Saathi — "Saathi" chatbot (Vercel serverless function)
// POST /api/chat  { messages: [{role:"user"|"assistant", content}], lang: "en"|"hi"|"hn" (Hinglish) }
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
const ADMIN_EMAILS = ["deeduu@gmail.com", "admin@sebsaathi.com"];
const ADMIN_LIMIT = 200;

const PERSONA = `You are "Saathi" (साथी), the friendly helper inside the Seb Saathi website for apple growers in Himachal Pradesh and Kashmir (mostly Royal Delicious and other Delicious types, spur types, Gala on clonal rootstocks; orchards at roughly 1,500 to 2,700 m; places like Rohru, Chirgaon, Kotkhai, Kullu, Kinnaur, Shopian, Sopore). Seb Saathi's line: "Your Orchard Manager."

How to answer:
- Reply in the grower's language. If they write in Hindi (Devanagari), reply in simple Hindi. If they write Hinglish (Hindi in English letters), reply in simple Hinglish. If English, reply in simple English. Common farm words (spray, scab, mandi, peti, aadhti, ladhani, KVK) are fine in any language.
- Be short and practical: usually 3 to 8 short lines. Use "- " bullet lines for steps. Use **bold** sparingly. No tables, no headings longer than a few words.
- Talk like a helpful, respectful village expert, not a textbook. Ask ONE short question back when you need a detail (variety, stage, height, photo, symptoms) to give a good answer.
- Be honest about uncertainty. Never invent facts, numbers, prices, rules or schemes. If you do not know, say so and say where to check.

Safety rules (always):
- NEVER name a chemical, pesticide, fungicide, brand or dose, and never invent a spray. For anything to spray, say to follow the official Himachal Pradesh apple spray schedule for the current stage (link in the Spray schedule tab of this site) and the product label, or ask the local horticulture officer / KVK.
- For serious tree problems (collar or root rot, fast spreading disease, many trees dying) advise contacting the horticulture extension officer or KVK quickly.
- Do not give legal, loan or investment advice; for scheme money amounts and rules, say to confirm at the horticulture or block office.
- Apple prices change daily: never quote or guess a current price.

Stay on topic: apple growing, orchard work, weather effects, selling, records, government help for growers, and how to use this website. For unrelated questions, politely say you only help with apples and the orchard.

The website has these tabs you can point people to:
- My Orchard Record tab (was called Dashboard): their saved orchards, weather, apple register, diary, sale lots by year, net profit and net profit per peti (needs login).
- My Sales/Profit tab (was called Profit calculator): quick calculator, Season profit (lots per orchard per year), Expenses, Yearly net profit, and "Mandi or ladhani?" comparison.
- Disease diagnosis: check by symptoms, or a photo check (logged-in growers).
- Spray schedule: link to the official Himachal spray schedule.
- Seb News: latest apple news. Season calendar: month-by-month work.
- Feedback button on every page to report problems or suggestions.

Using the grower's own records:
- You may be given "This grower's records": their orchards, seasons, diary, tasks, recent photo checks and the weather forecast at their orchards. This is private data the grower typed in themselves.
- Use it whenever it makes the answer more useful: call orchards by their names, use their altitude, varieties and dates, their last spray and the coming rain. Example: "Upper orchard was last sprayed 12 days ago and rain is forecast from Thursday, so plan the next spray before then."
- Use only what is relevant. Do not recite the whole record. Never invent records they do not have.
- You may quote their own figures (boxes, net profit, net per peti, money still due) exactly as given. Round sensibly.
- If a useful record is missing (no altitude, no location, no diary), answer anyway and suggest, in one short line, adding it in the My Orchard Record tab.
- Weather is a forecast for their orchard location and can change. Rain or long wet spells raise the risk of scab and premature leaf fall (Marssonina); say so when relevant, but still follow the safety rules for sprays.`;

// ---- This grower's own records, so Saathi can answer about THEIR orchards ----
const T = ms => (typeof AbortSignal !== "undefined" && AbortSignal.timeout ? AbortSignal.timeout(ms) : undefined);
const COST_KEYS = ["spray", "fert", "labour", "prune", "irrig", "other"];
const DIARY_COST = { spray: "spray", fert: "fert", prune: "prune", irrig: "irrig", labour: "labour" };
const n0 = v => (isFinite(+v) ? +v : 0);
const inr = v => "Rs " + Math.round(v).toLocaleString("en-IN");
const clip = (t, k) => String(t || "").replace(/\s+/g, " ").trim().slice(0, k);
const hYear = d => { const m = /^(\d{4})-/.exec(String(d || "")); return m ? +m[1] : NaN; };
function istToday() { return new Date(Date.now() + 330 * 60000).toISOString().slice(0, 10); }
function daysAgo(d, today) { const a = Date.parse(d), b = Date.parse(today); return isFinite(a) && isFinite(b) ? Math.round((b - a) / 86400000) : null; }

function seasonFigures(se, o) {
  let boxes = 0, eq = 0, rev = 0, lotExp = 0, due = 0;
  (se.lots || []).forEach(l => (l.lines || []).forEach(n => {
    const b = n0(n.boxes), r = n0(n.rate), e = n0(n.tod) + n0(n.grd) + n0(n.car) + n0(n.exp);
    const gross = b * r, com = gross * Math.min(Math.max(n0(n.com), 0), 100) / 100;
    boxes += b; eq += n.half ? b / 2 : b; rev += gross; lotExp += b * e + com; if (!n.paid) due += gross;
  }));
  let yearly = COST_KEYS.reduce((a, k) => a + n0(se.costs && se.costs[k]), 0);
  ((o && o.diary) || []).forEach(d => { if (n0(d.cost) > 0 && hYear(d.date) === +se.year) yearly += n0(d.cost); });
  ((o && o.labour) || []).forEach(e => { if (e && e.type === "work" && hYear(e.date) === +se.year) yearly += n0(e.days) * n0(e.rate); });
  const cost = lotExp + yearly, profit = rev - cost;
  return { boxes, rev, cost, profit, ppb: eq ? profit / eq : 0, due };
}

async function weatherFor(o) {
  const P = o.profile || {};
  if (!isFinite(parseFloat(P.lat)) || !isFinite(parseFloat(P.lon))) return "";
  try {
    const r = await fetch("https://api.open-meteo.com/v1/forecast?latitude=" + (+P.lat) + "&longitude=" + (+P.lon) +
      "&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max&past_days=7&forecast_days=6&timezone=Asia%2FKolkata", { signal: T(3500) });
    if (!r.ok) return "";
    const d = (await r.json()).daily; if (!d || !d.time) return "";
    const today = istToday(); let past = 0, wetPast = 0; const next = [];
    d.time.forEach((t, i) => {
      const rain = n0(d.precipitation_sum[i]);
      if (t < today) { past += rain; if (rain >= 1) wetPast++; }
      else next.push(t.slice(5) + ": " + Math.round(n0(d.temperature_2m_min[i])) + "-" + Math.round(n0(d.temperature_2m_max[i])) + "C, rain " + rain.toFixed(1) + " mm (" + Math.round(n0(d.precipitation_probability_max[i])) + "%)");
    });
    return "  Weather at " + clip(o.name, 40) + ": last 7 days rain " + past.toFixed(1) + " mm on " + wetPast + " days. Next days: " + next.join("; ");
  } catch (e) { return ""; }
}

async function growerContext(token, userId) {
  const today = istToday(), yearNow = +today.slice(0, 4);
  let data = null, checks = [];
  try {
    const [lr, dr] = await Promise.all([
      fetch(SB_URL + "/rest/v1/ledgers?select=data&user_id=eq." + encodeURIComponent(userId), { headers: sbHeaders(token), signal: T(3500) }),
      fetch(SB_URL + "/rest/v1/diagnoses?select=created_at,part,result&user_id=eq." + encodeURIComponent(userId) + "&order=created_at.desc&limit=5", { headers: sbHeaders(token), signal: T(3500) })
    ]);
    if (lr.ok) { const rows = await lr.json(); data = rows && rows[0] ? rows[0].data : null; }
    if (dr.ok) checks = await dr.json();
  } catch (e) { /* answer without records */ }

  const L = ["Today is " + today + " (India time)."];
  const orch = data && Array.isArray(data.orchards) ? data.orchards.filter(o => o && o.id && !o.ex).slice(0, 8) : [];
  if (!orch.length) L.push("This grower has not added any orchards yet.");
  orch.forEach(o => {
    const P = o.profile || {}, facts = [];
    if (P.village) facts.push(clip(P.village, 50));
    if (n0(P.alt)) facts.push(Math.round(n0(P.alt)) + " m");
    if (n0(P.area)) facts.push(n0(P.area) + " bigha");
    if (n0(o.trees)) facts.push(n0(o.trees) + " trees");
    if (P.var) facts.push("varieties: " + clip(P.var, 80));
    if (P.root) facts.push("rootstock: " + clip(P.root, 40));
    if (n0(P.planted)) facts.push("planted " + n0(P.planted));
    if (P.irr) facts.push("irrigation: " + clip(P.irr, 30));
    if (P.hail) facts.push("hail net: " + clip(P.hail, 30));
    L.push("Orchard \"" + clip(o.name || "Orchard", 40) + "\"" + (facts.length ? ": " + facts.join(", ") : " (no details added)"));

    const seasons = (data.seasons || []).filter(s => s && s.oid === o.id && isFinite(+s.year)).sort((a, b) => b.year - a.year).slice(0, 4);
    seasons.forEach(se => {
      const f = seasonFigures(se, o);
      if (!f.boxes && !f.cost) return;
      L.push("  " + se.year + ": " + Math.round(f.boxes) + " boxes sold for " + inr(f.rev) + ", costs " + inr(f.cost) + ", net profit " + inr(f.profit) +
        (f.boxes ? " (" + inr(f.ppb) + " per peti)" : "") + (f.due > 0 ? ", " + inr(f.due) + " still to be paid" : ""));
    });

    const diary = (o.diary || []).filter(d => d && d.date && d.date <= today).sort((a, b) => (a.date < b.date ? 1 : -1));
    const lastSpray = diary.find(d => d.kind === "spray");
    if (lastSpray) L.push("  Last spray: " + lastSpray.date + " (" + daysAgo(lastSpray.date, today) + " days ago)" + (lastSpray.stage ? ", stage " + clip(lastSpray.stage, 30) : "") + (lastSpray.text ? ", " + clip(lastSpray.text, 80) : ""));
    else L.push("  No spray recorded in the diary.");
    const recent = diary.filter(d => { const k = daysAgo(d.date, today); return k != null && k <= 90; }).slice(0, 10);
    if (recent.length) L.push("  Diary, last 90 days: " + recent.map(d => d.date + " " + d.kind + (d.stage ? " [" + clip(d.stage, 25) + "]" : "") + (d.text ? " - " + clip(d.text, 70) : "") + (n0(d.cost) ? " (" + inr(d.cost) + ")" : "")).join("; "));
    const todos = (o.todos || []).filter(x => x && !x.done).sort((a, b) => String(a.due || "9").localeCompare(String(b.due || "9"))).slice(0, 5);
    if (todos.length) L.push("  Open tasks: " + todos.map(x => (x.due ? x.due + " " : "") + clip(x.kind, 20) + (x.text ? " - " + clip(x.text, 60) : "")).join("; "));
  });
  if (orch.length && !orch.some(o => (data.seasons || []).some(s => s.oid === o.id && s.year === yearNow))) L.push("No season added yet for " + yearNow + ".");

  const wx = (await Promise.all(orch.slice(0, 3).map(weatherFor))).filter(Boolean);
  if (wx.length) L.push("Weather forecast (Open-Meteo):", ...wx);
  else if (orch.length) L.push("No orchard location saved, so no local weather.");

  const ck = (checks || []).map(c => {
    const m = c.result && Array.isArray(c.result.matches) && c.result.matches[0];
    return String(c.created_at || "").slice(0, 10) + (c.part ? " " + clip(c.part, 20) : "") + ": " + (m ? m.id + " (" + m.confidence + ")" : "unclear photo");
  });
  if (ck.length) L.push("Recent photo checks: " + ck.join("; "));
  return L.join("\n").slice(0, 7000);
}

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
  const lang = body && (body.lang === "hi" || body.lang === "hn") ? body.lang : "en";
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

  // 4. Ask the AI, with the Library and this grower's own records as background
  const [kb, mine] = await Promise.all([knowledge(), growerContext(token, user.id).catch(() => "")]);
  const system = [{ type: "text", text: PERSONA }];
  if (kb) system.push({ type: "text", text: "Seb Saathi knowledge base (trusted background; prefer it. There is no Library tab on the site, so never tell growers to open one):\n\n" + kb, cache_control: { type: "ephemeral" } });
  if (mine) system.push({ type: "text", text: "This grower's records (private to them):\n" + mine });
  system.push({ type: "text", text: "The website is currently set to " + (lang === "hi" ? "Hindi" : lang === "hn" ? "Hinglish (Hindi written in English letters, e.g. \"Patton par daag hain to spray kab karein?\")" : "English") + ". Still reply in the language the grower writes in; if unclear, use the website's language." });
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

  // 5. Save the question and answer (counts toward the limit; lets the grower see past chats and rate answers)
  let savedId = null;
  try {
    const ins = await fetch(SB_URL + "/rest/v1/chat_messages", {
      method: "POST",
      headers: sbHeaders(token, { Prefer: "return=representation" }),
      body: JSON.stringify([{ user_id: user.id, role: "user", content: question.slice(0, 4000), lang }, { user_id: user.id, role: "assistant", content: reply.slice(0, 8000), lang }])
    });
    if (!ins.ok) console.error("save", ins.status, await ins.text());
    else { const rows = await ins.json().catch(() => []); const a = (rows || []).find(x => x && x.role === "assistant"); if (a) savedId = a.id; }
  } catch (e) { console.error("save-fail", e); }

  return send(res, 200, { reply, id: savedId, left: Math.max(0, limit - used - 1) });
};
