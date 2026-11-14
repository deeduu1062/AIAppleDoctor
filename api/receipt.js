// Seb Saathi — read an Adani produce receipt from a photo (Vercel serverless function)
// POST /api/receipt  { image: dataUrl or base64 jpeg/png/webp }
// Header: Authorization: Bearer <Supabase access token of the signed-in grower>
// Returns { receipt: { date, receipt_no, boxes, total_kg, total_value, lines: [{ grade, kg, rate, value }] } }
// Nothing is saved here: the grower checks the lines on the site and submits them as a sale.
//
// Needs in Vercel → Settings → Environment Variables:
//   ANTHROPIC_API_KEY   (required, same key as the photo check)
//   RECEIPT_MODEL       (optional, default below)

const SB_URL = "https://rylqzyylbsephirwslce.supabase.co";
const SB_KEY = "sb_publishable_EYVtP0ljYd-jta5ENmX9Jg_mCtYLzJo"; // public key, same as the website
const MODEL = process.env.RECEIPT_MODEL || process.env.ANTHROPIC_MODEL || "claude-sonnet-5-5";
const { logAi } = require("./_aicost");   /* saves each receipt reading's AI cost against the grower (admin → Costs) */

/* keep in step with ADANI_GRADES in index.html */
const GRADES = {
  ">80%": ["EL", "L+M", "S", "ES", "EES", "P2"],
  "60-80%": ["EL", "L+M", "S", "ES", "EES", "P2"],
  "<60%": ["EL2ES", "EES+P2"],
  "0-100%": ["EEL", "US", "ROL"]
};

const SYSTEM = `You read photos of Adani Agri Fresh "PRODUCE RECEIPT" slips given to apple growers in Himachal Pradesh. The photo may be sideways, upside down, angled or partly shadowed.

Each item line has an ITEM DESCRIPTION like "SHI APPLE RD >80% EL" or "SHI APPLE RD 60-80% L+M" or "SHI APPLE RD <60% EES+P2" or "SHI APPLE RD 0-100% ROL", then QTY (in Kgs), RATE (Rs./Kg) and VALUE (Rs.).
From the description take:
- "band": the colour band, exactly one of ">80%", "60-80%", "<60%", "0-100%"
- "size": the size code after it, exactly as printed (e.g. EL, L+M, S, ES, EES, P2, EL2ES, EES+P2, EEL, US, ROL)
- "variety": the variety letters before the band (e.g. "RD"), or "" if none

Return ONLY a JSON object, no other text:
{"is_receipt": true, "date": "YYYY-MM-DD or empty (the POSTING DATE)", "receipt_no": "RECEIPT NO as printed, or empty", "boxes": number of boxes received or 0, "total_kg": GRAND TOTAL qty or 0, "total_value": GRAND TOTAL value or 0,
 "lines": [{"band": "...", "size": "...", "variety": "...", "kg": number, "rate": number, "value": number}]}

Rules:
- One entry in "lines" per item row, in the printed order. Do not skip rows and do not add the grand total as a line.
- Numbers as plain numbers: no commas, no currency. Keep all decimals (e.g. 32.406, 2106.39).
- Read digits carefully. Check that kg × rate ≈ value on each row; if they disagree, look again at the digits.
- If the photo is not an Adani produce receipt or cannot be read, return {"is_receipt": false, "lines": []}.`;

function send(res, code, obj) {
  res.statusCode = code;
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(obj));
}
function parseJson(text) {
  const a = text.indexOf("{"), b = text.lastIndexOf("}");
  if (a < 0 || b <= a) return null;
  try { return JSON.parse(text.slice(a, b + 1)); } catch (e) { return null; }
}
const num = v => { const n = typeof v === "number" ? v : parseFloat(String(v || "").replace(/[^0-9.\-]/g, "")); return isFinite(n) && n > 0 ? Math.round(n * 1000) / 1000 : 0; };
const clip = (s, n) => String(s || "").replace(/[\u0000-\u001f<>]/g, "").trim().slice(0, n);
function band(s) {
  const t = String(s || "").replace(/\s+/g, "").replace(/[–—]/g, "-");
  if (/^>80/.test(t)) return ">80%";
  if (/^60-80/.test(t)) return "60-80%";
  if (/^<60/.test(t)) return "<60%";
  if (/^0-100/.test(t)) return "0-100%";
  return "";
}
function grade(l) {
  const b = band(l.band), z = String(l.size || "").toUpperCase().replace(/\s+/g, "");
  if (b && GRADES[b].includes(z)) return b + " " + z;
  return clip([b || clip(l.band, 10), z].filter(Boolean).join(" "), 30);   /* not in our list: keep as printed */
}

module.exports = async (req, res) => {
  if (req.method !== "POST") return send(res, 405, { error: "method" });

  const auth = String(req.headers.authorization || "");
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";
  if (!token) return send(res, 401, { error: "signin" });
  let uid = "";
  try {
    const u = await fetch(SB_URL + "/auth/v1/user", { headers: { apikey: SB_KEY, Authorization: "Bearer " + token } });
    if (!u.ok) return send(res, 401, { error: "signin" });
    uid = String((await u.json().catch(() => ({}))).id || "");
  } catch (e) { return send(res, 502, { error: "auth_down" }); }

  let body = req.body;
  if (typeof body === "string") { try { body = JSON.parse(body); } catch (e) { body = null; } }
  const m = /^(?:data:(image\/(?:jpeg|png|webp));base64,)?([A-Za-z0-9+/=]+)$/.exec(String((body && body.image) || ""));
  if (!m || m[2].length > 3000000) return send(res, 400, { error: "photo" });
  if (!process.env.ANTHROPIC_API_KEY) return send(res, 503, { error: "not_setup" });

  let out;
  try {
    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "x-api-key": process.env.ANTHROPIC_API_KEY, "anthropic-version": "2023-06-01", "content-type": "application/json" },
      body: JSON.stringify({ model: MODEL, max_tokens: 3000, system: SYSTEM,
        messages: [{ role: "user", content: [
          { type: "image", source: { type: "base64", media_type: m[1] || "image/jpeg", data: m[2] } },
          { type: "text", text: "Read this receipt and return the JSON." }] }] })
    });
    if (!r.ok) { console.error("receipt-ai", r.status, await r.text()); return send(res, 502, { error: "ai" }); }
    const j = await r.json();
    await logAi(token, uid, "receipt", j.model || MODEL, j.usage);
    out = parseJson((j.content || []).filter(b => b.type === "text").map(b => b.text).join(""));
  } catch (e) { console.error("receipt-fail", e); return send(res, 502, { error: "ai" }); }

  if (!out || out.is_receipt === false || !Array.isArray(out.lines) || !out.lines.length) return send(res, 422, { error: "unreadable" });
  const lines = out.lines.slice(0, 40).map(l => {
    const kg = num(l.kg), rate = num(l.rate), value = num(l.value);
    return { grade: grade(l), variety: clip(l.variety, 10), kg, rate, value, check: !!(kg && rate && value && Math.abs(kg * rate - value) > Math.max(2, value * 0.01)) };
  }).filter(l => l.kg || l.rate);
  if (!lines.length) return send(res, 422, { error: "unreadable" });
  const date = /^\d{4}-\d{2}-\d{2}$/.test(String(out.date || "")) ? out.date : "";
  return send(res, 200, { receipt: { date, receipt_no: clip(out.receipt_no, 30), boxes: num(out.boxes), total_kg: num(out.total_kg), total_value: num(out.total_value), lines } });
};
