/* Seb Saathi — plans and UPI payment (Option A: direct UPI, checked by hand).
   Put your UPI ID below. While it is empty, the pay buttons say "being set up". */
const UPI = { id: "6230366306@ybl", name: "Seb Saathi" };
const PRICES = { basic: { month: 49, year: 299 }, premium: { month: 149, year: 999 } };
const QR_SRC = "https://cdn.jsdelivr.net/npm/qrcode-generator@1.4.4/qrcode.js";

let payPlan = "basic", payPer = "year", myPay = null, qrLoad = null;

const plName = p => tr(p === "premium" ? "pl_prem" : p === "basic" ? "pl_basic" : "pl_free");
const plEsc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
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
        ? '<p class="plstat">' + tr("pl_go_free_in") + "</p>"
        : '<button class="btn-s" type="button" data-pl="free">' + tr("pl_go_free") + "</button>";
    } else if (myPay && myPay.plan === key && myPay.status === "approved") {
      act = '<p class="plstat good">' + tr("pl_active") + "</p>";
    } else {
      act = (myPay && myPay.plan === key && myPay.status === "pending" ? '<p class="plstat">' + tr("pl_pending") + "</p>" : "") +
        '<button class="btn-s add" type="button" data-pl="' + key + '">' + tr("pl_go_pay").replace("{p}", plName(key)) + "</button>";
    }
    return '<article class="plcard' + (best ? " best" : "") + '">' + (best ? '<span class="plbadge">' + tr("pl_best") + "</span>" : "") +
      "<h3>" + plName(key) + '</h3><p class="pltag">' + tr("pl_" + key + "_t") + "</p>" + price +
      "<ul>" + feats.map(f => "<li>" + plEsc(f) + "</li>").join("") + '</ul><div class="plact">' + act + "</div></article>";
  };
  box.innerHTML = card("free") + card("basic") + card("premium", true);
  if (document.getElementById("payDlg") && document.getElementById("payDlg").open) renderPay();
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

function renderPay(msgKey, msgArg) {
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
  h += '<div class="payper" role="radiogroup" aria-label="' + plEsc(tr("pay_per")) + '">' +
    ["year", "month"].map(p => '<button type="button" role="radio" aria-checked="' + (p === payPer) + '" data-per="' + p + '">' +
      tr(p === "year" ? "pay_year" : "pay_month") + " · " + rupees(PRICES[payPlan][p]) + "</button>").join("") + "</div>" +
    '<p class="payamt">' + rupees(amt) + "</p>" +
    '<a class="btn-s add payapp" href="' + plEsc(upiLink(payPlan, payPer)) + '">' + tr("pay_app") + "</a>" +
    '<p class="fine">' + tr("pay_app_n") + "</p>" +
    '<div class="payqr" id="payQr" hidden></div><p class="fine" id="payQrN" hidden>' + tr("pay_qr") + "</p>" +
    '<p class="payto">' + tr("pay_to") + ": <b>" + plEsc(UPI.name) + "</b> · <code>" + plEsc(UPI.id) +
    '</code> <button class="btn-s sm" type="button" data-pay="copy">' + tr("pay_copy") + "</button></p>" +
    '<form id="payForm" novalidate><div class="field"><label for="payUtr">' + tr("pay_utr_l") + '</label><input id="payUtr" type="text" inputmode="numeric" autocomplete="off" maxlength="12" placeholder="' +
    plEsc(tr("pay_utr_ph")) + '"></div><div class="dels"><button class="btn-s add" type="submit" id="paySend">' + tr("pay_send") +
    '</button><button class="btn-s" type="button" data-pay="close">' + tr("pay_close") + "</button></div></form>" +
    '<p class="fine" id="payMsg" role="status">' + (msgKey ? plEsc(tr(msgKey).replace("{p}", msgArg || name)) : "") + "</p>";
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

/* ---------- admin: payments (tables public.payments + public.payment_events) ---------- */
let PA = null, PALOG = null, paBusy = false, paShow = "pending";
const paRup = n => rupees(+n || 0);
const paDate = iso => iso ? new Date(iso).toLocaleString(lang === "hi" ? "hi-IN" : "en-IN", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }) : "–";
const paDay = d => d ? new Date(d + "T00:00:00").toLocaleDateString(lang === "hi" ? "hi-IN" : "en-IN", { day: "numeric", month: "short", year: "numeric" }) : "–";

async function loadPayAdmin() {
  if (!document.getElementById("paList") || typeof isAdmin !== "function" || !isAdmin() || !sb || paBusy) return;
  paBusy = true; set("paErr", ""); $("paRefresh").disabled = true;
  let err = null;
  try {
    const r = await sb.from("payments").select("*").order("created_at", { ascending: false }).limit(1000);
    if (r.error) err = r.error; else PA = r.data || [];
    const g = await sb.from("payment_events").select("*").order("at", { ascending: false }).limit(200);
    PALOG = g.error ? null : (g.data || []);
  } catch (x) { err = x; }
  paBusy = false; $("paRefresh").disabled = false;
  if (err) {
    const m = String(err.message || err);
    set("paErr", String(err.code || "") === "42P01" || /does not exist|could not find the table|schema cache/i.test(m) ? tr("pa_err_setup") : tr("pa_err").replace("{m}", m));
  }
  renderPayAdmin();
}

function renderPayAdmin() {
  if (!document.getElementById("paList")) return;
  const all = PA || [], pend = all.filter(x => x.status === "pending"), ok = all.filter(x => x.status === "approved");
  const now = new Date(), ym = now.getFullYear() + "-" + String(now.getMonth() + 1).padStart(2, "0");
  const today = now.toISOString().slice(0, 10);
  const sum = a => a.reduce((s, x) => s + (+x.amount || 0), 0);
  const st = (k, v, cls) => "<div" + (cls ? ' class="' + cls + '"' : "") + "><span>" + tr(k) + "</span><b>" + v + "</b></div>";
  $("paStats").innerHTML = st("pa_s_total", paRup(sum(ok)), "main") +
    st("pa_s_month", paRup(sum(ok.filter(x => String(x.created_at).slice(0, 7) === ym)))) +
    st("pa_s_pend", fmtN(pend.length) + (pend.length ? " · " + paRup(sum(pend)) : ""), pend.length ? "neg" : "") +
    st("pa_s_active", fmtN(ok.filter(x => !x.valid_until || x.valid_until >= today).length), "pos");
  set("paPend", tr("pa_pend").replace("{n}", fmtN(pend.length)));
  set("paAll", tr("pa_all").replace("{n}", fmtN(all.length)));
  $("paPend").setAttribute("aria-selected", paShow === "pending" ? "true" : "false");
  $("paAll").setAttribute("aria-selected", paShow === "all" ? "true" : "false");
  if (!PA) { $("paList").innerHTML = ""; $("paLog").innerHTML = ""; return; }
  const rows = paShow === "pending" ? pend : all;
  const head = ["pa_c_status", "pa_c_when", "pa_c_from", "pa_c_plan", "pa_c_amt", "pa_c_utr", "pa_c_until", "pa_c_by"];
  $("paList").innerHTML = !rows.length ? '<p class="empty">' + tr("pa_none") + "</p>" :
    '<div class="tablewrap"><table class="ledger"><thead><tr>' + head.map(k => '<th scope="col">' + tr(k) + "</th>").join("") + "</tr></thead><tbody>" +
    rows.map(x => {
      const sel = '<td class="fbst"><select class="pa-' + esc(x.status) + '" data-pa="' + esc(x.id) + '" aria-label="' + tr("pa_c_status") + '">' +
        ["pending", "approved", "rejected"].map(s => '<option value="' + s + '"' + (x.status === s ? " selected" : "") + ">" + tr("pa_st_" + s) + "</option>").join("") + "</select></td>";
      const expired = x.status === "approved" && x.valid_until && x.valid_until < today;
      return "<tr>" + sel + "<td>" + paDate(x.created_at) + "</td><td>" + esc(x.email || "–") + "</td>" +
        "<td>" + plName(x.plan) + '<br><span class="fine">' + tr(x.period === "year" ? "pay_year" : "pay_month") + "</span></td>" +
        '<td class="n">' + paRup(x.amount) + '</td><td><code>' + esc(x.utr) + "</code></td>" +
        "<td>" + (x.valid_until ? paDay(x.valid_until) + (expired ? ' <span class="tag">' + tr("pa_expired") + "</span>" : "") : "–") + "</td>" +
        "<td>" + (x.reviewed_at ? paDate(x.reviewed_at) + '<br><span class="fine">' + esc(x.reviewed_by || "") + "</span>" : "–") + "</td></tr>";
    }).join("") + "</tbody></table></div>";
  const L = PALOG || [];
  $("paLog").innerHTML = '<h5>' + tr("pa_log_h") + "</h5>" + (!L.length ? '<p class="fine">' + tr("pa_log_none") + "</p>" :
    '<ul class="palog">' + L.slice(0, 50).map(e => {
      const d = e.details || {};
      const what = e.action === "sent"
        ? tr("pa_ev_sent").replace("{e}", esc(d.email || e.by_email || "–")).replace("{a}", paRup(d.amount)).replace("{u}", esc(d.utr || ""))
        : tr("pa_ev_changed").replace("{u}", esc(d.utr || "")).replace("{o}", tr("pa_st_" + (e.old_status || "pending"))).replace("{n}", tr("pa_st_" + (e.new_status || "pending"))).replace("{b}", esc(e.by_email || "–"));
      return "<li><time>" + paDate(e.at) + "</time> " + what + "</li>";
    }).join("") + "</ul>");
}

function paCsv() {
  if (!PA || !PA.length) return;
  const cols = ["created_at", "email", "plan", "period", "amount", "utr", "status", "valid_until", "reviewed_at", "reviewed_by", "note", "id"];
  const q = v => { const s = v == null ? "" : String(v); return /[",\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s; };
  const csv = [cols.join(",")].concat(PA.map(x => cols.map(c => q(x[c])).join(","))).join("\n");
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob(["﻿" + csv], { type: "text/csv" }));
  a.download = "seb-saathi-payments-" + new Date().toISOString().slice(0, 10) + ".csv";
  document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 500);
}

if (document.getElementById("paList")) {
  $("paPend").addEventListener("click", () => { paShow = "pending"; renderPayAdmin(); });
  $("paAll").addEventListener("click", () => { paShow = "all"; renderPayAdmin(); });
  $("paRefresh").addEventListener("click", loadPayAdmin);
  $("paCsv").addEventListener("click", paCsv);
  $("paList").addEventListener("change", async e => {
    const sel = e.target.closest("select[data-pa]"); if (!sel || !PA) return;
    const row = PA.find(x => x.id === sel.dataset.pa); if (!row) return;
    const to = sel.value;
    const ask = to === "approved" ? tr("pa_ask_ok") : to === "rejected" ? tr("pa_ask_no") : tr("pa_ask_back");
    if (!confirm(ask.replace("{a}", paRup(row.amount)).replace("{u}", row.utr).replace("{e}", row.email || "–"))) { sel.value = row.status; return; }
    sel.disabled = true;
    let err = null;
    try { const r = await sb.from("payments").update({ status: to }).eq("id", row.id).select().single(); if (r.error) err = r.error; else Object.assign(row, r.data); } catch (x) { err = x; }
    sel.disabled = false;
    if (err) { sel.value = row.status; set("paErr", tr("pa_err").replace("{m}", String(err.message || err))); return; }
    set("paErr", ""); loadPayAdmin();
  });
}
