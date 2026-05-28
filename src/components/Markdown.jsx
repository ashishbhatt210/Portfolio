// Lightweight markdown renderer: bold, line breaks, simple bullet lists.
import React from "react";

export default function Markdown({ text }) {
  if (!text) return null;
  const lines = text.split("\n");

  return (
    <div style={{ fontSize: 14.5, lineHeight: 1.7, color: "rgba(240,237,228,0.88)" }}>
      {lines.map((line, i) => {
        const trimmed = line.trim();
        if (!trimmed) return <div key={i} style={{ height: 10 }} />;

        // bullet
        if (trimmed.startsWith("- ")) {
          return (
            <div key={i} style={{ display: "flex", gap: 10, paddingLeft: 4, marginBottom: 4 }}>
              <span className="accent" style={{ flexShrink: 0 }}>—</span>
              <span>{renderInline(trimmed.slice(2))}</span>
            </div>
          );
        }

        return <div key={i} style={{ marginBottom: 6 }}>{renderInline(trimmed)}</div>;
      })}
    </div>
  );
}

function renderInline(text) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, j) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={j} className="accent" style={{ fontWeight: 600 }}>
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <span key={j}>{part}</span>;
  });
}
