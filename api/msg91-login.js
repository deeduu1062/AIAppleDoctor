// Seb Saathi — log in with an SMS code sent by the MSG91 OTP widget (Vercel serverless function)
// GET  /api/msg91-login            → { widgetId, tokenAuth } for the widget on the login page (both public by design)
// POST /api/msg91-login { token }   → checks the widget's access token with MSG91, finds or makes the grower's account
//                                     and returns { token_hash } for sb.auth.verifyOtp({ token_hash, type: "magiclink" }).
// The account is the same one the mobile + PIN login uses: 91XXXXXXXXXX@m.sebsaathi.com, with its phone set.
// Needs in Vercel: MSG91_AUTHKEY, MSG91_WIDGET_TOKEN (MSG91_WIDGET_ID optional), SUPABASE_SERVICE_ROLE_KEY.

const SB_URL = "https://rylqzyylbsephirwslce.supabase.co";
const svc = () => process.env.SUPABASE_SERVICE_ROLE_KEY || "";
const WIDGET_ID = () => process.env.MSG91_WIDGET_ID || "366b73715469343638323935";
const hits = new Map();   /* per-instance limit: 10 logins per address per 10 minutes */

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
  for await (const c of req) { raw += c; if (raw.length > 8000) break; }
  try { return JSON.parse(raw || "{}"); } catch (e) { return {}; }
}
async function admin(path, method, body) {
  const r = await fetch(SB_URL + "/auth/v1/admin/" + path, {
    method: method || "GET",
    headers: { apikey: svc(), Authorization: "Bearer " + svc(), "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined
  });
  const text = await r.text();
  let json = null; try { json = JSON.parse(text); } catch (e) {}
  return { ok: r.ok, status: r.status, text, json };
}
/* an older account that has this phone but another (or no) email: find it so the grower keeps their records */
async function findByPhone(num) {
  for (let page = 1; page <= 20; page++) {
    const r = await admin("users?page=" + page + "&per_page=500");
    const list = (r.json && (r.json.users || r.json)) || [];
    if (!r.ok || !Array.isArray(list) || !list.length) return null;
    const u = list.find(x => String(x.phone || "").replace(/\D/g, "") === num);
    if (u) return u;
    if (list.length < 500) return null;
  }
  return null;
}

module.exports = async (req, res) => {
  const tokenAuth = process.env.MSG91_WIDGET_TOKEN || "", authkey = process.env.MSG91_AUTHKEY || "";
  if (req.method === "GET") {
    if (!tokenAuth || !authkey || !svc()) return send(res, 503, { error: "not_setup" });
    return send(res, 200, { widgetId: WIDGET_ID(), tokenAuth });
  }
  if (req.method !== "POST") return send(res, 405, { error: "method" });
  if (!authkey || !svc()) return send(res, 503, { error: "not_setup" });

  const ip = String(req.headers["x-forwarded-for"] || "").split(",")[0].trim() || "?";
  const now = Date.now(), h = (hits.get(ip) || []).filter(t => now - t < 600000);
  if (h.length >= 10) return send(res, 429, { error: "wait" });
  h.push(now); hits.set(ip, h);

  const b = await readBody(req);
  const token = typeof b.token === "string" ? b.token.trim() : "";
  if (!token || token.length > 4000) return send(res, 400, { error: "token" });

  /* 1. ask MSG91 which number this token proves */
  let num = "";
  try {
    const r = await fetch("https://control.msg91.com/api/v5/widget/verifyAccessToken", {
      method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ authkey, "access-token": token })
    });
    const j = await r.json().catch(() => ({}));
    if (!r.ok || j.type === "error" || j.status === "error") { console.error("msg91-login verify", r.status, JSON.stringify(j).slice(0, 300)); return send(res, 401, { error: "code" }); }
    const d = String(j.message || "").replace(/\D/g, "");
    const ten = d.length === 12 && d.startsWith("91") ? d.slice(2) : d.length === 10 ? d : "";
    if (!/^[6-9]\d{9}$/.test(ten)) { console.error("msg91-login number", JSON.stringify(j).slice(0, 200)); return send(res, 400, { error: "phone" }); }
    num = "91" + ten;
  } catch (e) { console.error("msg91-login msg91", e); return send(res, 502, { error: "msg91_down" }); }

  /* 2. the grower's account: make it the first time, the same one afterwards */
  const email = num + "@m.sebsaathi.com";
  const lang = ["en", "hi", "hn"].includes(b.lang) ? b.lang : "hn";
  const meta = { lang, via: "mobile_otp", phone: "+" + num };
  if (b.data && typeof b.data.ref === "string") meta.ref = b.data.ref.slice(0, 64);
  if (b.data && typeof b.data.src === "string" && /^[a-z0-9-]{1,40}$/.test(b.data.src)) meta.src = b.data.src;
  let loginEmail = email;
  try {
    let r = await admin("users", "POST", { email, phone: num, email_confirm: true, phone_confirm: true, user_metadata: meta });
    if (!r.ok && /phone/i.test(r.text) && /already|exists|registered/i.test(r.text)) {
      /* the phone belongs to an older account (the earlier phone login): log in to that one */
      const u = await findByPhone(num);
      if (!u) { console.error("msg91-login phone owner not found", r.text.slice(0, 200)); return send(res, 502, { error: "auth" }); }
      if (u.email) loginEmail = u.email;
      else { const up = await admin("users/" + u.id, "PUT", { email, email_confirm: true }); if (!up.ok) { console.error("msg91-login set email", up.text.slice(0, 200)); return send(res, 502, { error: "auth" }); } }
    } else if (!r.ok && !/already|exists|registered/i.test(r.text)) {
      if (/phone/i.test(r.text)) r = await admin("users", "POST", { email, email_confirm: true, user_metadata: meta });   /* phone field refused: keep it in the details only */
      if (!r.ok && !/already|exists|registered/i.test(r.text)) { console.error("msg91-login create", r.status, r.text.slice(0, 300)); return send(res, 502, { error: "auth" }); }
    }
    /* 3. a one-time login link for that account; the page uses its token straight away */
    const g = await admin("generate_link", "POST", { type: "magiclink", email: loginEmail });
    const th = g.json && (g.json.hashed_token || (g.json.properties && g.json.properties.hashed_token));
    if (!g.ok || !th) { console.error("msg91-login link", g.status, g.text.slice(0, 300)); return send(res, 502, { error: "auth" }); }
    return send(res, 200, { token_hash: th });
  } catch (e) { console.error("msg91-login", e); return send(res, 502, { error: "auth_down" }); }
};
