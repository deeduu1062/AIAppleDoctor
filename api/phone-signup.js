// Seb Saathi — make an account from a mobile number + 6-digit PIN (Vercel serverless function)
// POST /api/phone-signup { phone: "+91XXXXXXXXXX", pin: "123456", lang, data: { ref } }
// No SMS: the number is not checked by a code. The account is stored as 91XXXXXXXXXX@m.sebsaathi.com
// (already confirmed) with password "sspin-<PIN>-Ss" and its phone set, so a later SMS/WhatsApp login reaches the same account.
// The page then logs in normally. Needs SUPABASE_SERVICE_ROLE_KEY in Vercel (same as Razorpay).

const SB_URL = "https://rylqzyylbsephirwslce.supabase.co";
const svc = () => process.env.SUPABASE_SERVICE_ROLE_KEY || "";
const hits = new Map();   /* simple per-instance limit: 5 new accounts per address per hour */

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
  for await (const c of req) { raw += c; if (raw.length > 4000) break; }
  try { return JSON.parse(raw || "{}"); } catch (e) { return {}; }
}
async function create(body) {
  const r = await fetch(SB_URL + "/auth/v1/admin/users", {
    method: "POST",
    headers: { apikey: svc(), Authorization: "Bearer " + svc(), "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
  const t = await r.text();
  return { ok: r.ok, status: r.status, text: t };
}

module.exports = async (req, res) => {
  if (req.method !== "POST") return send(res, 405, { error: "method" });
  if (!svc()) return send(res, 503, { error: "not_setup" });
  const ip = String(req.headers["x-forwarded-for"] || "").split(",")[0].trim() || "?";
  const now = Date.now(), h = (hits.get(ip) || []).filter(t => now - t < 3600000);
  if (h.length >= 5) return send(res, 429, { error: "wait" });

  const b = await readBody(req);
  const d = String(b.phone || "").replace(/\D/g, "");
  const ten = d.length === 12 && d.startsWith("91") ? d.slice(2) : d.length === 10 ? d : "";
  if (!/^[6-9]\d{9}$/.test(ten)) return send(res, 400, { error: "phone" });
  const pin = String(b.pin || "");
  if (!/^\d{6}$/.test(pin)) return send(res, 400, { error: "pin" });
  const lang = ["en", "hi", "hn"].includes(b.lang) ? b.lang : "hn";
  const ref = b.data && typeof b.data.ref === "string" ? b.data.ref.slice(0, 64) : undefined;

  const num = "91" + ten;
  const meta = { lang, via: "mobile_pin", phone: "+" + num };
  if (ref) meta.ref = ref;
  const src = b.data && typeof b.data.src === "string" && /^[a-z0-9-]{1,40}$/.test(b.data.src) ? b.data.src : "";
  if (src) meta.src = src;
  const base = { email: num + "@m.sebsaathi.com", password: "sspin-" + pin + "-Ss", email_confirm: true, user_metadata: meta };

  try {
    let r = await create(Object.assign({ phone: num, phone_confirm: true }, base));
    if (!r.ok && /phone/i.test(r.text) && !/already|exists|registered/i.test(r.text)) r = await create(base);   /* if the phone field is refused, keep it in the details only */
    if (!r.ok) {
      if (r.status === 422 || /already|exists|registered/i.test(r.text)) return send(res, 409, { error: "exists" });
      console.error("phone-signup", r.status, r.text.slice(0, 300));
      return send(res, 502, { error: "auth" });
    }
    h.push(now); hits.set(ip, h);
    return send(res, 200, { ok: true });
  } catch (e) { console.error("phone-signup", e); return send(res, 502, { error: "auth_down" }); }
};
