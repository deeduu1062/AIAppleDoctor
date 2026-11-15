/* Seb Saathi admin — "AI quality" tab: disease map (admin only), weak answers, top Saathi questions.
   Reads public.diagnoses and public.chat_messages directly (admins can read all rows). No new SQL needed. */
Object.assign(T.en, {
  adm_t_aq: "AI quality", aq_h: "Disease and AI quality", aq_p: "Where problems are showing up, which answers need a second look, and what growers ask Saathi most.",
  aq_days: "Last {n} days", aq_err: "Could not load: {m}",
  aq_map_h: "Disease map (admin only)", aq_map_p: "Photo checks with a clear answer, grouped by area. Bigger circle = more reports. Growers never see names or exact places.",
  aq_map_none: "No located photo checks in this period yet.", aq_map_load: "Map could not load (no internet to the map service). The table below still works.",
  aq_c_area: "Area", aq_c_dz: "Problem", aq_c_wk: "This week", aq_c_pwk: "Week before", aq_c_tot: "In period", aq_rise: "Rising", aq_new: "New this week",
  aq_alert: "⚠ {n} rising: {l}", aq_noarea: "Place not given",
  aq_wk_h: "Answers to check", aq_wk_p: "Photo checks where the AI was unsure, the grower said the answer was wrong, or the spray did not help. Look at these first; they also make the best training photos.",
  aq_s_checks: "Photo checks", aq_s_low: "AI unsure", aq_s_wrong: "Marked wrong", aq_s_fu: "Follow-ups answered", aq_s_nb: "Spray did not help",
  aq_f_all: "All", aq_f_nb: "Spray did not help", aq_f_wrong: "Marked wrong", aq_f_unsure: "Grower unsure", aq_f_low: "AI unsure", aq_f_photo: "Bad photo",
  aq_fl_nb: "Spray did not help", aq_fl_wrong: "Marked wrong", aq_fl_unsure: "Grower unsure", aq_fl_low: "AI unsure", aq_fl_photo: "Bad photo",
  aq_ai: "AI said", aq_out_same: "Same after spray", aq_out_worse: "Worse after spray", aq_note: "Grower's note", aq_expert: "Your answer",
  aq_open: "Open in Photo checks", aq_none: "Nothing to check here.", aq_more: "Showing {n} of {t}.",
  aq_q_h: "Top Saathi questions", aq_q_p: "What growers asked most in this period, grouped by topic. Each topic is also a good idea for a Facebook post or video.",
  aq_q_n: "{n} questions", aq_q_prev: "{n} the period before", aq_q_post: "Make a post about this", aq_q_none: "No questions in this period yet.",
  aq_q_words: "Other words that came up", aq_q_ask: "Make a short, friendly Facebook post for apple growers answering the question many are asking us about: {t}. Questions growers sent: {q}",
  aq_tp_scab: "Scab", aq_tp_leaf: "Early leaf fall (Marssonina)", aq_tp_spray: "Spray schedule and sprays", aq_tp_food: "Fertiliser and nutrition", aq_tp_prune: "Pruning and training",
  aq_tp_rate: "Rates, mandi and selling", aq_tp_pest: "Pests (mites, borer, aphids)", aq_tp_wx: "Weather, hail and frost", aq_tp_plant: "Varieties, rootstock and planting",
  aq_tp_root: "Root and collar rot", aq_tp_flower: "Flowering and fruit set", aq_tp_water: "Water and irrigation", aq_tp_app: "Using Seb Saathi", aq_tp_other: "Other"
});
Object.assign(T.hi, {
  adm_t_aq: "AI गुणवत्ता", aq_h: "बीमारी और AI गुणवत्ता", aq_p: "कहाँ बीमारियाँ दिख रही हैं, कौन से जवाब दोबारा देखने हैं, और बाग़वान साथी से सबसे ज़्यादा क्या पूछते हैं।",
  aq_days: "पिछले {n} दिन", aq_err: "लोड नहीं हो सका: {m}",
  aq_map_h: "बीमारी का नक्शा (सिर्फ़ एडमिन)", aq_map_p: "साफ़ जवाब वाली फ़ोटो जाँच, इलाक़े के हिसाब से। बड़ा घेरा = ज़्यादा रिपोर्ट। बाग़वानों को नाम या सही जगह कभी नहीं दिखती।",
  aq_map_none: "इस समय में जगह वाली कोई फ़ोटो जाँच नहीं।", aq_map_load: "नक्शा लोड नहीं हुआ। नीचे की टेबल फिर भी काम करती है।",
  aq_c_area: "इलाक़ा", aq_c_dz: "समस्या", aq_c_wk: "इस हफ़्ते", aq_c_pwk: "पिछले हफ़्ते", aq_c_tot: "कुल", aq_rise: "बढ़ रहा", aq_new: "इस हफ़्ते नया",
  aq_alert: "⚠ {n} बढ़ रहे: {l}", aq_noarea: "जगह नहीं दी",
  aq_wk_h: "जाँचने वाले जवाब", aq_wk_p: "फ़ोटो जाँच जहाँ AI को यक़ीन नहीं था, बाग़वान ने जवाब ग़लत बताया, या स्प्रे से फ़ायदा नहीं हुआ। इन्हें पहले देखें।",
  aq_s_checks: "फ़ोटो जाँच", aq_s_low: "AI को यक़ीन नहीं", aq_s_wrong: "ग़लत बताया", aq_s_fu: "फ़ॉलो-अप के जवाब", aq_s_nb: "स्प्रे से फ़ायदा नहीं",
  aq_f_all: "सभी", aq_f_nb: "स्प्रे से फ़ायदा नहीं", aq_f_wrong: "ग़लत बताया", aq_f_unsure: "बाग़वान को यक़ीन नहीं", aq_f_low: "AI को यक़ीन नहीं", aq_f_photo: "ख़राब फ़ोटो",
  aq_fl_nb: "स्प्रे से फ़ायदा नहीं", aq_fl_wrong: "ग़लत बताया", aq_fl_unsure: "बाग़वान को यक़ीन नहीं", aq_fl_low: "AI को यक़ीन नहीं", aq_fl_photo: "ख़राब फ़ोटो",
  aq_ai: "AI का जवाब", aq_out_same: "स्प्रे के बाद वैसा ही", aq_out_worse: "स्प्रे के बाद और ख़राब", aq_note: "बाग़वान की टिप्पणी", aq_expert: "आपका जवाब",
  aq_open: "फ़ोटो जाँच में खोलें", aq_none: "यहाँ जाँचने को कुछ नहीं।", aq_more: "{t} में से {n} दिख रहे हैं।",
  aq_q_h: "साथी से सबसे ज़्यादा सवाल", aq_q_p: "इस समय में सबसे ज़्यादा पूछे गए विषय। हर विषय Facebook पोस्ट या वीडियो का अच्छा आइडिया है।",
  aq_q_n: "{n} सवाल", aq_q_prev: "पिछले समय में {n}", aq_q_post: "इस पर पोस्ट बनाएँ", aq_q_none: "इस समय में अभी कोई सवाल नहीं।",
  aq_q_words: "और शब्द जो आए",
  aq_tp_scab: "स्कैब (खुरंड)", aq_tp_leaf: "पत्तों का जल्दी गिरना (मारसोनिना)", aq_tp_spray: "स्प्रे शेड्यूल और स्प्रे", aq_tp_food: "खाद और पोषण", aq_tp_prune: "कटाई-छंटाई",
  aq_tp_rate: "भाव, मंडी और बिक्री", aq_tp_pest: "कीट (माइट, बोरर, एफ़िड)", aq_tp_wx: "मौसम, ओले और पाला", aq_tp_plant: "किस्म, रूटस्टॉक और पौधे",
  aq_tp_root: "जड़ और कॉलर सड़न", aq_tp_flower: "फूल और फल लगना", aq_tp_water: "पानी और सिंचाई", aq_tp_app: "सेब साथी का इस्तेमाल", aq_tp_other: "अन्य"
});

let AQ = null, aqBusy = false, aqDays = 30, aqFilt = "all", aqMap = null, aqLeaf = null, aqUrls = {};
const AQ_TOPICS = [
  ["scab", /scab|kharund|khurand|खुरंड|स्कैब/i],
  ["leaf", /leaf ?fall|premature|marssonina|blotch|patt?e g[ia]r|पत्ते गिर|पतझड़|patjhad/i],
  ["root", /collar|root ?rot|jad sad|जड़ सड़|जड़ गल|sadan|white root/i],
  ["pest", /mite|borer|aphid|woolly|scale|keet|keed|कीट|कीड़|thrip|leaf ?miner|insect/i],
  ["spray", /spray|schedule|chhidk|छिड़क|dawa|दवा|fungicid|pesticid|स्प्रे/i],
  ["food", /fertili|khaad|khad\b|खाद|urea|यूरिया|boron|zinc|calcium|manure|gobar|गोबर|npk|nutri|पोषण/i],
  ["prune", /prun|chhant|छंट|katai|कटाई|training|kaat/i],
  ["rate", /rate|price|mandi|मंडी|bhav|भाव|adani|sell|bech|बेच|commission|carton|peti|पेटी/i],
  ["wx", /hail|\bola\b|ओला|ओले|frost|paala|pala\b|पाला|rain|baarish|barish|बारिश|weather|mausam|मौसम|snow|barf/i],
  ["plant", /variet|kism|किस्म|rootstock|nursery|paudh|पौध|plant|gala|delicious|m9\b|mm ?106|mm ?111|spur/i],
  ["flower", /flower|phool|फूल|pollin|fruit ?set|bee|madhumakh|मधुमक्/i],
  ["water", /water|paani|pani\b|पानी|irrigat|drip|sinchai|सिंचाई/i],
  ["app", /\bapp\b|account|login|password|payment|plan|record|register|hisaab|हिसाब|calculator|saathi plus/i]
];
const AQ_STOP = new Set("the a an and or of to in on for is are was it my me i we you your our this that what how why when which can do does should with from at be have has will not no yes please tell about kya hai hain ka ki ke ko se me mein main mera meri mere aap aapka koi kaise kab kyon kyu karna karein kare kar par aur bhi to ho hota hoti tha thi raha rahi sakte sakta abhi ab ek do teen kuch bahut acha theek ji haan nahi नहीं क्या है हैं का की के को से में मैं मेरा मेरी मेरे आप कोई कैसे कब क्यों करना करें कर पर और भी तो हो होता था रहा सकते अभी अब एक कुछ बहुत seb apple सेब bagicha बगीचा bagiche garden orchard tree trees ped पेड़".split(" "));

async function loadAq() {
  if (!$("aqBody") || !isAdmin() || !sb || aqBusy) return;
  aqBusy = true; set("aqErr", ""); set("aqAt", tr("ad_loading")); $("aqRefresh").disabled = true;
  const since = new Date(Date.now() - 2 * 90 * 864e5).toISOString();
  const o = { at: new Date().toISOString(), dx: [], ch: [] }, errs = [];
  try {
    const r = await sb.from("diagnoses").select("id,created_at,area,lat2,lon2,result,expert_id,expert_name,feedback,outcome,outcome_note,note,photo_paths,lang")
      .gte("created_at", new Date(Date.now() - 90 * 864e5).toISOString()).order("created_at", { ascending: false }).limit(5000);
    if (r.error) throw r.error; o.dx = r.data || [];
  } catch (e) { errs.push(tr("aq_err").replace("{m}", String(e.message || e))); }
  try {
    const r = await sb.from("chat_messages").select("created_at,content,lang").eq("role", "user").gte("created_at", since).order("created_at", { ascending: false }).limit(8000);
    if (r.error) throw r.error; o.ch = r.data || [];
  } catch (e) { errs.push(tr("aq_err").replace("{m}", String(e.message || e))); }
  aqBusy = false; $("aqRefresh").disabled = false; set("aqAt", tr("ov_at").replace("{t}", adWhen(o.at)));
  AQ = o; set("aqErr", errs.join(" ")); renderAq();
}

/* helpers on one photo check */
const aqTop = d => (d.result && Array.isArray(d.result.matches) && d.result.matches[0]) || null;
const aqDz = d => d.expert_id || (aqTop(d) && aqTop(d).id) || null;
const aqSure = d => !!d.expert_id || (aqTop(d) && aqTop(d).confidence !== "low");
function aqNames() {
  const n = {};
  (AQ ? AQ.dx : []).forEach(d => {
    if (d.expert_id && d.expert_name) n[d.expert_id] = n[d.expert_id] && d.lang !== "en" ? n[d.expert_id] : d.expert_name;
    (d.result && d.result.matches || []).forEach(m => { if (m.id && m.name && (!n[m.id] || d.lang === "en")) n[m.id] = m.name; });
  });
  return n;
}
function aqFlags(d) {
  const f = [], t = aqTop(d);
  if (d.outcome === "same" || d.outcome === "worse") f.push("nb");
  if (d.feedback === "wrong") f.push("wrong");
  if (d.feedback === "unsure") f.push("unsure");
  if (!d.expert_id && t && t.confidence === "low") f.push("low");
  if (d.result && d.result.photo_ok === false) f.push("photo");
  return f;
}

function renderAq() {
  if (!$("aqBody")) return;
  const pick = '<div class="sbfilt">' + [7, 30, 90].map(n => '<button class="btn-s" type="button" data-aqd="' + n + '" aria-pressed="' + (aqDays === n) + '">' + esc(tr("aq_days").replace("{n}", n)) + "</button>").join("") + "</div>";
  if (!AQ) { $("aqBody").innerHTML = pick; return; }
  $("aqBody").innerHTML = pick + aqMapHtml() + aqWeakHtml() + aqTopicsHtml();
  aqDrawMap(); aqThumbs();
}

/* ---------- 1. disease map ---------- */
function aqAreaRows() {
  const cut = Date.now() - aqDays * 864e5, wk = Date.now() - 7 * 864e5, pwk = Date.now() - 14 * 864e5, by = {};
  AQ.dx.forEach(d => {
    const t = +new Date(d.created_at), dz = aqDz(d);
    if (!dz || dz === "healthy" || dz === "other" || !aqSure(d) || d.feedback === "wrong") return;
    const area = (d.area || "").trim() || (d.lat2 != null ? (+d.lat2).toFixed(1) + ", " + (+d.lon2).toFixed(1) : "");
    const k = (area || "–") + "|" + dz, r = by[k] = by[k] || { area, dz, tot: 0, wk: 0, pwk: 0, pts: [] };
    if (t >= cut) { r.tot++; if (d.lat2 != null && d.lon2 != null) r.pts.push([+d.lat2, +d.lon2]); }
    if (t >= wk) r.wk++; else if (t >= pwk) r.pwk++;
  });
  return Object.values(by).filter(r => r.tot || r.wk).map(r => Object.assign(r, { rise: r.wk >= 3 && r.wk >= 2 * r.pwk, fresh: r.wk >= 2 && !r.pwk }))
    .sort((a, b) => (b.rise - a.rise) || b.wk - a.wk || b.tot - a.tot);
}
function aqMapHtml() {
  const R = aqAreaRows(), N = aqNames(), nm = id => esc(N[id] || id), rising = R.filter(r => r.rise);
  return '<h5 class="ovsub">' + esc(tr("aq_map_h")) + '</h5><p class="fine">' + esc(tr("aq_map_p")) + "</p>" +
    (rising.length ? '<p class="aqalert">' + esc(tr("aq_alert").replace("{n}", rising.length).replace("{l}", rising.slice(0, 4).map(r => (N[r.dz] || r.dz) + " — " + (r.area || tr("aq_noarea"))).join("; "))) + "</p>" : "") +
    (R.some(r => r.pts.length) ? '<div id="aqMap" class="aqmap" role="img" aria-label="' + esc(tr("aq_map_h")) + '"></div>' : "") +
    (!R.length ? '<p class="empty">' + esc(tr("aq_map_none")) + "</p>" :
      '<div class="tablewrap"><table class="ledger"><thead><tr><th scope="col">' + esc(tr("aq_c_area")) + '</th><th scope="col">' + esc(tr("aq_c_dz")) + '</th><th scope="col" class="n">' + esc(tr("aq_c_wk")) +
      '</th><th scope="col" class="n">' + esc(tr("aq_c_pwk")) + '</th><th scope="col" class="n">' + esc(tr("aq_c_tot")) + "</th></tr></thead><tbody>" +
      R.slice(0, 60).map(r => "<tr" + (r.rise ? ' class="pfhit"' : "") + "><td>" + esc(r.area || tr("aq_noarea")) + "</td><td>" + nm(r.dz) +
        (r.rise ? ' <span class="tag pfbad">' + esc(tr("aq_rise")) + "</span>" : r.fresh ? ' <span class="tag">' + esc(tr("aq_new")) + "</span>" : "") + '</td><td class="n">' + fmtN(r.wk) +
        '</td><td class="n">' + fmtN(r.pwk) + '</td><td class="n">' + fmtN(r.tot) + "</td></tr>").join("") + "</tbody></table></div>");
}
const AQ_COL = ["#C0392B", "#2F6FA8", "#E67E22", "#8E44AD", "#16A085", "#B7950B", "#7F8C8D", "#D35400", "#27AE60", "#2C3E50"];
function aqLoadLeaflet() {
  if (window.L) return Promise.resolve(true);
  if (!aqLeaf) aqLeaf = new Promise(res => {
    const c = document.createElement("link"); c.rel = "stylesheet"; c.href = "https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet.css"; document.head.appendChild(c);
    const s = document.createElement("script"); s.src = "https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet.js";
    s.onload = () => res(!!window.L); s.onerror = () => { aqLeaf = null; res(false); }; document.head.appendChild(s);
  });
  return aqLeaf;
}
async function aqDrawMap() {
  const el = $("aqMap"); if (!el) return;
  const ok = await aqLoadLeaflet();
  if (!ok || !$("aqMap")) { if ($("aqMap")) $("aqMap").outerHTML = '<p class="fine">' + esc(tr("aq_map_load")) + "</p>"; return; }
  if (aqMap) { try { aqMap.remove(); } catch (e) {} aqMap = null; }
  aqMap = L.map("aqMap", { scrollWheelZoom: false });
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 13, attribution: "© OpenStreetMap" }).addTo(aqMap);
  const N = aqNames(), cells = {}, ids = [];
  aqAreaRows().forEach(r => r.pts.forEach(p => {
    const k = p[0].toFixed(1) + "," + p[1].toFixed(1) + "|" + r.dz, c = cells[k] = cells[k] || { lat: +p[0].toFixed(1), lon: +p[1].toFixed(1), dz: r.dz, area: r.area, n: 0 };
    c.n++; if (ids.indexOf(r.dz) < 0) ids.push(r.dz);
  }));
  const pts = [];
  Object.values(cells).forEach(c => {
    const col = AQ_COL[ids.indexOf(c.dz) % AQ_COL.length];
    L.circleMarker([c.lat, c.lon], { radius: 6 + Math.sqrt(c.n) * 5, color: col, fillColor: col, fillOpacity: .45, weight: 2 })
      .bindPopup("<b>" + esc(N[c.dz] || c.dz) + "</b><br>" + esc(c.area || "") + "<br>× " + c.n).addTo(aqMap);
    pts.push([c.lat, c.lon]);
  });
  if (pts.length > 1) aqMap.fitBounds(pts, { padding: [30, 30], maxZoom: 10 }); else aqMap.setView(pts[0] || [32.0, 77.2], pts.length ? 10 : 7);
  const key = L.control({ position: "bottomleft" });
  key.onAdd = () => { const d = L.DomUtil.create("div", "aqkey"); d.innerHTML = ids.slice(0, 10).map((id, i) => '<span><i style="background:' + AQ_COL[i % AQ_COL.length] + '"></i>' + esc(N[id] || id) + "</span>").join(""); return d; };
  key.addTo(aqMap);
}

/* ---------- 2. weak answers ---------- */
function aqWeakHtml() {
  const cut = Date.now() - aqDays * 864e5, D = AQ.dx.filter(d => +new Date(d.created_at) >= cut), N = aqNames();
  const fl = D.map(d => ({ d, f: aqFlags(d) })).filter(x => x.f.length);
  const order = { nb: 0, wrong: 1, unsure: 2, photo: 3, low: 4 };
  fl.sort((a, b) => Math.min(...a.f.map(k => order[k])) - Math.min(...b.f.map(k => order[k])) || String(b.d.created_at).localeCompare(String(a.d.created_at)));
  const cnt = k => fl.filter(x => x.f.indexOf(k) >= 0).length, fu = D.filter(d => d.outcome).length;
  const pct = (a, b) => b ? " · " + Math.round(a / b * 100) + "%" : "";
  const st = (k, v, cls) => "<div" + (cls ? ' class="' + cls + '"' : "") + "><span>" + esc(tr(k)) + "</span><b>" + v + "</b></div>";
  const rows = aqFilt === "all" ? fl : fl.filter(x => x.f.indexOf(aqFilt) >= 0);
  const list = rows.slice(0, 40);
  return '<h5 class="ovsub">' + esc(tr("aq_wk_h")) + '</h5><p class="fine">' + esc(tr("aq_wk_p")) + "</p>" +
    '<div class="ystats">' + st("aq_s_checks", fmtN(D.length), "main") + st("aq_s_low", fmtN(cnt("low")) + pct(cnt("low"), D.length)) + st("aq_s_wrong", fmtN(cnt("wrong")) + pct(cnt("wrong"), D.length), cnt("wrong") ? "neg" : "") +
    st("aq_s_fu", fmtN(fu)) + st("aq_s_nb", fmtN(cnt("nb")) + pct(cnt("nb"), fu), cnt("nb") ? "neg" : "") + "</div>" +
    '<div class="sbfilt">' + ["all", "nb", "wrong", "unsure", "low", "photo"].map(f => '<button class="btn-s" type="button" data-aqf="' + f + '" aria-pressed="' + (aqFilt === f) + '">' + esc(tr("aq_f_" + f)) +
      " (" + fmtN(f === "all" ? fl.length : cnt(f)) + ")</button>").join("") + "</div>" +
    (!list.length ? '<p class="empty">' + esc(tr("aq_none")) + "</p>" :
      '<div class="rvlist">' + list.map(({ d, f }) => {
        const t = aqTop(d);
        return '<article class="rv aqrow"><div class="aqph" data-aqph="' + esc((d.photo_paths || [])[0] || "") + '"></div><div>' +
          '<span class="meta">' + adWhen(d.created_at) + (d.area ? " · " + esc(d.area) : "") + (d.lang ? " · " + esc(String(d.lang).toUpperCase()) : "") + "</span><br>" +
          f.map(k => '<span class="optag' + (k === "nb" || k === "wrong" ? " bad" : "") + '">' + esc(tr("aq_fl_" + k)) + "</span>").join(" ") +
          '<div class="q">' + esc(tr("aq_ai")) + ": " + (t ? esc(N[t.id] || t.name || t.id) + " (" + esc(t.confidence || "") + ")" : "–") + "</div>" +
          (d.expert_id ? '<div class="note"><b>' + esc(tr("aq_expert")) + ":</b> " + esc(d.expert_name || d.expert_id) + "</div>" : "") +
          (d.outcome === "same" || d.outcome === "worse" ? '<div class="note"><b>' + esc(tr("aq_out_" + d.outcome)) + "</b>" + (d.outcome_note ? ": " + esc(d.outcome_note) : "") + "</div>" : "") +
          (d.note ? '<div class="note"><b>' + esc(tr("aq_note")) + ":</b> " + esc(String(d.note).slice(0, 300)) + "</div>" : "") +
          "</div></article>";
      }).join("") + "</div>" + (rows.length > list.length ? '<p class="fine">' + esc(tr("aq_more").replace("{n}", list.length).replace("{t}", rows.length)) + "</p>" : "")) +
    '<p><button class="btn-s" type="button" data-aqopen="1">' + esc(tr("aq_open")) + "</button></p>";
}
async function aqThumbs() {
  const els = Array.from(document.querySelectorAll("[data-aqph]")).filter(e => e.dataset.aqph);
  const need = els.map(e => e.dataset.aqph).filter(p => !aqUrls[p]);
  if (need.length) {
    try {
      const r = await sb.storage.from("dx-photos").createSignedUrls(need, 3600);
      (r.data || []).forEach(x => { if (x.signedUrl) aqUrls[x.path] = x.signedUrl; });
    } catch (e) {}
  }
  els.forEach(e => { const u = aqUrls[e.dataset.aqph]; if (u) e.innerHTML = '<a href="' + esc(u) + '" target="_blank" rel="noopener"><img src="' + esc(u) + '" alt="" loading="lazy"></a>'; });
}

/* ---------- 3. top Saathi questions ---------- */
function aqTopic(q) { for (const [k, re] of AQ_TOPICS) if (re.test(q)) return k; return "other"; }
function aqTopicsHtml() {
  const now = Date.now(), cut = now - aqDays * 864e5, pcut = now - 2 * aqDays * 864e5, by = {}, words = {};
  AQ.ch.forEach(m => {
    const t = +new Date(m.created_at), q = String(m.content || ""); if (t < pcut) return;
    const k = aqTopic(q), r = by[k] = by[k] || { k, n: 0, p: 0, ex: [] };
    if (t >= cut) { r.n++; if (r.ex.length < 3 && r.ex.indexOf(q) < 0) r.ex.push(q); if (k === "other") q.toLowerCase().split(/[^a-zऀ-ॿ]+/).forEach(w => { if (w.length > 2 && !AQ_STOP.has(w)) words[w] = (words[w] || 0) + 1; }); }
    else r.p++;
  });
  const R = Object.values(by).filter(r => r.n).sort((a, b) => (a.k === "other") - (b.k === "other") || b.n - a.n);
  const W = Object.entries(words).sort((a, b) => b[1] - a[1]).slice(0, 15);
  return '<h5 class="ovsub">' + esc(tr("aq_q_h")) + '</h5><p class="fine">' + esc(tr("aq_q_p")) + "</p>" +
    (!R.length ? '<p class="empty">' + esc(tr("aq_q_none")) + "</p>" :
      '<div class="rvlist">' + R.map((r, i) => '<article class="rv"><span class="meta">#' + (i + 1) + " · " + esc(tr("aq_q_n").replace("{n}", fmtN(r.n))) +
        (r.p || r.n ? " · " + esc(tr("aq_q_prev").replace("{n}", fmtN(r.p))) + (r.n > r.p ? ' <b class="svup">▲</b>' : r.n < r.p ? ' <b class="svdn">▼</b>' : "") : "") + "</span>" +
        '<div class="q"><b>' + esc(tr("aq_tp_" + r.k)) + "</b></div>" +
        '<ul class="aqex">' + r.ex.map(q => "<li>" + esc(q.slice(0, 220)) + "</li>").join("") + "</ul>" +
        (r.k !== "other" && r.k !== "app" ? '<button class="btn-s" type="button" data-aqpost="' + r.k + '">' + esc(tr("aq_q_post")) + "</button>" : "") + "</article>").join("") + "</div>") +
    (W.length ? '<p class="fine"><b>' + esc(tr("aq_q_words")) + ":</b> " + W.map(([w, n]) => esc(w) + " (" + n + ")").join(", ") + "</p>" : "");
}

document.addEventListener("click", e => {
  const t = e.target.closest && e.target.closest("[data-aqd],[data-aqf],[data-aqopen],[data-aqpost]"); if (!t || !AQ) return;
  if (t.dataset.aqd) { aqDays = +t.dataset.aqd; renderAq(); }
  else if (t.dataset.aqf) { aqFilt = t.dataset.aqf; renderAq(); }
  else if (t.dataset.aqopen) { if (typeof showTab === "function") showTab("users"); }
  else if (t.dataset.aqpost) {
    const k = t.dataset.aqpost, cut = Date.now() - aqDays * 864e5;
    const qs = AQ.ch.filter(m => +new Date(m.created_at) >= cut && aqTopic(String(m.content || "")) === k).slice(0, 5).map(m => "\"" + String(m.content).slice(0, 140) + "\"").join(" ");
    const ask = T.en.aq_q_ask.replace("{t}", T.en["aq_tp_" + k]).replace("{q}", qs).slice(0, 790);
    if (typeof mkAsk !== "undefined") mkAsk.fb = ask;
    if (typeof showTab === "function") showTab("mk");
    if (typeof mkGo === "function") mkGo("fb");
    setTimeout(() => { const a = $("mkAsk-fb"); if (a) { a.value = ask; a.scrollIntoView({ behavior: "smooth", block: "center" }); a.focus(); } }, 400);
  }
});
if ($("aqRefresh")) $("aqRefresh").addEventListener("click", loadAq);
/* these texts arrive after admin.js drew the page: draw again, and load now if this tab was opened before this file arrived */
if (typeof applyLang === "function") applyLang();
if (typeof tab !== "undefined" && tab === "aq" && typeof loaded !== "undefined" && loaded.aq && isAdmin() && !AQ) loadAq();
