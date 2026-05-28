import React, { useState } from "react";
import { EXPERIENCE } from "../data/resume.js";
import SectionHeader from "./SectionHeader.jsx";
import { useScrollReveal } from "../hooks/useScrollReveal.js";

export default function Experience() {
  return (
    <section id="experience" className="section section-border-top">
      <div className="container">
        <SectionHeader number="01" title="Work" subtitle="Where I've been building" />

        <div style={{ marginTop: 80 }}>
          {EXPERIENCE.map((job, i) => (
            <ExperienceRow key={job.id} job={job} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ExperienceRow({ job, index }) {
  const [expanded, setExpanded] = useState(index === 0);
  const ref = useScrollReveal();

  return (
    <div
      ref={ref}
      className="reveal experience-row"
      style={{
        display: "grid",
        gridTemplateColumns: "180px 1fr",
        gap: 40,
        padding: "48px 0",
        borderBottom: "1px solid var(--border)",
        transition: "all 0.4s var(--ease)",
        cursor: "pointer",
      }}
      onClick={() => setExpanded((e) => !e)}
    >
      {/* Year column */}
      <div>
        <div
          className="display"
          style={{
            fontSize: 64,
            lineHeight: 1,
            fontWeight: 400,
            color: "var(--accent)",
            letterSpacing: "-0.03em",
          }}
        >
          '{job.yearLabel.slice(2)}
        </div>
        <div className="upper-mono" style={{ marginTop: 12, color: "var(--ink-faint)" }}>
          {job.period}
        </div>
      </div>

      {/* Content column */}
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 24 }}>
          <div style={{ flex: 1 }}>
            <h3
              className="display"
              style={{
                fontSize: 44,
                lineHeight: 1.05,
                marginBottom: 8,
                fontWeight: 400,
              }}
            >
              {job.company}
            </h3>
            <div style={{ fontSize: 15, color: "var(--ink-muted)", marginBottom: 6 }}>
              {job.role}
            </div>
            <div className="upper-mono" style={{ color: "var(--accent)", marginBottom: 20 }}>
              ▸ {job.project}
            </div>
            <p style={{ fontSize: 15, lineHeight: 1.6, color: "var(--ink-muted)", maxWidth: 720 }}>
              {job.summary}
            </p>
          </div>
          <div
            style={{
              width: 36,
              height: 36,
              border: "1px solid var(--border-strong)",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "transform 0.3s var(--ease), border-color 0.2s",
              transform: expanded ? "rotate(45deg)" : "rotate(0deg)",
              borderColor: expanded ? "var(--accent)" : "var(--border-strong)",
              color: expanded ? "var(--accent)" : "var(--ink-muted)",
              flexShrink: 0,
            }}
          >
            +
          </div>
        </div>

        {/* Expanded content */}
        <div
          style={{
            maxHeight: expanded ? 1000 : 0,
            opacity: expanded ? 1 : 0,
            overflow: "hidden",
            transition: "max-height 0.6s var(--ease), opacity 0.4s var(--ease) 0.1s",
            marginTop: expanded ? 32 : 0,
          }}
        >
          <ul style={{ marginBottom: 24 }}>
            {job.highlights.map((h, j) => (
              <li
                key={j}
                style={{
                  fontSize: 14.5,
                  lineHeight: 1.7,
                  color: "var(--ink-muted)",
                  paddingLeft: 24,
                  position: "relative",
                  marginBottom: 10,
                }}
              >
                <span
                  className="accent mono"
                  style={{ position: "absolute", left: 0, top: 2, fontSize: 12 }}
                >
                  →
                </span>
                {h}
              </li>
            ))}
          </ul>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {job.stack.map((tech, k) => (
              <span
                key={k}
                className="mono"
                style={{
                  fontSize: 11,
                  padding: "5px 12px",
                  borderRadius: 100,
                  background: "var(--bg-card)",
                  border: "1px solid var(--border)",
                  color: "var(--ink-muted)",
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
