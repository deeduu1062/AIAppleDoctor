// Seb Saathi — shared Facebook + Instagram posting (used by social-post.js and social-cron.js)
// Files starting with "_" in /api are not web addresses on Vercel; this is only a helper.

const G = "https://graph.facebook.com/v25.0/";
const wait = ms => new Promise(r => setTimeout(r, ms));

async function graph(path, token, params, method) {
  const url = new URL(G + path);
  const opts = { method: method || "GET" };
  if (opts.method === "GET") {
    Object.entries(Object.assign({ access_token: token }, params || {})).forEach(([k, v]) => url.searchParams.set(k, v));
  } else {
    const form = new URLSearchParams(Object.assign({ access_token: token }, params || {}));
    opts.body = form; opts.headers = { "Content-Type": "application/x-www-form-urlencoded" };
  }
  const r = await fetch(url, opts);
  const j = await r.json().catch(() => ({}));
  if (!r.ok || j.error) { const e = new Error((j.error && j.error.message) || ("Meta " + r.status)); e.meta = j.error || null; throw e; }
  return j;
}

async function accounts(token) {
  const page = await graph("me", token, { fields: "id,name,link,instagram_business_account{id,username}" });
  const ig = page.instagram_business_account || null;
  return { page_id: page.id, page_name: page.name, page_link: page.link || ("https://www.facebook.com/" + page.id), ig_id: ig ? ig.id : null, ig_user: ig ? ig.username : null };
}

// follower numbers for the Marketing tab scoreboard; never throws (posting must keep working without them)
async function stats(acc, token) {
  const out = { fb_followers: null, ig_followers: null };
  try { const p = await graph(acc.page_id, token, { fields: "followers_count,fan_count" }); out.fb_followers = p.followers_count != null ? +p.followers_count : p.fan_count != null ? +p.fan_count : null; } catch (e) {}
  if (acc.ig_id) { try { const i = await graph(acc.ig_id, token, { fields: "followers_count" }); out.ig_followers = i.followers_count != null ? +i.followers_count : null; } catch (e) {} }
  return out;
}

// links to the website in a Facebook post are tagged ?src=fb, so the Marketing tab can count who came from Facebook
// (Instagram captions can't hold a working link; the Instagram bio link carries ?src=ig instead)
const tagLinks = (text, src) => text.replace(/(https?:\/\/)?(www\.)?sebsaathi\.com(\/[^\s?#]*)?(\?[^\s#]*)?/gi, (m, pr, w, path, q) =>
  q && /[?&]src=/.test(q) ? m : (pr || "https://") + "sebsaathi.com" + (path || "/") + (q ? q + "&" : "?") + "src=" + src);

// wait for Instagram to finish a video, then publish it; a long video may still be processing after ~45 s
async function igVideo(acc, pt, container) {
  for (let i = 0; i < 15; i++) {
    const st = await graph(container, pt, { fields: "status_code,status" });
    if (st.status_code === "FINISHED") return graph(acc.ig_id + "/media_publish", pt, { creation_id: container }, "POST");
    if (st.status_code === "ERROR" || st.status_code === "EXPIRED") { const e = new Error("Instagram could not use the video: " + (st.status || st.status_code)); e.dead = true; throw e; }
    await wait(3000);
  }
  const e = new Error("ig_processing"); e.container = container; throw e;
}

// post = { text, img, video, fb, ig, ig_container, qid } → { fb: {ok, link, id|error} | null, ig: ... | null }
// qid (the post's number in social_queue) tags its website links ?src=fb-p<qid>, so the Marketing tab can count
// the visitors and sign-ups each post brought
async function publish(acc, pt, post) {
  const text = String(post.text || "").slice(0, 2200).trim();
  const qid = /^\d{1,12}$/.test(String(post.qid || "")) ? String(post.qid) : "";
  const img = /^https:\/\//.test(String(post.img || "")) ? String(post.img) : "";
  const video = /^https:\/\//.test(String(post.video || "")) ? String(post.video) : "";
  const out = { fb: null, ig: null };
  if (post.fb) {
    try {
      const ft = tagLinks(text, qid ? "fb-p" + qid : "fb");
      if (video) {
        const j = await graph(acc.page_id + "/videos", pt, { file_url: video, description: ft }, "POST");
        out.fb = { ok: true, link: "https://www.facebook.com/" + acc.page_id + "/videos/" + j.id, vid: String(j.id) };
      } else if (img) {
        const j = await graph(acc.page_id + "/photos", pt, { url: img, caption: ft }, "POST");
        out.fb = { ok: true, link: "https://www.facebook.com/" + (j.post_id || (acc.page_id + "_" + j.id)), id: String(j.post_id || (acc.page_id + "_" + j.id)) };
      } else {
        const j = await graph(acc.page_id + "/feed", pt, { message: ft }, "POST");
        out.fb = { ok: true, link: "https://www.facebook.com/" + j.id, id: String(j.id) };
      }
    } catch (e) { out.fb = { ok: false, error: String(e.message || e).slice(0, 300) }; }
  }
  if (post.ig) {
    if (!acc.ig_id) out.ig = { ok: false, error: "no_ig" };
    else if (video) {
      try {
        const cid = post.ig_container || (await graph(acc.ig_id + "/media", pt, { media_type: "REELS", video_url: video, caption: text, share_to_feed: "true" }, "POST")).id;
        const pub = await igVideo(acc, pt, cid);
        let link = "https://www.instagram.com/" + (acc.ig_user || "");
        try { const m = await graph(pub.id, pt, { fields: "permalink" }); if (m.permalink) link = m.permalink; } catch (e) {}
        out.ig = { ok: true, link, id: String(pub.id) };
      } catch (e) { out.ig = { ok: false, error: String(e.message || e).slice(0, 300) }; if (e.container) out.ig.container = e.container; }
    }
    else if (!img) out.ig = { ok: false, error: "need_photo" };
    else {
      try {
        const c = await graph(acc.ig_id + "/media", pt, { image_url: img, caption: text }, "POST");
        let pub = null, last = null;
        for (let i = 0; i < 6 && !pub; i++) {   /* the photo may need a moment before it can be published */
          try { pub = await graph(acc.ig_id + "/media_publish", pt, { creation_id: c.id }, "POST"); }
          catch (e) { last = e; await wait(1500); }
        }
        if (!pub) throw last || new Error("not ready");
        let link = "https://www.instagram.com/" + (acc.ig_user || "");
        try { const m = await graph(pub.id, pt, { fields: "permalink" }); if (m.permalink) link = m.permalink; } catch (e) {}
        out.ig = { ok: true, link, id: String(pub.id) };
      } catch (e) { out.ig = { ok: false, error: String(e.message || e).slice(0, 300) }; }
    }
  }
  return out;
}

// how each post did: { fb: {reach, likes, comments, shares, clicks}, ig: {reach, likes, comments, saves, shares} }
// items = [{ q, fb: {id|vid|link}, ig: {id} }]; every number is optional (Meta gives some only with insights
// permissions), and a failure for one post never stops the rest
const num = v => v == null || isNaN(+v) ? null : +v;
async function insight(id, pt, metrics) {
  const out = {};
  for (const m of metrics) {
    try {
      const j = await graph(id + "/insights", pt, { metric: m[0] });
      const v = j.data && j.data[0] && j.data[0].values && j.data[0].values[0] ? j.data[0].values[0].value : null;
      if (num(v) != null && out[m[1]] == null) out[m[1]] = num(v);
    } catch (e) {}
  }
  return out;
}
async function fbMetrics(f, pt) {
  let id = f.id || "";
  if (!id && f.vid) { try { id = (await graph(f.vid, pt, { fields: "post_id" })).post_id || ""; } catch (e) {} }
  if (!id && f.link) { const m = /facebook\.com\/(\d+_\d+)/.exec(f.link); if (m) id = m[1]; }
  if (!id) return null;
  const o = {};
  try {
    const p = await graph(id, pt, { fields: "reactions.summary(total_count).limit(0),comments.summary(total_count).limit(0),shares" });
    o.likes = num(p.reactions && p.reactions.summary && p.reactions.summary.total_count);
    o.comments = num(p.comments && p.comments.summary && p.comments.summary.total_count);
    o.shares = p.shares ? num(p.shares.count) : 0;
  } catch (e) {}
  Object.assign(o, await insight(id, pt, [["post_impressions_unique", "reach"], ["post_total_media_view_unique", "reach"], ["post_clicks", "clicks"]]));
  return o;
}
async function igMetrics(g, pt) {
  if (!g.id) return null;
  const o = {};
  try { const m = await graph(g.id, pt, { fields: "like_count,comments_count" }); o.likes = num(m.like_count); o.comments = num(m.comments_count); } catch (e) {}
  Object.assign(o, await insight(g.id, pt, [["reach", "reach"], ["saved", "saves"], ["shares", "shares"]]));
  return o;
}
async function metrics(items, pt) {
  const out = {};
  await Promise.all(items.slice(0, 20).map(async x => {
    const r = {};
    if (x.fb) r.fb = await fbMetrics(x.fb, pt);
    if (x.ig) r.ig = await igMetrics(x.ig, pt);
    out[x.q] = r;
  }));
  return out;
}

module.exports = { graph, accounts, publish, stats, tagLinks, metrics };
