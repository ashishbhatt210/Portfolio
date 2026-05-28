import React from "react";
import { useScrollReveal } from "../hooks/useScrollReveal.js";

export default function SectionHeader({ number, title, subtitle, accent = "lime" }) {
  const ref = useScrollReveal();
  return (
    <div
      ref={ref}
      className="reveal"
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-end",
        gap: 40,
        flexWrap: "wrap",
        paddingBottom: 60,
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-end", gap: 24 }}>
        <div
          className="upper-mono"
          style={{
            color: accent === "warm" ? "var(--warm)" : "var(--accent)",
            paddingBottom: 16,
          }}
        >
          §{number}
        </div>
        <h2
          className="display"
          style={{
            fontSize: "clamp(56px, 8vw, 120px)",
            lineHeight: 0.9,
            fontWeight: 400,
            letterSpacing: "-0.02em",
          }}
        >
          {title}
        </h2>
      </div>
      {subtitle && (
        <div
          className="upper-mono"
          style={{
            color: "var(--ink-muted)",
            maxWidth: 320,
            textAlign: "right",
            paddingBottom: 24,
            letterSpacing: "0.1em",
          }}
        >
          {subtitle}
        </div>
      )}
    </div>
  );
}
