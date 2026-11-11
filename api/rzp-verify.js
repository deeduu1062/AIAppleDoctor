// Seb Saathi — confirm a Razorpay payment straight after the grower pays (Vercel serverless function)
// POST /api/rzp-verify { razorpay_order_id, razorpay_payment_id, razorpay_signature }
// Header: Authorization: Bearer <the grower's Supabase access token>
// Checks Razorpay's signature, makes sure the money was received, then switches the plan on.
// (api/rzp-webhook.js does the same if the grower closes the page before this runs.)

const { env, enabled, send, readJson, signedInUser, hmac, sameHex, recordPaid, fetchPaid } = require("./_pay");

module.exports = async (req, res) => {
  if (req.method !== "POST") return send(res, 405, { error: "method" });
  if (!enabled()) return send(res, 503, { error: "not_setup" });
  let user;
  try { user = await signedInUser(req); } catch (e) { return send(res, 502, { error: "auth_down" }); }
  if (!user) return send(res, 401, { error: "signin" });

  const b = await readJson(req);
  const oid = String(b.razorpay_order_id || ""), pid = String(b.razorpay_payment_id || ""), sig = String(b.razorpay_signature || "");
  if (!/^order_\w+$/.test(oid) || !/^pay_\w+$/.test(pid)) return send(res, 400, { error: "ids" });
  if (!sameHex(hmac(env().secret, oid + "|" + pid), sig)) return send(res, 400, { error: "signature" });

  try {
    const { payment, order } = await fetchPaid(pid);
    if (order.id !== oid) return send(res, 400, { error: "order" });
    if (!order.notes || order.notes.user_id !== user.id) return send(res, 403, { error: "not_yours" });
    if (payment.status !== "captured") return send(res, 202, { error: "pending" });
    const r = await recordPaid(payment, order);
    return send(res, 200, { ok: true, plan: r.plan, period: r.period, valid_until: r.valid_until });
  } catch (e) { console.error("rzp-verify", e); return send(res, 502, { error: "save" }); }
};
