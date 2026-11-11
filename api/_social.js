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

// post = { text, img, fb, ig } → { fb: {ok, link|error} | null, ig: ... | null }
async function publish(acc, pt, post) {
  const text = String(post.text || "").slice(0, 2200).trim();
  const img = /^https:\/\//.test(String(post.img || "")) ? String(post.img) : "";
  const out = { fb: null, ig: null };
  if (post.fb) {
    try {
      if (img) {
        const j = await graph(acc.page_id + "/photos", pt, { url: img, caption: text }, "POST");
        out.fb = { ok: true, link: "https://www.facebook.com/" + (j.post_id || (acc.page_id + "_" + j.id)) };
      } else {
        const j = await graph(acc.page_id + "/feed", pt, { message: text }, "POST");
        out.fb = { ok: true, link: "https://www.facebook.com/" + j.id };
      }
    } catch (e) { out.fb = { ok: false, error: String(e.message || e).slice(0, 300) }; }
  }
  if (post.ig) {
    if (!acc.ig_id) out.ig = { ok: false, error: "no_ig" };
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
        out.ig = { ok: true, link };
      } catch (e) { out.ig = { ok: false, error: String(e.message || e).slice(0, 300) }; }
    }
  }
  return out;
}

module.exports = { graph, accounts, publish };
