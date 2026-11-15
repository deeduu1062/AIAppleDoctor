// Seb Saathi — AI safety switch for Free-plan growers (admin → Site health; supabase/site_ops.sql).
// freePaused(sbUrl, headers, "dx" | "chat") → true when the admin paused it, or the monthly AI limit is reached.
// If the switch is not set up yet, or the check fails, it never blocks (returns false).
async function freePaused(sbUrl, headers, kind) {
  try {
    const r = await fetch(sbUrl + "/rest/v1/rpc/free_ai_paused", {
      method: "POST", headers: Object.assign({ "Content-Type": "application/json" }, headers), body: JSON.stringify({ kind })
    });
    if (!r.ok) return false;
    return (await r.json()) === true;
  } catch (e) { return false; }
}
// Plan limits set on the admin page (Payments → Plans & prices; supabase/money.sql).
// planLimit(sbUrl, headers, "free" | "basic" | "premium", "dx" | "q", fallback) → the number to use. Kept for a minute.
let setCache = null, setAt = 0;
async function planLimit(sbUrl, headers, plan, key, fallback) {
  try {
    if (!setCache || Date.now() - setAt > 60000) {
      const r = await fetch(sbUrl + "/rest/v1/plan_settings?select=data&id=eq.1", { headers });
      const rows = r.ok ? await r.json() : null;
      setCache = rows && rows[0] && rows[0].data ? rows[0].data : {}; setAt = Date.now();
    }
    const v = setCache.limits && setCache.limits[plan] ? setCache.limits[plan][key] : undefined;
    return Number.isInteger(v) && v >= 0 ? v : fallback;
  } catch (e) { return fallback; }
}
module.exports = { freePaused, planLimit };
