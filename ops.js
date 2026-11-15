/* Seb Saathi admin — "Site health" tab: login health, AI safety switch, backup and admin activity log.
   Needs supabase/site_ops.sql. Twilio figures come from /api/admin-usage?fn=login (same Twilio keys as the Costs tab). */
Object.assign(T.en, {
  adm_t_op: "Site health", op_h: "Running the site", op_p: "Is sign-in working, is AI spending under control, and a copy of everything.",
  op_err_setup: "Not set up yet. Run supabase/site_ops.sql once in the Supabase SQL Editor, then tap Refresh.", op_err: "Could not load: {m}",
  op_l_h: "Login health", op_l_p: "Sign-ups and sign-ins from Supabase, and the code messages Twilio sent. 'Stuck' = started with a mobile number but never entered the code — the clearest sign codes are not arriving.",
  op_s_su1: "Sign-ups, 24 hours", op_s_su7: "Sign-ups, 7 days", op_s_si1: "Sign-ins, 24 hours", op_s_si7: "Sign-ins, 7 days", op_s_ph7: "Mobile sign-ups, 7 days", op_s_st7: "Stuck at the code, 7 days",
  op_l_bad: "⚠ {p}% of mobile sign-ups this week never got past the code. Check the Twilio messages and WhatsApp templates below.",
  op_l_days: "Sign-ups by day (red = stuck at the code)", op_l_stuck: "Stuck numbers (last 14 days)", op_l_stuck_p: "These growers tried to sign in but never entered the code. Message them to help.",
  op_l_help: "Namaste! Aapne Seb Saathi par mobile number se sign in karne ki koshish ki thi. Agar code nahi aaya, to hamein yahin bata dijiye — hum madad karenge. 🍎",
  op_tw_h: "Twilio, last 7 days", op_tw_off: "Twilio is not connected here. Add TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN in Vercel → Settings → Environment Variables (the same keys the Costs tab uses).",
  op_tw_sent: "Messages sent", op_tw_ch: "By channel", op_tw_wa: "WhatsApp", op_tw_sms: "SMS", op_tw_ok: "Delivered", op_tw_fail: "Failed", op_tw_wait: "Still sending", op_tw_cost: "Cost",
  op_tw_codes: "Failure codes: {l}", op_tw_vf: "Verify codes: {n} sent, {c} entered correctly ({p}%)", op_tw_tpl: "WhatsApp templates",
  op_tw_tpl_none: "No message templates found.", op_tw_part: "Some Twilio figures could not be read: {l}",
  op_tpl_approved: "Approved", op_tpl_rejected: "Rejected", op_tpl_pending: "Waiting for Meta", op_tpl_received: "Waiting for Meta", op_tpl_unsubmitted: "Not sent for approval", op_tpl_paused: "Paused", op_tpl_disabled: "Disabled",
  op_a_h: "AI safety switch", op_a_p: "Pause the AI for Free-plan growers by hand, or let it pause by itself when this month's AI bill reaches your limit. Paid growers are never paused. Growers see a friendly message with an Upgrade button.",
  op_a_dx: "Pause photo checks for Free growers", op_a_ch: "Pause Saathi questions for Free growers", op_a_auto: "Pause both automatically when this month's AI cost reaches",
  op_a_cap: "Monthly limit (₹)", op_a_cost: "AI cost this month: {c} of {l} limit", op_a_cost0: "AI cost this month: {c}", op_a_save: "Save switch", op_a_saved: "Saved.",
  op_a_state: "Free-plan AI", op_a_on: "Free-plan AI is ON", op_a_off_dx: "Free photo checks are PAUSED", op_a_off_ch: "Free Saathi questions are PAUSED", op_a_off_auto: "Free AI is PAUSED: monthly limit reached",
  op_a_last: "Last changed {t} by {b}", op_a_ask: "Save these AI switch settings? They take effect straight away.",
  op_b_h: "Backup", op_b_p: "Download one file with every record the admin page can read: payments, growers, photo checks, Saathi chats, feedback, expenses, settings and the activity log. Keep it somewhere safe (Google Drive or your computer).",
  op_b_go: "⬇ Download backup", op_b_busy: "Collecting {t}…", op_b_done: "Backup saved: {n} records from {k} tables.", op_b_skip: "Skipped (not set up or not allowed): {l}",
  op_g_h: "Activity log", op_g_p: "Every change made from the admin page — payments, expenses, settings, switches, photo-check answers — with who and when.",
  op_g_all: "All", op_g_none: "No admin changes logged yet.", op_g_add: "added", op_g_upd: "changed", op_g_del: "deleted", op_g_more: "Show more"
});
Object.assign(T.hi, {
  adm_t_op: "साइट की सेहत", op_h: "साइट चलाना", op_p: "साइन-इन ठीक चल रहा है, AI का ख़र्च क़ाबू में है, और सबकी एक कॉपी।",
  op_err_setup: "अभी सेट नहीं है। Supabase SQL Editor में supabase/site_ops.sql एक बार चलाएँ, फिर Refresh दबाएँ।", op_err: "लोड नहीं हो सका: {m}",
  op_l_h: "लॉगिन की सेहत", op_l_p: "Supabase से साइन-अप और साइन-इन, और Twilio से भेजे कोड। 'अटके' = मोबाइल नंबर डाला पर कोड नहीं भरा — कोड न पहुँचने का सबसे साफ़ संकेत।",
  op_s_su1: "साइन-अप, 24 घंटे", op_s_su7: "साइन-अप, 7 दिन", op_s_si1: "साइन-इन, 24 घंटे", op_s_si7: "साइन-इन, 7 दिन", op_s_ph7: "मोबाइल साइन-अप, 7 दिन", op_s_st7: "कोड पर अटके, 7 दिन",
  op_l_bad: "⚠ इस हफ़्ते {p}% मोबाइल साइन-अप कोड से आगे नहीं बढ़े। नीचे Twilio संदेश और WhatsApp टेम्पलेट देखें।",
  op_l_days: "दिन के हिसाब से साइन-अप (लाल = कोड पर अटके)", op_l_stuck: "अटके नंबर (पिछले 14 दिन)", op_l_stuck_p: "इन बाग़वानों ने साइन-इन की कोशिश की पर कोड नहीं भरा। मदद के लिए संदेश भेजें।",
  op_tw_h: "Twilio, पिछले 7 दिन", op_tw_off: "Twilio यहाँ जुड़ा नहीं है। Vercel → Settings → Environment Variables में TWILIO_ACCOUNT_SID और TWILIO_AUTH_TOKEN डालें।",
  op_tw_sent: "भेजे संदेश", op_tw_ch: "किस रास्ते से", op_tw_ok: "पहुँचे", op_tw_fail: "नहीं पहुँचे", op_tw_wait: "भेजे जा रहे", op_tw_cost: "ख़र्च",
  op_tw_codes: "ग़लती कोड: {l}", op_tw_vf: "Verify कोड: {n} भेजे, {c} सही भरे ({p}%)", op_tw_tpl: "WhatsApp टेम्पलेट", op_tw_tpl_none: "कोई टेम्पलेट नहीं मिला।", op_tw_part: "कुछ Twilio आँकड़े नहीं पढ़ पाए: {l}",
  op_tpl_approved: "मंज़ूर", op_tpl_rejected: "नामंज़ूर", op_tpl_pending: "Meta के पास", op_tpl_received: "Meta के पास", op_tpl_unsubmitted: "मंज़ूरी के लिए नहीं भेजा", op_tpl_paused: "रुका", op_tpl_disabled: "बंद",
  op_a_h: "AI सुरक्षा स्विच", op_a_p: "मुफ़्त प्लान वालों के लिए AI हाथ से रोकें, या महीने का AI बिल आपकी सीमा तक पहुँचते ही अपने-आप रुके। पैसे देने वालों के लिए कभी नहीं रुकता।",
  op_a_dx: "मुफ़्त बाग़वानों की फ़ोटो जाँच रोकें", op_a_ch: "मुफ़्त बाग़वानों के साथी सवाल रोकें", op_a_auto: "दोनों अपने-आप रोकें जब इस महीने AI ख़र्च पहुँचे",
  op_a_cap: "महीने की सीमा (₹)", op_a_cost: "इस महीने AI ख़र्च: {c}, सीमा {l}", op_a_cost0: "इस महीने AI ख़र्च: {c}", op_a_save: "स्विच सेव करें", op_a_saved: "सेव हो गया।",
  op_a_state: "मुफ़्त प्लान का AI", op_a_on: "मुफ़्त प्लान का AI चालू है", op_a_off_dx: "मुफ़्त फ़ोटो जाँच रुकी है", op_a_off_ch: "मुफ़्त साथी सवाल रुके हैं", op_a_off_auto: "मुफ़्त AI रुका है: महीने की सीमा पूरी",
  op_a_last: "आख़िरी बदलाव {t}, {b}", op_a_ask: "ये AI स्विच सेटिंग सेव करें? ये तुरंत लागू होंगी।",
  op_b_h: "बैकअप", op_b_p: "एक फ़ाइल में वो सब जो एडमिन पेज पढ़ सकता है: भुगतान, बाग़वान, फ़ोटो जाँच, साथी चैट, सुझाव, ख़र्च, सेटिंग और गतिविधि लॉग। इसे सुरक्षित जगह रखें।",
  op_b_go: "⬇ बैकअप डाउनलोड करें", op_b_busy: "{t} इकट्ठा हो रहा है…", op_b_done: "बैकअप सेव: {k} टेबल से {n} रिकॉर्ड।", op_b_skip: "छोड़े गए: {l}",
  op_g_h: "गतिविधि लॉग", op_g_p: "एडमिन पेज से किया हर बदलाव, किसने और कब।", op_g_all: "सभी", op_g_none: "अभी कोई बदलाव दर्ज नहीं।", op_g_add: "जोड़ा", op_g_upd: "बदला", op_g_del: "हटाया", op_g_more: "और दिखाएँ"
});

let OP = null, opBusy = false, opLog = null, opLogN = 50, opLogT = "", opBk = false;
async function opTok() { try { const r = await sb.auth.getSession(); return r && r.data && r.data.session ? r.data.session.access_token : ""; } catch (e) { return ""; } }
const opMissing = e => /could not find the function|does not exist|schema cache|PGRST202|42P01/i.test(String((e && e.message) || e) + String((e && e.code) || ""));
async function loadOp() {
  if (!$("opBody") || !isAdmin() || !sb || opBusy) return;
  opBusy = true; set("opErr", ""); set("opAt", tr("ad_loading")); $("opRefresh").disabled = true;
  const o = { at: new Date().toISOString() }, errs = [];
  const job = async (k, f) => { try { o[k] = await f(); } catch (e) { o[k] = null; if (opMissing(e)) { if (errs.indexOf(tr("op_err_setup")) < 0) errs.push(tr("op_err_setup")); } else errs.push(tr("op_err").replace("{m}", String(e.message || e))); } };
  const rpc = async n => { const r = await sb.rpc(n); if (r.error) throw r.error; return r.data; };
  await Promise.all([
    job("lh", () => rpc("admin_login_health")),
    job("sw", async () => { const r = await sb.from("site_switches").select("*").eq("id", 1).maybeSingle(); if (r.error) throw r.error; return r.data; }),
    job("cost", () => rpc("ai_month_inr")),
    job("log", async () => { const r = await sb.from("admin_log").select("*").order("at", { ascending: false }).limit(500); if (r.error) throw r.error; return r.data || []; }),
    (async () => { try { const r = await fetch("/api/admin-usage?fn=login", { headers: { Authorization: "Bearer " + await opTok() } }); const j = await r.json(); o.tw = j.twilio || null; } catch (e) { o.tw = { setup: true, error: String(e.message || e) }; } })()
  ]);
  opBusy = false; $("opRefresh").disabled = false; set("opAt", tr("ov_at").replace("{t}", adWhen(o.at)));
  OP = o; set("opErr", errs.join(" ")); renderOp();
}

function renderOp() {
  if (!$("opBody")) return;
  if (!OP) { $("opBody").innerHTML = ""; return; }
  $("opBody").innerHTML = opLoginHtml() + opSwitchHtml() + opBackupHtml() + opLogHtml();
}
const opSt = (k, v, cls) => "<div" + (cls ? ' class="' + cls + '"' : "") + "><span>" + esc(tr(k)) + "</span><b>" + v + "</b></div>";

/* ---------- 1. login health ---------- */
function opLoginHtml() {
  const L = OP.lh, tw = OP.tw;
  let h = '<h5 class="ovsub">' + esc(tr("op_l_h")) + '</h5><p class="fine">' + esc(tr("op_l_p")) + "</p>";
  if (L) {
    const stuckPct = +L.phone_7 ? Math.round(+L.stuck_7 / +L.phone_7 * 100) : 0;
    h += '<div class="ystats">' + opSt("op_s_su1", fmtN(+L.signups_1 || 0), "main") + opSt("op_s_su7", fmtN(+L.signups_7 || 0)) + opSt("op_s_si1", fmtN(+L.signins_1 || 0)) + opSt("op_s_si7", fmtN(+L.signins_7 || 0)) +
      opSt("op_s_ph7", fmtN(+L.phone_7 || 0)) + opSt("op_s_st7", fmtN(+L.stuck_7 || 0) + (+L.phone_7 ? " · " + stuckPct + "%" : ""), stuckPct >= 30 && +L.stuck_7 >= 2 ? "neg" : "pos") + "</div>";
    if (stuckPct >= 30 && +L.stuck_7 >= 2) h += '<p class="aqalert">' + esc(tr("op_l_bad").replace("{p}", stuckPct)) + "</p>";
    const by = {}; (L.days || []).forEach(d => { by[String(d.day).slice(0, 10)] = d; });
    const days = []; const ist = new Date(Date.now() + 5.5 * 3600e3);
    for (let i = 13; i >= 0; i--) { const k = new Date(Date.UTC(ist.getUTCFullYear(), ist.getUTCMonth(), ist.getUTCDate() - i)).toISOString().slice(0, 10); days.push({ k, n: by[k] ? +by[k].signups : 0, s: by[k] ? +by[k].stuck : 0 }); }
    const max = Math.max(1, ...days.map(d => d.n));
    h += '<h5 class="ovsub">' + esc(tr("op_l_days")) + '</h5><div class="svchart"><span class="svmax">' + fmtN(max) + '</span><div class="svbars">' +
      days.map(d => { const t = esc(d.k + ": " + d.n + (d.s ? " (" + d.s + " stuck)" : "")); return '<div class="svb opb" title="' + t + '" tabindex="0" aria-label="' + t + '"><i style="height:' + (d.n ? Math.max(3, d.n / max * 100) : 0) + '%"><u style="height:' + (d.n ? d.s / d.n * 100 : 0) + '%"></u></i></div>'; }).join("") +
      '</div><div class="svax"><span>' + days[0].k.slice(5) + "</span><span>" + days[7].k.slice(5) + "</span><span>" + days[13].k.slice(5) + "</span></div></div>";
    const S = L.stuck_list || [];
    if (S.length) h += '<details class="svdays"><summary class="ovsub">' + esc(tr("op_l_stuck")) + " (" + S.length + ')</summary><p class="fine">' + esc(tr("op_l_stuck_p")) + "</p><ul class=\"palog\">" +
      S.map(x => { const p = String(x.phone || "").replace(/\D/g, ""); return "<li><time>" + adWhen(x.created_at) + "</time> +" + esc(p) + ' <a class="btn-s sm" target="_blank" rel="noopener" href="https://wa.me/' + esc(p) + "?text=" + encodeURIComponent(T.en.op_l_help) + '">WhatsApp</a></li>'; }).join("") + "</ul></details>";
  }
  h += '<h5 class="ovsub">' + esc(tr("op_tw_h")) + "</h5>";
  if (!tw || !tw.setup) return h + '<p class="fine">' + esc(tr("op_tw_off")) + "</p>";
  if (tw.error) return h + '<p class="autherr">' + esc(tw.error) + "</p>";
  const M = tw.msgs;
  if (M) {
    h += '<div class="ystats">' + opSt("op_tw_sent", fmtN(M.total), "main") + opSt("op_tw_ch", esc(tr("op_tw_wa")) + " " + fmtN(M.whatsapp) + " · " + esc(tr("op_tw_sms")) + " " + fmtN(M.sms)) +
      opSt("op_tw_ok", fmtN(M.ok), "pos") + opSt("op_tw_fail", fmtN(M.failed) + (M.total ? " · " + Math.round(M.failed / M.total * 100) + "%" : ""), M.failed ? "neg" : "") +
      opSt("op_tw_wait", fmtN(M.waiting)) + opSt("op_tw_cost", esc((M.unit === "USD" ? "$" : M.unit + " ") + M.price.toFixed(2))) + "</div>";
    const C = Object.entries(M.codes || {}).sort((a, b) => b[1] - a[1]);
    if (C.length) h += '<p class="fine">' + esc(tr("op_tw_codes").replace("{l}", C.map(([c, n]) => c + " × " + n).join(", "))) + ' — <a href="https://www.twilio.com/docs/api/errors" target="_blank" rel="noopener">twilio.com/docs/api/errors</a></p>';
  }
  if (tw.verify && tw.verify.total) h += '<p class="fine">' + esc(tr("op_tw_vf").replace("{n}", fmtN(tw.verify.total)).replace("{c}", fmtN(tw.verify.converted)).replace("{p}", Math.round(tw.verify.converted / tw.verify.total * 100))) + "</p>";
  if (tw.templates) {
    h += '<h5 class="ovsub">' + esc(tr("op_tw_tpl")) + "</h5>" + (!tw.templates.length ? '<p class="fine">' + esc(tr("op_tw_tpl_none")) + "</p>" :
      '<div class="optpl">' + tw.templates.map(t => {
        const st = String(t.status || "unsubmitted").toLowerCase(), bad = st === "rejected" || st === "disabled" || st === "paused";
        return '<div class="optpli' + (bad ? " bad" : "") + '"><b>' + esc(t.name) + '</b> <span class="optag' + (st === "approved" ? " ok" : bad ? " bad" : "") + '">' + esc(T.en["op_tpl_" + st] ? tr("op_tpl_" + st) : st) + "</span>" +
          '<br><span class="fine">' + esc(t.category) + "</span>" + (t.reason ? '<p class="fine">' + esc(String(t.reason).slice(0, 300)) + "</p>" : "") + "</div>";
      }).join("") + "</div>");
  }
  if ((tw.errors || []).length) h += '<p class="fine">' + esc(tr("op_tw_part").replace("{l}", tw.errors.map(e => e.what + " (" + e.why + ")").join(", "))) + "</p>";
  return h;
}

/* ---------- 2. AI safety switch ---------- */
function opSwitchHtml() {
  const s = OP.sw;
  let h = '<h5 class="ovsub">' + esc(tr("op_a_h")) + '</h5><p class="fine">' + esc(tr("op_a_p")) + "</p>";
  if (!s) return h + '<p class="fine">' + esc(tr("op_err_setup")) + "</p>";
  const cost = OP.cost == null ? null : +OP.cost, cap = +s.ai_cap_inr || 0;
  const autoHit = s.auto_pause && cap > 0 && cost != null && cost >= cap;
  const state = autoHit ? ["op_a_off_auto", "neg"] : s.free_dx_paused && s.free_chat_paused ? ["op_a_off_dx", "neg"] : s.free_dx_paused ? ["op_a_off_dx", "neg"] : s.free_chat_paused ? ["op_a_off_ch", "neg"] : ["op_a_on", "pos"];
  h += '<div class="ystats"><div class="' + state[1] + '"><span>' + esc(tr("op_a_state")) + "</span><b>" + esc(tr(state[0])) + (s.free_dx_paused && s.free_chat_paused && !autoHit ? " · " + esc(tr("op_a_off_ch")) : "") + "</b></div>" +
    '<div><span>AI</span><b>' + (cost == null ? "–" : esc(cap ? tr("op_a_cost").replace("{c}", rupees(Math.round(cost))).replace("{l}", rupees(cap)) : tr("op_a_cost0").replace("{c}", rupees(Math.round(cost))))) + "</b></div></div>" +
    (cap && cost != null ? '<div class="opcap"><i style="width:' + Math.min(100, cost / cap * 100) + '%" class="' + (cost >= cap ? "full" : cost >= .8 * cap ? "near" : "") + '"></i></div>' : "") +
    '<form id="opSw" class="opsw">' +
    '<label><input type="checkbox" id="opDx"' + (s.free_dx_paused ? " checked" : "") + "> " + esc(tr("op_a_dx")) + "</label>" +
    '<label><input type="checkbox" id="opCh"' + (s.free_chat_paused ? " checked" : "") + "> " + esc(tr("op_a_ch")) + "</label>" +
    '<label><input type="checkbox" id="opAuto"' + (s.auto_pause ? " checked" : "") + "> " + esc(tr("op_a_auto")) + '</label> <label class="opcapin">' + esc(tr("op_a_cap")) +
    ' <input type="number" id="opCap" min="0" step="100" inputmode="numeric" value="' + (cap || "") + '"></label>' +
    '<p><button class="btn-s add" type="submit" id="opSwSave">' + esc(tr("op_a_save")) + '</button> <span class="fine" id="opSwMsg" role="status"></span></p></form>' +
    (s.updated_by ? '<p class="fine">' + esc(tr("op_a_last").replace("{t}", adWhen(s.updated_at)).replace("{b}", s.updated_by)) + "</p>" : "");
  return h;
}
document.addEventListener("submit", async e => {
  if (!e.target || e.target.id !== "opSw") return;
  e.preventDefault();
  if (!confirm(tr("op_a_ask"))) return;
  const cap = Math.max(0, Math.min(10000000, Math.round(+$("opCap").value || 0)));
  const v = { free_dx_paused: $("opDx").checked, free_chat_paused: $("opCh").checked, auto_pause: $("opAuto").checked, ai_cap_inr: cap };
  $("opSwSave").disabled = true;
  const r = await sb.from("site_switches").update(v).eq("id", 1).select().single();
  $("opSwSave").disabled = false;
  if (r.error) { set("opSwMsg", tr("op_err").replace("{m}", r.error.message || "")); return; }
  OP.sw = r.data; renderOp(); set("opSwMsg", tr("op_a_saved")); opReloadLog();
});

/* ---------- 3. backup ---------- */
function opBackupHtml() {
  return '<h5 class="ovsub">' + esc(tr("op_b_h")) + '</h5><p class="fine">' + esc(tr("op_b_p")) + '</p><p><button class="btn-s add" type="button" id="opBk"' + (opBk ? " disabled" : "") + ">" + esc(tr("op_b_go")) +
    '</button> <span class="fine" id="opBkMsg" role="status"></span></p>';
}
const OP_TABLES = ["payments", "payment_events", "diagnoses", "chat_messages", "feedback", "site_visits", "admin_expenses", "admin_costs", "ai_usage",
  "articles", "site_switches", "plan_settings", "admin_log", "social_queue", "marketing_posts", "admin_emails"];
async function opBackup() {
  if (opBk) return; opBk = true; $("opBk").disabled = true;
  const out = { app: "Seb Saathi", made_at: new Date().toISOString(), by: user && user.email, tables: {} }, skip = [];
  let n = 0;
  try {
    set("opBkMsg", tr("op_b_busy").replace("{t}", "accounts"));
    try { const r = await sb.rpc("admin_growth"); if (r.error) throw r.error; out.tables.accounts = r.data || []; n += out.tables.accounts.length; } catch (e) { skip.push("accounts"); }
    set("opBkMsg", tr("op_b_busy").replace("{t}", "ledgers"));
    try { const r = await sb.rpc("admin_backup_records"); if (r.error) throw r.error; ["ledgers", "ledger_shares"].forEach(k => { out.tables[k] = (r.data && r.data[k]) || []; n += out.tables[k].length; }); } catch (e) { skip.push("ledgers"); }
    for (const t of OP_TABLES) {
      set("opBkMsg", tr("op_b_busy").replace("{t}", t));
      const rows = []; let ok = true;
      for (let from = 0; from < 200000; from += 1000) {
        const r = await sb.from(t).select("*").range(from, from + 999);
        if (r.error) { ok = false; break; }
        rows.push(...(r.data || [])); if (!r.data || r.data.length < 1000) break;
      }
      if (ok) { out.tables[t] = rows; n += rows.length; } else skip.push(t);
    }
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([JSON.stringify(out)], { type: "application/json" }));
    a.download = "seb-saathi-backup-" + new Date().toISOString().slice(0, 10) + ".json";
    document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
    set("opBkMsg", tr("op_b_done").replace("{n}", fmtN(n)).replace("{k}", Object.keys(out.tables).length) + (skip.length ? " " + tr("op_b_skip").replace("{l}", skip.join(", ")) : ""));
    try { await sb.from("admin_log").insert({ by_email: user && user.email, tbl: "backup", op: "download", changes: { records: n, tables: Object.keys(out.tables) } }); } catch (e) {}
    opReloadLog();
  } catch (e) { set("opBkMsg", tr("op_err").replace("{m}", String(e.message || e))); }
  opBk = false; if ($("opBk")) $("opBk").disabled = false;
}

/* ---------- 4. activity log ---------- */
async function opReloadLog() { try { const r = await sb.from("admin_log").select("*").order("at", { ascending: false }).limit(500); if (!r.error && OP) { OP.log = r.data || []; if ($("opLog")) $("opLog").outerHTML = opLogInner(); } } catch (e) {} }
const opShort = v => { const s = v == null ? "–" : typeof v === "object" ? JSON.stringify(v) : String(v); return s.length > 60 ? s.slice(0, 57) + "…" : s; };
function opLogInner() {
  const L = (OP.log || []).filter(x => !opLogT || x.tbl === opLogT);
  if (!OP.log) return '<div id="opLog"><p class="fine">' + esc(tr("op_err_setup")) + "</p></div>";
  return '<div id="opLog">' + (!L.length ? '<p class="fine">' + esc(tr("op_g_none")) + "</p>" :
    '<ul class="palog">' + L.slice(0, opLogN).map(x => {
      const c = x.changes || {}, what = x.op === "update" ? Object.keys(c).slice(0, 4).map(k => esc(k) + ": " + esc(opShort(Array.isArray(c[k]) ? c[k][0] : null)) + " → " + esc(opShort(Array.isArray(c[k]) ? c[k][1] : c[k]))).join("; ")
        : x.op === "download" ? esc(fmtN(c.records || 0)) + " records" : esc(opShort(c.email || c.name || c.item || c.amount_inr || c.plan || ""));
      return "<li><time>" + adWhen(x.at) + "</time> <b>" + esc(x.by_email || "–") + "</b> " + esc(x.op === "insert" ? tr("op_g_add") : x.op === "update" ? tr("op_g_upd") : x.op === "delete" ? tr("op_g_del") : x.op) + " <code>" + esc(x.tbl) + "</code> " + what + "</li>";
    }).join("") + "</ul>" + (L.length > opLogN ? '<p><button class="btn-s" type="button" id="opLogMore">' + esc(tr("op_g_more")) + "</button></p>" : "")) + "</div>";
}
function opLogHtml() {
  const tabs = Array.from(new Set((OP.log || []).map(x => x.tbl))).sort();
  return '<h5 class="ovsub">' + esc(tr("op_g_h")) + '</h5><p class="fine">' + esc(tr("op_g_p")) + "</p>" +
    (tabs.length > 1 ? '<div class="sbfilt">' + [""].concat(tabs).map(t => '<button class="btn-s" type="button" data-oplt="' + esc(t) + '" aria-pressed="' + (opLogT === t) + '">' + esc(t || tr("op_g_all")) + "</button>").join("") + "</div>" : "") +
    opLogInner();
}
document.addEventListener("click", e => {
  const t = e.target; if (!t || !t.closest) return;
  if (t.closest("#opBk")) { opBackup(); return; }
  if (t.closest("#opLogMore")) { opLogN += 100; $("opLog").outerHTML = opLogInner(); return; }
  const f = t.closest("[data-oplt]"); if (f && OP) { opLogT = f.dataset.oplt; renderOp(); }
});
if ($("opRefresh")) $("opRefresh").addEventListener("click", loadOp);
/* these texts arrive after admin.js drew the page: draw again, and load now if this tab was opened before this file arrived */
if (typeof applyLang === "function") applyLang();
if (typeof tab !== "undefined" && tab === "op" && typeof loaded !== "undefined" && loaded.op && isAdmin() && !OP) loadOp();
