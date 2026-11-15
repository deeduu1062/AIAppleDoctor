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

// Twilio: balance, account type and this month's spend. Needs in Vercel → Environment Variables:
//   TWILIO_ACCOUNT_SID (starts with AC...) and TWILIO_AUTH_TOKEN, both from console.twilio.com → Account Info.
// Or, instead of the Auth Token, a Standard API key: TWILIO_API_KEY (starts with SK...) and TWILIO_API_SECRET.
// Each lookup runs on its own, so one refused lookup (e.g. a restricted key without Usage access) doesn't hide the rest.
function twilioWhy(status, body) {
  let code = 0; try { code = +JSON.parse(body).code || 0; } catch (e) {}
  if (status === 401 && code === 20003) return "auth";   // wrong SID / token / key
  if (status === 401 || status === 403) return "perm";   // e.g. 8011 "no requested permission": the key can't read this
  if (status === 404) return "sid";                       // Account SID not found
  if (status === 429) return "busy";
  return "other";
}
async function twilioUse(sid, tok, keySid) {
  const base = "https://api.twilio.com/2010-04-01/Accounts/" + encodeURIComponent(sid);
  const h = { Authorization: "Basic " + Buffer.from((keySid || sid) + ":" + tok).toString("base64") };
  const get = async (what, p) => {
    const r = await fetch(base + p, { headers: h });
    if (!r.ok) {
      const t = await r.text().catch(() => "");
      const e = new Error("Twilio " + r.status + (t ? ": " + t.slice(0, 200) : ""));
      e.what = what; e.why = twilioWhy(r.status, t); throw e;
    }
    return r.json();
  };
  const parts = await Promise.allSettled([
    get("account", ".json"), get("balance", "/Balance.json"),
    get("usage", "/Usage/Records/ThisMonth.json?PageSize=1000"), get("usage", "/Usage/Records/Today.json?Category=totalprice")
  ]);
  const val = i => parts[i].status === "fulfilled" ? parts[i].value : null;
  const errors = [];
  parts.forEach(p => {
    if (p.status !== "rejected") return;
    const w = p.reason && p.reason.what || "other";
    if (!errors.some(x => x.what === w)) errors.push({ what: w, why: p.reason && p.reason.why || "other", raw: String(p.reason && p.reason.message || p.reason) });
  });
  if (errors.length && (parts.every(p => p.status === "rejected") || errors.every(x => x.why === "auth")))
    return { setup: true, error: errors[0].raw, errors, via: keySid ? "key" : "token" };
  const acc = val(0) || {}, bal = val(1), mon = val(2), day = val(3);
  const recs = mon ? mon.usage_records || [] : [], tot = recs.find(x => x.category === "totalprice");
  // the main lines: skip roll-up totals and anything with no use
  const ROLLUP = /^(totalprice|sms|mms|calls|phonenumbers|recordings|transcriptions|channels|verify)$/;
  const items = recs.filter(x => !ROLLUP.test(x.category) && (+x.price > 0 || +x.count > 0))
    .map(x => ({ cat: x.category, desc: x.description, count: +x.count || 0, unit: x.count_unit || "", price: +x.price || 0 }))
    .sort((a, b) => b.price - a.price || b.count - a.count).slice(0, 8);
  const dt = day ? (day.usage_records || [])[0] : null;
  return {
    setup: true, type: acc.type || "", status: acc.status || "", via: keySid ? "key" : "token",
    balance: bal && bal.balance != null ? +bal.balance : null, currency: (bal && bal.currency) || (tot && tot.price_unit) || "USD",
    month: mon ? (tot ? +tot.price || 0 : 0) : null, today: day ? (dt ? +dt.price || 0 : 0) : null, items: mon ? items : null,
    errors
  };
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
  const tsid = process.env.TWILIO_ACCOUNT_SID, tkey = process.env.TWILIO_API_KEY, tsec = process.env.TWILIO_API_SECRET;
  const useKey = !!(tkey && tsec), ttok = useKey ? tsec : process.env.TWILIO_AUTH_TOKEN;
  let twilio = { setup: false };
  if (tsid && ttok) { try { twilio = await twilioUse(tsid, ttok, useKey ? tkey : ""); } catch (e) { twilio = { setup: true, error: String(e && e.message || e) }; } }
  return send(res, 200, { ai, twilio, at: new Date().toISOString() });
};
