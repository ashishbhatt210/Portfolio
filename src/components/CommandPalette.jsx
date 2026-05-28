import React, { useEffect, useState, useRef, useMemo } from "react";
import { PROFILE } from "../data/resume.js";

const COMMANDS = [
  { id: "home",       label: "Index",                group: "Navigate", action: "scroll", target: "home" },
  { id: "experience", label: "Work Experience",      group: "Navigate", action: "scroll", target: "experience" },
  { id: "projects",   label: "Selected Projects",    group: "Navigate", action: "scroll", target: "projects" },
  { id: "skills",     label: "Skills & Stack",       group: "Navigate", action: "scroll", target: "skills" },
  { id: "honors",     label: "Honors & Awards",      group: "Navigate", action: "scroll", target: "honors" },
  { id: "ai-lab",     label: "AI Lab — live demos",  group: "Navigate", action: "scroll", target: "ai-lab" },

  { id: "resume",       label: "Download Resume (PDF)", group: "Actions",  action: "url",    target: "/Ashish_Bhatt_Resume.pdf",       external: true },
  { id: "email",        label: "Email Ashish",          group: "Actions",  action: "url",    target: `mailto:${PROFILE.email}` },
  { id: "ai-chat",      label: "Ask the AI about Ashish", group: "Actions", action: "scroll", target: "ai-lab" },

  { id: "linkedin",     label: "LinkedIn",             group: "Profiles", action: "url",    target: PROFILE.social.linkedin,   external: true },
  { id: "github",       label: "GitHub",               group: "Profiles", action: "url",    target: PROFILE.social.github,     external: true },
  { id: "leetcode",     label: "LeetCode",             group: "Profiles", action: "url",    target: PROFILE.social.leetcode,   external: true },
  { id: "codechef",     label: "CodeChef",             group: "Profiles", action: "url",    target: PROFILE.social.codechef,   external: true },
  { id: "codeforces",   label: "Codeforces",           group: "Profiles", action: "url",    target: PROFILE.social.codeforces, external: true },
];

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIdx, setActiveIdx] = useState(0);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return COMMANDS;
    return COMMANDS.filter(
      (c) =>
        c.label.toLowerCase().includes(q) ||
        c.group.toLowerCase().includes(q) ||
        c.id.toLowerCase().includes(q)
    );
  }, [query]);

  const grouped = useMemo(() => {
    const out = {};
    filtered.forEach((c) => {
      if (!out[c.group]) out[c.group] = [];
      out[c.group].push(c);
    });
    return out;
  }, [filtered]);

  // Toggle hotkey: ⌘K / Ctrl-K. Esc closes.
  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === "Escape" && open) {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open]);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActiveIdx(0);
      setTimeout(() => inputRef.current?.focus(), 24);
    }
  }, [open]);

  const execute = (cmd) => {
    if (cmd.action === "scroll") {
      document.getElementById(cmd.target)?.scrollIntoView({ behavior: "smooth" });
    } else if (cmd.action === "url") {
      if (cmd.external) window.open(cmd.target, "_blank", "noopener,noreferrer");
      else window.location.href = cmd.target;
    }
    setOpen(false);
  };

  const onKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIdx((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIdx((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const cmd = filtered[activeIdx];
      if (cmd) execute(cmd);
    }
  };

  // Keep the active item scrolled into view
  useEffect(() => {
    const active = listRef.current?.querySelector(".cmd-item.is-active");
    active?.scrollIntoView({ block: "nearest" });
  }, [activeIdx]);

  if (!open) return null;

  let flat = -1;
  return (
    <div className="cmd-overlay" onClick={() => setOpen(false)}>
      <div className="cmd-palette" onClick={(e) => e.stopPropagation()} role="dialog" aria-label="Command palette">
        <div className="cmd-search-row">
          <span className="accent" style={{ fontSize: 14 }}>⌘</span>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActiveIdx(0);
            }}
            onKeyDown={onKeyDown}
            placeholder="Jump to a section, action, or profile…"
            className="cmd-input"
            spellCheck={false}
          />
          <span className="cmd-esc-hint mono">esc</span>
        </div>

        <div className="cmd-results" ref={listRef}>
          {filtered.length === 0 && (
            <div className="cmd-empty">No matches for "{query}"</div>
          )}
          {Object.entries(grouped).map(([group, items]) => (
            <div key={group} className="cmd-group">
              <div className="cmd-group-label upper-mono">{group}</div>
              {items.map((cmd) => {
                flat++;
                const idxOfThis = flat;
                const isActive = idxOfThis === activeIdx;
                return (
                  <button
                    key={cmd.id}
                    className={`cmd-item${isActive ? " is-active" : ""}`}
                    onClick={() => execute(cmd)}
                    onMouseEnter={() => setActiveIdx(idxOfThis)}
                  >
                    <span>{cmd.label}</span>
                    <span className="cmd-meta mono">
                      {cmd.external && <span>↗</span>}
                      {isActive && <span style={{ marginLeft: 8 }}>↵</span>}
                    </span>
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        <div className="cmd-footer mono">
          <span><kbd>↑</kbd><kbd>↓</kbd> navigate</span>
          <span><kbd>↵</kbd> select</span>
          <span><kbd>esc</kbd> close</span>
        </div>
      </div>
    </div>
  );
}
