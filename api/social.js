// Seb Saathi — one serverless function for Facebook/Instagram posting (Vercel's Hobby plan allows at most 12 functions)
//   /api/social?fn=post   (also /api/social-post)   admin page: connected accounts, followers, Post now   → _social-post.js
//   /api/social?fn=draft  (also /api/social-draft)  admin page: AI drafts, WhatsApp tip, video ideas       → _social-draft.js
//   /api/social?fn=cron   (also /api/social-cron)   Supabase timer: posts what is due                      → _social-cron.js
// The old addresses still work through vercel.json rewrites (Supabase's timer calls /api/social-cron).
const H = { post: require("./_social-post"), draft: require("./_social-draft"), cron: require("./_social-cron") };
module.exports = (req, res) => {
  const u = new URL(req.url || "/", "https://x");
  const fn = u.searchParams.get("fn") || ((/\/api\/social-(post|draft|cron)\b/.exec(u.pathname) || [])[1]) || (req.query && req.query.fn);
  const h = H[fn];
  if (!h) { res.statusCode = 404; res.setHeader("Content-Type", "application/json"); return res.end('{"error":"not_found"}'); }
  return h(req, res);
};
