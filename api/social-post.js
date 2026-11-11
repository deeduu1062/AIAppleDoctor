// Seb Saathi — post to your Facebook Page and Instagram from the admin page (Vercel serverless function)
// GET  /api/social-post   → which accounts are connected (names), for the admin page
// POST /api/social-post   { text, image_url, fb: true|false, ig: true|false } → the new posts' links
// Header on both: Authorization: Bearer <Supabase access token of an admin>
//
// Needs ONE setting in Vercel → Settings → Environment Variables:
//   META_PAGE_TOKEN   a Page access token for the Seb Saathi Facebook Page (the never-expiring kind,
//                     from a long-lived user token → /me/accounts), with pages_manage_posts,
//                     pages_read_engagement, pages_show_list, instagram_basic, instagram_content_publish
// The Page id and the linked Instagram account are found from the token itself.
// Instagram needs a photo (JPEG at a public link); Facebook can take text only.

const SB_URL = "https://rylqzyylbsephirwslce.supabase.co";
const SB_KEY = "sb_publishable_EYVtP0ljYd-jta5ENmX9Jg_mCtYLzJo"; // public key, same as the website
const ADMIN_EMAILS = ["deeduu@gmail.com", "admin@sebsaathi.com"];
const G = "https://graph.facebook.com/v25.0/";

function send(res, code, obj) {
  res.statusCode = code;
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(obj));
}
async function readBody(req) {
  if (req.body && typeof req.body === "object") return req.body;
  if (typeof req.body === "string") { try { return JSON.parse(req.body); } catch (e) { return {}; } }
  let raw = "";
  for await (const c of req) { raw += c; if (raw.length > 20000) break; }
  try { return JSON.parse(raw || "{}"); } catch (e) { return {}; }
}
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
const wait = ms => new Promise(r => setTimeout(r, ms));

module.exports = async (req, res) => {
  if (req.method !== "GET" && req.method !== "POST") return send(res, 405, { error: "method" });
  const auth = String(req.headers.authorization || "");
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";
  if (!token) return send(res, 401, { error: "signin" });
  try {
    const u = await fetch(SB_URL + "/auth/v1/user", { headers: { apikey: SB_KEY, Authorization: "Bearer " + token } });
    if (!u.ok) return send(res, 401, { error: "signin" });
    const user = await u.json();
    if (!ADMIN_EMAILS.includes(String(user.email || "").toLowerCase())) return send(res, 403, { error: "admin" });
  } catch (e) { return send(res, 502, { error: "auth_down" }); }

  const pt = process.env.META_PAGE_TOKEN;
  if (!pt) return send(res, 200, { setup: false });
  let acc;
  try { acc = await accounts(pt); }
  catch (e) { return send(res, 200, { setup: true, ok: false, error: String(e.message || e).slice(0, 300) }); }
  if (req.method === "GET") return send(res, 200, Object.assign({ setup: true, ok: true }, acc));

  const b = await readBody(req);
  const text = String(b.text || "").slice(0, 2200).trim();
  const img = /^https:\/\//.test(String(b.image_url || "")) ? String(b.image_url) : "";
  const wantFb = b.fb !== false, wantIg = !!b.ig;
  if (!text && !img) return send(res, 400, { error: "empty" });
  const out = { fb: null, ig: null };

  if (wantFb) {
    try {
      if (img) {
        const j = await graph(acc.page_id + "/photos", pt, { url: img, caption: text }, "POST");
        const pid = j.post_id || (acc.page_id + "_" + j.id);
        out.fb = { ok: true, link: "https://www.facebook.com/" + pid };
      } else {
        const j = await graph(acc.page_id + "/feed", pt, { message: text }, "POST");
        out.fb = { ok: true, link: "https://www.facebook.com/" + j.id };
      }
    } catch (e) { out.fb = { ok: false, error: String(e.message || e).slice(0, 300) }; }
  }
  if (wantIg) {
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
  return send(res, 200, Object.assign({ setup: true, ok: true }, acc, { result: out }));
};
