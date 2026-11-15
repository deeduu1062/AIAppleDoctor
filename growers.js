/* Seb Saathi admin — "Growth" tab: sign-up funnel, quiet growers, invite tracking.
   Needs supabase/admin_growers.sql (function admin_growth). Visitors come from admin_site_stats (visits.sql). */
Object.assign(T.en, {
  adm_t_gr: "Growth", gr_h: "Growers: funnel, quiet growers and invites", gr_p: "Where growers drop off, who has gone quiet, and who brings in friends.",
  gr_err_setup: "Not set up yet. Run supabase/admin_growers.sql once in the Supabase SQL Editor, then tap Refresh.", gr_err: "Could not load: {m}",
  gr_per: "Joined in the last {n} days", gr_per_all: "Everyone",
  gr_f_h: "Sign-up funnel", gr_f_p: "Each step counts growers who reached it. The red step is where most growers stop.",
  gr_f_vis: "Visited the site (30 days)", gr_f_sign: "Signed up", gr_f_conf: "Finished sign-in (code or link)", gr_f_orch: "Added an orchard", gr_f_sale: "Entered a sale", gr_f_paid: "Paid for a plan",
  gr_f_of: "{p}% of the step before", gr_f_drop: "Biggest drop: {a} → {b}. Most growers stop here.",
  gr_q_h: "Quiet growers", gr_q_p: "Signed-in growers with no activity (sign-in, records, photo check or Saathi question) for {n} days or more. Paid growers first.",
  gr_q_days: "Quiet for {n}+ days", gr_c_who: "Grower", gr_c_plan: "Plan", gr_c_last: "Last active", gr_c_orch: "Orchards", gr_c_act: "Nudge",
  gr_q_none: "No quiet growers. 🎉", gr_q_free: "Free", gr_q_paid: "Paid till {d}", gr_q_ago: "{n} days ago", gr_q_never: "Never used it",
  gr_wa: "WhatsApp", gr_mail: "Email", gr_none: "–",
  gr_nudge: "Namaste! Seb Saathi se yaad dila rahe hain 🍎 Is mausam ka hisaab aur bagiche ka record ek jagah rakhein, aur patte ki photo se bimari jaanchein. Yahan kholiye: https://sebsaathi.com",
  gr_i_h: "Invites", gr_i_p: "Growers who brought friends with their invite link. Every 3 friends who finish sign-up earn one free month.",
  gr_c_joined: "Friends joined", gr_c_ipaid: "Of them paid", gr_c_rew: "Free months taken", gr_c_due: "Free months waiting", gr_c_thank: "Thank",
  gr_i_none: "No invites used yet.", gr_i_tot: "{n} growers joined through an invite; {p} of them paid.",
  gr_thank: "Namaste! Seb Saathi par itne bagwan dosto ko jodne ke liye dil se dhanyavaad 🙏🍎 Har 3 dosto par ek mahina free milta hai — 'Mera account' mein dekhein."
});
Object.assign(T.hi, {
  adm_t_gr: "बढ़त", gr_h: "बाग़वान: फ़नल, चुप बाग़वान और न्योते", gr_p: "बाग़वान कहाँ रुकते हैं, कौन चुप हो गया, और कौन दोस्तों को लाता है।",
  gr_err_setup: "अभी सेट नहीं है। Supabase SQL Editor में supabase/admin_growers.sql एक बार चलाएँ, फिर Refresh दबाएँ।", gr_err: "लोड नहीं हो सका: {m}",
  gr_per: "पिछले {n} दिन में जुड़े", gr_per_all: "सभी",
  gr_f_h: "साइन-अप फ़नल", gr_f_p: "हर क़दम पर पहुँचे बाग़वान। लाल क़दम पर सबसे ज़्यादा बाग़वान रुकते हैं।",
  gr_f_vis: "साइट पर आए (30 दिन)", gr_f_sign: "साइन अप किया", gr_f_conf: "साइन-इन पूरा किया", gr_f_orch: "बाग़ जोड़ा", gr_f_sale: "बिक्री लिखी", gr_f_paid: "प्लान ख़रीदा",
  gr_f_of: "पिछले क़दम का {p}%", gr_f_drop: "सबसे बड़ी गिरावट: {a} → {b}। ज़्यादातर बाग़वान यहीं रुकते हैं।",
  gr_q_h: "चुप बाग़वान", gr_q_p: "{n} दिन या ज़्यादा से कोई गतिविधि नहीं (साइन-इन, रिकॉर्ड, फ़ोटो जाँच या सवाल)। पहले पैसे देने वाले।",
  gr_q_days: "{n}+ दिन से चुप", gr_c_who: "बाग़वान", gr_c_plan: "प्लान", gr_c_last: "आख़िरी बार", gr_c_orch: "बाग़", gr_c_act: "याद दिलाएँ",
  gr_q_none: "कोई चुप बाग़वान नहीं। 🎉", gr_q_free: "मुफ़्त", gr_q_paid: "{d} तक", gr_q_ago: "{n} दिन पहले", gr_q_never: "कभी इस्तेमाल नहीं किया",
  gr_wa: "WhatsApp", gr_mail: "ईमेल",
  gr_i_h: "न्योते", gr_i_p: "जिन बाग़वानों ने अपने लिंक से दोस्त जोड़े। हर 3 दोस्तों पर एक महीना मुफ़्त।",
  gr_c_joined: "जुड़े दोस्त", gr_c_ipaid: "जिन्होंने भुगतान किया", gr_c_rew: "लिए मुफ़्त महीने", gr_c_due: "बाकी मुफ़्त महीने", gr_c_thank: "धन्यवाद",
  gr_i_none: "अभी किसी न्योते से कोई नहीं जुड़ा।", gr_i_tot: "{n} बाग़वान न्योते से जुड़े; {p} ने भुगतान किया।"
});

let GR = null, grBusy = false, grPer = 90, grQuiet = 30;
async function loadGr() {
  if (!$("grBody") || !isAdmin() || !sb || grBusy) return;
  grBusy = true; set("grErr", ""); set("grAt", tr("ad_loading")); $("grRefresh").disabled = true;
  let rows = null, err = null, vis = null;
  try { const r = await sb.rpc("admin_growth"); if (r.error) err = r.error; else rows = r.data || []; } catch (e) { err = e; }
  try { const r = await sb.rpc("admin_site_stats"); if (!r.error && r.data && r.data.visitors) vis = +r.data.visitors.d30 || null; } catch (e) {}
  grBusy = false; $("grRefresh").disabled = false; set("grAt", "");
  if (err) { const m = String(err.message || err); set("grErr", /could not find the function|does not exist|schema cache|PGRST202/i.test(m + (err.code || "")) ? tr("gr_err_setup") : tr("gr_err").replace("{m}", m)); }
  GR = rows ? { rows: rows.filter(u => ADMIN_EMAILS.indexOf(String(u.email || "").toLowerCase()) < 0), vis, at: new Date().toISOString() } : null;
  if (GR) set("grAt", tr("ov_at").replace("{t}", adWhen(GR.at)));
  renderGr();
}
const grLast = u => [u.last_sign_in_at, u.led_at, u.dx_at, u.ch_at].filter(Boolean).sort().pop() || null;
const grPhone = u => {
  const p = String(u.phone || "").replace(/\D/g, "");
  if (p) return p;
  const m = /^\+?(\d{10,13})@m\.sebsaathi\.com$/i.exec(String(u.email || "")); return m ? m[1] : "";
};
const grWho = u => { const p = grPhone(u); return u.email && !/@m\.sebsaathi\.com$/i.test(u.email) ? u.email : p ? "+" + p : "–"; };
const grIsPaid = u => !!(u.paid_until && u.paid_until >= new Date().toISOString().slice(0, 10));
function grContact(u, msg) {
  const p = grPhone(u), wa = p ? "https://wa.me/" + (p.length === 10 ? "91" + p : p) + "?text=" + encodeURIComponent(msg) : "";
  const em = u.email && !/@m\.sebsaathi\.com$/i.test(u.email) ? "mailto:" + u.email + "?subject=" + encodeURIComponent("Seb Saathi") + "&body=" + encodeURIComponent(msg) : "";
  return (wa ? '<a class="btn-s add sm" href="' + esc(wa) + '" target="_blank" rel="noopener">' + esc(tr("gr_wa")) + "</a> " : "") +
    (em ? '<a class="btn-s sm" href="' + esc(em) + '">' + esc(tr("gr_mail")) + "</a>" : "") || "–";
}

function renderGr() {
  if (!$("grBody")) return;
  if (!GR) { $("grBody").innerHTML = ""; return; }
  $("grBody").innerHTML = grFunnelHtml() + grQuietHtml() + grInvHtml();
}
function grFunnelHtml() {
  const cut = grPer ? new Date(Date.now() - grPer * 864e5).toISOString() : "";
  const U = GR.rows.filter(u => !cut || u.created_at >= cut);
  const steps = [["gr_f_sign", U.length], ["gr_f_conf", U.filter(u => u.confirmed).length], ["gr_f_orch", U.filter(u => +u.orchards > 0).length],
    ["gr_f_sale", U.filter(u => u.has_sale).length], ["gr_f_paid", U.filter(u => u.ever_paid).length]];
  if (grPer === 30 && GR.vis) steps.unshift(["gr_f_vis", GR.vis]);
  let worst = -1, wv = 2;
  steps.forEach((s, i) => { if (i && steps[i - 1][1]) { const r = s[1] / steps[i - 1][1]; if (r < wv) { wv = r; worst = i; } } });
  const max = Math.max(1, steps[0][1]);
  const pick = '<div class="sbfilt">' + [30, 90, 365, 0].map(n => '<button class="btn-s" type="button" data-grp="' + n + '" aria-pressed="' + (grPer === n) + '">' + esc(n ? tr("gr_per").replace("{n}", n) : tr("gr_per_all")) + "</button>").join("") + "</div>";
  return '<h5 class="ovsub">' + esc(tr("gr_f_h")) + '</h5><p class="fine">' + esc(tr("gr_f_p")) + "</p>" + pick +
    '<div class="grfun">' + steps.map((s, i) => {
      const of = i && steps[i - 1][1] ? Math.round(s[1] / steps[i - 1][1] * 100) : null;
      return '<div class="grstep' + (i === worst ? " bad" : "") + '"><span class="grl">' + esc(tr(s[0])) + '</span><span class="grbar"><i style="width:' + Math.max(2, s[1] / max * 100) + '%"></i></span><b>' + fmtN(s[1]) + "</b>" +
        (of != null ? '<small>' + esc(tr("gr_f_of").replace("{p}", of)) + "</small>" : "<small></small>") + "</div>";
    }).join("") + "</div>" +
    (worst > 0 && steps[worst - 1][1] ? '<p class="aqalert">' + esc(tr("gr_f_drop").replace("{a}", tr(steps[worst - 1][0])).replace("{b}", tr(steps[worst][0]))) + "</p>" : "");
}
function grQuietHtml() {
  const now = Date.now(), cut = now - grQuiet * 864e5;
  const Q = GR.rows.filter(u => u.confirmed && +new Date(u.created_at) < cut && (!grLast(u) || +new Date(grLast(u)) < cut))
    .sort((a, b) => grIsPaid(b) - grIsPaid(a) || String(grLast(b) || "").localeCompare(String(grLast(a) || "")));
  const pick = '<div class="sbfilt">' + [14, 30, 60].map(n => '<button class="btn-s" type="button" data-grq="' + n + '" aria-pressed="' + (grQuiet === n) + '">' + esc(tr("gr_q_days").replace("{n}", n)) + "</button>").join("") + "</div>";
  return '<h5 class="ovsub">' + esc(tr("gr_q_h")) + " (" + fmtN(Q.length) + ')</h5><p class="fine">' + esc(tr("gr_q_p").replace("{n}", grQuiet)) + "</p>" + pick +
    (!Q.length ? '<p class="empty">' + esc(tr("gr_q_none")) + "</p>" :
      '<div class="tablewrap"><table class="ledger"><thead><tr>' + ["gr_c_who", "gr_c_plan", "gr_c_last", "gr_c_orch", "gr_c_act"].map(k => '<th scope="col">' + esc(tr(k)) + "</th>").join("") + "</tr></thead><tbody>" +
      Q.slice(0, 100).map(u => {
        const l = grLast(u), d = l ? Math.floor((now - new Date(l)) / 864e5) : null;
        return "<tr><td>" + esc(grWho(u)) + "</td><td>" + (grIsPaid(u) ? '<span class="tag ok">' + esc(tr("gr_q_paid").replace("{d}", paDay(u.paid_until))) + "</span>" : esc(tr("gr_q_free"))) + "</td>" +
          "<td>" + (d == null ? esc(tr("gr_q_never")) : esc(tr("gr_q_ago").replace("{n}", fmtN(d)))) + '</td><td class="n">' + fmtN(+u.orchards || 0) + "</td><td>" + grContact(u, T.en.gr_nudge) + "</td></tr>";
      }).join("") + "</tbody></table></div>");
}
function grInvHtml() {
  const byCode = {};
  GR.rows.forEach(u => { if (u.ref && u.ref !== u.code) (byCode[u.ref] = byCode[u.ref] || []).push(u); });
  const R = GR.rows.filter(u => byCode[u.code]).map(u => {
    const F = byCode[u.code].filter(f => f.confirmed), rew = +u.rewards || 0;
    return { u, joined: F.length, paid: F.filter(f => f.ever_paid).length, rew, due: Math.max(0, Math.floor(F.length / 3) - rew) };
  }).filter(r => r.joined).sort((a, b) => b.joined - a.joined || b.paid - a.paid);
  const tj = R.reduce((s, r) => s + r.joined, 0), tp = R.reduce((s, r) => s + r.paid, 0);
  return '<h5 class="ovsub">' + esc(tr("gr_i_h")) + '</h5><p class="fine">' + esc(tr("gr_i_p")) + "</p>" +
    (!R.length ? '<p class="empty">' + esc(tr("gr_i_none")) + "</p>" :
      '<p class="fine">' + esc(tr("gr_i_tot").replace("{n}", fmtN(tj)).replace("{p}", fmtN(tp))) + "</p>" +
      '<div class="tablewrap"><table class="ledger"><thead><tr>' + ["gr_c_who", "gr_c_joined", "gr_c_ipaid", "gr_c_rew", "gr_c_due", "gr_c_thank"].map((k, i) => '<th scope="col"' + (i && i < 5 ? ' class="n"' : "") + ">" + esc(tr(k)) + "</th>").join("") + "</tr></thead><tbody>" +
      R.slice(0, 100).map(r => "<tr" + (r.due ? ' class="pfhit"' : "") + "><td>" + esc(grWho(r.u)) + '</td><td class="n">' + fmtN(r.joined) + '</td><td class="n">' + fmtN(r.paid) + '</td><td class="n">' + fmtN(r.rew) +
        '</td><td class="n">' + fmtN(r.due) + "</td><td>" + grContact(r.u, T.en.gr_thank) + "</td></tr>").join("") + "</tbody></table></div>");
}
document.addEventListener("click", e => {
  const t = e.target.closest && e.target.closest("[data-grp],[data-grq]"); if (!t || !GR) return;
  if (t.dataset.grp != null) grPer = +t.dataset.grp; else grQuiet = +t.dataset.grq;
  renderGr();
});
if ($("grRefresh")) $("grRefresh").addEventListener("click", loadGr);
/* these texts arrive after admin.js drew the page: draw again, and load now if this tab was opened before this file arrived */
if (typeof applyLang === "function") applyLang();
if (typeof tab !== "undefined" && tab === "gr" && typeof loaded !== "undefined" && loaded.gr && isAdmin() && !GR) loadGr();
