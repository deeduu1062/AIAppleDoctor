// Seb Saathi — shared Razorpay helpers (used by rzp-order.js, rzp-verify.js, rzp-webhook.js)
// Files starting with "_" in /api are not web addresses on Vercel; this is only a helper.
//
// Vercel → Settings → Environment Variables:
//   RAZORPAY_KEY_ID            from Razorpay Dashboard → Account & Settings → API keys (starts rzp_live_ or rzp_test_)
//   RAZORPAY_KEY_SECRET        shown once when you make the key
//   SUPABASE_SERVICE_ROLE_KEY  Supabase → Project Settings → API keys → service_role / secret key (server only, never in the website)
//   RAZORPAY_WEBHOOK_SECRET    optional: the secret you type when adding the webhook in Razorpay

const crypto = require("crypto");

const SB_URL = "https://rylqzyylbsephirwslce.supabase.co";
const SB_KEY = "sb_publishable_EYVtP0ljYd-jta5ENmX9Jg_mCtYLzJo"; // public key, same as the website
/* keep in step with PRICES in plans.js */
const PRICES = { basic: { month: 49, year: 299 }, premium: { month: 149, year: 999 } };

const env = () => ({ id: process.env.RAZORPAY_KEY_ID || "", secret: process.env.RAZORPAY_KEY_SECRET || "", svc: process.env.SUPABASE_SERVICE_ROLE_KEY || "" });
const enabled = () => { const e = env(); return !!(e.id && e.secret && e.svc); };

function send(res, code, obj) {
  res.statusCode = code;
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(obj));
}
async function readRaw(req) {
  /* read the stream first: the webhook signature needs the exact bytes Razorpay sent */
  let raw = "";
  try { for await (const c of req) { raw += c; if (raw.length > 200000) break; } } catch (e) {}
  if (raw) return raw;
  if (typeof req.body === "string") return req.body;
  if (Buffer.isBuffer(req.body)) return req.body.toString("utf8");
  if (req.body && typeof req.body === "object") return JSON.stringify(req.body);
  return "";
}
async function readJson(req) {
  if (req.body && typeof req.body === "object" && !Buffer.isBuffer(req.body)) return req.body;
  try { return JSON.parse(await readRaw(req) || "{}"); } catch (e) { return {}; }
}
async function signedInUser(req) {
  const auth = String(req.headers.authorization || "");
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";
  if (!token) return null;
  const u = await fetch(SB_URL + "/auth/v1/user", { headers: { apikey: SB_KEY, Authorization: "Bearer " + token } });
  return u.ok ? await u.json() : null;
}

async function rzp(path, method, body) {
  const e = env();
  const r = await fetch("https://api.razorpay.com/v1/" + path, {
    method: method || "GET",
    headers: { Authorization: "Basic " + Buffer.from(e.id + ":" + e.secret).toString("base64"), "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined
  });
  const j = await r.json().catch(() => ({}));
  if (!r.ok) { const err = new Error((j.error && j.error.description) || ("Razorpay " + r.status)); err.status = r.status; throw err; }
  return j;
}
const hmac = (secret, text) => crypto.createHmac("sha256", secret).update(text).digest("hex");
function sameHex(a, b) {
  a = String(a || ""); b = String(b || "");
  return a.length === b.length && a.length > 0 && crypto.timingSafeEqual(Buffer.from(a), Buffer.from(b));
}

const svcH = extra => Object.assign({ apikey: env().svc, Authorization: "Bearer " + env().svc, "Content-Type": "application/json" }, extra || {});

// Save a captured Razorpay payment as an approved plan. Safe to call twice for the same payment.
// Returns { plan, period, valid_until }.
async function recordPaid(payment, order) {
  const n = order.notes || {};
  const plan = n.plan, period = n.period, uid = n.user_id;
  if (!PRICES[plan] || !PRICES[plan][period] || !uid) throw new Error("order notes");
  if (payment.order_id !== order.id) throw new Error("order mismatch");
  if (payment.status !== "captured") throw new Error("not captured");
  if (+payment.amount !== PRICES[plan][period] * 100 || +order.amount !== +payment.amount) throw new Error("amount");

  /* already saved? */
  const ex = await fetch(SB_URL + "/rest/v1/payments?select=plan,period,valid_until&rzp_payment_id=eq." + encodeURIComponent(payment.id), { headers: svcH() });
  if (!ex.ok) throw new Error("db " + ex.status);
  const rows = await ex.json();
  if (rows.length) return rows[0];

  /* a renewal starts after the plan they already have ends */
  const today = new Date(Date.now() + 330 * 60000).toISOString().slice(0, 10);
  const cur = await fetch(SB_URL + "/rest/v1/payments?select=valid_until&status=eq.approved&user_id=eq." + encodeURIComponent(uid) +
    "&plan=eq." + plan + "&valid_until=gte." + today + "&order=valid_until.desc&limit=1", { headers: svcH() });
  const curRows = cur.ok ? await cur.json() : [];
  const start = curRows.length && curRows[0].valid_until > today ? curRows[0].valid_until : today;
  const d = new Date(start + "T00:00:00Z");
  if (period === "year") d.setUTCFullYear(d.getUTCFullYear() + 1); else d.setUTCMonth(d.getUTCMonth() + 1);
  const valid_until = d.toISOString().slice(0, 10);

  const row = {
    user_id: uid, email: n.email || payment.email || null, plan, period, amount: PRICES[plan][period],
    status: "approved", valid_until, method: "razorpay", rzp_order_id: order.id, rzp_payment_id: payment.id,
    note: ("Razorpay " + (payment.method || "") + (payment.vpa ? " " + payment.vpa : "")).slice(0, 500)
  };
  const ins = await fetch(SB_URL + "/rest/v1/payments?on_conflict=rzp_payment_id", {
    method: "POST", headers: svcH({ Prefer: "resolution=ignore-duplicates,return=minimal" }), body: JSON.stringify(row)
  });
  if (!ins.ok) throw new Error("db " + ins.status + " " + (await ins.text()).slice(0, 200));
  return { plan, period, valid_until };
}

// Get the payment and its order from Razorpay, capturing it if it is only authorised.
async function fetchPaid(paymentId) {
  let p = await rzp("payments/" + encodeURIComponent(paymentId));
  if (p.status === "authorized") {
    try { p = await rzp("payments/" + encodeURIComponent(paymentId) + "/capture", "POST", { amount: p.amount, currency: p.currency || "INR" }); }
    catch (e) { p = await rzp("payments/" + encodeURIComponent(paymentId)); }
  }
  const o = await rzp("orders/" + encodeURIComponent(p.order_id));
  return { payment: p, order: o };
}

module.exports = { PRICES, env, enabled, send, readRaw, readJson, signedInUser, rzp, hmac, sameHex, recordPaid, fetchPaid };
