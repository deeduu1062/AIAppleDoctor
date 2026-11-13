// Seb Saathi — connect the YouTube channel and upload Video Studio videos from the admin page (Vercel serverless function)
//
// POST /api/youtube { action: "status" }      → { setup, connected, channel } (is everything set up?)
// POST /api/youtube { action: "connect" }     → { url } Google sign-in page; you pick the Seb Saathi channel there
// GET  /api/youtube?code=…&state=…            ← Google sends you back here; the connection is saved, then you return to the admin page
// POST /api/youtube { action: "token" }       → { access_token } short-lived (1 hour) upload key; the admin page
//                                               sends the video straight to YouTube with it (videos are too big for this server)
// POST /api/youtube { action: "disconnect" }  → forgets the channel
// POST calls need: Authorization: Bearer <Supabase access token of an admin> (checked with public.is_admin()).
//
// Needs in Vercel → Settings → Environment Variables (then Redeploy):
//   GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET   from Google Cloud → Google Auth Platform → Clients (type: Web application),
//                                            with Authorised redirect URIs https://sebsaathi.com/api/youtube
//                                            and https://sebsaathi.vercel.app/api/youtube
//   SUPABASE_SERVICE_ROLE_KEY                already set (Razorpay); stores the connection in public.yt_auth (supabase/youtube.sql)

const crypto = require("crypto");
const SB_URL = "https://rylqzyylbsephirwslce.supabase.co";
const SB_KEY = "sb_publishable_EYVtP0ljYd-jta5ENmX9Jg_mCtYLzJo"; // public key, same as the website
const SCOPES = "https://www.googleapis.com/auth/youtube.upload https://www.googleapis.com/auth/youtube.readonly";
const env = () => ({ id: process.env.GOOGLE_CLIENT_ID || "", secret: process.env.GOOGLE_CLIENT_SECRET || "", svc: process.env.SUPABASE_SERVICE_ROLE_KEY || "" });

function send(res, code, obj) {
  res.statusCode = code;
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(obj));
}
function back(res, q) { res.statusCode = 302; res.setHeader("Location", "/admin.html?" + q + "#mk"); res.setHeader("Cache-Control", "no-store"); res.end(); }
async function readBody(req) {
  if (req.body && typeof req.body === "object") return req.body;
  if (typeof req.body === "string") { try { return JSON.parse(req.body); } catch (e) { return {}; } }
  let raw = "";
  for await (const c of req) { raw += c; if (raw.length > 5000) break; }
  try { return JSON.parse(raw || "{}"); } catch (e) { return {}; }
}
const redirectUri = req => "https://" + String(req.headers["x-forwarded-host"] || req.headers.host || "sebsaathi.com").split(",")[0].trim() + "/api/youtube";

/* state = expiry.host.signature, so only a sign-in started from the admin page is accepted */
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
  const auth = String(req.headers.authorization || "");
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";
  if (!token) return false;
  const r = await fetch(SB_URL + "/rest/v1/rpc/is_admin", { method: "POST", headers: { apikey: SB_KEY, Authorization: "Bearer " + token, "Content-Type": "application/json" }, body: "{}" });
  return r.ok && (await r.json()) === true;
}
async function db(method, svc, body) {
  const r = await fetch(SB_URL + "/rest/v1/yt_auth" + (method === "GET" ? "?id=eq.1&select=*" : method === "DELETE" ? "?id=eq.1" : ""), {
    method, headers: Object.assign({ apikey: svc, Authorization: "Bearer " + svc, "Content-Type": "application/json" }, method === "POST" ? { Prefer: "resolution=merge-duplicates,return=minimal" } : {}),
    body: body ? JSON.stringify(body) : undefined });
  if (!r.ok) { const t = await r.text(); const e = new Error(/yt_auth/.test(t) && /exist|schema cache/i.test(t) ? "no_table" : "db " + r.status); throw e; }
  return method === "GET" ? ((await r.json())[0] || null) : null;
}
async function google(url, params) {
  const r = await fetch(url, { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: new URLSearchParams(params) });
  const j = await r.json().catch(() => ({}));
  if (!r.ok || j.error) { const e = new Error(j.error_description || j.error || ("google " + r.status)); e.code = j.error; throw e; }
  return j;
}
async function freshToken(e, row) {
  return google("https://oauth2.googleapis.com/token", { client_id: e.id, client_secret: e.secret, refresh_token: row.refresh_token, grant_type: "refresh_token" });
}

module.exports = async (req, res) => {
  const e = env();
  /* ---- Google sends the admin back here after they allow access ---- */
  if (req.method === "GET") {
    const q = new URL(req.url, "https://x").searchParams;
    if (q.get("error")) return back(res, "yt=err&m=" + encodeURIComponent(q.get("error")));
    if (!q.get("code")) return send(res, 405, { error: "method" });
    if (!e.id || !e.secret || !e.svc) return back(res, "yt=err&m=setup");
    const host = checkState(q.get("state"), e.secret);
    if (!host) return back(res, "yt=err&m=expired");
    try {
      const t = await google("https://oauth2.googleapis.com/token", { code: q.get("code"), client_id: e.id, client_secret: e.secret, redirect_uri: "https://" + host + "/api/youtube", grant_type: "authorization_code" });
      if (!t.refresh_token) return back(res, "yt=err&m=no_refresh");
      const c = await fetch("https://www.googleapis.com/youtube/v3/channels?part=snippet&mine=true", { headers: { Authorization: "Bearer " + t.access_token } }).then(r => r.json()).catch(() => ({}));
      const ch = (c.items || [])[0];
      if (!ch) return back(res, "yt=err&m=no_channel");
      await db("POST", e.svc, { id: 1, refresh_token: t.refresh_token, channel_id: ch.id, channel_title: ch.snippet.title, channel_handle: ch.snippet.customUrl || null, connected_at: new Date().toISOString() });
      return back(res, "yt=ok");
    } catch (err) { return back(res, "yt=err&m=" + encodeURIComponent(String(err.message || err).slice(0, 120))); }
  }
  if (req.method !== "POST") return send(res, 405, { error: "method" });
  try { if (!(await isAdmin(req))) return send(res, 403, { error: "admin" }); }
  catch (err) { return send(res, 502, { error: "auth_down" }); }
  const b = await readBody(req), act = String(b.action || "status");
  if (!e.id || !e.secret || !e.svc) return send(res, 200, { setup: false, missing: [!e.id && "GOOGLE_CLIENT_ID", !e.secret && "GOOGLE_CLIENT_SECRET", !e.svc && "SUPABASE_SERVICE_ROLE_KEY"].filter(Boolean) });

  if (act === "connect") {
    const host = redirectUri(req).slice(8, -12);
    const u = new URL("https://accounts.google.com/o/oauth2/v2/auth");
    Object.entries({ client_id: e.id, redirect_uri: redirectUri(req), response_type: "code", scope: SCOPES, access_type: "offline", prompt: "consent select_account", include_granted_scopes: "true", state: makeState(host, e.secret) })
      .forEach(([k, v]) => u.searchParams.set(k, v));
    return send(res, 200, { setup: true, url: u.toString() });
  }
  let row;
  try { row = await db("GET", e.svc); }
  catch (err) { return send(res, 200, { setup: false, missing: err.message === "no_table" ? ["supabase/youtube.sql"] : [], error: err.message === "no_table" ? "" : err.message }); }
  const channel = row ? { id: row.channel_id, title: row.channel_title, handle: row.channel_handle, url: row.channel_handle ? "https://www.youtube.com/" + row.channel_handle : "https://www.youtube.com/channel/" + row.channel_id } : null;

  if (act === "disconnect") {
    if (row) { try { await google("https://oauth2.googleapis.com/revoke", { token: row.refresh_token }); } catch (err) {} await db("DELETE", e.svc); }
    return send(res, 200, { setup: true, connected: false });
  }
  if (act === "token") {
    if (!row) return send(res, 200, { setup: true, connected: false });
    try { const t = await freshToken(e, row); return send(res, 200, { setup: true, connected: true, channel, access_token: t.access_token, expires_in: t.expires_in }); }
    catch (err) { return send(res, 200, { setup: true, connected: true, channel, error: err.code === "invalid_grant" ? "reconnect" : String(err.message || err).slice(0, 200) }); }
  }
  return send(res, 200, { setup: true, connected: !!row, channel });
};
