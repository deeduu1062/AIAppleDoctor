/* Seb Saathi admin — Social handler extras
   1. Make my week: one tap, the AI makes the week's posts, short videos and WhatsApp tip; you check and approve them on one screen.
   2. WhatsApp first: your WhatsApp groups, each with its own tracked link; send a message to a group in one tap;
      videos go to WhatsApp chats or Status straight from the list.
   3. Weather watch: the 4-day forecast for the apple areas; when rain, heat, frost, hail or snow brings a risk,
      an alert post and a WhatsApp message are drafted for you (once per risk, you still approve them).
   4. What brings growers in: every post, video, WhatsApp message and YouTube upload ranked by the sign-ups its own link brought.
   Loaded after marketing.js, studio.js and autovid.js; draws itself into the Social handler after each renderMk(). */
Object.assign(T.en, {
  wk_h: "✨ Make my week", wk_p: "One tap: the AI writes this week's posts, makes short videos and the WhatsApp tip, all for the season and this week's weather. Then you check them below and approve them in one go.",
  wk_posts: "Posts", wk_vids: "Videos", wk_v0: "No videos", wk_v1: "1 video", wk_v2: "2 videos", wk_wa: "WhatsApp tip",
  wk_go: "✨ Make my week", wk_busy: "Making your week…", wk_vnote: "Videos are recorded on this page: keep this tab open and in front until it says done.",
  wk_s_posts: "Writing {n} posts", wk_s_wa: "Writing the WhatsApp tip", wk_s_vid: "Making video {i}: {t}", wk_done: "✓ Your week is ready. Check it below and tap Approve.",
  wk_err: "Stopped: {m}", wk_vid_err: "Video {i} was not made: {m}",
  wk_rev_h: "Check and approve this week", wk_rev_p: "Untick anything you don't want yet. WhatsApp messages stay as reminders on their day (you send them yourself).",
  wk_rev_none: "Nothing waiting for the coming week.", wk_rev_go: "Approve {n} ticked", wk_rev_ok: "✓ {n} approved. They go out on their own at the times shown.",
  wk_rev_wa: "reminder", wk_rev_nophoto: "no photo: Facebook only", wk_edit: "Edit",
  wk_today: "Next week isn't planned yet.", wk_today_go: "✨ Make my week",
  wk_yt: "Also upload the videos to YouTube", wk_s_yt: "Uploading video {i} to YouTube", wk_yt_lock: "uploaded, but YouTube kept it private (audit needed)",
  yp_h: "🎬 Make & publish to YouTube", yp_p: "One tap: the video is written, voiced, made and uploaded to your Seb Saathi channel as a Short, with the settings you last used below. Keep this tab open and in front until it's done.",
  yp_topic: "Topic (optional)", yp_topic_ph: "Leave empty for this month's orchard jobs", yp_at: "Publish at (India time, optional)", yp_go: "🎬 Make & publish", yp_busy: "Working… see the steps below",
  yp_conn: "Connect your YouTube channel first (YouTube box in the Video Studio below).", yp_ok: "✓ Uploaded to YouTube.", yp_ok_at: "✓ Uploaded. YouTube publishes it at {d}.", yp_lock: "Uploaded, but YouTube locked it as private until Google audits your app. Download it below and post it in the YouTube app for now.",
  yp_err: "Not published: {m}", yt_lock_tag: "private: YouTube audit needed",

  wx_h: "⛅ Weather watch · next 4 days", wx_none: "No weather risk for apple trees in the apple areas in the next 4 days.", wx_load: "Checking the forecast…", wx_err: "Could not get the forecast: {m}",
  wx_auto_on: "Alert drafts: automatic", wx_auto_off: "Alert drafts: off", wx_auto_p: "When a risk shows up, an alert post and a WhatsApp message are drafted for you (once every 4 days per risk). You still approve them.",
  wx_draft: "Draft alert post + WhatsApp", wx_busy: "Drafting the alert…", wx_made: "✓ Alert drafted ({d}). Check it in Posts waiting and on the WhatsApp tab.",
  wx_r_scab: "Scab risk", wx_r_leaf: "Leaf fall / Alternaria risk", wx_r_mites: "Mite risk (hot, dry)", wx_r_frost: "Frost risk", wx_r_hail: "Hail risk (thunderstorms)", wx_r_snow: "Heavy snow (branch breakage)",
  wx_det_rain: "rain {r} mm", wx_det_t: "{a}–{b}°C", wx_det_snow: "snow {s} cm", wx_src: "Forecast: Open-Meteo, for the main apple areas; higher orchards may be colder.",

  wg_h: "My WhatsApp groups", wg_sub: "{n} groups · {s} sign-ups", wg_p: "Add the grower groups you share into. Each group gets its own link, so you can see which group brings sign-ups. Put the group link in the group description too.",
  wg_name: "Group name", wg_area: "Village / area", wg_size: "Members", wg_add: "+ Add group", wg_none: "No groups yet.",
  wg_c_group: "Group", wg_c_vis: "Visitors (30 days)", wg_c_sign: "Sign-ups", wg_c_last: "Last shared", wg_copy: "Copy group link", wg_copied: "Copied ✓", wg_del: "Remove", wg_del_sure: "Sure?",
  wg_send: "Send to a group:", wg_never: "never", wg_status: "For WhatsApp Status: tap Send on WhatsApp and choose My status.", wg_save_err: "Could not save the groups.",
  wv_go: "📲 WhatsApp / Status", wv_busy: "Getting the video…", wv_ready: "📲 Share now", wv_fallback: "This browser can't hand the video file to WhatsApp, so its link is sent. On your phone the video file itself is shared.",

  ms_today: "Today", ms_create: "Create", ms_results: "Results", ms_settings: "⚙ Settings",
  mk_make_q: "What do you want to make?", mk_m_week: "✨ My week", mk_m_post: "Post", mk_m_video: "Video", mk_m_wa: "WhatsApp message",
  mk_make_after: "New drafts wait in Today for you to check and approve.", mk_wait_h: "Waiting for you", mk_wait_sub: "{n} to check · {s} going out",
  mk_posted_h: "Posted recently", mk_q_none_posted: "Nothing posted yet.", mk_ask_words: "Write the video's words yourself (with the AI)",
  mk_classic_h: "Classic view", mk_classic_p: "The old layout, one tab per platform, if you need it for a while.", mk_new_view: "✨ New view",
  wn_h: "What brings growers in", wn_sub: "{n} sign-ups from social links (30 days)", wn_p: "Every post, video, WhatsApp message and YouTube upload has its own link, so each sign-up is counted against the one that brought it. The AI is shown the best ones when it writes new posts.",
  wn_c_what: "Post", wn_c_vis: "Visitors", wn_c_sign: "Sign-ups", wn_c_reach: "Reach", wn_none: "No sign-ups or visitors from posts yet. They show here once growers start tapping your links.",
  wn_by: "Sign-ups by channel (30 days):", wn_kind: "Average sign-ups per item: {t}", wn_ig: "Instagram captions can't hold links, so Instagram only counts through the bio link.", wn_other: "Other links"
});
Object.assign(T.hi, {
  wk_h: "✨ मेरा हफ़्ता बनाएँ", wk_p: "एक टैप: AI इस हफ़्ते के पोस्ट, छोटे वीडियो और WhatsApp टिप बनाता है, मौसम और इस हफ़्ते के मौसम-हाल के हिसाब से। फिर नीचे देखकर एक साथ मंज़ूर करें।",
  wk_posts: "पोस्ट", wk_vids: "वीडियो", wk_v0: "वीडियो नहीं", wk_v1: "1 वीडियो", wk_v2: "2 वीडियो", wk_wa: "WhatsApp टिप",
  wk_go: "✨ मेरा हफ़्ता बनाएँ", wk_busy: "आपका हफ़्ता बन रहा है…", wk_vnote: "वीडियो इसी पेज पर रिकॉर्ड होते हैं: पूरा होने तक यह टैब खुला और सामने रखें।",
  wk_s_posts: "{n} पोस्ट लिखे जा रहे हैं", wk_s_wa: "WhatsApp टिप लिखी जा रही है", wk_s_vid: "वीडियो {i} बन रहा है: {t}", wk_done: "✓ आपका हफ़्ता तैयार है। नीचे देखें और मंज़ूर करें।",
  wk_err: "रुक गया: {m}", wk_vid_err: "वीडियो {i} नहीं बना: {m}",
  wk_rev_h: "इस हफ़्ते का सब देखें और मंज़ूर करें", wk_rev_p: "जो अभी नहीं चाहिए, उसका टिक हटाएँ। WhatsApp संदेश अपने दिन याद दिलाएँगे (भेजना आपको है)।",
  wk_rev_none: "आने वाले हफ़्ते के लिए कुछ बाक़ी नहीं।", wk_rev_go: "टिक वाले {n} मंज़ूर करें", wk_rev_ok: "✓ {n} मंज़ूर। ये दिखाए समय पर अपने आप जाएँगे।",
  wk_rev_wa: "याद", wk_rev_nophoto: "फ़ोटो नहीं: सिर्फ़ Facebook", wk_edit: "बदलें",
  wk_today: "अगला हफ़्ता अभी तय नहीं।", wk_today_go: "✨ मेरा हफ़्ता बनाएँ",
  wk_yt: "वीडियो YouTube पर भी अपलोड करें", wk_s_yt: "वीडियो {i} YouTube पर अपलोड हो रहा है", wk_yt_lock: "अपलोड हुआ, पर YouTube ने private रखा (ऑडिट चाहिए)",
  yp_h: "🎬 बनाएँ और YouTube पर डालें", yp_p: "एक टैप: वीडियो लिखा, आवाज़ दी, बनाया और Short के रूप में आपके सेब साथी चैनल पर अपलोड होता है, नीचे की पिछली सेटिंग से। पूरा होने तक यह टैब खुला और सामने रखें।",
  yp_topic: "विषय (ज़रूरी नहीं)", yp_topic_ph: "ख़ाली छोड़ें तो इस महीने के बाग़ के काम", yp_at: "कब पब्लिश करें (भारत का समय, ज़रूरी नहीं)", yp_go: "🎬 बनाएँ और डालें", yp_busy: "काम चल रहा है… नीचे देखें",
  yp_conn: "पहले अपना YouTube चैनल जोड़ें (नीचे Video Studio में YouTube बॉक्स)।", yp_ok: "✓ YouTube पर अपलोड हो गया।", yp_ok_at: "✓ अपलोड हुआ। YouTube इसे {d} पर पब्लिश करेगा।", yp_lock: "अपलोड हुआ, पर Google ऑडिट तक YouTube ने इसे private लॉक किया। अभी नीचे से डाउनलोड करके YouTube ऐप से पोस्ट करें।",
  yp_err: "पब्लिश नहीं हुआ: {m}", yt_lock_tag: "private: YouTube ऑडिट चाहिए",

  wx_h: "⛅ मौसम पर नज़र · अगले 4 दिन", wx_none: "अगले 4 दिन सेब इलाक़ों में पेड़ों के लिए मौसम का कोई ख़तरा नहीं।", wx_load: "मौसम देखा जा रहा है…", wx_err: "मौसम नहीं मिला: {m}",
  wx_auto_on: "चेतावनी ड्राफ़्ट: अपने आप", wx_auto_off: "चेतावनी ड्राफ़्ट: बंद", wx_auto_p: "ख़तरा दिखते ही चेतावनी पोस्ट और WhatsApp संदेश अपने आप ड्राफ़्ट होते हैं (हर ख़तरे पर 4 दिन में एक बार)। मंज़ूरी आप ही देंगे।",
  wx_draft: "चेतावनी पोस्ट + WhatsApp ड्राफ़्ट करें", wx_busy: "चेतावनी ड्राफ़्ट हो रही है…", wx_made: "✓ चेतावनी ड्राफ़्ट ({d})। बाक़ी पोस्ट और WhatsApp टैब में देखें।",
  wx_r_scab: "स्कैब का ख़तरा", wx_r_leaf: "पत्ते झड़ना / Alternaria का ख़तरा", wx_r_mites: "माइट का ख़तरा (गर्म, सूखा)", wx_r_frost: "पाले का ख़तरा", wx_r_hail: "ओलों का ख़तरा (आँधी-तूफ़ान)", wx_r_snow: "भारी बर्फ़ (टहनियाँ टूटना)",
  wx_det_rain: "बारिश {r} mm", wx_det_t: "{a}–{b}°C", wx_det_snow: "बर्फ़ {s} cm", wx_src: "मौसम: Open-Meteo, मुख्य सेब इलाक़ों के लिए; ऊँचे बाग़ ज़्यादा ठंडे हो सकते हैं।",

  wg_h: "मेरे WhatsApp ग्रुप", wg_sub: "{n} ग्रुप · {s} साइन-अप", wg_p: "जिन बाग़वान ग्रुपों में आप शेयर करते हैं, उन्हें जोड़ें। हर ग्रुप का अपना लिंक है, ताकि पता चले कौन-सा ग्रुप साइन-अप लाता है। ग्रुप लिंक ग्रुप के विवरण में भी डालें।",
  wg_name: "ग्रुप का नाम", wg_area: "गाँव / इलाक़ा", wg_size: "सदस्य", wg_add: "+ ग्रुप जोड़ें", wg_none: "अभी कोई ग्रुप नहीं।",
  wg_c_group: "ग्रुप", wg_c_vis: "विज़िटर (30 दिन)", wg_c_sign: "साइन-अप", wg_c_last: "आख़िरी बार भेजा", wg_copy: "ग्रुप लिंक कॉपी करें", wg_copied: "कॉपी हुआ ✓", wg_del: "हटाएँ", wg_del_sure: "पक्का?",
  wg_send: "ग्रुप में भेजें:", wg_never: "कभी नहीं", wg_status: "WhatsApp Status के लिए: WhatsApp पर भेजें दबाएँ और My status चुनें।", wg_save_err: "ग्रुप सेव नहीं हुए।",
  wv_go: "📲 WhatsApp / Status", wv_busy: "वीडियो लाया जा रहा है…", wv_ready: "📲 अभी शेयर करें", wv_fallback: "यह ब्राउज़र वीडियो सीधे WhatsApp को नहीं दे सकता, इसलिए वीडियो का लिंक भेजा गया। फ़ोन से वीडियो फ़ाइल ही शेयर हो सकती है।",

  ms_today: "आज", ms_create: "बनाएँ", ms_results: "नतीजे", ms_settings: "⚙ सेटिंग",
  mk_make_q: "क्या बनाना है?", mk_m_week: "✨ मेरा हफ़्ता", mk_m_post: "पोस्ट", mk_m_video: "वीडियो", mk_m_wa: "WhatsApp संदेश",
  mk_make_after: "नए ड्राफ़्ट Today में आपकी जाँच और मंज़ूरी का इंतज़ार करते हैं।", mk_wait_h: "आपका इंतज़ार", mk_wait_sub: "{n} जाँचने हैं · {s} जाने वाले",
  mk_posted_h: "हाल में पोस्ट हुए", mk_q_none_posted: "अभी कुछ पोस्ट नहीं हुआ।", mk_ask_words: "वीडियो के शब्द ख़ुद लिखें (AI के साथ)",
  mk_classic_h: "पुराना रूप", mk_classic_p: "पुराना लेआउट, हर प्लेटफ़ॉर्म का अलग टैब, अगर कुछ दिन चाहिए।", mk_new_view: "✨ नया रूप",
  wn_h: "बाग़वान कहाँ से आ रहे हैं", wn_sub: "सोशल लिंक से {n} साइन-अप (30 दिन)", wn_p: "हर पोस्ट, वीडियो, WhatsApp संदेश और YouTube वीडियो का अपना लिंक है, इसलिए हर साइन-अप उसी के नाम गिना जाता है जिसने उसे भेजा। नए पोस्ट लिखते समय AI को सबसे अच्छे दिखाए जाते हैं।",
  wn_c_what: "पोस्ट", wn_c_vis: "विज़िटर", wn_c_sign: "साइन-अप", wn_c_reach: "पहुँच", wn_none: "अभी पोस्ट से कोई साइन-अप या विज़िटर नहीं। बाग़वान लिंक दबाने लगेंगे तो यहाँ दिखेंगे।",
  wn_by: "चैनल के हिसाब से साइन-अप (30 दिन):", wn_kind: "हर चीज़ पर औसत साइन-अप: {t}", wn_ig: "Instagram कैप्शन में लिंक नहीं चलते, इसलिए Instagram सिर्फ़ बायो लिंक से गिना जाता है।", wn_other: "दूसरे लिंक"
});

const SP = {
  wk: { busy: false, steps: [], msg: "", nPosts: 3, nVids: 2, wa: true, yt: false }, yp: { topic: "", at: "", busy: false, msg: "" }, unt: new Set(), revMsg: "",
  wx: null, wxErr: "", wxBusy: "", wxMsg: "", wxRan: false,
  gf: { name: "", area: "", size: "" }, gDel: null, gCopied: null, gErr: "",
  hist: null, histBusy: false
};
try { const o = JSON.parse(localStorage.getItem("sp-wk") || "null"); if (o) { if ([3, 5].indexOf(o.nPosts) >= 0) SP.wk.nPosts = o.nPosts; if ([0, 1, 2].indexOf(o.nVids) >= 0) SP.wk.nVids = o.nVids; SP.wk.wa = o.wa !== false; SP.wk.yt = !!o.yt; } } catch (e) {}
const spSaveWk = () => { try { localStorage.setItem("sp-wk", JSON.stringify({ nPosts: SP.wk.nPosts, nVids: SP.wk.nVids, wa: SP.wk.wa, yt: SP.wk.yt })); } catch (e) {} };
const spIstDate = (d) => new Date((d || Date.now()) + 330 * 60000).toISOString().slice(0, 10);
const spDayName = iso => new Date(iso + "T00:00:00Z").toLocaleDateString(lang === "hi" ? "hi-IN" : "en-IN", { weekday: "short", day: "numeric", month: "short", timeZone: "UTC" });
/* 7:30 pm India time (14:00 UTC), `days` days from today */
const spEvening = days => { const n = new Date(); return new Date(Date.UTC(n.getUTCFullYear(), n.getUTCMonth(), n.getUTCDate() + days, 14, 0)).toISOString(); };
async function spDraft(body) {
  const r = await fetch("/api/social?fn=draft", { method: "POST", headers: { "Content-Type": "application/json", Authorization: "Bearer " + await mkTok() }, body: JSON.stringify(Object.assign({ lang: mkQLang, best: mkBestTexts() }, body)) });
  const j = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(j.error === "not_setup" ? tr("mk_q_setup") : j.error === "not_setup_v2" ? tr("mk_v2_setup") : j.error === "ai" || j.error === "no_ai_key" ? tr("mk_q_ai_err") : (j.error || "HTTP " + r.status));
  return j;
}

/* =================== 3. Weather watch =================== */
const SP_AREAS = [["Rohru", 31.205, 77.752], ["Chirgaon", 31.227, 77.844], ["Kotkhai", 31.117, 77.533], ["Theog", 31.121, 77.355], ["Kullu", 31.958, 77.110], ["Kinnaur", 31.538, 78.271],
  ["Shopian", 33.717, 74.833], ["Sopore", 34.300, 74.467], ["Harsil", 31.039, 78.744], ["Ramgarh (Nainital)", 29.437, 79.563]];
/* what each risk means, for the AI (work only; sprays only "as per the state spray schedule") */
const SP_RISK_EN = { scab: "rain with mild temperatures, which lets apple scab spread on leaves and young fruit", leaf: "several rainy, warm, humid days, when premature leaf fall (Marssonina) and Alternaria leaf blotch spread",
  mites: "hot, dry days, when red spider and European red mites multiply fast", frost: "night temperatures at or below freezing during bud break and bloom, which can kill flowers and small fruit",
  hail: "thunderstorms that can bring hail and damage fruit and leaves", snow: "heavy snowfall that can break branches of laden or young trees" };
async function spLoadWx(force) {
  try { const c = JSON.parse(localStorage.getItem("sp-wx") || "null"); if (!force && c && Date.now() - c.at < 3 * 3600000 && Array.isArray(c.d)) { SP.wx = c.d; return; } } catch (e) {}
  try {
    const u = "https://api.open-meteo.com/v1/forecast?latitude=" + SP_AREAS.map(a => a[1]).join(",") + "&longitude=" + SP_AREAS.map(a => a[2]).join(",") +
      "&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,snowfall_sum,weather_code&timezone=Asia%2FKolkata&forecast_days=4";
    const r = await fetch(u); if (!r.ok) throw new Error("HTTP " + r.status);
    let j = await r.json(); if (!Array.isArray(j)) j = [j];
    SP.wx = j.map(x => x.daily || null); SP.wxErr = "";
    try { localStorage.setItem("sp-wx", JSON.stringify({ at: Date.now(), d: SP.wx })); } catch (e) {}
  } catch (e) { SP.wx = null; SP.wxErr = String(e.message || e); }
}
/* the risks in the forecast, one entry per risk with the areas and days it affects */
function spRisks() {
  if (!SP.wx) return [];
  const m = +spIstDate().slice(5, 7), on = (k, ms) => ms.indexOf(m) >= 0, out = {};
  SP.wx.forEach((D, ai) => {
    if (!D || !Array.isArray(D.time)) return;
    const n = D.time.length, P = i => +D.precipitation_sum[i] || 0, X = i => +D.temperature_2m_max[i], N = i => +D.temperature_2m_min[i], M = i => (X(i) + N(i)) / 2;
    const idx = f => { const r = []; for (let i = 0; i < n; i++) if (f(i)) r.push(i); return r; };
    const found = {};
    if (on("scab", [3, 4, 5, 6, 7])) found.scab = idx(i => P(i) >= 2 && M(i) >= 8 && M(i) <= 24);
    if (on("leaf", [6, 7, 8, 9])) { const d = idx(i => P(i) >= 2 && M(i) >= 18 && M(i) <= 30); found.leaf = d.length >= 2 ? d : []; }
    if (on("mites", [5, 6, 7, 8])) { const d = idx(i => X(i) >= 30), tp = idx(() => true).reduce((s, i) => s + P(i), 0); found.mites = d.length >= 2 && tp < 1 ? d : []; }
    if (on("frost", [3, 4])) found.frost = idx(i => N(i) <= 0);
    if (on("hail", [4, 5, 6])) found.hail = idx(i => [96, 99].indexOf(+D.weather_code[i]) >= 0);
    if (on("snow", [11, 12, 1, 2, 3])) found.snow = idx(i => (+D.snowfall_sum[i] || 0) >= 10);
    Object.keys(found).forEach(k => {
      const d = found[k]; if (!d.length) return;
      const o = out[k] || (out[k] = { k, areas: [], days: new Set(), rain: 0, snow: 0, lo: 99, hi: -99 });
      o.areas.push(SP_AREAS[ai][0]); d.forEach(i => o.days.add(D.time[i]));
      o.rain = Math.max(o.rain, d.reduce((s, i) => s + P(i), 0)); o.snow = Math.max(o.snow, d.reduce((s, i) => s + (+D.snowfall_sum[i] || 0), 0));
      d.forEach(i => { o.lo = Math.min(o.lo, N(i)); o.hi = Math.max(o.hi, X(i)); });
    });
  });
  return Object.values(out).map(o => Object.assign(o, { days: Array.from(o.days).sort() }));
}
const spRiskDet = o => [o.rain >= 1 ? tr("wx_det_rain").replace("{r}", Math.round(o.rain)) : "", o.snow >= 1 ? tr("wx_det_snow").replace("{s}", Math.round(o.snow)) : "",
  o.lo < 99 ? tr("wx_det_t").replace("{a}", Math.round(o.lo)).replace("{b}", Math.round(o.hi)) : ""].filter(Boolean).join(", ");
const spWxAuto = () => !(MK["wx:auto"] && MK["wx:auto"].value === "off");
const spWxRecent = k => { const v = MK["wx:last:" + k] && MK["wx:last:" + k].value; return !!v && (Date.parse(spIstDate()) - Date.parse(v)) / 864e5 < 4; };
function spWxHtml() {
  let h = '<section class="spbox spwx"><div class="mkph"><b>' + tr("wx_h") + '</b><button type="button" class="btn-s sm" data-sp="wxauto" aria-pressed="' + spWxAuto() + '">' + tr(spWxAuto() ? "wx_auto_on" : "wx_auto_off") + "</button></div>";
  if (SP.wxErr) return h + '<p class="fine mkwarn">' + esc(tr("wx_err").replace("{m}", SP.wxErr)) + "</p></section>";
  if (!SP.wx) return h + '<p class="fine">' + tr("wx_load") + "</p></section>";
  const R = spRisks();
  if (!R.length) h += '<p class="fine">' + tr("wx_none") + "</p>";
  R.forEach(o => {
    h += '<div class="sprisk"><p><b>' + esc(tr("wx_r_" + o.k)) + "</b> · " + esc(o.areas.join(", ")) + " · " + esc(o.days.map(spDayName).join(", ")) + (spRiskDet(o) ? ' <span class="fine">(' + esc(spRiskDet(o)) + ")</span>" : "") + "</p>" +
      (spWxRecent(o.k) ? '<p class="fine">' + esc(tr("wx_made").replace("{d}", mkDay(MK["wx:last:" + o.k].value))) + "</p>"
        : '<button type="button" class="btn-s add sm" data-sp="wxdraft" data-k="' + o.k + '"' + (SP.wxBusy || mkQErr ? " disabled" : "") + ">" + tr(SP.wxBusy === o.k ? "wx_busy" : "wx_draft") + "</button>") + "</div>";
  });
  if (SP.wxMsg) h += '<p class="fine" role="status">' + SP.wxMsg + "</p>";
  return h + '<p class="fine">' + tr(spWxAuto() ? "wx_auto_p" : "wx_src") + (spWxAuto() ? " " + tr("wx_src") : "") + "</p></section>";
}
async function spWxDraft(k, auto) {
  const o = spRisks().find(x => x.k === k); if (!o || SP.wxBusy) return;
  SP.wxBusy = k; SP.wxMsg = ""; renderMk();
  const fact = "WEATHER ALERT from the forecast: " + SP_RISK_EN[k] + ". Areas: " + o.areas.join(", ") + ". Days: " + o.days.join(", ") + (spRiskDet(o) ? " (" + spRiskDet(o) + ")" : "") + ".";
  try {
    const a = await spDraft({ kind: "custom", ask: fact + " Write a timely alert post for apple growers in these areas: what this weather can do to their trees this week and what to check or do now. Calm and practical; say it is a forecast risk, not certain. For any spray only say follow the state spray schedule for the current stage and the label." });
    const p = (a.drafts || [])[0];
    const soon = Date.now() + 60 * 60000, eve = Date.parse(spEvening(0)) - 30 * 60000;   /* this evening 7 pm, or in an hour if that has passed */
    if (p) { try { await qUpd(p.id, { post_at: new Date(Math.max(soon, eve)).toISOString() }); } catch (e) {} }
    await spDraft({ kind: "wamsg", ask: fact + " A short alert message for apple grower WhatsApp groups in these areas: what to watch for and do this week. Calm, practical, it is a forecast risk." });
    await mkSave("wx:last:" + k, { done: true, value: spIstDate() });
    SP.wxMsg = esc(tr("wx_made").replace("{d}", mkDay(spIstDate())));
  } catch (e) { SP.wxMsg = '<span class="mkwarn">' + esc(String(e.message || e)) + "</span>"; }
  SP.wxBusy = ""; await loadQ();
}
async function spWxAutoRun() {
  if (SP.wxRan || !SP.wx || !mkQ || mkQErr || !spWxAuto()) return;
  SP.wxRan = true;
  for (const o of spRisks()) { if (!spWxRecent(o.k)) await spWxDraft(o.k, true); }
}

/* =================== 1. Make my week =================== */
const spWeekItems = () => (mkQ || []).filter(x => x.status === "draft" && Date.parse(x.post_at || 0) < Date.now() + 9 * 864e5).sort((a, b) => Date.parse(a.post_at) - Date.parse(b.post_at));
const spPlanned = () => (mkQ || []).filter(x => (x.status === "draft" || x.status === "scheduled") && (qKind(x) === "post" || qKind(x) === "video") && Date.parse(x.post_at) > Date.now() && Date.parse(x.post_at) < Date.now() + 7 * 864e5).length;
function spWeekHtml() {
  const W = SP.wk, dis = W.busy ? " disabled" : "";
  let h = '<section class="spbox spweek" id="spWeek"><div class="mkph"><b>' + tr("wk_h") + "</b></div><p class=\"fine\">" + tr("wk_p") + "</p>" +
    '<div class="mkrow"><select class="mkin mksel" id="spWkPosts" aria-label="' + esc(tr("wk_posts")) + '"' + dis + ">" + [3, 5].map(n => '<option value="' + n + '"' + (n === W.nPosts ? " selected" : "") + ">" + n + " " + tr("wk_posts") + "</option>").join("") + "</select>" +
    '<select class="mkin mksel" id="spWkVids" aria-label="' + esc(tr("wk_vids")) + '"' + dis + ">" + [0, 1, 2].map(n => '<option value="' + n + '"' + (n === W.nVids ? " selected" : "") + ">" + tr("wk_v" + n) + "</option>").join("") + "</select>" +
    '<label class="chk"><input type="checkbox" id="spWkWa"' + (W.wa ? " checked" : "") + dis + "><span>" + tr("wk_wa") + "</span></label>" +
    (W.nVids ? '<label class="chk"><input type="checkbox" id="spWkYt"' + (W.yt ? " checked" : "") + dis + "><span>" + tr("wk_yt") + "</span></label>" : "") + "</div>" +
    '<div class="mkrow"><button type="button" class="btn-s add" data-sp="weekgo"' + (W.busy || mkQErr ? " disabled" : "") + ">" + tr(W.busy ? "wk_busy" : "wk_go") + "</button></div>" +
    (W.nVids ? '<p class="fine">' + tr("wk_vnote") + "</p>" : "");
  if (W.steps.length) h += '<ul class="mkwatch spsteps">' + W.steps.map(s => "<li>" + (s.s === "ok" ? "✓ " : s.s === "err" ? "✗ " : "… ") + esc(s.t) + (s.m ? ' <span class="fine mkwarn">' + esc(s.m) + "</span>" : "") + "</li>").join("") + "</ul>";
  if (W.msg) h += '<p class="fine" role="status">' + esc(W.msg) + "</p>";
  /* the review: everything waiting for the coming week, on one screen */
  const I = spWeekItems();
  h += '<div class="sprev"><p><b>' + tr("wk_rev_h") + "</b></p>";
  if (!I.length) h += '<p class="fine">' + tr("wk_rev_none") + "</p>";
  else {
    h += '<p class="fine">' + tr("wk_rev_p") + '</p><ul class="mkwatch">' + I.map(x => {
      const wa = qKind(x) === "wa", body = qHasBody(x), tick = !wa && body;
      return "<li>" + (tick ? '<label class="chk"><input type="checkbox" data-sprev="' + x.id + '"' + (SP.unt.has(String(x.id)) ? "" : " checked") + "><span></span></label> " : "") + qTag(x) + " " +
        esc(qShow(x.post_at)) + " · " + esc(x.topic || String(x.text || "").slice(0, 60)) +
        (wa ? ' <span class="fine">(' + tr("wk_rev_wa") + ")</span>" : qKind(x) === "post" && !x.image_url ? ' <span class="fine">(' + tr("wk_rev_nophoto") + ")</span>" : "") +
        ' <button class="link" type="button" data-sp="edit" data-id="' + x.id + '" data-tab="' + (mkNewView() ? "today" : qTab(x)) + '">' + tr("wk_edit") + "</button></li>";
    }).join("") + "</ul>";
    const n = I.filter(x => qKind(x) !== "wa" && qHasBody(x) && !SP.unt.has(String(x.id))).length;
    if (n) h += '<div class="mklinks"><button type="button" class="btn-s add" data-sp="revgo"' + (W.busy ? " disabled" : "") + ">" + tr("wk_rev_go").replace("{n}", n) + "</button></div>";
  }
  if (SP.revMsg) h += '<p class="fine" role="status">' + esc(SP.revMsg) + "</p>";
  return h + "</div></section>";
}
async function spWeekGo() {
  const W = SP.wk; if (W.busy) return;
  W.busy = true; W.msg = ""; W.steps = []; SP.revMsg = ""; spSaveWk();
  const step = t => { const s = { t, s: "run", m: "" }; W.steps.push(s); renderMk(); return s; };
  try {
    const s1 = step(tr("wk_s_posts").replace("{n}", W.nPosts));
    await spDraft({ n: W.nPosts }); s1.s = "ok";
    if (W.wa) { const s2 = step(tr("wk_s_wa")); try { await spDraft({ kind: "wa" }); s2.s = "ok"; } catch (e) { s2.s = "err"; s2.m = String(e.message || e); } }
    await loadQ();
    /* videos: made one after the other by "Create a video for me" (autovid.js), then put on their own days */
    if (W.nVids && typeof avCreate === "function" && typeof AV !== "undefined") {
      if (mkNewView()) { if (!(mkSub === "create" && mkMake === "video")) { mkMake = "video"; mkGo("create"); } }
      else { if (mkSub !== "fb") mkGo("fb"); if (typeof mkFbVid !== "undefined" && !mkFbVid) { mkFbVid = true; renderMk(); } }
      AV.oneTap = true;
      const keep = JSON.stringify(AV), risk = spRisks()[0];
      const recent = (mkQ || []).map(x => String(x.topic || "").toLowerCase());
      const feats = ((AV_TOPICS.feat || {}).en || []).filter(t => recent.indexOf(t.toLowerCase()) < 0);
      const plan = [risk ? { type: "alert", topic: T.en["wx_r_" + risk.k] + " in " + risk.areas.slice(0, 3).join(", ") } : { type: "season", topic: null },
        { type: "feat", topic: feats.length ? feats[Math.floor(Math.random() * feats.length)] : "Check a disease from one photo" }].slice(0, W.nVids);
      const days = [2, 6];
      for (let i = 0; i < plan.length; i++) {
        const p = plan[i];
        Object.assign(AV, { type: p.type, own: "", lang: mkQLang === "hi" ? "hi" : mkQLang === "en" ? "en" : "hn", len: "m", fmt: "916", pics: "draw", photos: [], end: i ? "dx" : "site", after: "fb", err: "", note: "" });
        AV.topic = p.topic || (avTopics() || [])[0] || "Orchard jobs this month";
        const s = step(tr("wk_s_vid").replace("{i}", i + 1).replace("{t}", AV.topic));
        if (typeof VS !== "undefined") VS.out = null;
        await avCreate();
        const qid = typeof VS !== "undefined" && VS.out && VS.out.qid;
        if (AV.err || !qid) { s.s = "err"; s.m = AV.err ? AV.err.replace(/^.*?:\s*/, "") : tr("vs_q_webm"); continue; }
        try { await qUpd(qid, { post_at: spEvening(days[i]), topic: String(AV.topic).slice(0, 200) }); } catch (e) {}
        s.s = "ok";
        /* the same video as a YouTube Short, published by YouTube on its day */
        if (W.yt && typeof ytUpload === "function" && typeof YT !== "undefined" && YT && YT.connected && YTU) {
          const y = step(tr("wk_s_yt").replace("{i}", i + 1));
          YTU.at = new Date(Date.parse(spEvening(days[i])) + 330 * 60000).toISOString().slice(0, 16);
          const r = await ytUpload();
          if (r && r.ok) { y.s = "ok"; if (r.locked) y.m = tr("wk_yt_lock"); } else { y.s = "err"; y.m = (r && r.err) || ""; }
        }
      }
      AV.oneTap = false;
      try { const o = JSON.parse(keep); ["type", "topic", "own", "lang", "voice", "len", "fmt", "pics", "end", "after"].forEach(k => { AV[k] = o[k]; }); AV.step = ""; avSave(); avRender(); } catch (e) {}
    }
    W.msg = tr("wk_done");
  } catch (e) { W.msg = tr("wk_err").replace("{m}", String(e.message || e)); W.steps.forEach(s => { if (s.s === "run") s.s = "err"; }); }
  W.busy = false; SP.unt.clear();
  await loadQ();
  const el = $("spWeek"); if (el) el.scrollIntoView({ block: "start", behavior: "smooth" });
}
async function spRevGo() {
  const I = spWeekItems().filter(x => qKind(x) !== "wa" && qHasBody(x) && !SP.unt.has(String(x.id)));
  let n = 0;
  for (const x of I) { try { await qUpd(x.id, qApprovePatch(x)); n++; } catch (e) { SP.revMsg = tr("mk_q_err").replace("{m}", String(e.message || e)); } }
  if (n) SP.revMsg = tr("wk_rev_ok").replace("{n}", n);
  renderMk();
}

/* =================== 2. WhatsApp groups =================== */
const spGroups = () => { try { const v = JSON.parse((MK["wag:list"] && MK["wag:list"].value) || "[]"); return Array.isArray(v) ? v : []; } catch (e) { return []; } };
async function spSetGroups(G) { const ok = await mkSave("wag:list", { done: true, value: JSON.stringify(G).slice(0, 7900) }); SP.gErr = ok ? "" : tr("wg_save_err"); return ok; }
const spGLink = g => "https://sebsaathi.com/?src=wa-g" + g.id;
/* a group's own visitors and sign-ups: its group link (wa-g<id>) and every message sent to it (wa-p<msg>-g<id>) */
function spGNums(g) {
  const o = { vis: 0, sign: 0 }, s = "-g" + g.id;
  ((mkSt && mkSt.sources) || []).forEach(z => { const c = String(z.src || ""); if (c === "wa-g" + g.id || (c.indexOf("wa-p") === 0 && c.slice(-s.length) === s)) { o.vis += +z.visitors || 0; o.sign += +z.n_all || 0; } });
  return o;
}
function spGroupsHtml() {
  const G = spGroups();
  let h = '<p class="fine">' + tr("wg_p") + "</p>";
  if (!G.length) h += '<p class="fine">' + tr("wg_none") + "</p>";
  else h += '<div class="tablewrap"><table class="ledger"><thead><tr><th scope="col">' + tr("wg_c_group") + '</th><th scope="col" class="n">' + tr("wg_c_vis") + '</th><th scope="col" class="n">' + tr("wg_c_sign") + '</th><th scope="col">' + tr("wg_c_last") + "</th><th></th></tr></thead><tbody>" +
    G.map(g => { const n = spGNums(g); return "<tr><td><b>" + esc(g.name) + "</b>" + (g.area || g.size ? '<br><span class="fine">' + esc([g.area, g.size ? g.size + " " + tr("wg_size").toLowerCase() : ""].filter(Boolean).join(" · ")) + "</span>" : "") +
      '</td><td class="n">' + mkN(n.vis) + '</td><td class="n"><b>' + mkN(n.sign) + "</b></td><td>" + (g.last ? esc(mkDay(String(g.last).slice(0, 10))) + (g.n ? " (" + g.n + ")" : "") : tr("wg_never")) +
      '</td><td><button class="btn-s sm" type="button" data-sp="gcopy" data-g="' + g.id + '">' + tr(SP.gCopied === g.id ? "wg_copied" : "wg_copy") + '</button> <button class="btn-s sm" type="button" data-sp="gdel" data-g="' + g.id + '">' + tr(SP.gDel === g.id ? "wg_del_sure" : "wg_del") + "</button></td></tr>"; }).join("") + "</tbody></table></div>";
  h += '<div class="mkrow spgadd"><input class="mkin" id="spGName" maxlength="60" placeholder="' + esc(tr("wg_name")) + '" value="' + esc(SP.gf.name) + '">' +
    '<input class="mkin" id="spGArea" maxlength="40" placeholder="' + esc(tr("wg_area")) + '" value="' + esc(SP.gf.area) + '">' +
    '<input class="mkin spgsize" id="spGSize" type="number" min="0" max="100000" inputmode="numeric" placeholder="' + esc(tr("wg_size")) + '" value="' + esc(SP.gf.size) + '">' +
    '<button class="btn-s add" type="button" data-sp="gadd">' + tr("wg_add") + "</button></div>" + (SP.gErr ? '<p class="autherr" role="alert">' + esc(SP.gErr) + "</p>" : "");
  return h;
}
/* on each WhatsApp message: one button per group, each with that group's own link */
function spGroupChips(x) {
  const G = spGroups(); if (!G.length) return '<p class="fine">' + tr("wg_status") + "</p>";
  const base = qWaText(x), tag = "src=wa-p" + x.id;
  return '<div class="mklinks spgchips"><span class="fine">' + tr("wg_send") + "</span>" + G.map(g =>
    '<a class="btn-s sm wa" target="_blank" rel="noopener" data-spg="' + g.id + '" href="https://wa.me/?text=' + encodeURIComponent(base.split(tag).join(tag + "-g" + g.id)) + '">' + esc(g.name) + "</a>").join("") + '</div><p class="fine">' + tr("wg_status") + "</p>";
}
/* a video from the list → WhatsApp chat or Status (the file itself on phones; else its link) */
/* phones that can hand a file to WhatsApp: the first tap fetches the video, the second shares it (sharing must follow a tap straight away) */
const spCanFile = (() => { try { return !!(navigator.canShare && navigator.canShare({ files: [new File([""], "x.mp4", { type: "video/mp4" })] })); } catch (e) { return false; } })();
const spVidText = x => (x.topic ? x.topic + "\n" : "") + "👉 https://sebsaathi.com/?src=wa-p" + x.id;
SP.vidFiles = {};
function spWaVidBtn(x) {
  if (!x.video_url) return "";
  if (!spCanFile) return '<a class="btn-s wa" target="_blank" rel="noopener" title="' + esc(tr("wv_fallback")) + '" href="https://wa.me/?text=' + encodeURIComponent(spVidText(x) + "\n🎬 " + x.video_url) + '">' + tr("wv_go") + "</a>";
  const id = String(x.id), ready = !!SP.vidFiles[id];
  return '<button class="btn-s' + (ready ? " add" : "") + '" type="button" data-sp="wavid" data-id="' + x.id + '"' + (SP.vidBusy === id ? " disabled" : "") + ">" + tr(SP.vidBusy === id ? "wv_busy" : ready ? "wv_ready" : "wv_go") + "</button>";
}
async function spWaVid(id) {
  const x = qGet(id); if (!x || !x.video_url || SP.vidBusy) return;
  const f = SP.vidFiles[String(id)];
  if (f) { try { await navigator.share({ files: [f], text: spVidText(x) }); } catch (e) { if (!e || e.name !== "AbortError") mkQMsg = String(e.message || e); renderMk(); } return; }
  SP.vidBusy = String(id); renderMk();
  try {
    const b = await (await fetch(x.video_url)).blob();
    SP.vidFiles[String(id)] = new File([b], "seb-saathi-" + x.id + (/webm/.test(b.type) ? ".webm" : ".mp4"), { type: b.type || "video/mp4" });
  } catch (e) { mkQMsg = tr("mk_q_err").replace("{m}", String(e.message || e)); }
  SP.vidBusy = ""; renderMk();
}

/* =================== 4. What brings growers in =================== */
async function spLoadHist() {
  if (SP.histBusy || SP.hist || mkQErr) return;
  SP.histBusy = true;
  try {
    const r = await sb.from("social_queue").select("id,kind,topic,text,post_at,status,result,fb,ig").eq("status", "posted").gte("post_at", new Date(Date.now() - 180 * 864e5).toISOString()).order("post_at", { ascending: false }).limit(300);
    SP.hist = r.error ? [] : (r.data || []);
  } catch (e) { SP.hist = []; }
  SP.histBusy = false; renderMk();
}
function spWinsHtml() {
  const by = {}; (mkQ || []).concat(SP.hist || []).forEach(x => { if (x.status === "posted") by[x.id] = by[x.id] || x; });
  const rows = Object.values(by).map(x => ({ x, n: qNums(x) }));
  const S = (mkSt && mkSt.sources) || [], ch = { fb: 0, wa: 0, yt: 0, ig: 0, invite: 0, other: 0 };
  S.forEach(z => { const c = String(z.src || ""), head = c.split("-")[0]; if (/^(unknown|none)$/.test(c)) return; const k = ch[head] != null ? head : "other"; ch[k] += +z.n30 || 0; });
  let h = '<p class="fine">' + tr("wn_p") + "</p>" +
    "<p><b>" + tr("wn_by") + "</b> " + [["fb", "Facebook"], ["wa", "WhatsApp"], ["yt", "YouTube"], ["ig", "Instagram"], ["invite", tr("src_l_invite") || "Invites"], ["other", tr("wn_other")]].map(c => esc(c[1]) + " <b>" + mkN(ch[c[0]]) + "</b>").join(" · ") + "</p>";
  /* which kind of item brings the most */
  const kinds = {}; rows.forEach(r => { const k = qKind(r.x); (kinds[k] = kinds[k] || { n: 0, s: 0 }); kinds[k].n++; kinds[k].s += r.n.sign; });
  const kl = Object.keys(kinds).filter(k => kinds[k].n >= 2).map(k => tr("cq_k_" + k) + " " + (kinds[k].s / kinds[k].n).toFixed(1));
  if (kl.length) h += '<p class="fine">' + esc(tr("wn_kind").replace("{t}", kl.join(" · "))) + "</p>";
  const top = rows.filter(r => r.n.sign || r.n.vis).sort((a, b) => b.n.sign - a.n.sign || b.n.vis - a.n.vis || (b.n.reach || 0) - (a.n.reach || 0)).slice(0, 15);
  if (!top.length) h += '<p class="fine">' + tr("wn_none") + "</p>";
  else h += '<div class="tablewrap"><table class="ledger"><thead><tr><th scope="col">' + tr("wn_c_what") + '</th><th scope="col" class="n">' + tr("wn_c_sign") + '</th><th scope="col" class="n">' + tr("wn_c_vis") + '</th><th scope="col" class="n">' + tr("wn_c_reach") + "</th></tr></thead><tbody>" +
    top.map(r => "<tr><td>" + qTag(r.x) + " " + esc(String(r.x.topic || r.x.text || "").slice(0, 60)) + '<br><span class="fine">' + esc(qShow(r.x.post_at)) + '</span></td><td class="n"><b>' + mkN(r.n.sign) + '</b></td><td class="n">' + mkN(r.n.vis) + '</td><td class="n">' + (r.n.reach == null ? "–" : mkN(r.n.reach)) + "</td></tr>").join("") + "</tbody></table></div>";
  return h + '<p class="fine">' + tr("wn_ig") + "</p>";
}
function spWinsSub() {
  const n = ((mkSt && mkSt.sources) || []).filter(z => /^(fb|wa|yt|ig)(-|$)/.test(String(z.src || ""))).reduce((s, z) => s + (+z.n30 || 0), 0);
  return tr("wn_sub").replace("{n}", mkN(n));
}

/* =================== Make & publish to YouTube (one tap) =================== */
function spYpHtml() {
  const Y = SP.yp, conn = typeof YT !== "undefined" && YT && YT.connected, dis = Y.busy ? " disabled" : "";
  return '<section class="spbox spweek" id="spYp"><div class="mkph"><b>' + tr("yp_h") + '</b></div><p class="fine">' + tr("yp_p") + "</p>" +
    '<div class="mkrow"><input class="mkin" id="spYpTopic" maxlength="200" aria-label="' + esc(tr("yp_topic")) + '" placeholder="' + esc(tr("yp_topic_ph")) + '" value="' + esc(Y.topic) + '"' + dis + "></div>" +
    '<label class="fine" for="spYpAt">' + tr("yp_at") + '</label><div class="mkrow"><input class="mkin" id="spYpAt" type="datetime-local" value="' + esc(Y.at) + '"' + dis + ">" +
    '<button type="button" class="btn-s add" data-sp="ypgo"' + (Y.busy || !conn ? " disabled" : "") + ">" + tr(Y.busy ? "yp_busy" : "yp_go") + "</button></div>" +
    (!conn ? '<p class="fine mkwarn">' + tr("yp_conn") + "</p>" : "") + (Y.msg ? '<p class="fine" role="status">' + Y.msg + "</p>" : "") + "</section>";
}
async function spYpGo() {
  const Y = SP.yp; if (Y.busy || typeof avCreate !== "function" || typeof AV === "undefined" || AV.busy) return;
  if (!(typeof YT !== "undefined" && YT && YT.connected)) { Y.msg = '<span class="mkwarn">' + esc(tr("yp_conn")) + "</span>"; renderMk(); return; }
  Y.busy = true; Y.msg = ""; renderMk();
  const keep = { type: AV.type, topic: AV.topic, own: AV.own, after: AV.after };
  const t = Y.topic.trim();
  if (t) Object.assign(AV, { own: t, topic: "" });
  else { AV.type = "season"; AV.own = ""; AV.topic = (avTopics() || [])[0] || "Orchard jobs this month"; }
  AV.after = "yt"; AV.oneTap = true; AV.ytAt = Y.at && Date.parse(Y.at + ":00Z") - 330 * 60000 > Date.now() + 120000 ? Y.at : "";
  if (typeof VS !== "undefined") VS.out = null;
  if (typeof ytLast !== "undefined") ytLast = null;
  avRender();
  await avCreate();
  const r = typeof ytLast !== "undefined" ? ytLast : null;
  if (AV.err) Y.msg = '<span class="mkwarn">' + esc(tr("yp_err").replace("{m}", AV.err.replace(/^.*?:\s*/, ""))) + "</span>";
  else if (r && r.ok) Y.msg = esc(r.locked ? tr("yp_lock") : AV.ytAt ? tr("yp_ok_at").replace("{d}", AV.ytAt.replace("T", " ")) : tr("yp_ok")) +
    (r.link ? ' <a href="' + esc(r.link) + '" target="_blank" rel="noopener">' + tr("yt_watch") + "</a>" : "");
  else Y.msg = '<span class="mkwarn">' + esc(tr("yp_err").replace("{m}", (r && r.err) || AV.note || "")) + "</span>";
  Object.assign(AV, keep); AV.ytAt = ""; AV.oneTap = false; avSave(); avRender();
  Y.busy = false; if (!AV.err && r && r.ok) { Y.topic = ""; Y.at = ""; }
  renderMk();
  const el = $("spYp"); if (el) el.scrollIntoView({ block: "start", behavior: "smooth" });
}

/* =================== drawing it into the Social handler =================== */
function spDraw() {
  const top = $("mkTop"), bot = $("mkBot"); if (!top || !bot) return;
  const ins = (ref, where, html) => { if (ref) ref.insertAdjacentHTML(where, html); return !!ref; };
  /* weather, on every tab, right under Today */
  ins(top.querySelector(".mktoday"), "afterend", spWxHtml());
  /* Today: a nudge when next week isn't planned (Friday to Monday) */
  const dow = new Date(Date.now() + 330 * 60000).getUTCDay();
  if (mkQ && !mkQErr && [5, 6, 0, 1].indexOf(dow) >= 0 && spPlanned() < 3 && !SP.wk.busy)
    ins(top.querySelector(".mktoday"), "beforeend", '<div class="mklinks"><span class="fine">' + tr("wk_today") + '</span><button type="button" class="btn-s add" data-sp="weekjump">' + tr("wk_today_go") + "</button></div>");
  if (mkSub === "create") {
    const mk = top.querySelector(".mkmake");
    if (mkMake === "week" || SP.wk.busy) ins(mk, "afterend", spWeekHtml());
    else if (mkMake === "video") ins(mk, "afterend", spYpHtml());
  } else if (mkSub === "results") {
    ins(top.querySelector(".mksub"), "afterend", mkSec("wins", tr("wn_h"), spWinsSub(), spWinsHtml()));
    spLoadHist();
  } else if (mkSub === "settings") {
    const G = spGroups(), s = G.reduce((a, g) => a + spGNums(g).sign, 0);
    const sec = mkSec("wag", tr("wg_h"), tr("wg_sub").replace("{n}", G.length).replace("{s}", mkN(s)), spGroupsHtml());
    if (!ins(top.querySelector('[data-mksec="setup"]'), "afterend", sec)) top.insertAdjacentHTML("beforeend", sec);
  } else if (mkSub === "fb") {
    ins(top.querySelector(".mksub"), "afterend", spWeekHtml());
    const best = bot.querySelector('[data-mksec="best"]');
    const sec = mkSec("wins", tr("wn_h"), spWinsSub(), spWinsHtml());
    if (!ins(best, "beforebegin", sec)) bot.insertAdjacentHTML("beforeend", sec);
    spLoadHist();
  } else if (mkSub === "yt") {
    ins(top.querySelector(".mksub"), "afterend", spYpHtml());
  } else if (mkSub === "wa") {
    const G = spGroups(), s = G.reduce((a, g) => a + spGNums(g).sign, 0);
    const sec = mkSec("wag", tr("wg_h"), tr("wg_sub").replace("{n}", G.length).replace("{s}", mkN(s)), spGroupsHtml());
    const tips = top.querySelector('[data-mksec="watips"]');
    if (!ins(tips, "afterend", sec)) top.insertAdjacentHTML("beforeend", sec);
  }
  if (!SP.wxRan && SP.wx && mkQ) setTimeout(spWxAutoRun, 0);
}
mkOpen.add("wag"); mkOpen.add("wins");
const spRM0 = renderMk;
renderMk = function () {
  spRM0.apply(this, arguments);
  try { spDraw(); } catch (e) { console.error("social-plus", e); }
};
spLoadWx().then(() => renderMk());

/* ---------- taps and typing ---------- */
document.addEventListener("click", async e => {
  const g = e.target.closest && e.target.closest("a[data-spg]");
  if (g) {   /* a message sent to a group: remember when */
    const G = spGroups(), x = G.find(y => String(y.id) === g.dataset.spg);
    if (x) { x.last = new Date().toISOString(); x.n = (+x.n || 0) + 1; spSetGroups(G); }
    return;
  }
  const b = e.target.closest && e.target.closest("[data-sp]"); if (!b) return;
  const a = b.dataset.sp;
  if (a === "weekgo") { spWeekGo(); return; }
  if (a === "ypgo") { spYpGo(); return; }
  if (a === "weekjump") { if (mkNewView()) mkGoMake("week"); else mkGo("fb"); const el = $("spWeek"); if (el) el.scrollIntoView({ block: "start", behavior: "smooth" }); return; }
  if (a === "revgo") { spRevGo(); return; }
  if (a === "edit") {
    mkOpen.add("content"); mkOpen.add("watips"); mkGo(b.dataset.tab || "fb");
    setTimeout(() => { const t = document.querySelector('[data-qf="text"][data-id="' + b.dataset.id + '"]'); if (t) { t.scrollIntoView({ block: "center", behavior: "smooth" }); t.focus(); } }, 50);
    return;
  }
  if (a === "wxauto") { await mkSave("wx:auto", { done: true, value: spWxAuto() ? "off" : "on" }); renderMk(); return; }
  if (a === "wxdraft") { spWxDraft(b.dataset.k); return; }
  if (a === "wavid") { spWaVid(b.dataset.id); return; }
  if (a === "gadd") {
    const name = SP.gf.name.trim(); if (!name) { const i = $("spGName"); if (i) i.focus(); return; }
    const G = spGroups(), id = G.reduce((m, y) => Math.max(m, +y.id || 0), 0) + 1;
    G.push({ id, name: name.slice(0, 60), area: SP.gf.area.trim().slice(0, 40), size: Math.max(0, Math.min(100000, Math.round(+SP.gf.size || 0))) || "", last: "", n: 0 });
    if (await spSetGroups(G)) SP.gf = { name: "", area: "", size: "" };
    renderMk(); return;
  }
  if (a === "gdel") {
    const id = +b.dataset.g;
    if (SP.gDel !== id) { SP.gDel = id; renderMk(); return; }
    SP.gDel = null; await spSetGroups(spGroups().filter(y => +y.id !== id)); renderMk(); return;
  }
  if (a === "gcopy") {
    const x = spGroups().find(y => +y.id === +b.dataset.g); if (!x) return;
    try { await navigator.clipboard.writeText(spGLink(x)); SP.gCopied = x.id; } catch (err) { window.prompt(tr("wg_copy"), spGLink(x)); }
    renderMk(); setTimeout(() => { SP.gCopied = null; renderMk(); }, 2500);
  }
});
document.addEventListener("input", e => {
  const t = e.target; if (!t || !t.id) return;
  if (t.id === "spYpTopic") { SP.yp.topic = t.value; return; }
  if (t.id === "spGName") SP.gf.name = t.value; else if (t.id === "spGArea") SP.gf.area = t.value; else if (t.id === "spGSize") SP.gf.size = t.value;
});
document.addEventListener("change", e => {
  const t = e.target; if (!t) return;
  if (t.dataset && t.dataset.sprev) { if (t.checked) SP.unt.delete(t.dataset.sprev); else SP.unt.add(t.dataset.sprev); renderMk(); return; }
  if (t.id === "spWkPosts") { SP.wk.nPosts = +t.value; spSaveWk(); }
  else if (t.id === "spWkVids") { SP.wk.nVids = +t.value; spSaveWk(); renderMk(); }
  else if (t.id === "spWkWa") { SP.wk.wa = t.checked; spSaveWk(); }
  else if (t.id === "spWkYt") { SP.wk.yt = t.checked; spSaveWk(); }
  else if (t.id === "spYpAt") { SP.yp.at = t.value; }
});
