// Seb Saathi — which keys are set up in Vercel (admin → Site health → Keys & AI). Reached as /api/social?fn=keys.
// GET  → { keys: [{ name, group, set }], ai: { provider_now, gemini, claude } }   (never the key values themselves)
// POST { test: "gemini" | "claude" } → { ok, model, ms, message }   (one tiny question, to check the key really works)
// Header: Authorization: Bearer <Supabase access token of an admin> (checked with public.is_admin()).

const SB_URL = "https://rylqzyylbsephirwslce.supabase.co";
const SB_KEY = "sb_publishable_EYVtP0ljYd-jta5ENmX9Jg_mCtYLzJo"; // public key, same as the website

/* every service the site uses, with the Vercel keys it reads; "test" = a free, read-only check can be run */
const SERVICES = [
  { id: "gemini", group: "AI", label: "Google Gemini (Saathi, photo check, AI video)", keys: ["GEMINI_API_KEY"], test: true },
  { id: "claude", group: "AI", label: "Anthropic Claude (Saathi, photo check, bills, posts)", keys: ["ANTHROPIC_API_KEY"], test: true },
  { id: "anthropic_admin", group: "AI", label: "Anthropic admin key (AI bill in Costs)", keys: ["ANTHROPIC_ADMIN_KEY"], test: true },
  { id: "ai_settings", group: "AI", label: "AI settings (optional)", keys: ["AI_PROVIDER", "GEMINI_CHAT_MODEL", "GEMINI_DX_MODEL", "GEMINI_VIDEO_MODEL", "CHAT_MODEL", "ANTHROPIC_MODEL", "RECEIPT_MODEL", "SOCIAL_MODEL", "AI_PRICES"] },
  { id: "own_model", group: "AI", label: "Own disease model (later)", keys: ["OWN_MODEL_URL", "OWN_MODEL_KEY"] },
  { id: "supabase", group: "Database", label: "Supabase server key", keys: ["SUPABASE_SERVICE_ROLE_KEY"], test: true },
  { id: "msg91", group: "Login", label: "MSG91 (mobile login codes)", keys: ["MSG91_AUTHKEY", "MSG91_WIDGET_ID", "MSG91_WIDGET_TOKEN"] },
  { id: "twilio", group: "Login", label: "Twilio (old mobile login, figures)", keys: ["TWILIO_ACCOUNT_SID", "TWILIO_AUTH_TOKEN", "TWILIO_API_KEY", "TWILIO_API_SECRET"], test: true },
  { id: "google_login", group: "Login", label: "Google login", keys: ["GOOGLE_CLIENT_ID", "GOOGLE_CLIENT_SECRET"] },
  { id: "razorpay", group: "Payments", label: "Razorpay", keys: ["RAZORPAY_KEY_ID", "RAZORPAY_KEY_SECRET", "RAZORPAY_WEBHOOK_SECRET"], test: true },
  { id: "meta_app", group: "Social & video", label: "Facebook app (Connect with Facebook)", keys: ["META_APP_ID", "META_APP_SECRET", "META_LOGIN_CONFIG_ID"], test: true },
  { id: "meta_page", group: "Social & video", label: "Facebook page token", keys: ["META_PAGE_TOKEN"], test: true },
  { id: "google_tts", group: "Social & video", label: "Google voice (video voice-over)", keys: ["GOOGLE_TTS_KEY"], test: true },
  { id: "sarvam", group: "Social & video", label: "Sarvam voice (video voice-over)", keys: ["SARVAM_API_KEY"] },
  { id: "pexels", group: "Social & video", label: "Pexels (free stock clips)", keys: ["PEXELS_API_KEY"], test: true },
  { id: "resend", group: "Email", label: "Resend (morning brief email)", keys: ["RESEND_API_KEY", "BRIEF_FROM", "BRIEF_TO"], test: true }
];
const SB_SVC_URL = SB_URL;

function send(res, code, obj) {
  res.statusCode = code;
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(obj));
}
async function readBody(req) {
  if (req.body && typeof req.body === "object") return req.body;
  if (typeof req.body === "string") { try { return JSON.parse(req.body); } catch (e) { return {}; } }
  let raw = ""; for await (const c of req) { raw += c; if (raw.length > 5000) break; }
  try { return JSON.parse(raw || "{}"); } catch (e) { return {}; }
}
async function isAdmin(req) {
  const a = String(req.headers.authorization || ""), token = a.startsWith("Bearer ") ? a.slice(7) : "";
  if (!token) return false;
  const r = await fetch(SB_URL + "/rest/v1/rpc/is_admin", { method: "POST", headers: { apikey: SB_KEY, Authorization: "Bearer " + token, "Content-Type": "application/json" }, body: "{}" });
  return r.ok && (await r.json()) === true;
}
const has = k => !!String(process.env[k] || "").trim();

/* free, read-only checks for the other services: { ok, message } */
const E = process.env, basic = (a, b) => "Basic " + Buffer.from(a + ":" + b).toString("base64");
async function said(r) { const t = await r.text().catch(() => ""); let m = ""; try { const j = JSON.parse(t); m = (j.error && (j.error.message || j.error.description || j.error)) || j.message || j.detail || ""; } catch (e) { m = t; } return ("HTTP " + r.status + (m ? ": " + m : "")).slice(0, 300); }
async function otherTest(id) {
  const need = (...k) => { const miss = k.filter(x => !has(x)); return miss.length ? { ok: false, message: "Not set in Vercel: " + miss.join(", ") } : null; };
  let r, n;
  switch (id) {
    case "anthropic_admin":
      if ((n = need("ANTHROPIC_ADMIN_KEY"))) return n;
      r = await fetch("https://api.anthropic.com/v1/organizations/users?limit=1", { headers: { "x-api-key": E.ANTHROPIC_ADMIN_KEY, "anthropic-version": "2023-06-01" } });
      return r.ok ? { ok: true, model: "Anthropic admin" } : { ok: false, message: await said(r) };
    case "supabase":
      if ((n = need("SUPABASE_SERVICE_ROLE_KEY"))) return n;
      r = await fetch(SB_SVC_URL + "/rest/v1/plan_settings?select=id&limit=1", { headers: { apikey: E.SUPABASE_SERVICE_ROLE_KEY, Authorization: "Bearer " + E.SUPABASE_SERVICE_ROLE_KEY } });
      return r.ok ? { ok: true, model: "Supabase" } : { ok: false, message: await said(r) };
    case "twilio":
      if ((n = need("TWILIO_ACCOUNT_SID"))) return n;
      if (!has("TWILIO_AUTH_TOKEN") && !(has("TWILIO_API_KEY") && has("TWILIO_API_SECRET"))) return { ok: false, message: "Not set in Vercel: TWILIO_AUTH_TOKEN (or TWILIO_API_KEY + TWILIO_API_SECRET)" };
      r = await fetch("https://api.twilio.com/2010-04-01/Accounts/" + encodeURIComponent(E.TWILIO_ACCOUNT_SID) + ".json", { headers: { Authorization: has("TWILIO_AUTH_TOKEN") ? basic(E.TWILIO_ACCOUNT_SID, E.TWILIO_AUTH_TOKEN) : basic(E.TWILIO_API_KEY, E.TWILIO_API_SECRET) } });
      if (!r.ok) return { ok: false, message: await said(r) };
      { const j = await r.json().catch(() => ({})); return { ok: true, model: "Twilio" + (j.status ? " · " + j.status : "") }; }
    case "razorpay":
      if ((n = need("RAZORPAY_KEY_ID", "RAZORPAY_KEY_SECRET"))) return n;
      r = await fetch("https://api.razorpay.com/v1/payments?count=1", { headers: { Authorization: basic(E.RAZORPAY_KEY_ID, E.RAZORPAY_KEY_SECRET) } });
      return r.ok ? { ok: true, model: "Razorpay " + (/^rzp_live/.test(E.RAZORPAY_KEY_ID) ? "live" : /^rzp_test/.test(E.RAZORPAY_KEY_ID) ? "test" : "") } : { ok: false, message: await said(r) };
    case "meta_app":
      if ((n = need("META_APP_ID", "META_APP_SECRET"))) return n;
      r = await fetch("https://graph.facebook.com/v25.0/" + encodeURIComponent(E.META_APP_ID) + "?fields=name&access_token=" + encodeURIComponent(E.META_APP_ID + "|" + E.META_APP_SECRET));
      if (!r.ok) return { ok: false, message: await said(r) };
      { const j = await r.json().catch(() => ({})); return { ok: true, model: "Facebook app" + (j.name ? " · " + j.name : "") }; }
    case "meta_page":
      if ((n = need("META_PAGE_TOKEN"))) return n;
      r = await fetch("https://graph.facebook.com/v25.0/me?fields=name&access_token=" + encodeURIComponent(E.META_PAGE_TOKEN));
      if (!r.ok) return { ok: false, message: await said(r) };
      { const j = await r.json().catch(() => ({})); return { ok: true, model: j.name || "Facebook" }; }
    case "google_tts":
      if ((n = need("GOOGLE_TTS_KEY"))) return n;
      r = await fetch("https://texttospeech.googleapis.com/v1/voices?languageCode=hi-IN&key=" + encodeURIComponent(E.GOOGLE_TTS_KEY));
      return r.ok ? { ok: true, model: "Google Text-to-Speech" } : { ok: false, message: await said(r) };
    case "pexels":
      if ((n = need("PEXELS_API_KEY"))) return n;
      r = await fetch("https://api.pexels.com/videos/search?query=apple&per_page=1", { headers: { Authorization: E.PEXELS_API_KEY } });
      return r.ok ? { ok: true, model: "Pexels" } : { ok: false, message: await said(r) };
    case "resend":
      if ((n = need("RESEND_API_KEY"))) return n;
      r = await fetch("https://api.resend.com/domains", { headers: { Authorization: "Bearer " + E.RESEND_API_KEY } });
      if (r.ok) return { ok: true, model: "Resend" };
      { const m = await said(r); return /restricted/i.test(m) ? { ok: true, model: "Resend (sending-only key)" } : { ok: false, message: m }; }
  }
  return null;
}

module.exports = async (req, res) => {
  try { if (!(await isAdmin(req))) return send(res, 403, { error: "admin" }); } catch (e) { return send(res, 502, { error: "auth_down" }); }
  if (req.method === "GET") {
    const keys = [], services = SERVICES.map(v => ({ id: v.id, group: v.group, label: v.label, test: !!v.test, keys: v.keys.map(name => ({ name, set: has(name) })) }));
    SERVICES.forEach(v => v.keys.forEach(name => keys.push({ name, group: v.group, set: has(name) })));
    return send(res, 200, { services, keys, ai: { gemini: has("GEMINI_API_KEY"), claude: has("ANTHROPIC_API_KEY"), env_provider: String(process.env.AI_PROVIDER || "") } });
  }
  if (req.method !== "POST") return send(res, 405, { error: "method" });
  const b = await readBody(req), t0 = Date.now();
  try {
    if (b.test === "gemini") {
      if (!has("GEMINI_API_KEY")) return send(res, 200, { ok: false, message: "GEMINI_API_KEY is not set in Vercel." });
      const model = process.env.GEMINI_CHAT_MODEL || "gemini-3.1-flash-lite";
      const r = await fetch("https://generativelanguage.googleapis.com/v1beta/models/" + encodeURIComponent(model) + ":generateContent", {
        method: "POST", headers: { "x-goog-api-key": process.env.GEMINI_API_KEY, "Content-Type": "application/json" },
        body: JSON.stringify({ contents: [{ role: "user", parts: [{ text: "Reply with the single word: OK" }] }], generationConfig: { maxOutputTokens: 200 } })
      });
      const j = await r.json().catch(() => ({}));
      if (!r.ok) return send(res, 200, { ok: false, model, message: ((j.error && j.error.message) || ("HTTP " + r.status)).slice(0, 300) });
      return send(res, 200, { ok: true, model: j.modelVersion || model, ms: Date.now() - t0 });
    }
    if (b.test === "claude") {
      if (!has("ANTHROPIC_API_KEY")) return send(res, 200, { ok: false, message: "ANTHROPIC_API_KEY is not set in Vercel." });
      const model = process.env.CHAT_MODEL || "claude-haiku-5-5";
      const r = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST", headers: { "x-api-key": process.env.ANTHROPIC_API_KEY, "anthropic-version": "2023-06-01", "content-type": "application/json" },
        body: JSON.stringify({ model, max_tokens: 10, messages: [{ role: "user", content: "Reply with the single word: OK" }] })
      });
      const j = await r.json().catch(() => ({}));
      if (!r.ok) return send(res, 200, { ok: false, model, message: ((j.error && j.error.message) || ("HTTP " + r.status)).slice(0, 300) });
      return send(res, 200, { ok: true, model: j.model || model, ms: Date.now() - t0 });
    }
    const more = await otherTest(String(b.test || ""));
    if (more) return send(res, 200, Object.assign({ ms: Date.now() - t0 }, more));
  } catch (e) { return send(res, 200, { ok: false, message: String(e.message || e).slice(0, 300) }); }
  return send(res, 400, { error: "test" });
};
