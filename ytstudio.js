/* Seb Saathi admin — YouTube Studio panel (Social handler → YouTube & videos).
   Connect the channel, see its numbers and latest videos, and jump straight into the right YouTube Studio page
   (YouTube does not let Studio open inside another site, so each button opens Studio in a new tab, or the Studio app on a phone).
   Uses /api/youtube (action "studio") with the same Google connection as the Video Studio upload. */
Object.assign(T.en, {
  ys_h: "YouTube Studio", ys_p: "Your channel at a glance. Each button opens that page of YouTube Studio (on a phone, the YT Studio app if you have it).",
  ys_none: "Your YouTube channel is not connected yet. Connect it once — you pick the Seb Saathi channel on Google's page — then manage it from here.",
  ys_connect: "▶ Connect YouTube channel", ys_wait: "Opening Google…", ys_setup: "YouTube connection is not set up yet. Follow the steps in the YouTube box of the Video Studio above (Google keys in Vercel), then connect here.",
  ys_reconnect: "Google asked to connect again (the access was removed or expired).", ys_refresh: "Refresh", ys_switch: "Change channel", ys_disc: "Disconnect", ys_disc_q: "Disconnect the YouTube channel from Seb Saathi? You can connect it again any time.",
  ys_loading: "Loading your channel…", ys_subs: "Subscribers", ys_views: "Total views", ys_vids: "Videos",
  ys_go_dash: "Dashboard", ys_go_upload: "⬆ Upload", ys_go_content: "Content", ys_go_an: "Analytics", ys_go_cm: "Comments", ys_go_cust: "Customise channel", ys_go_earn: "Earn", ys_go_watch: "View channel",
  ys_latest: "Latest videos", ys_novid: "No videos yet. Make one in the Video Studio above, or upload in YouTube Studio.",
  ys_edit: "Edit in Studio", ys_an: "Analytics", ys_watch: "Watch", ys_v: "{v} views · {l} likes · {c} comments",
  ys_pub: "Public", ys_unl: "Unlisted", ys_priv: "Private", ys_proc: "Processing", ys_err: "Could not load YouTube: {m}"
});
Object.assign(T.hi, {
  ys_h: "YouTube Studio", ys_p: "आपका चैनल एक नज़र में। हर बटन YouTube Studio का वह पेज खोलता है (फ़ोन पर YT Studio ऐप, अगर है)।",
  ys_none: "आपका YouTube चैनल अभी जुड़ा नहीं है। एक बार जोड़ें — Google के पेज पर सेब साथी चैनल चुनें — फिर यहीं से संभालें।",
  ys_connect: "▶ YouTube चैनल जोड़ें", ys_wait: "Google खुल रहा है…", ys_setup: "YouTube जोड़ना अभी सेट नहीं है। ऊपर Video Studio के YouTube बॉक्स के क़दम पूरे करें, फिर यहाँ जोड़ें।",
  ys_reconnect: "Google फिर से जोड़ने को कह रहा है।", ys_refresh: "रीफ़्रेश", ys_switch: "चैनल बदलें", ys_disc: "हटाएँ", ys_disc_q: "YouTube चैनल को सेब साथी से हटाएँ? आप कभी भी फिर जोड़ सकते हैं।",
  ys_loading: "चैनल लोड हो रहा है…", ys_subs: "सब्सक्राइबर", ys_views: "कुल व्यू", ys_vids: "वीडियो",
  ys_go_dash: "डैशबोर्ड", ys_go_upload: "⬆ अपलोड", ys_go_content: "कंटेंट", ys_go_an: "एनालिटिक्स", ys_go_cm: "कमेंट", ys_go_cust: "चैनल सजाएँ", ys_go_earn: "कमाई", ys_go_watch: "चैनल देखें",
  ys_latest: "ताज़ा वीडियो", ys_novid: "अभी कोई वीडियो नहीं। ऊपर Video Studio में बनाएँ, या YouTube Studio में अपलोड करें।",
  ys_edit: "Studio में बदलें", ys_an: "एनालिटिक्स", ys_watch: "देखें", ys_v: "{v} व्यू · {l} लाइक · {c} कमेंट",
  ys_pub: "सार्वजनिक", ys_unl: "बिना सूची", ys_priv: "निजी", ys_proc: "तैयार हो रहा", ys_err: "YouTube लोड नहीं हुआ: {m}"
});

let YS = null, ysBusy = false, ysWait = false;
const YS_STUDIO = "https://studio.youtube.com";
async function ysLoad() {
  if (ysBusy || typeof ytCall !== "function") return;
  ysBusy = true; ysRender();
  try { YS = await ytCall("studio"); } catch (e) { YS = { setup: true, error: String(e.message || e) }; }
  ysBusy = false; ysRender();
}
function ysRender() { if (typeof renderMk === "function" && typeof mkSub !== "undefined" && mkSub === "yt") renderMk(); }
const ysN = n => n == null ? "–" : n >= 1e6 ? (n / 1e6).toFixed(1).replace(/\.0$/, "") + "M" : n >= 1e4 ? (n / 1e3).toFixed(1).replace(/\.0$/, "") + "K" : fmtN(n);
const ysA = (href, label, cls) => '<a class="btn-s' + (cls ? " " + cls : "") + '" href="' + esc(href) + '" target="_blank" rel="noopener">' + esc(label) + "</a>";

/* drawn by marketing.js at the top of the YouTube & videos tab */
function ysHtml() {
  if (!YS && !ysBusy) setTimeout(ysLoad, 0);
  let h = '<section class="ysbox" aria-labelledby="ysH"><div class="ystop"><h5 id="ysH">▶ ' + esc(tr("ys_h")) + "</h5>" +
    '<button type="button" class="btn-s sm" data-ys="refresh"' + (ysBusy ? " disabled" : "") + ">" + esc(tr("ys_refresh")) + "</button></div>";
  if (!YS) return h + '<p class="fine">' + esc(tr("ys_loading")) + "</p></section>";
  if (!YS.setup) return h + '<p class="fine">' + esc(tr("ys_setup")) + "</p>" + (YS.missing && YS.missing.length ? '<p class="fine"><code>' + esc(YS.missing.join(", ")) + "</code></p>" : "") +
    "<p>" + ysA(YS_STUDIO, tr("ys_go_dash")) + "</p></section>";
  if (!YS.connected || YS.error === "reconnect") {
    return h + '<p class="fine">' + esc(YS.error === "reconnect" ? tr("ys_reconnect") : tr("ys_none")) + "</p>" +
      '<p><button type="button" class="btn-s add" data-ys="connect"' + (ysWait ? " disabled" : "") + ">" + esc(ysWait ? tr("ys_wait") : tr("ys_connect")) + "</button></p></section>";
  }
  const ch = YS.channel || {}, C = encodeURIComponent(ch.id || ""), base = YS_STUDIO + "/channel/" + C;
  h += '<p class="fine">' + esc(tr("ys_p")) + "</p>" +
    '<div class="yschan">' + (YS.thumb ? '<img src="' + esc(YS.thumb) + '" alt="" width="48" height="48">' : "") + "<div><b>" + esc(ch.title || "") + "</b>" + (ch.handle ? '<br><span class="fine">' + esc(ch.handle) + "</span>" : "") + "</div></div>" +
    (YS.error ? '<p class="autherr">' + esc(tr("ys_err").replace("{m}", YS.error)) + "</p>" : "") +
    '<div class="ystats"><div><span>' + esc(tr("ys_subs")) + "</span><b>" + ysN(YS.subscribers) + "</b></div><div><span>" + esc(tr("ys_views")) + "</span><b>" + ysN(YS.views) + "</b></div><div><span>" + esc(tr("ys_vids")) + "</span><b>" + ysN(YS.count) + "</b></div></div>" +
    '<div class="ysgo">' + ysA(base, tr("ys_go_dash"), "add") + ysA(base + "/videos/upload?d=ud", tr("ys_go_upload"), "add") + ysA(base + "/videos/upload", tr("ys_go_content")) +
      ysA(base + "/analytics/tab-overview/period-default", tr("ys_go_an")) + ysA(base + "/comments/inbox", tr("ys_go_cm")) + ysA(base + "/editing/profile", tr("ys_go_cust")) +
      ysA(base + "/monetization/overview", tr("ys_go_earn")) + (ch.url ? ysA(ch.url, tr("ys_go_watch")) : "") + "</div>";
  const V = YS.videos || [];
  h += '<h5 class="ovsub">' + esc(tr("ys_latest")) + "</h5>" + (!V.length ? '<p class="fine">' + esc(tr("ys_novid")) + "</p>" :
    '<div class="ysvids">' + V.map(v => {
      const pv = v.upload === "uploaded" ? tr("ys_proc") : "";
      const pr = v.privacy === "public" ? tr("ys_pub") : v.privacy === "unlisted" ? tr("ys_unl") : v.privacy === "private" ? tr("ys_priv") : v.privacy;
      return '<article class="ysvid">' + (v.thumb ? '<img src="' + esc(v.thumb) + '" alt="" loading="lazy">' : '<div class="ysnoth"></div>') + "<div>" +
        '<b class="ysvt">' + esc(v.title) + "</b>" +
        '<span class="fine">' + (v.published ? esc(adWhen(v.published)) + " · " : "") + '<span class="optag' + (v.privacy === "public" ? " ok" : "") + '">' + esc(pr || "") + "</span>" + (pv ? ' <span class="optag">' + esc(pv) + "</span>" : "") + "</span>" +
        '<span class="fine">' + esc(tr("ys_v").replace("{v}", ysN(v.views)).replace("{l}", ysN(v.likes)).replace("{c}", ysN(v.comments))) + "</span>" +
        '<span class="ysvb">' + ysA(YS_STUDIO + "/video/" + encodeURIComponent(v.id) + "/edit", tr("ys_edit"), "sm") + ysA(YS_STUDIO + "/video/" + encodeURIComponent(v.id) + "/analytics/tab-overview/period-default", tr("ys_an"), "sm") +
          ysA("https://youtu.be/" + encodeURIComponent(v.id), tr("ys_watch"), "sm") + "</span></div></article>";
    }).join("") + "</div>");
  h += '<p class="ysfoot"><button type="button" class="btn-s sm" data-ys="connect">' + esc(tr("ys_switch")) + '</button> <button type="button" class="btn-s sm" data-ys="disconnect">' + esc(tr("ys_disc")) + "</button></p>";
  return h + "</section>";
}
document.addEventListener("click", e => {
  const b = e.target.closest && e.target.closest("[data-ys]"); if (!b || typeof ytCall !== "function") return;
  const a = b.dataset.ys;
  if (a === "refresh") { YS = null; ysLoad(); if (typeof ytLoad === "function") ytLoad(); }
  else if (a === "connect") {
    ysWait = true; ysRender();
    ytCall("connect").then(j => { if (j.url) location.href = j.url; else { ysWait = false; YS = j.setup === false ? j : YS; ysRender(); } }, err => { ysWait = false; YS = { setup: true, error: String(err.message || err) }; ysRender(); });
  } else if (a === "disconnect") {
    if (!confirm(tr("ys_disc_q"))) return;
    ytCall("disconnect").then(() => { YS = null; ysLoad(); if (typeof ytLoad === "function") ytLoad(); }, err => { YS = Object.assign({}, YS, { error: String(err.message || err) }); ysRender(); });
  }
});
