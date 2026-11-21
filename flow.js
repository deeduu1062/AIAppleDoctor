/* Seb Saathi admin — Social handler → Create → 🎬 Video → "📥 From Google Flow".
   Videos made in Google Flow use the Google AI Pro plan's credits (no API bill). This makes that easy:
     1. Same options as the studio → "✨ Write my Flow prompt": the AI writes the script, it becomes one Flow prompt (copy + Open Flow)
     2. Make the clip in Flow and download it
     3. Pick the downloaded file here → captions for Facebook, Instagram, YouTube and WhatsApp are written → saved to 📚 Saved
   Nothing is posted until you tap in Saved. Loaded after veo.js (uses vePrompt, avWrite, mkUpload, svInsert). */
Object.assign(T.en, {
  fl_m: "📥 From Google Flow", fl_m_p: "Make the clip in Google Flow with your Google AI Pro plan (no API bill), then add it here. Same options; you get the prompt to paste.",
  fl_go: "✨ Write my Flow prompt", fl_s1: "Writing the prompt…",
  fl_p_h: "1. Your Flow prompt", fl_p_p: "Copy it, open Flow, paste it, choose 9:16 (Portrait), make the clip and download it (MP4).",
  fl_copy: "📋 Copy prompt", fl_copied: "✓ Copied", fl_open: "Open Google Flow ↗",
  fl_up_h: "2. Add the video from Flow", fl_pick: "📁 Choose the downloaded video", fl_what: "What does the video show? (one line, for the captions)",
  fl_what_ph: "e.g. A grower checks scab spots on leaves after rain", fl_save: "💾 Save to 📚 Saved", fl_busy_up: "Uploading the video…", fl_busy_cap: "Writing the captions…",
  fl_done: "✓ Saved with captions for Facebook, Instagram, YouTube and WhatsApp. Post it from 📚 Saved when you are ready.",
  fl_need_file: "Choose the video file first.", fl_need_what: "Write one line about what the video shows (or make the prompt above first).",
  fl_big: "This file is {mb} MB. Please use a file under 50 MB (download it from Flow at 720p).", fl_type: "Please choose an MP4 video (Flow's Download → MP4).",
  fl_nocap: "Saved, but the captions could not be written ({m}). You can edit the caption in Saved.", fl_err: "Could not save: {m}",
});
Object.assign(T.hi, {
  fl_m: "📥 Google Flow से", fl_m_p: "क्लिप Google Flow में अपने Google AI Pro प्लान से बनाएँ (API का बिल नहीं), फिर यहाँ जोड़ें। वही विकल्प; पेस्ट करने के लिए प्रॉम्प्ट मिलता है।",
  fl_go: "✨ मेरा Flow प्रॉम्प्ट लिखें", fl_s1: "प्रॉम्प्ट लिखा जा रहा है…",
  fl_p_h: "1. आपका Flow प्रॉम्प्ट", fl_p_p: "कॉपी करें, Flow खोलें, पेस्ट करें, 9:16 (Portrait) चुनें, क्लिप बनाएँ और डाउनलोड करें (MP4)।",
  fl_copy: "📋 प्रॉम्प्ट कॉपी करें", fl_copied: "✓ कॉपी हो गया", fl_open: "Google Flow खोलें ↗",
  fl_up_h: "2. Flow का वीडियो जोड़ें", fl_pick: "📁 डाउनलोड किया वीडियो चुनें", fl_what: "वीडियो में क्या दिखता है? (एक लाइन, कैप्शन के लिए)",
  fl_what_ph: "जैसे: बारिश के बाद बाग़वान पत्तों पर स्कैब के धब्बे देखता है", fl_save: "💾 📚 Saved में सेव करें", fl_busy_up: "वीडियो अपलोड हो रहा है…", fl_busy_cap: "कैप्शन लिखे जा रहे हैं…",
  fl_done: "✓ Facebook, Instagram, YouTube और WhatsApp के कैप्शन के साथ सेव हो गया। तैयार हों तो 📚 Saved से पोस्ट करें।",
  fl_need_file: "पहले वीडियो फ़ाइल चुनें।", fl_need_what: "वीडियो में क्या दिखता है, एक लाइन लिखें (या पहले ऊपर प्रॉम्प्ट बनाएँ)।",
  fl_big: "यह फ़ाइल {mb} MB की है। 50 MB से छोटी फ़ाइल लें (Flow से 720p में डाउनलोड करें)।", fl_type: "MP4 वीडियो चुनें (Flow में Download → MP4)।",
  fl_nocap: "सेव हो गया, पर कैप्शन नहीं लिखे जा सके ({m})। Saved में कैप्शन बदल सकते हैं।", fl_err: "सेव नहीं हुआ: {m}",
});
const FL = { prompt: "", v: null, file: null, url: "", what: "", busy: "", msg: "", ok: "", copied: false };
const flT = (k, o) => { let s = tr(k); Object.keys(o || {}).forEach(x => { s = s.split("{" + x + "}").join(o[x]); }); return s; };
const flOn = () => typeof avCreateTab === "function" && avCreateTab() && AV.maker === "flow";
try { if (localStorage.getItem("av-maker") === "flow") AV.maker = "flow"; } catch (e) {}

/* the maker chips get a third choice */
const flMH0 = veMakerHtml;
veMakerHtml = function () {
  let h = flMH0.apply(this, arguments).replace('</div><p class="fine">', avChip("maker", "flow", tr("fl_m")) + '</div><p class="fine">');
  if (AV.maker === "flow") h = h.replace(/(<p class="fine">)[^<]*(<\/p><\/fieldset>)$/, "$1" + esc(tr("fl_m_p")) + "$2");
  return h;
};
function flHtml() {
  const dis = FL.busy ? " disabled" : "";
  let h = "";
  if (FL.prompt) h += '<div class="mkres flbox"><p><b>' + esc(tr("fl_p_h")) + '</b></p><p class="fine">' + esc(tr("fl_p_p")) + "</p>" +
    '<textarea class="avin avta" id="flPrompt" rows="6" readonly>' + esc(FL.prompt) + "</textarea>" +
    '<div class="mklinks"><button type="button" class="btn-s add" data-fl="copy">' + esc(tr(FL.copied ? "fl_copied" : "fl_copy")) + "</button>" +
    '<a class="btn-s" href="https://labs.google/fx/tools/flow" target="_blank" rel="noopener">' + esc(tr("fl_open")) + "</a></div></div>";
  h += '<div class="mkres flbox"><p><b>' + esc(tr("fl_up_h")) + "</b></p>" +
    '<p><label class="btn-s mkfile">' + esc(tr("fl_pick")) + '<input type="file" accept="video/mp4,video/quicktime,video/*" id="flFile" hidden' + dis + "></label> " +
    (FL.file ? '<span class="fine">' + esc(FL.file.name) + " · " + (Math.round(FL.file.size / 1048576 * 10) / 10) + " MB</span>" : "") + "</p>" +
    (FL.url ? '<video src="' + esc(FL.url) + '" controls playsinline style="width:100%;max-width:320px;border-radius:12px;background:#000"></video>' : "") +
    '<label class="fine avlab" for="flWhat">' + esc(tr("fl_what")) + '</label><input class="avin" id="flWhat" maxlength="300" placeholder="' + esc(tr("fl_what_ph")) + '" value="' + esc(FL.what) + '"' + dis + ">" +
    '<p><button type="button" class="btn-s add" data-fl="save"' + dis + ">" + esc(FL.busy ? tr(FL.busy) : tr("fl_save")) + "</button></p>" +
    (FL.msg ? '<p class="fine mkwarn" role="alert">' + esc(FL.msg) + "</p>" : "") +
    (FL.ok ? '<p role="status">' + esc(FL.ok) + ' <button type="button" class="link" data-mkmake="saved">' + esc(tr("sv_open")) + "</button></p>" : "") + "</div>";
  return h;
}
/* the page: same options form; the button writes the prompt; the upload part sits under it */
const flAH0 = avHtml;
avHtml = function () {
  let h = flAH0.apply(this, arguments);
  if (!flOn()) return h;
  h = h.replace(/(<button type="button" class="btn-s add avgo" id="avGo"[^>]*>)[^<]*(<\/button>)/, "$1" + esc(AV.busy ? AV.step : tr("fl_go")) + "$2");
  h = h.replace(/<p class="fine vediff">[^<]*<\/p>/, "");
  return h;
};
const flAR0 = avRender;
avRender = function () {
  flAR0.apply(this, arguments);
  try {
    const box = $("avBox"); if (!box) return;
    box.querySelectorAll(".flwrap").forEach(x => x.remove());
    const vs = $("vsBody"); if (vs && flOn()) vs.style.display = "none";
    if (!flOn()) return;
    box.querySelectorAll(".svvid,.vevid").forEach(x => x.remove());
    const go = $("avGo"), p = go && go.closest("p"), w = '<div class="flwrap">' + flHtml() + "</div>";
    if (p) p.insertAdjacentHTML("afterend", w); else box.insertAdjacentHTML("beforeend", w);
  } catch (e) { console.error("flow", e); }
};
/* "Write my Flow prompt": the same script the studio / AI video would use, turned into one prompt (nothing paid to Google) */
const flAC0 = avCreate;
avCreate = async function () {
  if (!flOn()) return flAC0.apply(this, arguments);
  if (AV.busy) return;
  const brief = !!avBriefText();
  const topic = ((AV.own || "").trim() || AV.topic).replace(/\s*\(\d+\)$/, "") || (brief ? "As in the brief below" : "");
  if (!topic) { AV.err = tr("av_need_topic"); avRender(); return; }
  avSave(); AV.busy = true; AV.err = ""; AV.step = tr("fl_s1"); FL.copied = false; avRender();
  try {
    const v = await avWrite(topic);
    FL.v = v; FL.prompt = vePrompt(v).replace(/^Realistic vertical 9:16 video/, "Realistic vertical video");
    if (!FL.what) FL.what = String(v.title || topic).slice(0, 300);
    AV.step = "";
  } catch (e) { AV.err = tr("av_err").replace("{m}", String(e.message || e)); AV.step = ""; }
  AV.busy = false; avRender();
};
async function flSave() {
  FL.msg = ""; FL.ok = "";
  if (!FL.file) { FL.msg = tr("fl_need_file"); avRender(); return; }
  const what = String(FL.what || "").trim();
  if (!what && !FL.v) { FL.msg = tr("fl_need_what"); avRender(); return; }
  const mb = FL.file.size / 1048576;
  if (mb > 50) { FL.msg = flT("fl_big", { mb: Math.round(mb) }); avRender(); return; }
  const ext = /quicktime|\.mov$/i.test(FL.file.type + FL.file.name) ? "mov" : /webm/i.test(FL.file.type) ? "webm" : "mp4";
  if (ext === "webm") { FL.msg = tr("fl_type"); avRender(); return; }
  try {
    FL.busy = "fl_busy_up"; avRender();
    const url = await mkUpload(FL.file, ext, FL.file.type || (ext === "mov" ? "video/quicktime" : "video/mp4"));
    FL.busy = "fl_busy_cap"; avRender();
    let cap = null, capErr = "";
    try {
      const shows = [what, FL.v && FL.v.title, FL.v && (FL.v.scenes || []).map(s => s.say).filter(Boolean).join(" "), FL.v && FL.v.cta_say].filter(Boolean).join("\n");
      const r = await fetch("/api/social?fn=draft", { method: "POST", headers: { "Content-Type": "application/json", Authorization: "Bearer " + await avTok() }, body: JSON.stringify({ kind: "repurpose", ask: shows, lang: AV.lang }) });
      const j = await r.json().catch(() => ({})); cap = j.repurpose || null; if (!cap) capErr = j.error || ("HTTP " + r.status);
    } catch (e) { capErr = String(e.message || e); }
    const C = cap || {};
    await svInsert({ kind: "video", title: String(C.yt_title || (FL.v && FL.v.title) || what).slice(0, 200) || null,
      text: String(C.fb || (FL.v && FL.v.caption) || what).slice(0, 2200), ig_text: C.ig ? String(C.ig).slice(0, 2200) : null,
      yt_desc: C.yt_desc ? String(C.yt_desc).slice(0, 5000) : null, video_url: url, bytes: FL.file.size || null, lang: AV.lang || null });
    FL.ok = cap ? tr("fl_done") : flT("fl_nocap", { m: capErr });
    if (FL.url) URL.revokeObjectURL(FL.url);
    FL.file = null; FL.url = ""; FL.what = "";
  } catch (e) { FL.msg = flT("fl_err", { m: typeof svNoTable === "function" && svNoTable(e) ? tr("sv_setup") : String(e.message || e) }); }
  FL.busy = ""; avRender();
}
document.addEventListener("click", async e => {
  const m = e.target.closest && e.target.closest('#avBox [data-av="maker"]');
  if (m) { try { localStorage.setItem("av-maker", m.dataset.v); } catch (err) {} return; }
  const b = e.target.closest && e.target.closest("#avBox [data-fl]"); if (!b || FL.busy) return;
  if (b.dataset.fl === "copy") {
    try { await navigator.clipboard.writeText(FL.prompt); } catch (err) { const t = $("flPrompt"); if (t) { t.select(); try { document.execCommand("copy"); } catch (e2) {} } }
    FL.copied = true; avRender(); return;
  }
  if (b.dataset.fl === "save") return flSave();
});
document.addEventListener("change", e => {
  const t = e.target; if (!t || t.id !== "flFile" || !t.files || !t.files[0]) return;
  if (FL.url) URL.revokeObjectURL(FL.url);
  FL.file = t.files[0]; FL.url = URL.createObjectURL(FL.file); FL.msg = ""; FL.ok = ""; avRender();
});
document.addEventListener("input", e => { if (e.target && e.target.id === "flWhat") FL.what = e.target.value; });
try { if ($("avBox")) avRender(); } catch (e) {}
