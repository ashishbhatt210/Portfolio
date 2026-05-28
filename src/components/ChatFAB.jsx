import React, { useEffect, useState } from "react";

/**
 * Floating chat button — fixed bottom-right.
 * Jumps the visitor straight to the Ask-Ashish feature, and hides itself
 * when that section is already in view (so it doesn't get in the way).
 */
export default function ChatFAB() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const target = document.getElementById("ask-ashish");
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => setHidden(entry.isIntersecting),
      { threshold: 0.3 }
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  const onClick = () => {
    document
      .getElementById("ask-ashish")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={`chat-fab${hidden ? " is-hidden" : ""}`}
      aria-label="Ask the AI about Ashish"
      aria-hidden={hidden}
      tabIndex={hidden ? -1 : 0}
      title="Ask the AI"
    >
      <span className="chat-fab-pulse" aria-hidden="true" />
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      </svg>
      <span className="chat-fab-tooltip">Ask the AI</span>
    </button>
  );
}
