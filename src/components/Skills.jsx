import React from "react";
import { SKILL_GROUPS } from "../data/resume.js";
import SectionHeader from "./SectionHeader.jsx";
import { useScrollReveal } from "../hooks/useScrollReveal.js";

export default function Skills() {
  return (
    <section id="skills" className="section section-border-top">
      <div className="container">
        <SectionHeader number="03" title="Stack" subtitle="Tools I reach for daily" />

        <div
          style={{
            marginTop: 80,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: 1,
            background: "var(--border)",
            border: "1px solid var(--border)",
            borderRadius: 20,
            overflow: "hidden",
          }}
        >
          {SKILL_GROUPS.map((g, i) => (
            <SkillGroup key={g.name} group={g} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillGroup({ group, index }) {
  const ref = useScrollReveal();

  return (
    <div
      ref={ref}
      className="reveal"
      style={{
        padding: 36,
        background: "var(--bg)",
        minHeight: 280,
        transition: "background 0.3s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "var(--bg-card-hover)")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "var(--bg)")}
    >
      <div className="upper-mono" style={{ color: "var(--accent)", marginBottom: 8 }}>
        0{index + 1}
      </div>
      <h3
        className="display"
        style={{ fontSize: 28, lineHeight: 1.1, marginBottom: 24, fontWeight: 400 }}
      >
        {group.name}
      </h3>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "baseline" }}>
        {group.items.map((s, j) => {
          const size = s.weight === 3 ? 17 : s.weight === 2 ? 14 : 12;
          const opacity = s.weight === 3 ? 1 : s.weight === 2 ? 0.8 : 0.55;
          const isCore = s.weight === 3;
          return (
            <span
              key={j}
              className={isCore ? "display" : "mono"}
              style={{
                fontSize: size,
                fontStyle: isCore ? "italic" : "normal",
                fontWeight: isCore ? 400 : 500,
                color: isCore ? "var(--accent)" : "var(--ink)",
                opacity,
                padding: isCore ? "0" : "3px 9px",
                borderRadius: 100,
                border: isCore ? "none" : "1px solid var(--border-strong)",
                whiteSpace: "nowrap",
                transition: "transform 0.2s",
                cursor: "default",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-2px)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
            >
              {s.name}
            </span>
          );
        })}
      </div>
    </div>
  );
}
