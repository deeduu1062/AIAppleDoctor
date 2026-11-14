// Seb Saathi — one serverless function for Razorpay (Vercel's Hobby plan allows at most 12 functions)
//   /api/rzp?fn=order    (also /api/rzp-order)    → _rzp-order.js
//   /api/rzp?fn=verify   (also /api/rzp-verify)   → _rzp-verify.js
//   /api/rzp?fn=webhook  (also /api/rzp-webhook)  → _rzp-webhook.js  (the address set in the Razorpay dashboard)
// The old addresses still work through vercel.json rewrites.
const H = { order: require("./_rzp-order"), verify: require("./_rzp-verify"), webhook: require("./_rzp-webhook") };
module.exports = (req, res) => {
  const u = new URL(req.url || "/", "https://x");
  const fn = u.searchParams.get("fn") || ((/\/api\/rzp-(order|verify|webhook)\b/.exec(u.pathname) || [])[1]) || (req.query && req.query.fn);
  const h = H[fn];
  if (!h) { res.statusCode = 404; res.setHeader("Content-Type", "application/json"); return res.end('{"error":"not_found"}'); }
  return h(req, res);
};
