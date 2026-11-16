/* Seb Saathi admin — "Create a video for me": choose a few options, and the video is made for you.
   1. The AI writes the scenes, the voice-over lines and picks a drawn picture for each scene (/api/social?fn=draft, kind "autovideo")
   2. A Hindi or English voice reads it (/api/social?fn=tts, Google Text-to-Speech; skipped if not set up)
   3. The Video Studio below draws and records it (studio.js + vsart.js), then it can go to Facebook/Instagram or YouTube.
   Sits at the top of the Video Studio (Social handler → YouTube & videos). */
Object.assign(T.en, {
  av_h: "🎬 Create a video for me", av_p: "Pick a topic and tap Create video. Keep this tab open while it records.",
  av_type: "1. What kind of video?", av_t_alert: "Disease alert", av_t_tip: "Orchard tip", av_t_season: "This month's jobs", av_t_feat: "Show a Seb Saathi feature", av_t_money: "Profit and selling", av_t_q: "Answer growers' questions", av_t_own: "My own topic", av_t_idea: "💡 My video ideas",
  av_topic: "2. Topic", av_topic_ph: "Or type your own topic, e.g. \"How to spot scab early after rain\"", av_q_load: "Loading what growers ask Saathi…", av_q_none: "No Saathi questions yet — type a topic.",
  av_lang: "3. Language", av_voice: "4. Voice-over", av_v_f: "Woman's voice", av_v_m: "Man's voice", av_v_no: "No voice",
  av_len: "5. Length", av_l_s: "Short ~20 sec (3 scenes)", av_l_m: "Medium ~30 sec (4–5 scenes)", av_l_l: "Long ~45 sec (6 scenes)",
  av_size: "6. Size", av_pics: "7. Pictures", av_p_draw: "Drawn pictures (built in)", av_p_mine: "My photos", av_p_add: "Choose photos", av_p_n: "{n} photos chosen — used in order, drawings fill the rest.",
  av_end: "8. Ending", av_e_site: "Visit sebsaathi.com", av_e_dx: "Try the free disease check", av_e_share: "Share with grower friends", av_e_join: "Join free today",
  av_after: "9. When it's ready", av_a_none: "Just show me", av_a_fb: "Add to Facebook + Instagram list", av_a_yt: "Upload to YouTube as a Short",
  av_go: "🎬 Create video", av_again: "Make another version",
  av_s1: "Writing the video…", av_s2: "Recording the voice…", av_s3: "Getting pictures ready…", av_s4: "Making the video — keep this tab open and in front…", av_s5: "✓ Video ready below. Watch it, then download, post or upload.",
  av_s_fb: "Adding it to the Facebook + Instagram list…", av_s_yt: "Uploading to YouTube…", av_s_ythold: "Putting the YouTube Short in Today for your OK…", av_yt_held: "YouTube Short: waiting for your OK in Today.",
  av_need_topic: "Pick a topic or type one.", av_err: "Could not make it: {m}",
  av_brief: "Your brief (optional)", av_brief_p: "Fill only what you need. The AI follows it exactly.",
  av_must: "Must-say points", av_must_ph: "One per line, e.g. \"Check leaves within 2 days of rain\"",
  av_facts: "Facts to get exactly right", av_facts_ph: "Doses, dates, places, numbers. Used exactly as you write them, nothing made up.",
  av_lines: "My own lines (spoken word for word)", av_lines_ph: "One line per row. Each one is spoken exactly as written, in this order.",
  av_style: "Style", av_st_: "AI chooses", av_st_alert: "Serious alert", av_st_friend: "Friendly neighbour", av_st_story: "Story", av_st_fun: "Funny", av_st_expert: "Expert", av_style_ph: "Anything else about the style, e.g. \"talk like an old bagwan, slow and calm\"",
  av_opts: "Settings", av_check: "Let me check the script before the video is made", av_music: "Background music", av_mu_auto: "Yes, to suit the video", av_mu_none: "No music",
  av_sc_h: "Check the script", av_sc_p: "Read every line and change anything. Nothing is voiced or made until you tap Make video.",
  av_sc_title: "Video title", av_sc_n: "Scene {n}", av_sc_screen: "Words on screen", av_sc_sub: "Second line on screen", av_sc_say: "Spoken", av_sc_end: "End card", av_sc_cta: "Words on the end card", av_sc_cta_say: "Spoken at the end",
  av_sc_up: "Move up", av_sc_del: "Remove scene", av_sc_make: "🎬 Make video from this script", av_sc_redo: "Write it again", av_sc_drop: "Start over", av_sc_ready: "Script ready below: check it, then tap Make video.",
  av_sc_empty: "Every scene needs words on screen.",
  av_no_tts: "Made without a voice: the voice is not set up yet. To add it, put GOOGLE_TTS_KEY in Vercel (a Google Cloud API key with Text-to-Speech turned on), then Redeploy.",
  av_tts_err: "Made without a voice: Google Text-to-Speech said: {m}", av_where: "9. Where should it go?", av_where_p: "Each ticked place gets its own caption. Everything waits in Today for your OK; for YouTube you choose Public, Unlisted or Private there.",
  av_yt_first: "Connect your YouTube channel (YouTube Studio box above) to upload. The video is ready below.",
  av_edit: "You can still change any words, pictures or timings below and tap Make video again."
});
Object.assign(T.hi, {
  av_h: "🎬 मेरे लिए वीडियो बनाएँ", av_p: "विषय चुनें और \"वीडियो बनाएँ\" दबाएँ। बनते समय यह टैब खुला रखें।",
  av_type: "1. कैसा वीडियो?", av_t_alert: "बीमारी चेतावनी", av_t_tip: "बाग़ की सलाह", av_t_season: "इस महीने के काम", av_t_feat: "सेब साथी की सुविधा दिखाएँ", av_t_money: "मुनाफ़ा और बिक्री", av_t_q: "बाग़वानों के सवालों के जवाब", av_t_own: "मेरा अपना विषय", av_t_idea: "💡 मेरे वीडियो आइडिया",
  av_topic: "2. विषय", av_topic_ph: "या अपना विषय लिखें", av_q_load: "साथी से पूछे सवाल लोड हो रहे हैं…", av_q_none: "अभी कोई सवाल नहीं — विषय लिखें।",
  av_lang: "3. भाषा", av_voice: "4. आवाज़", av_v_f: "महिला की आवाज़", av_v_m: "पुरुष की आवाज़", av_v_no: "आवाज़ नहीं",
  av_len: "5. लंबाई", av_l_s: "छोटा ~20 सेकंड", av_l_m: "मध्यम ~30 सेकंड", av_l_l: "लंबा ~45 सेकंड",
  av_size: "6. साइज़", av_pics: "7. चित्र", av_p_draw: "बने हुए चित्र", av_p_mine: "मेरी फ़ोटो", av_p_add: "फ़ोटो चुनें", av_p_n: "{n} फ़ोटो चुनीं — क्रम से लगेंगी, बाकी में चित्र।",
  av_end: "8. आख़िर में", av_e_site: "sebsaathi.com पर आएँ", av_e_dx: "मुफ़्त बीमारी जाँच करें", av_e_share: "बाग़वान दोस्तों से शेयर करें", av_e_join: "आज ही मुफ़्त जुड़ें",
  av_after: "9. बनने के बाद", av_a_none: "बस मुझे दिखाएँ", av_a_fb: "Facebook + Instagram सूची में जोड़ें", av_a_yt: "YouTube पर Short अपलोड करें",
  av_go: "🎬 वीडियो बनाएँ", av_again: "दूसरा रूप बनाएँ",
  av_s1: "वीडियो लिखा जा रहा है…", av_s2: "आवाज़ रिकॉर्ड हो रही है…", av_s3: "चित्र तैयार हो रहे हैं…", av_s4: "वीडियो बन रहा है — टैब खुला और सामने रखें…", av_s5: "✓ वीडियो नीचे तैयार है। देखें, फिर डाउनलोड, पोस्ट या अपलोड करें।",
  av_s_fb: "Facebook + Instagram सूची में जोड़ रहे हैं…", av_s_yt: "YouTube पर अपलोड हो रहा है…", av_s_ythold: "YouTube Short आपकी मंज़ूरी के लिए Today में रख रहे हैं…", av_yt_held: "YouTube Short: Today में आपकी मंज़ूरी का इंतज़ार।",
  av_need_topic: "विषय चुनें या लिखें।", av_err: "नहीं बन सका: {m}",
  av_brief: "आपका ब्रीफ़ (ज़रूरी नहीं)", av_brief_p: "जितना चाहिए उतना भरें। AI इसे पूरा मानेगा।",
  av_must: "ज़रूर कहने वाली बातें", av_must_ph: "हर लाइन में एक, जैसे \"बारिश के 2 दिन में पत्ते जाँचें\"",
  av_facts: "जो बातें बिल्कुल सही चाहिए", av_facts_ph: "मात्रा, तारीख़, जगह, नंबर। जैसे लिखेंगे वैसे ही इस्तेमाल होंगे, कुछ बनाया नहीं जाएगा।",
  av_lines: "मेरी अपनी लाइनें (हूबहू बोली जाएँगी)", av_lines_ph: "हर पंक्ति में एक लाइन। हर लाइन जैसी लिखी वैसी, इसी क्रम में बोली जाएगी।",
  av_style: "अंदाज़", av_st_: "AI चुने", av_st_alert: "गंभीर चेतावनी", av_st_friend: "दोस्ताना पड़ोसी", av_st_story: "कहानी", av_st_fun: "मज़ेदार", av_st_expert: "जानकार", av_style_ph: "अंदाज़ के बारे में और कुछ, जैसे \"पुराने बागवान की तरह, धीरे और शांत\"",
  av_opts: "सेटिंग", av_check: "वीडियो बनने से पहले स्क्रिप्ट मुझे दिखाएँ", av_music: "बैकग्राउंड म्यूज़िक", av_mu_auto: "हाँ, वीडियो के हिसाब से", av_mu_none: "म्यूज़िक नहीं",
  av_sc_h: "स्क्रिप्ट जाँचें", av_sc_p: "हर लाइन पढ़ें और जो चाहें बदलें। 'वीडियो बनाएँ' दबाने तक न आवाज़ बनेगी न वीडियो।",
  av_sc_title: "वीडियो का शीर्षक", av_sc_n: "सीन {n}", av_sc_screen: "स्क्रीन पर शब्द", av_sc_sub: "स्क्रीन पर दूसरी लाइन", av_sc_say: "बोला जाएगा", av_sc_end: "आख़िरी कार्ड", av_sc_cta: "आख़िरी कार्ड के शब्द", av_sc_cta_say: "आख़िर में बोला जाएगा",
  av_sc_up: "ऊपर करें", av_sc_del: "सीन हटाएँ", av_sc_make: "🎬 इस स्क्रिप्ट से वीडियो बनाएँ", av_sc_redo: "फिर से लिखें", av_sc_drop: "शुरू से", av_sc_ready: "स्क्रिप्ट नीचे तैयार है: जाँचें, फिर 'वीडियो बनाएँ' दबाएँ।",
  av_sc_empty: "हर सीन में स्क्रीन पर शब्द चाहिए।",
  av_no_tts: "बिना आवाज़ बना: आवाज़ अभी सेट नहीं है। Vercel में GOOGLE_TTS_KEY डालें, फिर Redeploy करें।", av_tts_err: "बिना आवाज़ बना: {m}",
  av_where: "9. कहाँ जाए?", av_where_p: "हर चुनी जगह के लिए अलग कैप्शन बनता है। सब कुछ Today में आपकी मंज़ूरी का इंतज़ार करता है; YouTube के लिए वहाँ Public, Unlisted या Private चुनें।",
  av_yt_first: "अपलोड के लिए ऊपर YouTube Studio बॉक्स से चैनल जोड़ें। वीडियो नीचे तैयार है।", av_edit: "आप नीचे शब्द, चित्र या समय बदलकर फिर से 'वीडियो बनाएँ' दबा सकते हैं।"
});

const AV_TOPICS = {
  alert: { en: ["Scab risk after rain", "Early leaf fall (Marssonina)", "Mites in hot dry weather", "Collar rot: check the tree base", "Care after hail"], },
  tip: { en: ["Pruning young apple trees", "Feeding trees the right amount", "Getting better colour on fruit", "Picking at the right time", "Protecting trees in winter"] },
  feat: { en: ["Check a disease from one photo", "Real profit per box", "Spray and work diary", "Season sales record: Mandi, Adani, Theka", "Ask Saathi by voice", "Share records with family"] },
  money: { en: ["Mandi vs Adani vs Theka: which pays more?", "Know your real profit per box", "Cutting packing and carriage costs", "Keeping all orchard expenses in one place"] }
};
const AV_THEME = { alert: "alert", tip: "tip", season: "season", feat: "feat", money: "tip", q: "tip", own: "tip" };
const AV_END = { site: "Visit sebsaathi.com, it is free", dx: "Try the free disease check on sebsaathi.com", share: "Share this video with your grower friends", join: "Join Seb Saathi free today at sebsaathi.com" };
const AV = { where: { fb: true, ig: true, wa: true, yt: false }, oneTap: false, type: "alert", topic: "", own: "", lang: "hi", voice: "f", len: "m", fmt: "916", pics: "draw", photos: [], end: "site", after: "none", busy: false, step: "", note: "", err: "", must: "", facts: "", lines: "", style: "", styleOwn: "", check: true, script: null, music: "auto" };
try { const o = JSON.parse(localStorage.getItem("av-opts") || "null"); if (o) { ["type", "lang", "voice", "len", "fmt", "pics", "end", "after", "style", "music"].forEach(k => { if (o[k]) AV[k] = o[k]; }); if (o.check === false) AV.check = false; if (o.where) AV.where = { fb: !!o.where.fb, ig: o.where.ig === undefined ? !!o.where.fb : !!o.where.ig, wa: !!o.where.wa, yt: !!o.where.yt }; } } catch (e) {}
const avSave = () => { try { localStorage.setItem("av-opts", JSON.stringify({ type: AV.type, lang: AV.lang, voice: AV.voice, len: AV.len, fmt: AV.fmt, pics: AV.pics, end: AV.end, after: AV.after, where: AV.where, style: AV.style, music: AV.music, check: AV.check })); } catch (e) {} };

function avQuestions() {   /* top Saathi topics from the AI quality tab (quality.js), loaded when needed */
  if (typeof AQ !== "undefined" && AQ && typeof aqTopic === "function") {
    const cut = Date.now() - 30 * 864e5, by = {};
    AQ.ch.forEach(m => { if (+new Date(m.created_at) < cut) return; const k = aqTopic(String(m.content || "")); if (k === "other" || k === "app") return; by[k] = (by[k] || 0) + 1; });
    return Object.entries(by).sort((a, b) => b[1] - a[1]).slice(0, 6).map(([k, n]) => T.en["aq_tp_" + k] + " (" + n + ")");
  }
  if (typeof loadAq === "function" && typeof AQ !== "undefined" && !AQ && !avQLoad) { avQLoad = true; loadAq().then(() => avRender()); }
  return null;
}
let avQLoad = false;
function avTopics() {
  if (AV.type === "season") { const m = new Date().toLocaleDateString("en-IN", { month: "long" }), n = new Date(Date.now() + 25 * 864e5).toLocaleDateString("en-IN", { month: "long" }); return ["Orchard jobs for " + m, "Get ready for " + n, "Common mistakes in " + m]; }
  if (AV.type === "q") return avQuestions();
  if (AV.type === "own") return [];
  if (AV.type === "idea") return avIdeas().map(v => v.name);
  return (AV_TOPICS[AV.type] || {}).en || [];
}
/* the planned video ideas (Social handler list) that aren't made yet, as topics */
const avIdeas = () => typeof mkViAll === "function" && typeof mkDone === "function" ? mkViAll().filter(v => !mkDone(v.key)).slice(0, 10) : [];
const avChip = (k, v, label) => '<button type="button" class="btn-s sm avchip" data-av="' + k + '" data-v="' + esc(v) + '" aria-pressed="' + (String(AV[k]) === String(v)) + '">' + esc(label) + "</button>";

/* opened from the Facebook + Instagram tab: no YouTube upload choice there, and "Add to Facebook + Instagram list" is the default */
const avFbTab = () => typeof mkSub !== "undefined" && mkSub === "fb";
const avCreateTab = () => typeof mkSub !== "undefined" && mkSub === "create";   /* the new Create tab: "Where should it go?" ticks */
const avTick = (k, label) => '<button type="button" class="btn-s sm avchip" data-avw="' + k + '" aria-pressed="' + !!AV.where[k] + '">' + (AV.where[k] ? "☑ " : "☐ ") + esc(label) + "</button>";
let avFbSet = false;
const avL = t => esc(String(t).replace(/^\d+\.\s*/, ""));
/* the settings folded into one line: what is chosen now */
function avSumm() {
  const L = { hi: "हिंदी", hn: "Hinglish", en: "English" }, out = [L[AV.lang] || AV.lang, tr("av_v_" + AV.voice), AV.music === "none" ? tr("av_mu_none") : "♪",
    tr("av_l_" + AV.len).replace(/\s*\(.*\)$/, ""), tr("vs_f_" + AV.fmt).replace(/\s*\(.*\)$/, ""), tr("av_p_" + AV.pics)];
  return out.join(" · ");
}
function avHtml() {
  if (avFbTab() && !avFbSet) { avFbSet = true; if (AV.after !== "none") AV.after = "fb"; }
  if (avFbTab() && AV.after === "yt") AV.after = "fb";
  const tps = avTopics(), dis = AV.busy ? " disabled" : "";
  return '<div class="avbox"><h5>' + esc(tr("av_h")) + '</h5><p class="fine">' + esc(tr("av_p")) + "</p>" +
    '<fieldset class="avgrp"' + dis + "><legend>" + avL(tr("av_type")) + "</legend><div class=\"avchips\">" + ["alert", "tip", "season", "feat", "money", "q", "idea", "own"].filter(k => k !== "idea" || avIdeas().length).map(k => avChip("type", k, tr("av_t_" + k))).join("") + "</div></fieldset>" +
    '<fieldset class="avgrp"' + dis + "><legend>" + avL(tr("av_topic")) + '</legend><div class="avchips">' +
      (tps === null ? '<span class="fine">' + esc(tr("av_q_load")) + "</span>" : AV.type === "q" && !tps.length ? '<span class="fine">' + esc(tr("av_q_none")) + "</span>" : tps.map(x => avChip("topic", x, x)).join("")) + "</div>" +
      '<input class="avin" id="avOwn" maxlength="200" placeholder="' + esc(tr("av_topic_ph")) + '" value="' + esc(AV.own) + '"></fieldset>' +
    avBriefHtml(dis) +
    '<details class="avfold" data-avd="opts"' + (AV.optsOpen ? " open" : "") + '><summary><b>' + esc(tr("av_opts")) + '</b> <span class="fine">' + esc(avSumm()) + "</span></summary>" +
    '<fieldset class="avgrp"' + dis + "><legend>" + avL(tr("av_lang")) + '</legend><div class="avchips">' + avChip("lang", "hi", "हिंदी") + avChip("lang", "hn", "Hinglish") + avChip("lang", "en", "English") + "</div></fieldset>" +
    '<fieldset class="avgrp"' + dis + "><legend>" + avL(tr("av_voice")) + '</legend><div class="avchips">' + avChip("voice", "f", tr("av_v_f")) + avChip("voice", "m", tr("av_v_m")) + avChip("voice", "no", tr("av_v_no")) + "</div></fieldset>" +
    '<fieldset class="avgrp"' + dis + "><legend>" + avL(tr("av_music")) + '</legend><div class="avchips">' + avChip("music", "auto", tr("av_mu_auto")) + avChip("music", "none", tr("av_mu_none")) + "</div></fieldset>" +
    '<fieldset class="avgrp"' + dis + "><legend>" + avL(tr("av_len")) + '</legend><div class="avchips">' + avChip("len", "s", tr("av_l_s")) + avChip("len", "m", tr("av_l_m")) + avChip("len", "l", tr("av_l_l")) + "</div></fieldset>" +
    '<fieldset class="avgrp"' + dis + "><legend>" + avL(tr("av_size")) + '</legend><div class="avchips">' + avChip("fmt", "916", tr("vs_f_916")) + avChip("fmt", "11", tr("vs_f_11")) + avChip("fmt", "45", tr("vs_f_45")) + "</div></fieldset>" +
    '<fieldset class="avgrp"' + dis + "><legend>" + avL(tr("av_pics")) + '</legend><div class="avchips">' + avChip("pics", "draw", tr("av_p_draw")) + avChip("pics", "mine", tr("av_p_mine")) + "</div>" +
      (AV.pics === "mine" ? '<p><label class="btn-s sm vsfile">' + esc(tr("av_p_add")) + '<input type="file" accept="image/*" multiple id="avPhotos" hidden></label> <span class="fine">' + (AV.photos.length ? esc(tr("av_p_n").replace("{n}", AV.photos.length)) : "") + "</span></p>" : "") + "</fieldset>" +
    '<fieldset class="avgrp"' + dis + "><legend>" + avL(tr("av_end")) + '</legend><div class="avchips">' + ["site", "dx", "share", "join"].map(k => avChip("end", k, tr("av_e_" + k))).join("") + "</div></fieldset>" +
    (avCreateTab() ? ""
      : '<fieldset class="avgrp"' + dis + "><legend>" + avL(tr("av_after")) + '</legend><div class="avchips">' + (avFbTab() ? ["none", "fb"] : ["none", "fb", "yt"]).map(k => avChip("after", k, tr("av_a_" + k))).join("") + "</div></fieldset>") + "</details>" +
    (avCreateTab() ? '<fieldset class="avgrp"' + dis + "><legend>" + avL(tr("av_where")) + '</legend><div class="avchips">' + avTick("fb", "Facebook") + avTick("ig", "Instagram") + avTick("yt", "YouTube") + avTick("wa", "WhatsApp") + '</div><p class="fine">' + esc(tr("av_where_p")) + "</p></fieldset>" : "") +
    '<p><button type="button" class="btn-s add avgo" id="avGo"' + dis + ">" + esc(AV.busy ? AV.step : VS.out && AV.done ? tr("av_again") : tr("av_go")) + "</button></p>" +
    (AV.step && !AV.busy ? '<p class="fine" role="status">' + esc(AV.step) + "</p>" : "") +
    (AV.note ? '<p class="fine">' + esc(AV.note) + "</p>" : "") + (AV.err ? '<p class="autherr" role="alert">' + esc(AV.err) + "</p>" : "") + avScriptHtml() + "</div>";
}
/* the brief: must-say points, exact facts, own lines, style (sent to the AI with the topic) */
const avTa = (id, k, label, ph, rows) => '<label class="fine avlab" for="' + id + '">' + esc(tr(label)) + '</label><textarea class="avin avta" id="' + id + '" data-avb="' + k + '" rows="' + rows + '" maxlength="700" placeholder="' + esc(tr(ph)) + '">' + esc(AV[k]) + "</textarea>";
function avBriefHtml(dis) {
  const used = [AV.must, AV.facts, AV.lines, AV.styleOwn].some(x => String(x || "").trim()) || !!AV.style;
  return '<details class="avfold" data-avd="brief"' + (AV.briefOpen || used ? " open" : "") + '><summary><b>' + esc(tr("av_brief")) + '</b> <span class="fine">' + esc(tr("av_brief_p")) + "</span></summary>" +
    '<fieldset class="avgrp"' + dis + ">" +
    avTa("avMust", "must", "av_must", "av_must_ph", 3) + avTa("avFacts", "facts", "av_facts", "av_facts_ph", 3) + avTa("avLines", "lines", "av_lines", "av_lines_ph", 3) +
    '<span class="fine avlab">' + esc(tr("av_style")) + '</span><div class="avchips">' + ["", "alert", "friend", "story", "fun", "expert"].map(k => avChip("style", k, tr("av_st_" + k))).join("") + "</div>" +
    '<input class="avin" id="avStyleOwn" data-avb="styleOwn" maxlength="200" placeholder="' + esc(tr("av_style_ph")) + '" value="' + esc(AV.styleOwn) + '">' +
    '<p><button type="button" class="btn-s sm avchip" data-avcheck="1" aria-pressed="' + AV.check + '">' + (AV.check ? "☑ " : "☐ ") + esc(tr("av_check")) + "</button></p></fieldset></details>";
}
const avMood = () => AV.style === "alert" || (AV.type === "alert" && !AV.style) ? "alert" : AV.style === "fun" || AV.type === "feat" || AV.type === "money" ? "happy" : "calm";
const AV_STYLE = { alert: "a serious, urgent alert", friend: "a friendly neighbour chatting over the fence", story: "a short story about a grower, with a beginning, a problem and what he did", fun: "light and funny, with a small joke, but the advice stays correct", expert: "a calm expert explaining clearly" };
const avLinesOf = t => String(t || "").split(/\n+/).map(x => x.trim()).filter(Boolean);
function avBriefText() {
  const out = [], must = avLinesOf(AV.must), facts = avLinesOf(AV.facts), lines = avLinesOf(AV.lines);
  if (must.length) out.push("MUST SAY (each point must come through clearly in the screen words or the voice): " + must.map((x, i) => (i + 1) + ") " + x).join(" "));
  if (facts.length) out.push("FACTS FROM THE ADMIN (use exactly as written, same numbers, names and dates; do not change them or add other numbers): " + facts.map((x, i) => (i + 1) + ") " + x).join(" "));
  if (lines.length) out.push("OWN LINES (use each one word for word as a \"say\" line, in this order, one per scene, and write the screen words to match): " + lines.map((x, i) => (i + 1) + ") \"" + x + "\"").join(" "));
  const st = [AV_STYLE[AV.style] || "", String(AV.styleOwn || "").trim()].filter(Boolean).join("; ");
  if (st) out.push("STYLE: " + st + ".");
  return out.join("\n");
}

/* the script check: every scene's screen words and spoken line, editable before anything is voiced or made */
function avScriptHtml() {
  const v = AV.script; if (!v || AV.busy) return "";
  const n = v.scenes.length;
  return '<div class="avscript" id="avScript"><h5>' + esc(tr("av_sc_h")) + '</h5><p class="fine">' + esc(tr("av_sc_p")) + "</p>" +
    '<label class="fine avlab" for="avsTitle">' + esc(tr("av_sc_title")) + '</label><input class="avin" id="avsTitle" data-avs="title" maxlength="90" value="' + esc(v.title) + '">' +
    v.scenes.map((s, i) => '<fieldset class="avsc"><legend>' + esc(tr("av_sc_n").replace("{n}", i + 1)) + "</legend>" +
      '<label class="fine avlab" for="avs' + i + 't">' + esc(tr("av_sc_screen")) + '</label><input class="avin" id="avs' + i + 't" data-avs="' + i + ':title" maxlength="90" value="' + esc(s.title) + '">' +
      '<label class="fine avlab" for="avs' + i + 'u">' + esc(tr("av_sc_sub")) + '</label><input class="avin" id="avs' + i + 'u" data-avs="' + i + ':sub" maxlength="90" value="' + esc(s.sub) + '">' +
      '<label class="fine avlab" for="avs' + i + 's">' + esc(tr("av_sc_say")) + '</label><textarea class="avin avta" id="avs' + i + 's" data-avs="' + i + ':say" rows="2" maxlength="300">' + esc(s.say) + "</textarea>" +
      '<div class="avchips">' + (i ? '<button type="button" class="btn-s sm" data-avsc="up" data-i="' + i + '">↑ ' + esc(tr("av_sc_up")) + "</button>" : "") +
      (n > 1 ? '<button type="button" class="btn-s sm" data-avsc="del" data-i="' + i + '">✕ ' + esc(tr("av_sc_del")) + "</button>" : "") + "</div></fieldset>").join("") +
    '<fieldset class="avsc"><legend>' + esc(tr("av_sc_end")) + "</legend>" +
      '<label class="fine avlab" for="avsCta">' + esc(tr("av_sc_cta")) + '</label><input class="avin" id="avsCta" data-avs="cta" maxlength="80" value="' + esc(v.cta) + '">' +
      '<label class="fine avlab" for="avsCtaSay">' + esc(tr("av_sc_cta_say")) + '</label><textarea class="avin avta" id="avsCtaSay" data-avs="cta_say" rows="2" maxlength="200">' + esc(v.cta_say) + "</textarea></fieldset>" +
    '<div class="avchips"><button type="button" class="btn-s add avgo" data-avsc="make">' + esc(tr("av_sc_make")) + '</button><button type="button" class="btn-s" data-avsc="redo">' + esc(tr("av_sc_redo")) + '</button><button type="button" class="btn-s" data-avsc="drop">' + esc(tr("av_sc_drop")) + "</button></div></div>";
}
function avRender() {
  let box = $("avBox");
  const body = $("vsBody"); if (!body) return;
  if (!box) { box = document.createElement("div"); box.id = "avBox"; body.parentNode.insertBefore(box, body); }
  const f = document.activeElement && document.activeElement.id === "avOwn";
  box.innerHTML = avHtml();
  if (f) { const i = $("avOwn"); i.focus(); i.setSelectionRange(i.value.length, i.value.length); }
}
function avStep(k) { AV.step = tr(k); const b = $("avGo"); if (b) b.textContent = AV.step; }

/* ---------- making it ---------- */
async function avTok() { try { const r = await sb.auth.getSession(); return r && r.data && r.data.session ? r.data.session.access_token : ""; } catch (e) { return ""; } }
function avLoadImg(file) {
  return new Promise(res => { const url = URL.createObjectURL(file), el = new Image(); el.onload = () => res({ type: "img", el, url, name: file.name.slice(0, 40) }); el.onerror = () => { URL.revokeObjectURL(url); res(null); }; el.src = url; });
}
function avB64(b64) { const s = atob(b64), a = new Uint8Array(s.length); for (let i = 0; i < s.length; i++) a[i] = s.charCodeAt(i); return a.buffer; }
/* 1. the AI writes the script (topic + your brief) */
async function avWrite(topic) {
  const lines = avLinesOf(AV.lines).length;
  const nS = Math.min(6, Math.max(AV.len === "s" ? 3 : AV.len === "l" ? 6 : 4, lines));
  const brief = avBriefText();
  const ask = (AV.type === "q" ? "Answer what growers keep asking about: " : AV.type === "feat" ? "Show this Seb Saathi feature and how a grower uses it, step by step: " : AV.type === "alert" ? "A disease or risk alert: " : AV.type === "money" ? "Profit and selling: " : "") + topic +
    ". Make exactly " + nS + " scenes. The end card call to action should mean: \"" + AV_END[AV.end] + "\"." + (brief ? "\nTHE ADMIN'S BRIEF (follow it exactly):\n" + brief : "");
  const r = await fetch("/api/social?fn=draft", { method: "POST", headers: { "Content-Type": "application/json", Authorization: "Bearer " + await avTok() }, body: JSON.stringify({ kind: "autovideo", ask, lang: AV.lang }) });
  const j = await r.json().catch(() => ({}));
  if (!r.ok || !j.video) throw new Error(j.error === "no_ai_key" || j.error === "ai" ? tr("mk_q_ai_err") : j.error === "not_setup" ? tr("mk_q_setup") : (j.error || "HTTP " + r.status));
  const v = j.video;
  v.scenes = v.scenes.map(x => ({ label: x.label || "", title: x.title || "", sub: x.sub || "", say: x.say || "", art: x.art || "apple" }));
  v.title = v.title || ""; v.cta = v.cta || ""; v.cta_say = v.cta_say || ""; v.caption = v.caption || "";
  return v;
}
async function avCreate() {
  const brief = !!avBriefText();
  const topic = ((AV.own || "").trim() || AV.topic).replace(/\s*\(\d+\)$/, "") || (brief ? "As in the brief below" : "");
  if (!topic) { AV.err = tr("av_need_topic"); avRender(); return; }
  if (VS.play) return;
  AV.busy = true; AV.err = ""; AV.note = ""; AV.done = false; AV.script = null; avSave(); avRender();
  /* the audio needs to start from this tap (browsers block sound that starts by itself) */
  if (AV.voice !== "no" && typeof vsEnsureAC === "function") try { vsEnsureAC(); } catch (e) {}
  try {
    avStep("av_s1");
    const idea = AV.type === "idea" ? avIdeas().find(x => x.name === topic) : null;
    const v = await avWrite(idea ? idea.name + ". Hook: " + idea.hook + ". Show: " + idea.show : topic);
    if (idea) AV.ideaKey = idea.key;
    if (AV.check && !AV.oneTap) {   /* 2. you check the script; nothing is voiced or made yet */
      AV.script = v; AV.step = tr("av_sc_ready"); AV.busy = false; avRender();
      const el = $("avScript"); if (el) el.scrollIntoView({ block: "start", behavior: "smooth" });
      return;
    }
    await avBuild(v);
  } catch (e) { AV.err = tr("av_err").replace("{m}", String(e.message || e)); AV.step = ""; }
  AV.busy = false; avRender(); if (typeof renderStudio === "function") renderStudio();
}
/* "Make video from this script" */
async function avMakeScript() {
  const v = AV.script; if (!v || AV.busy || VS.play) return;
  if (v.scenes.some(x => !String(x.title || "").trim())) { AV.err = tr("av_sc_empty"); avRender(); return; }
  AV.busy = true; AV.err = ""; AV.note = ""; AV.done = false; avRender();
  if (AV.voice !== "no" && typeof vsEnsureAC === "function") try { vsEnsureAC(); } catch (e) {}
  try { await avBuild(v); AV.script = null; } catch (e) { AV.err = tr("av_err").replace("{m}", String(e.message || e)); AV.step = ""; }
  AV.busy = false; avRender(); if (typeof renderStudio === "function") renderStudio();
}
/* 3. voice, pictures, recording, and where it goes */
async function avBuild(v) {
  const voiceOn = AV.voice !== "no";
  {
    /* voice */
    let bufs = [];
    if (voiceOn) {
      avStep("av_s2");
      const texts = v.scenes.map(s => s.say || [s.title, s.sub].filter(Boolean).join(". ")).concat(v.cta_say || v.cta || "");
      try {
        const t = await fetch("/api/social?fn=tts", { method: "POST", headers: { "Content-Type": "application/json", Authorization: "Bearer " + await avTok() }, body: JSON.stringify({ texts, lang: AV.lang === "en" ? "en" : "hi", voice: AV.voice }) });
        const tj = await t.json().catch(() => ({}));
        if (tj.error === "no_tts_key") AV.note = tr("av_no_tts");
        else if (tj.error || !Array.isArray(tj.audio)) AV.note = tr("av_tts_err").replace("{m}", tj.detail || tj.error || ("HTTP " + t.status));
        else { const ac = vsEnsureAC(); bufs = await Promise.all(tj.audio.map(b => b ? ac.decodeAudioData(avB64(b)).catch(() => null) : null)); }
      } catch (e) { AV.note = tr("av_tts_err").replace("{m}", String(e.message || e)); }
    }

    /* pictures and scenes */
    avStep("av_s3");
    const media = AV.pics === "mine" ? (await Promise.all(AV.photos.map(avLoadImg))).filter(Boolean) : [];
    (VS.scenes || []).forEach(s => { if (s.media && media.indexOf(s.media) < 0 && s.media.url) URL.revokeObjectURL(s.media.url); });
    VS.tpl = AV_THEME[AV.type] || "tip"; VS.vlang = AV.lang === "hi" ? "hi" : AV.lang === "en" ? "en" : "hl"; VS.fmt = AV.fmt;
    VS.scenes = v.scenes.map((s, i) => {
      const b = bufs[i] || null, base = i ? 3.2 : 2.8;
      return { label: s.label || "", title: s.title, sub: s.sub || "", say: s.say || "", art: s.art || "apple", media: media[i] || null, voice: b, dur: Math.round(Math.min(10, Math.max(base, b ? b.duration + 0.9 : base)) * 10) / 10 };
    });
    VS.endVoice = bufs[v.scenes.length] || null;
    VS.cta = v.cta || VS_BRAND[VS.vlang].cta;
    VS.ai = { title: v.title || "", caption: v.caption || "" };
    VS.sel = 0; VS.err = ""; VS.msg = ""; vsSave();
    /* background music that fits: your own track with this mood, or the built-in one (vsmusic.js) */
    if (AV.music !== "none" && typeof muPick === "function") { try { await muPick(avMood()); } catch (e) {} }
    else if (AV.music === "none" && VS.music) { try { VS.music.el.pause(); } catch (e) {} VS.music = null; }
    if (document.fonts && document.fonts.ready) await document.fonts.ready.catch(() => {});

    /* record */
    avStep("av_s4");
    renderStudio();
    const el = $("vsBody"); if (el) el.scrollIntoView({ block: "start", behavior: "smooth" });
    await new Promise(res => setTimeout(res, 700));
    const before = VS.out;
    vsStart(true);
    if (!VS.play) throw new Error(VS.err || tr("vs_nosupport"));
    await new Promise(res => { const w = () => { if (!VS.play && VS.out !== before) res(); else setTimeout(w, 300); }; w(); });

    /* afterwards */
    AV.done = true;
    if (avCreateTab() && !AV.oneTap) {   /* Create tab: every place that is ticked */
      const W = AV.where;
      if ((W.fb || W.ig || W.wa) && typeof vsQueue === "function") {
        avStep("av_s_fb"); await vsQueue();
        const qid = VS.out && VS.out.qid;
        if (qid && (W.ig || W.wa) && typeof mkEverywhere === "function") await mkEverywhere(qid, { fb: W.fb, ig: W.ig, wa: W.wa });   /* its own caption for each ticked place */
        else if (qid && typeof qUpd === "function") { try { await qUpd(qid, { fb: true, ig: false }); } catch (e) {} }
      }
      if (W.yt && typeof ytHold === "function") {
        if (typeof ytHold === "function") { avStep("av_s_ythold"); await ytHold(); AV.note = (AV.note ? AV.note + " " : "") + tr("av_yt_held"); }
      }
    } else if (AV.after === "fb" && typeof vsQueue === "function") { avStep("av_s_fb"); await vsQueue(); }
    else if (AV.after === "yt" && typeof ytHold === "function") {
      if (typeof ytHold === "function") { avStep("av_s_ythold"); await ytHold(AV.ytAt || ""); AV.note = (AV.note ? AV.note + " " : "") + tr("av_yt_held"); }
    }
    AV.step = tr("av_s5") + " " + tr("av_edit");
    if (AV.ideaKey && typeof mkSave === "function") { try { await mkSave(AV.ideaKey, { done: true }); } catch (e) {} AV.ideaKey = ""; }
  }
}

/* ---------- taps ---------- */
document.addEventListener("click", e => {
  const c = e.target.closest && e.target.closest("#avBox [data-av]");
  if (c && !AV.busy) {
    const k = c.dataset.av, v = c.dataset.v;
    if (k === "topic") { AV.topic = AV.topic === v ? "" : v; AV.own = ""; }
    else { AV[k] = v; if (k === "type") { AV.topic = ""; } }
    AV.err = ""; avSave(); avRender(); return;
  }
  const ck = e.target.closest && e.target.closest("#avBox [data-avcheck]");
  if (ck && !AV.busy) { AV.check = !AV.check; avSave(); avRender(); return; }
  const sc = e.target.closest && e.target.closest("#avBox [data-avsc]");
  if (sc && !AV.busy && AV.script) {
    const a = sc.dataset.avsc, i = +sc.dataset.i, S = AV.script.scenes;
    if (a === "make") return avMakeScript();
    if (a === "redo") { AV.script = null; return avCreate(); }
    if (a === "drop") { AV.script = null; AV.step = ""; avRender(); return; }
    if (a === "up" && i > 0) { const t = S[i]; S[i] = S[i - 1]; S[i - 1] = t; }
    if (a === "del" && S.length > 1) S.splice(i, 1);
    avRender(); return;
  }
  const w = e.target.closest && e.target.closest("#avBox [data-avw]");
  if (w && !AV.busy) { AV.where[w.dataset.avw] = !AV.where[w.dataset.avw]; avSave(); avRender(); return; }
  if (e.target.closest && e.target.closest("#avGo")) avCreate();
});
document.addEventListener("toggle", e => {
  const d = e.target; if (!d || !d.dataset || !d.dataset.avd) return;
  if (d.dataset.avd === "opts") AV.optsOpen = d.open; else AV.briefOpen = d.open;
}, true);
document.addEventListener("input", e => {
  const t = e.target; if (!t || !t.dataset) return;
  if (t.dataset.avb) { AV[t.dataset.avb] = t.value; return; }
  if (t.dataset.avs && AV.script) {
    const m = t.dataset.avs.split(":");
    if (m.length === 2) { const sc = AV.script.scenes[+m[0]]; if (sc) sc[m[1]] = t.value; } else AV.script[m[0]] = t.value;
  }
});
document.addEventListener("input", e => { if (e.target && e.target.id === "avOwn") { AV.own = e.target.value; if (AV.own) AV.topic = ""; document.querySelectorAll('#avBox [data-av="topic"]').forEach(b => b.setAttribute("aria-pressed", "false")); } });
document.addEventListener("change", e => { if (e.target && e.target.id === "avPhotos") { AV.photos = Array.from(e.target.files || []).filter(f => /^image\//.test(f.type)).slice(0, 6); avRender(); } });

/* draw the box once the Video Studio is on the page, and again when the language changes */
(function avMount(n) { if ($("vsBody")) { avRender(); return; } if (n < 40) setTimeout(() => avMount(n + 1), 250); })(0);
const avRS0 = typeof renderStudio === "function" ? renderStudio : null;
if (avRS0) renderStudio = function () { avRS0.apply(this, arguments); if (!$("avBox") || !AV.busy) avRender(); };
