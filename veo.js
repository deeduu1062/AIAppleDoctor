/* Seb Saathi admin — Social handler → Create → 🎬 Video: "AI video (Google)".
   Type what should happen (or tap an idea), optionally add a start picture (e.g. a real Seb Saathi screenshot),
   and Google's video model (Gemini Omni Flash, the model family behind Google Flow) makes a short clip with sound.
   Then Save it to 📚 Saved (to post later anywhere), Try again, or Discard it.
   Server: /api/social?fn=veo (api/_veo.js) — needs GEMINI_API_KEY in Vercel. Loaded after saved.js. */
Object.assign(T.en, {
  ve_h: "🎬 AI video (Google)", ve_sub: "Real-looking video clips with sound, made by Google's video model (like Google Flow).",
  ve_what: "What should happen in the video?", ve_ph: "Describe the scene: place, people, what they do, camera, light, sound. English works best; spoken lines can be in Hindi.",
  ve_ideas: "Ideas:", ve_i1: "Disease check", ve_i2: "Season profit", ve_i3: "Orchard morning",
  ve_shape: "Shape", ve_tall: "Tall 9:16 (Reels, Shorts, Status)", ve_wide: "Wide 16:9 (YouTube)",
  ve_pic: "📷 Start from a picture (optional)", ve_pic_ch: "Change picture", ve_pic_rm: "Remove", ve_pic_p: "The video starts from this picture, e.g. a real Seb Saathi screen or an orchard photo.",
  ve_go: "🎬 Make the video", ve_busy: "Making your video… this takes 1–4 minutes. Keep this page open.",
  ve_cost: "Each clip is a few seconds long and is paid to Google from your Gemini API key.",
  ve_nokey: "Not set up yet: get an API key at aistudio.google.com (Get API key, with billing on), add it in Vercel → Settings → Environment Variables as GEMINI_API_KEY, then Redeploy.",
  ve_blocked: "Google didn't make this one (its safety check stopped it). Try different words. {m}", ve_quota: "Google refused: no credit or limit reached on the API key. {m}",
  ve_err: "Something went wrong: {m}", ve_short: "Write a little more about the scene first.",
  ve_q: "Like this clip? Save it to share later, make it again, or discard it.",
});
Object.assign(T.hi, {
  ve_h: "🎬 AI वीडियो (Google)", ve_sub: "असली जैसे वीडियो क्लिप आवाज़ के साथ, Google के वीडियो मॉडल से (Google Flow जैसा)।",
  ve_what: "वीडियो में क्या होना चाहिए?", ve_ph: "दृश्य लिखें: जगह, लोग, वे क्या करते हैं, कैमरा, रोशनी, आवाज़। अंग्रेज़ी में सबसे अच्छा; बोले जाने वाले वाक्य हिंदी में हो सकते हैं।",
  ve_ideas: "आइडिया:", ve_i1: "रोग जाँच", ve_i2: "सीज़न मुनाफ़ा", ve_i3: "बाग़ की सुबह",
  ve_shape: "आकार", ve_tall: "लंबा 9:16 (Reels, Shorts, Status)", ve_wide: "चौड़ा 16:9 (YouTube)",
  ve_pic: "📷 किसी तस्वीर से शुरू करें (ज़रूरी नहीं)", ve_pic_ch: "तस्वीर बदलें", ve_pic_rm: "हटाएँ", ve_pic_p: "वीडियो इस तस्वीर से शुरू होगा, जैसे सेब साथी की असली स्क्रीन या बाग़ की फ़ोटो।",
  ve_go: "🎬 वीडियो बनाएँ", ve_busy: "आपका वीडियो बन रहा है… 1–4 मिनट लगेंगे। यह पेज खुला रखें।",
  ve_cost: "हर क्लिप कुछ सेकंड का होता है और इसका पैसा आपकी Gemini API key से Google को जाता है।",
  ve_nokey: "अभी चालू नहीं: aistudio.google.com पर API key लें (Get API key, बिलिंग चालू), Vercel → Settings → Environment Variables में GEMINI_API_KEY नाम से जोड़ें, फिर Redeploy करें।",
  ve_blocked: "Google ने यह नहीं बनाया (उसकी सुरक्षा जाँच ने रोका)। दूसरे शब्दों में लिखें। {m}", ve_quota: "Google ने मना किया: API key पर पैसा नहीं या सीमा पूरी। {m}",
  ve_err: "कुछ गड़बड़ हुई: {m}", ve_short: "पहले दृश्य के बारे में थोड़ा और लिखें।",
  ve_q: "क्लिप पसंद आया? बाद में शेयर करने के लिए सेव करें, फिर से बनाएँ या हटाएँ।",
});
const VE_IDEAS = {
  i1: "Vertical video. Early morning in a Himachal apple orchard on a steep mountain slope, soft golden light, mist in the valley below. A middle-aged Indian apple grower in a Himachali topi and woollen jacket holds an Android phone close to an apple leaf with brown scab spots and takes a photo. Close-up of his face as he reads the phone and nods with relief. Slow push-in camera, shallow depth of field, natural colours. Sound: birds, light wind. He says in Hindi: \"Ab pata chal gaya, kya spray karna hai.\"",
  i2: "Vertical video. Evening at an apple grading shed in Himachal, wooden apple boxes (peti) stacked high, red apples glowing in warm lamp light. An Indian apple grower sits on a box, looks at his phone, then smiles widely and shows the screen to his wife beside him. Handheld camera, cosy warm light. Sound: soft chatter, a radio in the background. He says in Hindi: \"Is saal har peti par asli munafa pata hai.\"",
  i3: "Vertical video. Sunrise drone shot rising over terraced apple orchards in the Himalayas, trees heavy with red apples, snow peaks behind. The camera glides down to a young woman apple grower walking between the rows, touching the fruit, phone in hand. Cinematic, slow, golden light, gentle music with flute.",
};
const VE = { prompt: "", aspect: "9:16", img: null, busy: false, msg: "", out: null, sv: "" };
const veT = (k, o) => { let s = tr(k); Object.keys(o || {}).forEach(x => { s = s.split("{" + x + "}").join(o[x]); }); return s; };

/* shrink the start picture so the request stays small (max 1280 px, JPEG) */
function veShrink(file) {
  return new Promise((ok, no) => {
    const fr = new FileReader();
    fr.onerror = () => no(new Error("read"));
    fr.onload = () => {
      const im = new Image();
      im.onerror = () => no(new Error("image"));
      im.onload = () => {
        const s = Math.min(1, 1280 / Math.max(im.width, im.height)), c = document.createElement("canvas");
        c.width = Math.round(im.width * s); c.height = Math.round(im.height * s);
        c.getContext("2d").drawImage(im, 0, 0, c.width, c.height);
        const url = c.toDataURL("image/jpeg", 0.86);
        ok({ prev: url, data: url.split(",")[1], mime: "image/jpeg" });
      };
      im.src = fr.result;
    };
    fr.readAsDataURL(file);
  });
}
function veHtml() {
  const dis = VE.busy ? " disabled" : "";
  let h = '<section class="spbox vebox" id="veBox"><div class="mkph"><b>' + esc(tr("ve_h")) + '</b></div><p class="fine">' + esc(tr("ve_sub")) + "</p>";
  h += '<label class="fine" for="vePrompt"><b>' + esc(tr("ve_what")) + "</b></label>" +
    '<textarea class="mkin mkta" id="vePrompt" rows="5" placeholder="' + esc(tr("ve_ph")) + '"' + dis + ">" + esc(VE.prompt) + "</textarea>";
  h += '<div class="mklinks"><span class="fine">' + esc(tr("ve_ideas")) + "</span>" +
    ["i1", "i2", "i3"].map(k => '<button type="button" class="btn-s" data-ve="idea" data-k="' + k + '"' + dis + ">" + esc(tr("ve_" + k)) + "</button>").join("") + "</div>";
  h += '<div class="mklinks"><span class="fine">' + esc(tr("ve_shape")) + "</span>" +
    [["9:16", "ve_tall"], ["16:9", "ve_wide"]].map(a => '<button type="button" class="btn-s avchip" data-ve="shape" data-a="' + a[0] + '" aria-pressed="' + (VE.aspect === a[0]) + '"' + dis + ">" + esc(tr(a[1])) + "</button>").join("") + "</div>";
  h += '<div class="mkrow">' + (VE.img ? '<img class="mkprev" src="' + esc(VE.img.prev) + '" alt="">' : "") +
    '<label class="btn-s mkfile">' + esc(tr(VE.img ? "ve_pic_ch" : "ve_pic")) + '<input type="file" accept="image/*" id="veFile" hidden' + dis + "></label>" +
    (VE.img ? '<button class="btn-s" type="button" data-ve="rmimg"' + dis + ">" + esc(tr("ve_pic_rm")) + "</button>" : "") + "</div>" +
    '<p class="fine">' + esc(tr("ve_pic_p")) + "</p>";
  h += '<p><button class="btn-s add mkbig" type="button" data-ve="go"' + dis + ">" + esc(tr(VE.busy ? "ve_busy" : "ve_go")) + "</button></p>" +
    '<p class="fine">' + esc(tr("ve_cost")) + "</p>";
  if (VE.msg) h += '<p class="fine mkwarn" role="alert">' + VE.msg + "</p>";
  if (VE.out) {
    h += '<div class="mkres"><video src="' + esc(VE.out.url) + '" controls playsinline loop style="width:100%;max-width:' + (VE.aspect === "9:16" ? "320px" : "560px") + ';border-radius:12px;background:#000"></video>';
    if (VE.sv) h += '<p role="status">' + esc(tr(VE.sv === "bin" ? "sv_dropped" : "sv_saved_ok")) + (VE.sv === "bin" ? "" : ' <button type="button" class="link" data-mkmake="saved">' + esc(tr("sv_open")) + "</button>") + "</p>";
    else h += '<p><b>' + esc(tr("ve_q")) + '</b></p><div class="mklinks svbar"><button class="btn-s add" type="button" data-ve="save"' + dis + ">" + esc(tr("sv_save")) + "</button>" +
      '<button class="btn-s" type="button" data-ve="again"' + dis + ">" + esc(tr("sv_again")) + "</button>" +
      '<button class="btn-s" type="button" data-ve="drop"' + dis + ">" + esc(tr("sv_drop")) + "</button></div>";
    h += "</div>";
  }
  return h + "</section>";
}
function veRender() {
  const old = $("veBox");
  if (typeof mkSub === "undefined" || mkSub !== "create" || mkMake !== "video") { if (old) old.remove(); return; }
  const html = veHtml();
  if (old) { old.outerHTML = html; return; }
  const top = $("mkTop"); if (!top) return;
  const chips = top.querySelector(".mkmake");
  if (chips) chips.insertAdjacentHTML("afterend", html); else top.insertAdjacentHTML("beforeend", html);
}
async function veMake() {
  if (VE.busy) return;
  if (VE.prompt.trim().length < 15) { VE.msg = esc(tr("ve_short")); veRender(); return; }
  if (VE.out && !VE.sv) await veDropFile();   /* "Try again" replaces the unsaved clip */
  VE.busy = true; VE.msg = ""; VE.out = null; VE.sv = ""; veRender();
  try {
    const r = await fetch("/api/social?fn=veo", { method: "POST", headers: { "Content-Type": "application/json", Authorization: "Bearer " + await avTok() },
      body: JSON.stringify({ prompt: VE.prompt, aspect: VE.aspect, image: VE.img ? { data: VE.img.data, mime: VE.img.mime } : null }) });
    const j = await r.json().catch(() => ({}));
    const m = esc(j.message || "");
    if (j.error === "no_key") VE.msg = esc(tr("ve_nokey"));
    else if (j.error === "blocked") VE.msg = veT("ve_blocked", { m });
    else if (j.error === "quota") VE.msg = veT("ve_quota", { m });
    else if (j.error || !j.url) VE.msg = veT("ve_err", { m: m || esc(j.error || ("HTTP " + r.status)) });
    else VE.out = j;
  } catch (e) { VE.msg = veT("ve_err", { m: esc(String(e.message || e)) }); }
  VE.busy = false; veRender();
}
async function veDropFile() {
  try { if (VE.out && VE.out.path) await sb.storage.from("library").remove([VE.out.path]); } catch (e) {}
}
async function veKeep(bin) {
  if (!VE.out || VE.busy) return;
  VE.busy = true; VE.msg = ""; veRender();
  try {
    if (bin && typeof svInsert !== "function") { await veDropFile(); VE.out = null; }
    else await svInsert({ kind: "video", title: VE.prompt.slice(0, 120), text: "", video_url: VE.out.url, bytes: VE.out.bytes || null, binned_at: bin ? new Date().toISOString() : null });
    VE.sv = bin ? "bin" : "saved";
  } catch (e) { VE.msg = esc(typeof svNoTable === "function" && svNoTable(e) ? tr("sv_setup") : String(e.message || e)); }
  VE.busy = false; veRender();
}
const veRM0 = renderMk;
renderMk = function () {
  veRM0.apply(this, arguments);
  try { veRender(); } catch (e) { console.error("veo", e); }
};
document.addEventListener("input", e => { if (e.target && e.target.id === "vePrompt") VE.prompt = e.target.value; });
document.addEventListener("change", async e => {
  const t = e.target; if (!t || t.id !== "veFile" || !t.files || !t.files[0]) return;
  try { VE.img = await veShrink(t.files[0]); VE.msg = ""; } catch (err) { VE.msg = esc(lang === "hi" ? "यह तस्वीर पढ़ी नहीं जा सकी।" : "That picture could not be read."); }
  veRender();
});
document.addEventListener("click", e => {
  const b = e.target.closest && e.target.closest("[data-ve]"); if (!b || VE.busy) return;
  const a = b.dataset.ve;
  if (a === "idea") { VE.prompt = VE_IDEAS[b.dataset.k] || ""; VE.msg = ""; if (VE.aspect !== "9:16" && /^Vertical/.test(VE.prompt)) VE.prompt = VE.prompt.replace(/^Vertical video\. /, "Wide cinematic video. "); veRender(); return; }
  if (a === "shape") { VE.aspect = b.dataset.a; VE.prompt = VE.prompt.replace(/^(Vertical video|Wide cinematic video)\. /, VE.aspect === "9:16" ? "Vertical video. " : "Wide cinematic video. "); veRender(); return; }
  if (a === "rmimg") { VE.img = null; veRender(); return; }
  if (a === "go" || a === "again") return veMake();
  if (a === "save") return veKeep(false);
  if (a === "drop") return veKeep(true);
});
renderMk();
