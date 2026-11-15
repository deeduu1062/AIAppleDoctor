/* Seb Saathi admin — "Broadcast" tab: send a message to growers.
   1. On the website: a banner at the top of the site for the growers you pick (table public.announcements; shown by ann.js)
   2. On WhatsApp: the list of those growers' numbers, each with a ready message (tap to send from your WhatsApp)
   3. On Facebook: hands the message to the Social handler to make a post
   Who: everyone / signed-in growers / Free / paid, and optionally only near a place or with a village name. Needs supabase/brief_broadcast.sql. */
Object.assign(T.en, {
  adm_t_bc: "Broadcast", bc_h: "Send a message to growers", bc_p: "Write once, then show it on the website, send it on WhatsApp, or post it on Facebook. Pick who should get it.",
  bc_err_setup: "Not set up yet. Run supabase/brief_broadcast.sql once in the Supabase SQL Editor, then tap Refresh.", bc_err: "Could not do it: {m}",
  bc_kind: "Type", bc_k_alert: "⚠️ Alert", bc_k_info: "ℹ️ News", bc_k_offer: "🎁 Offer",
  bc_msg: "Message", bc_lang_hn: "Hinglish", bc_lang_hi: "हिंदी", bc_lang_en: "English", bc_title: "Heading (short)", bc_body: "Message", bc_more_lang: "Add Hindi and English versions (optional)",
  bc_lang_note: "Growers see their own language; if a version is empty they see the Hinglish one.",
  bc_btn: "Button", bc_b_none: "No button", bc_b_diag: "Check a disease", bc_b_chat: "Ask Saathi", bc_b_plans: "See plans", bc_b_link: "A link",
  bc_link_ph: "https://…", bc_who: "Who gets it", bc_w_all: "Everyone who opens the site", bc_w_growers: "Signed-in growers", bc_w_free: "Free growers", bc_w_paid: "Paid growers",
  bc_where: "Where", bc_where_any: "Anywhere", bc_where_near: "Near a place", bc_where_word: "Village name has", bc_km: "within {k} km", bc_word_ph: "e.g. Rohru",
  bc_days: "Show on the website for", bc_d: "{n} days",
  bc_reach: "WhatsApp: {w} growers with a mobile number · Website: shown to everyone who matches when they open the site",
  bc_reach_near: "Only growers whose orchard location or village matches can be picked for a place. {n} growers have no orchard location yet.",
  bc_send_site: "📢 Show on the website", bc_send_wa: "💬 WhatsApp list ({n})", bc_send_fb: "📘 Make a Facebook post", bc_need: "Write a heading or a message first.",
  bc_site_ok: "✓ Live on the website for {n} days.", bc_site_ask: "Show this message on the website now?",
  bc_wa_h: "Send on WhatsApp", bc_wa_p: "Tap Send for each grower: WhatsApp opens with the message ready, you tap send. Ticks are kept on this device. (Tip: for many growers at once, copy all numbers into a WhatsApp Broadcast List — they must have your number saved.)",
  bc_wa_copy_n: "Copy all numbers", bc_wa_copy_m: "Copy message", bc_wa_send: "Send", bc_wa_sent: "Sent ✓", bc_wa_none: "No growers with a mobile number match.", bc_wa_done: "{d} of {n} sent", bc_copied: "Copied",
  bc_list_h: "Messages on the website", bc_none: "No messages yet.", bc_live: "Live", bc_ended: "Ended", bc_stopped: "Stopped", bc_until: "until {d}",
  bc_seen: "{v} views · {c} taps", bc_stop: "Stop", bc_del: "Delete", bc_del_q: "Delete this message?", bc_again: "Use again",
  bc_from_rise: "Filled in from Today's disease alert. Check the words, then send.",
  bc_fb_ask: "Make a short Facebook post for apple growers from this message (keep the meaning, no chemical names or doses): {m}"
});
Object.assign(T.hi, {
  adm_t_bc: "संदेश भेजें", bc_h: "बाग़वानों को संदेश भेजें", bc_p: "एक बार लिखें, फिर वेबसाइट पर दिखाएँ, WhatsApp पर भेजें या Facebook पर पोस्ट करें। चुनें किसे मिले।",
  bc_err_setup: "अभी सेट नहीं है। Supabase SQL Editor में supabase/brief_broadcast.sql एक बार चलाएँ।", bc_err: "नहीं हो सका: {m}",
  bc_kind: "प्रकार", bc_k_alert: "⚠️ चेतावनी", bc_k_info: "ℹ️ ख़बर", bc_k_offer: "🎁 ऑफ़र", bc_msg: "संदेश", bc_title: "शीर्षक (छोटा)", bc_body: "संदेश",
  bc_more_lang: "हिंदी और अंग्रेज़ी रूप जोड़ें (चाहें तो)", bc_lang_note: "बाग़वान अपनी भाषा देखेंगे; ख़ाली हो तो Hinglish वाला।",
  bc_btn: "बटन", bc_b_none: "बटन नहीं", bc_b_diag: "बीमारी जाँचें", bc_b_chat: "साथी से पूछें", bc_b_plans: "प्लान देखें", bc_b_link: "लिंक",
  bc_who: "किसे मिले", bc_w_all: "साइट खोलने वाले सभी", bc_w_growers: "साइन-इन बाग़वान", bc_w_free: "मुफ़्त बाग़वान", bc_w_paid: "पैसे देने वाले बाग़वान",
  bc_where: "कहाँ", bc_where_any: "कहीं भी", bc_where_near: "किसी जगह के पास", bc_where_word: "गाँव के नाम में", bc_km: "{k} किमी के अंदर",
  bc_days: "वेबसाइट पर कितने दिन", bc_d: "{n} दिन",
  bc_reach: "WhatsApp: मोबाइल नंबर वाले {w} बाग़वान · वेबसाइट: मेल खाने वाले सभी को साइट खोलने पर",
  bc_send_site: "📢 वेबसाइट पर दिखाएँ", bc_send_wa: "💬 WhatsApp सूची ({n})", bc_send_fb: "📘 Facebook पोस्ट बनाएँ", bc_need: "पहले शीर्षक या संदेश लिखें।",
  bc_site_ok: "✓ वेबसाइट पर {n} दिन के लिए चालू।", bc_site_ask: "यह संदेश अभी वेबसाइट पर दिखाएँ?",
  bc_wa_h: "WhatsApp पर भेजें", bc_wa_copy_n: "सभी नंबर कॉपी करें", bc_wa_copy_m: "संदेश कॉपी करें", bc_wa_send: "भेजें", bc_wa_sent: "भेजा ✓", bc_wa_none: "मोबाइल नंबर वाला कोई बाग़वान मेल नहीं खाता।", bc_wa_done: "{n} में से {d} भेजे", bc_copied: "कॉपी हुआ",
  bc_list_h: "वेबसाइट पर संदेश", bc_none: "अभी कोई संदेश नहीं।", bc_live: "चालू", bc_ended: "ख़त्म", bc_stopped: "रोका", bc_until: "{d} तक", bc_seen: "{v} बार देखा · {c} टैप",
  bc_stop: "रोकें", bc_del: "हटाएँ", bc_del_q: "यह संदेश हटाएँ?", bc_again: "फिर से इस्तेमाल करें", bc_from_rise: "आज की बीमारी चेतावनी से भरा गया। शब्द जाँचें, फिर भेजें।"
});

const BC_PLACES = [["Rohru", 31.204, 77.754], ["Chirgaon", 31.230, 77.833], ["Jubbal", 31.110, 77.651], ["Kotkhai", 31.117, 77.533], ["Theog", 31.120, 77.356], ["Narkanda", 31.258, 77.460],
  ["Shimla", 31.104, 77.173], ["Kullu", 31.958, 77.109], ["Kinnaur", 31.539, 78.272], ["Mandi (HP)", 31.708, 76.932], ["Chamba", 32.556, 76.126],
  ["Shopian", 33.716, 74.834], ["Sopore", 34.300, 74.470], ["Baramulla", 34.198, 74.364], ["Kulgam", 33.645, 75.019], ["Pulwama", 33.874, 74.899],
  ["Uttarkashi (Harsil)", 31.036, 78.742], ["Nainital (Ramgarh)", 29.434, 79.559], ["Almora", 29.597, 79.659]];
const BC = { f: null, list: null, growth: null, places: null, busy: false, msg: "", err: "", wa: false, waLang: "hn", from: "" };
const bcBlank = () => ({ kind: "info", title: { hn: "", hi: "", en: "" }, body: { hn: "", hi: "", en: "" }, more: false, btn: "none", link: "", who: "all", where: "any", place: "Rohru", km: 30, word: "", days: 7 });
BC.f = bcBlank();
let bcSent = {}; try { bcSent = JSON.parse(localStorage.getItem("bc-sent") || "{}"); } catch (e) {}

async function loadBc() {
  if (!$("bcBody") || !isAdmin() || !sb || BC.busy) return;
  BC.busy = true; BC.err = ""; set("bcAt", tr("ad_loading")); $("bcRefresh").disabled = true;
  const miss = e => /does not exist|schema cache|could not find|42P01|PGRST202/i.test(String((e && e.message) || e) + String((e && e.code) || ""));
  try { const r = await sb.from("announcements").select("*").order("created_at", { ascending: false }).limit(100); if (r.error) throw r.error; BC.list = r.data || []; }
  catch (e) { BC.list = null; BC.err = miss(e) ? tr("bc_err_setup") : tr("bc_err").replace("{m}", String(e.message || e)); }
  try { const r = await sb.rpc("admin_growth"); if (!r.error) BC.growth = (r.data || []).filter(u => ADMIN_EMAILS.indexOf(String(u.email || "").toLowerCase()) < 0); } catch (e) {}
  try { const r = await sb.rpc("admin_grower_places"); if (!r.error) { BC.places = {}; (r.data || []).forEach(x => { BC.places[x.id] = x.places || []; }); } } catch (e) {}
  BC.busy = false; $("bcRefresh").disabled = false; set("bcAt", tr("ov_at").replace("{t}", adWhen(new Date().toISOString())));
  renderBc();
}

/* who matches */
const bcKm = (a, b, c, d) => { const r = Math.PI / 180, x = Math.sin((c - a) * r / 2) ** 2 + Math.cos(a * r) * Math.cos(c * r) * Math.sin((d - b) * r / 2) ** 2; return 12742 * Math.asin(Math.sqrt(x)); };
function bcAudience() {
  const f = BC.f, a = { who: f.who };
  if (f.where === "near") { const p = BC_PLACES.find(x => x[0] === f.place) || BC_PLACES[0]; a.near = { name: p[0], lat: p[1], lon: p[2], km: +f.km }; }
  if (f.where === "word" && f.word.trim()) a.words = f.word.trim().toLowerCase();
  return a;
}
function bcMatch(u, a) {
  const today = new Date().toISOString().slice(0, 10), paid = !!(u.paid_until && u.paid_until >= today);
  if (a.who === "free" && paid) return false;
  if (a.who === "paid" && !paid) return false;
  if (!a.near && !a.words) return true;
  const P = (BC.places && BC.places[u.id]) || [];
  return P.some(p => (a.near && p.lat != null && p.lon != null && p.lat !== "" && bcKm(+p.lat, +p.lon, a.near.lat, a.near.lon) <= a.near.km) ||
    (a.words && String(p.v || "").toLowerCase().indexOf(a.words) >= 0));
}
const bcPhone = u => { const p = String(u.phone || "").replace(/\D/g, ""); if (p) return p; const m = /^\+?(\d{10,13})@m\.sebsaathi\.com$/i.exec(String(u.email || "")); return m ? m[1] : ""; };
function bcPeople() { const a = bcAudience(); return (BC.growth || []).filter(u => u.confirmed && bcMatch(u, a)); }
function bcText(lg) {
  const f = BC.f, t = f.title[lg] || f.title.hn || f.title.hi || f.title.en, b = f.body[lg] || f.body.hn || f.body.hi || f.body.en;
  const link = f.btn === "link" && f.link ? f.link : "https://sebsaathi.com" + (f.btn === "diag" ? "/?go=diag" : f.btn === "plans" ? "/#plans" : "") ;
  return (f.kind === "alert" ? "⚠️ " : f.kind === "offer" ? "🎁 " : "🍎 ") + (t ? "*" + t + "*\n" : "") + (b ? b + "\n\n" : "\n") + "👉 " + link + "\n— Seb Saathi";
}

/* ---------- drawing ---------- */
function bcChip(k, v, label) { return '<button type="button" class="btn-s sm avchip" data-bcf="' + k + '" data-v="' + esc(v) + '" aria-pressed="' + (String(BC.f[k]) === String(v)) + '">' + esc(label) + "</button>"; }
function renderBc() {
  if (!$("bcBody")) return;
  const f = BC.f, people = BC.growth ? bcPeople() : [], wa = people.filter(bcPhone), noLoc = BC.growth && BC.places ? BC.growth.filter(u => u.confirmed && !(BC.places[u.id] || []).some(p => p.lat || p.v)).length : 0;
  const L = (lg, lab) => '<div class="bclang"><b>' + esc(lab) + '</b><input class="avin" data-bct="' + lg + '" maxlength="80" placeholder="' + esc(tr("bc_title")) + '" value="' + esc(f.title[lg]) + '">' +
    '<textarea class="avin" data-bcb="' + lg + '" rows="3" maxlength="500" placeholder="' + esc(tr("bc_body")) + '">' + esc(f.body[lg]) + "</textarea></div>";
  let h = (BC.err ? '<p class="autherr">' + esc(BC.err) + "</p>" : "") + (BC.from ? '<p class="aqalert">' + esc(BC.from) + "</p>" : "") +
    '<div class="avbox"><fieldset class="avgrp"><legend>' + esc(tr("bc_kind")) + '</legend><div class="avchips">' + ["alert", "info", "offer"].map(k => bcChip("kind", k, tr("bc_k_" + k))).join("") + "</div></fieldset>" +
    '<fieldset class="avgrp"><legend>' + esc(tr("bc_msg")) + "</legend>" + L("hn", tr("bc_lang_hn")) +
      '<p><button type="button" class="btn-s sm" data-bcmore="1" aria-expanded="' + f.more + '">' + esc(tr("bc_more_lang")) + "</button></p>" +
      (f.more ? L("hi", tr("bc_lang_hi")) + L("en", tr("bc_lang_en")) + '<p class="fine">' + esc(tr("bc_lang_note")) + "</p>" : "") + "</fieldset>" +
    '<fieldset class="avgrp"><legend>' + esc(tr("bc_btn")) + '</legend><div class="avchips">' + ["none", "diag", "chat", "plans", "link"].map(k => bcChip("btn", k, tr("bc_b_" + k))).join("") + "</div>" +
      (f.btn === "link" ? '<input class="avin" id="bcLink" maxlength="300" placeholder="' + esc(tr("bc_link_ph")) + '" value="' + esc(f.link) + '">' : "") + "</fieldset>" +
    '<fieldset class="avgrp"><legend>' + esc(tr("bc_who")) + '</legend><div class="avchips">' + ["all", "growers", "free", "paid"].map(k => bcChip("who", k, tr("bc_w_" + k))).join("") + "</div></fieldset>" +
    '<fieldset class="avgrp"><legend>' + esc(tr("bc_where")) + '</legend><div class="avchips">' + ["any", "near", "word"].map(k => bcChip("where", k, tr("bc_where_" + k))).join("") + "</div>" +
      (f.where === "near" ? '<div class="bcrow"><select class="avin" id="bcPlace">' + BC_PLACES.map(p => '<option' + (p[0] === f.place ? " selected" : "") + ">" + esc(p[0]) + "</option>").join("") + "</select>" +
        '<select class="avin" id="bcKmSel">' + [10, 20, 30, 50, 80].map(k => '<option value="' + k + '"' + (+f.km === k ? " selected" : "") + ">" + esc(tr("bc_km").replace("{k}", k)) + "</option>").join("") + "</select></div>" : "") +
      (f.where === "word" ? '<input class="avin" id="bcWord" maxlength="40" placeholder="' + esc(tr("bc_word_ph")) + '" value="' + esc(f.word) + '">' : "") +
      (f.where !== "any" && noLoc ? '<p class="fine">' + esc(tr("bc_reach_near").replace("{n}", noLoc)) + "</p>" : "") + "</fieldset>" +
    '<fieldset class="avgrp"><legend>' + esc(tr("bc_days")) + '</legend><div class="avchips">' + [1, 3, 7, 14, 30].map(n => bcChip("days", n, tr("bc_d").replace("{n}", n))).join("") + "</div></fieldset>" +
    (BC.growth ? '<p class="fine">' + esc(tr("bc_reach").replace("{w}", fmtN(wa.length))) + "</p>" : "") +
    '<div class="bcsend"><button type="button" class="btn-s add" id="bcSite">' + esc(tr("bc_send_site")) + '</button><button type="button" class="btn-s add" id="bcWa">' + esc(tr("bc_send_wa").replace("{n}", fmtN(wa.length))) + "</button>" +
      '<button type="button" class="btn-s" id="bcFb">' + esc(tr("bc_send_fb")) + "</button></div>" +
    (BC.msg ? '<p class="fine" role="status">' + esc(BC.msg) + "</p>" : "") + "</div>";
  if (BC.wa) h += bcWaHtml(wa);
  h += bcListHtml();
  const keep = document.activeElement && $("bcBody").contains(document.activeElement) ? [document.activeElement.getAttribute("data-bct") || "", document.activeElement.getAttribute("data-bcb") || "", document.activeElement.id] : null;
  $("bcBody").innerHTML = h;
  if (keep) { const el = keep[0] ? document.querySelector('[data-bct="' + keep[0] + '"]') : keep[1] ? document.querySelector('[data-bcb="' + keep[1] + '"]') : keep[2] ? $(keep[2]) : null; if (el) { el.focus(); if (el.setSelectionRange && el.value != null) el.setSelectionRange(el.value.length, el.value.length); } }
}
function bcWaHtml(wa) {
  const txt = bcText(BC.waLang), done = wa.filter(u => bcSent[bcKey() + "|" + u.id]).length;
  return '<div class="avbox" id="bcWaBox"><h5>' + esc(tr("bc_wa_h")) + '</h5><p class="fine">' + esc(tr("bc_wa_p")) + "</p>" +
    '<div class="avchips">' + ["hn", "hi", "en"].map(l => '<button type="button" class="btn-s sm avchip" data-bcwl="' + l + '" aria-pressed="' + (BC.waLang === l) + '">' + esc(tr("bc_lang_" + l)) + "</button>").join("") + "</div>" +
    '<pre class="bcpre">' + esc(txt) + "</pre>" +
    '<p><button type="button" class="btn-s sm" id="bcCopyM">' + esc(tr("bc_wa_copy_m")) + '</button> <button type="button" class="btn-s sm" id="bcCopyN">' + esc(tr("bc_wa_copy_n")) + '</button> <span class="fine">' + esc(tr("bc_wa_done").replace("{d}", done).replace("{n}", wa.length)) + "</span></p>" +
    (!wa.length ? '<p class="empty">' + esc(tr("bc_wa_none")) + "</p>" : '<ul class="bcwa">' + wa.map(u => {
      const p = bcPhone(u), full = p.length === 10 ? "91" + p : p, sent = bcSent[bcKey() + "|" + u.id];
      return '<li class="' + (sent ? "sent" : "") + '"><span>+' + esc(full) + (u.email && !/@m\.sebsaathi/.test(u.email) ? ' <small class="fine">' + esc(u.email) + "</small>" : "") + "</span>" +
        '<a class="btn-s sm' + (sent ? "" : " add") + '" target="_blank" rel="noopener" data-bcsend="' + esc(u.id) + '" href="https://wa.me/' + esc(full) + "?text=" + encodeURIComponent(txt) + '">' + esc(tr(sent ? "bc_wa_sent" : "bc_wa_send")) + "</a></li>";
    }).join("") + "</ul>") + "</div>";
}
const bcKey = () => { const f = BC.f; let s = f.kind + (f.title.hn || f.title.hi || f.title.en) + (f.body.hn || f.body.hi || f.body.en), h = 0; for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0; return String(h); };
function bcListHtml() {
  if (!BC.list) return "";
  const now = Date.now();
  return '<h5 class="ovsub">' + esc(tr("bc_list_h")) + "</h5>" + (!BC.list.length ? '<p class="fine">' + esc(tr("bc_none")) + "</p>" :
    '<div class="rvlist bclist">' + BC.list.map(a => {
      const live = a.active && +new Date(a.starts_at) <= now && (!a.ends_at || +new Date(a.ends_at) > now);
      const st = !a.active ? "bc_stopped" : live ? "bc_live" : "bc_ended";
      const t = a.title || {}, b = a.body || {};
      return '<article class="rv bcitem bc-' + esc(a.kind) + '"><span class="meta">' + adWhen(a.created_at) + ' · <span class="optag' + (live ? " ok" : "") + '">' + esc(tr(st)) + "</span>" +
        (a.ends_at && live ? " " + esc(tr("bc_until").replace("{d}", paDay(String(a.ends_at).slice(0, 10)))) : "") + " · " + esc(tr("bc_seen").replace("{v}", fmtN(a.views || 0)).replace("{c}", fmtN(a.clicks || 0))) + "</span>" +
        '<div class="q">' + esc(t.hn || t.hi || t.en || "") + '</div><div class="note">' + esc(b.hn || b.hi || b.en || "") + "</div>" +
        '<div class="bcsend">' + (live ? '<button type="button" class="btn-s sm" data-bcstop="' + esc(a.id) + '">' + esc(tr("bc_stop")) + "</button>" : "") +
        '<button type="button" class="btn-s sm" data-bcagain="' + esc(a.id) + '">' + esc(tr("bc_again")) + '</button><button type="button" class="btn-s sm" data-bcdel="' + esc(a.id) + '">' + esc(tr("bc_del")) + "</button></div></article>";
    }).join("") + "</div>");
}

/* ---------- actions ---------- */
const bcHas = () => ["hn", "hi", "en"].some(l => (BC.f.title[l] || "").trim() || (BC.f.body[l] || "").trim());
const BC_BTN = { diag: { link: "lgo:diag", label: { hn: "Bimari jaanchein", hi: "बीमारी जाँचें", en: "Check a disease" } }, chat: { link: "lgo:chat", label: { hn: "Saathi se poochhein", hi: "साथी से पूछें", en: "Ask Saathi" } },
  plans: { link: "#plans", label: { hn: "Plan dekhein", hi: "प्लान देखें", en: "See plans" } }, link: { link: "", label: { hn: "Kholein", hi: "खोलें", en: "Open" } } };
async function bcSite() {
  if (!bcHas()) { BC.msg = tr("bc_need"); renderBc(); return; }
  if (!confirm(tr("bc_site_ask"))) return;
  const f = BC.f, clean = o => ({ hn: o.hn.trim(), hi: o.hi.trim(), en: o.en.trim() });
  const B = BC_BTN[f.btn];
  const row = { kind: f.kind, title: clean(f.title), body: clean(f.body), audience: bcAudience(), starts_at: new Date().toISOString(), ends_at: new Date(Date.now() + f.days * 864e5).toISOString(), active: true,
    link: B ? (f.btn === "link" ? (f.link.trim() || null) : B.link) : null, link_label: B ? B.label : {}, created_by: user && user.email };
  $("bcSite").disabled = true;
  const r = await sb.from("announcements").insert(row).select().single();
  if (r.error) { BC.msg = tr("bc_err").replace("{m}", r.error.message || ""); $("bcSite").disabled = false; renderBc(); return; }
  BC.list = [r.data].concat(BC.list || []); BC.msg = tr("bc_site_ok").replace("{n}", f.days); BC.from = ""; renderBc();
}
async function bcCopy(txt, btn) {
  try { await navigator.clipboard.writeText(txt); } catch (e) { const t = document.createElement("textarea"); t.value = txt; document.body.appendChild(t); t.select(); document.execCommand("copy"); t.remove(); }
  if (btn) { const o = btn.textContent; btn.textContent = tr("bc_copied"); setTimeout(() => { btn.textContent = o; }, 1500); }
}
/* from Today: a rising disease → an alert for growers near that area */
function bcFromRise(x) {
  const names = typeof aqNames === "function" && typeof AQ !== "undefined" && AQ ? aqNames() : {}, dz = names[x.dz] || String(x.dz || "").replace(/_/g, " "), dzc = dz.charAt(0).toUpperCase() + dz.slice(1);
  const area = String(x.area || ""), place = BC_PLACES.find(p => area.toLowerCase().indexOf(p[0].toLowerCase().split(" ")[0]) >= 0);
  BC.f = Object.assign(bcBlank(), {
    kind: "alert", btn: "diag", who: "all", days: 7, more: true,
    title: { hn: dzc + " ka khatra — " + area, hi: area + " में " + dzc + " का ख़तरा", en: dzc + " risk around " + area },
    body: { hn: "Pichhle hafte " + area + " ke aas-paas " + dzc + " ki kai report aayi hain. Aaj hi apne bagiche ke patte aur phal dhyaan se dekhein. Shak ho to Seb Saathi par photo se free jaanch karein, aur spray apne state ke schedule ke hisaab se hi karein.",
      hi: "पिछले हफ़्ते " + area + " के आस-पास " + dzc + " की कई रिपोर्ट आई हैं। आज ही अपने बाग़ के पत्ते और फल ध्यान से देखें। शक हो तो सेब साथी पर फ़ोटो से मुफ़्त जाँच करें, और स्प्रे अपने राज्य के शेड्यूल के हिसाब से ही करें।",
      en: "Last week several growers around " + area + " found " + dz + ". Check your leaves and fruit today. If in doubt, check a photo free on Seb Saathi, and spray only as per your state's schedule." },
    where: place ? "near" : area && !/^\d/.test(area) ? "word" : "any", place: place ? place[0] : "Rohru", km: 30, word: place ? "" : area
  });
  BC.from = tr("bc_from_rise"); BC.wa = false;
  if (typeof showTab === "function") showTab("bc");
  renderBc();
  const b = $("bcBody"); if (b) b.scrollIntoView({ block: "start" });
}
document.addEventListener("click", async e => {
  const t = e.target.closest && e.target.closest("#bcBody [data-bcf], #bcBody [data-bcmore], #bcSite, #bcWa, #bcFb, [data-bcwl], #bcCopyM, #bcCopyN, [data-bcsend], [data-bcstop], [data-bcdel], [data-bcagain]");
  if (!t) return;
  if (t.dataset.bcf) { const k = t.dataset.bcf, v = t.dataset.v; BC.f[k] = k === "days" ? +v : v; renderBc(); }
  else if (t.dataset.bcmore) { BC.f.more = !BC.f.more; renderBc(); }
  else if (t.id === "bcSite") bcSite();
  else if (t.id === "bcWa") { if (!bcHas()) { BC.msg = tr("bc_need"); renderBc(); return; } BC.wa = true; BC.msg = ""; renderBc(); const w = $("bcWaBox"); if (w) w.scrollIntoView({ block: "start", behavior: "smooth" }); }
  else if (t.id === "bcFb") {
    if (!bcHas()) { BC.msg = tr("bc_need"); renderBc(); return; }
    const ask = T.en.bc_fb_ask.replace("{m}", bcText("hn").replace(/\*/g, "")).slice(0, 790);
    if (typeof mkAsk !== "undefined") mkAsk.fb = ask;
    if (typeof showTab === "function") showTab("mk"); if (typeof mkGo === "function") mkGo("fb");
    setTimeout(() => { const a = $("mkAsk-fb"); if (a) { a.value = ask; a.scrollIntoView({ behavior: "smooth", block: "center" }); a.focus(); } }, 400);
  }
  else if (t.dataset.bcwl) { BC.waLang = t.dataset.bcwl; renderBc(); }
  else if (t.id === "bcCopyM") bcCopy(bcText(BC.waLang), t);
  else if (t.id === "bcCopyN") bcCopy(bcPeople().map(bcPhone).filter(Boolean).map(p => "+" + (p.length === 10 ? "91" + p : p)).join(", "), t);
  else if (t.dataset.bcsend) { bcSent[bcKey() + "|" + t.dataset.bcsend] = Date.now(); try { localStorage.setItem("bc-sent", JSON.stringify(bcSent)); } catch (x) {} setTimeout(renderBc, 400); }
  else if (t.dataset.bcstop) { const r = await sb.from("announcements").update({ active: false }).eq("id", t.dataset.bcstop); if (r.error) { BC.msg = tr("bc_err").replace("{m}", r.error.message || ""); } else { const a = (BC.list || []).find(x => x.id === t.dataset.bcstop); if (a) a.active = false; } renderBc(); }
  else if (t.dataset.bcdel) { if (!confirm(tr("bc_del_q"))) return; const r = await sb.from("announcements").delete().eq("id", t.dataset.bcdel); if (r.error) BC.msg = tr("bc_err").replace("{m}", r.error.message || ""); else BC.list = (BC.list || []).filter(x => x.id !== t.dataset.bcdel); renderBc(); }
  else if (t.dataset.bcagain) {
    const a = (BC.list || []).find(x => x.id === t.dataset.bcagain); if (!a) return;
    const au = a.audience || {}, btn = Object.keys(BC_BTN).find(k => BC_BTN[k].link && BC_BTN[k].link === a.link) || (a.link ? "link" : "none");
    BC.f = Object.assign(bcBlank(), { kind: a.kind, title: Object.assign({ hn: "", hi: "", en: "" }, a.title), body: Object.assign({ hn: "", hi: "", en: "" }, a.body), more: !!((a.title || {}).hi || (a.title || {}).en),
      btn, link: btn === "link" ? a.link : "", who: au.who || "all", where: au.near ? "near" : au.words ? "word" : "any", place: au.near ? au.near.name : "Rohru", km: au.near ? au.near.km : 30, word: au.words || "" });
    BC.msg = ""; renderBc(); $("bcBody").scrollIntoView({ block: "start", behavior: "smooth" });
  }
});
document.addEventListener("input", e => {
  const t = e.target; if (!t || !t.closest || !t.closest("#bcBody")) return;
  if (t.dataset.bct) BC.f.title[t.dataset.bct] = t.value;
  else if (t.dataset.bcb) BC.f.body[t.dataset.bcb] = t.value;
  else if (t.id === "bcLink") BC.f.link = t.value;
  else if (t.id === "bcWord") { BC.f.word = t.value; clearTimeout(BC.tw); BC.tw = setTimeout(renderBc, 600); }
});
document.addEventListener("change", e => {
  const t = e.target; if (!t) return;
  if (t.id === "bcPlace") { BC.f.place = t.value; renderBc(); } else if (t.id === "bcKmSel") { BC.f.km = +t.value; renderBc(); }
});
if ($("bcRefresh")) $("bcRefresh").addEventListener("click", loadBc);
if (typeof applyLang === "function") applyLang();
if (typeof tab !== "undefined" && tab === "bc" && typeof loaded !== "undefined" && loaded.bc && isAdmin() && !BC.list) loadBc();
