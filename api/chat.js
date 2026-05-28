// POST /api/chat
// Body: { messages: [{ role: 'user' | 'assistant', content: string }] }
// Returns SSE stream (Accept: text/event-stream) or { reply: string } fallback.
import { complete, streamComplete, setCors, handleError } from "./_lib/claude.js";
import { RESUME_CONTEXT } from "./_lib/resume-context.js";

export default async function handler(req, res) {
  setCors(res);
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { messages } = req.body || {};
    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: "messages array is required" });
    }

    const trimmed = messages.slice(-12).map((m) => ({
      role: m.role === "user" ? "user" : "assistant",
      content: String(m.content || "").slice(0, 2000),
    }));

    const system = `You are an AI assistant representing Ashish Bhatt on his portfolio site. Speak in third person about Ashish ("Ashish has...", "He built..."). You are friendly, concise, and grounded ONLY in his resume below. If asked something not in the resume, say so politely and offer to share what is documented or suggest reaching out at bhattashish210@gmail.com.

Style rules:
- Keep responses short and conversational — typically 2-4 sentences.
- Cite specific projects, technologies, and metrics when relevant.
- Never invent facts beyond the resume.
- If a question is hostile or off-topic, redirect gracefully back to Ashish's professional work.

RESUME:
${RESUME_CONTEXT}`;

    const wantsStream = req.headers.accept?.includes("text/event-stream");

    if (wantsStream) {
      res.setHeader("Content-Type", "text/event-stream; charset=utf-8");
      res.setHeader("Cache-Control", "no-cache, no-transform");
      res.setHeader("Connection", "keep-alive");
      res.setHeader("X-Accel-Buffering", "no");
      await streamComplete({ system, messages: trimmed, res, maxTokens: 600, temperature: 0.7 });
    } else {
      const reply = await complete({ system, messages: trimmed, maxTokens: 600, temperature: 0.7 });
      return res.status(200).json({ reply });
    }
  } catch (error) {
    return handleError(res, error);
  }
}
