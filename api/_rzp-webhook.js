// Seb Saathi — Razorpay tells us about a payment (Vercel serverless function)
// Add in Razorpay Dashboard → Account & Settings → Webhooks:
//   URL     https://sebsaathi.vercel.app/api/rzp-webhook
//   Secret  any long password; put the same in Vercel as RAZORPAY_WEBHOOK_SECRET
//   Events  payment.captured
// This switches the plan on even if the grower closed the page right after paying.

const { env, enabled, send, readRaw, hmac, sameHex, recordPaid, fetchPaid } = require("./_pay");

module.exports = async (req, res) => {
  if (req.method !== "POST") return send(res, 405, { error: "method" });
  const ws = process.env.RAZORPAY_WEBHOOK_SECRET || "";
  if (!enabled() || !ws) return send(res, 503, { error: "not_setup" });
  const raw = await readRaw(req);
  if (!sameHex(hmac(ws, raw), req.headers["x-razorpay-signature"])) return send(res, 400, { error: "signature" });
  let ev = {};
  try { ev = JSON.parse(raw); } catch (e) { return send(res, 400, { error: "json" }); }
  const p = ev.payload && ev.payload.payment && ev.payload.payment.entity;
  if (ev.event !== "payment.captured" || !p || !p.id) return send(res, 200, { ignored: ev.event || "?" });
  try {
    const { payment, order } = await fetchPaid(p.id);   /* read it back from Razorpay rather than trusting the message */
    if (!order.notes || !order.notes.plan) return send(res, 200, { ignored: "not a plan payment" });
    const r = await recordPaid(payment, order);
    return send(res, 200, { ok: true, valid_until: r.valid_until });
  } catch (e) { console.error("rzp-webhook", e); return send(res, 500, { error: "save" }); }   /* 500 → Razorpay retries */
};
