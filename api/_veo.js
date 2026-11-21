// Seb Saathi — AI video clips with Google's video model (admin page, Social handler → Create → Video → "AI video (Google)").
// Reached as /api/social?fn=veo (Vercel Hobby allows at most 12 functions).
// Google shut down the old Veo preview models in the Gemini API (Oct 2026); its replacement there is Gemini Omni Flash
// (gemini-omni-1.1-flash), the same family of video model as Google Flow. Override with GEMINI_VIDEO_MODEL if Google renames it.
//
// POST { prompt: "…", aspect: "9:16" | "16:9", image: { data: "<base64>", mime: "image/jpeg" } (optional start picture) }
//   → { url: "<public link to the MP4 in the Supabase 'library' bucket>", bytes, model }
//   or { error: "no_key" | "blocked" | "google" | …, message }
// Header: Authorization: Bearer <Supabase access token of an admin> (checked with public.is_admin()).
//
// Needs in Vercel → Settings → Environment Variables (then Redeploy):
//   GEMINI_API_KEY   from aistudio.google.com → Get API key. Video needs billing turned on for that key's Google project.

const SB_URL = "https://rylqzyylbsephirwslce.supabase.co";
const SB_KEY = "sb_publishable_EYVtP0ljYd-jta5ENmX9Jg_mCtYLzJo"; // public key, same as the website
const G = "https://generativelanguage.googleapis.com/v1beta";

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
  for await (const c of req) { raw += c; if (raw.length > 4400000) break; }
  try { return JSON.parse(raw || "{}"); } catch (e) { return {}; }
}
const tokenOf = req => { const a = String(req.headers.authorization || ""); return a.startsWith("Bearer ") ? a.slice(7) : ""; };
async function isAdmin(token) {
  if (!token) return false;
  const r = await fetch(SB_URL + "/rest/v1/rpc/is_admin", { method: "POST", headers: { apikey: SB_KEY, Authorization: "Bearer " + token, "Content-Type": "application/json" }, body: "{}" });
  return r.ok && (await r.json()) === true;
}
/* the video part of Google's answer, wherever it sits (inline data or a download link) */
function findVideo(o, depth) {
  if (!o || typeof o !== "object" || (depth || 0) > 8) return null;
  const mt = String(o.mime_type || o.mimeType || "");
  if ((o.type === "video" || /^video\//.test(mt)) && (o.data || o.uri)) return { data: o.data || "", uri: o.uri || "" };
  for (const k of Object.keys(o)) { const f = findVideo(o[k], (depth || 0) + 1); if (f) return f; }
  return null;
}
const sleep = ms => new Promise(r => setTimeout(r, ms));

module.exports = async (req, res) => {
  if (req.method !== "POST") return send(res, 405, { error: "method" });
  const token = tokenOf(req);
  try { if (!(await isAdmin(token))) return send(res, 403, { error: "admin" }); } catch (e) { return send(res, 502, { error: "auth_down" }); }
  const key = process.env.GEMINI_API_KEY || process.env.GOOGLE_AI_KEY || "";
  if (!key) return send(res, 200, { error: "no_key" });
  const b = await readBody(req);
  const prompt = String(b.prompt || "").replace(/\s+/g, " ").trim().slice(0, 2000);
  if (prompt.length < 5) return send(res, 400, { error: "empty" });
  const aspect = b.aspect === "16:9" ? "16:9" : "9:16";
  const img = b.image && typeof b.image.data === "string" && b.image.data.length > 100 ? { data: b.image.data.replace(/^data:[^,]+,/, ""), mime: /^image\/(png|jpeg|webp)$/.test(b.image.mime) ? b.image.mime : "image/jpeg" } : null;
  const model = process.env.GEMINI_VIDEO_MODEL || "gemini-omni-1.1-flash";

  const body = {
    model,
    input: img ? [{ type: "image", data: img.data, mime_type: img.mime }, { type: "text", text: prompt }] : prompt,
    response_format: { type: "video", aspect_ratio: aspect, resolution: "720p", delivery: "uri" },
    background: false, store: true, stream: false   /* Google requires store=true when the video comes back as a download link */
  };
  let j;
  try {
    const r = await fetch(G + "/interactions", { method: "POST", headers: { "x-goog-api-key": key, "Content-Type": "application/json" }, body: JSON.stringify(body) });
    j = await r.json().catch(() => ({}));
    if (!r.ok) {
      const m = (j.error && j.error.message) || ("Google " + r.status);
      return send(res, 200, { error: /safety|blocked|policy|filter/i.test(m) ? "blocked" : (/billing|quota|exhaust|429/i.test(m + r.status) ? "quota" : "google"), message: m.slice(0, 400) });
    }
  } catch (e) { return send(res, 200, { error: "google", message: String(e.message || e).slice(0, 300) }); }

  const v = findVideo(j);
  if (!v) return send(res, 200, { error: "blocked", message: String(j.status || "No video came back. Google may have blocked this prompt; try different words.").slice(0, 300) });

  /* get the MP4 bytes */
  let buf;
  try {
    if (v.data) buf = Buffer.from(v.data, "base64");
    else {
      const id = (/\/files\/([^:/?]+)/.exec(v.uri) || [])[1];
      if (id) {   /* wait until Google says the file is ready (up to ~2 minutes) */
        for (let i = 0; i < 40; i++) {
          const f = await fetch(G + "/files/" + id, { headers: { "x-goog-api-key": key } }).then(x => x.json()).catch(() => ({}));
          const st = String(f.state || "");
          if (st === "ACTIVE" || !st) break;
          if (st === "FAILED") return send(res, 200, { error: "google", message: "Google could not finish the video." });
          await sleep(3000);
        }
      }
      const d = await fetch(v.uri, { headers: { "x-goog-api-key": key }, redirect: "follow" });
      if (!d.ok) return send(res, 200, { error: "google", message: "Could not download the video from Google (" + d.status + ")." });
      buf = Buffer.from(await d.arrayBuffer());
    }
  } catch (e) { return send(res, 200, { error: "google", message: String(e.message || e).slice(0, 300) }); }
  if (!buf || buf.length < 1000) return send(res, 200, { error: "google", message: "The video came back empty." });

  /* keep it in the library bucket (same place as the other Social handler videos), as the admin */
  const path = "social/" + new Date().toISOString().slice(0, 10) + "/veo-" + Math.random().toString(36).slice(2, 10) + ".mp4";
  try {
    const up = await fetch(SB_URL + "/storage/v1/object/library/" + path, {
      method: "POST", headers: { apikey: SB_KEY, Authorization: "Bearer " + token, "Content-Type": "video/mp4", "x-upsert": "false" }, body: buf
    });
    if (!up.ok) { const t = await up.text().catch(() => ""); return send(res, 200, { error: "storage", message: ("Saving the video failed: " + t).slice(0, 300) }); }
  } catch (e) { return send(res, 200, { error: "storage", message: String(e.message || e).slice(0, 300) }); }
  return send(res, 200, { url: SB_URL + "/storage/v1/object/public/library/" + path, path, bytes: buf.length, model });
};
