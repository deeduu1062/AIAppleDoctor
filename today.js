/* Seb Saathi admin — "Today" tab: the daily brief. Everything that needs you, in one place, each line opening the right tab.
   Data: admin_brief() (supabase/brief_broadcast.sql). The same brief is emailed every morning (api/_brief.js). */
Object.assign(T.en, {
  adm_t_td: "Today", td_h: "Today", td_p: "Everything that needs you, in one place. Tap a line to open it. The same brief can come to your email every morning at 7:45 (India time).",
  td_err_setup: "Not set up yet. Run supabase/brief_broadcast.sql once in the Supabase SQL Editor, then tap Refresh.", td_err: "Could not load: {m}",
  td_need: "Needs you ({n})", td_clear: "✓ All clear — nothing needs you right now.", td_glance: "At a glance",
  td_mail: "✉ Email me this now", td_mail_busy: "Sending…", td_mail_ok: "Sent to your email.", td_mail_miss: "The email is not set up yet. In Vercel → Settings → Environment Variables add {m}, then Redeploy. (RESEND_API_KEY is from resend.com → API Keys; BRIEF_TO is your email.)",
  td_mail_err: "Could not send: {m}",
  td_k_pay: "Payments", td_k_ren: "Renewals", td_k_rise: "Disease alert", td_k_login: "Sign-in", td_k_ai: "AI answers", td_k_chat: "Saathi", td_k_fb: "Feedback", td_k_soc: "Social", td_k_cost: "AI cost",
  td_g_y: "Yesterday", td_g_signups: "Sign-ups", td_g_paid: "Payments", td_g_money: "Money in", td_g_checks: "Photo checks", td_g_q: "Saathi questions", td_g_total: "Growers in all", td_g_ai: "AI this month", td_g_live: "Messages live",
  td_l_unchecked: "{n} \"I've paid\" to match in your UPI app ({a})", td_l_overdue: " — {n} waiting 3+ days", td_l_pending: "{n} UTR payment(s) waiting for a check",
  td_l_due: "{n} plan(s) ending in the next 7 days — send renewal reminders", td_l_ended: "{n} plan(s) ended in the last 7 days, not renewed",
  td_l_rise: "{d} rising in {a}: {w} this week, {p} the week before", td_l_rise_go: "Send an alert", td_l_stuck: "{n} of {t} mobile sign-ups yesterday never entered the code",
  td_l_wrong: "{w} photo answers marked wrong, {b} where the spray did not help (7 days)", td_l_bad: "{n} Saathi answer(s) marked 👎 to check", td_l_fb: "{n} feedback message(s) not done",
  td_l_soc: "{n} social post(s) waiting for your approval", td_l_socf: "{n} social post(s) failed", td_l_ai: "AI cost {c} of your {l} monthly limit", td_l_paused: "Free-plan AI is paused (Site health)"
});
Object.assign(T.hi, {
  adm_t_td: "आज", td_h: "आज", td_p: "जो कुछ आपका इंतज़ार कर रहा है, एक जगह। किसी लाइन पर टैप करें। यही सार हर सुबह 7:45 बजे ईमेल पर भी आ सकता है।",
  td_err_setup: "अभी सेट नहीं है। Supabase SQL Editor में supabase/brief_broadcast.sql एक बार चलाएँ।", td_err: "लोड नहीं हो सका: {m}",
  td_need: "आपके लिए ({n})", td_clear: "✓ सब ठीक — अभी कुछ बाकी नहीं।", td_glance: "एक नज़र में",
  td_mail: "✉ अभी मुझे ईमेल करें", td_mail_busy: "भेज रहे हैं…", td_mail_ok: "ईमेल भेज दिया।", td_mail_err: "भेज नहीं सके: {m}",
  td_k_pay: "भुगतान", td_k_ren: "नवीनीकरण", td_k_rise: "बीमारी चेतावनी", td_k_login: "साइन-इन", td_k_ai: "AI जवाब", td_k_chat: "साथी", td_k_fb: "सुझाव", td_k_soc: "सोशल", td_k_cost: "AI ख़र्च",
  td_g_y: "कल", td_g_signups: "साइन-अप", td_g_paid: "भुगतान", td_g_money: "आए पैसे", td_g_checks: "फ़ोटो जाँच", td_g_q: "साथी सवाल", td_g_total: "कुल बाग़वान", td_g_ai: "इस महीने AI", td_g_live: "चालू संदेश",
  td_l_rise_go: "चेतावनी भेजें"
});

let TD = null, tdBusy = false, tdMail = "";
async function loadTd() {
  if (!$("tdBody") || !isAdmin() || !sb || tdBusy) return;
  tdBusy = true; set("tdErr", ""); set("tdAt", tr("ad_loading")); $("tdRefresh").disabled = true;
  try { const r = await sb.rpc("admin_brief"); if (r.error) throw r.error; TD = r.data || {}; }
  catch (e) { const m = String(e.message || e); set("tdErr", /could not find the function|schema cache|PGRST202/i.test(m + (e.code || "")) ? tr("td_err_setup") : tr("td_err").replace("{m}", m)); }
  tdBusy = false; $("tdRefresh").disabled = false; set("tdAt", TD ? tr("ov_at").replace("{t}", adWhen(TD.at || new Date().toISOString())) : "");
  renderTd();
}
function tdLines() {
  const b = TD || {}, L = [], p = b.pay || {}, r = b.ren || {}, u = b.users || {}, d = b.dx || {}, c = b.chat || {}, s = b.social || {}, a = b.ai || {}, n = x => +x || 0;
  const add = (k, tab, txt, extra) => L.push({ k, tab, txt, extra });
  if (n(p.unchecked)) add("pay", "pay", tr("td_l_unchecked").replace("{n}", fmtN(n(p.unchecked))).replace("{a}", rupees(n(p.unchecked_sum))) + (n(p.overdue) ? tr("td_l_overdue").replace("{n}", n(p.overdue)) : ""), { sub: "pending" });
  if (n(p.pending)) add("pay", "pay", tr("td_l_pending").replace("{n}", n(p.pending)), { sub: "pending" });
  if (n(r.due_7)) add("ren", "pay", tr("td_l_due").replace("{n}", n(r.due_7)), { sub: "ren" });
  if (n(r.ended_7)) add("ren", "pay", tr("td_l_ended").replace("{n}", n(r.ended_7)), { sub: "ren" });
  (b.rising || []).slice(0, 6).forEach(x => add("rise", "bc", tr("td_l_rise").replace("{d}", (typeof aqNames === "function" && typeof AQ !== "undefined" && AQ ? aqNames()[x.dz] : "") || (String(x.dz).charAt(0).toUpperCase() + String(x.dz).slice(1)).replace(/_/g, " ")).replace("{a}", x.area).replace("{w}", x.wk).replace("{p}", x.pwk), { rise: x }));
  if (n(u.stuck_1)) add("login", "op", tr("td_l_stuck").replace("{n}", n(u.stuck_1)).replace("{t}", n(u.phone_1)));
  if (n(d.wrong_7) || n(d.notbetter_7)) add("ai", "aq", tr("td_l_wrong").replace("{w}", n(d.wrong_7)).replace("{b}", n(d.notbetter_7)));
  if (n(c.bad)) add("chat", "ov", tr("td_l_bad").replace("{n}", n(c.bad)));
  if (n(b.fb_new)) add("fb", "fb", tr("td_l_fb").replace("{n}", n(b.fb_new)));
  if (n(s.drafts)) add("soc", "mk", tr("td_l_soc").replace("{n}", n(s.drafts)));
  if (n(s.failed)) add("soc", "mk", tr("td_l_socf").replace("{n}", n(s.failed)));
  if (a.cap && n(a.month_inr) >= 0.8 * n(a.cap)) add("cost", "op", tr("td_l_ai").replace("{c}", rupees(Math.round(n(a.month_inr)))).replace("{l}", rupees(n(a.cap))));
  if (a.paused) add("cost", "op", tr("td_l_paused"));
  return L;
}
const TD_ICON = { pay: "💰", ren: "🔁", rise: "⚠️", login: "📱", ai: "🔍", chat: "💬", fb: "📝", soc: "📣", cost: "🤖" };
function renderTd() {
  if (!$("tdBody")) return;
  if (!TD) { $("tdBody").innerHTML = ""; return; }
  const L = tdLines(), b = TD, p = b.pay || {}, u = b.users || {}, d = b.dx || {}, c = b.chat || {}, a = b.ai || {}, n = x => +x || 0;
  const st = (k, v, cls) => "<div" + (cls ? ' class="' + cls + '"' : "") + "><span>" + esc(tr(k)) + "</span><b>" + v + "</b></div>";
  $("tdBody").innerHTML =
    (L.length ? '<h5 class="ovsub">' + esc(tr("td_need").replace("{n}", L.length)) + '</h5><div class="tdlist">' + L.map((x, i) =>
      '<button type="button" class="tdline td-' + x.k + '" data-tdi="' + i + '"><span class="tdic" aria-hidden="true">' + TD_ICON[x.k] + '</span><span><small>' + esc(tr("td_k_" + x.k)) + "</small>" + esc(x.txt) + "</span>" +
        (x.extra && x.extra.rise ? '<span class="btn-s add sm">' + esc(tr("td_l_rise_go")) + "</span>" : '<span class="tdgo" aria-hidden="true">›</span>') + "</button>").join("") + "</div>"
      : '<p class="tdclear">' + esc(tr("td_clear")) + "</p>") +
    '<h5 class="ovsub">' + esc(tr("td_glance")) + " · " + esc(tr("td_g_y")) + '</h5><div class="ystats">' +
      st("td_g_signups", fmtN(n(u.signups_1)), "main") + st("td_g_paid", fmtN(n(p.paid_1))) + st("td_g_money", rupees(n(p.money_1)), n(p.money_1) ? "pos" : "") + st("td_g_checks", fmtN(n(d.checks_1))) + st("td_g_q", fmtN(n(c.q_1))) + "</div>" +
    '<div class="ystats">' + st("td_g_total", fmtN(n(u.total))) + st("td_g_ai", rupees(Math.round(n(a.month_inr)))) + st("td_g_live", fmtN(n(b.ann_live))) + "</div>" +
    '<p><button type="button" class="btn-s" id="tdMail">' + esc(tr("td_mail")) + '</button></p><p class="fine" id="tdMailMsg" role="status">' + esc(tdMail) + "</p>";
}
document.addEventListener("click", async e => {
  const t = e.target.closest && e.target.closest("[data-tdi], #tdMail"); if (!t) return;
  if (t.id === "tdMail") {
    t.disabled = true; set("tdMailMsg", tr("td_mail_busy"));
    try {
      const tok = (await sb.auth.getSession()).data.session.access_token;
      const r = await fetch("/api/social?fn=brief", { method: "POST", headers: { "Content-Type": "application/json", Authorization: "Bearer " + tok }, body: "{}" });
      const j = await r.json().catch(() => ({}));
      tdMail = j.sent ? tr("td_mail_ok") : j.missing ? tr("td_mail_miss").replace("{m}", j.missing.join(" and ")) : tr("td_mail_err").replace("{m}", j.error || j.detail || ("HTTP " + r.status));
    } catch (x) { tdMail = tr("td_mail_err").replace("{m}", String(x.message || x)); }
    t.disabled = false; set("tdMailMsg", tdMail); return;
  }
  const x = tdLines()[+t.dataset.tdi]; if (!x) return;
  if (x.extra && x.extra.sub && typeof paShow !== "undefined") paShow = x.extra.sub;
  if (x.extra && x.extra.rise && typeof bcFromRise === "function") { bcFromRise(x.extra.rise); return; }
  if (typeof showTab === "function") showTab(x.tab);
  if (x.tab === "pay" && typeof renderPayAdmin === "function") renderPayAdmin();
});
if ($("tdRefresh")) $("tdRefresh").addEventListener("click", loadTd);
if (typeof applyLang === "function") applyLang();
if (typeof tab !== "undefined" && tab === "td" && typeof loaded !== "undefined" && loaded.td && isAdmin() && !TD) loadTd();
