/* Seb Saathi: "Feedback" button on every page.
   A small button sits at the bottom corner; it opens a form (problem / suggestion / other + message).
   Messages are saved to the Supabase table public.feedback (see supabase/feedback.sql) and read on the Admin tab.
   Each page calls ADFeedback.init({getSb, getLang, getUser, getPage}). */
(function () {
  const TXT = {
    en: {
      btn: "Feedback", h: "Feedback or a problem?",
      p: "Tell us what went wrong or what would make Seb Saathi better. We read every message.",
      kind: "What is it about?", k_problem: "Something is not working", k_idea: "A suggestion", k_other: "Something else",
      msg: "Your message", msg_ph: "For example: the Save button did nothing on the Dashboard.",
      contact: "Email or mobile number, if you want a reply (optional)",
      send: "Send", cancel: "Close", sending: "Sending…",
      ok: "Thank you! Your message has reached us.",
      e_empty: "Please write a few words first.", e_long: "Please keep it under 2,000 characters.",
      e_net: "Could not send. Check your internet and try again.", e_fail: "Could not send: {m}",
      page: "Sent from: {p}"
    },
    hi: {
      btn: "सुझाव", h: "सुझाव या कोई दिक़्क़त?",
      p: "बताइए क्या ठीक नहीं चला, या सेब साथी को और अच्छा कैसे बनाएँ। हम हर संदेश पढ़ते हैं।",
      kind: "किस बारे में है?", k_problem: "कुछ काम नहीं कर रहा", k_idea: "एक सुझाव", k_other: "कुछ और",
      msg: "आपका संदेश", msg_ph: "जैसे: डैशबोर्ड पर सहेजें बटन दबाने पर कुछ नहीं हुआ।",
      contact: "जवाब चाहिए तो ईमेल या मोबाइल नंबर (ज़रूरी नहीं)",
      send: "भेजें", cancel: "बंद करें", sending: "भेज रहे हैं…",
      ok: "धन्यवाद! आपका संदेश हमें मिल गया।",
      e_empty: "पहले कुछ शब्द लिखें।", e_long: "कृपया 2,000 अक्षरों से कम रखें।",
      e_net: "भेजा नहीं जा सका। इंटरनेट जाँचें और दोबारा कोशिश करें।", e_fail: "भेजा नहीं जा सका: {m}",
      page: "यहाँ से भेजा: {p}"
    }
  };
  const CSS = `
.fbbtn{position:fixed;right:max(14px,env(safe-area-inset-right,0px));bottom:calc(14px + env(safe-area-inset-bottom,0px));z-index:20;display:inline-flex;align-items:center;gap:7px;
  font:600 .92rem var(--body,system-ui);padding:9px 14px;min-height:42px;border-radius:999px;border:1px solid var(--line,#ccc);background:var(--surface,#fff);color:var(--fg,#111);
  box-shadow:0 6px 18px -8px rgba(0,0,0,.35);cursor:pointer}
.fbbtn:hover{border-color:var(--brand,#1F4D34)}
.fbbtn svg{flex:none}
.fbdlg{border:0;border-radius:14px;padding:20px;width:min(460px,calc(100vw - 32px));background:var(--surface,#fff);color:var(--fg,#111);box-shadow:0 12px 40px rgba(0,0,0,.25)}
.fbdlg::backdrop{background:rgba(0,0,0,.4)}
.fbdlg h3{font-family:var(--display,inherit);font-size:1.3rem;margin:0}
.fbdlg p{margin:6px 0 0;color:var(--muted,#555)}
.fbdlg form{display:grid;gap:12px;margin-top:14px}
.fbdlg label{display:block;font-size:.92rem;color:var(--muted,#555);margin-bottom:5px}
.fbdlg select,.fbdlg textarea,.fbdlg input{width:100%;box-sizing:border-box;min-height:46px;padding:9px 12px;border:1px solid var(--line,#ccc);border-radius:8px;background:var(--surface,#fff);color:var(--fg,#111);font:500 1rem var(--body,system-ui)}
.fbdlg textarea{min-height:120px;resize:vertical;line-height:1.45}
.fbdlg .fbrow{display:flex;gap:10px;flex-wrap:wrap;margin-top:2px}
.fbdlg .fberr{color:var(--bad,#B3261E);min-height:1.2em;margin:0;font-size:.95rem}
.fbdlg .fbok{color:var(--good,#16723F);font-weight:600;margin:12px 0 0}
.fbdlg .fbpage{font-size:.82rem;margin:0}
body{padding-bottom:calc(64px + env(safe-area-inset-bottom,0px))}
@media print{.fbbtn{display:none}}`;
  let opts = null, dlg = null, busy = false;
  const L = () => { const l = opts && opts.getLang ? opts.getLang() : "en"; return TXT[l] ? l : "en"; };
  const t = k => TXT[L()][k] || TXT.en[k];
  const q = id => document.getElementById(id);

  function build() {
    const st = document.createElement("style"); st.textContent = CSS; document.head.appendChild(st);
    const b = document.createElement("button");
    b.type = "button"; b.className = "fbbtn"; b.id = "fbBtn";
    b.innerHTML = '<svg aria-hidden="true" viewBox="0 0 24 24" width="18" height="18"><path d="M4 5h16v11H8l-4 4z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg><span id="fbBtnT"></span>';
    document.body.appendChild(b);
    dlg = document.createElement("dialog");
    dlg.className = "fbdlg"; dlg.id = "fbDlg"; dlg.setAttribute("aria-labelledby", "fbH");
    dlg.innerHTML =
      '<h3 id="fbH"></h3><p id="fbP"></p>' +
      '<form id="fbForm" novalidate>' +
      '<div><label for="fbKind" id="fbKindL"></label><select id="fbKind"><option value="problem"></option><option value="idea"></option><option value="other"></option></select></div>' +
      '<div><label for="fbMsg" id="fbMsgL"></label><textarea id="fbMsg" maxlength="2000"></textarea></div>' +
      '<div id="fbContactBox"><label for="fbContact" id="fbContactL"></label><input id="fbContact" type="text" autocomplete="email" maxlength="200"></div>' +
      '<p class="fbpage" id="fbPage"></p>' +
      '<p class="fberr" id="fbErr" role="alert"></p>' +
      '<div class="fbrow"><button class="btn-s add" type="submit" id="fbSend"></button><button class="btn-s" type="button" id="fbClose"></button></div>' +
      '<p class="fbok" id="fbOk" role="status" hidden></p>' +
      "</form>";
    document.body.appendChild(dlg);
    b.addEventListener("click", open);
    q("fbClose").addEventListener("click", close);
    dlg.addEventListener("click", e => { if (e.target === dlg) close(); });
    q("fbForm").addEventListener("submit", send);
    render();
  }
  function render() {
    if (!dlg) return;
    q("fbBtnT").textContent = t("btn");
    q("fbH").textContent = t("h"); q("fbP").textContent = t("p");
    q("fbKindL").textContent = t("kind");
    const o = q("fbKind").options; o[0].text = t("k_problem"); o[1].text = t("k_idea"); o[2].text = t("k_other");
    q("fbMsgL").textContent = t("msg"); q("fbMsg").placeholder = t("msg_ph");
    q("fbContactL").textContent = t("contact");
    q("fbSend").textContent = busy ? t("sending") : t("send"); q("fbClose").textContent = t("cancel");
    q("fbPage").textContent = t("page").replace("{p}", pageName());
    if (!q("fbOk").hidden) q("fbOk").textContent = t("ok");
  }
  function pageName() { try { return String(opts.getPage ? opts.getPage() : location.pathname).slice(0, 60); } catch (e) { return location.pathname; } }
  function open() {
    const u = opts.getUser ? opts.getUser() : null;
    q("fbContactBox").hidden = !!u;
    q("fbErr").textContent = ""; q("fbOk").hidden = true; q("fbForm").querySelectorAll("select,textarea,input,#fbSend").forEach(x => { x.disabled = false; });
    render();
    if (dlg.showModal) dlg.showModal(); else dlg.setAttribute("open", "");
    setTimeout(() => { try { q("fbMsg").focus(); } catch (e) {} }, 50);
  }
  function close() { if (dlg.close) dlg.close(); else dlg.removeAttribute("open"); }
  async function send(e) {
    e.preventDefault();
    if (busy) return;
    const msg = q("fbMsg").value.trim();
    q("fbErr").textContent = "";
    if (!msg) { q("fbErr").textContent = t("e_empty"); return; }
    if (msg.length > 2000) { q("fbErr").textContent = t("e_long"); return; }
    const sb = opts.getSb ? opts.getSb() : null;
    if (!sb) { q("fbErr").textContent = t("e_net"); return; }
    const u = opts.getUser ? opts.getUser() : null;
    const contact = u ? (u.email || u.phone || "") : q("fbContact").value.trim();
    const row = {
      kind: q("fbKind").value, message: msg, page: pageName(), lang: L(),
      contact: String(contact || "").slice(0, 200) || null,
      agent: String(navigator.userAgent || "").slice(0, 300)
    };
    if (u && u.id) row.user_id = u.id;
    busy = true; render(); q("fbSend").disabled = true;
    let err = null;
    try { const res = await sb.from("feedback").insert(row); err = res.error; } catch (x) { err = x; }
    busy = false; q("fbSend").disabled = false; render();
    if (err) {
      const m = String((err && err.message) || err || "");
      q("fbErr").textContent = /fetch|network|failed to|load/i.test(m) ? t("e_net") : t("e_fail").replace("{m}", m);
      return;
    }
    q("fbMsg").value = ""; q("fbContact").value = "";
    q("fbOk").hidden = false; q("fbOk").textContent = t("ok");
    q("fbForm").querySelectorAll("select,textarea,input,#fbSend").forEach(x => { x.disabled = true; });
    setTimeout(() => { if (dlg.open) close(); }, 2500);
  }
  window.ADFeedback = {
    init(o) { opts = o || {}; if (document.body) build(); else document.addEventListener("DOMContentLoaded", build); },
    render,
    open: () => { if (dlg) open(); }
  };
})();
