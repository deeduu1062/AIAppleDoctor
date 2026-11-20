/* Seb Saathi admin — Site health → "🔑 Keys & AI".
   1. Which AI answers Saathi chat and the photo check: Auto / Google Gemini / Anthropic Claude, switched here with one tap.
      Saved in plan_settings.data.ai (no new table); the server (api/_llm.js) reads it within a minute.
   2. Every key the site uses, grouped, with ✓ set / ✗ not set in Vercel (the values are never shown or sent to the page).
   3. "Test" buttons for each service (a free, read-only check; AI keys get one tiny question), and "Test all".
   Server: /api/social?fn=keys (api/_keys.js). Loaded after ops.js and money.js. */
Object.assign(T.en, {
  ky_h: "🔑 Keys & AI", ky_p: "Which AI answers growers, and which keys are set up in Vercel. Key values are never shown here.",
  ky_ai_h: "Which AI answers", ky_chat: "Saathi chat", ky_dx: "Photo check (disease)",
  ky_auto: "Auto", ky_gem: "Google Gemini", ky_cla: "Anthropic Claude",
  ky_auto_p: "Auto = Gemini when its key is set, otherwise Claude. If the chosen AI fails, the other one answers (when its key is set).",
  ky_nokey: "{a} key is not set, so {b} answers instead.", ky_now: "Now answering: {a}",
  ky_saved: "Saved. Takes effect within a minute.", ky_ask: "Switch {f} to {a}? It takes effect within a minute for all growers.",
  ky_test: "Test", ky_testing: "Testing…", ky_ok: "✓ Works ({m}, {s} s)", ky_bad: "✗ {m}",
  ky_list_h: "Keys in Vercel", ky_set: "✓ set", ky_unset: "✗ not set", ky_of: "{n} of {t} set",
  ky_how: "To add or change a key: Vercel → your project → Settings → Environment Variables → add or edit → then Deployments → Redeploy.",
  ky_err: "Could not load the key list: {m}", ky_testall: "Test all", ky_loading: "Loading…", ky_show: "Show all keys", ky_hide: "Hide keys",
});
Object.assign(T.hi, {
  ky_h: "🔑 Keys और AI", ky_p: "बाग़वानों को कौन-सा AI जवाब देता है, और Vercel में कौन-सी keys लगी हैं। Keys की value यहाँ कभी नहीं दिखती।",
  ky_ai_h: "कौन-सा AI जवाब दे", ky_chat: "साथी चैट", ky_dx: "फ़ोटो जाँच (रोग)",
  ky_auto: "अपने आप", ky_gem: "Google Gemini", ky_cla: "Anthropic Claude",
  ky_auto_p: "अपने आप = Gemini की key हो तो Gemini, नहीं तो Claude। चुना AI न चले तो दूसरा जवाब देता है (अगर उसकी key हो)।",
  ky_nokey: "{a} की key नहीं है, इसलिए {b} जवाब देता है।", ky_now: "अभी जवाब दे रहा है: {a}",
  ky_saved: "सेव हो गया। एक मिनट में लागू होगा।", ky_ask: "{f} को {a} पर बदलें? एक मिनट में सभी बाग़वानों के लिए लागू होगा।",
  ky_test: "जाँचें", ky_testing: "जाँच रहे हैं…", ky_ok: "✓ चल रहा है ({m}, {s} सेकंड)", ky_bad: "✗ {m}",
  ky_list_h: "Vercel में keys", ky_set: "✓ लगी है", ky_unset: "✗ नहीं लगी", ky_of: "{t} में से {n} लगी हैं",
  ky_how: "Key जोड़ने या बदलने के लिए: Vercel → प्रोजेक्ट → Settings → Environment Variables → जोड़ें या बदलें → फिर Deployments → Redeploy।",
  ky_err: "Keys की सूची लोड नहीं हुई: {m}", ky_testall: "सब जाँचें", ky_loading: "लोड हो रहा है…", ky_show: "सारी keys दिखाएँ", ky_hide: "keys छिपाएँ",
});
const KY = { info: null, err: "", ai: null, busy: "", msg: "", test: {}, open: false, loading: false };
const kyT = (k, o) => { let s = tr(k); Object.keys(o || {}).forEach(x => { s = s.split("{" + x + "}").join(o[x]); }); return s; };
const KY_NAME = { gemini: "ky_gem", claude: "ky_cla", auto: "ky_auto" };

async function kyLoad() {
  if (KY.loading) return;
  KY.loading = true; KY.err = "";
  try {
    const r = await fetch("/api/social?fn=keys", { headers: { Authorization: "Bearer " + await opTok() } });
    const j = await r.json().catch(() => ({}));
    if (!r.ok || !j.keys) throw new Error(j.error || ("HTTP " + r.status));
    KY.info = j;
  } catch (e) { KY.err = kyT("ky_err", { m: String(e.message || e) }); }
  try { const r = await sb.from("plan_settings").select("data").eq("id", 1).maybeSingle(); KY.ai = (r && r.data && r.data.data && r.data.data.ai) || {}; } catch (e) { KY.ai = {}; }
  KY.loading = false; kyRender();
}
/* who really answers, given the choice and which keys are set (same rule as api/_llm.js) */
function kyWho(choice) {
  const I = KY.info && KY.info.ai || {}, g = !!I.gemini, c = !!I.claude;
  const want = choice === "gemini" || choice === "claude" ? choice : (String(I.env_provider || "").toLowerCase().startsWith("c") ? "claude" : String(I.env_provider || "").toLowerCase().startsWith("g") ? "gemini" : (g ? "gemini" : "claude"));
  if (want === "gemini") return g ? "gemini" : (c ? "claude" : "");
  return c ? "claude" : (g ? "gemini" : "");
}
function kyAiRow(f, label) {
  const cur = (KY.ai && KY.ai[f]) || "auto", who = kyWho(cur), dis = KY.busy ? " disabled" : "";
  let h = '<div class="kyrow"><b>' + esc(tr(label)) + '</b><div class="avchips">' +
    ["auto", "gemini", "claude"].map(a => '<button type="button" class="btn-s avchip" data-ky="set" data-f="' + f + '" data-a="' + a + '" aria-pressed="' + (cur === a) + '"' + dis + ">" + esc(tr(KY_NAME[a])) + "</button>").join("") + "</div>";
  if (KY.info) {
    h += '<p class="fine">' + (who ? esc(kyT("ky_now", { a: tr(KY_NAME[who]) })) : "⚠") +
      (cur !== "auto" && who && who !== cur ? " · " + esc(kyT("ky_nokey", { a: tr(KY_NAME[cur]), b: tr(KY_NAME[who]) })) : "") + "</p>";
  }
  return h + "</div>";
}
function kyTestOut(w) {
  const t = KY.test[w];
  return '<span class="fine" role="status">' + (t === "busy" ? esc(tr("ky_testing")) : t ? (t.ok ? '<span class="pos">' + esc(kyT("ky_ok", { m: t.model || "", s: ((t.ms || 0) / 1000).toFixed(1) })) + "</span>" : '<span class="neg">' + esc(kyT("ky_bad", { m: t.message || "" })) + "</span>") : "") + "</span>";
}
function kySvcHtml(v) {
  const n = v.keys.filter(k => k.set).length, all = n === v.keys.length, none = !n;
  const st = none ? '<span class="fine">' + esc(tr("ky_unset")) + "</span>" : all ? '<span class="pos">' + esc(tr("ky_set")) + "</span>" : '<span class="neg">' + esc(kyT("ky_of", { n, t: v.keys.length })) + "</span>";
  return '<li class="kysvc"><div><b>' + esc(v.label) + "</b> " + st +
    (v.test ? ' <button type="button" class="btn-s" data-ky="test" data-w="' + esc(v.id) + '"' + (KY.test[v.id] === "busy" ? " disabled" : "") + ">" + esc(tr("ky_test")) + "</button> " + kyTestOut(v.id) : "") + "</div>" +
    '<div class="fine">' + v.keys.map(k => "<code>" + esc(k.name) + "</code> " + (k.set ? "✓" : "✗")).join(" · ") + "</div></li>";
}
function kyHtml() {
  let h = '<section class="kybox" id="kyBox"><h5 class="ovsub">' + esc(tr("ky_h")) + '</h5><p class="fine">' + esc(tr("ky_p")) + "</p>";
  h += '<p class="fine"><b>' + esc(tr("ky_ai_h")) + "</b></p>" + kyAiRow("chat", "ky_chat") + kyAiRow("dx", "ky_dx") + '<p class="fine">' + esc(tr("ky_auto_p")) + "</p>";
  if (KY.msg) h += '<p class="fine" role="status">' + esc(KY.msg) + "</p>";
  if (KY.err) h += '<p class="fine neg">' + esc(KY.err) + "</p>";
  else if (!KY.info) h += '<p class="fine">' + esc(tr("ky_loading")) + "</p>";
  else {
    const K = KY.info.keys, n = K.filter(k => k.set).length, S = KY.info.services || [];
    h += '<p><b>' + esc(tr("ky_list_h")) + "</b> · " + esc(kyT("ky_of", { n, t: K.length })) + ' <button type="button" class="link" data-ky="testall">' + esc(tr("ky_testall")) + "</button></p>";
    const groups = [];
    S.forEach(v => { if (groups.indexOf(v.group) < 0) groups.push(v.group); });
    h += groups.map(g => '<p class="fine"><b>' + esc(g) + '</b></p><ul class="kylist">' + S.filter(v => v.group === g).map(kySvcHtml).join("") + "</ul>").join("");
    h += '<p class="fine">' + esc(tr("ky_how")) + "</p>";
  }
  return h + "</section>";
}
function kyRender() {
  const old = $("kyBox");
  if (old) { old.outerHTML = kyHtml(); return; }
  const body = $("opBody"); if (!body || !body.innerHTML) return;
  body.insertAdjacentHTML("afterbegin", kyHtml());
}
const kyRO0 = renderOp;
renderOp = function () {
  kyRO0.apply(this, arguments);
  try { if (!KY.info && !KY.loading && !KY.err) kyLoad(); kyRender(); } catch (e) { console.error("keys", e); }
};
async function kySet(f, a) {
  if (!confirm(kyT("ky_ask", { f: tr(f === "dx" ? "ky_dx" : "ky_chat"), a: tr(KY_NAME[a]) }))) return;
  KY.busy = "set"; KY.msg = ""; kyRender();
  try {
    const cur = await sb.from("plan_settings").select("data").eq("id", 1).maybeSingle();
    if (cur.error) throw cur.error;
    const data = Object.assign({}, (cur.data && cur.data.data) || {});
    data.ai = Object.assign({}, data.ai || {}, { [f]: a });
    const r = await sb.from("plan_settings").update({ data }).eq("id", 1).select().single();
    if (r.error) throw r.error;
    KY.ai = data.ai; KY.msg = tr("ky_saved");
  } catch (e) { KY.msg = kyT("ky_err", { m: String(e.message || e) }); }
  KY.busy = ""; kyRender();
}
async function kyTest(w) {
  KY.test[w] = "busy"; kyRender();
  try {
    const r = await fetch("/api/social?fn=keys", { method: "POST", headers: { "Content-Type": "application/json", Authorization: "Bearer " + await opTok() }, body: JSON.stringify({ test: w }) });
    KY.test[w] = await r.json().catch(() => ({ ok: false, message: "HTTP " + r.status }));
  } catch (e) { KY.test[w] = { ok: false, message: String(e.message || e) }; }
  kyRender();
}
document.addEventListener("click", e => {
  const b = e.target.closest && e.target.closest("[data-ky]"); if (!b) return;
  const a = b.dataset.ky;
  if (a === "set" && !KY.busy) return kySet(b.dataset.f, b.dataset.a);
  if (a === "test") return kyTest(b.dataset.w);
  if (a === "testall") { ((KY.info && KY.info.services) || []).filter(v => v.test && v.keys.some(k => k.set)).forEach(v => kyTest(v.id)); }
});
(function () {
  const st = document.createElement("style");
  st.textContent = ".kybox{border:1px solid var(--line,#ddd);border-radius:12px;padding:12px 14px;margin:0 0 16px}.kyrow{margin:8px 0}.kyrow .avchips{display:flex;flex-wrap:wrap;gap:6px;margin-top:4px}" +
    ".kylist{list-style:none;margin:4px 0 8px;padding:0;display:grid;gap:3px}.kylist code{font-size:.8rem}.kysvc{padding:6px 0;border-bottom:1px solid var(--line,#eee)}.kysvc .btn-s{padding:2px 10px;min-height:30px}";
  document.head.appendChild(st);
})();
try { renderOp(); } catch (e) {}
