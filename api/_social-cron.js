// Seb Saathi — posts scheduled Facebook + Instagram posts when they are due (Vercel serverless function)
// POST /api/social-cron   Header: x-cron-key: <the private key from supabase/social_queue.sql>
//
// Called every 10 minutes by Supabase (pg_cron, set up by supabase/social_queue.sql).
// It posts at most ONE due post per call, so a long Instagram upload never runs out of time.
// The key is checked by the database itself (social_due / social_done), so Vercel needs no new setting;
// it uses the same META_PAGE_TOKEN as the Post now box.

const SB_URL = "https://rylqzyylbsephirwslce.supabase.co";
const SB_KEY = "sb_publishable_EYVtP0ljYd-jta5ENmX9Jg_mCtYLzJo"; // public key, same as the website
const { accounts, publish } = require("./_social");

function send(res, code, obj) {
  res.statusCode = code;
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(obj));
}
async function rpc(name, args) {
  const r = await fetch(SB_URL + "/rest/v1/rpc/" + name, {
    method: "POST",
    headers: { apikey: SB_KEY, Authorization: "Bearer " + SB_KEY, "Content-Type": "application/json" },
    body: JSON.stringify(args)
  });
  const t = await r.text();
  if (!r.ok) { const e = new Error("db " + r.status + " " + t.slice(0, 200)); e.status = r.status; throw e; }
  try { return JSON.parse(t); } catch (e) { return null; }
}

module.exports = async (req, res) => {
  if (req.method !== "POST" && req.method !== "GET") return send(res, 405, { error: "method" });
  const k = String(req.headers["x-cron-key"] || "");
  if (k.length < 32) return send(res, 401, { error: "key" });

  const pt = process.env.META_PAGE_TOKEN;
  if (!pt) return send(res, 200, { idle: true, why: "no META_PAGE_TOKEN yet" });   /* leave posts waiting */

  let acc;
  try { acc = await accounts(pt); }
  catch (e) { return send(res, 200, { idle: true, why: "meta: " + String(e.message || e).slice(0, 200) }); }

  let post;
  try { post = await rpc("social_due", { k }); }
  catch (e) { return send(res, e.status === 400 ? 401 : 502, { error: "db" }); }
  if (!post || !post.id) return send(res, 200, { idle: true });

  /* a retry only posts where it failed before; an Instagram video still processing last time carries on with the same upload */
  const prev = post.prev || {}, done = x => !!(x && x.ok);
  const out = await publish(acc, pt, { text: post.text, img: post.image_url, video: post.video_url,
    fb: !!post.fb && !done(prev.fb), ig: !!post.ig && !done(prev.ig), ig_container: prev.ig && prev.ig.container, qid: post.id });
  if (done(prev.fb) && !out.fb) out.fb = prev.fb;
  if (done(prev.ig) && !out.ig) out.ig = prev.ig;
  /* posted if at least one went out (a retry would post it twice there); the admin page shows any part that failed */
  const ok = !!((out.fb && out.fb.ok) || (out.ig && out.ig.ok));
  try { await rpc("social_done", { k, post_id: post.id, ok, res: out }); }
  catch (e) { console.error("social_done", e); }
  return send(res, 200, { posted: post.id, ok, result: out });
};
