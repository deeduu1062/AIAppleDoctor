/* Seb Saathi admin: Video Studio (inside the Marketing tab).
   Makes short marketing videos in the browser: pick a template, add your own photos or clips,
   change the words, preview, then record the canvas to a video file and download it.
   Nothing is uploaded: photos, clips and music stay on this device. Only the words are
   remembered on this device (localStorage) so a half-made video isn't lost. */

Object.assign(T.en, {
  vs_ai_shoot: "AI words are in. What to film: {s}",
  vs_q_add: "Add to the Facebook + Instagram tab (as a Reel)", vs_q_busy: "Uploading the video…", vs_q_ok: "Added to the Facebook + Instagram tab. Open it to tap Post now or Approve.",
  vs_q_err: "Could not add it: {m}", vs_q_webm: "Make it again in Chrome or Edge on a computer to get an MP4 first: Facebook and Instagram need MP4.",
  yt_when: "Publish at (India time, optional)", yt_when_p: "Leave empty to publish straight away. With a time, YouTube keeps it private until then and publishes it by itself.",
  yt_sched_ok: "Scheduled on YouTube for {d}.",
  vs_h: "Video Studio",
  vs_p: "Make short videos for Reels, YouTube Shorts and WhatsApp Status. Pick a template, add photos or clips from your own orchards, change the words, then make the video and download it.",
  vs_tpl: "Template", vs_t_tip: "Orchard tip", vs_t_feat: "App feature", vs_t_alert: "Disease alert", vs_t_season: "Season jobs",
  vs_vlang: "Video language", vs_fmt: "Size", vs_f_916: "Reel / Status 9:16", vs_f_11: "Square 1:1", vs_f_45: "Post 4:5",
  vs_scene: "Scene {n}", vs_label: "Small tag", vs_title: "Main words", vs_sub: "Second line", vs_dur: "Seconds",
  vs_media: "Add photo or clip", vs_media_ch: "Change photo/clip", vs_media_rm: "Remove", vs_nomedia: "No photo: brand colours are used.",
  vs_up: "Move up", vs_del: "Delete", vs_add: "+ Add scene", vs_max: "Up to 8 scenes.",
  vs_end: "Last screen", vs_cta: "Call to action",
  vs_music: "Background music (optional)", vs_music_add: "Add music file", vs_music_rm: "Remove music", vs_vol: "Volume",
  vs_music_note: "Use only music you have the right to use, or Instagram may mute the video. You can also add music later inside Instagram.",
  vs_play: "▶ Preview", vs_stop: "■ Stop", vs_make: "Make video", vs_reset: "Reset words",
  vs_reset_q: "Put back the template's words? Your changes to the words will be lost (photos stay).",
  vs_making: "Making video… {s} of {t} seconds. Keep this tab open and in front.",
  vs_done: "Video ready: {t} seconds, {size}.", vs_dl: "Download video",
  vs_webm: "This browser saved a WebM file. Instagram and Facebook want MP4: make it again in the latest Chrome or Edge on a computer.",
  vs_nosupport: "This browser can't make videos. Use the latest Chrome or Edge on a computer.",
  vs_total: "Length: {s} seconds", vs_hidden: "Recording paused while this tab was hidden, so the video may jump. Make it again with the tab in front.",
  vs_cap: "Post caption", vs_copy: "Copy", vs_copied: "Copied",
  vs_how: "Add the finished video to the Facebook + Instagram tab (as a Reel), upload it to YouTube above, and put it on your WhatsApp Status. Photos and clips stay on this device; only a finished video you add or upload leaves it.",
  vs_bad_file: "That file can't be used. Choose a photo (JPG/PNG) or a video clip (MP4/MOV).",
  yt_h: "YouTube", yt_checking: "Checking YouTube…", yt_conn: "Connected: {c}", yt_connect: "Connect YouTube channel", yt_disc: "Disconnect", yt_open: "Open channel",
  yt_disc_q: "Disconnect the YouTube channel from the admin page? You can connect it again any time.",
  yt_none: "Not connected yet. Press the button, sign in with the Google account that owns the Seb Saathi channel, pick the channel, and allow uploads.",
  yt_unverified: "Google will warn that the app isn't verified (it's your own app): tap Advanced, then Go to Seb Saathi.",
  yt_setup_h: "One-time setup (on a computer, about 15 minutes)",
  yt_missing: "Still missing: {m}",
  yt_s1: "Google Cloud: make a project", yt_s1p: "Open console.cloud.google.com, sign in with the Google account that owns the channel, and create a project called Seb Saathi.",
  yt_s2: "Turn on the YouTube API", yt_s2p: "APIs & Services → Library → search \"YouTube Data API v3\" → Enable.",
  yt_s3: "Set up the sign-in screen", yt_s3p: "Google Auth Platform → Branding: app name Seb Saathi and your email. Audience: External, then press \"Publish app\" (otherwise the connection stops working after 7 days).",
  yt_s4: "Make the key", yt_s4p: "Google Auth Platform → Clients → Create client → Web application. Under Authorised redirect URIs add https://sebsaathi.com/api/youtube and https://sebsaathi.vercel.app/api/youtube. Create, then copy the Client ID and Client secret.",
  yt_s5: "Put the key in Vercel", yt_s5p: "Vercel → your project → Settings → Environment Variables: add GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET with those two values, then Deployments → Redeploy.",
  yt_s6: "Make the table in Supabase", yt_s6p: "Supabase → SQL Editor → New query → paste supabase/youtube.sql from the GitHub repo → Run.",
  yt_s7: "Connect", yt_s7p: "Come back here, press Refresh, then Connect YouTube channel.",
  yt_refresh: "Refresh",
  yt_up_h: "Upload to YouTube", yt_title: "Title", yt_desc: "Description", yt_priv: "Who can see it",
  yt_p_public: "Public", yt_p_unlisted: "Unlisted (only with the link)", yt_p_private: "Private (only you)",
  yt_go: "Upload to YouTube", yt_upping: "Uploading… {p}%", yt_starting: "Starting upload…",
  yt_done: "Uploaded to YouTube ✓", yt_watch: "Watch", yt_studio: "Open in YouTube Studio",
  yt_locked: "YouTube has kept it Private. Videos uploaded through a new, unaudited app stay private: open it in YouTube Studio and set it to Public (one tap). To stop this, send Google the YouTube API audit form once.",
  yt_err: "Upload failed: {m}", yt_reconnect: "The YouTube connection has expired or was removed. Connect again.",
  yt_back_ok: "YouTube channel connected.", yt_back_err: "YouTube didn't connect: {m}",
  yt_connect_first: "Connect your YouTube channel below to upload straight from here."
});
Object.assign(T.hi, {
  vs_ai_shoot: "AI के शब्द आ गए। क्या फ़िल्म करें: {s}",
  vs_q_add: "Facebook + Instagram टैब में जोड़ें (Reel के रूप में)", vs_q_busy: "वीडियो अपलोड हो रहा है…", vs_q_ok: "Facebook + Instagram टैब में जुड़ गया। वहाँ अभी पोस्ट करें या मंज़ूर करें दबाएँ।",
  vs_q_err: "नहीं जुड़ा: {m}", vs_q_webm: "पहले कंप्यूटर पर Chrome या Edge में दोबारा बनाकर MP4 लें: Facebook और Instagram को MP4 चाहिए।",
  yt_when: "कब पब्लिश करें (भारत का समय, ज़रूरी नहीं)", yt_when_p: "ख़ाली छोड़ें तो तुरंत पब्लिश होगा। समय डालें तो YouTube उस समय तक प्राइवेट रखेगा और फिर अपने-आप पब्लिश करेगा।",
  yt_sched_ok: "YouTube पर {d} के लिए शेड्यूल हुआ।",
  vs_h: "वीडियो स्टूडियो",
  vs_p: "Reels, YouTube Shorts और WhatsApp स्टेटस के लिए छोटे वीडियो बनाएँ। टेम्पलेट चुनें, अपने बाग़ की फ़ोटो या क्लिप जोड़ें, शब्द बदलें, फिर वीडियो बनाकर डाउनलोड करें।",
  vs_tpl: "टेम्पलेट", vs_t_tip: "बाग़ टिप", vs_t_feat: "ऐप फ़ीचर", vs_t_alert: "बीमारी अलर्ट", vs_t_season: "मौसम के काम",
  vs_vlang: "वीडियो की भाषा", vs_fmt: "साइज़", vs_f_916: "Reel / स्टेटस 9:16", vs_f_11: "चौकोर 1:1", vs_f_45: "पोस्ट 4:5",
  vs_scene: "सीन {n}", vs_label: "छोटा टैग", vs_title: "मुख्य शब्द", vs_sub: "दूसरी लाइन", vs_dur: "सेकंड",
  vs_media: "फ़ोटो या क्लिप जोड़ें", vs_media_ch: "फ़ोटो/क्लिप बदलें", vs_media_rm: "हटाएँ", vs_nomedia: "फ़ोटो नहीं: ब्रांड के रंग लगेंगे।",
  vs_up: "ऊपर करें", vs_del: "हटाएँ", vs_add: "+ सीन जोड़ें", vs_max: "ज़्यादा से ज़्यादा 8 सीन।",
  vs_end: "आख़िरी स्क्रीन", vs_cta: "बुलावा (CTA)",
  vs_music: "बैकग्राउंड म्यूज़िक (ज़रूरी नहीं)", vs_music_add: "म्यूज़िक फ़ाइल जोड़ें", vs_music_rm: "म्यूज़िक हटाएँ", vs_vol: "आवाज़",
  vs_music_note: "सिर्फ़ वही म्यूज़िक लगाएँ जिसका आपको हक़ है, वरना Instagram वीडियो की आवाज़ बंद कर सकता है। म्यूज़िक बाद में Instagram में भी जोड़ सकते हैं।",
  vs_play: "▶ देखें", vs_stop: "■ रोकें", vs_make: "वीडियो बनाएँ", vs_reset: "शब्द वापस करें",
  vs_reset_q: "टेम्पलेट के शब्द वापस लगाएँ? शब्दों में किए बदलाव मिट जाएँगे (फ़ोटो रहेंगी)।",
  vs_making: "वीडियो बन रहा है… {t} में से {s} सेकंड। यह टैब खुला और सामने रखें।",
  vs_done: "वीडियो तैयार: {t} सेकंड, {size}।", vs_dl: "वीडियो डाउनलोड करें",
  vs_webm: "इस ब्राउज़र ने WebM फ़ाइल बनाई। Instagram और Facebook को MP4 चाहिए: कंप्यूटर पर नए Chrome या Edge में दोबारा बनाएँ।",
  vs_nosupport: "यह ब्राउज़र वीडियो नहीं बना सकता। कंप्यूटर पर नया Chrome या Edge इस्तेमाल करें।",
  vs_total: "लंबाई: {s} सेकंड", vs_hidden: "टैब छिपा था, इसलिए वीडियो अटक सकता है। टैब सामने रखकर दोबारा बनाएँ।",
  vs_cap: "पोस्ट का कैप्शन", vs_copy: "कॉपी", vs_copied: "कॉपी हुआ",
  vs_how: "बना हुआ वीडियो पोस्ट और वीडियो (Facebook + Instagram Reel) में जोड़ें, ऊपर से YouTube पर अपलोड करें, और WhatsApp स्टेटस पर लगाएँ। फ़ोटो और क्लिप इसी डिवाइस पर रहते हैं; सिर्फ़ वह बना वीडियो बाहर जाता है जिसे आप जोड़ें या अपलोड करें।",
  vs_bad_file: "यह फ़ाइल नहीं चलेगी। फ़ोटो (JPG/PNG) या वीडियो क्लिप (MP4/MOV) चुनें।",
  yt_h: "YouTube", yt_checking: "YouTube जाँच रहे हैं…", yt_conn: "जुड़ा हुआ: {c}", yt_connect: "YouTube चैनल जोड़ें", yt_disc: "हटाएँ", yt_open: "चैनल खोलें",
  yt_disc_q: "YouTube चैनल को एडमिन पेज से हटाएँ? आप कभी भी दोबारा जोड़ सकते हैं।",
  yt_none: "अभी जुड़ा नहीं है। बटन दबाएँ, Seb Saathi चैनल वाले Google खाते से साइन इन करें, चैनल चुनें और अपलोड की अनुमति दें।",
  yt_unverified: "Google चेतावनी देगा कि ऐप verified नहीं है (यह आपका अपना ऐप है): Advanced दबाएँ, फिर Go to Seb Saathi।",
  yt_setup_h: "एक बार की सेटिंग (कंप्यूटर पर, लगभग 15 मिनट)",
  yt_missing: "अभी बाकी: {m}",
  yt_s1: "Google Cloud: प्रोजेक्ट बनाएँ", yt_s1p: "console.cloud.google.com खोलें, चैनल वाले Google खाते से साइन इन करें और Seb Saathi नाम का प्रोजेक्ट बनाएँ।",
  yt_s2: "YouTube API चालू करें", yt_s2p: "APIs & Services → Library → \"YouTube Data API v3\" खोजें → Enable।",
  yt_s3: "साइन-इन स्क्रीन बनाएँ", yt_s3p: "Google Auth Platform → Branding: ऐप का नाम Seb Saathi और आपका ईमेल। Audience: External, फिर \"Publish app\" दबाएँ (वरना 7 दिन बाद कनेक्शन बंद हो जाएगा)।",
  yt_s4: "चाबी बनाएँ", yt_s4p: "Google Auth Platform → Clients → Create client → Web application। Authorised redirect URIs में https://sebsaathi.com/api/youtube और https://sebsaathi.vercel.app/api/youtube जोड़ें। Create करें, फिर Client ID और Client secret कॉपी करें।",
  yt_s5: "चाबी Vercel में डालें", yt_s5p: "Vercel → आपका प्रोजेक्ट → Settings → Environment Variables: GOOGLE_CLIENT_ID और GOOGLE_CLIENT_SECRET में ये दोनों डालें, फिर Deployments → Redeploy।",
  yt_s6: "Supabase में टेबल बनाएँ", yt_s6p: "Supabase → SQL Editor → New query → GitHub से supabase/youtube.sql पेस्ट करें → Run।",
  yt_s7: "जोड़ें", yt_s7p: "यहाँ वापस आएँ, Refresh दबाएँ, फिर YouTube चैनल जोड़ें।",
  yt_refresh: "Refresh",
  yt_up_h: "YouTube पर अपलोड", yt_title: "शीर्षक", yt_desc: "विवरण", yt_priv: "कौन देख सकता है",
  yt_p_public: "सभी (Public)", yt_p_unlisted: "सिर्फ़ लिंक वाले (Unlisted)", yt_p_private: "सिर्फ़ आप (Private)",
  yt_go: "YouTube पर अपलोड करें", yt_upping: "अपलोड हो रहा है… {p}%", yt_starting: "अपलोड शुरू हो रहा है…",
  yt_done: "YouTube पर अपलोड हो गया ✓", yt_watch: "देखें", yt_studio: "YouTube Studio में खोलें",
  yt_locked: "YouTube ने इसे Private रखा है। नए, बिना ऑडिट वाले ऐप से अपलोड वीडियो private रहते हैं: YouTube Studio में खोलकर Public करें (एक टैप)। इसे बंद करने के लिए Google को एक बार YouTube API ऑडिट फ़ॉर्म भेजें।",
  yt_err: "अपलोड नहीं हुआ: {m}", yt_reconnect: "YouTube कनेक्शन ख़त्म हो गया या हटा दिया गया। दोबारा जोड़ें।",
  yt_back_ok: "YouTube चैनल जुड़ गया।", yt_back_err: "YouTube नहीं जुड़ा: {m}",
  yt_connect_first: "यहीं से अपलोड करने के लिए नीचे अपना YouTube चैनल जोड़ें।"
});

/* ---------- templates: words for each video language ---------- */
const VS_THEMES = {
  tip:    { a: "#123222", b: "#2F8F3A", acc: "#D3231E", accFg: "#FFFFFF" },
  feat:   { a: "#0E2418", b: "#1F4D34", acc: "#D3231E", accFg: "#FFFFFF" },
  alert:  { a: "#3E0C08", b: "#A3241B", acc: "#F2C14E", accFg: "#2A1A05" },
  season: { a: "#33240B", b: "#A8761A", acc: "#2F8F3A", accFg: "#FFFFFF" }
};
const VS_BRAND = {
  hi: { name: "सेब साथी", tag: "ज्ञान • तकनीक • मुनाफ़ा", cta: "सेब साथी मुफ़्त है। लिंक विवरण में।" },
  hl: { name: "Seb Saathi", tag: "Gyaan • Taknik • Munafa", cta: "Seb Saathi free hai. Link description mein." },
  en: { name: "Seb Saathi", tag: "Knowledge • Technology • Profit", cta: "Seb Saathi is free. Link in description." }
};
const VS_MONTH = { hi: ["जनवरी","फ़रवरी","मार्च","अप्रैल","मई","जून","जुलाई","अगस्त","सितंबर","अक्टूबर","नवंबर","दिसंबर"],
  en: ["January","February","March","April","May","June","July","August","September","October","November","December"] };
VS_MONTH.hl = VS_MONTH.en;
/* each scene: [small tag, main words, second line] */
const VS_TPL = {
  tip: {
    hi: [["बाग़ टिप", "स्कैब से सेब कैसे बचाएँ?", "3 आसान कदम"],
         ["1", "गिरी हुई पत्तियाँ इकट्ठा करें", "सर्दी में स्कैब इन्हीं पत्तियों में पलता है"],
         ["2", "हरी कली पर पहला स्प्रे", "समय पर स्प्रे सबसे ज़रूरी है"],
         ["3", "बारिश के बाद बाग़ जाँचें", "पत्तों पर भूरे-काले धब्बे देखें"]],
    hl: [["Baag tip", "Scab se seb kaise bachayein?", "3 aasaan kadam"],
         ["1", "Giri hui pattiyan ikattha karein", "Sardi mein scab inhi pattiyon mein palta hai"],
         ["2", "Hari kali par pehla spray", "Samay par spray sabse zaroori hai"],
         ["3", "Baarish ke baad baag jaanchein", "Patton par bhoore-kaale dhabbe dekhein"]],
    en: [["Orchard tip", "How to protect apples from scab", "3 simple steps"],
         ["1", "Collect fallen leaves", "Scab survives the winter in them"],
         ["2", "First spray at green tip", "Timing matters most"],
         ["3", "Check the orchard after rain", "Look for brown-black spots on leaves"]]
  },
  feat: {
    hi: [["सेब साथी", "हर पेटी का असली मुनाफ़ा जानें", "मुफ़्त मुनाफ़ा कैलकुलेटर"],
         ["1", "बाग़ और लॉट जोड़ें", "ग्रेड, पेटियाँ, रेट और खर्च"],
         ["2", "मंडी और लदानी की तुलना", "कहाँ बेचना फ़ायदेमंद, तुरंत देखें"],
         ["3", "हर साल का पूरा हिसाब", "आपके फ़ोन में, सुरक्षित"]],
    hl: [["Seb Saathi", "Har peti ka asli munafa jaanein", "Free profit calculator"],
         ["1", "Baag aur lot jodein", "Grade, petiyan, rate aur kharcha"],
         ["2", "Mandi aur Ladani ki tulna", "Kahan bechna faydemand, turant dekhein"],
         ["3", "Har saal ka poora hisaab", "Aapke phone mein, surakshit"]],
    en: [["Seb Saathi", "Know the real profit on every box", "Free profit calculator"],
         ["1", "Add orchards and lots", "Grade, boxes, rate and costs"],
         ["2", "Compare mandi and ladani", "See where selling pays more"],
         ["3", "Every year's accounts", "Safe on your phone"]]
  },
  alert: {
    hi: [["चेतावनी", "बारिश के बाद स्कैब का ख़तरा", "आज ही अपना बाग़ जाँचें"],
         ["पहचान", "पत्तों पर जैतूनी-भूरे धब्बे", "फलों पर काले, खुरदरे धब्बे"],
         ["क्या करें", "फ़ोटो खींचें, सेब साथी से जाँचें", "बीमारी जाँच मुफ़्त है"]],
    hl: [["Chetavni", "Baarish ke baad scab ka khatra", "Aaj hi apna baag jaanchein"],
         ["Pehchaan", "Patton par jaitooni-bhoore dhabbe", "Phalon par kaale, khurdure dhabbe"],
         ["Kya karein", "Photo khinchein, Seb Saathi se jaanchein", "Bimari jaanch free hai"]],
    en: [["Warning", "Scab risk after rain", "Check your orchard today"],
         ["Signs", "Olive-brown spots on leaves", "Dark, rough spots on fruit"],
         ["What to do", "Take a photo, check it in Seb Saathi", "Disease check is free"]]
  },
  season: {
    hi: [["{m}", "इस महीने बाग़ के ज़रूरी काम", "सेब साथी मौसम कैलेंडर"],
         ["1", "गिरी पत्तियाँ साफ़ करें", "बीमारी अगले साल तक न पहुँचे"],
         ["2", "छँटाई की तैयारी", "औज़ार तेज़ और साफ़ रखें"],
         ["3", "मिट्टी जाँच करवाएँ", "खाद सही मात्रा में डालें"]],
    hl: [["{m}", "Is mahine baag ke zaroori kaam", "Seb Saathi season calendar"],
         ["1", "Giri pattiyan saaf karein", "Bimari agle saal tak na pahunche"],
         ["2", "Chhantai ki taiyari", "Auzaar tez aur saaf rakhein"],
         ["3", "Mitti jaanch karwayein", "Khaad sahi matra mein daalein"]],
    en: [["{m}", "This month's orchard jobs", "Seb Saathi season calendar"],
         ["1", "Clear fallen leaves", "Stop disease carrying into next year"],
         ["2", "Get ready for pruning", "Keep tools sharp and clean"],
         ["3", "Get a soil test", "Feed the right amount"]]
  }
};
const VS_TAGS = "#सेबसाथी #SebSaathi #सेब #Apple #AppleFarming #HimachalApple #KashmirApple #Rohru #Kisan";
const VS_FMT = { "916": [1080, 1920], "11": [1080, 1080], "45": [1080, 1350] };

/* ---------- state ---------- */
const VS = { tpl: "tip", vlang: "hi", fmt: "916", cta: "", scenes: [], music: null, vol: 0.6, sel: 0, out: null, msg: "", err: "" };
const vsMonth = () => VS_MONTH[VS.vlang][new Date().getMonth()];
function vsFromTpl() {
  VS.ai = null;
  VS.scenes = VS_TPL[VS.tpl][VS.vlang].map((s, i) => ({ label: s[0].replace("{m}", vsMonth()), title: s[1], sub: s[2], dur: i ? 3 : 2.5, media: (VS.scenes[i] || {}).media || null }));
  VS.cta = VS_BRAND[VS.vlang].cta;
}
function vsSave() {
  try { localStorage.setItem("vs-draft", JSON.stringify({ tpl: VS.tpl, vlang: VS.vlang, fmt: VS.fmt, cta: VS.cta, vol: VS.vol,
    scenes: VS.scenes.map(s => ({ label: s.label, title: s.title, sub: s.sub, dur: s.dur })) })); } catch (e) {}
}
(function vsLoad() {
  let d = null; try { d = JSON.parse(localStorage.getItem("vs-draft") || "null"); } catch (e) {}
  if (d && VS_TPL[d.tpl] && VS_BRAND[d.vlang] && Array.isArray(d.scenes) && d.scenes.length) {
    Object.assign(VS, { tpl: d.tpl, vlang: d.vlang, fmt: VS_FMT[d.fmt] ? d.fmt : "916", cta: String(d.cta || VS_BRAND[d.vlang].cta), vol: +d.vol >= 0 ? +d.vol : 0.6 });
    VS.scenes = d.scenes.slice(0, 8).map(s => ({ label: String(s.label || ""), title: String(s.title || ""), sub: String(s.sub || ""), dur: Math.min(8, Math.max(1.5, +s.dur || 3)), media: null }));
  } else vsFromTpl();
})();
const VS_END = 3.2, VS_X = 0.35; /* end-card seconds, crossfade seconds */
const vsTotal = () => VS.scenes.reduce((s, x) => s + x.dur, 0) + VS_END;

/* ---------- drawing ---------- */
const vsMark = new Image(); vsMark.src = "/icons/mark.svg";
let vsCv = null, vsCtx = null, vsOff = null;
const vsClamp = x => Math.max(0, Math.min(1, x));
const vsEase = x => 1 - Math.pow(1 - vsClamp(x), 3);
const vsFont = (w, px, hi) => w + " " + Math.round(px) + "px " + (hi ? '"Khand","Hind",sans-serif' : '"Barlow Semi Condensed","Hind",sans-serif');
const vsBody = (w, px) => w + " " + Math.round(px) + 'px "Hind",sans-serif';
function vsWrap(ctx, text, maxW) {
  const out = [];
  String(text || "").split("\n").forEach(par => {
    let line = "";
    par.split(/\s+/).filter(Boolean).forEach(w => { const t = line ? line + " " + w : w; if (line && ctx.measureText(t).width > maxW) { out.push(line); line = w; } else line = t; });
    if (line) out.push(line);
  });
  return out;
}
function vsRound(ctx, x, y, w, h, r) { ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r); ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath(); }
function vsBg(ctx, W, H, th, t) {
  const g = ctx.createLinearGradient(0, 0, W * 0.6, H); g.addColorStop(0, th.a); g.addColorStop(1, th.b);
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  if (vsMark.complete && vsMark.naturalWidth) {
    const s = W * 0.95; ctx.save(); ctx.globalAlpha = 0.09; ctx.translate(W * 0.62, H * 0.3 + Math.sin(t * 0.8) * 12); ctx.rotate(-0.12);
    ctx.drawImage(vsMark, -s / 2, -s / 2, s, s * 196 / 180); ctx.restore();
  }
}
function vsMedia(ctx, W, H, m, p, i) {
  const el = m.el, iw = el.videoWidth || el.naturalWidth, ih = el.videoHeight || el.naturalHeight;
  if (!iw || !ih) return false;
  const z = m.type === "img" ? (i % 2 ? 1.14 - 0.1 * p : 1.04 + 0.1 * p) : 1.0;
  const s = Math.max(W / iw, H / ih) * z, dw = iw * s, dh = ih * s;
  const dx = (W - dw) / 2 + (m.type === "img" ? (i % 2 ? -1 : 1) * (p - 0.5) * W * 0.04 : 0), dy = (H - dh) / 2;
  try { ctx.drawImage(el, dx, dy, dw, dh); } catch (e) { return false; }
  const g = ctx.createLinearGradient(0, 0, 0, H);
  g.addColorStop(0, "rgba(0,0,0,.45)"); g.addColorStop(0.22, "rgba(0,0,0,.05)"); g.addColorStop(0.45, "rgba(0,0,0,.15)"); g.addColorStop(1, "rgba(0,0,0,.82)");
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  return true;
}
function vsScene(ctx, W, H, sc, i, local, th) {
  const k = W / 1080, tall = H / W > 1.5, hi = VS.vlang === "hi";
  const p = vsClamp(local / sc.dur);
  const media = sc.media && vsMedia(ctx, W, H, sc.media, p, i);
  if (!media) vsBg(ctx, W, H, th, local + i);
  const maxW = W - 150 * k;
  /* measure */
  let tpx = (tall ? 104 : 88) * k, lines;
  for (;;) { ctx.font = vsFont("700", tpx, hi); lines = vsWrap(ctx, sc.title, maxW); if (lines.length <= 4 || tpx < 56 * k) break; tpx *= 0.9; }
  const spx = (tall ? 46 : 40) * k; ctx.font = vsBody("500", spx); const subs = vsWrap(ctx, sc.sub, maxW).slice(0, 3);
  const lpx = 40 * k, lh = tpx * (hi ? 1.18 : 1.06), slh = spx * 1.35;
  const isNum = /^\d{1,2}$/.test(sc.label.trim());
  const labH = sc.label.trim() ? (isNum ? 112 * k : lpx * 1.9) + 26 * k : 0;
  const blockH = labH + lines.length * lh + (subs.length ? 36 * k + subs.length * slh : 0);
  let y = (media ? H * (tall ? 0.70 : 0.66) : H * 0.52) - blockH / 2;
  y = Math.min(y, H - blockH - (tall ? 190 : 90) * k);
  const x = 75 * k;
  const pop = (d) => vsEase((local - d) / 0.55);
  /* label */
  if (sc.label.trim()) {
    const e = pop(0.05); ctx.save(); ctx.globalAlpha = e; ctx.translate(0, (1 - e) * 30 * k);
    if (isNum) {
      const r = 56 * k; ctx.fillStyle = th.acc; ctx.beginPath(); ctx.arc(x + r, y + r, r * (0.6 + 0.4 * e), 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = th.accFg; ctx.font = vsFont("700", 72 * k, false); ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.fillText(sc.label.trim(), x + r, y + r + 4 * k);
      ctx.textAlign = "left";
    } else {
      ctx.font = vsBody("600", lpx); const w = ctx.measureText(sc.label.trim()).width + 48 * k, h = lpx * 1.9;
      ctx.fillStyle = th.acc; vsRound(ctx, x, y, w, h, h / 2); ctx.fill();
      ctx.fillStyle = th.accFg; ctx.textBaseline = "middle"; ctx.fillText(sc.label.trim(), x + 24 * k, y + h / 2 + 3 * k);
    }
    ctx.restore(); y += labH;
  }
  /* title */
  ctx.textBaseline = "top"; ctx.fillStyle = "#FFFFFF"; ctx.shadowColor = "rgba(0,0,0,.45)"; ctx.shadowBlur = 18 * k; ctx.shadowOffsetY = 4 * k;
  lines.forEach((ln, j) => { const e = pop(0.2 + j * 0.09); ctx.save(); ctx.globalAlpha = e; ctx.font = vsFont("700", tpx, hi); ctx.fillText(ln, x, y + j * lh + (1 - e) * 46 * k); ctx.restore(); });
  y += lines.length * lh;
  if (subs.length) {
    y += 36 * k; const e = pop(0.25 + lines.length * 0.09 + 0.15);
    ctx.save(); ctx.globalAlpha = e * 0.92; ctx.font = vsBody("500", spx); subs.forEach((s, j) => ctx.fillText(s, x, y + j * slh + (1 - e) * 30 * k)); ctx.restore();
    /* accent underline */
    ctx.save(); ctx.shadowColor = "transparent"; ctx.fillStyle = th.acc; ctx.fillRect(x, y - 24 * k, 120 * k * e, 6 * k); ctx.restore();
  }
  ctx.shadowColor = "transparent"; ctx.shadowBlur = 0; ctx.shadowOffsetY = 0;
}
function vsEnd(ctx, W, H, th, local) {
  const k = W / 1080, b = VS_BRAND[VS.vlang], hi = VS.vlang === "hi";
  vsBg(ctx, W, H, th, local);
  const tall = H / W > 1.5, cx = W / 2;
  let y = H * (tall ? 0.26 : 0.12);
  const e1 = vsEase(local / 0.6), ms = 250 * k * (0.7 + 0.3 * e1);
  if (vsMark.complete && vsMark.naturalWidth) { ctx.save(); ctx.globalAlpha = e1; ctx.drawImage(vsMark, cx - ms / 2, y + (250 * k - ms) / 2, ms, ms * 196 / 180); ctx.restore(); }
  y += 300 * k;
  ctx.textAlign = "center"; ctx.textBaseline = "top"; ctx.fillStyle = "#FFFFFF";
  const e2 = vsEase((local - 0.2) / 0.5);
  ctx.save(); ctx.globalAlpha = e2; ctx.font = vsFont("700", 130 * k, hi); ctx.fillText(b.name, cx, y + (1 - e2) * 30 * k); ctx.restore();
  y += 150 * k;
  const e3 = vsEase((local - 0.35) / 0.5);
  ctx.save(); ctx.globalAlpha = e3 * 0.85; ctx.font = vsBody("500", 40 * k); ctx.fillText(b.tag, cx, y); ctx.restore();
  y += (tall ? 150 : 90) * k;
  const e4 = vsEase((local - 0.6) / 0.5);
  ctx.font = vsBody("600", 50 * k); const cl = vsWrap(ctx, VS.cta, W - 260 * k).slice(0, 3), clh = 50 * k * 1.35;
  const bw = Math.max(...cl.map(l => ctx.measureText(l).width), 200 * k) + 90 * k, bh = cl.length * clh + 60 * k;
  ctx.save(); ctx.globalAlpha = e4; ctx.translate(cx, y + bh / 2); ctx.scale(0.9 + 0.1 * e4, 0.9 + 0.1 * e4);
  ctx.fillStyle = th.acc; vsRound(ctx, -bw / 2, -bh / 2, bw, bh, 28 * k); ctx.fill();
  ctx.fillStyle = th.accFg; cl.forEach((l, j) => ctx.fillText(l, 0, -bh / 2 + 32 * k + j * clh)); ctx.restore();
  y += bh + (tall ? 110 : 60) * k;
  const e5 = vsEase((local - 0.9) / 0.5);
  ctx.save(); ctx.globalAlpha = e5; ctx.fillStyle = "#FFFFFF"; ctx.font = '600 ' + Math.round(54 * k) + 'px "IBM Plex Mono",ui-monospace,monospace'; ctx.fillText("sebsaathi.com", cx, y); ctx.restore();
  ctx.textAlign = "left";
}
function vsChrome(ctx, W, H, idx, frac, n) {
  /* story-style progress bars and the small brand mark, on the scene screens only */
  const k = W / 1080, pad = 40 * k, gap = 10 * k, bw = (W - pad * 2 - gap * (n - 1)) / n;
  for (let j = 0; j < n; j++) {
    ctx.fillStyle = "rgba(255,255,255,.32)"; vsRound(ctx, pad + j * (bw + gap), 36 * k, bw, 8 * k, 4 * k); ctx.fill();
    const f = j < idx ? 1 : j === idx ? frac : 0;
    if (f > 0) { ctx.fillStyle = "#FFFFFF"; vsRound(ctx, pad + j * (bw + gap), 36 * k, Math.max(8 * k, bw * f), 8 * k, 4 * k); ctx.fill(); }
  }
  if (vsMark.complete && vsMark.naturalWidth) ctx.drawImage(vsMark, pad, 72 * k, 58 * k, 58 * k * 196 / 180);
  ctx.fillStyle = "#FFFFFF"; ctx.textBaseline = "middle"; ctx.font = vsFont("700", 46 * k, VS.vlang === "hi");
  ctx.shadowColor = "rgba(0,0,0,.4)"; ctx.shadowBlur = 10 * k; ctx.fillText(VS_BRAND[VS.vlang].name, pad + 72 * k, 108 * k); ctx.shadowColor = "transparent"; ctx.shadowBlur = 0;
}
function vsAt(t) { /* which scene is on screen at time t */
  let s = 0;
  for (let i = 0; i < VS.scenes.length; i++) { if (t < s + VS.scenes[i].dur) return { i, local: t - s, start: s }; s += VS.scenes[i].dur; }
  return { i: VS.scenes.length, local: t - s, start: s };
}
function vsDraw(t) {
  if (!vsCtx) return;
  const ctx = vsCtx, W = vsCv.width, H = vsCv.height, th = VS_THEMES[VS.tpl], n = VS.scenes.length;
  const one = (i, local) => { if (i >= n) vsEnd(ctx, W, H, th, local); else vsScene(ctx, W, H, VS.scenes[i], i, local, th); };
  const a = vsAt(t);
  ctx.save(); one(a.i, a.local); ctx.restore();
  if (a.i > 0 && a.local < VS_X) { /* fade in over the previous scene */
    const prev = vsAt(a.start - 0.001);
    if (!vsOff) vsOff = document.createElement("canvas");
    const off = vsOff; if (off.width !== W || off.height !== H) { off.width = W; off.height = H; }
    const oc = off.getContext("2d"); oc.clearRect(0, 0, W, H); oc.drawImage(vsCv, 0, 0); ctx.save(); one(prev.i, prev.local + a.local); ctx.restore();
    ctx.save(); ctx.globalAlpha = vsEase(a.local / VS_X); ctx.drawImage(off, 0, 0); ctx.restore();
  }
  if (a.i < n) vsChrome(ctx, W, H, a.i, vsClamp(a.local / VS.scenes[a.i].dur), n);
}
function vsStill() { /* idle preview: the selected scene with its words fully in */
  if (VS.play) return;
  const i = Math.min(VS.sel, VS.scenes.length);
  let s = 0; for (let j = 0; j < i; j++) s += VS.scenes[j].dur;
  const sc = VS.scenes[i], m = sc && sc.media;
  if (m && m.type === "vid" && m.el.readyState >= 2 && m.el.paused && m.el.currentTime < 0.05) { try { m.el.currentTime = Math.min(1, (m.el.duration || 2) / 2); } catch (e) {} }
  vsDraw(s + (i < VS.scenes.length ? Math.min(VS.scenes[i].dur - 0.05, 1.6) : 2.4));
}
function vsSize() {
  const [W, H] = VS_FMT[VS.fmt];
  if (vsCv && (vsCv.width !== W || vsCv.height !== H)) { vsCv.width = W; vsCv.height = H; }
}

/* ---------- playing and recording ---------- */
let vsAC = null, vsGain = null, vsDest = null, vsSrcFor = null;
function vsAudio() {
  if (!VS.music) return null;
  try {
    if (!vsAC) { vsAC = new (window.AudioContext || window.webkitAudioContext)(); vsGain = vsAC.createGain(); vsDest = vsAC.createMediaStreamDestination(); vsGain.connect(vsAC.destination); vsGain.connect(vsDest); }
    if (vsSrcFor !== VS.music.el) { vsAC.createMediaElementSource(VS.music.el).connect(vsGain); vsSrcFor = VS.music.el; }
    if (vsAC.state === "suspended") vsAC.resume();
    return vsDest;
  } catch (e) { return null; }
}
function vsMime() {
  if (!window.MediaRecorder || !HTMLCanvasElement.prototype.captureStream) return "";
  const c = ["video/mp4;codecs=avc1.42E01F,mp4a.40.2", "video/mp4;codecs=avc1,mp4a.40.2", "video/mp4;codecs=avc1", "video/mp4", "video/webm;codecs=vp9,opus", "video/webm;codecs=vp8,opus", "video/webm"];
  return c.find(m => { try { return MediaRecorder.isTypeSupported(m); } catch (e) { return false; } }) || "";
}
function vsStop(keep) {
  const P = VS.play; if (!P) return;
  VS.play = null; cancelAnimationFrame(P.raf); clearTimeout(P.to);
  VS.scenes.forEach(s => { if (s.media && s.media.type === "vid") s.media.el.pause(); });
  if (VS.music) VS.music.el.pause();
  if (P.rec && P.rec.state !== "inactive") { if (keep) P.rec.stop(); else { P.rec.onstop = null; P.rec.stop(); } }
  if (!P.rec || !keep) { VS.msg = ""; renderStudio(); }
}
function vsStart(record) {
  if (VS.play) return;
  vsSize();
  let rec = null, chunks = [], mime = "";
  if (record) {
    if (VS.music) VS.music.el.pause();
    mime = vsMime();
    if (!mime) { VS.err = tr("vs_nosupport"); renderStudio(); return; }
    const st = vsCv.captureStream(30), dest = vsAudio();
    if (dest) dest.stream.getAudioTracks().forEach(tk => st.addTrack(tk));
    try { rec = new MediaRecorder(st, { mimeType: mime, videoBitsPerSecond: 8e6, audioBitsPerSecond: 128e3 }); } catch (e) { VS.err = tr("vs_nosupport"); renderStudio(); return; }
    rec.ondataavailable = e => { if (e.data && e.data.size) chunks.push(e.data); };
    rec.onstop = () => {
      const type = mime.split(";")[0], blob = new Blob(chunks, { type });
      if (VS.out) URL.revokeObjectURL(VS.out.url);
      VS.out = { url: URL.createObjectURL(blob), blob, size: blob.size, ext: type.indexOf("mp4") >= 0 ? "mp4" : "webm", secs: Math.round(vsTotal()), hidden: P.hidden };
      VS.msg = ""; vsQRes = ""; YTU = { title: vsYtTitle(), desc: vsYtDesc(), priv: (YTU && YTU.priv) || "public", at: "" }; renderStudio();
    };
  } else vsAudio();
  const P = { t0: performance.now(), rec, cur: -1, hidden: false, last: 0 };
  VS.play = P; VS.err = "";
  if (VS.music) { const m = VS.music.el; m.currentTime = 0; m.loop = true; if (vsGain) vsGain.gain.value = VS.vol; else m.volume = VS.vol; m.play().catch(() => {}); }
  if (rec) rec.start(250);
  const total = vsTotal();
  const tick = () => {
    if (VS.play !== P) return;
    const t = (performance.now() - P.t0) / 1000;
    if (document.hidden) P.hidden = true;
    const a = vsAt(Math.min(t, total));
    if (a.i !== P.cur) {
      const old = VS.scenes[P.cur]; if (old && old.media && old.media.type === "vid") old.media.el.pause();
      const sc = VS.scenes[a.i]; if (sc && sc.media && sc.media.type === "vid") { const v = sc.media.el; v.currentTime = 0; v.play().catch(() => {}); }
      P.cur = a.i;
    }
    if (VS.music && vsGain && t > total - 1.2) vsGain.gain.value = VS.vol * vsClamp((total - t) / 1.2);
    vsDraw(Math.min(t, total));
    if (rec && t - P.last > 0.5) { P.last = t; set("vsMsg", tr("vs_making").replace("{s}", Math.min(Math.round(t), Math.round(total))).replace("{t}", Math.round(total))); }
    if (t >= total) { setTimeout(() => vsStop(true), rec ? 200 : 600); if (!rec) setTimeout(vsStill, 650); return; }
    if (document.hidden) P.to = setTimeout(tick, 33); else P.raf = requestAnimationFrame(tick);
  };
  VS.msg = rec ? tr("vs_making").replace("{s}", 0).replace("{t}", Math.round(total)) : "";
  renderStudio();
  tick();
}

/* ---------- caption ---------- */
function vsCaption() {
  const s = VS.scenes, b = VS_BRAND[VS.vlang];
  if (VS.ai && VS.ai.caption) return (VS.ai.caption + (/sebsaathi\.com/.test(VS.ai.caption) ? "" : "\n\n👉 https://sebsaathi.com")).trim();
  const head = s[0] ? (s[0].title + (s[0].sub ? " — " + s[0].sub : "")) : "";
  const pts = s.slice(1).map(x => (/^\d{1,2}$/.test(x.label.trim()) ? x.label.trim() + ". " : x.label.trim() ? x.label.trim() + ": " : "• ") + x.title + (x.sub ? " (" + x.sub + ")" : ""));
  return [head, "", ...pts, "", VS.cta, "👉 https://sebsaathi.com", "", b.name + " · " + b.tag, VS_TAGS].join("\n").replace(/\n{3,}/g, "\n\n").trim();
}

/* ---------- from the Marketing tab: a video idea's words, and handing the finished video to the post list ---------- */
function vsPrefill(name, hook, show) {
  VS.ai = null;
  VS.vlang = "hl";
  const old = VS.scenes;
  VS.scenes = [{ label: String(name || "").slice(0, 40), title: String(hook || ""), sub: "", dur: 2.5 }, { label: "1", title: "", sub: "", dur: 3 }, { label: "2", title: "", sub: "", dur: 3 }]
    .map((x, i) => Object.assign(x, { media: (old[i] || {}).media || null }));
  VS.cta = VS_BRAND.hl.cta; VS.sel = 0; VS.err = "";
  VS.msg = tr("vi_prefill").replace("{v}", name || "").replace("{s}", show || "");
  vsSave(); renderStudio();
  const t = $("vs-title-1"); if (t) setTimeout(() => { try { t.focus({ preventScroll: true }); } catch (e) {} }, 400);
}
/* words written by the AI on the Marketing tab ("Ask the AI for a video") */
function vsPrefillAI(v, lg) {
  if (!v || !Array.isArray(v.scenes) || !v.scenes.length) return;
  VS.vlang = lg === "hi" ? "hi" : lg === "en" ? "en" : "hl";
  const old = VS.scenes;
  VS.scenes = v.scenes.slice(0, 8).map((x, i) => ({ label: String(x.label || ""), title: String(x.title || ""), sub: String(x.sub || ""), dur: i ? 3 : 2.5, media: (old[i] || {}).media || null }));
  VS.cta = String(v.cta || VS_BRAND[VS.vlang].cta); VS.sel = 0; VS.err = "";
  VS.ai = { title: String(v.title || ""), caption: String(v.caption || "") };
  VS.msg = v.shoot ? tr("vs_ai_shoot").replace("{s}", v.shoot) : "";
  vsSave(); renderStudio();
}
let vsQBusy = false, vsQRes = "";
async function vsQueue() {
  const o = VS.out; if (!o || vsQBusy || typeof mkQueueVideo !== "function") return;
  if (o.ext !== "mp4") { vsQRes = '<p class="autherr">' + tr("vs_q_webm") + "</p>"; renderStudio(); return; }
  vsQBusy = true; vsQRes = ""; renderStudio();
  try { await mkQueueVideo(o.blob, vsCaption()); vsQRes = "<p>✓ " + tr("vs_q_ok") + "</p>"; }
  catch (e) { vsQRes = '<p class="autherr">' + esc(tr("vs_q_err").replace("{m}", typeof mkV2 === "function" && mkV2(e) ? tr("mk_v2_setup") : String(e.message || e))) + "</p>"; }
  vsQBusy = false; renderStudio();
}
const vsQueueHtml = () => VS.out ? '<div class="vsctl"><button type="button" class="btn-s vsgo" id="vsQueue"' + (vsQBusy ? " disabled" : "") + ">" + tr(vsQBusy ? "vs_q_busy" : "vs_q_add") + "</button></div>" + (vsQRes ? '<div role="status">' + vsQRes + "</div>" : "") : "";
const vsYtDesc = () => vsCaption().replace("https://sebsaathi.com", "https://sebsaathi.com/?src=yt");

/* ---------- YouTube: connect the channel and upload (api/youtube.js, supabase/youtube.sql) ---------- */
let YT = null, YTU = null, ytBusy = "", ytRes = "", ytNote = "";
const vsYtTitle = () => (String((VS.ai && VS.ai.title) || (VS.scenes[0] || {}).title || VS_BRAND[VS.vlang].name).replace(/[<>]/g, "").slice(0, 88) + " #Shorts").trim();
async function ytCall(action) {
  const r = await fetch("/api/youtube", { method: "POST", headers: { "Content-Type": "application/json", Authorization: "Bearer " + await mkTok() }, body: JSON.stringify({ action }) });
  const j = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(j.error || ("HTTP " + r.status));
  return j;
}
async function ytLoad() {
  YT = null; renderStudio();
  try { YT = await ytCall("status"); } catch (e) { YT = { setup: false, error: String(e.message || e) }; }
  renderStudio();
}
function ytCardHtml() {
  let h = '<div class="vsscene"><div class="vshd"><b>' + tr("yt_h") + '</b><button type="button" class="btn-s vsmini" data-yt="refresh">' + tr("yt_refresh") + "</button></div>";
  if (ytNote) h += '<p class="fine" role="status">' + esc(ytNote) + "</p>";
  if (!YT) return h + '<p class="fine">' + tr("yt_checking") + "</p></div>";
  if (YT.error) h += '<p class="autherr">' + esc(YT.error) + "</p>";
  if (!YT.setup) {
    const steps = [1, 2, 3, 4, 5, 6, 7];
    return h + "<p><b>" + tr("yt_setup_h") + "</b></p>" + (YT.missing && YT.missing.length ? '<p class="fine">' + esc(tr("yt_missing").replace("{m}", YT.missing.join(", "))) + "</p>" : "") +
      '<ol class="mksteps">' + steps.map(n => "<li><b>" + tr("yt_s" + n) + '</b><br><span class="fine">' + tr("yt_s" + n + "p") + "</span></li>").join("") + "</ol></div>";
  }
  if (YT.connected && YT.channel) {
    return h + '<div class="vsmedia"><span class="vsthumb">▶ ' + esc(tr("yt_conn").replace("{c}", YT.channel.title + (YT.channel.handle ? " (" + YT.channel.handle + ")" : ""))) + "</span>" +
      '<a class="btn-s vsmini" href="' + esc(YT.channel.url) + '" target="_blank" rel="noopener">' + tr("yt_open") + "</a>" +
      '<button type="button" class="btn-s vsmini" data-yt="disconnect">' + tr("yt_disc") + "</button></div></div>";
  }
  return h + '<p class="fine">' + tr("yt_none") + '</p><div class="vsctl"><button type="button" class="btn-s vsgo" data-yt="connect"' + (ytBusy ? " disabled" : "") + ">" + tr("yt_connect") + '</button></div><p class="fine">' + tr("yt_unverified") + "</p></div>";
}
function ytOutHtml() {
  if (!VS.out) return "";
  if (!YT || !YT.connected) return '<p class="fine">' + tr("yt_connect_first") + "</p>";
  const u = YTU || { title: vsYtTitle(), desc: vsYtDesc(), priv: "public", at: "" }; YTU = u;
  return '<div class="ytup"><p><b>' + tr("yt_up_h") + "</b> · " + esc(YT.channel.title) + "</p>" +
    '<div class="vsf"><label for="ytTitle">' + tr("yt_title") + '</label><input id="ytTitle" maxlength="100" value="' + esc(u.title) + '"></div>' +
    '<div class="vsf"><label for="ytDesc">' + tr("yt_desc") + '</label><textarea id="ytDesc" rows="4" maxlength="4900">' + esc(u.desc) + "</textarea></div>" +
    '<div class="vsf"><label for="ytPriv">' + tr("yt_priv") + '</label><select id="ytPriv" class="ytsel">' + ["public", "unlisted", "private"].map(p => '<option value="' + p + '"' + (p === u.priv ? " selected" : "") + ">" + tr("yt_p_" + p) + "</option>").join("") + "</select></div>" +
    '<div class="vsf"><label for="ytAt">' + tr("yt_when") + '</label><input id="ytAt" type="datetime-local" value="' + esc(u.at || "") + '"><span class="fine">' + tr("yt_when_p") + "</span></div>" +
    '<div class="vsctl"><button type="button" class="btn-s vsgo" data-yt="upload"' + (ytBusy ? " disabled" : "") + ">" + (ytBusy ? esc(ytBusy) : tr("yt_go")) + "</button></div>" +
    (ytRes ? '<div role="status">' + ytRes + "</div>" : "") + "</div>";
}
function ytProgress(t) { ytBusy = t; const b = document.querySelector('[data-yt="upload"]'); if (b) { b.textContent = t || tr("yt_go"); b.disabled = !!t; } }
async function ytUpload() {
  const o = VS.out; if (!o || !o.blob || ytBusy) return;
  const u = YTU, title = String(u.title || "").replace(/[<>]/g, "").trim().slice(0, 100) || vsYtTitle();
  /* a publish time (India time) → YouTube keeps it private and publishes it then */
  const at = u.at && Date.parse(u.at + ":00Z") - 330 * 60000 > Date.now() + 60000 ? new Date(Date.parse(u.at + ":00Z") - 330 * 60000).toISOString() : "";
  ytRes = ""; ytProgress(tr("yt_starting"));
  try {
    const k = await ytCall("token");
    if (!k.access_token) { YT.connected = !!k.connected && k.error !== "reconnect"; throw new Error(k.error === "reconnect" ? tr("yt_reconnect") : (k.error || tr("yt_reconnect"))); }
    const type = o.blob.type || "video/mp4";
    const init = await fetch("https://www.googleapis.com/upload/youtube/v3/videos?uploadType=resumable&part=snippet,status", {
      method: "POST",
      headers: { Authorization: "Bearer " + k.access_token, "Content-Type": "application/json; charset=UTF-8", "X-Upload-Content-Type": type, "X-Upload-Content-Length": String(o.blob.size) },
      body: JSON.stringify({ snippet: { title, description: String(u.desc || "").replace(/[<>]/g, "").slice(0, 4900), categoryId: "27", defaultLanguage: VS.vlang === "en" ? "en" : "hi", defaultAudioLanguage: VS.vlang === "en" ? "en" : "hi", tags: ["Seb Saathi", "सेब साथी", "apple farming", "सेब", "Himachal apple", "Kashmir apple"] },
        status: Object.assign({ privacyStatus: at ? "private" : (u.priv || "public"), selfDeclaredMadeForKids: false }, at ? { publishAt: at } : {}) })
    });
    if (!init.ok) { const j = await init.json().catch(() => ({})); throw new Error((j.error && j.error.message) || ("YouTube " + init.status)); }
    const loc = init.headers.get("Location"); if (!loc) throw new Error("no upload address");
    const v = await new Promise((ok, bad) => {
      const x = new XMLHttpRequest(); x.open("PUT", loc); x.setRequestHeader("Content-Type", type);
      x.upload.onprogress = ev => { if (ev.lengthComputable) ytProgress(tr("yt_upping").replace("{p}", Math.round(ev.loaded / ev.total * 100))); };
      x.onload = () => { let j = {}; try { j = JSON.parse(x.responseText); } catch (e) {} if (x.status >= 200 && x.status < 300 && j.id) ok(j); else bad(new Error((j.error && j.error.message) || ("YouTube " + x.status))); };
      x.onerror = () => bad(new Error("network")); x.send(o.blob);
    });
    const watch = "https://youtube.com/shorts/" + v.id, studio = "https://studio.youtube.com/video/" + v.id + "/edit";
    const locked = !at && (u.priv || "public") !== "private" && v.status && v.status.privacyStatus === "private";
    ytRes = "<p>" + tr("yt_done") + ' · <a href="' + watch + '" target="_blank" rel="noopener">' + tr("yt_watch") + '</a> · <a href="' + studio + '" target="_blank" rel="noopener">' + tr("yt_studio") + "</a></p>" + (locked ? '<p class="autherr">' + tr("yt_locked") + "</p>" : "");
    if (at) ytRes += "<p>" + esc(tr("yt_sched_ok").replace("{d}", typeof qShow === "function" ? qShow(at) : at)) + "</p>";
    let kept = false;
    if (typeof mkQueueYt === "function") { try { kept = await mkQueueYt(title, watch, at || new Date().toISOString()); } catch (e) {} }
    if (!kept && typeof mkSave === "function") { try { await mkSave("post:" + Date.now(), { done: true, value: JSON.stringify({ t: ("YouTube: " + title).slice(0, 80), fb: "", ig: "", yt: watch }).slice(0, 500) }); } catch (e) {} }
  } catch (e) { ytRes = '<p class="autherr">' + esc(tr("yt_err").replace("{m}", String(e.message || e))) + "</p>"; }
  ytBusy = ""; renderStudio();
}

/* ---------- page ---------- */
const vsChip = (grp, val, cur, label) => '<button type="button" class="vschip" data-vs' + grp + '="' + val + '" aria-pressed="' + (val === cur) + '">' + label + "</button>";
const vsKb = n => n > 1048576 ? (n / 1048576).toFixed(1) + " MB" : Math.round(n / 1024) + " KB";
function renderStudio() {
  const box = $("vsBody"); if (!box) return;
  const busy = !!VS.play, rec = busy && VS.play.rec;
  const focus = document.activeElement && box.contains(document.activeElement) ? document.activeElement.id : "";
  const durs = [1.5, 2, 2.5, 3, 4, 5, 6, 8];
  const scenes = VS.scenes.map((s, i) => {
    const m = s.media;
    return '<div class="vsscene' + (VS.sel === i ? " on" : "") + '" data-vsi="' + i + '">' +
      '<div class="vshd"><b>' + tr("vs_scene").replace("{n}", i + 1) + '</b>' +
      '<label class="vsdur">' + tr("vs_dur") + ' <select id="vs-dur-' + i + '" data-vsf="dur">' + durs.map(d => '<option value="' + d + '"' + (d === s.dur ? " selected" : "") + ">" + d + "</option>").join("") + "</select></label>" +
      (i ? '<button type="button" class="btn-s vsmini" data-vsup="' + i + '" aria-label="' + tr("vs_up") + '" title="' + tr("vs_up") + '">↑</button>' : "") +
      (VS.scenes.length > 1 ? '<button type="button" class="btn-s vsmini" data-vsdel="' + i + '">' + tr("vs_del") + "</button>" : "") + "</div>" +
      '<div class="vsrow"><div class="vsf vslab"><label for="vs-label-' + i + '">' + tr("vs_label") + '</label><input id="vs-label-' + i + '" data-vsf="label" maxlength="30" value="' + esc(s.label) + '"></div>' +
      '<div class="vsf"><label for="vs-sub-' + i + '">' + tr("vs_sub") + '</label><input id="vs-sub-' + i + '" data-vsf="sub" maxlength="90" value="' + esc(s.sub) + '"></div></div>' +
      '<div class="vsf"><label for="vs-title-' + i + '">' + tr("vs_title") + '</label><textarea id="vs-title-' + i + '" data-vsf="title" rows="2" maxlength="90">' + esc(s.title) + "</textarea></div>" +
      '<div class="vsmedia">' + (m ? '<span class="vsthumb">' + (m.type === "img" ? "🖼 " : "🎬 ") + esc(m.name) + "</span>" : '<span class="fine" style="margin:0">' + tr("vs_nomedia") + "</span>") +
      '<label class="btn-s vsfile">' + tr(m ? "vs_media_ch" : "vs_media") + '<input type="file" accept="image/*,video/*" data-vsmedia="' + i + '" hidden></label>' +
      (m ? '<button type="button" class="btn-s vsmini" data-vsrm="' + i + '">' + tr("vs_media_rm") + "</button>" : "") + "</div></div>";
  }).join("");
  const o = VS.out;
  box.innerHTML =
    '<div class="vsgrid"><div class="vsprev"><div id="vsSlot"></div>' +
    '<div class="vsctl"><button type="button" class="btn-s" id="vsPlay"' + (rec ? " disabled" : "") + ">" + tr(busy && !rec ? "vs_stop" : "vs_play") + '</button>' +
    '<button type="button" class="btn-s vsgo" id="vsMake"' + (busy ? " disabled" : "") + ">" + tr("vs_make") + "</button>" +
    '<span class="fine" style="margin:0">' + tr("vs_total").replace("{s}", Math.round(vsTotal())) + "</span></div>" +
    '<p class="fine" id="vsMsg" role="status">' + esc(VS.msg) + "</p>" +
    (VS.err ? '<p class="autherr" role="alert">' + esc(VS.err) + "</p>" : "") +
    (o && !busy ? '<div class="vsout"><p>' + tr("vs_done").replace("{t}", o.secs).replace("{size}", vsKb(o.size)) + '</p><a class="btn-s vsgo" href="' + o.url + '" download="seb-saathi-' + VS.tpl + "-" + new Date().toISOString().slice(0, 10) + "." + o.ext + '">' + tr("vs_dl") + " (" + o.ext.toUpperCase() + ")</a>" +
      (o.ext !== "mp4" ? '<p class="autherr">' + tr("vs_webm") + "</p>" : "") + (o.hidden ? '<p class="autherr">' + tr("vs_hidden") + "</p>" : "") + vsQueueHtml() + ytOutHtml() + "</div>" : "") +
    "</div>" +
    '<div class="vsform"' + (busy ? ' inert' : "") + '>' +
    '<div class="vsgrp"><span class="vsl">' + tr("vs_tpl") + '</span><div class="vschips">' + ["tip", "feat", "alert", "season"].map(k => vsChip("tpl", k, VS.tpl, tr("vs_t_" + k))).join("") + "</div></div>" +
    '<div class="vsgrp"><span class="vsl">' + tr("vs_vlang") + '</span><div class="vschips">' + vsChip("lang", "hi", VS.vlang, "हिंदी") + vsChip("lang", "hl", VS.vlang, "Hinglish") + vsChip("lang", "en", VS.vlang, "English") + "</div></div>" +
    '<div class="vsgrp"><span class="vsl">' + tr("vs_fmt") + '</span><div class="vschips">' + vsChip("fmt", "916", VS.fmt, tr("vs_f_916")) + vsChip("fmt", "11", VS.fmt, tr("vs_f_11")) + vsChip("fmt", "45", VS.fmt, tr("vs_f_45")) + "</div></div>" +
    scenes +
    '<div class="vsctl">' + (VS.scenes.length < 8 ? '<button type="button" class="btn-s" id="vsAdd">' + tr("vs_add") + "</button>" : '<span class="fine">' + tr("vs_max") + "</span>") +
    '<button type="button" class="btn-s" id="vsReset">' + tr("vs_reset") + "</button></div>" +
    '<div class="vsscene' + (VS.sel === VS.scenes.length ? " on" : "") + '" data-vsi="' + VS.scenes.length + '"><div class="vshd"><b>' + tr("vs_end") + '</b></div><div class="vsf"><label for="vs-cta">' + tr("vs_cta") + '</label><input id="vs-cta" maxlength="80" value="' + esc(VS.cta) + '"></div></div>' +
    '<div class="vsscene"><div class="vshd"><b>' + tr("vs_music") + "</b></div>" +
    '<div class="vsmedia">' + (VS.music ? '<span class="vsthumb">🎵 ' + esc(VS.music.name) + '</span><button type="button" class="btn-s vsmini" id="vsMusicRm">' + tr("vs_music_rm") + "</button>" +
      '<label class="vsdur">' + tr("vs_vol") + ' <input type="range" id="vsVol" min="0" max="1" step="0.05" value="' + VS.vol + '"></label>'
      : '<label class="btn-s vsfile">' + tr("vs_music_add") + '<input type="file" accept="audio/*" id="vsMusic" hidden></label>') + "</div>" +
    '<p class="fine">' + tr("vs_music_note") + "</p></div>" +
    ytCardHtml() +
    '<div class="vsf"><label for="vsCap">' + tr("vs_cap") + '</label><textarea id="vsCap" rows="7" readonly>' + esc(vsCaption()) + '</textarea></div>' +
    '<div class="vsctl"><button type="button" class="btn-s" id="vsCopy">' + tr("vs_copy") + "</button></div>" +
    '<p class="fine">' + tr("vs_how") + "</p></div></div>";
  /* the canvas is made once and moved back in: a recording keeps working through any re-render */
  if (!vsCv) { vsCv = document.createElement("canvas"); vsCv.id = "vsCanvas"; vsCtx = vsCv.getContext("2d"); }
  vsCv.setAttribute("aria-label", tr("vs_h")); $("vsSlot").replaceWith(vsCv); vsSize();
  if (busy) vsDraw(Math.min((performance.now() - VS.play.t0) / 1000, vsTotal())); else vsStill();
  if (focus && $(focus)) { try { $(focus).focus(); } catch (e) {} }
}
function vsLight() { /* refresh caption + length without rebuilding the form (keeps typing smooth) */
  const c = $("vsCap"); if (c) c.value = vsCaption();
  vsStill(); vsSave();
}
const vsSceneOf = el => { const c = el.closest && el.closest("[data-vsi]"); return c ? +c.dataset.vsi : -1; };
function vsSelect(i) {
  if (i < 0 || i === VS.sel) return;
  VS.sel = i;
  document.querySelectorAll("#vsBody .vsscene[data-vsi]").forEach(e => e.classList.toggle("on", +e.dataset.vsi === i));
  vsStill();
}
function vsLoadFile(file, i) {
  const isImg = /^image\//.test(file.type), isVid = /^video\//.test(file.type);
  if (!isImg && !isVid) { VS.err = tr("vs_bad_file"); renderStudio(); return; }
  const url = URL.createObjectURL(file), old = VS.scenes[i].media;
  let el;
  if (isImg) { el = new Image(); el.onload = () => { vsSelect(i); vsStill(); }; el.onerror = () => { VS.err = tr("vs_bad_file"); VS.scenes[i].media = null; renderStudio(); }; }
  else { el = document.createElement("video"); el.muted = true; el.playsInline = true; el.loop = true; el.preload = "auto";
    el.onloadeddata = () => { vsSelect(i); vsStill(); }; el.onseeked = () => vsStill(); el.onerror = () => { VS.err = tr("vs_bad_file"); VS.scenes[i].media = null; renderStudio(); }; }
  el.src = url;
  if (old) URL.revokeObjectURL(old.url);
  VS.scenes[i].media = { type: isImg ? "img" : "vid", el, url, name: file.name.slice(0, 40) };
  VS.err = ""; VS.sel = i; renderStudio();
}

(function vsMount() {
  const ap = $("mkStudio") || $("ap-mk"); if (!ap || $("vsBody")) return;
  const sec = document.createElement("section");
  sec.className = "fbadm solo vsbox"; sec.setAttribute("aria-labelledby", "vsH");
  sec.innerHTML = '<div class="admbar"><h4 id="vsH" data-i18n="vs_h" style="margin:0"></h4></div><p class="fine" data-i18n="vs_p"></p><div id="vsBody"></div>';
  ap.appendChild(sec);
  const body = $("vsBody");
  body.addEventListener("click", e => {
    const b = e.target.closest("button"); if (!b) return;
    const d = b.dataset;
    if (d.yt) {
      if (d.yt === "refresh") { ytNote = ""; ytLoad(); }
      else if (d.yt === "upload") ytUpload();
      else if (d.yt === "disconnect") { if (confirm(tr("yt_disc_q"))) ytCall("disconnect").then(ytLoad, err => { ytNote = String(err.message || err); renderStudio(); }); }
      else if (d.yt === "connect") { ytBusy = "…"; renderStudio(); ytCall("connect").then(j => { if (j.url) location.href = j.url; else { ytBusy = ""; ytLoad(); } }, err => { ytBusy = ""; ytNote = String(err.message || err); renderStudio(); }); }
      return;
    }
    if (d.vstpl || d.vslang) {
      if (d.vstpl) VS.tpl = d.vstpl; else VS.vlang = d.vslang;
      vsFromTpl(); VS.sel = 0; vsSave(); renderStudio();
    } else if (d.vsfmt) { VS.fmt = d.vsfmt; vsSave(); renderStudio(); }
    else if (d.vsup) { const i = +d.vsup, s = VS.scenes; [s[i - 1], s[i]] = [s[i], s[i - 1]]; VS.sel = i - 1; vsSave(); renderStudio(); }
    else if (d.vsdel) { const i = +d.vsdel, m = VS.scenes[i].media; if (m) URL.revokeObjectURL(m.url); VS.scenes.splice(i, 1); VS.sel = Math.min(VS.sel, VS.scenes.length - 1); vsSave(); renderStudio(); }
    else if (d.vsrm) { const s = VS.scenes[+d.vsrm]; if (s.media) URL.revokeObjectURL(s.media.url); s.media = null; renderStudio(); }
    else if (b.id === "vsAdd") { VS.scenes.push({ label: String(VS.scenes.length), title: "", sub: "", dur: 3, media: null }); VS.sel = VS.scenes.length - 1; vsSave(); renderStudio(); const t = $("vs-title-" + VS.sel); if (t) t.focus(); }
    else if (b.id === "vsReset") { if (confirm(tr("vs_reset_q"))) { vsFromTpl(); VS.sel = 0; vsSave(); renderStudio(); } }
    else if (b.id === "vsPlay") { if (VS.play) vsStop(false); else vsStart(false); }
    else if (b.id === "vsMake") vsStart(true);
    else if (b.id === "vsQueue") vsQueue();
    else if (b.id === "vsMusicRm") { if (VS.music) { VS.music.el.pause(); URL.revokeObjectURL(VS.music.url); } VS.music = null; renderStudio(); }
    else if (b.id === "vsCopy") {
      const done = () => { b.textContent = tr("vs_copied"); setTimeout(() => { b.textContent = tr("vs_copy"); }, 1500); };
      const txt = vsCaption();
      if (navigator.clipboard) navigator.clipboard.writeText(txt).then(done, () => { $("vsCap").select(); document.execCommand("copy"); done(); });
      else { $("vsCap").select(); document.execCommand("copy"); done(); }
    }
  });
  body.addEventListener("input", e => {
    const t = e.target, f = t.dataset && t.dataset.vsf, i = vsSceneOf(t);
    if (f && i >= 0 && i < VS.scenes.length && f !== "dur") { VS.scenes[i][f] = t.value; vsSelect(i); vsLight(); }
    else if (t.id === "vs-cta") { VS.cta = t.value; vsSelect(VS.scenes.length); vsLight(); }
    else if (t.id === "ytTitle" && YTU) YTU.title = t.value;
    else if (t.id === "ytDesc" && YTU) YTU.desc = t.value;
    else if (t.id === "ytAt" && YTU) YTU.at = t.value;
    else if (t.id === "vsVol") { VS.vol = +t.value; if (vsGain) vsGain.gain.value = VS.vol; else if (VS.music) VS.music.el.volume = VS.vol; vsSave(); }
  });
  body.addEventListener("change", e => {
    const t = e.target;
    if (t.id === "ytPriv" && YTU) { YTU.priv = t.value; return; }
    if (t.dataset.vsf === "dur") { const i = vsSceneOf(t); VS.scenes[i].dur = +t.value; vsSave(); renderStudio(); }
    else if (t.dataset.vsmedia != null && t.files && t.files[0]) vsLoadFile(t.files[0], +t.dataset.vsmedia);
    else if (t.id === "vsMusic" && t.files && t.files[0]) {
      const f = t.files[0]; if (!/^audio\//.test(f.type)) { VS.err = tr("vs_bad_file"); renderStudio(); return; }
      const el = new Audio(); el.src = URL.createObjectURL(f); el.preload = "auto";
      VS.music = { el, url: el.src, name: f.name.slice(0, 40) }; VS.err = ""; renderStudio();
    }
  });
  body.addEventListener("focusin", e => { if (!VS.play) vsSelect(vsSceneOf(e.target)); });
  body.addEventListener("pointerdown", e => { if (!VS.play && !e.target.closest("button,input,select,textarea,label,a")) vsSelect(vsSceneOf(e.target)); });
  vsMark.onload = () => vsStill();
  /* canvas text needs the web fonts loaded, including the Hindi (Devanagari) letters */
  if (document.fonts && document.fonts.load) Promise.all(['700 100px "Khand"', '500 40px "Hind"', '600 40px "Hind"', '700 100px "Barlow Semi Condensed"', '600 40px "IBM Plex Mono"']
    .map(f => document.fonts.load(f, "सेब साथी Seb Saathi 123").catch(() => {}))).then(() => vsStill());
  document.querySelectorAll("#ap-mk [data-i18n]").forEach(el => { el.textContent = tr(el.dataset.i18n); });
  /* back from Google's sign-in page: say how it went, then tidy the address */
  try {
    const q = new URLSearchParams(location.search), r = q.get("yt");
    if (r) {
      const why = q.get("m") || "", map = { setup: tr("yt_missing").replace("{m}", "GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET"), expired: "please try again", no_channel: "no YouTube channel on that Google account", no_refresh: "please try again", access_denied: "access not allowed" };
      ytNote = r === "ok" ? tr("yt_back_ok") : tr("yt_back_err").replace("{m}", map[why] || why);
      history.replaceState(null, "", location.pathname + location.hash);
      setTimeout(() => { const el = $("vsBody"); if (el) el.scrollIntoView({ block: "start" }); }, 600);
    }
  } catch (e) {}
  renderStudio();   /* the YouTube check starts when the Marketing tab opens for a signed-in admin (admin.js showTab) */
})();
