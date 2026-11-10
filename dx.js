/* Seb Saathi — disease diagnosis, part 2 (loaded after the main page script and uses its helpers: $, tr, esc, T, lang, user, sb, S, DX ...)
   1. clearer photo result: severity, spray schedule link, read aloud, ask an expert
   2. keep photos only with the grower's permission
   3. expert answers shown back to the grower
   4. disease history and a health score for each orchard
   5. disease risk from the weather (scab, premature leaf fall)
   6. problems reported nearby (counts only, about 10 km squares) with a map
   7. voice typing for the note and for Saathi
   8. other hill fruits: cherry, pear, plum, walnut
   Needs supabase/diagnosis_plus.sql for 2, 3 and 6. Everything else works without it. */
(function () {
"use strict";

/* ---------- words ---------- */
Object.assign(T.en, {
  dx_crop: "Which fruit tree?", cr_apple: "Apple", cr_cherry: "Cherry", cr_pear: "Pear", cr_plum: "Plum", cr_walnut: "Walnut",
  dx_keep: "Keep my photos to help Seb Saathi learn",
  dx_keep_p: "Optional. Your photos are kept privately. Only the Seb Saathi team and the plant experts working with us can see them. Your name is never shown. With this ticked, an expert can also check this result.",
  mic_start: "Speak", mic_stop: "Stop", mic_on: "Listening… speak now. Tap Stop when done.", mic_err: "Could not hear. Check the microphone permission and try again.",
  dx_sev_mild: "Mild", dx_sev_moderate: "Spreading", dx_sev_severe: "Severe",
  dx_listen: "🔊 Listen", dx_listen_stop: "■ Stop",
  dx_ask: "Ask an expert", dx_asked: "Sent to an expert. The answer will show under My photo checks and in this orchard's Tree health card.",
  dx_ask_nophoto: "Sent. The photos were not kept, so the expert will only see this result and your note.",
  dx_kept: "Photos kept to help Seb Saathi learn. Thank you.", dx_review: "This one needs a closer look, so our expert will also check it.",
  dx_e_plus: "This part is not switched on yet. Please try again later.",
  dxm_h: "My photo checks", dxm_none: "No photo checks yet.", dxm_exp: "Expert says", dxm_wait: "Waiting for an expert", dxm_more: "Show older checks",
  dxm_noorch: "No orchard chosen",
  dxr_h: "Orchard health and disease risk", dxr_pill: "Weather · guide",
  dxr_p: "For each orchard: a health score from your photo checks and sprays, and the disease risk from rain and temperature over the last 2 days and the next 3.",
  dxr_none: "Add your orchards in Orchard Record to see their health and disease risk here.",
  dxr_noloc: "Add this orchard's location (Orchard Record → Overview) to see weather risk.",
  dxr_load: "Checking the weather…", dxr_err: "Weather could not be loaded. It will try again.",
  dxr_low: "Low risk", dxr_medium: "Some risk", dxr_high: "High risk", dxr_off: "Low risk: off season",
  dxr_off_p: "The main leaf disease season is over. Collect and destroy fallen leaves this winter: they carry scab and leaf fall to next spring.",
  dxr_scab: "Scab", dxr_mars: "Premature leaf fall",
  dxr_past: "{h} hours wet at about {t}°C in the last 2 days: an infection may have started. Make sure the spray cover was on before the rain.",
  dxr_next: "{h} hours of wet weather at about {t}°C expected {d}: keep spray cover on before the rain, as per the spray schedule.",
  dxr_ok: "No long wet spells now or in the next 3 days.",
  dxr_spray: "Open the spray schedule",
  hs_h: "Tree health", hs_good: "Good", hs_watch: "Keep watch", hs_bad: "Needs attention",
  hs_note: "A rough guide from your own records, not a full check.",
  hs_r_dx: "Found: {l}", hs_r_nospray: "No spray recorded this season", hs_r_spray: "Last spray {n} days ago", hs_r_risk: "Weather: {r}",
  hs_r_clean: "No problems found in photo checks in the last 90 days", hs_r_none: "No photo checks yet: check a few trees to get a better score",
  hs_check: "Check a photo", hs_recent: "Recent checks here", hs_more: "See all photo checks",
  dxa_h: "Problems reported near you", dxa_pill: "Last 30 days",
  dxa_p: "What other Seb Saathi growers' photo checks found, grouped by area (about 10 km). Names and exact places are never shown.",
  dxa_none: "No problems reported in the last 30 days yet.", dxa_load: "Loading…", dxa_map: "Show on map", dxa_hide: "Hide map",
  dxa_km: "~{n} km from your orchard", dxa_reports: "{n} reports", dxa_report1: "1 report", dxa_noplace: "Area not named",
  dxa_login: "Log in to see problems reported near you.", dxa_maperr: "The map could not load. Check your internet.",
  dxa_you: "Your orchard"
});
Object.assign(T.hi, {
  dx_crop: "कौन सा फल का पेड़?", cr_apple: "सेब", cr_cherry: "चेरी", cr_pear: "नाशपाती", cr_plum: "प्लम (आलूचा)", cr_walnut: "अखरोट",
  dx_keep: "सेब साथी को सिखाने के लिए मेरी फ़ोटो रखें",
  dx_keep_p: "ज़रूरी नहीं। आपकी फ़ोटो निजी रखी जाती हैं। सिर्फ़ सेब साथी टीम और हमारे साथ काम करने वाले पौध-विशेषज्ञ इन्हें देख सकते हैं। आपका नाम कभी नहीं दिखता। इस पर टिक होने से विशेषज्ञ इस नतीजे को भी जाँच सकते हैं।",
  mic_start: "बोलें", mic_stop: "रुकें", mic_on: "सुन रहे हैं… अब बोलें। हो जाने पर रुकें दबाएँ।", mic_err: "सुनाई नहीं दिया। माइक की अनुमति देखें और फिर कोशिश करें।",
  dx_sev_mild: "हल्का", dx_sev_moderate: "फैल रहा है", dx_sev_severe: "गंभीर",
  dx_listen: "🔊 सुनें", dx_listen_stop: "■ रोकें",
  dx_ask: "विशेषज्ञ से पूछें", dx_asked: "विशेषज्ञ को भेज दिया। जवाब 'मेरी फ़ोटो जाँच' में और इस बाग़ के 'पेड़ों की सेहत' कार्ड में दिखेगा।",
  dx_ask_nophoto: "भेज दिया। फ़ोटो नहीं रखी गई थीं, इसलिए विशेषज्ञ सिर्फ़ यह नतीजा और आपका नोट देखेंगे।",
  dx_kept: "सेब साथी को सिखाने के लिए फ़ोटो रख ली गईं। धन्यवाद।", dx_review: "इसे ध्यान से देखने की ज़रूरत है, इसलिए हमारे विशेषज्ञ भी इसे जाँचेंगे।",
  dx_e_plus: "यह हिस्सा अभी चालू नहीं है। बाद में फिर कोशिश करें।",
  dxm_h: "मेरी फ़ोटो जाँच", dxm_none: "अभी कोई फ़ोटो जाँच नहीं।", dxm_exp: "विशेषज्ञ की राय", dxm_wait: "विशेषज्ञ के जवाब का इंतज़ार", dxm_more: "पुरानी जाँच दिखाएँ",
  dxm_noorch: "कोई बाग़ नहीं चुना",
  dxr_h: "बाग़ों की सेहत और रोग का ख़तरा", dxr_pill: "मौसम · अंदाज़ा",
  dxr_p: "हर बाग़ के लिए: आपकी फ़ोटो जाँच और स्प्रे से सेहत का अंक, और पिछले 2 दिन व अगले 3 दिन की बारिश और तापमान से रोग का ख़तरा।",
  dxr_none: "यहाँ सेहत और रोग का ख़तरा देखने के लिए बाग़ का रिकॉर्ड में अपने बाग़ जोड़ें।",
  dxr_noloc: "मौसम का ख़तरा देखने के लिए इस बाग़ की लोकेशन जोड़ें (बाग़ का रिकॉर्ड → सार)।",
  dxr_load: "मौसम देख रहे हैं…", dxr_err: "मौसम नहीं मिल सका। फिर से कोशिश होगी।",
  dxr_low: "कम ख़तरा", dxr_medium: "कुछ ख़तरा", dxr_high: "ज़्यादा ख़तरा", dxr_off: "कम ख़तरा: मौसम ख़त्म",
  dxr_off_p: "पत्तियों के रोग का मुख्य मौसम ख़त्म हो गया है। इस सर्दी गिरी पत्तियाँ इकट्ठा करके नष्ट करें: इन्हीं से स्कैब और पत्ती गिरना अगले बसंत में लौटते हैं।",
  dxr_scab: "स्कैब", dxr_mars: "समय से पहले पत्ती गिरना",
  dxr_past: "पिछले 2 दिन में लगभग {t}°C पर {h} घंटे नमी रही: रोग लगना शुरू हो सकता है। देख लें कि बारिश से पहले स्प्रे का बचाव था।",
  dxr_next: "{d} लगभग {t}°C पर {h} घंटे गीला मौसम आने वाला है: स्प्रे शेड्यूल के हिसाब से बारिश से पहले स्प्रे का बचाव रखें।",
  dxr_ok: "अभी और अगले 3 दिन में लंबी नमी नहीं है।",
  dxr_spray: "स्प्रे शेड्यूल खोलें",
  hs_h: "पेड़ों की सेहत", hs_good: "अच्छी", hs_watch: "नज़र रखें", hs_bad: "ध्यान दें",
  hs_note: "आपके अपने रिकॉर्ड से एक मोटा अंदाज़ा, पूरी जाँच नहीं।",
  hs_r_dx: "मिला: {l}", hs_r_nospray: "इस मौसम कोई स्प्रे दर्ज नहीं", hs_r_spray: "आख़िरी स्प्रे {n} दिन पहले", hs_r_risk: "मौसम: {r}",
  hs_r_clean: "पिछले 90 दिन की फ़ोटो जाँच में कोई समस्या नहीं मिली", hs_r_none: "अभी कोई फ़ोटो जाँच नहीं: बेहतर अंक के लिए कुछ पेड़ जाँचें",
  hs_check: "फ़ोटो जाँचें", hs_recent: "यहाँ की हाल की जाँच", hs_more: "सभी फ़ोटो जाँच देखें",
  dxa_h: "आपके पास मिली समस्याएँ", dxa_pill: "पिछले 30 दिन",
  dxa_p: "दूसरे सेब साथी बागवानों की फ़ोटो जाँच में क्या मिला, इलाक़े के हिसाब से (लगभग 10 किमी)। नाम और सही जगह कभी नहीं दिखाई जाती।",
  dxa_none: "पिछले 30 दिन में अभी कोई समस्या दर्ज नहीं।", dxa_load: "लोड हो रहा है…", dxa_map: "नक्शे पर देखें", dxa_hide: "नक्शा छिपाएँ",
  dxa_km: "आपके बाग़ से ~{n} किमी", dxa_reports: "{n} रिपोर्ट", dxa_report1: "1 रिपोर्ट", dxa_noplace: "इलाक़े का नाम नहीं",
  dxa_login: "अपने पास मिली समस्याएँ देखने के लिए लॉग इन करें।", dxa_maperr: "नक्शा लोड नहीं हुआ। इंटरनेट देखें।",
  dxa_you: "आपका बाग़"
});
Object.assign(T.hn, {
  dx_crop: "Kaun sa phal ka ped?", cr_apple: "Seb", cr_cherry: "Cherry", cr_pear: "Nashpati", cr_plum: "Plum (Aloocha)", cr_walnut: "Akhrot",
  dx_keep: "Seb Saathi ko sikhane ke liye meri photo rakhein",
  dx_keep_p: "Zaroori nahi. Aapki photo private rakhi jaati hain. Sirf Seb Saathi team aur hamare saath kaam karne wale paudh-visheshagya inhe dekh sakte hain. Aapka naam kabhi nahi dikhta. Is par tick hone se expert is nateeje ko bhi jaanch sakte hain.",
  mic_start: "Bolein", mic_stop: "Rukein", mic_on: "Sun rahe hain… ab bolein. Ho jaane par Rukein dabayein.", mic_err: "Sunai nahi diya. Mic ki permission dekhein aur phir koshish karein.",
  dx_sev_mild: "Halka", dx_sev_moderate: "Phail raha hai", dx_sev_severe: "Gambhir",
  dx_listen: "🔊 Sunein", dx_listen_stop: "■ Rokein",
  dx_ask: "Expert se poochhein", dx_asked: "Expert ko bhej diya. Jawab 'Meri photo jaanch' mein aur is bagiche ke 'Pedon ki sehat' card mein dikhega.",
  dx_ask_nophoto: "Bhej diya. Photo nahi rakhi gayi thi, isliye expert sirf ye nateeja aur aapka note dekhenge.",
  dx_kept: "Seb Saathi ko sikhane ke liye photo rakh li gayi. Dhanyavaad.", dx_review: "Ise dhyaan se dekhne ki zaroorat hai, isliye hamare expert bhi ise jaanchenge.",
  dx_e_plus: "Ye hissa abhi chalu nahi hai. Baad mein phir koshish karein.",
  dxm_h: "Meri photo jaanch", dxm_none: "Abhi koi photo jaanch nahi.", dxm_exp: "Expert ki raay", dxm_wait: "Expert ke jawab ka intezaar", dxm_more: "Purani jaanch dikhayein",
  dxm_noorch: "Koi bagicha nahi chuna",
  dxr_h: "Bagichon ki sehat aur bimari ka khatra", dxr_pill: "Mausam · andaza",
  dxr_p: "Har bagiche ke liye: aapki photo jaanch aur spray se sehat ka score, aur pichhle 2 din va agle 3 din ki baarish aur taapmaan se bimari ka khatra.",
  dxr_none: "Yahan sehat aur bimari ka khatra dekhne ke liye Orchard Record mein apne bagiche jodein.",
  dxr_noloc: "Mausam ka khatra dekhne ke liye is bagiche ki location jodein (Orchard Record → Saar).",
  dxr_load: "Mausam dekh rahe hain…", dxr_err: "Mausam nahi mil saka. Phir se koshish hogi.",
  dxr_low: "Kam khatra", dxr_medium: "Kuch khatra", dxr_high: "Zyada khatra", dxr_off: "Kam khatra: season khatam",
  dxr_off_p: "Patton ki bimari ka main season khatam ho gaya hai. Is sardi giri patti ikattha karke nasht karein: inhi se scab aur patti girna agle basant mein lautte hain.",
  dxr_scab: "Scab", dxr_mars: "Samay se pehle patti girna",
  dxr_past: "Pichhle 2 din mein lagbhag {t}°C par {h} ghante nami rahi: bimari lagna shuru ho sakti hai. Dekh lein ki baarish se pehle spray ka bachav tha.",
  dxr_next: "{d} lagbhag {t}°C par {h} ghante geela mausam aane wala hai: spray schedule ke hisaab se baarish se pehle spray ka bachav rakhein.",
  dxr_ok: "Abhi aur agle 3 din mein lambi nami nahi hai.",
  dxr_spray: "Spray schedule kholein",
  hs_h: "Pedon ki sehat", hs_good: "Achhi", hs_watch: "Nazar rakhein", hs_bad: "Dhyaan dein",
  hs_note: "Aapke apne record se ek mota andaza, poori jaanch nahi.",
  hs_r_dx: "Mila: {l}", hs_r_nospray: "Is season koi spray darj nahi", hs_r_spray: "Aakhri spray {n} din pehle", hs_r_risk: "Mausam: {r}",
  hs_r_clean: "Pichhle 90 din ki photo jaanch mein koi samasya nahi mili", hs_r_none: "Abhi koi photo jaanch nahi: behtar score ke liye kuch ped jaanchein",
  hs_check: "Photo jaanchein", hs_recent: "Yahan ki haal ki jaanch", hs_more: "Sabhi photo jaanch dekhein",
  dxa_h: "Aapke paas mili samasyayein", dxa_pill: "Pichhle 30 din",
  dxa_p: "Doosre Seb Saathi bagwanon ki photo jaanch mein kya mila, ilaake ke hisaab se (lagbhag 10 km). Naam aur sahi jagah kabhi nahi dikhayi jaati.",
  dxa_none: "Pichhle 30 din mein abhi koi samasya darj nahi.", dxa_load: "Load ho raha hai…", dxa_map: "Naqshe par dekhein", dxa_hide: "Naqsha chhupayein",
  dxa_km: "Aapke bagiche se ~{n} km", dxa_reports: "{n} report", dxa_report1: "1 report", dxa_noplace: "Ilaake ka naam nahi",
  dxa_login: "Apne paas mili samasyayein dekhne ke liye log in karein.", dxa_maperr: "Naqsha load nahi hua. Internet dekhein.",
  dxa_you: "Aapka bagicha"
});

const CROPS = ["apple", "cherry", "pear", "plum", "walnut"];
const ls = { get: k => { try { return localStorage.getItem(k); } catch (e) { return null; } }, set: (k, v) => { try { localStorage.setItem(k, v); } catch (e) {} } };
const fmtD = iso => { try { return new Date(iso).toLocaleDateString(dloc(), { day: "numeric", month: "short" }); } catch (e) { return String(iso).slice(0, 10); } };
const orchName = id => { const o = S && S.orchards ? S.orchards.find(x => x.id === id) : null; return o ? (o.name || tr("orchard_fallback")) : ""; };
const sevChip = s => s ? ' <em class="chip sev-' + s + '">' + tr("dx_sev_" + s) + "</em>" : "";
const confChip = c => c ? ' <em class="chip' + (c === "high" ? " hi" : "") + '">' + tr("dx_c_" + c) + "</em>" : "";
/* the problem's name: the expert's answer first, then the AI's */
function dzName(id, name) {
  if (id && DX[id]) return dxL(DX[id]);
  if (name) return name;
  return id === "healthy" ? tr("dx_healthy") : tr("dx_other");
}
function topOf(row) {
  if (row.expert_id) return { id: row.expert_id, name: row.expert_name, confidence: "high", expert: true };
  const m = row.result && Array.isArray(row.result.matches) ? row.result.matches[0] : null;
  return m ? Object.assign({}, m) : null;
}

/* ---------- form: fruit, keep photos ---------- */
function renderForm() {
  const c = $("dxCrop"); if (!c) return;
  c.innerHTML = '<option value="apple" selected>' + esc(tr("cr_apple")) + "</option>";   /* fruit picker taken out: always apple */
  const k = $("dxKeep"); if (k) k.checked = ls.get("dx-keep") !== "0";   /* ticked by default; stays off only if the grower unticks it */
}
$("dxKeep").addEventListener("change", e => ls.set("dx-keep", e.target.checked ? "1" : "0"));
window.dxExtra = () => ({ crop: "apple", consent: !!$("dxKeep").checked });
window.dxAfter = j => {
  if (dxLast) { dxLast.review = !!j.review; dxLast.kept = j.kept || 0; renderDiagAi(dxLast.id, dxLast.result); }
  loadAll(true);
};

/* ---------- 1. the photo result ---------- */
let dxMsg = "";
renderDiagAi = function (id, r) {
  const box = $("dxAi");
  if (!r) { box.innerHTML = ""; return; }
  const crop = (dxLast && dxLast.crop) || "apple";
  let h = '<div class="dxcards"><article class="dxcard top"><h5>' + tr("dx_ai_h") + (crop !== "apple" ? ' <em class="chip">' + esc(tr("cr_" + crop)) + "</em>" : "") + sevChip(r.severity) + "</h5>";
  if (!r.photo_ok) h += '<p class="urgent">' + tr("dx_photo_bad") + (r.photo_issue ? ": " + esc(r.photo_issue) : "") + "</p>";
  if (r.summary) h += "<p>" + esc(r.summary) + "</p>";
  if (speakOk) h += '<div><button class="btn-s sm" type="button" data-dxact="listen">' + tr(speaking ? "dx_listen_stop" : "dx_listen") + "</button></div>";
  h += "</article>";
  (r.matches || []).forEach(m => {
    const d = DX[m.id];
    const name = d ? dxL(d) : (m.name || tr(m.id === "healthy" ? "dx_healthy" : "dx_other"));
    const spray = (d && d.spray) || (crop !== "apple" && m.id !== "healthy");
    h += '<article class="dxcard"><h5>' + esc(name) + confChip(m.confidence) + "</h5>" +
      (m.why ? "<p>" + esc(m.why) + "</p>" : "") +
      (d && d.urgent ? '<p class="urgent">' + tr("dx_urgent") + "</p>" : "") +
      (spray ? '<div><button class="link" type="button" data-dxspray>' + tr("dx_spray") + "</button></div>" : "") +
      (d ? "<details><summary>" + tr("dx_more") + "</summary>" + dxCard(m.id, "", false) + "</details>" : "") + "</article>";
  });
  if (r.next_steps && r.next_steps.length) h += '<article class="dxcard"><h5>' + tr("dx_steps") + "</h5><ul>" + r.next_steps.map(s => "<li>" + esc(s) + "</li>").join("") + "</ul>" +
    (r.see_expert ? '<p class="urgent">' + tr("dx_expert") + "</p>" : "") + "</article>";
  if (id) {
    const row = all && all.find(x => x.id === id);
    const asked = (row && row.ask_expert) || (dxLast && dxLast.asked);
    h += '<div class="dxfb">' + (dxLast && dxLast.fb ? '<span class="fine">' + tr("dx_fb_thanks") + "</span>" :
      "<span>" + tr("dx_fb") + "</span>" + ["right", "wrong", "unsure"].map(k => '<button class="btn-s" type="button" data-dxfb="' + k + '">' + tr("dx_fb_" + k) + "</button>").join("")) + "</div>";
    h += '<div class="dxfb">' + "" +   /* "Ask an expert" button taken out */
      (dxMsg ? '<span class="fine">' + esc(dxMsg) + "</span>" : "") + "</div>";
    if (dxLast && dxLast.kept) h += '<p class="fine dxok">✓ ' + tr("dx_kept") + "</p>";
    if (dxLast && dxLast.review && !asked) h += '<p class="fine">' + tr("dx_review") + "</p>";
  }
  box.innerHTML = h + "</div>";
};

/* read the result aloud with the phone's own voice */
const speakOk = !!(window.speechSynthesis && window.SpeechSynthesisUtterance);
let speaking = false;
function speakResult() {
  if (!speakOk) return;
  if (speaking) { speechSynthesis.cancel(); speaking = false; renderDiagAi(dxLast && dxLast.id, dxLast && dxLast.result); return; }
  const r = dxLast && dxLast.result; if (!r) return;
  const crop = dxLast.crop || "apple";
  const parts = [];
  if (!r.photo_ok) parts.push(tr("dx_photo_bad") + ". " + (r.photo_issue || ""));
  (r.matches || []).slice(0, 2).forEach(m => parts.push((DX[m.id] && crop === "apple" ? dxL(DX[m.id]) : m.name || "") + ", " + tr("dx_c_" + m.confidence) + ". " + (m.why || "")));
  if (r.summary) parts.push(r.summary);
  (r.next_steps || []).forEach(s => parts.push(s));
  const u = new SpeechSynthesisUtterance(parts.join(" \n"));
  u.lang = lang === "hi" ? "hi-IN" : "en-IN"; u.rate = 0.95;
  const v = speechSynthesis.getVoices().find(x => x.lang && x.lang.replace("_", "-").toLowerCase() === u.lang.toLowerCase()); if (v) u.voice = v;
  u.onend = u.onerror = () => { speaking = false; renderDiagAi(dxLast && dxLast.id, dxLast && dxLast.result); };
  speechSynthesis.cancel(); speechSynthesis.speak(u); speaking = true; renderDiagAi(dxLast.id, dxLast.result);
}

/* ask an expert: keep the photos now if they were not kept, and flag the check */
async function askExpert(id) {
  if (!sb || !id) return;
  dxMsg = "…"; renderDiagAi(dxLast && dxLast.id, dxLast && dxLast.result); renderMine();
  const row = all && all.find(x => x.id === id);
  const kept = (dxLast && dxLast.id === id && dxLast.kept) || (row && row.photo_paths && row.photo_paths.length);
  let ok = false, nophoto = false;
  if (!kept && dxLast && dxLast.id === id && dxFiles && dxFiles.length) {
    try {
      const s = await sb.auth.getSession(), token = s && s.data && s.data.session ? s.data.session.access_token : "";
      const r = await fetch("/api/diagnose", { method: "POST", headers: { "Content-Type": "application/json", Authorization: "Bearer " + token },
        body: JSON.stringify({ action: "attach", id, images: dxFiles }) });
      ok = r.ok; if (ok) dxLast.kept = dxFiles.length;
    } catch (e) { ok = false; }
  }
  if (!ok) {
    try { const r = await sb.from("diagnoses").update({ ask_expert: true }).eq("id", id); ok = !r.error; } catch (e) { ok = false; }
    nophoto = !kept;
  }
  dxMsg = ok ? tr(nophoto ? "dx_ask_nophoto" : "dx_asked") : tr("dx_e_plus");
  if (ok) { if (dxLast && dxLast.id === id) dxLast.asked = true; if (row) row.ask_expert = true; }
  renderDiagAi(dxLast && dxLast.id, dxLast && dxLast.result); renderMine(id); refreshCards();
}

/* ---------- 3. my photo checks (with the expert's answers) ---------- */
let all = null, allFor = "", allBusy = false, mineMore = false, mineMsg = { id: "", t: "" };
async function loadAll(force) {
  if (!user || !sb || allBusy) return;
  if (!force && all && allFor === user.id) return;
  allBusy = true;
  try {
    const r = await sb.from("diagnoses").select("*").order("created_at", { ascending: false }).limit(200);
    all = r.error ? (all || []) : (r.data || []); allFor = user.id;
  } catch (e) { all = all || []; }
  allBusy = false;
  renderMine(); refreshCards(); renderRisk();
}
function mineRow(x) {
  const t = topOf(x), crop = x.crop || "apple";
  const name = t ? dzName(crop === "apple" ? t.id : "", t.name) : tr("dx_photo_bad");
  const on = x.orchard_id ? orchName(x.orchard_id) : "";
  let h = '<li><div class="mr1"><span class="dd">' + esc(fmtD(x.created_at)) + '</span><span class="dt"><b>' + esc(name) + "</b>" +
    (t && !t.expert ? confChip(t.confidence) : "") + sevChip(x.severity || (x.result && x.result.severity)) + "</span></div>" +
    '<div class="mr2 fine">' + esc([crop !== "apple" ? tr("cr_" + crop) : "", on].filter(Boolean).join(" · ")) +
    (x.feedback ? (on || crop !== "apple" ? " · " : "") + tr("th_fb_" + x.feedback) : "") + "</div>";
  if (x.reviewed_at) {
    const ai = x.result && x.result.matches && x.result.matches[0];
    h += '<p class="mexp"><b>' + tr("dxm_exp") + ":</b> " + esc(dzName(x.expert_id, x.expert_name)) + (x.expert_note ? " — " + esc(x.expert_note) : "") + "</p>";
    void ai;
  } else if (x.ask_expert) h += '<p class="fine mwait">⏳ ' + tr("dxm_wait") + "</p>";
  else h += '<div><button class="btn-s sm" type="button" data-dxact="ask" data-id="' + esc(x.id) + '">' + tr("dx_ask") + "</button></div>";
  if (mineMsg.id === x.id && mineMsg.t) h += '<p class="fine">' + esc(mineMsg.t) + "</p>";
  return h + "</li>";
}
function renderMine(justAsked) {
  const sec = $("dxMine"); if (!sec) return;
  if (justAsked) mineMsg = { id: justAsked, t: dxMsg };
  sec.hidden = !user;
  if (!user) return;
  if (!all) { $("dxMineList").innerHTML = '<p class="hint">' + tr("dxa_load") + "</p>"; return; }
  if (!all.length) { $("dxMineList").innerHTML = '<p class="hint">' + tr("dxm_none") + "</p>"; return; }
  const L = mineMore ? all.slice(0, 60) : all.slice(0, 5);
  $("dxMineList").innerHTML = '<ul class="dxmine">' + L.map(mineRow).join("") + "</ul>" +
    (!mineMore && all.length > 5 ? '<button class="link" type="button" data-dxact="more">' + tr("dxm_more") + " (" + (Math.min(all.length, 60) - 5) + ")</button>" : "");
}

/* ---------- 5. disease risk from the weather ---------- */
/* Mills table (revised): hours of leaf wetness needed for a light scab infection at a mean temperature (°C) */
const MILLS = { 1: 41, 2: 35, 3: 30, 4: 28, 5: 21, 6: 18, 7: 15, 8: 13, 9: 12, 10: 11, 11: 9, 12: 8, 13: 8, 14: 7, 15: 7, 16: 6, 17: 6, 18: 6, 19: 6, 20: 6, 21: 6, 22: 6, 23: 6, 24: 7, 25: 8, 26: 11 };
const millsH = t => { const k = Math.round(t); return k < 1 || k > 26 ? Infinity : MILLS[k]; };
const RK = {};
let monthOverride = 0;   /* for testing only */
const month = () => monthOverride || +new Date(Date.now() + 330 * 60000).toISOString().slice(5, 7);
function riskGet(o) {
  if (!hasLoc(o)) return null;
  const k = (+o.profile.lat).toFixed(2) + "," + (+o.profile.lon).toFixed(2), c = RK[k];
  if (c && (c.loading || Date.now() - c.at < 3 * 36e5)) return c;
  if (c && c.err && Date.now() - c.at < 12e4) return c;
  RK[k] = { loading: true, at: Date.now() };
  fetch("https://api.open-meteo.com/v1/forecast?latitude=" + (+o.profile.lat) + "&longitude=" + (+o.profile.lon) +
    "&hourly=temperature_2m,relative_humidity_2m,precipitation&past_days=2&forecast_days=3&timezone=Asia%2FKolkata")
    .then(r => (r.ok ? r.json() : Promise.reject())).then(j => { if (!j || !j.hourly) throw 0; RK[k] = { at: Date.now(), r: riskCalc(j.hourly) }; afterRisk(); })
    .catch(() => { RK[k] = { at: Date.now(), err: true }; afterRisk(); setTimeout(afterRisk, 125e3); });
  return RK[k];
}
/* wet spells: hours in a row with rain or air humidity at 90% or more (a stand-in for wet leaves) */
function riskCalc(H) {
  const now = new Date(Date.now() + 330 * 60000).toISOString().slice(0, 13);
  const spells = []; let cur = null;
  H.time.forEach((t, i) => {
    const wet = (+H.precipitation[i] || 0) >= 0.1 || (+H.relative_humidity_2m[i] || 0) >= 90;
    if (wet) { if (!cur) cur = { start: t, end: t, n: 0, ts: 0 }; cur.n++; cur.ts += +H.temperature_2m[i] || 0; cur.end = t; }
    else if (cur) { spells.push(cur); cur = null; }
  });
  if (cur) spells.push(cur);
  spells.forEach(s => { s.t = s.ts / s.n; s.past = s.start.slice(0, 13) < now; });
  return spells;
}
const LV = { low: 0, medium: 1, high: 2 };
function riskOf(o) {
  const c = riskGet(o); if (!c) return { noloc: true };
  if (c.loading) return { loading: true }; if (c.err) return { err: true };
  const m = month(), items = [];
  const scabOn = m >= 3 && m <= 8, marsOn = m >= 6 && m <= 9;
  if (!scabOn && !marsOn) return { level: "low", off: true, items };
  c.r.forEach(s => {
    if (scabOn) { const need = millsH(s.t); const lv = s.n >= need ? "high" : s.n >= need * 0.6 && s.n >= 5 ? "medium" : ""; if (lv) items.push({ dz: "scab", lv, s }); }
    if (marsOn && s.t >= 15 && s.t <= 30) { const lv = s.n >= 24 && s.t >= 18 && s.t <= 28 ? "high" : s.n >= 10 ? "medium" : ""; if (lv) items.push({ dz: "mars", lv, s }); }
  });
  /* keep the worst spell per disease */
  const best = {};
  items.forEach(x => { const b = best[x.dz]; if (!b || LV[x.lv] > LV[b.lv] || (LV[x.lv] === LV[b.lv] && x.s.n > b.s.n)) best[x.dz] = x; });
  const L = Object.values(best);
  const level = L.reduce((a, x) => (LV[x.lv] > LV[a] ? x.lv : a), "low");
  return { level, items: L };
}
function riskLabel(rk) { return rk.off ? tr("dxr_off") : tr("dxr_" + rk.level); }
function riskHtml(rk, short) {
  if (rk.noloc) return '<p class="fine">' + tr("dxr_noloc") + "</p>";
  if (rk.loading) return '<p class="fine">' + tr("dxr_load") + "</p>";
  if (rk.err) return '<p class="fine">' + tr("dxr_err") + "</p>";
  let h = '<p><span class="rk rk-' + rk.level + '">' + esc(riskLabel(rk)) + "</span></p>";
  if (rk.off) return h + (short ? "" : '<p class="fine">' + tr("dxr_off_p") + "</p>");
  if (!rk.items.length) return h + '<p class="fine">' + tr("dxr_ok") + "</p>";
  h += '<ul class="rklist">' + rk.items.map(x => {
    const day = x.s.past ? "" : (() => { try { return new Date(x.s.start + ":00").toLocaleDateString(dloc(), { weekday: "long" }); } catch (e) { return ""; } })();
    return "<li><b>" + tr("dxr_" + x.dz) + ":</b> " + esc(tr(x.s.past ? "dxr_past" : "dxr_next").replace("{h}", x.s.n).replace("{t}", Math.round(x.s.t)).replace("{d}", day)) + "</li>";
  }).join("") + "</ul>";
  return h + (short ? "" : '<button class="link" type="button" data-dxspray>' + tr("dxr_spray") + "</button>");
}

/* ---------- 4. tree health score for an orchard ---------- */
const URG = { collar: 2, wrr: 2, canker: 1.4, borer: 1.3 };
function healthOf(o) {
  const now = Date.now(), why = [];
  let score = 100;
  const rows = (all || []).filter(x => x.orchard_id === o.id && now - Date.parse(x.created_at) <= 90 * 864e5 && x.feedback !== "wrong");
  let pen = 0; const found = {};
  rows.forEach(x => {
    const t = topOf(x); if (!t || t.id === "healthy") return;
    if (x.result && x.result.photo_ok === false && !t.expert) return;
    const w = t.expert ? 1 : t.confidence === "high" ? 1 : t.confidence === "medium" ? 0.6 : 0.3;
    const sv = { mild: 1, moderate: 2, severe: 3 }[x.severity || (x.result && x.result.severity)] || 1.5;
    const age = now - Date.parse(x.created_at) <= 30 * 864e5 ? 1 : 0.5;
    pen += 6 * w * sv * (URG[t.id] || 1) * age;
    const nm = dzName((x.crop || "apple") === "apple" ? t.id : "", t.name); found[nm] = found[nm] || x.created_at;
  });
  pen = Math.min(45, pen); score -= pen;
  const fk = Object.keys(found);
  if (fk.length) why.push(tr("hs_r_dx").replace("{l}", fk.slice(0, 3).join(", ")));
  else why.push(tr(rows.length ? "hs_r_clean" : "hs_r_none"));
  const m = month();
  if (m >= 3 && m <= 9) {
    const sp = lastSpray(o), n = sp ? dayDiff(sp.date, todayIso()) : null;
    if (n == null || +sp.date.slice(0, 4) < new Date().getFullYear()) { score -= 10; why.push(tr("hs_r_nospray")); }
    else { if (n > 35) score -= 15; else if (n > 21) score -= 8; why.push(tr("hs_r_spray").replace("{n}", fmtN(n))); }
  }
  const rk = riskOf(o);
  if (rk.level === "high") score -= 15; else if (rk.level === "medium") score -= 7;
  score = Math.max(0, Math.min(100, Math.round(score)));
  return { score, band: score >= 80 ? "good" : score >= 60 ? "watch" : "bad", why, rows, rk };
}
function scoreBadge(hs) {
  return '<span class="hscore hs-' + hs.band + '"><b>' + hs.score + "</b><small>/100</small></span><span class=\"hsband hs-" + hs.band + '">' + tr("hs_" + hs.band) + "</span>";
}
/* card inside an opened orchard (Overview / Saar) */
function cardInner(o) {
  if (!all) loadAll(false);
  const hs = healthOf(o);
  let h = "<h6>" + tr("hs_h") + '</h6><div class="hsrow">' + scoreBadge(hs) + "</div>" +
    '<ul class="hswhy">' + hs.why.map(w => "<li>" + esc(w) + "</li>").join("") + "</ul>" + riskHtml(hs.rk, true);
  const rec = (all || []).filter(x => x.orchard_id === o.id).slice(0, 3);
  if (rec.length) h += '<p class="subhead">' + tr("hs_recent") + '</p><ul class="dxmine sm">' + rec.map(x => {
    const t = topOf(x); return "<li><div class=\"mr1\"><span class=\"dd\">" + esc(fmtD(x.created_at)) + '</span><span class="dt">' + esc(t ? dzName((x.crop || "apple") === "apple" ? t.id : "", t.name) : tr("dx_photo_bad")) +
      (x.reviewed_at ? ' <em class="chip hi">' + tr("dxm_exp") + "</em>" : x.ask_expert ? ' <em class="chip">⏳</em>' : "") + "</span></div></li>";
  }).join("") + "</ul>";
  h += '<div class="dels"><button class="btn-s add" type="button" data-dxact="check" data-o="' + esc(o.id) + '">' + tr("hs_check") + "</button>" +
    (rec.length ? '<button class="link" type="button" data-dxact="mine">' + tr("hs_more") + "</button>" : "") + "</div>" +
    '<p class="fine">' + tr("hs_note") + "</p>";
  return h;
}
window.dxHealthCardHtml = function (o) {
  try { return '<div class="dgroups dcards"><section class="dgrp dxhc" data-dxhc="' + esc(o.id) + '">' + cardInner(o) + "</section></div>"; } catch (e) { return ""; }
};
function refreshCards() {
  document.querySelectorAll("[data-dxhc]").forEach(el => {
    const o = S && S.orchards ? S.orchards.find(x => x.id === el.dataset.dxhc) : null;
    if (o) try { el.innerHTML = cardInner(o); } catch (e) {}
  });
}
/* list in the Disease diagnosis tab */
function renderRisk() {
  const box = $("dxRisk"); if (!box) return;
  const L = user && loaded && S && S.orchards ? S.orchards.filter(o => !o.ex) : [];
  if (!L.length) { box.innerHTML = '<p class="hint">' + tr(user ? "dxr_none" : "dx_gate") + "</p>"; return; }
  if (user && !all) loadAll(false);
  box.innerHTML = '<div class="rkgrid">' + L.map(o => {
    const hs = healthOf(o);
    return '<article class="dxcard rkcard"><h5>' + esc(o.name || tr("orchard_fallback")) + '</h5><div class="hsrow">' + scoreBadge(hs) + "</div>" +
      '<ul class="hswhy">' + hs.why.map(w => "<li>" + esc(w) + "</li>").join("") + "</ul>" + riskHtml(hs.rk, false) + "</article>";
  }).join("") + '</div><p class="fine">' + tr("hs_note") + "</p>";
}
function afterRisk() { renderRisk(); refreshCards(); }

/* ---------- 6. problems reported nearby ---------- */
let area = null, areaFor = "", areaBusy = false, areaErr = false, mapOn = false, areaMap = null;
async function loadArea(force) {
  if (!user || !sb || areaBusy) return;
  if (!force && area && areaFor === user.id) return;
  areaBusy = true;
  try { const r = await sb.rpc("dx_area_reports", { days: 30 }); areaErr = !!r.error; area = r.error ? [] : (r.data || []); } catch (e) { areaErr = true; area = []; }
  areaFor = user.id; areaBusy = false; renderArea();
}
const kmBetween = (a, b, c, d) => { const R = 6371, p = Math.PI / 180, x = Math.sin((c - a) * p / 2) ** 2 + Math.cos(a * p) * Math.cos(c * p) * Math.sin((d - b) * p / 2) ** 2; return 2 * R * Math.asin(Math.sqrt(x)); };
function areaCells() {
  const cells = {};
  (area || []).forEach(r => {
    const k = r.lat + "," + r.lon, c = cells[k] = cells[k] || { lat: +r.lat, lon: +r.lon, area: r.area || "", n: 0, dz: [] };
    c.n += +r.n; c.dz.push({ id: r.disease, crop: r.crop, n: +r.n }); if (!c.area && r.area) c.area = r.area;
  });
  const mine = (S && S.orchards ? S.orchards : []).filter(o => !o.ex && hasLoc(o));
  const L = Object.values(cells);
  L.forEach(c => { c.km = mine.length ? Math.min.apply(null, mine.map(o => kmBetween(+o.profile.lat, +o.profile.lon, c.lat, c.lon))) : null; c.dz.sort((a, b) => b.n - a.n); });
  L.sort((a, b) => (a.km != null && b.km != null ? a.km - b.km : b.n - a.n));
  return { L, mine };
}
const dzLabel = d => (d.crop && d.crop !== "apple" ? tr("cr_" + d.crop) + ": " : "") + dzName(d.id, "");
function renderArea() {
  const box = $("dxAreaList"); if (!box) return;
  if (!user) { box.innerHTML = '<p class="hint">' + tr("dxa_login") + "</p>"; $("dxAreaMap").hidden = true; return; }
  if (!area) { box.innerHTML = '<p class="hint">' + tr("dxa_load") + "</p>"; loadArea(false); return; }
  if (areaErr) { box.innerHTML = '<p class="hint">' + tr("dx_e_plus") + "</p>"; return; }
  const { L } = areaCells();
  if (!L.length) { box.innerHTML = '<p class="hint">' + tr("dxa_none") + "</p>"; $("dxAreaMap").hidden = true; return; }
  box.innerHTML = '<ul class="arlist">' + L.slice(0, 12).map(c => '<li><div class="mr1"><b>' + esc(c.area || tr("dxa_noplace")) + "</b>" +
    '<span class="fine">' + tr(c.n === 1 ? "dxa_report1" : "dxa_reports").replace("{n}", fmtN(c.n)) + (c.km != null ? " · " + tr("dxa_km").replace("{n}", fmtN(Math.max(1, Math.round(c.km)))) : "") + "</span></div>" +
    '<div class="archips">' + c.dz.slice(0, 4).map(d => '<em class="chip">' + esc(dzLabel(d)) + " ×" + d.n + "</em>").join("") + "</div></li>").join("") + "</ul>" +
    '<button class="btn-s sm" type="button" data-dxact="map">' + tr(mapOn ? "dxa_hide" : "dxa_map") + "</button>";
  if (mapOn) drawMap();
}
const DZC = { scab: "#5B6B2F", mars: "#8A4B1F", alt: "#9A5BA8", pm: "#7C8C99", sooty: "#333", pit: "#B8791F", canker: "#6B3B2A", collar: "#B3261E", wrr: "#E0E0E0", woolly: "#C9C3B0", mite: "#C2412F", sjs: "#5A5A5A", borer: "#6A4FB3" };
function drawMap() {
  const el = $("dxAreaMap"); el.hidden = false;
  if (typeof loadLeaflet !== "function") return;
  loadLeaflet().then(Lf => {
    if (!mapOn) return;
    if (areaMap) { try { areaMap.remove(); } catch (e) {} areaMap = null; }
    const { L, mine } = areaCells();
    const m = Lf.map(el, { scrollWheelZoom: false }); areaMap = m;
    Lf.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 14, attribution: "© OpenStreetMap" }).addTo(m);
    const pts = [];
    L.forEach(c => {
      const p = [c.lat, c.lon]; pts.push(p);
      Lf.circleMarker(p, { radius: 7 + 3 * Math.sqrt(c.n), color: "#fff", weight: 2, fillColor: DZC[c.dz[0].id] || "#B11F24", fillOpacity: 0.85 }).addTo(m)
        .bindPopup("<b>" + esc(c.area || tr("dxa_noplace")) + "</b><br>" + c.dz.map(d => esc(dzLabel(d)) + " ×" + d.n).join("<br>"));
    });
    mine.forEach(o => { const p = [+o.profile.lat, +o.profile.lon]; pts.push(p);
      Lf.circleMarker(p, { radius: 6, color: "#fff", weight: 2, fillColor: "#1F3A8A", fillOpacity: 1 }).addTo(m).bindTooltip(esc(tr("dxa_you") + ": " + (o.name || ""))); });
    if (pts.length > 1) m.fitBounds(pts, { padding: [30, 30], maxZoom: 11 }); else if (pts.length) m.setView(pts[0], 10); else m.setView([31.2, 77.6], 8);
  }).catch(() => { el.innerHTML = '<p class="hint">' + tr("dxa_maperr") + "</p>"; });
}

/* ---------- 7. voice typing ---------- */
const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
let rec = null, recFor = "";
const MIC = '<svg aria-hidden="true" viewBox="0 0 24 24" width="20" height="20"><rect x="9" y="3" width="6" height="11" rx="3" fill="currentColor"/><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
function renderMics() {
  document.querySelectorAll("[data-mic]").forEach(b => {
    b.hidden = !SR; const on = recFor === b.dataset.mic;
    b.innerHTML = MIC; b.setAttribute("aria-label", tr(on ? "mic_stop" : "mic_start")); b.title = tr(on ? "mic_stop" : "mic_start");
    b.classList.toggle("on", on); b.setAttribute("aria-pressed", on ? "true" : "false");
  });
}
function micStatus(id, t) { const s = $(id + "Mic"); if (s) s.textContent = t || ""; }
function micToggle(id) {
  if (!SR) return;
  if (rec) { const was = recFor; try { rec.stop(); } catch (e) {} if (was === id) return; }
  const box = $(id); if (!box) return;
  const r = new SR(); rec = r; recFor = id;
  r.lang = lang === "en" ? "en-IN" : "hi-IN"; r.interimResults = true; r.continuous = false; r.maxAlternatives = 1;
  const before = box.value ? box.value.replace(/\s+$/, "") + " " : "";
  r.onresult = e => {
    let t = ""; for (let i = 0; i < e.results.length; i++) t += e.results[i][0].transcript;
    box.value = (before + t).slice(0, +box.maxLength > 0 ? +box.maxLength : 1500);
    box.dispatchEvent(new Event("input", { bubbles: true }));
  };
  r.onerror = e => { micStatus(id, e && e.error === "no-speech" ? "" : tr("mic_err")); };
  r.onend = () => { if (rec === r) { rec = null; recFor = ""; } renderMics(); const s = $(id + "Mic"); if (s && s.textContent === tr("mic_on")) micStatus(id, ""); };
  try { r.start(); micStatus(id, tr("mic_on")); } catch (e) { rec = null; recFor = ""; micStatus(id, tr("mic_err")); }
  renderMics();
}
document.addEventListener("click", e => {
  const b = e.target.closest && e.target.closest("[data-mic]");
  if (b) { e.preventDefault(); micToggle(b.dataset.mic); }
});

/* ---------- actions ---------- */
document.addEventListener("click", e => {
  const b = e.target.closest && e.target.closest("[data-dxact]"); if (!b) return;
  const a = b.dataset.dxact;
  if (a === "listen") speakResult();
  else if (a === "ask") askExpert(b.dataset.id);
  else if (a === "more") { mineMore = true; renderMine(); }
  else if (a === "map") { mapOn = !mapOn; if (!mapOn) { $("dxAreaMap").hidden = true; if (areaMap) { try { areaMap.remove(); } catch (x) {} areaMap = null; } } renderArea(); }
  else if (a === "check") { dxOrchSel = b.dataset.o || ""; renderDxOrch(); goDiag("photo"); }
  else if (a === "mine") { goDiag("photo"); setTimeout(() => { const s = $("dxMine"); if (s && s.scrollIntoView) s.scrollIntoView({ block: "start" }); }, 60); }
});
/* spray buttons in the orchard card and the risk list (the main page only listens inside the Disease tab) */
document.addEventListener("click", e => {
  if (e.target.closest && e.target.closest("[data-dxspray]") && !e.target.closest("#tp-diag")) showTool("spray", false, true);
});

/* ---------- keep everything in step with the page ---------- */
function renderPlus() {
  try { renderForm(); renderMics(); renderMine(); renderRisk(); renderArea(); } catch (e) { console.error(e); }
  if (user && (!all || allFor !== user.id)) loadAll(false);
  if (!user) { all = null; area = null; allFor = areaFor = ""; }
}
const _renderDiag = renderDiag;
renderDiag = function () { _renderDiag.apply(this, arguments); renderPlus(); };
const _renderDiagAuth = renderDiagAuth;
renderDiagAuth = function () { _renderDiagAuth.apply(this, arguments); renderPlus(); };
const _showTool = showTool;
showTool = function (w) { _showTool.apply(this, arguments); if (w === "diag") { renderPlus(); loadArea(false); } };
window.dxPlus = { setMonth: m => { monthOverride = m; afterRisk(); }, reload: () => { loadAll(true); loadArea(true); } };

/* ---------- looks ---------- */
const css = document.createElement("style");
css.textContent = `
.microw{display:flex;gap:8px;align-items:flex-start}
.microw textarea{flex:1;min-width:0}
.micbtn{flex:none;width:44px;height:44px;border-radius:50%;border:1px solid var(--line);background:var(--surface);color:var(--brand,#B11F24);display:inline-flex;align-items:center;justify-content:center;cursor:pointer}
.micbtn.on{background:var(--bad);border-color:var(--bad);color:#fff;animation:micp 1.2s ease-in-out infinite}
@keyframes micp{50%{box-shadow:0 0 0 6px color-mix(in srgb,var(--bad) 25%,transparent)}}
@media (prefers-reduced-motion:reduce){.micbtn.on{animation:none}}
.chatform .micbtn{width:40px;height:40px;align-self:center}
.micst{margin:4px 0 0;min-height:0}.micst:empty{display:none}
.dxkeep{align-items:flex-start;line-height:1.35}.dxkeep input{margin-top:2px}.dxkeep small{display:block;margin-top:2px}
.dxok{color:var(--good)}
.chip.sev-mild{color:var(--good)}.chip.sev-moderate{color:#9A6400;background:color-mix(in srgb,#E0A21A 20%,transparent)}.chip.sev-severe{color:#fff;background:var(--bad)}
.dxmine{list-style:none;margin:0;padding:0;display:grid;gap:0}
.dxmine li{padding:10px 0;border-bottom:1px solid var(--line);display:grid;gap:4px}.dxmine li:last-child{border-bottom:0}
.dxmine.sm li{padding:6px 0}
.dxmine .mr1{display:flex;gap:10px;align-items:baseline;flex-wrap:wrap}
.dxmine .dd{font:600 .82rem var(--mono);color:var(--muted);min-width:4.5em}
.dxmine .mr2{margin:0}
.mexp{margin:0;padding:8px 10px;border-radius:8px;background:color-mix(in srgb,var(--good) 12%,transparent)}
.mwait{margin:0}
.rkgrid{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,260px),1fr));gap:12px}
.rk{display:inline-block;font:700 .85rem var(--body);padding:3px 10px;border-radius:999px}
.rk-low{background:color-mix(in srgb,var(--good) 15%,transparent);color:var(--good)}
.rk-medium{background:color-mix(in srgb,#E0A21A 22%,transparent);color:#8A5A00}
.rk-high{background:var(--bad);color:#fff}
.rklist{margin:0;padding-left:1.2em;display:grid;gap:4px;font-size:.92rem}
.hsrow{display:flex;align-items:center;gap:10px;margin:2px 0 4px}
.hscore b{font:700 1.8rem var(--mono);font-variant-numeric:tabular-nums}
.hscore small{color:var(--muted);font:500 .85rem var(--mono)}
.hsband{font-weight:700;font-size:.95rem}
.hs-good,.hscore.hs-good b{color:var(--good)}.hs-watch,.hscore.hs-watch b{color:#9A6400}.hs-bad,.hscore.hs-bad b{color:var(--bad)}
.hswhy{margin:0 0 6px;padding-left:1.2em;display:grid;gap:3px;font-size:.92rem}
.dxhc .dels{margin-top:8px}.dxhc p{margin:4px 0}
.arlist{list-style:none;margin:0 0 10px;padding:0}
.arlist li{padding:10px 0;border-bottom:1px solid var(--line);display:grid;gap:6px}
.arlist .mr1{display:flex;gap:10px;align-items:baseline;flex-wrap:wrap}.arlist .fine{margin:0}
.archips{display:flex;gap:6px;flex-wrap:wrap}.archips .chip{margin-left:0}
.dxmap{height:340px;border-radius:10px;border:1px solid var(--line);margin-top:10px;overflow:hidden}
@media (prefers-color-scheme:dark){.rk-medium,.hs-watch,.hscore.hs-watch b,.chip.sev-moderate{color:#F2C04D}}
`;
document.head.appendChild(css);

applyLang();   /* fills the new headings and labels, and renders everything again */
})();
