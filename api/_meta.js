// Seb Saathi — connect the Facebook Page (and its Instagram) from the admin page with "Connect with Facebook"
// (reached as /api/meta, through /api/social?fn=meta; Vercel allows only 12 functions)
//
// POST /api/meta { action: "status" }     → { setup, missing, connected, page_name, ig_user }
// POST /api/meta { action: "connect" }    → { url } Facebook log-in page; you pick the Seb Saathi Page (and its Instagram) there
// GET  /api/meta?code=…&state=…           ← Facebook sends you back here; the Page key is saved, then you return to the admin page
// POST /api/meta { action: "disconnect" } → forgets the Page
// POST calls need: Authorization: Bearer <Supabase access token of an admin> (checked with public.is_admin()).
//
// Needs in Vercel → Settings → Environment Variables (then Redeploy):
//   META_APP_ID, META_APP_SECRET   from developers.facebook.com → your app → App settings → Basic
//                                  (and in the app's Facebook Login settings, Valid OAuth Redirect URIs: https://<your site>/api/meta)
//   META_LOGIN_CONFIG_ID           only if your app uses "Facebook Login for Business" (it then asks for a configuration id)
//   SUPABASE_SERVICE_ROLE_KEY      already set; the Page key is kept in public.meta_auth, which only the server can read
// The never-expiring Page key comes from a long-lived log-in; posting (social-post, social-cron) uses it.

const crypto = require("crypto");
const SB_URL = "https://rylqzyylbsephirwslce.supabase.co";
const SB_KEY = "sb_publishable_EYVtP0ljYd-jta5ENmX9Jg_mCtYLzJo"; // public key, same as the website
const G = "https://graph.facebook.com/v25.0/";
const SCOPES = "pages_show_list,pages_read_engagement,pages_manage_posts,instagram_basic,instagram_content_publish,read_insights,instagram_manage_insights";   /* the last two: page and Instagram numbers on the admin Overview */
const env = () => ({ id: process.env.META_APP_ID || "", secret: process.env.META_APP_SECRET || "", cfg: process.env.META_LOGIN_CONFIG_ID || "", svc: process.env.SUPABASE_SERVICE_ROLE_KEY || "" });

function send(res, code, obj) { res.statusCode = code; res.setHeader("Content-Type", "application/json"); res.setHeader("Cache-Control", "no-store"); res.end(JSON.stringify(obj)); }
function back(res, q) { res.statusCode = 302; res.setHeader("Location", "/admin.html?" + q + "#mk"); res.setHeader("Cache-Control", "no-store"); res.end(); }
async function readBody(req) {
  if (req.body && typeof req.body === "object") return req.body;
  if (typeof req.body === "string") { try { return JSON.parse(req.body); } catch (e) { return {}; } }
  let raw = ""; for await (const c of req) { raw += c; if (raw.length > 5000) break; }
  try { return JSON.parse(raw || "{}"); } catch (e) { return {}; }
}
const hostOf = req => String(req.headers["x-forwarded-host"] || req.headers.host || "sebsaathi.com").split(",")[0].trim();

/* state = expiry.host.signature, so only a log-in started from the admin page is accepted */
const sign = (s, secret) => crypto.createHmac("sha256", secret).update(s).digest("base64url");
function makeState(host, secret) { const b = (Date.now() + 15 * 60e3) + "." + Buffer.from(host).toString("base64url"); return b + "." + sign(b, secret); }
function checkState(st, secret) {
  const p = String(st || "").split("."); if (p.length !== 3) return null;
  const b = p[0] + "." + p[1], want = sign(b, secret);
  if (want.length !== p[2].length || !crypto.timingSafeEqual(Buffer.from(want), Buffer.from(p[2]))) return null;
  if (+p[0] < Date.now()) return null;
  return Buffer.from(p[1], "base64url").toString();
}
async function isAdmin(req) {
  const auth = String(req.headers.authorization || ""), token = auth.startsWith("Bearer ") ? auth.slice(7) : "";
  if (!token) return false;
  const r = await fetch(SB_URL + "/rest/v1/rpc/is_admin", { method: "POST", headers: { apikey: SB_KEY, Authorization: "Bearer " + token, "Content-Type": "application/json" }, body: "{}" });
  return r.ok && (await r.json()) === true;
}
async function db(method, svc, body) {
  const r = await fetch(SB_URL + "/rest/v1/meta_auth" + (method === "GET" ? "?id=eq.1&select=*" : method === "DELETE" ? "?id=eq.1" : ""), {
    method, headers: Object.assign({ apikey: svc, Authorization: "Bearer " + svc, "Content-Type": "application/json" }, method === "POST" ? { Prefer: "resolution=merge-duplicates,return=minimal" } : {}),
    body: body ? JSON.stringify(body) : undefined });
  if (!r.ok) { const t = await r.text(); throw new Error(/meta_auth/.test(t) && /exist|schema cache/i.test(t) ? "no_table" : "db " + r.status); }
  return method === "GET" ? ((await r.json())[0] || null) : null;
}
async function fb(path, params) {
  const u = new URL(G + path); Object.entries(params).forEach(([k, v]) => u.searchParams.set(k, v));
  const r = await fetch(u); const j = await r.json().catch(() => ({}));
  if (!r.ok || j.error) throw new Error((j.error && j.error.message) || ("Meta " + r.status));
  return j;
}

module.exports = async (req, res) => {
  const e = env();
  /* ---- Facebook sends the admin back here after they allow access ---- */
  if (req.method === "GET") {
    const q = new URL(req.url, "https://x").searchParams;
    if (q.get("error")) return back(res, "fb=err&m=" + encodeURIComponent(q.get("error_reason") || q.get("error")));
    if (!q.get("code")) return send(res, 405, { error: "method" });
    if (!e.id || !e.secret || !e.svc) return back(res, "fb=err&m=setup");
    const host = checkState(q.get("state"), e.secret);
    if (!host) return back(res, "fb=err&m=expired");
    try {
      const redirect = "https://" + host + "/api/meta";
      const short = await fb("oauth/access_token", { client_id: e.id, client_secret: e.secret, redirect_uri: redirect, code: q.get("code") });
      const long = await fb("oauth/access_token", { grant_type: "fb_exchange_token", client_id: e.id, client_secret: e.secret, fb_exchange_token: short.access_token });
      const PF = "id,name,access_token,instagram_business_account{id,username}";
      let pages = ((await fb("me/accounts", { access_token: long.access_token, fields: PF, limit: "50" })).data || []).filter(p => p.access_token);
      if (!pages.length) {   /* Facebook's business log-in sometimes leaves me/accounts empty: ask which Pages were granted, then fetch each one */
        try {
          const dbg = await fb("debug_token", { input_token: long.access_token, access_token: e.id + "|" + e.secret });
          const ids = [...new Set(((dbg.data && dbg.data.granular_scopes) || []).filter(s => /^pages_/.test(s.scope)).flatMap(s => s.target_ids || []))];
          for (const id of ids.slice(0, 20)) { try { const p = await fb(id, { access_token: long.access_token, fields: PF }); if (p.access_token) pages.push(p); } catch (x) {} }
        } catch (x) {}
      }
      if (!pages.length) {
        let who = ""; try { who = (await fb("me", { access_token: long.access_token, fields: "name" })).name || ""; } catch (x) {}
        return back(res, "fb=err&m=" + encodeURIComponent("no_page" + (who ? ":" + who : "")));
      }
      const p = pages.find(x => /seb\s*saathi|सेब\s*साथी/i.test(x.name || "")) || pages[0], ig = p.instagram_business_account || null;
      await db("POST", e.svc, { id: 1, page_id: p.id, page_name: p.name, page_token: p.access_token, ig_id: ig ? ig.id : null, ig_user: ig ? ig.username : null, connected_at: new Date().toISOString() });
      return back(res, "fb=ok");
    } catch (err) { return back(res, "fb=err&m=" + encodeURIComponent(String(err.message || err).slice(0, 140))); }
  }
  if (req.method !== "POST") return send(res, 405, { error: "method" });
  try { if (!(await isAdmin(req))) return send(res, 403, { error: "admin" }); }
  catch (err) { return send(res, 502, { error: "auth_down" }); }
  const b = await readBody(req), act = String(b.action || "status");
  const missing = [!e.id && "META_APP_ID", !e.secret && "META_APP_SECRET", !e.svc && "SUPABASE_SERVICE_ROLE_KEY"].filter(Boolean);
  const redirect = "https://" + hostOf(req) + "/api/meta";
  if (missing.length) return send(res, 200, { setup: false, missing, redirect });

  if (act === "connect") {
    const u = new URL("https://www.facebook.com/v25.0/dialog/oauth");
    const P = { client_id: e.id, redirect_uri: redirect, response_type: "code", state: makeState(hostOf(req), e.secret) };
    if (e.cfg) P.config_id = e.cfg; else P.scope = SCOPES;
    P.auth_type = "rerequest";   /* make Facebook ask again which Pages to share, instead of reusing an earlier answer */
    Object.entries(P).forEach(([k, v]) => u.searchParams.set(k, v));
    return send(res, 200, { setup: true, url: u.toString() });
  }
  let row;
  try { row = await db("GET", e.svc); }
  catch (err) { return send(res, 200, { setup: false, missing: err.message === "no_table" ? ["meta_auth table (Supabase)"] : [], error: err.message === "no_table" ? "" : err.message, redirect }); }
  if (act === "disconnect") { if (row) await db("DELETE", e.svc); return send(res, 200, { setup: true, connected: false, redirect }); }
  return send(res, 200, { setup: true, connected: !!row, page_name: row ? row.page_name : null, ig_user: row ? row.ig_user : null, redirect });
};
