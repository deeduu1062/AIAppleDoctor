/* Seb Saathi — plans and UPI payment (Option A: direct UPI, checked by hand).
   Put your UPI ID below. While it is empty, the pay buttons say "being set up". */
const UPI = { id: "6230366306@ybl", name: "Seb Saathi" };
const PRICES = { basic: { month: 49, year: 299 }, premium: { month: 149, year: 999 } };
const QR_SRC = "https://cdn.jsdelivr.net/npm/qrcode-generator@1.4.4/qrcode.js";

let payPlan = "basic", payPer = "year", myPay = null, qrLoad = null;

/* ---- Razorpay (automatic payments): api/rzp-order.js, api/rzp-verify.js. Until it is set up in Vercel, only the UPI-by-hand way shows. ---- */
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
fetch("/api/rzp-order").then(r => r.ok ? r.json() : {}).then(j => { rzpOn = !!(j && j.enabled); if (document.getElementById("payDlg") && document.getElementById("payDlg").open) renderPay(); }).catch(() => { rzpOn = false; });
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
    const r = await fetch("/api/rzp-order", { method: "POST", headers: { "Content-Type": "application/json", Authorization: "Bearer " + tok }, body: JSON.stringify({ plan: payPlan, period: payPer }) });
    const o = await r.json().catch(() => ({}));
    if (!r.ok || !o.order_id) throw new Error(o.error || r.status);
    const plan = payPlan, per = payPer;
    const rz = new window.Razorpay({
      key: o.key_id, order_id: o.order_id, amount: o.amount, currency: o.currency || "INR",
      name: "Seb Saathi", description: plName(plan) + " · " + tr(per === "year" ? "pay_year" : "pay_month"), image: location.origin + "/icons/icon-192.png",
      prefill: { email: user.email || "", contact: user.phone ? "+" + String(user.phone).replace(/^\+/, "") : "" },
      notes: { plan, period: per }, theme: { color: "#2F8F3A" },
      handler: async resp => {
        rzpPaid = true; payDlgShow(true); renderPay("pay_rzp_wait");
        try {
          const v = await fetch("/api/rzp-verify", { method: "POST", headers: { "Content-Type": "application/json", Authorization: "Bearer " + await rzpTok() }, body: JSON.stringify(resp) });
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

function upiLink(plan, per) {
  const amt = PRICES[plan][per];
  const note = "Seb Saathi " + (plan === "premium" ? "Plus" : "Basic") + " " + (per === "year" ? "yearly" : "monthly");
  return "upi://pay?pa=" + encodeURIComponent(UPI.id) + "&pn=" + encodeURIComponent(UPI.name) +
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

function renderPay(msgKey, msgArg, msgVars, done) {
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
    '<a class="btn-s add payapp" href="' + plEsc(upiLink(payPlan, payPer)) + '">' + tr("pay_app") + "</a>" +
    '<p class="fine">' + tr("pay_app_n") + "</p>" +
    '<div class="payqr" id="payQr" hidden></div><p class="fine" id="payQrN" hidden>' + tr("pay_qr") + "</p>" +
    '<p class="payto">' + tr("pay_to") + ": <b>" + plEsc(UPI.name) + "</b> · <code>" + plEsc(UPI.id) +
    '</code> <button class="btn-s sm" type="button" data-pay="copy">' + tr("pay_copy") + "</button></p>" +
    '<form id="payForm" novalidate><div class="field"><label for="payUtr">' + tr("pay_utr_l") + '</label><input id="payUtr" type="text" inputmode="numeric" autocomplete="off" maxlength="12" placeholder="' +
    plEsc(tr("pay_utr_ph")) + '"></div><div class="dels"><button class="btn-s add" type="submit" id="paySend">' + tr("pay_send") +
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
  payPlan = plan; payPer = "year";
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

document.addEventListener("submit", async e => {
  if (!e.target || e.target.id !== "payForm") return;
  e.preventDefault();
  const msg = document.getElementById("payMsg"), btn = document.getElementById("paySend");
  const utr = (document.getElementById("payUtr").value || "").replace(/\s+/g, "");
  if (!/^\d{12}$/.test(utr)) { msg.textContent = tr("pay_bad"); return; }
  if (typeof sb === "undefined" || !sb || !user) { msg.textContent = tr("pay_err"); return; }
  btn.disabled = true; btn.textContent = tr("pay_sending");
  try {
    const r = await sb.from("payments").insert({ plan: payPlan, period: payPer, amount: PRICES[payPlan][payPer], utr: utr, email: user.email || null });
    if (r && r.error) {
      const dup = String(r.error.code) === "23505";
      btn.disabled = false; btn.textContent = tr("pay_send"); msg.textContent = tr(dup ? "pay_dup" : "pay_err"); return;
    }
    myPay = { plan: payPlan, status: "pending" };
    e.target.hidden = true; msg.textContent = tr("pay_ok").replace("{p}", plName(payPlan));
    renderPlans();
  } catch (err) {
    btn.disabled = false; btn.textContent = tr("pay_send"); msg.textContent = tr("pay_err");
  }
});

if (typeof sb !== "undefined" && sb) sb.auth.onAuthStateChange(() => setTimeout(loadMyPay, 50));
renderPlans();
loadMyPay();
