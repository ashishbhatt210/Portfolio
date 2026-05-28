import React from "react";
import { PROFILE, EDUCATION } from "../data/resume.js";

export default function Footer() {
  const links = [
    { label: "LinkedIn", url: PROFILE.social.linkedin },
    { label: "GitHub", url: PROFILE.social.github },
    { label: "LeetCode", url: PROFILE.social.leetcode },
    { label: "CodeChef", url: PROFILE.social.codechef },
    { label: "Codeforces", url: PROFILE.social.codeforces },
  ];

  return (
    <footer className="footer-wrapper" style={{ padding: "120px 48px 60px", borderTop: "1px solid var(--border)", position: "relative", overflow: "hidden" }}>
      {/* Atmospheric glow */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          bottom: "-50%",
          width: 800,
          height: 800,
          transform: "translateX(-50%)",
          background: "radial-gradient(circle, rgba(212,255,58,0.06) 0%, transparent 70%)",
          filter: "blur(80px)",
          pointerEvents: "none",
        }}
      />

      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <div
          className="footer-top-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1.4fr 1fr",
            gap: 60,
            paddingBottom: 80,
            borderBottom: "1px solid var(--border)",
          }}
        >
          <div>
            <div className="upper-mono accent" style={{ marginBottom: 24 }}>
              ⊹ Get in touch
            </div>
            <h2
              className="display"
              style={{
                fontSize: "clamp(56px, 8vw, 120px)",
                lineHeight: 0.95,
                fontWeight: 400,
                marginBottom: 32,
                letterSpacing: "-0.02em",
              }}
            >
              Let's build<br />
              <span className="italic" style={{ color: "var(--accent)" }}>something good.</span>
            </h2>
            <a
              href={`mailto:${PROFILE.email}`}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 14,
                fontSize: 20,
                color: "var(--ink)",
                paddingBottom: 4,
                borderBottom: "1px solid var(--accent)",
                transition: "all 0.2s",
              }}
            >
              {PROFILE.email}
              <span className="accent">→</span>
            </a>
            <div className="mono" style={{ marginTop: 20, fontSize: 13, color: "var(--ink-muted)" }}>
              {PROFILE.phone}
            </div>
          </div>

          <div className="footer-elsewhere" style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "flex-start", paddingTop: 60 }}>
            <div className="upper-mono" style={{ color: "var(--ink-faint)", marginBottom: 12 }}>
              Elsewhere
            </div>
            {links.map((l) => (
              <a
                key={l.label}
                href={l.url}
                target="_blank"
                rel="noreferrer"
                className="display"
                style={{
                  fontSize: 28,
                  color: "var(--ink)",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 12,
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--accent)";
                  e.currentTarget.style.gap = "20px";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--ink)";
                  e.currentTarget.style.gap = "12px";
                }}
              >
                {l.label} <span style={{ fontSize: 18 }}>→</span>
              </a>
            ))}
          </div>
        </div>

        <div
          style={{
            marginTop: 40,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <div className="upper-mono" style={{ color: "var(--ink-faint)" }}>
            © 2026 · Ashish Bhatt · Built in {PROFILE.location}
          </div>
          <div className="upper-mono" style={{ color: "var(--ink-faint)" }}>
            B.Tech ECE · {EDUCATION.shortName} '{EDUCATION.period.slice(-2)}
          </div>
          <div className="upper-mono" style={{ color: "var(--ink-faint)" }}>
            React · Vite · Claude API · Vercel
          </div>
        </div>
      </div>
    </footer>
  );
}
