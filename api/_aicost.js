// Seb Saathi — what each AI call costs, saved per grower (table "ai_usage", supabase/ai_usage.sql).
// Used by chat.js, diagnose.js and receipt.js. The file name starts with "_" so Vercel does not make it a page of its own.
//
// Prices are US dollars per million tokens (Anthropic price list, November 2026).
// If Anthropic changes a price, change it here, or set AI_PRICES in Vercel as JSON, e.g.
//   {"claude-sonnet-5-5":{"in":2,"out":10,"cr":0.1,"cw":2.5}}

const SB_URL = "https://rylqzyylbsephirwslce.supabase.co";
const SB_KEY = "sb_publishable_EYVtP0ljYd-jta5ENmX9Jg_mCtYLzJo"; // public key, same as the website

const PRICES = {
  "claude-sonnet-5-5": { in: 2, out: 10, cr: 0.1, cw: 2.5 },
  "claude-haiku-5-5":  { in: 0.1, out: 0.5, cr: 0.01, cw: 0.125, long: 5 },   /* prompts over 100,000 tokens cost 5 times more */
  "claude-opus-5-5":   { in: 4, out: 20, cr: 0.2, cw: 5 },
  "claude-haiku-4-5":  { in: 1, out: 5, cr: 0.1, cw: 1.25 }
};
try { if (process.env.AI_PRICES) Object.assign(PRICES, JSON.parse(process.env.AI_PRICES)); } catch (e) { console.error("AI_PRICES is not valid JSON"); }

function priceOf(model) {
  const m = String(model || "");
  if (PRICES[m]) return PRICES[m];
  const k = Object.keys(PRICES).find(p => m.startsWith(p));   /* dated names like claude-haiku-4-5-20251001 */
  if (k) return PRICES[k];
  return /haiku/.test(m) ? PRICES["claude-haiku-5-5"] : /opus/.test(m) ? PRICES["claude-opus-5-5"] : PRICES["claude-sonnet-5-5"];
}

/* usage = the "usage" block of an Anthropic reply */
function costUsd(model, usage) {
  const u = usage || {}, p = priceOf(model);
  const inp = +u.input_tokens || 0, out = +u.output_tokens || 0, cr = +u.cache_read_input_tokens || 0, cw = +u.cache_creation_input_tokens || 0;
  const x = p.long && inp + cr + cw > 100000 ? p.long : 1;
  return ((inp * p.in + out * p.out + cr * p.cr + cw * p.cw) * x) / 1e6;
}

/* Save one AI call against the grower. Never throws: a failed save must not spoil the grower's answer. */
async function logAi(token, userId, feature, model, usage) {
  if (!token || !userId || !usage) return;
  const u = usage;
  const row = { user_id: userId, feature, model: String(model || "").slice(0, 60),
    in_tok: +u.input_tokens || 0, out_tok: +u.output_tokens || 0, cache_read: +u.cache_read_input_tokens || 0, cache_write: +u.cache_creation_input_tokens || 0,
    cost_usd: +costUsd(model, u).toFixed(6) };
  try {
    const r = await fetch(SB_URL + "/rest/v1/ai_usage", {
      method: "POST",
      headers: { apikey: SB_KEY, Authorization: "Bearer " + token, "Content-Type": "application/json", Prefer: "return=minimal" },
      body: JSON.stringify(row)
    });
    if (!r.ok) console.error("ai_usage", r.status, (await r.text()).slice(0, 200));
  } catch (e) { console.error("ai_usage-fail", e); }
}

module.exports = { PRICES, costUsd, logAi };
