// Seb Saathi — start a Razorpay payment for a plan (Vercel serverless function)
// GET  /api/rzp-order                      → { enabled } (is Razorpay set up?)
// POST /api/rzp-order { plan, period }     → { key_id, order_id, amount, currency }
// Header for POST: Authorization: Bearer <the grower's Supabase access token>
// Prices come from the server (api/_pay.js), never from the browser. Settings: see api/_pay.js.

const { PRICES, env, enabled, send, readJson, signedInUser, rzp } = require("./_pay");

module.exports = async (req, res) => {
  if (req.method === "GET") return send(res, 200, { enabled: enabled() });
  if (req.method !== "POST") return send(res, 405, { error: "method" });
  if (!enabled()) return send(res, 503, { error: "not_setup" });
  let user;
  try { user = await signedInUser(req); } catch (e) { return send(res, 502, { error: "auth_down" }); }
  if (!user) return send(res, 401, { error: "signin" });

  const b = await readJson(req);
  const plan = b.plan === "premium" ? "premium" : b.plan === "basic" ? "basic" : "";
  const period = b.period === "month" ? "month" : b.period === "year" ? "year" : "";
  if (!plan || !period) return send(res, 400, { error: "plan" });
  const amount = PRICES[plan][period] * 100;   /* paise */
  try {
    const o = await rzp("orders", "POST", {
      amount, currency: "INR", receipt: ("ss_" + String(user.id).slice(0, 8) + "_" + Date.now()).slice(0, 40),
      notes: { user_id: user.id, email: String(user.email || "").slice(0, 200), plan, period }
    });
    return send(res, 200, { key_id: env().id, order_id: o.id, amount: o.amount, currency: o.currency, plan, period });
  } catch (e) { console.error("rzp-order", e); return send(res, 502, { error: "razorpay" }); }
};
