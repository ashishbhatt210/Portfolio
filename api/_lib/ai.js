// Shared AI helper — Groq (OpenAI-compatible API) via native fetch.
// Keeps the same `complete()` / `streamComplete()` shape as the previous Claude
// helper so /api/*.js endpoints don't change beyond the import line.
//
// Default model: llama-3.3-70b-versatile — fast, good quality for chat + structured
// outputs, free tier on Groq.

const DEFAULT_MODEL = process.env.GROQ_MODEL || "llama-3.3-70b-versatile";
const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

function getApiKey() {
  const key = process.env.GROQ_API_KEY;
  if (!key) throw new Error("GROQ_API_KEY is not set");
  return key;
}

// Map our (Anthropic-style) { system, messages } to OpenAI-format messages.
// `system` becomes the first { role: "system" } message; user/assistant pass through.
function toOpenAIMessages(system, messages) {
  const out = [];
  if (system) out.push({ role: "system", content: String(system) });
  for (const m of messages || []) {
    out.push({ role: m.role, content: String(m.content || "") });
  }
  return out;
}

async function postGroq({ stream, model, system, messages, maxTokens, temperature }) {
  const body = {
    model,
    messages: toOpenAIMessages(system, messages),
    max_tokens: maxTokens,
    temperature,
    stream: !!stream,
  };
  const response = await fetch(GROQ_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getApiKey()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    const text = await response.text().catch(() => "");
    const err = new Error(`Groq API ${response.status}: ${text || response.statusText}`);
    err.status = response.status;
    throw err;
  }
  return response;
}

/** Single-shot completion. Returns the assistant's text. */
export async function complete({
  system,
  messages,
  maxTokens = 1024,
  model = DEFAULT_MODEL,
  temperature = 0.7,
}) {
  const response = await postGroq({
    stream: false,
    model,
    system,
    messages,
    maxTokens,
    temperature,
  });
  const data = await response.json();
  return data?.choices?.[0]?.message?.content || "";
}

/**
 * Stream the response via SSE. Writes `data: {"delta": "..."}\n\n` events to res,
 * then `data: [DONE]\n\n`. Groq returns OpenAI-style SSE chunks; we parse them
 * and re-emit only the delta text so the frontend stream contract stays unchanged.
 */
export async function streamComplete({
  system,
  messages,
  res,
  maxTokens = 600,
  model = DEFAULT_MODEL,
  temperature = 0.7,
}) {
  const response = await postGroq({
    stream: true,
    model,
    system,
    messages,
    maxTokens,
    temperature,
  });

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });

    // Process complete lines; keep trailing partial in buffer
    const lines = buffer.split("\n");
    buffer = lines.pop() || "";

    for (const raw of lines) {
      const line = raw.trim();
      if (!line || !line.startsWith("data: ")) continue;
      const payload = line.slice(6);
      if (payload === "[DONE]") {
        res.write("data: [DONE]\n\n");
        res.end();
        return;
      }
      try {
        const parsed = JSON.parse(payload);
        const delta = parsed?.choices?.[0]?.delta?.content;
        if (delta) {
          res.write(`data: ${JSON.stringify({ delta })}\n\n`);
        }
      } catch {
        // ignore parse errors on partial / keepalive chunks
      }
    }
  }

  res.write("data: [DONE]\n\n");
  res.end();
}

export function setCors(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

export function handleError(res, error) {
  console.error("[api error]", error);
  const status = error?.status || 500;
  res.status(status).json({
    error: error?.message || "Internal server error",
  });
}
