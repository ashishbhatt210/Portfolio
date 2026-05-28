import React, { useEffect, useRef, useState } from "react";
import { CODING_STATS, PROFILE, ACHIEVEMENTS } from "../data/resume.js";
import SectionHeader from "./SectionHeader.jsx";
import { useScrollReveal } from "../hooks/useScrollReveal.js";
import { useSpotlight } from "../hooks/useSpotlight.js";
import { useCountUp } from "../hooks/useCountUp.js";

/**
 * Unified Honors section: competitive coding profiles + workplace/hackathon awards.
 * Replaces the previous separate CodingStats and Achievements sections.
 */
export default function Honors() {
  const totalRef = useScrollReveal();
  const awardsHeadRef = useScrollReveal();

  return (
    <section id="honors" className="section section-border-top">
      <div className="container">
        <SectionHeader
          number="04"
          title="Honors"
          subtitle="Competitive coding & recognition"
        />

        {/* Platform cards */}
        <div
          style={{
            marginTop: 80,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 24,
          }}
        >
          {CODING_STATS.map((platform) => (
            <PlatformCard key={platform.id} platform={platform} />
          ))}
        </div>

        {/* Total impact callout */}
        <div
          className="reveal"
          ref={totalRef}
          style={{
            marginTop: 24,
            padding: "28px 36px",
            borderRadius: 16,
            background: "rgba(212,255,58,0.04)",
            border: "1px solid var(--accent-dim)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 20,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
            <span className="upper-mono accent">⊹ Total impact</span>
            <span
              className="display accent"
              style={{ fontSize: 40, lineHeight: 1, fontWeight: 400 }}
            >
              1000+
            </span>
            <span style={{ color: "var(--ink-muted)", fontSize: 15 }}>
              DSA problems solved across all platforms
            </span>
          </div>
          <a
            href={PROFILE.social.github}
            target="_blank"
            rel="noreferrer"
            className="mono"
            style={{
              fontSize: 11,
              padding: "10px 20px",
              borderRadius: 100,
              border: "1px solid var(--border-strong)",
              color: "var(--ink-muted)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
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
            GitHub →
          </a>
        </div>

        {/* Awards subheader */}
        <div
          ref={awardsHeadRef}
          className="reveal upper-mono"
          style={{
            marginTop: 80,
            marginBottom: 28,
            color: "var(--ink-faint)",
            letterSpacing: "0.15em",
            display: "flex",
            alignItems: "center",
            gap: 14,
          }}
        >
          <span style={{ color: "var(--accent)" }}>✦</span>
          <span>Recognition & Awards</span>
          <span style={{ flex: 1, height: 1, background: "var(--border)" }} />
        </div>

        {/* Awards grid — uniform cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 16,
          }}
        >
          {ACHIEVEMENTS.map((award, i) => (
            <AwardCard key={i} award={award} />
          ))}
        </div>
      </div>
    </section>
  );
}

function RatingBar({ value, max, colorVar }) {
  const [filled, setFilled] = useState(false);
  const ref = useRef(null);
  const pct = Math.min(Math.round((value / max) * 100), 100);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setFilled(true); },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} style={{ marginBottom: 20 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 8,
          fontSize: 11,
          fontFamily: "var(--font-mono)",
          color: "var(--ink-faint)",
          letterSpacing: "0.08em",
        }}
      >
        <span>Rating</span>
        <span style={{ color: `var(${colorVar})` }}>
          {value} / {max}
        </span>
      </div>
      <div
        style={{
          height: 4,
          background: "var(--border)",
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: filled ? `${pct}%` : "0%",
            background: `var(${colorVar})`,
            borderRadius: 2,
            transition: "width 1.6s cubic-bezier(0.16, 1, 0.3, 1)",
            boxShadow: `0 0 12px var(${colorVar})`,
          }}
        />
      </div>
    </div>
  );
}

function StarRow({ count, colorVar }) {
  return (
    <div style={{ display: "flex", gap: 4, marginBottom: 12 }}>
      {[1, 2, 3, 4, 5].map((n) => (
        <span
          key={n}
          style={{
            fontSize: 18,
            color: n <= count ? `var(${colorVar})` : "var(--border-strong)",
            transition: "color 0.2s",
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
}

function PlatformCard({ platform }) {
  const [hover, setHover] = useState(false);
  const revealRef = useScrollReveal();
  const spotRef = useSpotlight();
  const { colorVar } = platform;
  const color = `var(${colorVar})`;
  const ratingCounter = useCountUp(platform.rating || 0, { duration: 2200 });

  return (
    <div
      ref={(node) => {
        revealRef.current = node;
        spotRef.current = node;
        ratingCounter.ref.current = node;
      }}
      className="reveal card-spotlight"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        padding: 36,
        borderRadius: 20,
        background: hover ? "var(--bg-card-hover)" : "var(--bg-card)",
        border: `1px solid ${hover ? color : "var(--border)"}`,
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
        transition: "all 0.4s var(--ease)",
        transform: hover ? "translateY(-6px)" : "translateY(0)",
      }}
    >
      {/* Platform header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 24,
          position: "relative",
        }}
      >
        <div>
          <div className="upper-mono" style={{ color, marginBottom: 4, fontSize: 10 }}>
            ✦ {platform.platform}
          </div>
          <div className="mono" style={{ color: "var(--ink-faint)", fontSize: 12 }}>
            @{platform.handle}
          </div>
        </div>
        <span
          className="mono"
          style={{
            fontSize: 10,
            padding: "5px 12px",
            borderRadius: 100,
            border: `1px solid ${color}`,
            color,
            letterSpacing: "0.08em",
            whiteSpace: "nowrap",
          }}
        >
          {platform.badge}
        </span>
      </div>

      {/* Big rating */}
      {platform.rating ? (
        <div style={{ position: "relative", marginBottom: 8 }}>
          <div
            className="display"
            style={{
              fontSize: 84,
              lineHeight: 1,
              fontWeight: 400,
              color,
              letterSpacing: "-0.03em",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {ratingCounter.value}
          </div>
          {platform.stars && <StarRow count={platform.stars} colorVar={colorVar} />}
        </div>
      ) : (
        <div style={{ position: "relative", marginBottom: 8 }}>
          <div
            className="display"
            style={{
              fontSize: 72,
              lineHeight: 1,
              fontWeight: 400,
              color,
              letterSpacing: "-0.03em",
            }}
          >
            1000
            <span style={{ fontSize: 40 }}>+</span>
          </div>
          <div
            className="mono"
            style={{
              fontSize: 11,
              color: "var(--ink-muted)",
              marginTop: 4,
              letterSpacing: "0.05em",
            }}
          >
            PROBLEMS SOLVED
          </div>
        </div>
      )}

      {platform.rating && platform.ratingMax && (
        <RatingBar value={platform.rating} max={platform.ratingMax} colorVar={colorVar} />
      )}

      {/* Stats grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 1,
          background: "var(--border)",
          borderRadius: 12,
          overflow: "hidden",
          marginBottom: 24,
          flex: 1,
        }}
      >
        {platform.stats.map((s, i) => (
          <div key={i} style={{ padding: "16px 14px", background: "var(--bg)" }}>
            <div className="mono" style={{ fontSize: 10, color: "var(--ink-faint)", marginBottom: 6, letterSpacing: "0.06em" }}>
              {s.label}
            </div>
            <div className="display" style={{ fontSize: 22, lineHeight: 1, color, fontWeight: 400 }}>
              {s.value}
            </div>
          </div>
        ))}
      </div>

      {/* Highlight */}
      <div
        className="mono"
        style={{
          fontSize: 11,
          lineHeight: 1.6,
          color: "var(--ink-muted)",
          marginBottom: 20,
          borderLeft: `2px solid ${color}`,
          paddingLeft: 12,
          opacity: 0.85,
        }}
      >
        {platform.highlight}
      </div>

      {/* Profile link */}
      <a
        href={platform.url}
        target="_blank"
        rel="noreferrer"
        className="mono"
        style={{
          fontSize: 11,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: hover ? color : "var(--ink-muted)",
          display: "flex",
          alignItems: "center",
          gap: 8,
          transition: "color 0.2s, gap 0.2s",
        }}
        onMouseEnter={(e) => { e.currentTarget.style.gap = "14px"; }}
        onMouseLeave={(e) => { e.currentTarget.style.gap = "8px"; }}
      >
        View Profile <span>→</span>
      </a>
    </div>
  );
}

function AwardCard({ award }) {
  const revealRef = useScrollReveal();
  const spotRef = useSpotlight();

  return (
    <div
      ref={(node) => {
        revealRef.current = node;
        spotRef.current = node;
      }}
      className="reveal card-spotlight"
      style={{
        padding: 26,
        borderRadius: 14,
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        display: "flex",
        flexDirection: "column",
        gap: 10,
        minHeight: 156,
        transition: "transform 0.3s var(--ease), border-color 0.3s, background 0.3s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "var(--accent-dim)";
        e.currentTarget.style.transform = "translateY(-3px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--border)";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      <div
        className="display accent"
        style={{
          fontSize: 36,
          lineHeight: 1,
          fontWeight: 400,
          letterSpacing: "-0.02em",
        }}
      >
        {award.metric}
      </div>
      <div style={{ fontSize: 14, fontWeight: 500, marginTop: 4 }}>
        {award.label}
      </div>
      <div
        className="mono"
        style={{ fontSize: 11, color: "var(--ink-muted)", lineHeight: 1.55, letterSpacing: "0.02em" }}
      >
        {award.sub}
      </div>
    </div>
  );
}
