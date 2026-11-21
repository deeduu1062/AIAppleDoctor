/* Seb Saathi admin — Social handler → Create → 🎬 Video: choose how the video is made.
     🎨 Video studio      — drawn scenes / real app screens / clips + voice, made in the browser (autovid.js + studio.js)
     🎬 AI video (Google) — a real-looking clip with sound from Google's video model (Gemini Omni Flash, the family behind Google Flow)
   Both use the SAME options (what kind, topic, your brief, language, voice, music, length, size, pictures, ending, where it goes).
   For an AI video the AI first writes the script from those options (same as the studio), and the script is turned into one
   video prompt: the scenes become the shots, the spoken lines the narration, the ending the last line.
   Then Save to 📚 Saved (to post later anywhere), Try again, or Discard.
   Server: /api/social?fn=veo (api/_veo.js) — needs GEMINI_API_KEY in Vercel. Loaded after autovid.js and saved.js. */
Object.assign(T.en, {
  ve_maker: "How should it be made?", ve_m_studio: "🎨 Video studio", ve_m_ai: "🎬 AI video (Google)",
  ve_m_studio_p: "Drawn scenes, real app screens or clips, with a voice. Free, made on this device.",
  ve_m_ai_p: "A real-looking video with people, orchards and sound, made by Google's video model (like Google Flow). Paid per clip from your Gemini API key.",
  ve_diff: "For an AI video: it is one clip of about 8–10 seconds (Length sets how much is said); Square and 4:5 come out tall 9:16; under Pictures, \"My photos\" uses your first photo as the opening picture, the others let Google make the pictures. English narration works best; Hindi and Hinglish may vary.",
  ve_go: "🎬 Make the AI video", ve_s1: "Writing the script…", ve_s2: "Google is making the video… 1–4 minutes. Keep this page open.",
  ve_nokey: "AI video is not set up yet: get an API key at aistudio.google.com (Get API key, with billing on), add it in Vercel → Settings → Environment Variables as GEMINI_API_KEY, then Redeploy. Or check it in Site health → Keys & AI.",
  ve_blocked: "Google didn't make this one (its safety check stopped it). Change the topic or brief a little and try again. {m}", ve_quota: "Google refused: no credit or limit reached on the API key. {m}",
  ve_err: "Something went wrong: {m}", ve_q: "Like this AI video? Save it to share later, make it again, or discard it.",
  ve_prompt: "What was sent to Google",
  ve_ready: "Ready for {w}: open 📚 Saved and tap 🚀 Post everywhere (or one place at a time). Nothing is posted until you tap.",
});
Object.assign(T.hi, {
  ve_maker: "वीडियो कैसे बने?", ve_m_studio: "🎨 वीडियो स्टूडियो", ve_m_ai: "🎬 AI वीडियो (Google)",
  ve_m_studio_p: "बने हुए चित्र, ऐप की असली स्क्रीन या क्लिप, आवाज़ के साथ। मुफ़्त, इसी डिवाइस पर बनता है।",
  ve_m_ai_p: "असली जैसा वीडियो — लोग, बाग़ और आवाज़ — Google के वीडियो मॉडल से (Google Flow जैसा)। हर क्लिप का पैसा आपकी Gemini API key से।",
  ve_diff: "AI वीडियो में: एक क्लिप लगभग 8–10 सेकंड का (लंबाई से तय होता है कितना बोला जाए); चौकोर और 4:5 लंबे 9:16 में बनते हैं; तस्वीरों में \"मेरी फ़ोटो\" से आपकी पहली फ़ोटो शुरुआत बनती है, बाक़ी में Google ख़ुद तस्वीरें बनाता है। अंग्रेज़ी आवाज़ सबसे अच्छी; हिंदी और Hinglish में फ़र्क हो सकता है।",
  ve_go: "🎬 AI वीडियो बनाएँ", ve_s1: "स्क्रिप्ट लिखी जा रही है…", ve_s2: "Google वीडियो बना रहा है… 1–4 मिनट। यह पेज खुला रखें।",
  ve_nokey: "AI वीडियो अभी चालू नहीं: aistudio.google.com पर API key लें (Get API key, बिलिंग चालू), Vercel → Settings → Environment Variables में GEMINI_API_KEY नाम से जोड़ें, फिर Redeploy करें। या Site health → Keys & AI में देखें।",
  ve_blocked: "Google ने यह नहीं बनाया (उसकी सुरक्षा जाँच ने रोका)। विषय या ब्रीफ़ थोड़ा बदलकर फिर कोशिश करें। {m}", ve_quota: "Google ने मना किया: API key पर पैसा नहीं या सीमा पूरी। {m}",
  ve_err: "कुछ गड़बड़ हुई: {m}", ve_q: "AI वीडियो पसंद आया? बाद में शेयर करने के लिए सेव करें, फिर से बनाएँ या हटाएँ।",
  ve_prompt: "Google को क्या भेजा गया",
  ve_ready: "{w} के लिए तैयार: 📚 Saved खोलें और 🚀 हर जगह पोस्ट करें दबाएँ (या एक-एक जगह)। आपके दबाने तक कुछ पोस्ट नहीं होगा।",
});
const VE = { busy: false, msg: "", out: null, sv: "", prompt: "", v: null };
try { AV.maker = localStorage.getItem("av-maker") === "ai" ? "ai" : "studio"; } catch (e) { AV.maker = "studio"; }
const veT = (k, o) => { let s = tr(k); Object.keys(o || {}).forEach(x => { s = s.split("{" + x + "}").join(o[x]); }); return s; };
const veOn = () => typeof avCreateTab === "function" && avCreateTab() && AV.maker === "ai";

/* ---------- the script → one video prompt ---------- */
const VE_LANG = { hi: "Hindi", hn: "simple spoken Hindi (Hinglish)", en: "Indian English" };
function vePrompt(v) {
  const words = AV.len === "s" ? 22 : AV.len === "l" ? 40 : 30;
  const say = [], add = t => { t = String(t || "").trim(); if (!t) return true; const n = say.join(" ").split(/\s+/).filter(Boolean).length + t.split(/\s+/).length; if (n > words && say.length) return false; say.push(t); return true; };
  (v.scenes || []).some(s => !add(s.say));
  const end = String(v.cta_say || AV_END[AV.end] || "").trim();
  if (end && !add(end)) { if (say.length > 1) say.pop(); add(end); }
  const shots = (v.scenes || []).slice(0, AV.len === "s" ? 2 : AV.len === "l" ? 4 : 3).map((s, i) => (i + 1) + ") " + [s.look, s.title, s.sub].filter(Boolean).join(", ")).join(" ");
  const style = (typeof AV_STYLE !== "undefined" && AV_STYLE[AV.style]) ? AV_STYLE[AV.style] : (AV.type === "alert" ? "a serious, urgent alert" : "warm and friendly");
  const narr = AV.voice === "no" ? "No narration; only natural orchard sounds."
    : "Narration by " + (AV.voice === "m" ? "a friendly Indian male voice" : "a warm Indian female voice") + " speaking " + (VE_LANG[AV.lang] || "Hindi") + ", saying exactly: \"" + say.join(" ") + "\"";
  const music = AV.music === "none" ? "No music." : "Soft background music that suits the mood.";
  const photo = AV.pics === "mine" && AV.photos && AV.photos.length ? "Start from the given picture and bring it to life. " : "";
  return ("Realistic vertical 9:16 video, about " + (AV.len === "s" ? 8 : 10) + " seconds, for apple growers in the Himalayas (Himachal Pradesh, Kashmir, Uttarakhand). " + photo +
    "Topic: " + (v.title || "") + ". Mood: " + style + ". Shots: " + shots + ". Real Indian adult apple growers in local clothes, terraced apple orchards on mountain slopes, natural light, smooth cinematic camera. " +
    narr + " " + music + " No on-screen text, no subtitles, no logos.").replace(/\s+/g, " ").slice(0, 1900);
}
/* the first of "My photos" as the opening picture (max 1280 px, JPEG) */
function vePhoto() {
  const p = AV.pics === "mine" && AV.photos && AV.photos[0]; if (!p) return Promise.resolve(null);
  return new Promise(ok => {
    const go = im => { try { const W = im.naturalWidth || im.width, H = im.naturalHeight || im.height, s = Math.min(1, 1280 / Math.max(W, H)), c = document.createElement("canvas");
      c.width = Math.round(W * s); c.height = Math.round(H * s); c.getContext("2d").drawImage(im, 0, 0, c.width, c.height);
      ok({ data: c.toDataURL("image/jpeg", 0.86).split(",")[1], mime: "image/jpeg" }); } catch (e) { ok(null); } };
    if (p.el) return go(p.el);   /* already loaded by the studio */
    const fr = new FileReader(); fr.onerror = () => ok(null);
    fr.onload = () => { const im = new Image(); im.onload = () => go(im); im.onerror = () => ok(null); im.src = fr.result; };
    try { fr.readAsDataURL(p); } catch (e) { ok(null); }
  });
}

/* ---------- making it ---------- */
async function veDropFile() { try { if (VE.out && VE.out.path) await sb.storage.from("library").remove([VE.out.path]); } catch (e) {} }
async function veFromScript(v) {
  VE.v = v; VE.prompt = vePrompt(v);
  avStep("ve_s2");
  const img = await vePhoto();
  const r = await fetch("/api/social?fn=veo", { method: "POST", headers: { "Content-Type": "application/json", Authorization: "Bearer " + await avTok() },
    body: JSON.stringify({ prompt: VE.prompt, aspect: "9:16", image: img }) });
  const j = await r.json().catch(() => ({}));
  const m = String(j.message || "");
  if (j.error === "no_key") throw new Error(tr("ve_nokey"));
  if (j.error === "blocked") throw new Error(veT("ve_blocked", { m }));
  if (j.error === "quota") throw new Error(veT("ve_quota", { m }));
  if (j.error || !j.url) throw new Error(m || j.error || ("HTTP " + r.status));
  VE.out = j; VE.sv = "";
}
async function veRun(getScript) {
  if (VE.out && !VE.sv) await veDropFile();   /* "Try again" replaces the unsaved clip */
  VE.out = null; VE.sv = ""; VE.msg = ""; VE.posted = "";
  AV.busy = true; AV.err = ""; AV.note = ""; AV.done = false; avRender();
  try {
    const v = await getScript();
    if (!v) { AV.busy = false; avRender(); return; }
    await veFromScript(v);
    AV.step = "";
    await veWhere();
  } catch (e) { AV.err = veT("ve_err", { m: String(e.message || e) }); AV.step = ""; }
  AV.busy = false; avRender();
}
const veAC0 = avCreate;
avCreate = async function () {
  if (!veOn()) return veAC0.apply(this, arguments);
  if (AV.busy) return;
  const brief = !!avBriefText();
  const topic = ((AV.own || "").trim() || AV.topic).replace(/\s*\(\d+\)$/, "") || (brief ? "As in the brief below" : "");
  if (!topic) { AV.err = tr("av_need_topic"); avRender(); return; }
  avSave();
  return veRun(async () => {
    avStep("ve_s1");
    const idea = AV.type === "idea" && typeof avIdeas === "function" ? avIdeas().find(x => x.name === topic) : null;
    const v = await avWrite(idea ? idea.name + ". Hook: " + idea.hook + ". Show: " + idea.show : topic);
    if (AV.check && !AV.oneTap) {   /* check the script first, same as the studio; nothing is paid for yet */
      AV.script = v; AV.step = tr("av_sc_ready"); AV.busy = false; avRender();
      const el = $("avScript"); if (el) el.scrollIntoView({ block: "start", behavior: "smooth" });
      return null;
    }
    return v;
  });
};
const veMS0 = avMakeScript;
avMakeScript = async function () {
  if (!veOn()) return veMS0.apply(this, arguments);
  const v = AV.script; if (!v || AV.busy) return;
  if (v.scenes.some(x => !String(x.title || "").trim())) { AV.err = tr("av_sc_empty"); avRender(); return; }
  AV.script = null;
  return veRun(async () => v);
};
/* "Where should it go?": the AI video is saved to 📚 Saved straight away, ready for the ticked places.
   Nothing goes public by itself: posting is one tap there (🚀 Post everywhere or one place at a time), like the studio's "waits for your OK". */
async function veWhere() {
  const W = AV.where || {}, ticked = ["fb", "ig", "yt", "wa"].filter(w => W[w]);
  if (!ticked.length || AV.oneTap || typeof svInsert !== "function") return;
  await veSaveRow(false); VE.sv = "saved";
  VE.posted = esc(veT("ve_ready", { w: ticked.map(w => tr("sv_" + w)).join(", ") }));
}
async function veSaveRow(bin) {
  return svInsert({ kind: "video", title: String((VE.v && VE.v.title) || "").slice(0, 200) || null, text: String((VE.v && VE.v.caption) || "").slice(0, 2200),
    video_url: VE.out.url, bytes: VE.out.bytes || null, lang: AV.lang || null, binned_at: bin ? new Date().toISOString() : null });
}
async function veKeep(bin) {
  if (!VE.out || VE.busy) return;
  VE.busy = true; VE.msg = ""; avRender();
  try {
    if (bin && typeof svInsert !== "function") await veDropFile();
    else await veSaveRow(bin);
    VE.sv = bin ? "bin" : "saved";
  } catch (e) { VE.msg = typeof svNoTable === "function" && svNoTable(e) ? tr("sv_setup") : String(e.message || e); }
  VE.busy = false; avRender();
}

/* ---------- the page ---------- */
function veMakerHtml() {
  const dis = AV.busy ? " disabled" : "";
  return '<fieldset class="avgrp vemaker"' + dis + "><legend>" + esc(tr("ve_maker")) + '</legend><div class="avchips">' +
    avChip("maker", "studio", tr("ve_m_studio")) + avChip("maker", "ai", tr("ve_m_ai")) + "</div>" +
    '<p class="fine">' + esc(tr(AV.maker === "ai" ? "ve_m_ai_p" : "ve_m_studio_p")) + "</p></fieldset>";
}
function veResHtml() {
  if (!VE.out) return "";
  let h = '<div class="mkres vevid"><video src="' + esc(VE.out.url) + '" controls playsinline loop style="width:100%;max-width:320px;border-radius:12px;background:#000"></video>';
  if (VE.sv) h += '<p role="status">' + esc(tr(VE.sv === "bin" ? "sv_dropped" : "sv_saved_ok")) + (VE.sv === "bin" ? "" : ' <button type="button" class="link" data-mkmake="saved">' + esc(tr("sv_open")) + "</button>") + "</p>";
  else { const dis = VE.busy ? " disabled" : "";
    h += "<p><b>" + esc(tr("ve_q")) + '</b></p><div class="mklinks svbar"><button class="btn-s add" type="button" data-ve="save"' + dis + ">" + esc(tr("sv_save")) + "</button>" +
      '<button class="btn-s" type="button" data-ve="again"' + dis + ">" + esc(tr("sv_again")) + "</button>" +
      '<button class="btn-s" type="button" data-ve="drop"' + dis + ">" + esc(tr("sv_drop")) + "</button></div>"; }
  if (VE.msg) h += '<p class="fine mkwarn" role="alert">' + esc(VE.msg) + "</p>";
  if (VE.posted) h += '<p class="fine" role="status">' + VE.posted + "</p>";   /* already escaped */
  if (VE.prompt) h += '<details class="avfold"><summary class="fine">' + esc(tr("ve_prompt")) + '</summary><p class="fine">' + esc(VE.prompt) + "</p></details>";
  return h + "</div>";
}
const veAH0 = avHtml;
avHtml = function () {
  let h = veAH0.apply(this, arguments);
  if (!(typeof avCreateTab === "function" && avCreateTab())) return h;
  /* the choice sits first, right under the heading */
  h = h.replace(/(<p class="fine">[^<]*<\/p>)/, "$1" + veMakerHtml());
  if (AV.maker !== "ai") return h;
  h = h.replace(/(<button type="button" class="btn-s add avgo" id="avGo"[^>]*>)[^<]*(<\/button>)/, "$1" + esc(AV.busy ? AV.step : tr("ve_go")) + "$2");
  h = h.replace(/(<details class="avfold" data-avd="opts")/, '<p class="fine vediff">' + esc(tr("ve_diff")) + "</p>$1");
  return h;
};
const veAR0 = avRender;
avRender = function () {
  veAR0.apply(this, arguments);
  try {
    const box = $("avBox"); if (!box) return;
    box.querySelectorAll(".vevid").forEach(x => x.remove());
    const vs = $("vsBody"), ai = veOn();
    if (vs) vs.style.display = ai ? "none" : "";          /* the studio's own editor is not used for AI videos */
    if (ai) {
      box.querySelectorAll(".svvid").forEach(x => x.remove());
      const r = veResHtml(), go = $("avGo"), p = go && go.closest("p");
      if (r) { if (p) p.insertAdjacentHTML("afterend", r); else box.insertAdjacentHTML("beforeend", r); }
    }
  } catch (e) { console.error("veo", e); }
};
document.addEventListener("click", e => {
  const m = e.target.closest && e.target.closest('#avBox [data-av="maker"]');
  if (m) { try { localStorage.setItem("av-maker", m.dataset.v); } catch (err) {} return; }   /* autovid.js sets AV.maker and redraws */
  const b = e.target.closest && e.target.closest("#avBox [data-ve]"); if (!b || VE.busy || AV.busy) return;
  const a = b.dataset.ve;
  if (a === "save") return veKeep(false);
  if (a === "drop") return veKeep(true);
  if (a === "again") return avCreate();
});
try { if ($("avBox")) avRender(); } catch (e) {}
