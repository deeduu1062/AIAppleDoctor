// Seb Saathi — post to your Facebook Page and Instagram from the admin page (Vercel serverless function)
// GET  /api/social-post   → which accounts are connected (names), for the admin page
// POST /api/social-post   { text, image_url, video_url, fb: true|false, ig: true|false } → the new posts' links
// GET also gives follower numbers (fb_followers, ig_followers) for the Marketing tab scoreboard
// POST /api/social-post   { metrics: [{ q, fb: {id|vid|link}, ig: {id} }] } → { metrics: { q: { fb: {...}, ig: {...} } } }
//                         how each post did (reach, likes, comments, shares), for the Marketing tab
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
const { accounts, publish, stats, metrics } = require("./_social");

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
  if (req.method === "GET") return send(res, 200, Object.assign({ setup: true, ok: true }, acc, await stats(acc, pt)));

  const b = await readBody(req);
  if (Array.isArray(b.metrics)) {
    const items = b.metrics.filter(x => x && /^\d{1,12}$/.test(String(x.q))).map(x => ({ q: String(x.q),
      fb: x.fb && (x.fb.id || x.fb.vid || x.fb.link) ? { id: String(x.fb.id || "").slice(0, 80), vid: String(x.fb.vid || "").slice(0, 40), link: String(x.fb.link || "").slice(0, 300) } : null,
      ig: x.ig && x.ig.id ? { id: String(x.ig.id).slice(0, 40) } : null }));
    return send(res, 200, { metrics: await metrics(items, pt) });
  }
  const text = String(b.text || "").slice(0, 2200).trim();
  const img = /^https:\/\//.test(String(b.image_url || "")) ? String(b.image_url) : "";
  const video = /^https:\/\//.test(String(b.video_url || "")) ? String(b.video_url) : "";
  const wantFb = b.fb !== false, wantIg = !!b.ig;
  if (!text && !img && !video) return send(res, 400, { error: "empty" });
  const out = await publish(acc, pt, { text, img, video, fb: wantFb, ig: wantIg, qid: b.qid });
  return send(res, 200, Object.assign({ setup: true, ok: true }, acc, { result: out }));
};
