import React, { useEffect, useState } from "react";

export default function StatusTicker() {
  const [time, setTime] = useState(getTime());

  useEffect(() => {
    const t = setInterval(() => setTime(getTime()), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <div
      className="status-ticker"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 28,
        background: "var(--bg)",
        borderBottom: "1px solid var(--border)",
        zIndex: 49,
        display: "flex",
        alignItems: "center",
        fontFamily: "var(--font-mono)",
        fontSize: 10,
        letterSpacing: "0.15em",
        textTransform: "uppercase",
        color: "var(--ink-faint)",
        padding: "0 48px",
        overflow: "hidden",
      }}
    >
      <span style={{ color: "var(--accent)" }} className="pulse-dot">●</span>
      <span style={{ marginLeft: 10 }}>STATUS: Available for senior roles</span>
      <span style={{ margin: "0 24px", opacity: 0.3 }}>/</span>
      <span>Now in Ghaziabad, IN</span>
      <span style={{ margin: "0 24px", opacity: 0.3 }}>/</span>
      <span className="hide-mobile">Building: AI-augmented platforms</span>
      <span style={{ margin: "0 24px", opacity: 0.3 }} className="hide-mobile">/</span>
      <span style={{ marginLeft: "auto" }}>{time} IST</span>
    </div>
  );
}

function getTime() {
  return new Date().toLocaleTimeString("en-US", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: "Asia/Kolkata",
  });
}
