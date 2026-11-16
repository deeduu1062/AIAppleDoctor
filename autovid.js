/* Seb Saathi admin — "Create a video for me": choose a few options, and the video is made for you.
   1. The AI writes the scenes, the voice-over lines and picks a drawn picture for each scene (/api/social?fn=draft, kind "autovideo")
   2. A Hindi or English voice reads it (/api/social?fn=tts, Google Text-to-Speech; skipped if not set up)
   3. The Video Studio below draws and records it (studio.js + vsart.js), then it can go to Facebook/Instagram or YouTube.
   Sits at the top of the Video Studio (Social handler → YouTube & videos). */
Object.assign(T.en, {
  av_h: "🎬 Create a video for me", av_p: "Choose the options, tap Create video, and it is made for you: words, pictures, voice and the end card. Keep this tab open and in front while it records.",
  av_type: "1. What kind of video?", av_t_alert: "Disease alert", av_t_tip: "Orchard tip", av_t_season: "This month's jobs", av_t_feat: "Show a Seb Saathi feature", av_t_money: "Profit and selling", av_t_q: "Answer growers' questions", av_t_own: "My own topic",
  av_topic: "2. Topic", av_topic_ph: "Or type your own topic, e.g. \"How to spot scab early after rain\"", av_q_load: "Loading what growers ask Saathi…", av_q_none: "No Saathi questions yet — type a topic.",
  av_lang: "3. Language", av_voice: "4. Voice-over", av_v_f: "Woman's voice", av_v_m: "Man's voice", av_v_no: "No voice",
  av_len: "5. Length", av_l_s: "Short ~20 sec (3 scenes)", av_l_m: "Medium ~30 sec (4–5 scenes)", av_l_l: "Long ~45 sec (6 scenes)",
  av_size: "6. Size", av_pics: "7. Pictures", av_p_draw: "Drawn pictures (built in)", av_p_mine: "My photos", av_p_add: "Choose photos", av_p_n: "{n} photos chosen — used in order, drawings fill the rest.",
  av_end: "8. Ending", av_e_site: "Visit sebsaathi.com", av_e_dx: "Try the free disease check", av_e_share: "Share with grower friends", av_e_join: "Join free today",
  av_after: "9. When it's ready", av_a_none: "Just show me", av_a_fb: "Add to Facebook + Instagram list", av_a_yt: "Upload to YouTube as a Short",
  av_go: "🎬 Create video", av_again: "Make another version",
  av_s1: "Writing the video…", av_s2: "Recording the voice…", av_s3: "Getting pictures ready…", av_s4: "Making the video — keep this tab open and in front…", av_s5: "✓ Video ready below. Watch it, then download, post or upload.",
  av_s_fb: "Adding it to the Facebook + Instagram list…", av_s_yt: "Uploading to YouTube…",
  av_need_topic: "Pick a topic or type one.", av_err: "Could not make it: {m}",
  av_no_tts: "Made without a voice: the voice is not set up yet. To add it, put GOOGLE_TTS_KEY in Vercel (a Google Cloud API key with Text-to-Speech turned on), then Redeploy.",
  av_tts_err: "Made without a voice: Google Text-to-Speech said: {m}", av_yt_first: "Connect your YouTube channel (YouTube Studio box above) to upload. The video is ready below.",
  av_edit: "You can still change any words, pictures or timings below and tap Make video again."
});
Object.assign(T.hi, {
  av_h: "🎬 मेरे लिए वीडियो बनाएँ", av_p: "विकल्प चुनें, वीडियो बनाएँ दबाएँ, और वीडियो आपके लिए बन जाएगा: शब्द, चित्र, आवाज़ और आख़िरी स्क्रीन। रिकॉर्डिंग के दौरान यह टैब खुला और सामने रखें।",
  av_type: "1. कैसा वीडियो?", av_t_alert: "बीमारी चेतावनी", av_t_tip: "बाग़ की सलाह", av_t_season: "इस महीने के काम", av_t_feat: "सेब साथी की सुविधा दिखाएँ", av_t_money: "मुनाफ़ा और बिक्री", av_t_q: "बाग़वानों के सवालों के जवाब", av_t_own: "मेरा अपना विषय",
  av_topic: "2. विषय", av_topic_ph: "या अपना विषय लिखें", av_q_load: "साथी से पूछे सवाल लोड हो रहे हैं…", av_q_none: "अभी कोई सवाल नहीं — विषय लिखें।",
  av_lang: "3. भाषा", av_voice: "4. आवाज़", av_v_f: "महिला की आवाज़", av_v_m: "पुरुष की आवाज़", av_v_no: "आवाज़ नहीं",
  av_len: "5. लंबाई", av_l_s: "छोटा ~20 सेकंड", av_l_m: "मध्यम ~30 सेकंड", av_l_l: "लंबा ~45 सेकंड",
  av_size: "6. साइज़", av_pics: "7. चित्र", av_p_draw: "बने हुए चित्र", av_p_mine: "मेरी फ़ोटो", av_p_add: "फ़ोटो चुनें", av_p_n: "{n} फ़ोटो चुनीं — क्रम से लगेंगी, बाकी में चित्र।",
  av_end: "8. आख़िर में", av_e_site: "sebsaathi.com पर आएँ", av_e_dx: "मुफ़्त बीमारी जाँच करें", av_e_share: "बाग़वान दोस्तों से शेयर करें", av_e_join: "आज ही मुफ़्त जुड़ें",
  av_after: "9. बनने के बाद", av_a_none: "बस मुझे दिखाएँ", av_a_fb: "Facebook + Instagram सूची में जोड़ें", av_a_yt: "YouTube पर Short अपलोड करें",
  av_go: "🎬 वीडियो बनाएँ", av_again: "दूसरा रूप बनाएँ",
  av_s1: "वीडियो लिखा जा रहा है…", av_s2: "आवाज़ रिकॉर्ड हो रही है…", av_s3: "चित्र तैयार हो रहे हैं…", av_s4: "वीडियो बन रहा है — टैब खुला और सामने रखें…", av_s5: "✓ वीडियो नीचे तैयार है। देखें, फिर डाउनलोड, पोस्ट या अपलोड करें।",
  av_s_fb: "Facebook + Instagram सूची में जोड़ रहे हैं…", av_s_yt: "YouTube पर अपलोड हो रहा है…",
  av_need_topic: "विषय चुनें या लिखें।", av_err: "नहीं बन सका: {m}",
  av_no_tts: "बिना आवाज़ बना: आवाज़ अभी सेट नहीं है। Vercel में GOOGLE_TTS_KEY डालें, फिर Redeploy करें।", av_tts_err: "बिना आवाज़ बना: {m}",
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
const AV = { type: "alert", topic: "", own: "", lang: "hi", voice: "f", len: "m", fmt: "916", pics: "draw", photos: [], end: "site", after: "none", busy: false, step: "", note: "", err: "" };
try { const o = JSON.parse(localStorage.getItem("av-opts") || "null"); if (o) ["type", "lang", "voice", "len", "fmt", "pics", "end", "after"].forEach(k => { if (o[k]) AV[k] = o[k]; }); } catch (e) {}
const avSave = () => { try { localStorage.setItem("av-opts", JSON.stringify({ type: AV.type, lang: AV.lang, voice: AV.voice, len: AV.len, fmt: AV.fmt, pics: AV.pics, end: AV.end, after: AV.after })); } catch (e) {} };

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
  return (AV_TOPICS[AV.type] || {}).en || [];
}
const avChip = (k, v, label) => '<button type="button" class="btn-s sm avchip" data-av="' + k + '" data-v="' + esc(v) + '" aria-pressed="' + (String(AV[k]) === String(v)) + '">' + esc(label) + "</button>";

/* opened from the Facebook + Instagram tab: no YouTube upload choice there, and "Add to Facebook + Instagram list" is the default */
const avFbTab = () => typeof mkSub !== "undefined" && mkSub === "fb";
let avFbSet = false;
function avHtml() {
  if (avFbTab() && !avFbSet) { avFbSet = true; if (AV.after !== "none") AV.after = "fb"; }
  if (avFbTab() && AV.after === "yt") AV.after = "fb";
  const tps = avTopics(), dis = AV.busy ? " disabled" : "";
  return '<div class="avbox"><h5>' + esc(tr("av_h")) + '</h5><p class="fine">' + esc(tr("av_p")) + "</p>" +
    '<fieldset class="avgrp"' + dis + "><legend>" + esc(tr("av_type")) + "</legend><div class=\"avchips\">" + ["alert", "tip", "season", "feat", "money", "q", "own"].map(k => avChip("type", k, tr("av_t_" + k))).join("") + "</div></fieldset>" +
    '<fieldset class="avgrp"' + dis + "><legend>" + esc(tr("av_topic")) + '</legend><div class="avchips">' +
      (tps === null ? '<span class="fine">' + esc(tr("av_q_load")) + "</span>" : AV.type === "q" && !tps.length ? '<span class="fine">' + esc(tr("av_q_none")) + "</span>" : tps.map(x => avChip("topic", x, x)).join("")) + "</div>" +
      '<input class="avin" id="avOwn" maxlength="200" placeholder="' + esc(tr("av_topic_ph")) + '" value="' + esc(AV.own) + '"></fieldset>' +
    '<fieldset class="avgrp"' + dis + "><legend>" + esc(tr("av_lang")) + '</legend><div class="avchips">' + avChip("lang", "hi", "हिंदी") + avChip("lang", "hn", "Hinglish") + avChip("lang", "en", "English") + "</div></fieldset>" +
    '<fieldset class="avgrp"' + dis + "><legend>" + esc(tr("av_voice")) + '</legend><div class="avchips">' + avChip("voice", "f", tr("av_v_f")) + avChip("voice", "m", tr("av_v_m")) + avChip("voice", "no", tr("av_v_no")) + "</div></fieldset>" +
    '<fieldset class="avgrp"' + dis + "><legend>" + esc(tr("av_len")) + '</legend><div class="avchips">' + avChip("len", "s", tr("av_l_s")) + avChip("len", "m", tr("av_l_m")) + avChip("len", "l", tr("av_l_l")) + "</div></fieldset>" +
    '<fieldset class="avgrp"' + dis + "><legend>" + esc(tr("av_size")) + '</legend><div class="avchips">' + avChip("fmt", "916", tr("vs_f_916")) + avChip("fmt", "11", tr("vs_f_11")) + avChip("fmt", "45", tr("vs_f_45")) + "</div></fieldset>" +
    '<fieldset class="avgrp"' + dis + "><legend>" + esc(tr("av_pics")) + '</legend><div class="avchips">' + avChip("pics", "draw", tr("av_p_draw")) + avChip("pics", "mine", tr("av_p_mine")) + "</div>" +
      (AV.pics === "mine" ? '<p><label class="btn-s sm vsfile">' + esc(tr("av_p_add")) + '<input type="file" accept="image/*" multiple id="avPhotos" hidden></label> <span class="fine">' + (AV.photos.length ? esc(tr("av_p_n").replace("{n}", AV.photos.length)) : "") + "</span></p>" : "") + "</fieldset>" +
    '<fieldset class="avgrp"' + dis + "><legend>" + esc(tr("av_end")) + '</legend><div class="avchips">' + ["site", "dx", "share", "join"].map(k => avChip("end", k, tr("av_e_" + k))).join("") + "</div></fieldset>" +
    '<fieldset class="avgrp"' + dis + "><legend>" + esc(tr("av_after")) + '</legend><div class="avchips">' + (avFbTab() ? ["none", "fb"] : ["none", "fb", "yt"]).map(k => avChip("after", k, tr("av_a_" + k))).join("") + "</div></fieldset>" +
    '<p><button type="button" class="btn-s add avgo" id="avGo"' + dis + ">" + esc(AV.busy ? AV.step : VS.out && AV.done ? tr("av_again") : tr("av_go")) + "</button></p>" +
    (AV.step && !AV.busy ? '<p class="fine" role="status">' + esc(AV.step) + "</p>" : "") +
    (AV.note ? '<p class="fine">' + esc(AV.note) + "</p>" : "") + (AV.err ? '<p class="autherr" role="alert">' + esc(AV.err) + "</p>" : "") + "</div>";
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
async function avCreate() {
  const topic = ((AV.own || "").trim() || AV.topic).replace(/\s*\(\d+\)$/, "");
  if (!topic) { AV.err = tr("av_need_topic"); avRender(); return; }
  if (VS.play) return;
  AV.busy = true; AV.err = ""; AV.note = ""; AV.done = false; avSave(); avRender();
  /* the audio needs to start from this tap (browsers block sound that starts by itself) */
  const voiceOn = AV.voice !== "no";
  if (voiceOn && typeof vsEnsureAC === "function") try { vsEnsureAC(); } catch (e) {}
  try {
    avStep("av_s1");
    const nS = AV.len === "s" ? 3 : AV.len === "l" ? 6 : 4;
    const ask = (AV.type === "q" ? "Answer what growers keep asking about: " : AV.type === "feat" ? "Show this Seb Saathi feature and how a grower uses it, step by step: " : AV.type === "alert" ? "A disease or risk alert: " : AV.type === "money" ? "Profit and selling: " : "") + topic +
      ". Make exactly " + nS + " scenes. The end card call to action should mean: \"" + AV_END[AV.end] + "\".";
    const r = await fetch("/api/social?fn=draft", { method: "POST", headers: { "Content-Type": "application/json", Authorization: "Bearer " + await avTok() }, body: JSON.stringify({ kind: "autovideo", ask, lang: AV.lang }) });
    const j = await r.json().catch(() => ({}));
    if (!r.ok || !j.video) throw new Error(j.error === "no_ai_key" || j.error === "ai" ? tr("mk_q_ai_err") : j.error === "not_setup" ? tr("mk_q_setup") : (j.error || "HTTP " + r.status));
    const v = j.video;

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
      return { label: s.label || "", title: s.title, sub: s.sub || "", art: s.art || "apple", media: media[i] || null, voice: b, dur: Math.round(Math.min(10, Math.max(base, b ? b.duration + 0.9 : base)) * 10) / 10 };
    });
    VS.endVoice = bufs[v.scenes.length] || null;
    VS.cta = v.cta || VS_BRAND[VS.vlang].cta;
    VS.ai = { title: v.title || "", caption: v.caption || "" };
    VS.sel = 0; VS.err = ""; VS.msg = ""; vsSave();
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
    if (AV.after === "fb" && typeof vsQueue === "function") { avStep("av_s_fb"); await vsQueue(); }
    else if (AV.after === "yt" && typeof ytUpload === "function") {
      if (typeof YT !== "undefined" && YT && YT.connected) { avStep("av_s_yt"); if (AV.ytAt && typeof YTU !== "undefined" && YTU) YTU.at = AV.ytAt; await ytUpload(); } else AV.note = (AV.note ? AV.note + " " : "") + tr("av_yt_first");
    }
    AV.step = tr("av_s5") + " " + tr("av_edit");
  } catch (e) { AV.err = tr("av_err").replace("{m}", String(e.message || e)); AV.step = ""; }
  AV.busy = false; avRender(); if (typeof renderStudio === "function") renderStudio();
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
  if (e.target.closest && e.target.closest("#avGo")) avCreate();
});
document.addEventListener("input", e => { if (e.target && e.target.id === "avOwn") { AV.own = e.target.value; if (AV.own) AV.topic = ""; document.querySelectorAll('#avBox [data-av="topic"]').forEach(b => b.setAttribute("aria-pressed", "false")); } });
document.addEventListener("change", e => { if (e.target && e.target.id === "avPhotos") { AV.photos = Array.from(e.target.files || []).filter(f => /^image\//.test(f.type)).slice(0, 6); avRender(); } });

/* draw the box once the Video Studio is on the page, and again when the language changes */
(function avMount(n) { if ($("vsBody")) { avRender(); return; } if (n < 40) setTimeout(() => avMount(n + 1), 250); })(0);
const avRS0 = typeof renderStudio === "function" ? renderStudio : null;
if (avRS0) renderStudio = function () { avRS0.apply(this, arguments); if (!$("avBox") || !AV.busy) avRender(); };
