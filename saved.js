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
  sv_all: "🚀 Post everywhere", sv_all_busy: "Posting to {w}…", sv_all_none: "It has already gone to every connected place.", sv_all_wa: "Now tap Send on WhatsApp (under \"One place at a time\") to finish.",
  sv_one: "One place at a time", sv_sch: "⏰ Schedule", sv_sch_where: "Where should it go?", sv_sch_when: "When (India time)", sv_best: "Best time",
  sv_sch_p: "Facebook and Instagram post by themselves at that time. YouTube uploads now and goes public then. For WhatsApp you get a reminder in Today.",
  sv_sch_go: "Schedule it", sv_sch_x: "Cancel", sv_sch_ok: "⏰ {w}: {t}", sv_sch_pick: "Tick at least one place.", sv_sch_past: "Pick a time at least a few minutes from now.",
  sv_sch_none: "Everything is already planned for this one.", sv_sch_failed: "didn't post, see Today", sv_sch_cancel: "Cancel the {w} plan", sv_sch_off: "{w} plan cancelled.",
  sv_sch_off_yt: "The video is still on YouTube as private; delete it in YouTube Studio if you don't want it.",
  sv_today_wa: "📲 Send on WhatsApp today: {t}", sv_today_sch: "⏰ {n} planned from Saved",
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
  sv_all: "🚀 हर जगह पोस्ट करें", sv_all_busy: "{w} पर पोस्ट हो रहा है…", sv_all_none: "यह पहले ही हर जुड़ी जगह जा चुका है।", sv_all_wa: "आख़िर में \"एक-एक जगह\" में WhatsApp पर भेजें दबाएँ।",
  sv_one: "एक-एक जगह", sv_sch: "⏰ समय तय करें", sv_sch_where: "कहाँ जाना है?", sv_sch_when: "कब (भारत का समय)", sv_best: "सबसे अच्छा समय",
  sv_sch_p: "Facebook और Instagram उस समय अपने आप पोस्ट होंगे। YouTube पर अभी अपलोड होगा और उस समय सबको दिखेगा। WhatsApp के लिए उस दिन आज वाले टैब में याद दिलाया जाएगा।",
  sv_sch_go: "समय तय करें", sv_sch_x: "रद्द करें", sv_sch_ok: "⏰ {w}: {t}", sv_sch_pick: "कम से कम एक जगह चुनें।", sv_sch_past: "अभी से कुछ मिनट बाद का समय चुनें।",
  sv_sch_none: "इसके लिए सब पहले से तय है।", sv_sch_failed: "पोस्ट नहीं हुआ, आज वाला टैब देखें", sv_sch_cancel: "{w} का समय रद्द करें", sv_sch_off: "{w} का समय रद्द हुआ।",
  sv_sch_off_yt: "वीडियो YouTube पर निजी (private) रहेगा; न चाहिए तो YouTube Studio में मिटा दें।",
  sv_today_wa: "📲 आज WhatsApp पर भेजें: {t}", sv_today_sch: "⏰ सेव किए में से {n} तय",
});

const SV = { list: null, err: "", loading: false, busy: "", msg: {}, filter: "all", killSure: "", twice: "", copied: "", files: {}, note: "" };
const SV_DAY = 864e5, SV_KEEP = 7 * SV_DAY;
const svT = (k, o) => { let s = tr(k); Object.keys(o || {}).forEach(x => { s = s.split("{" + x + "}").join(o[x]); }); return s; };
const svNoTable = e => /social_saved|schema cache|does not exist|42P01|PGRST20/i.test(String((e && (e.message || e.code)) || e || ""));
const svLive = () => (SV.list || []).filter(x => !x.binned_at);
const svBin = () => (SV.list || []).filter(x => x.binned_at);
const SV_PL = ["fb", "ig", "yt", "wa"];
const svWhere = x => SV_PL.filter(k => (x.posted || {})[k]);
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
const svMark = (x, w) => {
  const cur = (SV.list || []).find(y => y.id === x.id) || x, P = Object.assign({}, cur.posted || {}, { [w]: new Date().toISOString() });
  if (P._s && P._s[w]) { P._s = Object.assign({}, P._s); delete P._s[w]; if (!Object.keys(P._s).length) delete P._s; }
  return svUpd(x.id, { posted: P });
};

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
  let h = '<div class="mkq svitem" data-svid="' + id + '"><div class="mkrow"><span class="mkkind k-' + x.kind + '">' + esc(tr("sv_k_" + x.kind)) + "</span><b>" + esc(x.title || String(x.text || "").split("\n")[0].slice(0, 60) || "—") + '</b><span class="fine">' + esc(svWhen(x.created_at)) + (x.bytes ? " · " + svMB(x.bytes) + " MB" : "") + "</span></div>";
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
    const S = svSched(x);
    const qOf = w => S[w] && S[w].q ? (mkQ || []).find(y => String(y.id) === String(S[w].q)) : null;
    h += '<div class="mkrow svmarks">' + svPlaces(x).map(w => {
      if (S[w]) {
        const q = qOf(w), bad = q && q.status === "failed";
        return '<span class="svmark ' + (bad ? "bad" : "sch") + '">' + esc(tr("sv_" + w)) + " " + (bad ? "⚠ " + esc(tr("sv_sch_failed")) : "⏰ " + esc(qShow(S[w].at))) +
          ' <button type="button" class="svx" data-sv="unsch" data-w="' + w + '" data-id="' + id + '" aria-label="' + esc(svT("sv_sch_cancel", { w: tr("sv_" + w) })) + '">✕</button></span>';
      }
      return '<span class="svmark' + (P[w] ? " on" : "") + '" title="' + esc(P[w] ? svWhen(P[w]) : "") + '">' + esc(tr("sv_" + w)) + " " + (P[w] ? "✓ " + esc(svWhen(P[w])) : "–") + "</span>";
    }).join("") + "</div>";
    /* the two quick ways: everywhere now, or plan it */
    h += '<div class="mklinks svquick"><button class="btn-s add" type="button" data-sv="all" data-id="' + id + '"' + (anyBusy ? " disabled" : "") + ">" + esc(busy && SV.busyW && SV.busyW !== "sch" ? svT("sv_all_busy", { w: tr("sv_" + SV.busyW) }) : tr("sv_all")) + "</button>" +
      '<button class="btn-s" type="button" data-sv="sch" data-id="' + id + '" aria-expanded="' + (SV.sch === String(id)) + '"' + (anyBusy ? " disabled" : "") + ">" + esc(busy && SV.busyW === "sch" ? tr("sv_busy") : tr("sv_sch")) + "</button></div>";
    if (SV.sch === String(id)) h += svSchedHtml(x);
    const btn = w => {
      const again = P[w] ? " (" + tr("sv_again_p") + ")" : "";
      if (w === "wa" && x.kind === "post") return '<a class="btn-s wa" target="_blank" rel="noopener" data-svwa="' + id + '" href="https://wa.me/?text=' + encodeURIComponent(svWaText(x)) + '">' + esc(tr("sv_go_wa") + again) + "</a>";
      return '<button class="btn-s' + (P[w] ? "" : " add") + '" type="button" data-sv="go" data-w="' + w + '" data-id="' + id + '"' + (anyBusy ? " disabled" : "") + ">" + esc(busy && SV.busyW === w ? tr("sv_posting") : tr("sv_go_" + w) + again) + "</button>";
    };
    h += '<details class="mkmore svone"><summary>' + esc(tr("sv_one")) + '</summary><div class="mklinks">' + svPlaces(x).map(btn).join("") + "</div></details>" +
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
/* sends one saved item to one place now (Facebook, Instagram or YouTube); gives back the "done" message, or throws */
async function svSend(x, w) {
  if ((w === "fb" || w === "ig") && !(mkSoc && mkSoc.ok)) throw new Error(tr("sv_noconn"));
  if (w === "ig" && !mkSoc.ig_id) throw new Error(tr("sv_noig"));
  if (!mkQ) mkQ = [];
  if (w === "yt") {
    if (typeof YT !== "undefined" && !YT && typeof ytLoad === "function") await ytLoad();
    if (!(typeof YT !== "undefined" && YT && YT.connected)) throw new Error(tr("sv_noyt"));
    const r = await sb.from("social_queue").insert(svYtRow(x, "")).select().single();
    if (r.error) throw r.error;
    mkQ.push(r.data); mkQMsg = "";
    await qYtSend(r.data.id);   /* on success the draft is removed and the upload is listed in Results */
    if (qGet(r.data.id)) { try { await sb.from("social_queue").delete().eq("id", r.data.id); } catch (e) {} mkQ = mkQ.filter(y => y.id !== r.data.id); throw new Error(mkQMsg || "YouTube"); }
    await svMark(x, "yt");
    return esc(svT("sv_done", { w: "YouTube" }));
  }
  /* a row in the post list first, so its link is tracked and its results show in Results */
  const r = await sb.from("social_queue").insert(svQRow(x, w, "draft", new Date().toISOString())).select().single();
  if (r.error) throw r.error;
  mkQ.push(r.data); mkQMsg = "";
  await qPostNow(r.data.id);
  const y = qGet(r.data.id), R = (y && y.result) || {}, name = tr("sv_" + w);
  if (y && y.status === "posted" && R[w] && R[w].ok) {
    await svMark(x, w);
    return esc(svT("sv_done", { w: name })) + (R[w].link ? ' · <a href="' + esc(R[w].link) + '" target="_blank" rel="noopener">' + esc(tr("mk_post_view")) + "</a>" : "");
  }
  const m = R[w] && R[w].error ? qErrTxt(R[w].error) : mkQMsg || (R.error || "");
  /* nothing went out: the list row goes again (a "failed" one stays in Today, where it can be retried) */
  if (y && y.status === "draft") { try { await sb.from("social_queue").delete().eq("id", y.id); } catch (e) {} mkQ = mkQ.filter(z => z.id !== y.id); }
  throw new Error(m || "error");
}
const svQRow = (x, w, status, at) => ({ kind: x.kind, status, text: String(w === "ig" ? x.ig_text || x.text : x.text || "").slice(0, 2200), topic: x.title || null,
  image_url: x.image_url || null, video_url: x.video_url || null, fb: w === "fb", ig: w === "ig", post_at: at, result: x.ig_text ? { draft: { ig: x.ig_text } } : null });
const svYtRow = (x, atIst) => {
  const t = String(x.title || "Seb Saathi").replace(/[<>]/g, "").slice(0, 88);
  return { kind: "yt", status: "draft", text: String(x.yt_desc || x.text || "").replace(/[<>]/g, "").slice(0, 2200), topic: (t + " #Shorts").slice(0, 100),
    video_url: x.video_url, fb: false, ig: false, post_at: new Date().toISOString(), result: { ytd: { priv: "public", at: atIst || "", ai: true } } };
};
async function svGo(x, w) {
  if (SV.busy) return;
  const P = x.posted || {};
  if (P[w] && SV.twice !== x.id + w) { SV.twice = x.id + w; SV.msg[x.id] = esc(svT("sv_twice", { w: tr("sv_" + w) })); renderMk(); return; }
  SV.twice = ""; SV.msg[x.id] = "";
  if (w === "wa") return svWaVid(x);
  SV.busy = String(x.id); SV.busyW = w; renderMk();
  try { SV.msg[x.id] = await svSend(x, w); }
  catch (e) { SV.msg[x.id] = '<span class="mkwarn">' + esc(svT("sv_fail", { w: tr("sv_" + w), m: String(e.message || e) })) + "</span>"; }
  mkQMsg = ""; SV.busy = ""; SV.busyW = ""; renderMk();
}
/* 🚀 Post everywhere: every connected place it hasn't gone to yet, one after another; WhatsApp is last and needs one tap */
const svCan = (x, w) => w === "fb" ? !!(mkSoc && mkSoc.ok) : w === "ig" ? !!(mkSoc && mkSoc.ok && mkSoc.ig_id) : w === "yt" ? x.kind === "video" && typeof YT !== "undefined" && !!(YT && YT.connected) : true;
async function svAll(x) {
  if (SV.busy) return;
  const cur = () => (SV.list || []).find(y => y.id === x.id) || x, S = svSched(x);
  const todo = ["fb", "ig", "yt"].filter(w => svPlaces(x).indexOf(w) >= 0 && !(x.posted || {})[w] && !S[w] && svCan(x, w));
  const out = [];
  SV.busy = String(x.id); SV.msg[x.id] = "";
  for (const w of todo) {
    SV.busyW = w; renderMk();
    try { out.push(await svSend(cur(), w)); }
    catch (e) { out.push('<span class="mkwarn">' + esc(svT("sv_fail", { w: tr("sv_" + w), m: String(e.message || e) })) + "</span>"); }
  }
  if (!todo.length) out.push(esc(tr("sv_all_none")));
  if (!(cur().posted || {}).wa) out.push("<b>" + esc(tr("sv_all_wa")) + "</b>");
  SV.msg[x.id] = out.join("<br>");
  mkQMsg = ""; SV.busy = ""; SV.busyW = ""; renderMk();
}

/* ⏰ scheduling: Facebook and Instagram go out by themselves at the time (the posting schedule, every 10 minutes);
   YouTube uploads now and goes public at the time; WhatsApp gets a reminder in Today on that day.
   What is planned is kept on the item as posted._s = { fb: {q: list row id, at}, ig: {...}, wa: {at}, yt: {at} } */
const svSched = x => Object.assign({}, ((x && x.posted) || {})._s || {});
async function svSetSched(x, S) {
  const cur = (SV.list || []).find(y => y.id === x.id) || x;
  const P = Object.assign({}, cur.posted || {}); if (Object.keys(S).length) P._s = S; else delete P._s;
  return svUpd(x.id, { posted: P });
}
/* best time: 7 pm India time, at least an hour from now, on the first evening with no other post planned */
function svBest() {
  const taken = new Set((mkQ || []).filter(q => q.status === "scheduled").map(q => qIstDay(q.post_at)));
  (SV.list || []).forEach(y => Object.values(svSched(y)).forEach(v => { if (v && v.at) taken.add(qIstDay(v.at)); }));
  for (let d = 0; d < 21; d++) {
    const day = new Date(Date.now() + 330 * 60000 + d * 864e5).toISOString().slice(0, 10);
    const at = qUtc(day + "T19:00");
    if (Date.parse(at) < Date.now() + 3600e3 || taken.has(day)) continue;
    return at;
  }
  return qUtc(new Date(Date.now() + 330 * 60000 + 864e5).toISOString().slice(0, 10) + "T19:00");
}
function svSchedHtml(x) {
  const S = svSched(x), P = x.posted || {}, at = SV.schAt || svBest();
  const can = svPlaces(x).filter(w => !S[w]);
  if (!can.length) return '<div class="svsch"><p class="fine">' + esc(tr("sv_sch_none")) + "</p></div>";
  const tick = SV.schW || can.filter(w => !P[w] && svCan(x, w));
  return '<div class="svsch" role="group" aria-label="' + esc(tr("sv_sch")) + '"><p class="fine"><b>' + esc(tr("sv_sch_where")) + "</b></p><div class=\"mklinks\">" +
    can.map(w => '<label class="svtick"><input type="checkbox" data-svsw="' + w + '"' + (tick.indexOf(w) >= 0 ? " checked" : "") + (svCan(x, w) ? "" : " disabled") + "> " + esc(tr("sv_" + w)) + "</label>").join("") + "</div>" +
    '<div class="mklinks"><label class="fine" for="svAt-' + x.id + '">' + esc(tr("sv_sch_when")) + '</label><input class="mkin" type="datetime-local" id="svAt-' + x.id + '" data-svat="1" value="' + qIst(at) + '">' +
    '<button type="button" class="btn-s sm" data-sv="best" data-id="' + x.id + '">' + esc(tr("sv_best")) + "</button></div>" +
    '<p class="fine">' + esc(tr("sv_sch_p")) + "</p>" +
    '<div class="mklinks"><button type="button" class="btn-s add" data-sv="schgo" data-id="' + x.id + '"' + (SV.busy ? " disabled" : "") + ">" + esc(tr("sv_sch_go")) + '</button><button type="button" class="btn-s" data-sv="schx" data-id="' + x.id + '">' + esc(tr("sv_sch_x")) + "</button></div></div>";
}
async function svSchedule(x) {
  if (SV.busy) return;
  const box = document.querySelector('.svitem[data-svid="' + x.id + '"]');
  const W = box ? Array.from(box.querySelectorAll("[data-svsw]")).filter(c => c.checked).map(c => c.dataset.svsw) : [];
  const v = box && box.querySelector("[data-svat]") ? box.querySelector("[data-svat]").value : "";
  const at = v ? qUtc(v) : svBest();
  if (!W.length) { SV.msg[x.id] = '<span class="mkwarn">' + esc(tr("sv_sch_pick")) + "</span>"; renderMk(); return; }
  if (Date.parse(at) < Date.now() + 5 * 60000) { SV.msg[x.id] = '<span class="mkwarn">' + esc(tr("sv_sch_past")) + "</span>"; renderMk(); return; }
  SV.busy = String(x.id); SV.busyW = "sch"; renderMk();
  const S = svSched(x), out = [];
  if (!mkQ) mkQ = [];
  for (const w of W) {
    try {
      if (w === "fb" || w === "ig") {
        if (!svCan(x, w)) throw new Error(tr(w === "ig" ? "sv_noig" : "sv_noconn"));
        const r = await sb.from("social_queue").insert(svQRow(x, w, "scheduled", at)).select().single();
        if (r.error) throw r.error;
        mkQ.push(r.data); S[w] = { q: r.data.id, at };
      } else if (w === "yt") {
        if (!svCan(x, "yt")) throw new Error(tr("sv_noyt"));
        const r = await sb.from("social_queue").insert(svYtRow(x, qIst(at))).select().single();
        if (r.error) throw r.error;
        mkQ.push(r.data); mkQMsg = "";
        await qYtSend(r.data.id);   /* uploaded now, private until the time, then YouTube makes it public */
        if (qGet(r.data.id)) { try { await sb.from("social_queue").delete().eq("id", r.data.id); } catch (e) {} mkQ = mkQ.filter(y => y.id !== r.data.id); throw new Error(mkQMsg || "YouTube"); }
        S.yt = { at };
      } else if (w === "wa") S.wa = { at };
      out.push(esc(svT("sv_sch_ok", { w: tr("sv_" + w), t: qShow(at) })));
    } catch (e) { out.push('<span class="mkwarn">' + esc(svT("sv_fail", { w: tr("sv_" + w), m: String(e.message || e) })) + "</span>"); }
  }
  try { await svSetSched(x, S); } catch (e) { out.push('<span class="mkwarn">' + esc(String(e.message || e)) + "</span>"); }
  SV.sch = ""; SV.schAt = ""; SV.schW = null; SV.msg[x.id] = out.join("<br>");
  mkQMsg = ""; SV.busy = ""; SV.busyW = ""; renderMk();
}
async function svUnsched(x, w) {
  const S = svSched(x), e = S[w]; if (!e) return;
  try {
    if (e.q) { const q = (mkQ || []).find(y => String(y.id) === String(e.q)); if (!q || q.status === "scheduled") { await sb.from("social_queue").delete().eq("id", e.q); if (mkQ) mkQ = mkQ.filter(y => String(y.id) !== String(e.q)); } }
    delete S[w]; await svSetSched(x, S);
    SV.msg[x.id] = esc(svT("sv_sch_off", { w: tr("sv_" + w) })) + (w === "yt" ? " " + esc(tr("sv_sch_off_yt")) : "");
  } catch (er) { SV.msg[x.id] = '<span class="mkwarn">' + esc(String(er.message || er)) + "</span>"; }
  renderMk();
}
/* planned posts that have gone out (the posting schedule did it) are ticked off; a time that has passed for YouTube counts as posted */
let svSyncing = false;
async function svSync() {
  if (svSyncing || !SV.list || !mkQ) return;
  svSyncing = true;
  try {
    for (const x of SV.list.filter(y => !y.binned_at && Object.keys(svSched(y)).length)) {
      const S = svSched(x), P = Object.assign({}, x.posted || {}); let ch = false;
      for (const w of ["fb", "ig"]) {
        const e = S[w]; if (!e || !e.q) continue;
        const q = mkQ.find(y => String(y.id) === String(e.q)), R = (q && q.result) || {};
        if (q && q.status === "posted" && R[w] && R[w].ok) { P[w] = q.updated_at || new Date().toISOString(); delete S[w]; ch = true; }
        else if (!q && Date.parse(e.at) < Date.now() - 2 * 864e5) { delete S[w]; ch = true; }   /* gone from the list long ago */
      }
      if (S.yt && Date.parse(S.yt.at) <= Date.now()) { P.yt = S.yt.at; delete S.yt; ch = true; }
      if (!ch) continue;
      if (Object.keys(S).length) P._s = S; else delete P._s;
      try { await svUpd(x.id, { posted: P }); } catch (e) {}
    }
  } finally { svSyncing = false; }
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
    if (SV.list && mkQ && !svSyncing && SV.list.some(y => !y.binned_at && Object.keys(svSched(y)).length) && Date.now() - (SV.syncAt || 0) > 20000) {
      SV.syncAt = Date.now(); svSync().then(() => setTimeout(renderMk, 0));
    }
    const top = $("mkTop"); if (!top) return;
    if (mkSub === "create") {
      const box = $("svBox"); if (box) box.innerHTML = svHtml();
    } else if (mkSub === "today" && SV.list) {
      const L = svLive(), t = top.querySelector(".mktoday");
      const n = L.filter(x => !svWhere(x).length && !Object.keys(svSched(x)).length).length;
      const endToday = Date.parse(qUtc(new Date(Date.now() + 330 * 60000).toISOString().slice(0, 10) + "T23:59"));
      const wa = L.filter(x => svSched(x).wa && Date.parse(svSched(x).wa.at) <= endToday);
      const planned = L.filter(x => Object.keys(svSched(x)).length).length;
      let add = wa.map(x => '<div class="mklinks svnudge"><b>' + esc(svT("sv_today_wa", { t: x.title || String(x.text || "").slice(0, 40) })) + '</b><button type="button" class="btn-s add" data-mkmake="saved">' + esc(tr("sv_open")) + "</button></div>").join("");
      if (n) add += '<div class="mklinks svnudge"><b>' + esc(svT("sv_today", { n })) + '</b><button type="button" class="btn-s add" data-mkmake="saved">' + esc(tr("sv_open")) + "</button></div>";
      if (planned) add += '<p class="fine svnudge">' + esc(svT("sv_today_sch", { n: planned })) + "</p>";
      if (add && t) t.insertAdjacentHTML("beforeend", add);
    }
  } catch (e) { console.error("saved", e); }
};

/* the plan form keeps what you ticked and the time while the page redraws */
document.addEventListener("change", e => {
  const t = e.target; if (!t || !t.closest) return;
  const it = t.closest(".svitem"); if (!it) return;
  if (t.dataset.svsw) SV.schW = Array.from(it.querySelectorAll("[data-svsw]")).filter(c => c.checked).map(c => c.dataset.svsw);
  if (t.dataset.svat && t.value) SV.schAt = qUtc(t.value);
});
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
  if (a === "all") return svAll(x);
  if (a === "sch") { SV.sch = SV.sch === String(x.id) ? "" : String(x.id); SV.schAt = ""; SV.schW = null; SV.msg[x.id] = ""; renderMk(); return; }
  if (a === "schx") { SV.sch = ""; renderMk(); return; }
  if (a === "best") { SV.schAt = svBest(); renderMk(); return; }
  if (a === "schgo") return svSchedule(x);
  if (a === "unsch") return svUnsched(x, b.dataset.w);
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
