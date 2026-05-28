import React, { useState } from "react";
import { PROJECTS } from "../data/resume.js";
import SectionHeader from "./SectionHeader.jsx";
import { useScrollReveal } from "../hooks/useScrollReveal.js";
import { useSpotlight } from "../hooks/useSpotlight.js";

export default function Projects() {
  return (
    <section id="projects" className="section section-border-top">
      <div className="container">
        <SectionHeader number="02" title="Selected work" subtitle="Production systems I've shipped" />

        <div
          className="projects-grid"
          style={{
            marginTop: 80,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
            gap: 24,
          }}
        >
          {PROJECTS.map((p, i) => (
            <ProjectCard key={i} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }) {
  const [hover, setHover] = useState(false);
  const revealRef = useScrollReveal();
  const spotRef = useSpotlight();
  const isWarm = project.accent === "warm";
  const accentColor = isWarm ? "var(--warm)" : "var(--accent)";

  return (
    <div
      ref={(node) => {
        revealRef.current = node;
        spotRef.current = node;
      }}
      className="reveal card-spotlight"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        padding: 36,
        borderRadius: 20,
        background: hover ? "var(--bg-card-hover)" : "var(--bg-card)",
        border: `1px solid ${hover ? accentColor : "var(--border)"}`,
        display: "flex",
        flexDirection: "column",
        minHeight: 380,
        position: "relative",
        overflow: "hidden",
        transition: "all 0.4s var(--ease)",
        transform: hover ? "translateY(-6px)" : "translateY(0)",
        cursor: "pointer",
      }}
    >
      {/* Decorative number */}
      <div
        className="display"
        style={{
          position: "absolute",
          top: 24,
          right: 32,
          fontSize: 96,
          lineHeight: 1,
          color: hover ? accentColor : "rgba(255,255,255,0.04)",
          fontWeight: 400,
          letterSpacing: "-0.02em",
          transition: "color 0.4s var(--ease)",
          pointerEvents: "none",
        }}
      >
        0{index + 1}
      </div>

      <div className="upper-mono" style={{ color: accentColor, marginBottom: 28 }}>
        ✦ {project.tag}
      </div>

      <h3
        className="display"
        style={{
          fontSize: 36,
          lineHeight: 1.05,
          marginBottom: 16,
          fontWeight: 400,
          maxWidth: "85%",
        }}
      >
        {project.title}
      </h3>

      <p
        style={{
          fontSize: 14.5,
          lineHeight: 1.65,
          color: "var(--ink-muted)",
          marginBottom: 28,
          flex: 1,
        }}
      >
        {project.desc}
      </p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 24 }}>
        {project.tech.map((t, j) => (
          <span
            key={j}
            className="mono"
            style={{
              fontSize: 11,
              padding: "4px 10px",
              borderRadius: 100,
              background: "rgba(255,255,255,0.04)",
              color: "var(--ink-muted)",
              letterSpacing: "0.02em",
            }}
          >
            {t}
          </span>
        ))}
      </div>

      <div
        style={{
          paddingTop: 20,
          borderTop: "1px solid var(--border)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span className="upper-mono" style={{ color: "var(--ink-faint)" }}>
          Impact
        </span>
        <span
          className="display italic"
          style={{
            fontSize: 22,
            fontWeight: 400,
            color: accentColor,
          }}
        >
          {project.metric}
        </span>
      </div>
    </div>
  );
}
