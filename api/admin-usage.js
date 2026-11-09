// Seb Saathi — live usage for the admin page (Vercel serverless function)
// GET /api/admin-usage   Header: Authorization: Bearer <Supabase access token of an admin>
//
// AI spend comes from Anthropic's Usage & Cost Admin API. Needs in Vercel → Settings → Environment Variables:
//   ANTHROPIC_ADMIN_KEY   (an Admin API key, starts with sk-ant-admin..., made in console.anthropic.com → Settings → Admin keys)
// Without it, the admin page keeps showing its own estimate.

const SB_URL = "https://rylqzyylbsephirwslce.supabase.co";
const SB_KEY = "sb_publishable_EYVtP0ljYd-jta5ENmX9Jg_mCtYLzJo"; // public key, same as the website
const ADMIN_EMAILS = ["deeduu@gmail.com", "admin@sebsaathi.com"];

function send(res, code, obj) {
  res.statusCode = code;
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(obj));
}

async function aiSpend(key) {
  const now = new Date(), start = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1));
  const today = now.toISOString().slice(0, 10);
  let page = null, month = 0, day = 0, byModel = {}, lastDay = null;
  for (let i = 0; i < 3; i++) {
    const q = "starting_at=" + encodeURIComponent(start.toISOString()) + "&bucket_width=1d&limit=31&group_by[]=description" + (page ? "&page=" + encodeURIComponent(page) : "");
    const r = await fetch("https://api.anthropic.com/v1/organizations/cost_report?" + q, {
      headers: { "x-api-key": key, "anthropic-version": "2023-06-01", "User-Agent": "SebSaathiAdmin/1.0" }
    });
    if (!r.ok) { const t = await r.text().catch(() => ""); return { setup: true, error: "Anthropic " + r.status + (t ? ": " + t.slice(0, 160) : "") }; }
    const j = await r.json();
    for (const b of j.data || []) {
      const d = String(b.starting_at || "").slice(0, 10);
      for (const x of b.results || []) {
        const usd = (parseFloat(x.amount) || 0) / 100;   // amount is in cents
        month += usd;
        if (d === today) day += usd;
        const m = x.model || (x.cost_type && x.cost_type !== "tokens" ? x.cost_type : "other");
        byModel[m] = (byModel[m] || 0) + usd;
        if (usd > 0 && (!lastDay || d > lastDay)) lastDay = d;
      }
    }
    if (!j.has_more || !j.next_page) break;
    page = j.next_page;
  }
  return { setup: true, month_usd: +month.toFixed(4), today_usd: +day.toFixed(4), by_model: byModel, last_day: lastDay, since: start.toISOString().slice(0, 10) };
}

module.exports = async (req, res) => {
  if (req.method !== "GET") return send(res, 405, { error: "method" });
  const auth = String(req.headers.authorization || "");
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";
  if (!token) return send(res, 401, { error: "signin" });
  try {
    const u = await fetch(SB_URL + "/auth/v1/user", { headers: { apikey: SB_KEY, Authorization: "Bearer " + token } });
    if (!u.ok) return send(res, 401, { error: "signin" });
    const user = await u.json();
    if (!ADMIN_EMAILS.includes(String(user.email || "").toLowerCase())) return send(res, 403, { error: "admin" });
  } catch (e) { return send(res, 502, { error: "auth_down" }); }

  const key = process.env.ANTHROPIC_ADMIN_KEY;
  let ai = { setup: false };
  if (key) { try { ai = await aiSpend(key); } catch (e) { ai = { setup: true, error: String(e && e.message || e) }; } }
  return send(res, 200, { ai, at: new Date().toISOString() });
};
