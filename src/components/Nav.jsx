import React, { useEffect, useState } from "react";

const NAV_ITEMS = [
  { id: "home", label: "Index" },
  { id: "experience", label: "Work" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Stack" },
  { id: "honors", label: "Honors" },
  { id: "ai-lab", label: "AI Lab" },
];

export default function Nav() {
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      for (const item of NAV_ITEMS) {
        const el = document.getElementById(item.id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= 180 && rect.bottom >= 180) {
          setActive(item.id);
          break;
        }
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className="nav-bar"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        padding: scrolled ? "16px 48px" : "24px 48px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: scrolled ? "rgba(10,10,12,0.75)" : "transparent",
        backdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
        borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
        transition: "all 0.3s var(--ease)",
      }}
    >
      <button
        onClick={() => scrollTo("home")}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          fontFamily: "var(--font-mono)",
          fontSize: 12,
          fontWeight: 600,
          letterSpacing: "0.05em",
        }}
      >
        <span
          style={{
            display: "inline-block",
            width: 8,
            height: 8,
            background: "var(--accent)",
            borderRadius: "50%",
            boxShadow: "0 0 12px var(--accent)",
          }}
          className="pulse-dot"
        />
        ASHISH.BHATT
      </button>

      <div className="hide-mobile" style={{ display: "flex", gap: 2 }}>
        {NAV_ITEMS.map((item, i) => (
          <button
            key={item.id}
            onClick={() => scrollTo(item.id)}
            style={{
              padding: "8px 14px",
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: active === item.id ? "var(--accent)" : "var(--ink-muted)",
              transition: "color 0.2s",
              position: "relative",
            }}
          >
            <span style={{ opacity: 0.5, marginRight: 6 }}>0{i + 1}</span>
            {item.label}
          </button>
        ))}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <button
          type="button"
          className="cmdk-hint hide-mobile"
          onClick={() => {
            window.dispatchEvent(
              new KeyboardEvent("keydown", { key: "k", metaKey: true })
            );
          }}
          aria-label="Open command palette"
        >
          <kbd>⌘</kbd><kbd>K</kbd>
        </button>
        <a
          href="/Ashish_Bhatt_Resume.pdf"
          download="Ashish_Bhatt_Resume.pdf"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            padding: "10px 16px",
            color: "var(--ink-muted)",
            borderRadius: 100,
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--ink)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--ink-muted)")}
        >
          Resume <span aria-hidden="true">↓</span>
        </a>
        <a
          href="mailto:bhattashish210@gmail.com"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            padding: "10px 18px",
            border: "1px solid var(--accent-dim)",
            color: "var(--accent)",
            borderRadius: 100,
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "var(--accent)";
            e.currentTarget.style.color = "var(--bg)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.color = "var(--accent)";
          }}
        >
          Contact →
        </a>
      </div>
    </nav>
  );
}
