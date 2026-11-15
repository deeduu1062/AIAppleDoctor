/* Seb Saathi admin — Money tools inside the Payments tab:
   1. "I've paid" check list (oldest first, days waiting, Money received / Not received, WhatsApp the grower)
   2. Renewals due (plans ending soon, WhatsApp/email reminder, remembers when you reminded)
   3. Plans & prices (change prices and plan limits without code)
   Needs supabase/money.sql for reminders and settings; the check list works without it. */
Object.assign(T.en, {
  mn_ck_h: "I've paid — check your UPI app ({n} · {a})", mn_ck_p: "Oldest first. These plans are already on. Find each amount in PhonePe, then tap Money received or Not received. Red = waiting {d}+ days.",
  mn_ck_none: "✓ Nothing to check — every \"I've paid\" has been matched.", mn_ck_wait: "waiting {n} days", mn_ck_today: "today",
  mn_ck_no: "✗ Not received", mn_ck_ask: "Ask grower", mn_ck_msg: "Namaste! Seb Saathi se. Aapne {d} ko {a} ka payment kiya tha ({p}). Hamein abhi yeh payment UPI mein nahi dikh raha. Kya aap payment ka screenshot ya UTR number bhej sakte hain? Dhanyavaad 🍎",
  mn_ck_old: "{n} waiting {d}+ days", mn_t_ren: "Renewals ({n})", mn_t_set: "Plans & prices",
  mn_r_h: "Renewals due", mn_r_p: "Paid plans ending soon, and those that ended in the last 14 days. Send a reminder on WhatsApp (or email); the date you reminded is saved.",
  mn_r_win: "Ending in {n} days", mn_r_s_due: "Ending soon", mn_r_s_inc: "If all renew", mn_r_s_gone: "Ended, not renewed", mn_r_s_rem: "Reminded",
  mn_c_left: "Ends", mn_c_rem: "Reminded", mn_c_act: "Reminder", mn_r_in: "in {n} days", mn_r_tod: "today", mn_r_ago: "ended {n} days ago", mn_r_never: "–",
  mn_r_wa: "WhatsApp", mn_r_mail: "Email", mn_r_none: "No plans ending in this window.", mn_r_setup: "To remember reminders, run supabase/money.sql once in Supabase.",
  mn_r_msg: "Namaste! Aapka Seb Saathi {p} plan {d} ko khatam ho raha hai. Apna record aur photo jaanch chalu rakhne ke liye renew karein: sebsaathi.com → Mera account → Renew ({r}). Dhanyavaad 🍎",
  mn_r_msg_x: "Namaste! Aapka Seb Saathi {p} plan {d} ko khatam ho gaya. Aapka sab record surakshit hai. Dobara chalu karne ke liye: sebsaathi.com → Mera account → Renew ({r}). Dhanyavaad 🍎",
  mn_s_h: "Plans & prices", mn_s_p: "Change prices and what each plan includes. Growers see the new numbers the next time they open the site; Saathi and photo-check limits change within a minute. Plans already paid keep their end date.",
  mn_s_plan: "Plan", mn_s_pm: "Price a month (₹)", mn_s_py: "Price a year (₹)", mn_s_o: "Orchards", mn_s_y: "Years of records", mn_s_dx: "Photo checks a month", mn_s_q: "Saathi questions a day",
  mn_s_save: "Save plans & prices", mn_s_ask: "Save these plans and prices? Growers see them straight away.", mn_s_ok: "Saved. The plans page now shows these numbers.", mn_s_bad: "Use whole numbers: prices 1 to 100000, limits 0 to 1000.",
  mn_s_setup: "Plans & prices are not set up yet. Run supabase/money.sql once in the Supabase SQL Editor, then tap Refresh.", mn_s_last: "Last changed {t} by {b}", mn_s_free: "free",
  mn_s_warn: "Saathi Plus is cheaper than Saathi, or a paid plan gives less than Free. Check the numbers.", mn_err: "Could not save: {m}"
});
Object.assign(T.hi, {
  mn_ck_h: "भुगतान कर दिया — UPI ऐप में जाँचें ({n} · {a})", mn_ck_p: "सबसे पुराने पहले। ये प्लान पहले से चालू हैं। PhonePe में रकम ढूँढें, फिर पैसे मिल गए या नहीं मिले दबाएँ। लाल = {d}+ दिन से बाकी।",
  mn_ck_none: "✓ जाँचने को कुछ नहीं — हर भुगतान मिला लिया गया।", mn_ck_wait: "{n} दिन से बाकी", mn_ck_today: "आज",
  mn_ck_no: "✗ नहीं मिले", mn_ck_ask: "बाग़वान से पूछें", mn_ck_old: "{n} भुगतान {d}+ दिन से बाकी", mn_t_ren: "नवीनीकरण ({n})", mn_t_set: "प्लान और दाम",
  mn_r_h: "नवीनीकरण बाकी", mn_r_p: "जल्द ख़त्म होने वाले प्लान, और पिछले 14 दिन में ख़त्म हुए। WhatsApp (या ईमेल) पर याद दिलाएँ; याद दिलाने की तारीख़ सेव होती है।",
  mn_r_win: "{n} दिन में ख़त्म", mn_r_s_due: "जल्द ख़त्म", mn_r_s_inc: "सब नवीनीकरण करें तो", mn_r_s_gone: "ख़त्म, नवीनीकरण नहीं", mn_r_s_rem: "याद दिलाया",
  mn_c_left: "ख़त्म", mn_c_rem: "याद दिलाया", mn_c_act: "याद दिलाएँ", mn_r_in: "{n} दिन में", mn_r_tod: "आज", mn_r_ago: "{n} दिन पहले ख़त्म",
  mn_r_wa: "WhatsApp", mn_r_mail: "ईमेल", mn_r_none: "इस समय में कोई प्लान ख़त्म नहीं हो रहा।", mn_r_setup: "याद दिलाने की तारीख़ सेव करने के लिए Supabase में supabase/money.sql एक बार चलाएँ।",
  mn_s_h: "प्लान और दाम", mn_s_p: "दाम और हर प्लान में क्या मिलता है, बदलें। बाग़वान अगली बार साइट खोलने पर नए नंबर देखेंगे। पहले से भरे प्लान की तारीख़ नहीं बदलती।",
  mn_s_plan: "प्लान", mn_s_pm: "महीने का दाम (₹)", mn_s_py: "साल का दाम (₹)", mn_s_o: "बाग़", mn_s_y: "रिकॉर्ड के साल", mn_s_dx: "महीने में फ़ोटो जाँच", mn_s_q: "रोज़ साथी सवाल",
  mn_s_save: "प्लान और दाम सेव करें", mn_s_ask: "ये प्लान और दाम सेव करें? बाग़वानों को तुरंत दिखेंगे।", mn_s_ok: "सेव हो गया।", mn_s_bad: "पूरे नंबर डालें: दाम 1 से 100000, सीमा 0 से 1000।",
  mn_s_setup: "प्लान और दाम अभी सेट नहीं हैं। Supabase SQL Editor में supabase/money.sql एक बार चलाएँ।", mn_s_last: "आख़िरी बदलाव {t}, {b}", mn_s_free: "मुफ़्त",
  mn_s_warn: "साथी प्लस साथी से सस्ता है, या पेड प्लान में मुफ़्त से कम है। नंबर जाँचें।", mn_err: "सेव नहीं हो सका: {m}"
});

const MN_DUE = 3;   /* an "I've paid" waiting this many days or more is shown in red */
let MNS = null, mnsErr = "", mnsBusy = false, mnRenDays = 7;
const mnDays = iso => Math.max(0, Math.floor((Date.now() - new Date(iso)) / 864e5));
const mnPhone = s => { s = String(s || ""); const m = /^\+?(\d{10,13})(@m\.sebsaathi\.com)?$/i.exec(s.trim()); return m ? m[1] : ""; };
const mnWa = (p, msg) => "https://wa.me/" + (p.length === 10 ? "91" + p : p) + "?text=" + encodeURIComponent(msg);
const mnMail = (e, msg) => /@/.test(e || "") && !/@m\.sebsaathi\.com$/i.test(e) ? "mailto:" + e + "?subject=" + encodeURIComponent("Seb Saathi") + "&body=" + encodeURIComponent(msg) : "";
const mnPlanEn = p => p === "premium" ? "Saathi Plus" : p === "basic" ? "Saathi" : "Free";
const mnDayEn = d => new Date(String(d).slice(0, 10) + "T00:00:00").toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
function mnLinks(email, msg) {
  const p = mnPhone(email), m = mnMail(email, msg);
  return (p ? '<a class="btn-s add sm" target="_blank" rel="noopener" href="' + esc(mnWa(p, msg)) + '">' + esc(tr("mn_r_wa")) + "</a> " : "") +
    (m ? '<a class="btn-s sm" href="' + esc(m) + '">' + esc(tr("mn_r_mail")) + "</a>" : "");
}

/* sub-tabs: add Renewals and Plans & prices next to Waiting / Subscriptions / All */
function mnTabs() {
  const pend = $("paPend"); if (!pend) return;
  if (!$("paRen")) {
    const box = pend.parentNode;
    box.insertAdjacentHTML("beforeend", '<button class="tab" role="tab" type="button" id="paRen" aria-selected="false"></button><button class="tab" role="tab" type="button" id="paSet" aria-selected="false"></button>');
    $("paRen").addEventListener("click", () => { paShow = "ren"; renderPayAdmin(); });
    $("paSet").addEventListener("click", () => { paShow = "set"; renderPayAdmin(); if (!MNS && !mnsBusy) mnLoadSet(); });
  }
  set("paRen", tr("mn_t_ren").replace("{n}", fmtN(PA ? mnRenRows(7).filter(r => r.left >= 0).length : 0)));
  set("paSet", tr("mn_t_set"));
  $("paRen").setAttribute("aria-selected", paShow === "ren" ? "true" : "false");
  $("paSet").setAttribute("aria-selected", paShow === "set" ? "true" : "false");
}
function mnOthersOff() {
  ["paPend", "paAll", "paSubs"].forEach(id => { if ($(id)) $(id).setAttribute("aria-selected", "false"); });
  const all = PA || [];
  set("paPend", tr("pa_pend").replace("{n}", fmtN(all.filter(paToCheck).length)));
  set("paAll", tr("pa_all").replace("{n}", fmtN(all.length)));
  if ($("paSubs")) set("paSubs", tr("sb_tab").replace("{n}", fmtN(PA ? subsRows().length : 0)));
}

const mnRenderPay0 = renderPayAdmin;
renderPayAdmin = function () {
  if (!document.getElementById("paList")) return;
  mnTabs();
  if (paShow === "ren") { mnOthersOff(); mnRenderRen(); return; }
  if (paShow === "set") { mnOthersOff(); mnRenderSet(); return; }
  mnRenderPay0();
  if (paShow === "pending" && PA) $("paList").insertAdjacentHTML("afterbegin", mnCheckHtml());
};

/* ---------- 1. "I've paid" check list ---------- */
function mnCheckHtml() {
  const R = (PA || []).filter(paUnchecked).sort((a, b) => String(a.created_at).localeCompare(String(b.created_at)));
  const sum = R.reduce((s, x) => s + (+x.amount || 0), 0), old = R.filter(x => mnDays(x.created_at) >= MN_DUE).length;
  if (!R.length) return '<div class="mnck"><p class="mnok">' + esc(tr("mn_ck_none")) + "</p></div>";
  return '<div class="mnck"><h5 class="ovsub">' + esc(tr("mn_ck_h").replace("{n}", fmtN(R.length)).replace("{a}", paRup(sum))) + "</h5>" +
    '<p class="fine">' + esc(tr("mn_ck_p").replace("{d}", MN_DUE)) + "</p>" +
    (old ? '<p class="aqalert">' + esc(tr("mn_ck_old").replace("{n}", old).replace("{d}", MN_DUE)) + "</p>" : "") +
    '<div class="mnlist">' + R.map(x => {
      const d = mnDays(x.created_at), late = d >= MN_DUE;
      const msg = T.en.mn_ck_msg;   /* messages to growers go in Hinglish */
      return '<div class="mnitem' + (late ? " late" : "") + '"><div class="mnmain"><b>' + paRup(x.amount) + "</b> · " + esc(plName(x.plan)) + " " + esc(tr(x.period === "year" ? "pay_year" : "pay_month")) +
        '<br><span class="fine">' + esc(x.email || "–") + " · " + paDate(x.created_at) + '</span> <span class="optag' + (late ? " bad" : "") + '">' + esc(d ? tr("mn_ck_wait").replace("{n}", d) : tr("mn_ck_today")) + "</span></div>" +
        '<div class="mnbtns"><button class="btn-s add sm" type="button" data-paok="' + esc(x.id) + '">' + esc(tr("pa_ip_ok")) + "</button>" +
        '<button class="btn-s sm" type="button" data-pano="' + esc(x.id) + '">' + esc(tr("mn_ck_no")) + "</button>" +
        mnAsk(x, msg) + "</div></div>";
    }).join("") + "</div></div>";
}
function mnAsk(x, msg) {
  const m = msg.replace("{d}", mnDayEn(x.created_at)).replace("{a}", "₹" + x.amount).replace("{p}", mnPlanEn(x.plan));
  const p = mnPhone(x.email), e = mnMail(x.email, m);
  return p ? '<a class="btn-s sm" target="_blank" rel="noopener" href="' + esc(mnWa(p, m)) + '">' + esc(tr("mn_ck_ask")) + "</a>" : e ? '<a class="btn-s sm" href="' + esc(e) + '">' + esc(tr("mn_ck_ask")) + "</a>" : "";
}
document.addEventListener("click", async e => {
  const b = e.target.closest && e.target.closest("[data-pano]"); if (!b || !PA) return;
  const row = PA.find(x => x.id === b.dataset.pano); if (!row) return;
  if (!confirm(tr("pa_ip_no").replace("{e}", row.email || "–"))) return;
  b.disabled = true;
  const r = await sb.from("payments").update({ status: "rejected" }).eq("id", row.id).select().single();
  if (r.error) { b.disabled = false; set("paErr", tr("pa_err").replace("{m}", r.error.message || "")); return; }
  set("paErr", ""); loadPayAdmin();
});

/* ---------- 2. renewals due ---------- */
function mnRenRows(days) {
  return subsRows().filter(r => r.cur && r.left != null && r.left <= days && r.left >= -14).sort((a, b) => a.left - b.left);
}
function mnRenderRen() {
  const R = mnRenRows(mnRenDays), due = R.filter(r => r.left >= 0), gone = R.filter(r => r.left < 0);
  const hasRem = (PA || []).some(x => "reminded_at" in x);
  const st = (k, v, cls) => "<div" + (cls ? ' class="' + cls + '"' : "") + "><span>" + esc(tr(k)) + "</span><b>" + v + "</b></div>";
  $("paStats").innerHTML = st("mn_r_s_due", fmtN(due.length), "main") + st("mn_r_s_inc", paRup(due.reduce((s, r) => s + (+r.cur.amount || 0), 0)), "pos") +
    st("mn_r_s_gone", fmtN(gone.length), gone.length ? "neg" : "") + st("mn_r_s_rem", fmtN(R.filter(r => r.cur.reminded_at).length));
  const head = ["pa_c_from", "pa_c_plan", "mn_c_left", "mn_c_rem", "mn_c_act"];
  $("paList").innerHTML = '<h5 class="ovsub">' + esc(tr("mn_r_h")) + '</h5><p class="fine">' + esc(tr("mn_r_p")) + "</p>" +
    '<div class="sbfilt">' + [7, 14, 30].map(n => '<button class="btn-s" type="button" data-mnw="' + n + '" aria-pressed="' + (mnRenDays === n) + '">' + esc(tr("mn_r_win").replace("{n}", n)) + "</button>").join("") + "</div>" +
    (!R.length ? '<p class="empty">' + esc(tr("mn_r_none")) + "</p>" :
      '<div class="tablewrap"><table class="ledger"><thead><tr>' + head.map(k => '<th scope="col">' + esc(tr(k)) + "</th>").join("") + "</tr></thead><tbody>" +
      R.map(r => {
        const c = r.cur, gone = r.left < 0, price = PRICES_A(c.plan, c.period);
        const msg = (gone ? T.en.mn_r_msg_x : T.en.mn_r_msg).replace("{p}", mnPlanEn(c.plan)).replace("{d}", mnDayEn(c.valid_until)).replace("{r}", "₹" + price + (c.period === "year" ? "/saal" : "/mahina"));
        const links = mnLinks(r.email, msg).replace(/<a /g, '<a data-mnrem="' + esc(c.id) + '" ');
        return "<tr" + (gone ? ' class="pfhit"' : r.left <= 3 ? ' class="mnsoon"' : "") + "><td>" + esc(r.email) + "</td><td>" + esc(plName(c.plan)) + '<br><span class="fine">' + esc(tr(c.period === "year" ? "pay_year" : "pay_month")) + "</span></td>" +
          "<td>" + paDay(c.valid_until) + '<br><span class="fine">' + esc(gone ? tr("mn_r_ago").replace("{n}", -r.left) : r.left === 0 ? tr("mn_r_tod") : tr("mn_r_in").replace("{n}", r.left)) + "</span></td>" +
          "<td>" + (c.reminded_at ? adWhen(c.reminded_at) : esc(tr("mn_r_never"))) + "</td><td>" + (links || "–") + "</td></tr>";
      }).join("") + "</tbody></table></div>") +
    (!hasRem && R.length ? '<p class="fine">' + esc(tr("mn_r_setup")) + "</p>" : "");
  $("paLog").innerHTML = "";
}
/* the price a renewal would cost now (Plans & prices if loaded, else the last amount paid) */
function PRICES_A(plan, per) {
  const p = MNS && MNS.data && MNS.data.prices && MNS.data.prices[plan];
  if (p && p[per]) return p[per];
  const last = (PA || []).filter(x => x.plan === plan && x.period === per && x.amount > 0 && x.source !== "referral").sort((a, b) => String(b.created_at).localeCompare(String(a.created_at)))[0];
  return last ? last.amount : (plan === "premium" ? (per === "year" ? 999 : 149) : (per === "year" ? 299 : 49));
}
document.addEventListener("click", e => {
  const w = e.target.closest && e.target.closest("[data-mnw]"); if (w) { mnRenDays = +w.dataset.mnw; renderPayAdmin(); return; }
  const a = e.target.closest && e.target.closest("[data-mnrem]"); if (!a || !sb) return;
  const id = a.dataset.mnrem, at = new Date().toISOString();
  sb.from("payments").update({ reminded_at: at }).eq("id", id).then(r => {
    if (r && r.error) return;
    const x = (PA || []).find(q => q.id === id); if (x) { x.reminded_at = at; if (paShow === "ren") setTimeout(renderPayAdmin, 300); }
  });
});

/* ---------- 3. plans & prices ---------- */
const MN_DEF = { prices: { basic: { month: 49, year: 299 }, premium: { month: 149, year: 999 } },
  limits: { free: { o: 2, y: 2, dx: 3, q: 5 }, basic: { o: 5, y: 5, dx: 15, q: 20 }, premium: { o: 10, y: 10, dx: 50, q: 30 } } };
async function mnLoadSet() {
  if (!sb || mnsBusy) return; mnsBusy = true; mnsErr = "";
  try { const r = await sb.from("plan_settings").select("*").eq("id", 1).maybeSingle(); if (r.error) throw r.error; MNS = r.data || null; if (!MNS) mnsErr = tr("mn_s_setup"); }
  catch (e) { mnsErr = /does not exist|schema cache|42P01/i.test(String(e.message || e) + (e.code || "")) ? tr("mn_s_setup") : tr("pa_err").replace("{m}", String(e.message || e)); }
  mnsBusy = false; mnApplyAdmin();
  if (paShow === "set" || paShow === "ren") renderPayAdmin();
}
/* the Profiles tab's "at limit" checks use these numbers too */
function mnApplyAdmin() {
  const L = MNS && MNS.data && MNS.data.limits; if (!L || typeof PF_LIM === "undefined") return;
  ["free", "basic", "premium"].forEach(p => { if (L[p] && PF_LIM[p]) ["o", "dx", "q"].forEach(k => { if (Number.isInteger(L[p][k])) PF_LIM[p][k] = L[p][k]; }); });
}
function mnRenderSet() {
  const d = (MNS && MNS.data) || MN_DEF, P = d.prices || MN_DEF.prices, L = d.limits || MN_DEF.limits;
  $("paStats").innerHTML = "";
  const inp = (id, v, dis) => '<input type="number" inputmode="numeric" min="0" step="1" id="' + id + '" value="' + esc(v == null ? "" : v) + '"' + (dis ? " disabled" : "") + ">";
  $("paList").innerHTML = '<h5 class="ovsub">' + esc(tr("mn_s_h")) + '</h5><p class="fine">' + esc(tr("mn_s_p")) + "</p>" +
    (mnsBusy ? '<p class="fine">' + esc(tr("ad_loading")) + "</p>" : mnsErr ? '<p class="autherr">' + esc(mnsErr) + "</p>" :
    '<form id="mnSetF"><div class="mnplans">' +
    ["free", "basic", "premium"].map(p => '<fieldset class="mnplan"><legend>' + esc(plName(p)) + "</legend>" +
      (p === "free" ? "" : [["month", "mn_s_pm"], ["year", "mn_s_py"]].map(([k, l]) => '<label><span>' + esc(tr(l)) + "</span>" + inp("mn-" + p + "-" + k, P[p] && P[p][k]) + "</label>").join("")) +
      [["o", "mn_s_o"], ["y", "mn_s_y"], ["dx", "mn_s_dx"], ["q", "mn_s_q"]].map(([k, l]) => '<label><span>' + esc(tr(l)) + "</span>" + inp("mn-" + p + "-" + k, L[p] && L[p][k]) + "</label>").join("") +
      "</fieldset>").join("") +
    '</div><p><button class="btn-s add" type="submit" id="mnSetSave">' + esc(tr("mn_s_save")) + '</button> <span class="fine" id="mnSetMsg" role="status"></span></p></form>' +
    (MNS && MNS.updated_by ? '<p class="fine">' + esc(tr("mn_s_last").replace("{t}", adWhen(MNS.updated_at)).replace("{b}", MNS.updated_by)) + "</p>" : ""));
  $("paLog").innerHTML = "";
}
document.addEventListener("submit", async e => {
  if (!e.target || e.target.id !== "mnSetF") return;
  e.preventDefault();
  const num = id => { const v = $(id).value.trim(); return /^\d+$/.test(v) ? +v : NaN; };
  const data = { prices: {}, limits: {} };
  let bad = false;
  ["basic", "premium"].forEach(p => { data.prices[p] = { month: num("mn-" + p + "-month"), year: num("mn-" + p + "-year") }; [data.prices[p].month, data.prices[p].year].forEach(v => { if (!(v >= 1 && v <= 100000)) bad = true; }); });
  ["free", "basic", "premium"].forEach(p => { data.limits[p] = {}; ["o", "y", "dx", "q"].forEach(k => { const v = num("mn-" + p + "-" + k); if (!(v >= 0 && v <= 1000)) bad = true; data.limits[p][k] = v; }); });
  if (bad) { set("mnSetMsg", tr("mn_s_bad")); return; }
  const L = data.limits, Pr = data.prices;
  const odd = Pr.premium.month < Pr.basic.month || Pr.premium.year < Pr.basic.year ||
    ["o", "y", "dx", "q"].some(k => L.basic[k] < L.free[k] || L.premium[k] < L.basic[k]);
  if (!confirm((odd ? tr("mn_s_warn") + "\n\n" : "") + tr("mn_s_ask"))) return;
  $("mnSetSave").disabled = true;
  const r = await sb.from("plan_settings").update({ data }).eq("id", 1).select().single();
  $("mnSetSave").disabled = false;
  if (r.error) { set("mnSetMsg", tr("mn_err").replace("{m}", r.error.message || "")); return; }
  MNS = r.data; mnApplyAdmin(); mnRenderSet(); set("mnSetMsg", tr("mn_s_ok"));
});

/* load the settings once the admin is signed in (for renewal prices and the Profiles limits) */
(function mnStart(n) {
  if (typeof isAdmin === "function" && isAdmin() && sb) { mnLoadSet(); return; }
  if (n < 40) setTimeout(() => mnStart(n + 1), 500);
})(0);
if (typeof applyLang === "function") applyLang();
