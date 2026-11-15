// Seb Saathi — the morning brief email. Reached as /api/social?fn=brief (Vercel Hobby allows at most 12 functions).
//   Every morning at 7:45 India time Supabase calls it with the private robot key (supabase/brief_broadcast.sql),
//   or the admin page's Today tab calls it with "Email me this now" (admin sign-in).
// Needs in Vercel → Settings → Environment Variables (then Redeploy):
//   RESEND_API_KEY   from resend.com → API Keys (the same Resend account that sends the sign-in emails)
//   BRIEF_TO         where to send it: one email address, or several separated by commas
//   BRIEF_FROM       optional, default "Seb Saathi <brief@sebsaathi.com>" (the domain must be verified in Resend)
// Without them it does nothing and says what is missing.

const SB_URL = "https://rylqzyylbsephirwslce.supabase.co";
const SB_KEY = "sb_publishable_EYVtP0ljYd-jta5ENmX9Jg_mCtYLzJo"; // public key, same as the website
const SITE = "https://sebsaathi.com";

function send(res, code, obj) {
  res.statusCode = code;
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(obj));
}
async function rpc(name, args, token) {
  const r = await fetch(SB_URL + "/rest/v1/rpc/" + name, { method: "POST", headers: { apikey: SB_KEY, Authorization: "Bearer " + (token || SB_KEY), "Content-Type": "application/json" }, body: JSON.stringify(args || {}) });
  const t = await r.text();
  if (!r.ok) { const e = new Error(t.slice(0, 200)); e.status = r.status; throw e; }
  return JSON.parse(t);
}
const rup = n => "₹" + Math.round(+n || 0).toLocaleString("en-IN");
const esc = s => String(s == null ? "" : s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

/* the brief as lines: [needs action?, text, admin tab] */
function lines(b) {
  const L = [], p = b.pay || {}, r = b.ren || {}, u = b.users || {}, d = b.dx || {}, c = b.chat || {}, s = b.social || {}, a = b.ai || {};
  if (+p.unchecked) L.push([true, p.unchecked + " \"I've paid\" to match in your UPI app (" + rup(p.unchecked_sum) + ")" + (+p.overdue ? " — " + p.overdue + " waiting 3+ days" : ""), "pay"]);
  if (+p.pending) L.push([true, p.pending + " UTR payment(s) waiting for a check", "pay"]);
  if (+r.due_7) L.push([true, r.due_7 + " plan(s) ending in the next 7 days — send a renewal reminder", "pay"]);
  if (+r.ended_7) L.push([true, r.ended_7 + " plan(s) ended in the last 7 days and not renewed", "pay"]);
  (b.rising || []).slice(0, 5).forEach(x => L.push([true, "Rising: " + x.dz + " in " + x.area + " (" + x.wk + " this week, " + x.pwk + " the week before) — think about an alert", "aq"]));
  if (+u.stuck_1) L.push([true, u.stuck_1 + " of " + u.phone_1 + " mobile sign-ups yesterday never entered the code", "op"]);
  if (+d.wrong_7 || +d.notbetter_7) L.push([true, (+d.wrong_7 || 0) + " photo answers marked wrong, " + (+d.notbetter_7 || 0) + " where the spray did not help (7 days)", "aq"]);
  if (+c.bad) L.push([true, c.bad + " Saathi answer(s) marked 👎 to check", "ov"]);
  if (+b.fb_new) L.push([true, b.fb_new + " feedback message(s) not done", "fb"]);
  if (+s.drafts || +s.failed) L.push([true, (+s.drafts || 0) + " social post(s) waiting for approval" + (+s.failed ? ", " + s.failed + " failed" : ""), "mk"]);
  if (a.cap && +a.month_inr >= 0.8 * +a.cap) L.push([true, "AI cost this month " + rup(a.month_inr) + " of your " + rup(a.cap) + " limit", "op"]);
  L.push([false, "Yesterday: " + (+u.signups_1 || 0) + " sign-ups, " + (+p.paid_1 || 0) + " payments (" + rup(p.money_1) + "), " + (+d.checks_1 || 0) + " photo checks, " + (+c.q_1 || 0) + " Saathi questions", "ov"]);
  L.push([false, (+u.total || 0) + " growers in all · AI this month " + rup(a.month_inr) + (a.paused ? " · Free AI is paused" : "") + (+b.ann_live ? " · " + b.ann_live + " message(s) live on the site" : "") + (+s.today ? " · " + s.today + " post(s) going out today" : ""), "ov"]);
  return L;
}
function email(b) {
  const L = lines(b), act = L.filter(x => x[0]), info = L.filter(x => !x[0]);
  const day = new Date(Date.now() + 330 * 60000).toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", timeZone: "UTC" });
  const li = x => '<li style="margin:6px 0"><a href="' + SITE + "/admin.html#" + x[2] + '" style="color:#1F4D34;text-decoration:none">' + esc(x[1]) + "</a></li>";
  const html = '<div style="font-family:Arial,sans-serif;max-width:560px;margin:auto;color:#222">' +
    '<h2 style="color:#2F8F3A;margin:0 0 4px">🍎 Seb Saathi — your morning brief</h2><p style="color:#777;margin:0 0 16px">' + esc(day) + "</p>" +
    (act.length ? '<h3 style="margin:12px 0 4px">Needs you (' + act.length + ")</h3><ul style=\"padding-left:18px\">" + act.map(li).join("") + "</ul>" : '<p style="font-weight:bold;color:#2F8F3A">✓ Nothing needs you today.</p>') +
    '<h3 style="margin:16px 0 4px">At a glance</h3><ul style="padding-left:18px">' + info.map(li).join("") + "</ul>" +
    '<p style="margin-top:20px"><a href="' + SITE + '/admin.html#td" style="background:#2F8F3A;color:#fff;padding:10px 18px;border-radius:8px;text-decoration:none">Open Today on the admin page</a></p></div>';
  const text = "Seb Saathi — morning brief, " + day + "\n\n" + (act.length ? "Needs you:\n" + act.map(x => "- " + x[1]).join("\n") : "Nothing needs you today.") + "\n\nAt a glance:\n" + info.map(x => "- " + x[1]).join("\n") + "\n\n" + SITE + "/admin.html#td";
  return { subject: "🍎 Seb Saathi brief: " + (act.length ? act.length + " thing" + (act.length > 1 ? "s" : "") + " need you" : "all clear"), html, text };
}

module.exports = async (req, res) => {
  if (req.method !== "POST") return send(res, 405, { error: "method" });
  const key = String(req.headers["x-cron-key"] || "");
  const auth = String(req.headers.authorization || ""), token = auth.startsWith("Bearer ") ? auth.slice(7) : "";
  let b;
  try { b = key ? await rpc("brief_data", { k: key }) : token ? await rpc("admin_brief", {}, token) : null; }
  catch (e) { return send(res, e.status === 400 || e.status === 403 || /bad key|not allowed/.test(e.message) ? 403 : 502, { error: "brief", detail: e.message }); }
  if (!b) return send(res, 401, { error: "signin" });
  const rk = process.env.RESEND_API_KEY, to = String(process.env.BRIEF_TO || "").split(",").map(x => x.trim()).filter(Boolean);
  if (!rk || !to.length) return send(res, 200, { sent: false, missing: [!rk && "RESEND_API_KEY", !to.length && "BRIEF_TO"].filter(Boolean) });
  const m = email(b);
  try {
    const r = await fetch("https://api.resend.com/emails", { method: "POST", headers: { Authorization: "Bearer " + rk, "Content-Type": "application/json" },
      body: JSON.stringify({ from: process.env.BRIEF_FROM || "Seb Saathi <brief@sebsaathi.com>", to, subject: m.subject, html: m.html, text: m.text }) });
    const j = await r.json().catch(() => ({}));
    if (!r.ok) return send(res, 200, { sent: false, error: j.message || ("Resend " + r.status) });
    return send(res, 200, { sent: true, to: to.length });
  } catch (e) { return send(res, 200, { sent: false, error: String(e.message || e) }); }
};
module.exports.lines = lines;
