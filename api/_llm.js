// Seb Saathi — one place that asks the AI, so Saathi chat and the photo check can use Google Gemini or Anthropic Claude.
// The file name starts with "_" so Vercel does not make it a function of its own.
//
// Which AI (Vercel → Settings → Environment Variables, then Redeploy):
//   AI_PROVIDER         "gemini" or "claude". If not set: Gemini when GEMINI_API_KEY is set, otherwise Claude.
//   GEMINI_API_KEY      from aistudio.google.com → Get API key (same key as the admin AI video box)
//   GEMINI_CHAT_MODEL   optional, default gemini-3.1-flash-lite (Saathi chat: fast and cheap)
//   GEMINI_DX_MODEL     optional, default gemini-3.8-flash (photo check: better at reading photos)
//   ANTHROPIC_API_KEY   for Claude (kept as the fallback: if Gemini fails and this key is set, Claude answers instead)
//
// ask() takes Anthropic-style input (system as text or text blocks, messages with text/image blocks) and returns an
// Anthropic-style reply { content:[{type:"text",text}], model, usage:{input_tokens, output_tokens} }, so the callers and
// the cost log (_aicost.js) work the same whichever AI answered.

const GEMINI_DEFAULT = { chat: "gemini-3.1-flash-lite", dx: "gemini-3.8-flash" };

function provider() {
  const p = String(process.env.AI_PROVIDER || "").toLowerCase();
  if (p === "claude" || p === "anthropic") return process.env.ANTHROPIC_API_KEY ? "claude" : (process.env.GEMINI_API_KEY ? "gemini" : "");
  if (p === "gemini" || p === "google") return process.env.GEMINI_API_KEY ? "gemini" : (process.env.ANTHROPIC_API_KEY ? "claude" : "");
  return process.env.GEMINI_API_KEY ? "gemini" : (process.env.ANTHROPIC_API_KEY ? "claude" : "");
}
const ready = () => !!provider();

const sysText = system => typeof system === "string" ? system : (system || []).map(b => b && b.text || "").filter(Boolean).join("\n\n");

async function askClaude(o) {
  const r = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "x-api-key": process.env.ANTHROPIC_API_KEY, "anthropic-version": "2023-06-01", "content-type": "application/json" },
    body: JSON.stringify({ model: o.claudeModel, max_tokens: o.max_tokens, system: o.system, messages: o.messages })
  });
  if (!r.ok) throw new Error("claude " + r.status + " " + (await r.text()).slice(0, 300));
  const j = await r.json();
  return { content: j.content || [], model: j.model || o.claudeModel, usage: j.usage, provider: "claude" };
}

function toGemini(messages) {
  return (messages || []).map(m => {
    const c = typeof m.content === "string" ? [{ type: "text", text: m.content }] : (m.content || []);
    const parts = c.map(b => b.type === "image" && b.source ? { inline_data: { mime_type: b.source.media_type, data: b.source.data } }
      : { text: String(b.text || "") }).filter(p => p.inline_data || p.text);
    return { role: m.role === "assistant" ? "model" : "user", parts: parts.length ? parts : [{ text: " " }] };
  });
}
async function askGemini(o) {
  const model = o.geminiModel || GEMINI_DEFAULT[o.kind] || GEMINI_DEFAULT.chat;
  const body = {
    system_instruction: { parts: [{ text: sysText(o.system) }] },
    contents: toGemini(o.messages),
    generationConfig: Object.assign({ maxOutputTokens: o.max_tokens + 4096, thinkingConfig: { thinkingLevel: "low" } }, o.json ? { responseMimeType: "application/json" } : {})
  };
  const call = b => fetch("https://generativelanguage.googleapis.com/v1beta/models/" + encodeURIComponent(model) + ":generateContent", {
    method: "POST", headers: { "x-goog-api-key": process.env.GEMINI_API_KEY, "Content-Type": "application/json" }, body: JSON.stringify(b)
  });
  let r = await call(body);
  if (r.status === 400) {   /* an older model that does not know the thinking setting: ask again without it */
    const t = await r.text();
    if (/thinking/i.test(t)) { delete body.generationConfig.thinkingConfig; r = await call(body); }
    else throw new Error("gemini 400 " + t.slice(0, 300));
  }
  if (!r.ok) throw new Error("gemini " + r.status + " " + (await r.text()).slice(0, 300));
  const j = await r.json();
  const cand = (j.candidates || [])[0] || {};
  const text = ((cand.content || {}).parts || []).filter(p => typeof p.text === "string" && !p.thought).map(p => p.text).join("").trim();
  if (!text) throw new Error("gemini empty (" + (cand.finishReason || (j.promptFeedback || {}).blockReason || "no text") + ")");
  const u = j.usageMetadata || {};
  return { content: [{ type: "text", text }], model: j.modelVersion || model, provider: "gemini",
    usage: { input_tokens: +u.promptTokenCount || 0, output_tokens: (+u.candidatesTokenCount || 0) + (+u.thoughtsTokenCount || 0), cache_read_input_tokens: 0, cache_creation_input_tokens: 0 } };
}

/* o = { kind: "chat" | "dx", system, messages, max_tokens, claudeModel, geminiModel?, json? } */
async function ask(o) {
  const p = provider();
  if (!p) throw new Error("no AI key");
  if (p === "gemini") {
    const gm = o.kind === "dx" ? process.env.GEMINI_DX_MODEL : process.env.GEMINI_CHAT_MODEL;
    try { return await askGemini(Object.assign({}, o, { geminiModel: gm || undefined })); }
    catch (e) {
      console.error("gemini-fail", String(e.message || e));
      if (process.env.ANTHROPIC_API_KEY) return askClaude(o);   /* keep growers answered if Google has a bad moment */
      throw e;
    }
  }
  return askClaude(o);
}

module.exports = { ask, ready, provider };
