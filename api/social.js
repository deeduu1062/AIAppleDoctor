// Seb Saathi — one serverless function for Facebook/Instagram posting (Vercel's Hobby plan allows at most 12 functions)
//   /api/social?fn=post   (also /api/social-post)   admin page: connected accounts, followers, Post now   → _social-post.js
//   /api/social?fn=draft  (also /api/social-draft)  admin page: AI drafts, WhatsApp tip, video ideas       → _social-draft.js
//   /api/social?fn=cron   (also /api/social-cron)   Supabase timer: posts what is due                      → _social-cron.js
// The old addresses still work through vercel.json rewrites (Supabase's timer calls /api/social-cron).
//   /api/social?fn=geo                              website: rough place of a visitor (country, state, city)   (inline below)
//   /api/social?fn=meta   (also /api/meta)          admin page: "Connect with Facebook" and Facebook's way back   → _meta.js
//   /api/social?fn=tts                              admin page: voice-over for the one-tap video               → _tts.js
//   /api/social?fn=brief                            morning brief email (Supabase timer) / "Email me this now"  → _brief.js
/* /api/social?fn=geo: the visitor's rough place (country, state, city) from Vercel's location headers, for the visit count */
function geo(req, res) {
  const h = k => { try { return decodeURIComponent(String(req.headers[k] || "")); } catch (e) { return ""; } };
  res.statusCode = 200; res.setHeader("Content-Type", "application/json"); res.setHeader("Cache-Control", "private, no-store");
  res.end(JSON.stringify({ country: h("x-vercel-ip-country").slice(0, 2).toUpperCase(), region: h("x-vercel-ip-country-region").slice(0, 10).toUpperCase(), city: h("x-vercel-ip-city").slice(0, 80) }));
}
const H = { geo, meta: require("./_meta"), post: require("./_social-post"), draft: require("./_social-draft"), cron: require("./_social-cron"), tts: require("./_tts"), brief: require("./_brief") };
module.exports = (req, res) => {
  const u = new URL(req.url || "/", "https://x");
  const fn = u.searchParams.get("fn") || ((/\/api\/social-(post|draft|cron)\b/.exec(u.pathname) || [])[1]) || (req.query && req.query.fn);
  const h = H[fn];
  if (!h) { res.statusCode = 404; res.setHeader("Content-Type", "application/json"); return res.end('{"error":"not_found"}'); }
  return h(req, res);
};
