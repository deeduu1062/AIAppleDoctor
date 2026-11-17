// Seb Saathi — a free stock video clip for the video maker (admin page). Reached as /api/social?fn=clip
//
// POST { q: "apple orchard rain", orient: "portrait"|"landscape"|"square", skip: ["pexels id", ...] }
//   → { url, ext_id, label, bytes, credit } : the clip is copied into Seb Saathi's own storage (library/clips/),
//     so the browser can draw it into the video (a clip straight from another site can't be recorded).
//
// Vercel → Settings → Environment Variables:
//   PEXELS_API_KEY             free, from pexels.com/api (needs a free Pexels account)
//   SUPABASE_SERVICE_ROLE_KEY  already set (saves the copy in storage)
// Without PEXELS_API_KEY the answer is { error: "no_pexels_key" } and the video maker uses drawn pictures.

const SB_URL = "https://rylqzyylbsephirwslce.supabase.co";
const SB_KEY = "sb_publishable_EYVtP0ljYd-jta5ENmX9Jg_mCtYLzJo";
const MAX_BYTES = 12 * 1024 * 1024;

function send(res, code, obj) {
  res.statusCode = code;
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(obj));
}
async function readBody(req) {
  if (req.body && typeof req.body === "object") return req.body;
  if (typeof req.body === "string") { try { return JSON.parse(req.body); } catch (e) { return {}; } }
  let raw = ""; for await (const c of req) raw += c;
  try { return JSON.parse(raw || "{}"); } catch (e) { return {}; }
}
async function isAdmin(req) {
  const auth = String(req.headers.authorization || "");
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";
  if (!token) return false;
  const r = await fetch(SB_URL + "/rest/v1/rpc/is_admin", { method: "POST", headers: { apikey: SB_KEY, Authorization: "Bearer " + token, "Content-Type": "application/json" }, body: "{}" });
  return r.ok && (await r.json()) === true;
}
/* the smallest mp4 that is still sharp enough for a phone video (about 540–1080 pixels on the short side) */
function pickFile(v, orient) {
  const short = f => Math.min(f.width || 0, f.height || 0);
  const files = (v.video_files || []).filter(f => /mp4/.test(f.file_type || "") && f.link && short(f) >= 480);
  files.sort((a, b) => short(a) - short(b));
  return files.find(f => short(f) >= 540 && short(f) <= 1080) || files[0] || null;
}

module.exports = async (req, res) => {
  if (req.method !== "POST") return send(res, 405, { error: "method" });
  try { if (!(await isAdmin(req))) return send(res, 403, { error: "admin" }); } catch (e) { return send(res, 502, { error: "auth_down" }); }
  const key = process.env.PEXELS_API_KEY, svc = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!key) return send(res, 200, { error: "no_pexels_key" });
  if (!svc) return send(res, 200, { error: "no_service_key" });
  const b = await readBody(req);
  const q = String(b.q || "").replace(/[^\p{L}\p{N} ,'-]/gu, " ").replace(/\s+/g, " ").trim().slice(0, 80);
  if (!q) return send(res, 400, { error: "empty" });
  const orient = ["portrait", "landscape", "square"].indexOf(b.orient) >= 0 ? b.orient : "portrait";
  const skip = new Set((Array.isArray(b.skip) ? b.skip : []).map(String).slice(0, 200));
  try {
    const s = await fetch("https://api.pexels.com/videos/search?per_page=15&size=medium&orientation=" + orient + "&query=" + encodeURIComponent(q), { headers: { Authorization: key } });
    if (!s.ok) return send(res, 200, { error: "pexels " + s.status });
    const j = await s.json();
    const vids = (j.videos || []).filter(v => !skip.has(String(v.id)) && (v.duration || 0) >= 4 && (v.duration || 0) <= 40);
    for (const v of vids) {
      const f = pickFile(v, orient); if (!f) continue;
      const d = await fetch(f.link);
      if (!d.ok) continue;
      const buf = Buffer.from(await d.arrayBuffer());
      if (buf.length > MAX_BYTES) continue;
      const path = "clips/pexels-" + v.id + "-" + Math.min(f.width, f.height) + ".mp4";
      const up = await fetch(SB_URL + "/storage/v1/object/library/" + path, {
        method: "POST", headers: { Authorization: "Bearer " + svc, apikey: svc, "Content-Type": "video/mp4", "x-upsert": "true", "Cache-Control": "31536000" }, body: buf
      });
      if (!up.ok) return send(res, 200, { error: "storage " + up.status + " " + (await up.text()).slice(0, 120) });
      const label = String(v.url || "").replace(/^.*\/video\//, "").replace(/-\d+\/?$/, "").replace(/-/g, " ").slice(0, 160) || q;
      return send(res, 200, { url: SB_URL + "/storage/v1/object/public/library/" + path, ext_id: String(v.id), label, bytes: buf.length,
        credit: (v.user && v.user.name) ? "Video by " + v.user.name + " on Pexels" : "Pexels" });
    }
    return send(res, 200, { error: "none" });
  } catch (e) { return send(res, 200, { error: String(e.message || e).slice(0, 200) }); }
};
