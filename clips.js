/* Seb Saathi admin — clip library for videos
   "Create a video for me" → Pictures → 🎞 My clips + free stock:
   - a scene about the website shows the real Seb Saathi screen (screens.js),
   - otherwise your own clip that matches the scene (upload them once: trees in bloom, red apples, hills, spraying, packing),
   - otherwise a free Pexels clip found for the scene (needs PEXELS_API_KEY in Vercel; kept in the library for next time),
   - otherwise a drawn picture.
   Table: supabase/social_clips.sql. Files: storage bucket "library", folder clips/. Loaded after autovid.js and screens.js. */
Object.assign(T.en, {
  av_p_clips: "🎞 My clips + free stock",
  cl_h: "🎞 Clip library", cl_p: "Short real clips play behind the scenes. Your own clips come first; free Pexels clips fill the gaps and are kept here for next time. Scenes about the website show the real Seb Saathi screens.",
  cl_add: "➕ Add my clips", cl_label: "What's in it (simple English words)", cl_label_ph: "e.g. apple trees in bloom, Rohru hills",
  cl_del: "Delete", cl_del_sure: "Delete for good?", cl_n: "{own} of yours · {px} from Pexels", cl_none: "No clips yet. Add a few 5–10 second clips filmed upright, slowly panning across the trees.",
  cl_up: "Uploading {n}…", cl_up_bad: "{f} isn't a video file.", cl_up_big: "{f} is bigger than 50 MB. Trim it to 5–15 seconds first.",
  cl_setup: "Run supabase/social_clips.sql in Supabase once to turn on the clip library.",
  cl_nokey: "Free stock clips are off: add PEXELS_API_KEY in Vercel (free from pexels.com/api), then Redeploy. Your own clips still work.",
  cl_credit: "Free videos from", av_s_clips: "Finding clips for each scene…", cl_err: "Some clips could not be loaded ({m}), so drawn pictures were used there.",
  cl_more: "Show all {n}", cl_less: "Show fewer"
});
Object.assign(T.hi, {
  av_p_clips: "🎞 मेरी क्लिप + मुफ़्त स्टॉक",
  cl_h: "🎞 क्लिप लाइब्रेरी", cl_p: "सीन के पीछे असली छोटी क्लिप चलती हैं। पहले आपकी अपनी क्लिप, कमी हो तो Pexels की मुफ़्त क्लिप, जो अगली बार के लिए यहीं रख ली जाती हैं। वेबसाइट वाले सीन में सेब साथी की असली स्क्रीन दिखती है।",
  cl_add: "➕ अपनी क्लिप जोड़ें", cl_label: "इसमें क्या है (आसान अंग्रेज़ी शब्दों में)", cl_label_ph: "जैसे apple trees in bloom, Rohru hills",
  cl_del: "मिटाएँ", cl_del_sure: "हमेशा के लिए मिटाएँ?", cl_n: "{own} आपकी · {px} Pexels से", cl_none: "अभी कोई क्लिप नहीं। 5–10 सेकंड की कुछ क्लिप जोड़ें, फ़ोन सीधा पकड़कर, पेड़ों पर धीरे-धीरे घुमाते हुए।",
  cl_up: "{n} अपलोड हो रही हैं…", cl_up_bad: "{f} वीडियो फ़ाइल नहीं है।", cl_up_big: "{f} 50 MB से बड़ी है। पहले 5–15 सेकंड की काट लें।",
  cl_setup: "क्लिप लाइब्रेरी चालू करने के लिए Supabase में एक बार supabase/social_clips.sql चलाएँ।",
  cl_nokey: "मुफ़्त स्टॉक क्लिप बंद हैं: Vercel में PEXELS_API_KEY डालें (pexels.com/api से मुफ़्त), फिर Redeploy करें। आपकी अपनी क्लिप फिर भी चलेंगी।",
  cl_credit: "मुफ़्त वीडियो:", av_s_clips: "हर सीन के लिए क्लिप ढूँढी जा रही है…", cl_err: "कुछ क्लिप लोड नहीं हुईं ({m}), वहाँ बने हुए चित्र लगाए गए।",
  cl_more: "सारी {n} दिखाएँ", cl_less: "कम दिखाएँ"
});

const CL = { list: null, err: "", loading: false, busy: "", msg: "", sure: "", all: false, nokey: false };
const clT = (k, o) => { let s = tr(k); Object.keys(o || {}).forEach(x => { s = s.split("{" + x + "}").join(o[x]); }); return s; };
const clNoTable = e => /social_clips|schema cache|does not exist|42P01|PGRST20/i.test(String((e && (e.message || e.code)) || e || ""));
const CL_STOP = new Set("a an the of in on at to and or with for from by is are this that your my our over under near very".split(" "));
const clWords = s => String(s || "").toLowerCase().replace(/[^a-z0-9 ]+/g, " ").split(/\s+/).filter(w => w.length > 2 && !CL_STOP.has(w)).map(w => w.replace(/(es|s)$/, ""));
/* a drawn picture's subject, as words to search with, when the AI gave no "look" */
const CL_ART = { apple: "red apples branch", tree: "apple orchard trees", leaf_spots: "apple leaf disease", spray: "farmer spraying orchard", crate: "apple boxes harvest", money: "fruit market", chart: "farmer using phone", phone: "farmer using phone", calendar: "orchard seasons", shears: "pruning apple tree", soil: "orchard soil", snow: "snow mountain village", flower: "apple blossom", sun: "sunrise mountains", rain: "rain on leaves", bug: "insect on leaf", camera: "phone photo plant", family: "indian village family" };

async function clLoad() {
  if (CL.loading || typeof sb === "undefined") return;
  CL.loading = true;
  try {
    const r = await sb.from("social_clips").select("*").order("created_at", { ascending: false }).limit(300);
    if (r.error) throw r.error;
    CL.list = r.data || []; CL.err = "";
  } catch (e) { CL.list = null; CL.err = clNoTable(e) ? "setup" : String(e.message || e); }
  CL.loading = false;
  if (typeof avRender === "function") avRender();
}
const clOwn = () => (CL.list || []).filter(c => c.source === "own");

/* ---- the library box (shown under Pictures when "My clips + free stock" is picked) ---- */
function clLibHtml() {
  if (CL.list === null && !CL.err && !CL.loading) setTimeout(clLoad, 0);
  let h = '<div class="clbox"><p><b>' + esc(tr("cl_h")) + '</b></p><p class="fine">' + esc(tr("cl_p")) + "</p>";
  if (CL.err === "setup") return h + '<p class="fine mkwarn">' + esc(tr("cl_setup")) + "</p></div>";
  if (CL.err) return h + '<p class="fine mkwarn">' + esc(CL.err) + "</p></div>";
  if (!CL.list) return h + '<p class="fine">…</p></div>';
  const own = clOwn().length, px = CL.list.length - own;
  h += '<p class="fine"><b>' + esc(clT("cl_n", { own, px })) + "</b></p>" +
    '<p><label class="btn-s add clup"' + (CL.busy ? ' aria-disabled="true"' : "") + ">" + esc(CL.busy || tr("cl_add")) +
    '<input type="file" id="clFile" accept="video/*" multiple hidden' + (CL.busy ? " disabled" : "") + "></label></p>";
  if (CL.msg) h += '<p class="fine" role="status">' + CL.msg + "</p>";
  if (CL.nokey) h += '<p class="fine mkwarn">' + esc(tr("cl_nokey")) + "</p>";
  if (!CL.list.length) h += '<p class="fine">' + esc(tr("cl_none")) + "</p>";
  const show = CL.all ? CL.list : CL.list.slice(0, 6);
  h += '<div class="clgrid">' + show.map(c => '<div class="clitem"><video src="' + esc(c.url) + '" muted playsinline preload="metadata" loop></video>' +
    (c.source === "own"
      ? '<label class="fine" for="cl-l-' + c.id + '">' + esc(tr("cl_label")) + '</label><input class="avin" id="cl-l-' + c.id + '" data-cll="' + c.id + '" maxlength="200" value="' + esc(c.label) + '" placeholder="' + esc(tr("cl_label_ph")) + '">'
      : '<p class="fine">' + esc(c.label) + (c.credit ? " · " + esc(c.credit) : "") + "</p>") +
    '<button type="button" class="btn-s sm" data-cldel="' + c.id + '">' + esc(tr(CL.sure === String(c.id) ? "cl_del_sure" : "cl_del")) + "</button></div>").join("") + "</div>";
  if (CL.list.length > 6) h += '<p><button type="button" class="link" data-clall="1">' + esc(CL.all ? tr("cl_less") : clT("cl_more", { n: CL.list.length })) + "</button></p>";
  h += '<p class="fine">' + esc(tr("cl_credit")) + ' <a href="https://www.pexels.com" target="_blank" rel="noopener">Pexels</a></p>';
  return h + "</div>";
}
async function clUpload(files) {
  if (CL.busy) return;
  const ok = [], bad = [];
  Array.from(files || []).forEach(f => { if (!/^video\//.test(f.type)) bad.push(clT("cl_up_bad", { f: f.name })); else if (f.size > 50 * 1048576) bad.push(clT("cl_up_big", { f: f.name })); else ok.push(f); });
  CL.msg = bad.map(esc).join("<br>");
  if (!ok.length) { avRender(); return; }
  CL.busy = clT("cl_up", { n: ok.length }); avRender();
  for (const f of ok) {
    try {
      const ext = (f.name.match(/\.(mp4|mov|webm|m4v)$/i) || [, "mp4"])[1].toLowerCase();
      const url = await mkUpload(f, ext, f.type || "video/mp4");
      const label = f.name.replace(/\.[^.]+$/, "").replace(/[_-]+/g, " ").replace(/\b(VID|IMG|PXL|MVIMG)\s*\d+.*$/i, "").trim().slice(0, 200);
      const r = await sb.from("social_clips").insert({ url, label, source: "own", bytes: f.size }).select().single();
      if (r.error) throw r.error;
      CL.list = [r.data].concat(CL.list || []);
    } catch (e) { CL.msg += (CL.msg ? "<br>" : "") + '<span class="mkwarn">' + esc(clNoTable(e) ? tr("cl_setup") : f.name + ": " + String(e.message || e)) + "</span>"; }
  }
  CL.busy = ""; avRender();
}
async function clDelete(id) {
  const c = (CL.list || []).find(x => String(x.id) === String(id)); if (!c) return;
  try {
    const r = await sb.from("social_clips").delete().eq("id", c.id); if (r.error) throw r.error;
    CL.list = CL.list.filter(x => x.id !== c.id);
    const m = String(c.url).match(/\/object\/public\/library\/(.+)$/);
    if (m) { try { await sb.storage.from("library").remove([decodeURIComponent(m[1])]); } catch (e) {} }
  } catch (e) { CL.msg = '<span class="mkwarn">' + esc(String(e.message || e)) + "</span>"; }
  avRender();
}

/* ---- choosing a clip for each scene ---- */
function clLoadVid(url) {
  return new Promise(res => {
    const el = document.createElement("video");
    el.crossOrigin = "anonymous"; el.muted = true; el.playsInline = true; el.loop = true; el.preload = "auto";
    let done = false; const fin = v => { if (!done) { done = true; res(v); } };
    el.onloadeddata = () => fin({ type: "vid", el, name: "🎞 " + url.split("/").pop().slice(0, 30) });
    el.onerror = () => fin(null);
    setTimeout(() => fin(null), 25000);
    el.src = url;
  });
}
async function clStock(q, fmt, skip) {
  const r = await fetch("/api/social?fn=clip", { method: "POST", headers: { "Content-Type": "application/json", Authorization: "Bearer " + await avTok() },
    body: JSON.stringify({ q, orient: fmt === "11" ? "square" : "portrait", skip }) });
  const j = await r.json().catch(() => ({}));
  if (j.error === "no_pexels_key") { CL.nokey = true; return null; }
  if (!j.url) return null;
  try { const ins = await sb.from("social_clips").insert({ url: j.url, label: String(j.label || q).slice(0, 200), source: "pexels", ext_id: j.ext_id || null, credit: j.credit || null, bytes: j.bytes || null }).select().single(); if (!ins.error) CL.list = [ins.data].concat(CL.list || []); } catch (e) {}
  return j.url;
}
async function clForScenes(scenes, lang, fmt) {
  if (typeof avStep === "function") avStep("av_s_clips");
  if (CL.list === null) await clLoad();
  const used = new Set(), out = [], errs = [];
  const score = (c, s) => { const want = clWords((s.look || "") + " " + (s.look ? "" : CL_ART[s.art] || "")); const have = new Set(clWords(c.label)); return want.filter(w => have.has(w)).length; };
  for (const s of scenes) {
    let m = null;
    try {
      /* 1. a scene about the website: the real screen */
      const sk = typeof scrKeyOf === "function" && SCR_KEYS.indexOf(s.screen) >= 0 ? s.screen : "";
      if (sk && typeof scrGet === "function") { try { m = await scrGet(sk, lang); } catch (e) { m = null; } }
      /* 2. your own clip that fits best (then a Pexels clip already in the library) */
      if (!m && CL.list) {
        const pool = CL.list.filter(c => !used.has(c.id)).map(c => ({ c, n: score(c, s) + (c.source === "own" ? 0.5 : 0) })).filter(x => x.n >= 1).sort((a, b) => b.n - a.n);
        if (pool.length) { used.add(pool[0].c.id); m = await clLoadVid(pool[0].c.url); }
      }
      /* 3. a new free Pexels clip */
      if (!m && !CL.nokey) {
        const q = (s.look || CL_ART[s.art] || "apple orchard").slice(0, 60);
        const skip = (CL.list || []).filter(c => c.ext_id).map(c => c.ext_id);
        const url = await clStock(q, fmt, skip);
        if (url) { const c = (CL.list || []).find(x => x.url === url); if (c) used.add(c.id); m = await clLoadVid(url); }
      }
      /* 4. any of your own clips not used yet in this video */
      if (!m) { const c = clOwn().find(x => !used.has(x.id)); if (c) { used.add(c.id); m = await clLoadVid(c.url); } }
    } catch (e) { errs.push(String(e.message || e)); }
    out.push(m);
  }
  if (errs.length) AV.note = (AV.note ? AV.note + " " : "") + clT("cl_err", { m: errs[0] });
  if (CL.nokey) AV.note = (AV.note ? AV.note + " " : "") + tr("cl_nokey");
  return out;
}

/* ---- taps and typing in the library box ---- */
document.addEventListener("change", e => {
  const t = e.target; if (!t) return;
  if (t.id === "clFile") { clUpload(t.files); t.value = ""; return; }
  if (t.dataset && t.dataset.cll) {
    const c = (CL.list || []).find(x => String(x.id) === t.dataset.cll); if (!c) return;
    const v = t.value.trim().slice(0, 200); if (v === c.label) return;
    c.label = v; sb.from("social_clips").update({ label: v }).eq("id", c.id).then(() => {}, () => {});
  }
});
document.addEventListener("click", e => {
  const d = e.target.closest && e.target.closest("[data-cldel]");
  if (d) { const id = d.dataset.cldel; if (CL.sure !== id) { CL.sure = id; avRender(); return; } CL.sure = ""; clDelete(id); return; }
  const a = e.target.closest && e.target.closest("[data-clall]");
  if (a) { CL.all = !CL.all; avRender(); }
});
/* clip previews play while the pointer is over them */
document.addEventListener("pointerover", e => { const v = e.target.closest && e.target.closest(".clitem video"); if (v) v.play().catch(() => {}); });
document.addEventListener("pointerout", e => { const v = e.target.closest && e.target.closest(".clitem video"); if (v) v.pause(); });
if (typeof avRender === "function" && typeof AV !== "undefined" && !AV.busy) avRender();
