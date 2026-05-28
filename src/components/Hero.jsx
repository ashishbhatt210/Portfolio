import React, { useEffect, useState } from "react";
import { PROFILE, STATS } from "../data/resume.js";

const TYPEWRITER_WORDS = ["AI", "LLMs", "impact", "purpose"];

function useTypewriter(words, typingSpeed = 150, deletingSpeed = 90, pauseMs = 2400) {
  const [display, setDisplay] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const word = words[wordIdx];
    const timeout = setTimeout(() => {
      if (!deleting) {
        if (display.length < word.length) {
          setDisplay(word.slice(0, display.length + 1));
        } else {
          setPaused(true);
          setTimeout(() => { setPaused(false); setDeleting(true); }, pauseMs);
        }
      } else {
        if (display.length > 0) {
          setDisplay(display.slice(0, -1));
        } else {
          setDeleting(false);
          setWordIdx((i) => (i + 1) % words.length);
        }
      }
    }, deleting ? deletingSpeed : typingSpeed);
    return () => clearTimeout(timeout);
  }, [display, deleting, wordIdx, paused, words, typingSpeed, deletingSpeed, pauseMs]);

  return display;
}

export default function Hero() {
  const typedWord = useTypewriter(TYPEWRITER_WORDS);
  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="home"
      className="hero-section"
      style={{
        minHeight: "100vh",
        padding: "160px 48px 120px",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      {/* Single, slow, soft ambient glow — calm, not chasing the cursor */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "40%",
          width: 900,
          height: 900,
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(circle, rgba(212,255,58,0.06) 0%, transparent 65%)",
          filter: "blur(80px)",
          pointerEvents: "none",
        }}
      />

      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        {/* Simple label row */}
        <div
          className="fade-up upper-mono"
          style={{
            color: "var(--ink-faint)",
            marginBottom: 48,
            letterSpacing: "0.18em",
          }}
        >
          Portfolio · 2026 — {PROFILE.location}
        </div>

        {/* Hero title */}
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(60px, 9vw, 150px)",
            lineHeight: 0.95,
            letterSpacing: "-0.025em",
            fontWeight: 400,
            margin: 0,
            maxWidth: 1100,
          }}
        >
          <span className="fade-up" style={{ display: "block", animationDelay: "0.05s" }}>
            Software engineer
          </span>
          <span
            className="fade-up italic"
            style={{
              display: "block",
              animationDelay: "0.2s",
              fontWeight: 300,
              color: "var(--ink-muted)",
              marginTop: 6,
            }}
          >
            building with{" "}
            <span
              className="accent"
              style={{
                position: "relative",
                display: "inline-block",
                minWidth: "2ch",
              }}
            >
              {typedWord}
            </span>
            <span className="blink" style={{ marginLeft: 4, color: "var(--accent)", opacity: 0.7 }}>
              _
            </span>
          </span>
        </h1>

        {/* AI Lab teaser — jumps straight to the Job-Fit Analyzer */}
        <button
          type="button"
          onClick={() => scrollTo("job-fit")}
          className="fade-up hero-ai-strip"
          style={{ animationDelay: "0.35s" }}
          aria-label="Try the AI Job-Fit Analyzer"
        >
          <div className="hero-ai-strip-left">
            <span className="accent pulse-dot" style={{ fontSize: 9 }}>●</span>
            <span className="upper-mono accent" style={{ letterSpacing: "0.16em" }}>
              Live AI on this site
            </span>
            <span className="hero-ai-divider">/</span>
            <span className="hero-ai-desc">
              Try the{" "}
              <strong style={{ color: "var(--ink)", fontWeight: 600 }}>
                Job-Fit Analyzer
              </strong>{" "}
              — paste a JD, get an instant fit analysis grounded in my resume
            </span>
          </div>
          <span className="hero-ai-cta upper-mono">
            Try it&nbsp;
            <span aria-hidden="true">↓</span>
          </span>
        </button>

        {/* Bio + actions, gentle 2-col grid with generous spacing */}
        <div
          className="fade-up hero-bottom-grid"
          style={{
            marginTop: 64,
            display: "grid",
            gridTemplateColumns: "minmax(0, 1.4fr) minmax(0, 1fr)",
            gap: 80,
            alignItems: "flex-end",
            animationDelay: "0.45s",
          }}
        >
          <div style={{ maxWidth: 580 }}>
            <p
              style={{
                fontSize: 17,
                lineHeight: 1.75,
                color: "var(--ink-muted)",
                marginBottom: 40,
              }}
            >
              I'm{" "}
              <strong style={{ color: "var(--ink)", fontWeight: 600 }}>Ashish</strong>{" "}
              — currently SDE-III at{" "}
              <strong style={{ color: "var(--ink)" }}>Clearwater Analytics</strong>,
              shipping investment-accounting platforms with GenAI woven in.
              Previously at{" "}
              <strong style={{ color: "var(--ink)" }}>athenahealth</strong>, where I
              fine-tuned LLaMA 3.1 and built ontology-grounded AI pipelines.
            </p>

            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <button
                onClick={() => scrollTo("ai-lab")}
                style={{
                  background: "var(--accent)",
                  color: "var(--bg)",
                  border: "none",
                  padding: "14px 24px",
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  borderRadius: 100,
                  transition: "transform 0.3s var(--ease), box-shadow 0.3s var(--ease)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-1px)";
                  e.currentTarget.style.boxShadow =
                    "0 14px 40px -16px rgba(212,255,58,0.45)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                Try the AI Lab →
              </button>
              <button
                onClick={() => scrollTo("experience")}
                style={{
                  background: "transparent",
                  color: "var(--ink-muted)",
                  border: "none",
                  padding: "14px 8px",
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  fontWeight: 500,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--ink)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--ink-muted)")}
              >
                View work
              </button>
            </div>
          </div>

          {/* Stats — minimal inline cards, no harsh borders */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "28px 36px",
            }}
          >
            {STATS.map((s) => (
              <div key={s.label}>
                <div
                  className="upper-mono"
                  style={{
                    color: "var(--ink-faint)",
                    marginBottom: 8,
                    letterSpacing: "0.12em",
                  }}
                >
                  {s.label}
                </div>
                <div
                  className="display"
                  style={{
                    fontSize: 30,
                    lineHeight: 1,
                    color: "var(--accent)",
                    fontWeight: 400,
                  }}
                >
                  {s.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
