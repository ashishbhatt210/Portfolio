// Frontend API client. All AI features go through these helpers
// so the API key stays server-side.

const API_BASE = "/api";

async function postJSON(path, body) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || `Request failed with ${res.status}`);
  }
  return res.json();
}

export async function analyzeJobFit(jobDescription) {
  const { analysis } = await postJSON("/job-fit", { jobDescription });
  return analysis;
}

export async function sendChat(messages) {
  const { reply } = await postJSON("/chat", { messages });
  return reply;
}

// Streaming variant — calls onDelta(text) for each token, onDone() when finished.
export async function sendChatStream(messages, onDelta, onDone, onError) {
  try {
    const res = await fetch(`${API_BASE}/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "text/event-stream",
      },
      body: JSON.stringify({ messages }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `Request failed with ${res.status}`);
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() ?? "";
      for (const line of lines) {
        if (!line.startsWith("data: ")) continue;
        const data = line.slice(6).trim();
        if (data === "[DONE]") { onDone?.(); return; }
        try {
          const { delta } = JSON.parse(data);
          if (delta) onDelta(delta);
        } catch {}
      }
    }
    onDone?.();
  } catch (err) {
    onError?.(err);
  }
}
