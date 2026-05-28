import React, { useEffect, useRef, useState } from "react";
import { sendChatStream } from "../../lib/api.js";
import Markdown from "../../components/Markdown.jsx";

const SUGGESTIONS = [
  "Tell me about Ashish's GenAI projects",
  "What's his experience with LLMs?",
  "How strong is he in system design?",
  "What's his current role about?",
];

const INITIAL_MESSAGES = [
  {
    role: "assistant",
    content:
      "Hi — I'm an AI assistant trained on Ashish's resume. Ask me anything about his work, experience with GenAI, specific projects, or what he might bring to your team.",
  },
];

export default function AskAshish() {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, streaming]);

  const ask = async () => {
    const text = input.trim();
    if (!text || streaming) return;
    setInput("");

    const userMsg = { role: "user", content: text };
    const next = [...messages, userMsg];
    setMessages(next);
    setStreaming(true);

    // Pre-insert an empty assistant bubble that we'll stream into
    setMessages((m) => [...m, { role: "assistant", content: "" }]);
    let accumulated = "";

    await sendChatStream(
      next,
      (delta) => {
        accumulated += delta;
        setMessages((m) => {
          const updated = [...m];
          updated[updated.length - 1] = { role: "assistant", content: accumulated };
          return updated;
        });
      },
      () => setStreaming(false),
      (err) => {
        setMessages((m) => {
          const updated = [...m];
          updated[updated.length - 1] = {
            role: "assistant",
            content: `Sorry — ${err?.message || "I can't reach the AI right now. Please try again."}`,
          };
          return updated;
        });
        setStreaming(false);
      }
    );
  };

  const isLoading = streaming && messages[messages.length - 1]?.content === "";

  return (
    <div>
      <div
        ref={scrollRef}
        style={{
          minHeight: 340,
          maxHeight: 480,
          overflowY: "auto",
          background: "rgba(0,0,0,0.3)",
          borderRadius: 14,
          padding: 24,
          border: "1px solid var(--border)",
          marginBottom: 16,
          display: "flex",
          flexDirection: "column",
          gap: 14,
        }}
      >
        {messages.map((m, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent: m.role === "user" ? "flex-end" : "flex-start",
              animation: "slide-in-right 0.4s var(--ease-out)",
            }}
          >
            <div
              style={{
                maxWidth: "82%",
                padding: "12px 18px",
                borderRadius: 14,
                background: m.role === "user" ? "rgba(212,255,58,0.1)" : "rgba(255,255,255,0.03)",
                border: m.role === "user" ? "1px solid var(--accent-dim)" : "1px solid var(--border)",
                fontSize: 14,
                lineHeight: 1.65,
              }}
            >
              {m.role === "assistant" ? (
                <>
                  <Markdown text={m.content} />
                  {/* Blinking cursor while this bubble is being streamed */}
                  {streaming && i === messages.length - 1 && (
                    <span className="blink accent" style={{ marginLeft: 2 }}>▊</span>
                  )}
                </>
              ) : (
                m.content
              )}
            </div>
          </div>
        ))}

        {/* Three-dot loader only before first token arrives */}
        {isLoading && (
          <div style={{ display: "flex", justifyContent: "flex-start" }}>
            <div
              style={{
                padding: "12px 18px",
                borderRadius: 14,
                background: "rgba(255,255,255,0.03)",
                border: "1px solid var(--border)",
                fontSize: 14,
              }}
            >
              <span className="pulse-dot accent">●</span>
              <span className="pulse-dot" style={{ animationDelay: "0.2s", margin: "0 6px" }}>●</span>
              <span className="pulse-dot" style={{ animationDelay: "0.4s" }}>●</span>
            </div>
          </div>
        )}
      </div>

      {messages.length <= 1 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
          {SUGGESTIONS.map((s, i) => (
            <button
              key={i}
              onClick={() => setInput(s)}
              className="mono"
              style={{
                fontSize: 11,
                padding: "7px 14px",
                borderRadius: 100,
                background: "transparent",
                border: "1px solid var(--border-strong)",
                color: "var(--ink-muted)",
                letterSpacing: "0.02em",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--accent)";
                e.currentTarget.style.color = "var(--accent)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border-strong)";
                e.currentTarget.style.color = "var(--ink-muted)";
              }}
            >
              {s}
            </button>
          ))}
        </div>
      )}

      <div style={{ display: "flex", gap: 8 }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && ask()}
          placeholder="Ask anything about Ashish…"
          style={{
            flex: 1,
            padding: "14px 20px",
            borderRadius: 100,
            background: "rgba(0,0,0,0.4)",
            border: "1px solid var(--border)",
            color: "var(--ink)",
            fontSize: 14,
            transition: "border-color 0.2s",
          }}
          onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
          onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
        />
        <button
          onClick={ask}
          disabled={streaming || !input.trim()}
          className="mono"
          style={{
            padding: "0 26px",
            background: input.trim() && !streaming ? "var(--accent)" : "rgba(212,255,58,0.2)",
            color: "var(--bg)",
            borderRadius: 100,
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            cursor: input.trim() && !streaming ? "pointer" : "not-allowed",
            transition: "all 0.2s",
          }}
        >
          {streaming ? "..." : "Send →"}
        </button>
      </div>
    </div>
  );
}
