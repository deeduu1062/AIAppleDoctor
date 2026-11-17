/* Seb Saathi admin — Social handler: the Saved library
   Make something, then Save it, Try again or Discard it. Saved posts and videos stay in Create → Saved,
   ready to share whenever you want on Facebook, Instagram, YouTube or WhatsApp. Each one shows where it has
   already gone, so nothing is posted twice by mistake. Discarded items wait in the bin for 7 days (Undo), then go.
   Table: supabase/social_saved.sql. Loaded after marketing.js, studio.js, autovid.js and social-plus.js. */
Object.assign(T.en, {
  mk_m_saved: "📚 Saved", sv_save: "💾 Save", sv_again: "🔁 Try again", sv_drop: "🗑 Discard", sv_busy: "Working…",
  sv_saved_ok: "✓ Saved. Find it in Create → 📚 Saved, and share it whenever you want.", sv_dropped: "Moved to the bin. You can undo it for 7 days.",
  sv_open: "Open Saved", sv_vid_q: "Like this video? Save it to share later, make it again, or discard it.",
  sv_setup: "Run supabase/social_saved.sql in Supabase once to turn on the Saved library.",
  sv_h: "📚 Saved", sv_p: "Everything you saved, ready to share. Tap where it should go; the marks show where it has already been posted.",
  sv_f_all: "All", sv_f_post: "Posts", sv_f_video: "Videos", sv_f_new: "Not posted yet", sv_f_bin: "🗑 Bin",
  sv_none: "Nothing saved yet. Make a post or a video above, then tap 💾 Save.", sv_none_f: "Nothing here.", sv_bin_none: "The bin is empty.",
  sv_space: "Library: {n} items · {mb} MB of storage", sv_bin_p: "Items here are deleted for good 7 days after you discard them.",
  sv_left: "deleted in {d} days", sv_left1: "deleted tomorrow", sv_restore: "↩ Undo", sv_kill: "Delete now", sv_kill_sure: "Delete for good?",
  sv_fb: "Facebook", sv_ig: "Instagram", sv_yt: "YouTube", sv_wa: "WhatsApp",
  sv_go_fb: "Post to Facebook", sv_go_ig: "Post to Instagram", sv_go_yt: "Upload to YouTube", sv_go_wa: "Send on WhatsApp", sv_again_p: "again",
  sv_copy: "Copy text", sv_copied: "Copied ✓", sv_text: "Text", sv_posting: "Posting…",
  sv_done: "✓ Posted to {w}.", sv_fail: "Not posted to {w}: {m}", sv_noconn: "Connect Facebook / Instagram first (Settings tab).", sv_noig: "Instagram isn't connected yet (Settings tab).",
  sv_noyt: "Connect your YouTube channel first (Create → video → YouTube box).", sv_wa_mark: "Marked as sent on WhatsApp.",
  sv_twice: "Already posted to {w}. Tap again to post it once more.",
  sv_today: "📚 {n} saved, not posted yet", sv_k_post: "Post", sv_k_video: "Video",
});
Object.assign(T.hi, {
  mk_m_saved: "📚 सेव किए", sv_save: "💾 सेव करें", sv_again: "🔁 फिर से बनाएँ", sv_drop: "🗑 हटाएँ", sv_busy: "काम चल रहा है…",
  sv_saved_ok: "✓ सेव हो गया। बनाएँ → 📚 सेव किए में मिलेगा, जब चाहें शेयर करें।", sv_dropped: "बिन में डाल दिया। 7 दिन तक वापस ला सकते हैं।",
  sv_open: "सेव किए खोलें", sv_vid_q: "वीडियो पसंद आया? बाद में शेयर करने के लिए सेव करें, फिर से बनाएँ या हटाएँ।",
  sv_setup: "सेव लाइब्रेरी चालू करने के लिए Supabase में एक बार supabase/social_saved.sql चलाएँ।",
  sv_h: "📚 सेव किए", sv_p: "आपका सेव किया सब कुछ, शेयर के लिए तैयार। जहाँ भेजना है वहाँ दबाएँ; निशान बताते हैं कि कहाँ पहले ही पोस्ट हो चुका है।",
  sv_f_all: "सब", sv_f_post: "पोस्ट", sv_f_video: "वीडियो", sv_f_new: "अभी पोस्ट नहीं हुए", sv_f_bin: "🗑 बिन",
  sv_none: "अभी कुछ सेव नहीं है। ऊपर पोस्ट या वीडियो बनाएँ, फिर 💾 सेव करें दबाएँ।", sv_none_f: "यहाँ कुछ नहीं है।", sv_bin_none: "बिन खाली है।",
  sv_space: "लाइब्रेरी: {n} चीज़ें · {mb} MB जगह", sv_bin_p: "यहाँ की चीज़ें हटाने के 7 दिन बाद हमेशा के लिए मिट जाती हैं।",
  sv_left: "{d} दिन में मिटेगा", sv_left1: "कल मिटेगा", sv_restore: "↩ वापस लाएँ", sv_kill: "अभी मिटाएँ", sv_kill_sure: "हमेशा के लिए मिटाएँ?",
  sv_go_fb: "Facebook पर पोस्ट करें", sv_go_ig: "Instagram पर पोस्ट करें", sv_go_yt: "YouTube पर अपलोड करें", sv_go_wa: "WhatsApp पर भेजें", sv_again_p: "फिर से",
  sv_copy: "टेक्स्ट कॉपी करें", sv_copied: "कॉपी हो गया ✓", sv_text: "टेक्स्ट", sv_posting: "पोस्ट हो रहा है…",
  sv_done: "✓ {w} पर पोस्ट हो गया।", sv_fail: "{w} पर पोस्ट नहीं हुआ: {m}", sv_noconn: "पहले Facebook / Instagram जोड़ें (सेटिंग टैब)।", sv_noig: "Instagram अभी जुड़ा नहीं है (सेटिंग टैब)।",
  sv_noyt: "पहले अपना YouTube चैनल जोड़ें (बनाएँ → वीडियो → YouTube बॉक्स)।", sv_wa_mark: "WhatsApp पर भेजा हुआ मार्क किया।",
  sv_twice: "{w} पर पहले ही पोस्ट हो चुका है। एक बार और पोस्ट करने के लिए फिर दबाएँ।",
  sv_today: "📚 {n} सेव किए, अभी पोस्ट नहीं हुए", sv_k_post: "पोस्ट", sv_k_video: "वीडियो",
});

const SV = { list: null, err: "", loading: false, busy: "", msg: {}, filter: "all", killSure: "", twice: "", copied: "", files: {}, note: "" };
const SV_DAY = 864e5, SV_KEEP = 7 * SV_DAY;
const svT = (k, o) => { let s = tr(k); Object.keys(o || {}).forEach(x => { s = s.split("{" + x + "}").join(o[x]); }); return s; };
const svNoTable = e => /social_saved|schema cache|does not exist|42P01|PGRST20/i.test(String((e && (e.message || e.code)) || e || ""));
const svLive = () => (SV.list || []).filter(x => !x.binned_at);
const svBin = () => (SV.list || []).filter(x => x.binned_at);
const svWhere = x => Object.keys(x.posted || {}).filter(k => x.posted[k]);
const svPlaces = x => x.kind === "video" ? ["fb", "ig", "yt", "wa"] : ["fb", "ig", "wa"];

/* how big a file is, without downloading it */
async function svBytes(url) {
  if (!url) return 0;
  try { const r = await fetch(url, { method: "HEAD" }); return +r.headers.get("content-length") || 0; } catch (e) { return 0; }
}
/* the file's path in the "library" bucket, from its public link */
const svPath = url => { const m = String(url || "").match(/\/object\/public\/library\/(.+)$/); return m ? decodeURIComponent(m[1].split("?")[0]) : ""; };

async function svLoad() {
  if (SV.loading || typeof sb === "undefined") return;
  SV.loading = true;
  try {
    const r = await sb.from("social_saved").select("*").order("created_at", { ascending: false }).limit(300);
    if (r.error) throw r.error;
    SV.list = r.data || []; SV.err = "";
    svPurge();
  } catch (e) { SV.list = null; SV.err = svNoTable(e) ? "setup" : String(e.message || e); }
  SV.loading = false;
  renderMk();
}
/* items in the bin for more than 7 days: deleted, with their file (unless a post in the list still uses it) */
async function svPurge() {
  const old = svBin().filter(x => Date.now() - Date.parse(x.binned_at) > SV_KEEP);
  for (const x of old) await svKill(x, true);
  if (old.length) renderMk();
}
async function svKill(x, quiet) {
  try {
    const r = await sb.from("social_saved").delete().eq("id", x.id);
    if (r.error) throw r.error;
    SV.list = (SV.list || []).filter(y => y.id !== x.id);
    for (const u of [x.image_url, x.video_url]) {
      const p = svPath(u); if (!p) continue;
      if ((SV.list || []).some(y => y.image_url === u || y.video_url === u)) continue;
      if ((typeof mkQ !== "undefined" && mkQ || []).some(y => y.image_url === u || y.video_url === u)) continue;
      try { await sb.storage.from("library").remove([p]); } catch (e) {}
    }
  } catch (e) { if (!quiet) SV.msg[x.id] = '<span class="mkwarn">' + esc(String(e.message || e)) + "</span>"; }
}
async function svInsert(row) {
  const r = await sb.from("social_saved").insert(Object.assign({ lang: typeof mkQLang !== "undefined" ? mkQLang : null }, row)).select().single();
  if (r.error) throw r.error;
  if (!SV.list) SV.list = [];
  SV.list.unshift(r.data);
  return r.data;
}
async function svUpd(id, patch) {
  const r = await sb.from("social_saved").update(Object.assign({}, patch, { updated_at: new Date().toISOString() })).eq("id", id).select().single();
  if (r.error) throw r.error;
  const i = SV.list.findIndex(x => x.id === r.data.id); if (i >= 0) SV.list[i] = r.data;
  return r.data;
}
const svMark = (x, w) => svUpd(x.id, { posted: Object.assign({}, x.posted || {}, { [w]: new Date().toISOString() }) });

/* ============ 1. a new post: Save / Try again / Discard ============ */
const svPostRow = x => ({ kind: "post", title: String(x.topic || "").slice(0, 200) || null, text: String(x.text || "").slice(0, 2200),
  ig_text: String(qDraftOf(x).ig || "").slice(0, 2200) || null, image_url: x.image_url || null });
async function svPostKeep(bin) {
  const N = mkPostNew; if (!N || N.busy) return;
  N.busy = true; N.msg = ""; renderMk();
  try {
    for (const id of N.ids) {
      const x = qGet(id); if (!x) continue;
      const row = svPostRow(x);
      row.bytes = await svBytes(row.image_url);
      if (bin) row.binned_at = new Date().toISOString();
      await svInsert(row);
      await sb.from("social_queue").delete().eq("id", id);
      mkQ = mkQ.filter(y => String(y.id) !== String(id));
    }
    mkPostNew = null;
    mkAskMsg.fb = esc(tr(bin ? "sv_dropped" : "sv_saved_ok")) + ' <button type="button" class="link" data-mkmake="saved">' + esc(tr("sv_open")) + "</button>";
  } catch (e) {
    N.busy = false;
    if (bin && svNoTable(e)) { N.busy = false; return mkPostDrop0(); }   /* no Saved table yet: discard as before */
    N.msg = '<span class="mkwarn">' + esc(svNoTable(e) ? tr("sv_setup") : String(e.message || e)) + "</span>";
  }
  renderMk();
}
async function svPostAgain() {
  const N = mkPostNew; if (!N || N.busy || mkAskBusy) return;
  const want = N.want;
  try { for (const id of N.ids) { await sb.from("social_queue").delete().eq("id", id); mkQ = mkQ.filter(y => String(y.id) !== String(id)); } } catch (e) {}
  mkPostNew = null;
  await askPost(want);
}
/* the buttons under a new post: Save first, then Try again and Discard; sharing straight away still works */
const mkPostDrop0 = mkPostDrop;
mkPostDrop = () => svPostKeep(true);
const svPNH0 = mkPostNewHtml;
mkPostNewHtml = function () {
  let h = svPNH0.apply(this, arguments); if (!h) return h;
  const N = mkPostNew, dis = N && N.busy ? " disabled" : "";
  const bar = '<div class="mklinks svbar"><button class="btn-s add" type="button" data-sv="psave"' + dis + ">" + esc(tr(N && N.busy ? "sv_busy" : "sv_save")) + "</button>" +
    '<button class="btn-s" type="button" data-sv="pagain"' + dis + ">" + esc(tr("sv_again")) + "</button>" +
    '<button class="btn-s" type="button" data-sv="pdrop"' + dis + ">" + esc(tr("sv_drop")) + "</button></div>";
  /* the old Discard button goes; the new bar sits right under the post, before "Where should it go?" */
  h = h.replace(/<button class="btn-s" type="button" data-pwdrop="1"[^>]*>[^<]*<\/button>/, "");
  return h.replace('<div class="mkrow mkwhere">', bar + '<div class="mkrow mkwhere">');
};

/* ============ 2. a new video (Create a video for me): Save / Try again / Discard ============ */
const svVidOn = () => typeof avCreateTab === "function" && avCreateTab() && typeof VS !== "undefined" && VS.out && AV.done && !AV.busy;
function svVidHtml() {
  const o = VS.out;
  if (o.sv) return '<div class="mkres svvid" role="status"><p>' + esc(tr(o.sv === "bin" ? "sv_dropped" : "sv_saved_ok")) + ' <button type="button" class="link" data-mkmake="saved">' + esc(tr("sv_open")) + "</button></p></div>";
  const dis = SV.busy === "vid" ? " disabled" : "";
  return '<div class="mkres svvid"><p><b>' + esc(tr("sv_vid_q")) + '</b></p><div class="mklinks svbar"><button class="btn-s add" type="button" data-sv="vsave"' + dis + ">" + esc(tr(SV.busy === "vid" ? "sv_busy" : "sv_save")) + "</button>" +
    '<button class="btn-s" type="button" data-sv="vagain"' + dis + ">" + esc(tr("sv_again")) + "</button>" +
    '<button class="btn-s" type="button" data-sv="vdrop"' + dis + ">" + esc(tr("sv_drop")) + "</button></div>" +
    (SV.note ? '<p class="fine mkwarn" role="alert">' + esc(SV.note) + "</p>" : "") + "</div>";
}
async function svVidKeep(bin) {
  const o = VS.out; if (!o || !o.blob || SV.busy) return;
  SV.busy = "vid"; SV.note = ""; avRender();
  try {
    if (o.ext !== "mp4") throw new Error(tr("vs_q_webm"));
    if (!o.pub) o.pub = await mkUpload(o.blob, o.ext, o.blob.type || "video/mp4");
    const title = String((VS.ai && VS.ai.title) || (typeof vsYtTitle === "function" ? vsYtTitle().replace(/\s*#Shorts$/, "") : "")).slice(0, 200);
    await svInsert({ kind: "video", title: title || null, text: String(typeof vsCaption === "function" ? vsCaption() : "").slice(0, 2200),
      yt_desc: typeof vsYtDesc === "function" ? String(vsYtDesc()).slice(0, 5000) : null, video_url: o.pub, bytes: o.size || o.blob.size || null,
      lang: AV.lang || null, binned_at: bin ? new Date().toISOString() : null });
    o.sv = bin ? "bin" : "saved";
  } catch (e) { SV.note = svNoTable(e) ? tr("sv_setup") : String(e.message || e); }
  SV.busy = ""; avRender();
}
const svAR0 = avRender;
avRender = function () {
  svAR0.apply(this, arguments);
  try {
    const box = $("avBox"); if (!box) return;
    const old = box.querySelector(".svvid"); if (old) old.remove();
    if (!svVidOn()) return;
    const go = $("avGo"), p = go && go.closest("p");
    if (p) p.insertAdjacentHTML("afterend", svVidHtml()); else box.insertAdjacentHTML("beforeend", svVidHtml());
  } catch (e) { console.error("saved", e); }
};

/* ============ 3. the Saved library ============ */
function svFilt() {
  const F = SV.filter;
  if (F === "bin") return svBin();
  return svLive().filter(x => F === "all" || (F === "new" ? !svWhere(x).length : x.kind === F));
}
const svMB = b => (Math.round(b / 1048576 * 10) / 10).toLocaleString(lang === "hi" ? "hi-IN" : "en-IN");
const svWhen = iso => iso ? new Date(iso).toLocaleDateString(lang === "hi" ? "hi-IN" : "en-IN", { day: "numeric", month: "short" }) : "";
function svItemHtml(x) {
  const id = x.id, P = x.posted || {}, busy = SV.busy === String(id), anyBusy = !!SV.busy;
  let h = '<div class="mkq svitem"><div class="mkrow"><span class="mkkind k-' + x.kind + '">' + esc(tr("sv_k_" + x.kind)) + "</span><b>" + esc(x.title || String(x.text || "").split("\n")[0].slice(0, 60) || "—") + '</b><span class="fine">' + esc(svWhen(x.created_at)) + (x.bytes ? " · " + svMB(x.bytes) + " MB" : "") + "</span></div>";
  if (x.video_url) h += '<div class="mkrow"><video class="mkvprev" src="' + esc(x.video_url) + '" controls playsinline preload="none"></video></div>';
  else if (x.image_url) h += '<div class="mkrow"><img class="mkprev" src="' + esc(x.image_url) + '" alt="" loading="lazy"></div>';
  if (x.text) h += '<details class="mkmore"><summary>' + esc(tr("sv_text")) + '</summary><p style="white-space:pre-wrap">' + esc(x.text) + "</p></details>";
  if (x.binned_at) {
    const left = Math.max(1, Math.ceil((Date.parse(x.binned_at) + SV_KEEP - Date.now()) / SV_DAY));
    h += '<p class="fine">' + esc(left <= 1 ? tr("sv_left1") : svT("sv_left", { d: left })) + "</p>" +
      '<div class="mklinks"><button class="btn-s add" type="button" data-sv="restore" data-id="' + id + '"' + (anyBusy ? " disabled" : "") + ">" + esc(tr("sv_restore")) + "</button>" +
      '<button class="btn-s" type="button" data-sv="kill" data-id="' + id + '"' + (anyBusy ? " disabled" : "") + ">" + esc(tr(SV.killSure === String(id) ? "sv_kill_sure" : "sv_kill")) + "</button></div>";
  } else {
    /* where it has gone: FB ✓ 12 Nov · Insta – · YouTube – · WhatsApp – */
    h += '<div class="mkrow svmarks">' + svPlaces(x).map(w => '<span class="svmark' + (P[w] ? " on" : "") + '" title="' + esc(P[w] ? svWhen(P[w]) : "") + '">' + esc(tr("sv_" + w)) + " " + (P[w] ? "✓ " + esc(svWhen(P[w])) : "–") + "</span>").join("") + "</div>";
    const btn = w => {
      const again = P[w] ? " (" + tr("sv_again_p") + ")" : "";
      if (w === "wa" && x.kind === "post") return '<a class="btn-s wa" target="_blank" rel="noopener" data-svwa="' + id + '" href="https://wa.me/?text=' + encodeURIComponent(svWaText(x)) + '">' + esc(tr("sv_go_wa") + again) + "</a>";
      return '<button class="btn-s' + (P[w] ? "" : " add") + '" type="button" data-sv="go" data-w="' + w + '" data-id="' + id + '"' + (anyBusy ? " disabled" : "") + ">" + esc(busy && SV.busyW === w ? tr("sv_posting") : tr("sv_go_" + w) + again) + "</button>";
    };
    h += '<div class="mklinks">' + svPlaces(x).map(btn).join("") + "</div>" +
      '<div class="mklinks"><button class="btn-s" type="button" data-sv="copy" data-id="' + id + '">' + esc(tr(SV.copied === String(id) ? "sv_copied" : "sv_copy")) + "</button>" +
      '<button class="btn-s" type="button" data-sv="bin" data-id="' + id + '"' + (anyBusy ? " disabled" : "") + ">" + esc(tr("sv_drop")) + "</button></div>";
  }
  if (SV.msg[id]) h += '<p class="fine" role="status">' + SV.msg[id] + "</p>";
  return h + "</div>";
}
function svHtml() {
  let h = '<section class="spbox svlib"><div class="mkph"><b>' + esc(tr("sv_h")) + "</b></div>";
  if (SV.err === "setup") return h + '<p class="fine mkwarn">' + esc(tr("sv_setup")) + "</p></section>";
  if (SV.err) return h + '<p class="fine mkwarn">' + esc(SV.err) + "</p></section>";
  if (!SV.list) return h + '<p class="fine">' + esc(tr("mk_post_checking")) + "</p></section>";
  const L = svLive(), B = svBin(), bytes = L.reduce((a, x) => a + (+x.bytes || 0), 0);
  h += '<p class="fine">' + esc(tr("sv_p")) + "</p>" +
    '<p class="fine"><b>' + esc(svT("sv_space", { n: L.length, mb: svMB(bytes + B.reduce((a, x) => a + (+x.bytes || 0), 0)) })) + "</b></p>";
  const n = { all: L.length, post: L.filter(x => x.kind === "post").length, video: L.filter(x => x.kind === "video").length, new: L.filter(x => !svWhere(x).length).length, bin: B.length };
  h += '<div class="avchips" role="group">' + ["all", "post", "video", "new", "bin"].map(f => '<button type="button" class="btn-s sm avchip" data-svf="' + f + '" aria-pressed="' + (SV.filter === f) + '">' + esc(tr("sv_f_" + f)) + " (" + n[f] + ")</button>").join("") + "</div>";
  if (SV.filter === "bin" && B.length) h += '<p class="fine">' + esc(tr("sv_bin_p")) + "</p>";
  const F = svFilt();
  if (!F.length) h += '<p class="fine">' + esc(tr(SV.filter === "bin" ? "sv_bin_none" : L.length ? "sv_none_f" : "sv_none")) + "</p>";
  F.forEach(x => { h += svItemHtml(x); });
  return h + "</section>";
}

/* ---- sharing from the library ---- */
const svWaText = x => String(x.text || "").replace(/([?&])src=(fb|ig)\b/g, "$1src=wa");
async function svGo(x, w) {
  if (SV.busy) return;
  const P = x.posted || {};
  if (P[w] && SV.twice !== x.id + w) { SV.twice = x.id + w; SV.msg[x.id] = esc(svT("sv_twice", { w: tr("sv_" + w) })); renderMk(); return; }
  SV.twice = ""; SV.msg[x.id] = "";
  if (w === "wa") return svWaVid(x);
  if ((w === "fb" || w === "ig") && !(mkSoc && mkSoc.ok)) { SV.msg[x.id] = '<span class="mkwarn">' + esc(tr("sv_noconn")) + "</span>"; renderMk(); return; }
  if (w === "ig" && !mkSoc.ig_id) { SV.msg[x.id] = '<span class="mkwarn">' + esc(tr("sv_noig")) + "</span>"; renderMk(); return; }
  SV.busy = String(x.id); SV.busyW = w; renderMk();
  try {
    if (!mkQ) mkQ = [];
    if (w === "yt") {
      if (typeof YT !== "undefined" && !YT && typeof ytLoad === "function") await ytLoad();
      if (!(typeof YT !== "undefined" && YT && YT.connected)) throw new Error(tr("sv_noyt"));
      const t = String(x.title || "Seb Saathi").replace(/[<>]/g, "").slice(0, 88);
      const r = await sb.from("social_queue").insert({ kind: "yt", status: "draft", text: String(x.yt_desc || x.text || "").replace(/[<>]/g, "").slice(0, 2200), topic: (t + " #Shorts").slice(0, 100),
        video_url: x.video_url, fb: false, ig: false, post_at: new Date().toISOString(), result: { ytd: { priv: "public", at: "", ai: true } } }).select().single();
      if (r.error) throw r.error;
      mkQ.push(r.data); mkQMsg = "";
      await qYtSend(r.data.id);   /* on success the draft is removed and the upload is listed in Results */
      if (qGet(r.data.id)) { try { await sb.from("social_queue").delete().eq("id", r.data.id); } catch (e) {} mkQ = mkQ.filter(y => y.id !== r.data.id); throw new Error(mkQMsg || "YouTube"); }
      await svMark(x, "yt"); SV.msg[x.id] = esc(svT("sv_done", { w: "YouTube" }));
    } else {
      /* a row in the post list first, so its link is tracked and its results show in Results */
      const r = await sb.from("social_queue").insert({ kind: x.kind, status: "draft", text: String(w === "ig" ? x.ig_text || x.text : x.text || "").slice(0, 2200), topic: x.title || null,
        image_url: x.image_url || null, video_url: x.video_url || null, fb: w === "fb", ig: w === "ig", post_at: new Date().toISOString(), result: x.ig_text ? { draft: { ig: x.ig_text } } : null }).select().single();
      if (r.error) throw r.error;
      mkQ.push(r.data); mkQMsg = "";
      await qPostNow(r.data.id);
      const y = qGet(r.data.id), R = (y && y.result) || {}, name = tr("sv_" + w);
      if (y && y.status === "posted" && R[w] && R[w].ok) { await svMark(x, w); SV.msg[x.id] = esc(svT("sv_done", { w: name })) + (R[w].link ? ' · <a href="' + esc(R[w].link) + '" target="_blank" rel="noopener">' + esc(tr("mk_post_view")) + "</a>" : ""); }
      else {
        const m = R[w] && R[w].error ? qErrTxt(R[w].error) : mkQMsg || (R.error || "");
        /* nothing went out: the list row goes again (a "failed" one stays in Today, where it can be retried) */
        if (y && y.status === "draft") { try { await sb.from("social_queue").delete().eq("id", y.id); } catch (e) {} mkQ = mkQ.filter(z => z.id !== y.id); }
        throw new Error(m || "error");
      }
    }
  } catch (e) { SV.msg[x.id] = '<span class="mkwarn">' + esc(svT("sv_fail", { w: tr("sv_" + w), m: String(e.message || e) })) + "</span>"; }
  mkQMsg = ""; SV.busy = ""; SV.busyW = ""; renderMk();
}
/* a video to WhatsApp: the file itself where the phone can share it, else its link */
async function svWaVid(x) {
  const txt = svWaText(x), canFile = !!(navigator.canShare && navigator.share);
  try {
    if (canFile) {
      let f = SV.files[x.id];
      if (!f) {
        SV.busy = String(x.id); SV.busyW = "wa"; renderMk();
        const b = await (await fetch(x.video_url)).blob();
        f = SV.files[x.id] = new File([b], "seb-saathi-" + x.id + ".mp4", { type: b.type || "video/mp4" });
        SV.busy = ""; SV.busyW = "";
      }
      if (navigator.canShare({ files: [f] })) { await navigator.share({ files: [f], text: txt }); await svMark(x, "wa"); SV.msg[x.id] = esc(tr("sv_wa_mark")); renderMk(); return; }
    }
    window.open("https://wa.me/?text=" + encodeURIComponent(txt + "\n🎬 " + x.video_url), "_blank", "noopener");
    await svMark(x, "wa"); SV.msg[x.id] = esc(tr("sv_wa_mark"));
  } catch (e) { if (!e || e.name !== "AbortError") SV.msg[x.id] = '<span class="mkwarn">' + esc(String(e.message || e)) + "</span>"; }
  SV.busy = ""; SV.busyW = ""; renderMk();
}

/* ============ drawing it into the Social handler ============ */
const svRM0 = renderMk;
renderMk = function () {
  svRM0.apply(this, arguments);
  try {
    if (SV.list === null && !SV.err && !SV.loading && typeof mkQ !== "undefined" && mkQ) svLoad();
    const top = $("mkTop"); if (!top) return;
    if (mkSub === "create") {
      const box = $("svBox"); if (box) box.innerHTML = svHtml();
    } else if (mkSub === "today" && SV.list) {
      const n = svLive().filter(x => !svWhere(x).length).length, t = top.querySelector(".mktoday");
      if (n && t) t.insertAdjacentHTML("beforeend", '<div class="mklinks svnudge"><b>' + esc(svT("sv_today", { n })) + '</b><button type="button" class="btn-s add" data-mkmake="saved">' + esc(tr("sv_open")) + "</button></div>");
    }
  } catch (e) { console.error("saved", e); }
};

/* ---------- taps ---------- */
document.addEventListener("click", async e => {
  const wa = e.target.closest && e.target.closest("a[data-svwa]");
  if (wa) { const x = (SV.list || []).find(y => String(y.id) === wa.dataset.svwa); if (x) { await svMark(x, "wa"); SV.msg[x.id] = esc(tr("sv_wa_mark")); renderMk(); } return; }
  const f = e.target.closest && e.target.closest("[data-svf]");
  if (f) { SV.filter = f.dataset.svf; SV.killSure = ""; renderMk(); return; }
  const b = e.target.closest && e.target.closest("[data-sv]"); if (!b) return;
  const a = b.dataset.sv, x = (SV.list || []).find(y => String(y.id) === b.dataset.id);
  if (a !== "kill") SV.killSure = "";
  if (a === "psave") return svPostKeep(false);
  if (a === "pdrop") return svPostKeep(true);
  if (a === "pagain") return svPostAgain();
  if (a === "vsave") return svVidKeep(false);
  if (a === "vdrop") return svVidKeep(true);
  if (a === "vagain") { const g = $("avGo"); if (g && !g.disabled) g.click(); return; }
  if (!x) return;
  if (a === "go") return svGo(x, b.dataset.w);
  if (a === "copy") { try { await navigator.clipboard.writeText(x.text || ""); SV.copied = String(x.id); renderMk(); setTimeout(() => { SV.copied = ""; renderMk(); }, 2000); } catch (err) { window.prompt(tr("sv_copy"), x.text || ""); } return; }
  if (a === "bin" || a === "restore") {
    try { await svUpd(x.id, { binned_at: a === "bin" ? new Date().toISOString() : null }); SV.msg[x.id] = a === "bin" ? "" : ""; }
    catch (err) { SV.msg[x.id] = '<span class="mkwarn">' + esc(String(err.message || err)) + "</span>"; }
    renderMk(); return;
  }
  if (a === "kill") {
    if (SV.killSure !== String(x.id)) { SV.killSure = String(x.id); renderMk(); return; }
    SV.killSure = ""; SV.busy = String(x.id); renderMk(); await svKill(x); SV.busy = ""; renderMk();
  }
});
renderMk();
