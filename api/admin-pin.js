// Seb Saathi — admin sets a new PIN for a mobile + PIN grower who forgot theirs (Vercel serverless function)
// POST /api/admin-pin { user_id, pin }   Header: Authorization: Bearer <admin's Supabase token>
// Needs SUPABASE_SERVICE_ROLE_KEY in Vercel.

const SB_URL = "https://rylqzyylbsephirwslce.supabase.co";
const SB_KEY = "sb_publishable_EYVtP0ljYd-jta5ENmX9Jg_mCtYLzJo"; // public key, same as the website
const ADMIN_EMAILS = ["deeduu@gmail.com", "admin@sebsaathi.com"];
const svc = () => process.env.SUPABASE_SERVICE_ROLE_KEY || "";

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

module.exports = async (req, res) => {
  if (req.method !== "POST") return send(res, 405, { error: "method" });
  if (!svc()) return send(res, 503, { error: "not_setup" });
  const auth = String(req.headers.authorization || "");
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";
  if (!token) return send(res, 401, { error: "signin" });
  try {
    const u = await fetch(SB_URL + "/auth/v1/user", { headers: { apikey: SB_KEY, Authorization: "Bearer " + token } });
    if (!u.ok) return send(res, 401, { error: "signin" });
    const me = await u.json();
    if (!ADMIN_EMAILS.includes(String(me.email || "").toLowerCase())) return send(res, 403, { error: "admin" });
  } catch (e) { return send(res, 502, { error: "auth_down" }); }

  const b = await readBody(req);
  const id = String(b.user_id || ""), pin = String(b.pin || "");
  if (!/^[0-9a-f-]{36}$/i.test(id)) return send(res, 400, { error: "user" });
  if (!/^\d{6}$/.test(pin)) return send(res, 400, { error: "pin" });
  const H = { apikey: svc(), Authorization: "Bearer " + svc(), "Content-Type": "application/json" };
  try {
    const g = await fetch(SB_URL + "/auth/v1/admin/users/" + id, { headers: H });
    if (!g.ok) return send(res, 404, { error: "user" });
    const target = await g.json();
    if (!/@m\.sebsaathi\.com$/i.test(String(target.email || ""))) return send(res, 400, { error: "not_pin" });   /* only mobile + PIN accounts */
    const r = await fetch(SB_URL + "/auth/v1/admin/users/" + id, { method: "PUT", headers: H, body: JSON.stringify({ password: "sspin-" + pin + "-Ss" }) });
    if (!r.ok) { console.error("admin-pin", r.status, (await r.text()).slice(0, 200)); return send(res, 502, { error: "auth" }); }
    return send(res, 200, { ok: true });
  } catch (e) { return send(res, 502, { error: "auth_down" }); }
};
