import React, { useState } from "react";
import { analyzeJobFit } from "../../lib/api.js";
import Markdown from "../../components/Markdown.jsx";

export default function JobFitAnalyzer() {
  const [jd, setJd] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  const analyze = async () => {
    if (!jd.trim()) return;
    setLoading(true);
    setError("");
    setResult("");
    try {
      const analysis = await analyzeJobFit(jd.trim());
      setResult(analysis);
    } catch (e) {
      setError(e.message || "Couldn't reach the AI right now. Please try again in a moment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <textarea
        value={jd}
        onChange={(e) => setJd(e.target.value)}
        placeholder="Paste a job description here — title, responsibilities, required skills…"
        style={{
          width: "100%",
          minHeight: 200,
          padding: 24,
          borderRadius: 14,
          background: "rgba(0,0,0,0.4)",
          border: "1px solid var(--border)",
          color: "var(--ink)",
          fontSize: 14.5,
          lineHeight: 1.65,
          resize: "vertical",
          fontFamily: "var(--font-body)",
          transition: "border-color 0.2s",
        }}
        onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
        onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
      />

      <div style={{ display: "flex", gap: 12, marginTop: 16, alignItems: "center", flexWrap: "wrap" }}>
        <button
          onClick={analyze}
          disabled={loading || !jd.trim()}
          style={{
            padding: "14px 24px",
            background: jd.trim() ? "var(--accent)" : "rgba(212,255,58,0.2)",
            color: "var(--bg)",
            borderRadius: 100,
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            cursor: jd.trim() ? "pointer" : "not-allowed",
            opacity: loading ? 0.6 : 1,
            transition: "all 0.2s",
          }}
        >
          {loading ? "⊹ Analyzing…" : "✦ Analyze Fit"}
        </button>
        {jd.trim() && !loading && !result && (
          <span className="upper-mono" style={{ color: "var(--ink-faint)" }}>
            {jd.length} chars · ready
          </span>
        )}
      </div>

      {error && (
        <div
          style={{
            marginTop: 24,
            padding: 16,
            borderRadius: 10,
            background: "rgba(255,100,100,0.08)",
            border: "1px solid rgba(255,100,100,0.2)",
            color: "#ff9a9a",
            fontSize: 13,
          }}
        >
          {error}
        </div>
      )}

      {result && (
        <div
          style={{
            marginTop: 32,
            padding: 32,
            borderRadius: 14,
            background: "rgba(0,0,0,0.4)",
            border: "1px solid var(--accent-dim)",
            animation: "fade-up 0.6s var(--ease-out)",
          }}
        >
          <div
            className="upper-mono accent"
            style={{
              marginBottom: 20,
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <span className="pulse-dot">●</span> Analysis Complete
          </div>
          <Markdown text={result} />
        </div>
      )}
    </div>
  );
}
