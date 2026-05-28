import React from "react";
import { MARQUEE_ITEMS } from "../data/resume.js";

export default function Marquee() {
  // Duplicate items so the loop is seamless.
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <div
      style={{
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        padding: "28px 0",
        overflow: "hidden",
        background: "var(--bg)",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: 48,
          whiteSpace: "nowrap",
          animation: "marquee 40s linear infinite",
          width: "max-content",
        }}
      >
        {items.map((item, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 48,
            }}
          >
            <span
              className="display italic"
              style={{
                fontSize: 44,
                lineHeight: 1,
                color: i % 7 === 0 ? "var(--accent)" : "var(--ink)",
              }}
            >
              {item}
            </span>
            <span
              className="display"
              style={{ fontSize: 32, color: "var(--ink-faint)", lineHeight: 1 }}
            >
              ✦
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
