/* Seb Saathi admin — "Soil tests" tab: soil test orders, lab status, results and prices. Admin only; growers see nothing here.
   Needs supabase/soil_tests.sql (tables soil_tests, soil_test_prices; functions admin_soil_growers, admin_soil_copy; private bucket soil-reports).
   "Copy to orchard" adds the result as one row in that orchard's Soil tests list (date, pH, N, P, K, organic carbon, note). */
Object.assign(T.en, {
  adm_t_sl: "Soil tests", sl_h: "Soil test orders", sl_p: "Orders, lab progress, results and prices. Growers see a result only after you copy it to their orchard.",
  sl_err_setup: "Not set up yet. Run supabase/soil_tests.sql once in the Supabase SQL Editor, then tap Refresh.", sl_err: "Could not load: {m}",
  sl_new: "＋ New soil test order", sl_f_open: "Open", sl_f_ready: "Report ready", sl_f_all: "All",
  sl_s_ordered: "Ordered", sl_s_sample_received: "Sample received", sl_s_testing: "Testing", sl_s_report_ready: "Report ready", sl_s_cancelled: "Cancelled",
  sl_st_lab: "In lab", sl_st_unpaid: "Unpaid", sl_none: "No soil tests here yet.",
  sl_m_collect: "We collect", sl_m_courier: "Courier/post", sl_m_drop_off: "Drop-off",
  sl_grower: "Grower", sl_orchard: "Orchard", sl_test: "Test", sl_sample: "Sample", sl_cname: "Contact name", sl_mobile: "Mobile", sl_addr: "Village / address",
  sl_choose: "Choose…", sl_pick_g: "Choose grower first", sl_no_orch: "No orchards", sl_create: "Create order", sl_close: "Close", sl_need_g: "Choose a grower.",
  sl_created: "Order created.", sl_ordered_on: "Ordered {d} · ₹{p}", sl_mark: "Mark: {s}", sl_paid: "Paid", sl_mpaid: "Mark paid", sl_munpaid: "Mark unpaid",
  sl_cancel: "Cancel order", sl_cancel2: "Tap again to cancel", sl_results: "Results", sl_tested: "Tested on", sl_notes: "Notes / advice", sl_pdf: "Report PDF (optional)",
  sl_open_pdf: "Open report", sl_save: "Save results", sl_saved: "Results saved.", sl_pdf_err: "PDF not uploaded: {m}",
  sl_copy: "Copy to orchard", sl_copy2: "Copy to orchard again", sl_copied: "✓ In the orchard's Soil tests", sl_copy_ok: "Added to {o}'s Soil tests.", sl_copy_need: "Enter at least one result first.",
  sl_prices: "Test prices", sl_price: "Price ₹", sl_save_prices: "Save prices", sl_prices_ok: "Prices saved.", sl_no_orchard: "No orchard"
});
Object.assign(T.hi, {
  adm_t_sl: "मिट्टी जाँच", sl_h: "मिट्टी जाँच के ऑर्डर", sl_p: "ऑर्डर, लैब की स्थिति, नतीजे और दाम। बाग़वान को नतीजा तभी दिखता है जब आप उसे उसके बाग़ में कॉपी करें।",
  sl_err_setup: "अभी सेट नहीं है। Supabase SQL Editor में supabase/soil_tests.sql एक बार चलाएँ, फिर Refresh दबाएँ।"
});

const SL_STAT = ["ordered", "sample_received", "testing", "report_ready"];
const SL_METH = ["collect", "courier", "drop_off"];
const SL_FIELDS = [["ph", "pH", ""], ["ec", "EC", "dS/m"], ["organic_carbon", "Organic carbon", "%"], ["nitrogen", "Nitrogen (N)", "kg/ha"], ["phosphorus", "Phosphorus (P)", "kg/ha"],
  ["potassium", "Potassium (K)", "kg/ha"], ["zinc", "Zinc", "ppm", 1], ["boron", "Boron", "ppm", 1], ["iron", "Iron", "ppm", 1], ["manganese", "Manganese", "ppm", 1], ["copper", "Copper", "ppm", 1]];
let SL = null, slBusy = false, slFilter = "open", slOpen = null, slForm = false;

async function loadSl() {
  if (!$("slBody") || !isAdmin() || !sb || slBusy) return;
  slBusy = true; set("slErr", ""); set("slAt", tr("ad_loading")); $("slRefresh").disabled = true;
  let err = null, o = null, g = [], p = [];
  try {
    const r = await Promise.all([sb.from("soil_tests").select("*").order("created_at", {ascending: false}), sb.rpc("admin_soil_growers"), sb.from("soil_test_prices").select("*")]);
    if (r[0].error) err = r[0].error; else o = r[0].data || [];
    if (!err && r[1].error) err = r[1].error; else g = r[1].data || [];
    p = r[2].data || [];
  } catch (e) { err = e; }
  slBusy = false; $("slRefresh").disabled = false; set("slAt", "");
  if (err) { const m = String(err.message || err); set("slErr", /could not find|does not exist|schema cache|PGRST20[25]|42P01/i.test(m + (err.code || "")) ? tr("sl_err_setup") : tr("sl_err").replace("{m}", m)); }
  SL = o ? {orders: o, growers: g, prices: Object.fromEntries(p.map(r => [r.test_type, r])), at: new Date().toISOString()} : null;
  if (SL) set("slAt", tr("ov_at").replace("{t}", adWhen(SL.at)));
  renderSl();
}
const slGrower = id => SL.growers.find(g => g.id === id);
const slWho = g => !g ? "–" : g.name || (g.phone ? "+" + g.phone : "") || (g.email && !/@m\.sebsaathi\.com$/i.test(g.email) ? g.email : "") || "–";
function slMsg(t) { set("slMsg", t); setTimeout(() => { if ($("slMsg") && $("slMsg").textContent === t) set("slMsg", ""); }, 3000); }

function renderSl() {
  if (!$("slBody")) return;
  if (!SL) { $("slBody").innerHTML = ""; return; }
  const O = SL.orders, n = f => fmtN(O.filter(f).length);
  const stats = '<div class="slstats">' + [[n(x => x.status === "ordered"), "sl_s_ordered"], [n(x => x.status === "sample_received" || x.status === "testing"), "sl_st_lab"],
    [n(x => x.status === "report_ready"), "sl_s_report_ready"], [n(x => !x.paid && x.status !== "cancelled"), "sl_st_unpaid"]].map(s => "<div><b>" + s[0] + "</b><span>" + esc(tr(s[1])) + "</span></div>").join("") + "</div>";
  const filt = '<div class="slbar"><button class="btn-s add" type="button" data-sl="new">' + esc(tr("sl_new")) + '</button><span class="sbfilt">' +
    [["open", "sl_f_open"], ["report_ready", "sl_f_ready"], ["all", "sl_f_all"]].map(f => '<button class="btn-s" type="button" data-slf="' + f[0] + '" aria-pressed="' + (slFilter === f[0]) + '">' + esc(tr(f[1])) + "</button>").join("") + "</span></div>";
  const shown = O.filter(x => slFilter === "all" ? true : slFilter === "open" ? x.status !== "report_ready" && x.status !== "cancelled" : x.status === slFilter);
  $("slBody").innerHTML = stats + filt + '<p class="fine" id="slMsg" role="status"></p>' + (slForm ? slFormHtml() : "") +
    (shown.length ? shown.map(slCard).join("") : '<p class="empty">' + esc(tr("sl_none")) + "</p>") + slPricesHtml();
}
function slCard(x) {
  const open = slOpen === x.id, i = SL_STAT.indexOf(x.status), next = i >= 0 && i < SL_STAT.length - 1 ? SL_STAT[i + 1] : null;
  const g = slGrower(x.grower_id), tt = (SL.prices[x.test_type] || {}).label || x.test_type;
  let h = '<div class="slcard' + (open ? " open" : "") + '"><button class="slhead" type="button" data-slo="' + x.id + '" aria-expanded="' + open + '"><b>' + esc(x.grower_label || slWho(g)) + "</b>" +
    '<span class="fine">' + esc((x.orchard_name || tr("sl_no_orchard")) + " · " + tt) + "</span><span class=\"slsp\"></span>" +
    (x.paid ? '<span class="tag ok">' + esc(tr("sl_paid")) + "</span>" : "") + '<span class="tag sl-' + esc(x.status) + '">' + esc(tr("sl_s_" + x.status)) + "</span></button>";
  if (open) {
    const F = SL_FIELDS.filter(f => x.test_type === "full" || !f[3]), r = x.results || {};
    h += '<p class="fine">' + esc([tr("sl_m_" + x.sample_method), x.contact_name, x.contact_mobile].filter(Boolean).join(" · ")) + (x.address ? "<br>" + esc(x.address) : "") +
      "<br>" + esc(tr("sl_ordered_on").replace("{d}", new Date(x.created_at).toLocaleDateString("en-IN")).replace("{p}", fmtN(+x.price || 0))) + "</p>" +
      '<div class="slbtns">' + (next ? '<button class="btn-s add" type="button" data-slnext="' + x.id + '" data-to="' + next + '">' + esc(tr("sl_mark").replace("{s}", tr("sl_s_" + next))) + "</button>" : "") +
      '<button class="btn-s" type="button" data-slpaid="' + x.id + '">' + esc(tr(x.paid ? "sl_munpaid" : "sl_mpaid")) + "</button>" +
      (x.status !== "cancelled" ? '<button class="btn-s" type="button" data-slcancel="' + x.id + '">' + esc(tr("sl_cancel")) + "</button>" : "") + "</div>" +
      '<h5 class="ovsub">' + esc(tr("sl_results")) + '</h5><div class="slgrid" data-slres="' + x.id + '">' +
      F.map(f => "<label>" + esc(f[1] + (f[2] ? " (" + f[2] + ")" : "")) + '<input type="number" step="any" inputmode="decimal" name="' + f[0] + '" value="' + esc(r[f[0]] == null ? "" : r[f[0]]) + '"></label>').join("") +
      "<label>" + esc(tr("sl_tested")) + '<input type="date" name="tested_on" value="' + esc(x.tested_on || "") + '"></label></div>' +
      '<label class="slwide">' + esc(tr("sl_notes")) + '<textarea rows="2" data-slnotes="' + x.id + '">' + esc(x.notes || "") + "</textarea></label>" +
      '<label class="slwide">' + esc(tr("sl_pdf")) + '<input type="file" accept="application/pdf" data-slpdf="' + x.id + '"></label>' +
      (x.report_path ? '<p><button class="btn-s" type="button" data-slview="' + x.id + '">' + esc(tr("sl_open_pdf")) + "</button></p>" : "") +
      '<div class="slbtns"><button class="btn-s add" type="button" data-slsave="' + x.id + '">' + esc(tr("sl_save")) + "</button>" +
      '<button class="btn-s" type="button" data-slcopy="' + x.id + '"' + (x.orchard_id && x.grower_id ? "" : " disabled") + ">" + esc(tr(x.copied_to_orchard ? "sl_copy2" : "sl_copy")) + "</button></div>" +
      (x.copied_to_orchard ? '<p class="fine">' + esc(tr("sl_copied")) + "</p>" : "");
  }
  return h + "</div>";
}
function slFormHtml() {
  const G = SL.growers.slice().sort((a, b) => slWho(a).localeCompare(slWho(b)));
  return '<div class="slcard open"><h5 class="ovsub" style="margin-top:0">' + esc(tr("sl_new").replace("＋ ", "")) + '</h5><div class="slgrid" id="slNew">' +
    "<label>" + esc(tr("sl_grower")) + '<select name="grower"><option value="">' + esc(tr("sl_choose")) + "</option>" + G.map(g => '<option value="' + esc(g.id) + '">' + esc(slWho(g)) + "</option>").join("") + "</select></label>" +
    "<label>" + esc(tr("sl_orchard")) + '<select name="orchard"><option value="">' + esc(tr("sl_pick_g")) + "</option></select></label>" +
    "<label>" + esc(tr("sl_test")) + '<select name="test_type">' + ["basic", "full"].map(t => '<option value="' + t + '">' + esc(((SL.prices[t] || {}).label || t) + " · ₹" + fmtN(+(SL.prices[t] || {}).price || 0)) + "</option>").join("") + "</select></label>" +
    "<label>" + esc(tr("sl_sample")) + '<select name="sample_method">' + SL_METH.map(m => '<option value="' + m + '">' + esc(tr("sl_m_" + m)) + "</option>").join("") + "</select></label>" +
    "<label>" + esc(tr("sl_cname")) + '<input name="contact_name" maxlength="80"></label><label>' + esc(tr("sl_mobile")) + '<input name="contact_mobile" inputmode="tel" maxlength="20"></label></div>' +
    '<label class="slwide">' + esc(tr("sl_addr")) + '<textarea name="address" rows="2" maxlength="300"></textarea></label>' +
    '<div class="slbtns"><button class="btn-s add" type="button" data-sl="create">' + esc(tr("sl_create")) + '</button><button class="btn-s" type="button" data-sl="close">' + esc(tr("sl_close")) + "</button></div></div>";
}
function slPricesHtml() {
  return '<details class="slcard"><summary><b>' + esc(tr("sl_prices")) + "</b></summary>" + ["basic", "full"].map(t => {
    const p = SL.prices[t] || {label: t, price: 0, includes: ""};
    return '<div class="slprice"><b>' + esc(p.label) + "</b><label>" + esc(tr("sl_price")) + '<input type="number" min="0" data-slprice="' + t + '" value="' + esc(p.price) + '"></label><span class="fine">' + esc(p.includes || "") + "</span></div>";
  }).join("") + '<button class="btn-s" type="button" data-sl="prices">' + esc(tr("sl_save_prices")) + "</button></details>";
}
async function slUpdate(id, patch) {
  const r = await sb.from("soil_tests").update(patch).eq("id", id);
  if (r.error) { slMsg(r.error.message); return false; }
  Object.assign(SL.orders.find(x => x.id === id), patch); return true;
}
function slRead(id) {
  const box = document.querySelector('[data-slres="' + id + '"]'), results = {}; let tested_on = null;
  box.querySelectorAll("input").forEach(i => { if (i.name === "tested_on") tested_on = i.value || null; else if (i.value !== "" && isFinite(+i.value)) results[i.name] = +i.value; });
  return {results, tested_on, notes: document.querySelector('[data-slnotes="' + id + '"]').value.trim() || null};
}
async function slSave(id, quiet) {
  const patch = slRead(id), f = document.querySelector('[data-slpdf="' + id + '"]'), file = f && f.files[0];
  if (file) {
    const path = id + "/" + Date.now() + ".pdf", up = await sb.storage.from("soil-reports").upload(path, file, {upsert: true, contentType: "application/pdf"});
    if (up.error) slMsg(tr("sl_pdf_err").replace("{m}", up.error.message)); else patch.report_path = path;
  }
  const ok = await slUpdate(id, patch);
  if (ok && !quiet) { renderSl(); slMsg(tr("sl_saved")); }
  return ok;
}
async function slCopy(id) {
  if (!Object.keys(slRead(id).results).length) { slMsg(tr("sl_copy_need")); return; }
  if (!(await slSave(id, true))) return;
  const r = await sb.rpc("admin_soil_copy", {test_id: id});
  if (r.error) { slMsg(r.error.message); return; }
  SL.orders.find(x => x.id === id).copied_to_orchard = true;
  renderSl(); slMsg(tr("sl_copy_ok").replace("{o}", (r.data && r.data.orchard) || tr("sl_orchard")));
}
async function slCreate() {
  const f = $("slNew"), v = n => (f.querySelector('[name="' + n + '"]').value || "").trim();
  if (!v("grower")) { slMsg(tr("sl_need_g")); return; }
  const g = slGrower(v("grower")), o = ((g && g.orchards) || []).find(x => x.id === v("orchard"));
  const row = {grower_id: v("grower"), grower_label: slWho(g), orchard_id: o ? o.id : null, orchard_name: o ? o.name : null, test_type: v("test_type"), sample_method: v("sample_method"),
    contact_name: v("contact_name") || null, contact_mobile: v("contact_mobile") || null, address: v("address") || null, price: +(SL.prices[v("test_type")] || {}).price || 0};
  const r = await sb.from("soil_tests").insert(row).select("*");
  if (r.error) { slMsg(r.error.message); return; }
  SL.orders.unshift(r.data[0]); slForm = false; slFilter = "open"; slOpen = r.data[0].id; renderSl(); slMsg(tr("sl_created"));
}
async function slSavePrices() {
  const rows = Array.from(document.querySelectorAll("[data-slprice]")).map(i => Object.assign({}, SL.prices[i.dataset.slprice] || {label: i.dataset.slprice}, {test_type: i.dataset.slprice, price: +i.value || 0}));
  const r = await sb.from("soil_test_prices").upsert(rows);
  if (r.error) { slMsg(r.error.message); return; }
  rows.forEach(p => { SL.prices[p.test_type] = p; }); slMsg(tr("sl_prices_ok"));
}
document.addEventListener("change", e => {
  const s = e.target.closest && e.target.closest('#slNew [name="grower"]'); if (!s || !SL) return;
  const g = slGrower(s.value), f = $("slNew"), os = f.querySelector('[name="orchard"]'), O = (g && g.orchards) || [];
  os.innerHTML = O.length ? O.map(o => '<option value="' + esc(o.id) + '">' + esc(o.name || "–") + "</option>").join("") : '<option value="">' + esc(tr("sl_no_orch")) + "</option>";
  if (g) { f.querySelector('[name="contact_name"]').value = g.name || ""; f.querySelector('[name="contact_mobile"]').value = g.phone ? "+" + g.phone : ""; }
});
document.addEventListener("click", async e => {
  const t = e.target.closest && e.target.closest("[data-sl],[data-slf],[data-slo],[data-slnext],[data-slpaid],[data-slcancel],[data-slsave],[data-slcopy],[data-slview]");
  if (!t || !SL) return;
  const d = t.dataset;
  if (d.sl === "new") { slForm = true; renderSl(); }
  else if (d.sl === "close") { slForm = false; renderSl(); }
  else if (d.sl === "create") slCreate();
  else if (d.sl === "prices") slSavePrices();
  else if (d.slf) { slFilter = d.slf; renderSl(); }
  else if (d.slo) { slOpen = slOpen === d.slo ? null : d.slo; renderSl(); }
  else if (d.slnext) { if (await slUpdate(d.slnext, {status: d.to})) renderSl(); }
  else if (d.slpaid) { const x = SL.orders.find(o => o.id === d.slpaid); if (await slUpdate(d.slpaid, {paid: !x.paid})) renderSl(); }
  else if (d.slcancel) {   /* two taps instead of a browser dialog */
    if (!t.dataset.armed) { t.dataset.armed = "1"; t.textContent = tr("sl_cancel2"); setTimeout(() => { if (t.isConnected) { delete t.dataset.armed; t.textContent = tr("sl_cancel"); } }, 3000); return; }
    if (await slUpdate(d.slcancel, {status: "cancelled"})) renderSl();
  }
  else if (d.slsave) slSave(d.slsave);
  else if (d.slcopy) slCopy(d.slcopy);
  else if (d.slview) {
    const x = SL.orders.find(o => o.id === d.slview), r = await sb.storage.from("soil-reports").createSignedUrl(x.report_path, 600);
    if (r.error) slMsg(r.error.message); else window.open(r.data.signedUrl, "_blank", "noopener");
  }
});
if ($("slRefresh")) $("slRefresh").addEventListener("click", loadSl);
/* these texts arrive after admin.js drew the page: draw again, and load now if this tab was opened before this file arrived */
if (typeof applyLang === "function") applyLang();
if (typeof tab !== "undefined" && tab === "sl" && typeof loaded !== "undefined" && loaded.sl && isAdmin() && !SL) loadSl();
