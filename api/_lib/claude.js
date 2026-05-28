// Shared Claude API helper.
// Used by every /api/* endpoint so new AI features stay one-file-thin.
import Anthropic from "@anthropic-ai/sdk";

const DEFAULT_MODEL = process.env.CLAUDE_MODEL || "claude-sonnet-4-5";

let _client = null;
function getClient() {
  if (!_client) {
    if (!process.env.ANTHROPIC_API_KEY) {
      throw new Error("ANTHROPIC_API_KEY is not set");
    }
    _client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  }
  return _client;
}

/**
 * Call Claude with a system prompt and user message.
 * Returns the concatenated text content.
 */
export async function complete({
  system,
  messages,
  maxTokens = 1024,
  model = DEFAULT_MODEL,
  temperature = 0.7,
}) {
  const client = getClient();
  const response = await client.messages.create({
    model,
    max_tokens: maxTokens,
    temperature,
    system,
    messages,
  });
  return response.content
    .filter((b) => b.type === "text")
    .map((b) => b.text)
    .join("\n");
}

/**
 * Stream Claude response via SSE. Writes `data: {...}\n\n` events to res,
 * then terminates with `data: [DONE]\n\n`.
 */
export async function streamComplete({
  system,
  messages,
  res,
  maxTokens = 600,
  model = DEFAULT_MODEL,
  temperature = 0.7,
}) {
  const client = getClient();
  const stream = client.messages.stream({
    model,
    max_tokens: maxTokens,
    temperature,
    system,
    messages,
  });

  stream.on("text", (text) => {
    res.write(`data: ${JSON.stringify({ delta: text })}\n\n`);
  });

  await stream.finalMessage();
  res.write("data: [DONE]\n\n");
  res.end();
}

/**
 * Standard CORS + JSON helper for Vercel serverless handlers.
 */
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
