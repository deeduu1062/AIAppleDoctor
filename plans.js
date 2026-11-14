/* Seb Saathi — plans and UPI payment (Option A: direct UPI, checked by hand).
   Put your UPI ID below. While it is empty, the pay buttons say "being set up". */
const UPI = { id: "6230366306@ybl", name: "Seb Saathi" };
const PRICES = { basic: { month: 49, year: 299 }, premium: { month: 149, year: 999 } };
const QR_SRC = "https://cdn.jsdelivr.net/npm/qrcode-generator@1.4.4/qrcode.js";

let payPlan = "basic", payPer = "year", myPay = null, qrLoad = null;

/* ---- Razorpay (automatic payments): api/rzp-order.js, api/rzp-verify.js. Turned off for now with RZP_SWITCH below; only the UPI-by-hand way shows. ---- */
let rzpOn = null, rzpLoad = null, rzpBusy = false, rzpPaid = false;
Object.assign(T.en, { pay_rzp: "Pay {a} now", pay_rzp_n: "UPI, card or net banking. Your plan starts straight away.", pay_manual: "Or pay to our UPI ID yourself and send the reference",
  pay_rzp_wait: "Confirming your payment…", pay_rzp_ok: "Payment received. {p} is active till {d}. Thank you!", pay_rzp_cancel: "Payment cancelled. You have not been charged.",
  pay_rzp_err: "We could not confirm the payment yet. If money was taken, your plan switches on within a few minutes; if not, contact us.", pay_rzp_fail: "Payment did not go through: {m}" });
Object.assign(T.hi, { pay_rzp: "अभी {a} भरें", pay_rzp_n: "UPI, कार्ड या नेट बैंकिंग। आपका प्लान तुरंत चालू होगा।", pay_manual: "या ख़ुद हमारी UPI ID पर भेजें और रेफ़रेंस नंबर डालें",
  pay_rzp_wait: "भुगतान की पुष्टि हो रही है…", pay_rzp_ok: "भुगतान मिल गया। {p} {d} तक चालू है। धन्यवाद!", pay_rzp_cancel: "भुगतान रद्द हुआ। आपसे पैसे नहीं कटे।",
  pay_rzp_err: "अभी भुगतान की पुष्टि नहीं हो सकी। अगर पैसे कटे हैं तो कुछ मिनट में प्लान चालू हो जाएगा; नहीं तो हमसे संपर्क करें।", pay_rzp_fail: "भुगतान नहीं हुआ: {m}" });
if (T.hn) Object.assign(T.hn, { pay_rzp: "Abhi {a} bharein", pay_rzp_n: "UPI, card ya net banking. Aapka plan turant chalu hoga.", pay_manual: "Ya khud hamari UPI ID par bhejein aur reference number daalein",
  pay_rzp_wait: "Payment ki pushti ho rahi hai…", pay_rzp_ok: "Payment mil gaya. {p} {d} tak chalu hai. Dhanyavaad!", pay_rzp_cancel: "Payment cancel hua. Aapke paise nahi kate.",
  pay_rzp_err: "Abhi payment ki pushti nahi ho saki. Agar paise kate hain to kuch minute mein plan chalu ho jayega; nahi to humse sampark karein.", pay_rzp_fail: "Payment nahi hua: {m}" });
/* Switch: false = growers see only the UPI-by-hand way (link, QR, reference number). Set to true to bring Razorpay back. */
const RZP_SWITCH = false;
if (!RZP_SWITCH) rzpOn = false;
else fetch("/api/rzp?fn=order").then(r => r.ok ? r.json() : {}).then(j => { rzpOn = !!(j && j.enabled); if (document.getElementById("payDlg") && document.getElementById("payDlg").open) renderPay(); }).catch(() => { rzpOn = false; });
function loadRzp() {
  if (window.Razorpay) return Promise.resolve(true);
  if (!rzpLoad) rzpLoad = new Promise(res => {
    const s = document.createElement("script"); s.src = "https://checkout.razorpay.com/v1/checkout.js";
    s.onload = () => res(!!window.Razorpay); s.onerror = () => { rzpLoad = null; res(false); }; document.head.appendChild(s);
  });
  return rzpLoad;
}
async function rzpTok() { try { const r = await sb.auth.getSession(); return r && r.data && r.data.session ? r.data.session.access_token : ""; } catch (e) { return ""; } }
function payDlgShow(on) { const d = document.getElementById("payDlg"); if (!d) return; if (on) { if (d.showModal) { if (!d.open) d.showModal(); } else d.setAttribute("open", ""); } else { if (d.close) d.close(); else d.removeAttribute("open"); } }
async function rzpPay() {
  if (rzpBusy) return; rzpBusy = true; rzpPaid = false; renderPay("pay_rzp_wait");
  try {
    const [ok, tok] = await Promise.all([loadRzp(), rzpTok()]);
    if (!ok || !tok) throw new Error(ok ? "signin" : "load");
    const r = await fetch("/api/rzp?fn=order", { method: "POST", headers: { "Content-Type": "application/json", Authorization: "Bearer " + tok }, body: JSON.stringify({ plan: payPlan, period: payPer }) });
    const o = await r.json().catch(() => ({}));
    if (!r.ok || !o.order_id) throw new Error(o.error || r.status);
    const plan = payPlan, per = payPer;
    const rz = new window.Razorpay({
      key: o.key_id, order_id: o.order_id, amount: o.amount, currency: o.currency || "INR",
      name: "Seb Saathi", description: plName(plan) + " · " + tr(per === "year" ? "pay_year" : "pay_month"), image: location.origin + "/icons/icon-192.png",
      prefill: (() => { const pinU = /@m\.sebsaathi\.com$/i.test(String(user.email || "")); const ph = pinU ? String(user.email).split("@")[0] : String(user.phone || "").replace(/^\+/, ""); return { email: pinU ? "" : (user.email || ""), contact: ph ? "+" + ph : "" }; })(),
      notes: { plan, period: per }, theme: { color: "#2F8F3A" },
      handler: async resp => {
        rzpPaid = true; payDlgShow(true); renderPay("pay_rzp_wait");
        try {
          const v = await fetch("/api/rzp?fn=verify", { method: "POST", headers: { "Content-Type": "application/json", Authorization: "Bearer " + await rzpTok() }, body: JSON.stringify(resp) });
          const j = await v.json().catch(() => ({}));
          if (v.ok && j.ok) {
            myPay = { plan: j.plan, status: "approved", valid_until: j.valid_until };
            rzpBusy = false; renderPay("pay_rzp_ok", null, { p: plName(j.plan), d: typeof fmtDay === "function" ? fmtDay(j.valid_until, true) : j.valid_until }, true);
            renderPlans(); loadMyPay(); return;
          }
          throw new Error(j.error || v.status);
        } catch (e) { rzpBusy = false; renderPay("pay_rzp_err"); setTimeout(loadMyPay, 60000); }
      },
      modal: { ondismiss: () => { if (rzpBusy && !rzpPaid) { rzpBusy = false; payDlgShow(true); renderPay("pay_rzp_cancel"); } } }
    });
    rz.on("payment.failed", ev => { rzpBusy = false; payDlgShow(true); renderPay("pay_rzp_fail", null, { m: (ev && ev.error && ev.error.description) || "" }); });
    payDlgShow(false);   /* our box would sit on top of Razorpay's window */
    rz.open();
  } catch (e) { rzpBusy = false; renderPay("pay_rzp_fail", null, { m: String(e.message || e) }); }
}

const plName = p => tr(p === "premium" ? "pl_prem" : p === "basic" ? "pl_basic" : "pl_free");
const plEsc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
/* what the grower already has: plan key, days left, and whether it is time to renew (30 days or less) */
function myPlanState() {
  const paid = myPay && myPay.status === "approved" ? myPay.plan : null;
  const left = paid && myPay.valid_until ? Math.ceil((new Date(myPay.valid_until + "T00:00:00") - new Date()) / 864e5) : null;
  return { paid, left, renew: !!paid && left != null && left <= 30 };
}
const rupees = n => "₹" + Number(n).toLocaleString("en-IN");

/* each UPI app's own link, so the phone does not send growers to its default app (often WhatsApp) */
const PAY_IOS = /iPhone|iPad|iPod/i.test(navigator.userAgent || "") || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
const PAY_PHONE = PAY_IOS || /Android|Mobi/i.test(navigator.userAgent || "");
/* app buttons only work on a phone with that app; on a computer growers scan the QR from inside their UPI app instead */
const UPI_APPS = [["phonepe", "PhonePe", "phonepe://pay?"], ["gpay", "Google Pay", PAY_IOS ? "gpay://upi/pay?" : "tez://upi/pay?"], ["paytm", "Paytm", "paytmmp://pay?"]];
Object.assign(T.en, { pay_qr: "Open PhonePe, Google Pay or Paytm on your phone, tap Scan QR inside the app, and scan this. Don't use the phone's camera: it may open WhatsApp instead.", pay_noapp: "If the app does not open, copy the UPI ID below and pay to it from your UPI app." });
Object.assign(T.hi, { pay_qr: "फ़ोन पर PhonePe, Google Pay या Paytm खोलें, ऐप के अंदर Scan QR दबाएँ और यह स्कैन करें। फ़ोन का कैमरा इस्तेमाल न करें: वह WhatsApp खोल सकता है।", pay_noapp: "अगर ऐप न खुले, तो नीचे दी UPI ID कॉपी करें और अपने UPI ऐप से उस पर भेजें।" });
if (T.hn) Object.assign(T.hn, { pay_qr: "Phone par PhonePe, Google Pay ya Paytm kholein, app ke andar Scan QR dabayein aur yeh scan karein. Phone ka camera use na karein: woh WhatsApp khol sakta hai.", pay_noapp: "Agar app na khule, to neeche di UPI ID copy karein aur apne UPI app se us par bhejein." });
Object.assign(T.en, { pay_pick: "Choose your UPI app", pay_other: "Other UPI app" });
Object.assign(T.hi, { pay_pick: "अपना UPI ऐप चुनें", pay_other: "दूसरा UPI ऐप" });
if (T.hn) Object.assign(T.hn, { pay_pick: "Apna UPI app chunein", pay_other: "Doosra UPI app" });
function upiLink(plan, per, base) {
  const amt = PRICES[plan][per];
  const note = "Seb Saathi " + (plan === "premium" ? "Plus" : "Basic") + " " + (per === "year" ? "yearly" : "monthly");
  return (base || "upi://pay?") + "pa=" + encodeURIComponent(UPI.id) + "&pn=" + encodeURIComponent(UPI.name) +
    "&am=" + amt.toFixed(2) + "&cu=INR&tn=" + encodeURIComponent(note);
}

function renderPlans() {
  const box = document.getElementById("plCards");
  if (!box) return;
  const card = (key, best) => {
    const feats = tr("pl_f_" + key) || [];
    const price = key === "free"
      ? '<p class="plprice">' + tr("pl_zero") + '</p><p class="plsub">' + tr("pl_always") + "</p>"
      : '<p class="plprice">' + rupees(PRICES[key].year) + " <small>" + tr("pl_yr") + '</small></p><p class="plsub">' +
        tr("pl_mo").replace("{m}", PRICES[key].month) + "</p>";
    let act;
    if (key === "free") {
      act = typeof user !== "undefined" && user
        ? '<p class="plstat">' + tr(myPay && myPay.status === "approved" ? "pl_incl" : "pl_go_free_in") + "</p>"
        : '<button class="btn-s add" type="button" data-pl="free">' + tr("pl_go_free") + "</button>";
    } else if (myPay && myPay.plan === key && myPay.status === "approved") {
      act = myPlanState().renew ? '<button class="btn-s add" type="button" data-pl="' + key + '">' + tr("pl_renew").replace("{p}", plName(key)) + "</button>"
        : '<p class="plstat good">' + tr("pl_active") + "</p>";
    } else {
      act = (myPay && myPay.plan === key && myPay.status === "pending" ? '<p class="plstat">' + tr("pl_pending") + "</p>" : "") +
        '<button class="btn-s add" type="button" data-pl="' + key + '">' + tr("pl_go_pay").replace("{p}", plName(key)) + "</button>";
    }
    return '<article class="plcard' + (best ? " best" : "") + '">' + (best ? '<span class="plbadge">' + tr("pl_best") + "</span>" : "") +
      "<h3>" + plName(key) + '</h3><p class="pltag">' + tr("pl_" + key + "_t") + "</p>" + price +
      "<ul>" + feats.map(f => "<li>" + plEsc(f) + "</li>").join("") + '</ul><div class="plact">' + act + "</div></article>";
  };
  const st = myPlanState(), sec = document.getElementById("plans"), h = document.getElementById("plH"), p = document.getElementById("plP");
  let cards, hk = "pl_h", pk = "pl_p";
  if (st.paid === "premium") cards = st.renew ? card("premium") : "";
  else if (st.paid === "basic") { cards = (st.renew ? card("basic") : "") + card("premium", true); if (!st.renew) { hk = "pl_up_h"; pk = "pl_up_p"; } }
  else cards = card("free") + card("basic") + card("premium", true);
  if (sec) sec.hidden = !cards;
  if (h) { h.setAttribute("data-i18n", hk); h.textContent = tr(hk); }
  if (p) { p.setAttribute("data-i18n", pk); p.textContent = tr(pk); }
  box.innerHTML = cards;
  renderMyPlan();
  if (document.getElementById("payDlg") && document.getElementById("payDlg").open) renderPay();
}

/* the grower's current plan, shown in the account bar at the top */
function renderMyPlan() {
  const el = document.getElementById("acctPlan");
  if (!el) return;
  if (typeof user === "undefined" || !user) { el.hidden = true; return; }
  const st = myPlanState();
  let chip, more, cls = "", link = true;
  if (st.paid) {
    cls = st.renew ? "good renew" : "good"; chip = "★ " + plName(st.paid);
    more = myPay.valid_until ? tr("pl_till").replace("{d}", typeof fmtDay === "function" ? fmtDay(myPay.valid_until, true) : myPay.valid_until) : "";
    link = st.renew || st.paid === "basic";
  } else if (myPay && myPay.status === "pending") {
    cls = "pend"; chip = plName("free"); more = tr("pl_my_pend").replace("{p}", plName(myPay.plan));
  } else {
    chip = plName("free"); more = tr("pl_upg") + " →";
  }
  el.className = "link acctplan " + cls;
  if (link) el.setAttribute("href", "#plans"); else el.removeAttribute("href");
  el.setAttribute("aria-label", tr("pl_my").replace("{p}", plName(st.paid || "free")));
  el.innerHTML = '<span class="plchip">' + plEsc(chip) + "</span>" + (more ? '<span class="plmore">' + plEsc(more) + "</span>" : "") +
    (st.renew ? '<span class="plrenew">' + plEsc(tr("pl_renew_s")) + "</span>" : "");
  el.hidden = false;
  if (typeof renderAcctTab === "function") try { renderAcctTab(); } catch (e) {}
}

function loadQr() {
  if (window.qrcode) return Promise.resolve(true);
  if (!qrLoad) qrLoad = new Promise(res => {
    const s = document.createElement("script");
    s.src = QR_SRC; s.onload = () => res(!!window.qrcode); s.onerror = () => res(false);
    document.head.appendChild(s);
  });
  return qrLoad;
}

let payDone = null;   /* after "I've paid": keep showing the good news until the box is closed */
function renderPay(msgKey, msgArg, msgVars, done) {
  if (!msgKey && payDone) { msgKey = payDone[0]; msgArg = payDone[1]; msgVars = payDone[2]; done = true; }
  const d = document.getElementById("payDlg");
  const name = plName(payPlan);
  let h = '<h3 id="payH">' + tr("pay_h").replace("{p}", name) + "</h3>";
  if (typeof user === "undefined" || !user) {
    h += '<p class="fine" style="font-size:1rem">' + tr("pay_signin_p") + '</p><div class="dels"><button class="btn-s add" type="button" data-pay="signin">' +
      tr("pay_signin") + '</button><button class="btn-s" type="button" data-pay="close">' + tr("pay_close") + "</button></div>";
    d.innerHTML = h; return;
  }
  if (!UPI.id) {
    h += '<p class="fine" style="font-size:1rem">' + tr("pay_soon") + '</p><div class="dels"><button class="btn-s" type="button" data-pay="close">' + tr("pay_close") + "</button></div>";
    d.innerHTML = h; return;
  }
  const amt = PRICES[payPlan][payPer];
  let msgTxt = msgKey ? tr(msgKey).replace("{p}", msgArg || name) : "";
  if (msgVars) Object.keys(msgVars).forEach(k => { msgTxt = msgTxt.split("{" + k + "}").join(msgVars[k]); });
  if (done) {   /* paid with Razorpay: just the good news */
    d.innerHTML = h + '<p class="payamt" style="color:#2F8F3A">✓</p><p style="font-size:1.05rem">' + plEsc(msgTxt) + '</p><div class="dels"><button class="btn-s add" type="button" data-pay="close">' + tr("pay_close") + "</button></div>";
    return;
  }
  const auto = rzpOn === true;
  h += '<div class="payper" role="radiogroup" aria-label="' + plEsc(tr("pay_per")) + '">' +
    ["year", "month"].map(p => '<button type="button" role="radio" aria-checked="' + (p === payPer) + '" data-per="' + p + '">' +
      tr(p === "year" ? "pay_year" : "pay_month") + " · " + rupees(PRICES[payPlan][p]) + "</button>").join("") + "</div>" +
    '<p class="payamt">' + rupees(amt) + "</p>" +
    (auto ? '<button class="btn-s add payapp" type="button" data-pay="rzp"' + (rzpBusy ? " disabled" : "") + ">" + plEsc(tr("pay_rzp").replace("{a}", rupees(amt))) + "</button>" +
      '<p class="fine">' + tr("pay_rzp_n") + "</p>" + (msgTxt ? '<p class="fine" role="status" style="font-size:1rem"><b>' + plEsc(msgTxt) + "</b></p>" : "") +
      '<details class="paymanual"><summary class="fine">' + tr("pay_manual") + "</summary>" : "") +
    (PAY_PHONE ? '<p class="fine" style="margin-top:10px"><b>' + tr("pay_pick") + '</b></p><div class="payapps">' +
      UPI_APPS.map(x => '<a class="btn-s add payapp" href="' + plEsc(upiLink(payPlan, payPer, x[2])) + '">' + x[1] + "</a>").join("") +
      '<a class="btn-s payapp" href="' + plEsc(upiLink(payPlan, payPer)) + '">' + tr("pay_other") + '</a></div><p class="fine">' + tr("pay_noapp") + "</p>"
    : '<div class="payqr" id="payQr" hidden></div><p class="fine" id="payQrN" hidden>' + tr("pay_qr") + "</p>") +
    '<p class="payto">' + tr("pay_to") + ": <b>" + plEsc(UPI.name) + "</b> · <code>" + plEsc(UPI.id) +
    '</code> <button class="btn-s sm" type="button" data-pay="copy">' + tr("pay_copy") + "</button></p>" +
    '<form id="payForm" novalidate><p class="fine">' + plEsc(tr("pay_ip_p").replace("{a}", rupees(amt))) + '</p><div class="dels"><button class="btn-s add" type="submit" id="paySend">' + plEsc(tr("pay_ip_btn").replace("{a}", rupees(amt))) +
    '</button><button class="btn-s" type="button" data-pay="close">' + tr("pay_close") + "</button></div></form>" +
    '<p class="fine" id="payMsg" role="status">' + (msgKey && !auto ? plEsc(msgTxt) : "") + "</p>" + (auto ? "</details>" : "");
  d.innerHTML = h;
  loadQr().then(ok => {
    const q = document.getElementById("payQr");
    if (!ok || !q) return;
    try {
      const qr = window.qrcode(0, "M"); qr.addData(upiLink(payPlan, payPer)); qr.make();
      q.innerHTML = qr.createSvgTag({ cellSize: 5, margin: 2, scalable: true });
      q.hidden = false; document.getElementById("payQrN").hidden = false;
    } catch (e) {}
  });
}

function openPay(plan) {
  payPlan = plan; payPer = "year"; payDone = null;
  const d = document.getElementById("payDlg");
  renderPay();
  if (d.showModal) { if (!d.open) d.showModal(); } else d.setAttribute("open", "");
}

async function loadMyPay() {
  myPay = null;
  if (typeof sb === "undefined" || !sb || typeof user === "undefined" || !user) { renderPlans(); return; }
  try {
    const r = await sb.from("payments").select("plan,status,created_at,valid_until").eq("user_id", user.id).order("created_at", { ascending: false }).limit(5);
    const rows = (r && r.data) || [];
    const today = new Date().toISOString().slice(0, 10);
    myPay = rows.find(x => x.status === "approved" && (!x.valid_until || x.valid_until >= today)) || rows.find(x => x.status === "pending") || null;
  } catch (e) {}
  renderPlans();
}

document.addEventListener("click", e => {
  const pl = e.target.closest("[data-pl]");
  if (pl) {
    const k = pl.getAttribute("data-pl");
    if (k === "free") { if (typeof goLogin === "function") goLogin(true); return; }
    openPay(k); return;
  }
  const per = e.target.closest("#payDlg [data-per]");
  if (per) { payPer = per.getAttribute("data-per"); renderPay(); return; }
  const a = e.target.closest("#payDlg [data-pay]");
  if (!a) return;
  const act = a.getAttribute("data-pay"), d = document.getElementById("payDlg");
  if (act === "rzp") { rzpPay(); return; }
  if (act === "close") { if (d.close) d.close(); else d.removeAttribute("open"); }
  else if (act === "signin") { if (typeof goLogin === "function") goLogin(false); }
  else if (act === "copy") {
    const done = () => { a.textContent = tr("pay_copied"); };
    try { navigator.clipboard.writeText(UPI.id).then(done, () => {}); } catch (err) {}
  }
});

/* "I've paid": the plan switches on straight away (supabase/payments_ipaid.sql); the admin then checks the UPI app and ticks Money received, or rejects */
Object.assign(T.en, { pay_ip_p: "After paying {a} in your UPI app, come back here and tap I've paid. Your plan switches on straight away. We check every payment in our UPI app, and switch the plan off if the money has not arrived.",
  pay_ip_btn: "✓ I've paid {a}", pay_ip_q: "Have you paid {a} to Seb Saathi ({u})?", pay_ip_ok: "Thank you! {p} is on till {d}.",
  pay_ip_wait: "Your last payment is still being checked. Please wait for that before paying again, or contact us." });
Object.assign(T.hi, { pay_ip_p: "अपने UPI ऐप में {a} भरने के बाद यहाँ लौटें और 'मैंने भुगतान कर दिया' दबाएँ। आपका प्लान तुरंत चालू हो जाएगा। हम हर भुगतान अपने UPI ऐप में जाँचते हैं, और पैसे न आने पर प्लान बंद कर देते हैं।",
  pay_ip_btn: "✓ मैंने {a} भर दिए", pay_ip_q: "क्या आपने सेब साथी ({u}) को {a} भेज दिए हैं?", pay_ip_ok: "धन्यवाद! {p} {d} तक चालू है।",
  pay_ip_wait: "आपका पिछला भुगतान अभी जाँच में है। दोबारा भरने से पहले उसका इंतज़ार करें, या हमसे संपर्क करें।" });
if (T.hn) Object.assign(T.hn, { pay_ip_p: "Apne UPI app mein {a} bharne ke baad yahan lautein aur 'Maine payment kar diya' dabayein. Aapka plan turant chalu ho jayega. Hum har payment apne UPI app mein jaanchte hain, aur paise na aane par plan band kar dete hain.",
  pay_ip_btn: "✓ Maine {a} bhar diye", pay_ip_q: "Kya aapne Seb Saathi ({u}) ko {a} bhej diye hain?", pay_ip_ok: "Dhanyavaad! {p} {d} tak chalu hai.",
  pay_ip_wait: "Aapka pichhla payment abhi jaanch mein hai. Dobara bharne se pehle uska intezaar karein, ya humse sampark karein." });
document.addEventListener("submit", async e => {
  if (!e.target || e.target.id !== "payForm") return;
  e.preventDefault();
  const msg = document.getElementById("payMsg"), btn = document.getElementById("paySend"), amt = PRICES[payPlan][payPer];
  if (typeof sb === "undefined" || !sb || !user) { msg.textContent = tr("pay_err"); return; }
  if (!confirm(tr("pay_ip_q").replace("{a}", rupees(amt)).replace("{u}", UPI.id))) return;
  const label = btn.textContent; btn.disabled = true; btn.textContent = tr("pay_sending");
  try {
    const r = await sb.from("payments").insert({ plan: payPlan, period: payPer, amount: amt, email: user.email || (user.phone ? "+" + String(user.phone).replace(/^\+/, "") : null), status: "approved", self_paid: true }).select("plan,status,valid_until,created_at").single();
    if (r && r.error) {
      btn.disabled = false; btn.textContent = label; msg.textContent = tr(/ipaid_waiting/.test(String(r.error.message || "")) ? "pay_ip_wait" : "pay_err"); return;
    }
    myPay = r.data;
    payDone = ["pay_ip_ok", plName(payPlan), { d: typeof fmtDay === "function" ? fmtDay(r.data.valid_until, true) : r.data.valid_until }];
    renderPay(); renderPlans();
    if (typeof renderAcct === "function") try { renderAcct(); } catch (x) {}
    if (typeof renderAcctTab === "function") try { renderAcctTab(); } catch (x) {}
    setTimeout(loadMyPay, 300);
  } catch (err) {
    btn.disabled = false; btn.textContent = label; msg.textContent = tr("pay_err");
  }
});

if (typeof sb !== "undefined" && sb) sb.auth.onAuthStateChange(() => setTimeout(loadMyPay, 50));
renderPlans();
loadMyPay();
