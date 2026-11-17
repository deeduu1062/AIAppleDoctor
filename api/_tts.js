// Seb Saathi — voice-over for the one-tap video (admin page). Reached as /api/social?fn=tts (Vercel Hobby allows at most 12 functions).
// POST { texts: ["…", …] (up to 8, each up to 300 characters), lang: "hi" | "hn" | "en", voice: "f" | "m" }
//   → { audio: ["<base64 MP3>", …] }   or { error: "no_tts_key" } when it is not set up
// Header: Authorization: Bearer <Supabase access token of an admin> (checked with public.is_admin()).
//
// Needs in Vercel → Settings → Environment Variables (then Redeploy):
//   SARVAM_API_KEY   (optional) from dashboard.sarvam.ai → API keys. Lets the video maker use Sarvam's Bulbul v3 voices
//                    (POST { …, engine: "sarvam", speaker: "priya" }). If Sarvam fails, the Google voice is used and
//                    the answer says why in "fell_back".
//   GOOGLE_TTS_KEY   an API key from Google Cloud (console.cloud.google.com → APIs & Services → Credentials → Create API key),
//                    with "Cloud Text-to-Speech API" turned on (APIs & Services → Library). Best: restrict the key to that one API.
// Hindi and Hinglish videos use a Hindi voice (the AI writes the spoken lines in Devanagari); English uses an Indian English voice.

const SB_URL = "https://rylqzyylbsephirwslce.supabase.co";
const SB_KEY = "sb_publishable_EYVtP0ljYd-jta5ENmX9Jg_mCtYLzJo"; // public key, same as the website
/* Chirp 3 HD voices sound like a real person talking; the older Neural2 voices are kept as a fallback if Google refuses a Chirp voice */
const VOICES = { hi: { f: "hi-IN-Chirp3-HD-Kore", m: "hi-IN-Chirp3-HD-Charon" }, en: { f: "en-IN-Chirp3-HD-Kore", m: "en-IN-Chirp3-HD-Charon" } };
const OLD_VOICES = { hi: { f: "hi-IN-Neural2-A", m: "hi-IN-Neural2-B" }, en: { f: "en-IN-Neural2-A", m: "en-IN-Neural2-B" } };

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
  for await (const c of req) { raw += c; if (raw.length > 20000) break; }
  try { return JSON.parse(raw || "{}"); } catch (e) { return {}; }
}
async function isAdmin(req) {
  const auth = String(req.headers.authorization || "");
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";
  if (!token) return false;
  const r = await fetch(SB_URL + "/rest/v1/rpc/is_admin", { method: "POST", headers: { apikey: SB_KEY, Authorization: "Bearer " + token, "Content-Type": "application/json" }, body: "{}" });
  return r.ok && (await r.json()) === true;
}

module.exports = async (req, res) => {
  if (req.method !== "POST") return send(res, 405, { error: "method" });
  try { if (!(await isAdmin(req))) return send(res, 403, { error: "admin" }); } catch (e) { return send(res, 502, { error: "auth_down" }); }
  const b = await readBody(req);
  const texts = (Array.isArray(b.texts) ? b.texts : []).slice(0, 8).map(x => String(x || "").replace(/\s+/g, " ").trim().slice(0, 300));
  if (!texts.some(Boolean)) return send(res, 400, { error: "empty" });
  const lg = b.lang === "en" ? "en" : "hi", who = b.voice === "m" ? "m" : "f";
  const say = async (text, name) => {
    const r = await fetch("https://texttospeech.googleapis.com/v1/text:synthesize?key=" + encodeURIComponent(key), {
      method: "POST", headers: { "Content-Type": "application/json" },
      /* normal speed: the slower pace made it sound flat */
      body: JSON.stringify({ input: { text }, voice: { languageCode: lg === "en" ? "en-IN" : "hi-IN", name }, audioConfig: { audioEncoding: "MP3", speakingRate: 1.0, sampleRateHertz: 24000 } })
    });
    const j = await r.json().catch(() => ({}));
    if (!r.ok) { const e = new Error((j.error && j.error.message) || ("google " + r.status)); e.status = r.status; throw e; }
    return j.audioContent || "";
  };
  const all = name => Promise.all(texts.map(text => (text ? say(text, name) : "")));
  /* Sarvam (Bulbul v3): Indian voices with more feeling; a little faster and livelier than its default */
  let fellBack = "";
  if (b.engine === "sarvam") {
    const sk = process.env.SARVAM_API_KEY;
    if (!sk) fellBack = "no_key";
    else {
      const spk = /^[a-z]{2,12}$/.test(String(b.speaker || "")) ? String(b.speaker) : (who === "m" ? "shubh" : "priya");
      const sv = async text => {
        const r = await fetch("https://api.sarvam.ai/text-to-speech", {
          method: "POST", headers: { "api-subscription-key": sk, "Content-Type": "application/json" },
          body: JSON.stringify({ text, target_language_code: lg === "en" ? "en-IN" : "hi-IN", model: "bulbul:v3", speaker: spk, pace: 1.05, temperature: 0.8, output_audio_codec: "mp3", speech_sample_rate: 24000 })
        });
        const j = await r.json().catch(() => ({}));
        if (!r.ok || !Array.isArray(j.audios)) throw new Error((j.error && (j.error.message || j.error.code)) || j.message || ("sarvam " + r.status));
        return j.audios.join("");
      };
      try { const audio = await Promise.all(texts.map(t => (t ? sv(t) : ""))); return send(res, 200, { audio, voice: "sarvam:" + spk }); }
      catch (e) { fellBack = String(e.message || e).slice(0, 200); }
    }
  }
  const key = process.env.GOOGLE_TTS_KEY;   /* Google: the built-in voice, and the fallback when Sarvam fails */
  if (!key) return send(res, 200, Object.assign({ error: "no_tts_key" }, fellBack ? { fell_back: fellBack } : {}));
  let v = VOICES[lg][who];
  try {
    let audio;
    try { audio = await all(v); }
    catch (e) { if (e.status === 403) throw e; v = OLD_VOICES[lg][who]; audio = await all(v); }   /* Chirp voice not available: use the older voice */
    return send(res, 200, Object.assign({ audio, voice: v }, fellBack ? { fell_back: fellBack } : {}));
  } catch (e) {
    return send(res, 200, { error: e.status === 403 || e.status === 400 ? "tts_key" : "tts", detail: String(e.message || e).slice(0, 300) });
  }
};
