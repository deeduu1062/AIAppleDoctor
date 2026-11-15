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
module.exports = { freePaused };
