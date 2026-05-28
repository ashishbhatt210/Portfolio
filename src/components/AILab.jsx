import React from "react";
import { FEATURES } from "../features/registry.js";
import SectionHeader from "./SectionHeader.jsx";
import { useScrollReveal } from "../hooks/useScrollReveal.js";

export default function AILab() {
  return (
    <section
      id="ai-lab"
      className="section section-border-top"
      style={{
        background:
          "linear-gradient(180deg, transparent 0%, rgba(212,255,58,0.025) 40%, rgba(212,255,58,0.025) 60%, transparent 100%)",
      }}
    >
      <div className="container">
        <SectionHeader
          number="05"
          title="AI Lab"
          subtitle="Live tools — built with the same APIs I work with daily"
        />

        {/* Terminal-style preamble */}
        <div
          style={{
            marginTop: 60,
            padding: "20px 24px",
            background: "rgba(0,0,0,0.5)",
            border: "1px solid var(--border)",
            borderRadius: 12,
            fontFamily: "var(--font-mono)",
            fontSize: 13,
            color: "var(--ink-muted)",
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <span style={{ color: "var(--accent)" }}>$</span>
          <span>connected to claude-sonnet-4-5 · resume context loaded · ready</span>
          <span className="blink" style={{ marginLeft: "auto", color: "var(--accent)" }}>▊</span>
        </div>

        <div style={{ marginTop: 40, display: "flex", flexDirection: "column", gap: 32 }}>
          {FEATURES.map((feature) => (
            <FeatureBlock key={feature.id} feature={feature} />
          ))}
        </div>

        <div
          style={{
            marginTop: 60,
            padding: "20px 24px",
            background: "rgba(0,0,0,0.3)",
            border: "1px dashed var(--border)",
            borderRadius: 12,
            fontFamily: "var(--font-mono)",
            fontSize: 12,
            color: "var(--ink-faint)",
            lineHeight: 1.7,
          }}
        >
          <span className="accent">// </span>more AI features shipping soon — semantic project search, automated
          recommendation letter, custom interview prep. <span className="accent">→</span> follow along on GitHub.
        </div>
      </div>
    </section>
  );
}

function FeatureBlock({ feature }) {
  const ref = useScrollReveal();
  const { Component, label, title, italicWord, desc } = feature;

  const splitTitle = italicWord
    ? title.split(italicWord)
    : [title, null];

  return (
    <div
      id={feature.id}
      ref={ref}
      className="reveal"
      style={{
        padding: 40,
        borderRadius: 22,
        background: "rgba(255,255,255,0.018)",
        border: "1px solid var(--border)",
        scrollMarginTop: 100,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 28 }}>
        <span className="upper-mono accent">✦ {label}</span>
        <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
      </div>

      <h3
        className="display"
        style={{
          fontSize: "clamp(36px, 5vw, 56px)",
          lineHeight: 1.05,
          marginBottom: 14,
          fontWeight: 400,
          letterSpacing: "-0.02em",
        }}
      >
        {splitTitle[0]}
        {italicWord && (
          <span className="italic accent"> {italicWord}</span>
        )}
        {splitTitle[1]}
      </h3>
      <p
        style={{
          fontSize: 15,
          lineHeight: 1.65,
          color: "var(--ink-muted)",
          marginBottom: 36,
          maxWidth: 720,
        }}
      >
        {desc}
      </p>

      <Component />
    </div>
  );
}
