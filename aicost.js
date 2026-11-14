/* Seb Saathi admin — AI cost per grower, with an alert when a grower's AI use this month costs more than their plan brings in.
   Data: supabase/ai_usage.sql (table ai_usage + function admin_ai_costs). Every Saathi answer, photo check, translation and
   receipt reading saves its real cost there (api/_aicost.js). Growers with no saved rows yet (before this was switched on)
   get the upper estimate from the Costs tab instead, marked "est.".
   Shows: Costs tab → "AI cost per grower"; a warning on the Overview tab; a count on the Costs tab button. */
let AIG = null, aigBusy = false, aigErr = "", aigAll = false;
const AIG_NEAR = 0.8;   /* "near" once AI cost reaches 80% of what the grower pays */
const aigFree = () => { try { const v = +localStorage.getItem("ad-ai-free"); return v >= 0 && localStorage.getItem("ad-ai-free") !== null ? v : 10; } catch (e) { return 10; } };

Object.assign(T.en, {
  aig_h: "AI cost per grower (this month)",
  aig_p: "What each grower's Saathi questions, photo checks and receipt readings cost in AI this month, against what their plan brings in each month. Free growers bring in nothing, so they are flagged only above the free allowance.",
  aig_free: "Free allowance per Free grower (₹ a month)",
  aig_sum: "{n} growers used AI this month, costing {t} in all. {o} cost more than they pay, {w} are close.",
  aig_none: "No grower has used AI this month yet.",
  aig_c_who: "Grower", aig_c_plan: "Plan", aig_c_pays: "Pays a month", aig_c_cost: "AI cost", aig_c_uses: "Uses", aig_c_st: "Status",
  aig_uses: "{q} questions · {p} photo checks", aig_split: "Saathi {c} · photos {p}", aig_other: " · other {o}",
  aig_over: "Over", aig_near: "Close", aig_ok: "OK", aig_est: "est.", aig_admin: "Admin (not counted)",
  aig_over_by: "{x} more than they pay", aig_free_over: "{x} over the free allowance",
  aig_all: "Show all {n}", aig_less: "Show fewer",
  aig_note: "Real cost from each AI reply's token count, at Anthropic's price list; rupees at about ₹{r} to the dollar. \"est.\" means nothing saved yet for that grower this month, so the upper estimate is shown.",
  aig_setup: "Not set up yet. In Supabase → SQL Editor, run supabase/ai_usage.sql once, then press Refresh.",
  aig_alert: "⚠ {n} growers' AI use this month cost more than their plan brings in.", aig_alert1: "⚠ 1 grower's AI use this month costs more than their plan brings in.",
  aig_see: "See who", aig_open: "Open profile"
});
Object.assign(T.hi, {
  aig_h: "हर बाग़वान का AI ख़र्च (इस महीने)",
  aig_p: "इस महीने हर बाग़वान के साथी सवालों, फ़ोटो जाँच और रसीद पढ़ने पर AI का ख़र्च, उनके प्लान से हर महीने आने वाली रक़म के मुक़ाबले। Free बाग़वान कुछ नहीं देते, इसलिए उन्हें सिर्फ़ मुफ़्त सीमा से ऊपर जाने पर दिखाया जाता है।",
  aig_free: "हर Free बाग़वान की मुफ़्त सीमा (₹ महीना)",
  aig_sum: "इस महीने {n} बाग़वानों ने AI इस्तेमाल किया, कुल ख़र्च {t}। {o} का ख़र्च उनके भुगतान से ज़्यादा है, {w} क़रीब हैं।",
  aig_none: "इस महीने अभी किसी बाग़वान ने AI इस्तेमाल नहीं किया।",
  aig_c_who: "बाग़वान", aig_c_plan: "प्लान", aig_c_pays: "महीने का भुगतान", aig_c_cost: "AI ख़र्च", aig_c_uses: "इस्तेमाल", aig_c_st: "स्थिति",
  aig_uses: "{q} सवाल · {p} फ़ोटो जाँच", aig_split: "साथी {c} · फ़ोटो {p}", aig_other: " · बाक़ी {o}",
  aig_over: "ज़्यादा", aig_near: "क़रीब", aig_ok: "ठीक", aig_est: "अनुमान", aig_admin: "Admin (गिना नहीं)",
  aig_over_by: "भुगतान से {x} ज़्यादा", aig_free_over: "मुफ़्त सीमा से {x} ज़्यादा",
  aig_all: "सभी {n} दिखाएँ", aig_less: "कम दिखाएँ",
  aig_note: "हर AI जवाब के टोकन से असली ख़र्च, Anthropic की दर पर; रुपये लगभग ₹{r} प्रति डॉलर। \"अनुमान\" का मतलब इस महीने उस बाग़वान का कुछ सेव नहीं हुआ, इसलिए ऊपरी अनुमान दिखाया है।",
  aig_setup: "अभी सेट नहीं है। Supabase → SQL Editor में supabase/ai_usage.sql एक बार चलाएँ, फिर Refresh दबाएँ।",
  aig_alert: "⚠ इस महीने {n} बाग़वानों का AI ख़र्च उनके प्लान की रक़म से ज़्यादा है।", aig_alert1: "⚠ इस महीने 1 बाग़वान का AI ख़र्च उसके प्लान की रक़म से ज़्यादा है।",
  aig_see: "कौन हैं, देखें", aig_open: "प्रोफ़ाइल खोलें"
});

/* each grower's current plan and what it brings in a month, from approved payments still running */
async function aigPlans() {
  const today = new Date().toISOString().slice(0, 10), out = {};
  const r = await sb.from("payments").select("user_id,plan,period,amount,status,valid_until").eq("status", "approved").limit(10000);
  if (r.error) return out;
  (r.data || []).filter(x => x.user_id && (!x.valid_until || x.valid_until >= today)).forEach(x => {
    if (!out[x.user_id] || String(x.valid_until) > String(out[x.user_id].valid_until)) out[x.user_id] = x;
  });
  return out;
}
function aigRows() {
  if (!AIG) return [];
  const free = aigFree();
  return AIG.map(g => {
    const adm = ADMIN_EMAILS.indexOf(String(g.email || "").toLowerCase()) >= 0;
    const est = !(+g.calls > 0);
    const cost = est ? (+g.photos || 0) * AI_PHOTO_INR + (+g.questions || 0) * AI_Q_INR : (+g.cost_usd || 0) * USD_INR;
    const pay = g.pay, pays = pay ? perMonth(pay) : 0, plan = pay ? pay.plan : "free";
    const cap = pay ? pays : free;
    const st = adm ? "admin" : cost > cap ? "over" : cap > 0 && cost >= cap * AIG_NEAR ? "near" : "ok";
    return Object.assign({}, g, { adm, est, cost, pays, plan, cap, st });
  }).sort((a, b) => ({ over: 0, near: 1, ok: 2, admin: 3 }[a.st] - { over: 0, near: 1, ok: 2, admin: 3 }[b.st]) || b.cost - a.cost);
}
async function aigLoad() {
  if (!isAdmin() || !sb || aigBusy) return;
  aigBusy = true; aigErr = "";
  try {
    const [r, plans] = await Promise.all([sb.rpc("admin_ai_costs"), aigPlans().catch(() => ({}))]);
    if (r.error) throw r.error;
    AIG = (r.data || []).map(g => Object.assign({}, g, { pay: plans[g.user_id] || null }));
  } catch (x) {
    AIG = null;
    const m = String(x.message || x), code = String(x.code || "");
    aigErr = code === "PGRST202" || code === "42P01" || /could not find the function|does not exist/i.test(m) ? tr("aig_setup") : tr("pa_err").replace("{m}", m);
  }
  aigBusy = false;
  renderAig();
}
function renderAig() {
  const rows = aigRows(), over = rows.filter(r => r.st === "over"), near = rows.filter(r => r.st === "near");
  /* Costs tab button and Overview warning */
  const tb = $("at-cost"); if (tb) tb.textContent = tr("adm_t_cost") + (over.length ? " ⚠ " + over.length : "");
  const ov = $("ovTab");
  let al = $("aigAlert");
  if (ov && !al) { al = document.createElement("div"); al.id = "aigAlert"; al.className = "aigalert"; al.setAttribute("role", "status"); ov.parentNode.insertBefore(al, ov); }
  if (al) {
    al.hidden = !over.length;
    al.innerHTML = over.length ? "<span>" + esc(over.length === 1 ? tr("aig_alert1") : tr("aig_alert").replace("{n}", over.length)) + '</span> <button class="btn-s" type="button" data-aig="see">' + tr("aig_see") + "</button>" : "";
  }
  /* Costs tab box */
  const el = $("coPer"); if (!el) return;
  let h = '<div class="cobox" id="aigBox"><h5>' + tr("aig_h") + "</h5><p class=\"fine\">" + tr("aig_p") + "</p>";
  if (aigErr) { el.innerHTML = h + "<p>" + esc(aigErr) + "</p></div>"; return; }
  if (!AIG) { el.innerHTML = h + '<p class="fine">' + tr("li_loading") + "</p></div>"; return; }
  h += '<div class="field aigfree"><label for="aigFree">' + tr("aig_free") + '</label><input id="aigFree" type="number" min="0" step="1" inputmode="numeric" value="' + aigFree() + '"></div>';
  const growers = rows.filter(r => !r.adm);
  if (!growers.length && !rows.length) { el.innerHTML = h + "<p>" + tr("aig_none") + "</p></div>"; return; }
  const total = growers.reduce((s, r) => s + r.cost, 0);
  h += "<p><b>" + tr("aig_sum").replace("{n}", fmtN(growers.length)).replace("{t}", paRup(Math.round(total))).replace("{o}", fmtN(over.length)).replace("{w}", fmtN(near.length)) + "</b></p>";
  const r2 = n => n < 10 ? "₹" + n.toFixed(2) : paRup(Math.round(n));
  const chip = r => r.st === "admin" ? '<span class="sbchip sb-pending">' + tr("aig_admin") + "</span>"
    : '<span class="sbchip ' + (r.st === "over" ? "sb-expired" : r.st === "near" ? "sb-soon" : "sb-active") + '">' + tr("aig_" + r.st) + "</span>" +
      (r.st === "over" ? '<br><span class="fine">' + tr(r.pays ? "aig_over_by" : "aig_free_over").replace("{x}", r2(r.cost - r.cap)) + "</span>" : "");
  const show = aigAll ? rows : rows.slice(0, 25);
  h += '<div class="tablewrap"><table class="ledger"><thead><tr>' +
    ["aig_c_who", "aig_c_plan", "aig_c_pays", "aig_c_cost", "aig_c_uses", "aig_c_st"].map(k => '<th scope="col"' + (k === "aig_c_pays" || k === "aig_c_cost" ? ' class="n"' : "") + ">" + tr(k) + "</th>").join("") +
    "</tr></thead><tbody>" + show.map(r =>
      '<tr><th scope="row"><button class="pflink" type="button" data-aig="open" data-id="' + esc(r.user_id) + '" title="' + esc(tr("aig_open")) + '">' + esc(pfName(r)) + "</button></th>" +
      "<td>" + pfPlan(r.plan) + "</td>" +
      '<td class="n">' + (r.pays ? paRup(Math.round(r.pays)) : "₹0") + "</td>" +
      '<td class="n"><b>' + r2(r.cost) + "</b>" + (r.est ? ' <span class="fine">' + tr("aig_est") + "</span>" :
        '<br><span class="fine">' + tr("aig_split").replace("{c}", r2((+r.chat_usd || 0) * USD_INR)).replace("{p}", r2((+r.photo_usd || 0) * USD_INR)) +
        (+r.other_usd > 0 ? tr("aig_other").replace("{o}", r2(+r.other_usd * USD_INR)) : "") + "</span>") + "</td>" +
      '<td class="fine">' + tr("aig_uses").replace("{q}", fmtN(+r.questions || 0)).replace("{p}", fmtN(+r.photos || 0)) + "</td>" +
      "<td>" + chip(r) + "</td></tr>").join("") + "</tbody></table></div>";
  if (rows.length > 25) h += '<p><button class="btn-s" type="button" data-aig="all">' + (aigAll ? tr("aig_less") : tr("aig_all").replace("{n}", rows.length)) + "</button></p>";
  h += '<p class="fine">' + tr("aig_note").replace("{r}", USD_INR) + "</p></div>";
  el.innerHTML = h;
}
document.addEventListener("click", e => {
  const b = e.target.closest && e.target.closest("[data-aig]"); if (!b) return;
  const a = b.dataset.aig;
  if (a === "all") { aigAll = !aigAll; renderAig(); }
  else if (a === "see") { showTab("cost"); setTimeout(() => { const x = $("aigBox"); if (x) x.scrollIntoView({ behavior: "smooth", block: "start" }); }, 150); }
  else if (a === "open") { showTab("prof"); if (typeof pfOpen === "function") pfOpen(b.dataset.id); window.scrollTo(0, 0); }
});
document.addEventListener("change", e => {
  if (!e.target || e.target.id !== "aigFree") return;
  const v = Math.max(0, Math.round(+e.target.value || 0));
  try { localStorage.setItem("ad-ai-free", String(v)); } catch (x) {}
  renderAig();
});
if (typeof isAdmin === "function" && isAdmin()) aigLoad();
