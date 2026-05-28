import React, { useCallback, useState } from "react";
import UniverseBackground from "./components/UniverseBackground.jsx";
import StatusTicker from "./components/StatusTicker.jsx";
import Nav from "./components/Nav.jsx";
import Hero from "./components/Hero.jsx";
import Marquee from "./components/Marquee.jsx";
import Experience from "./components/Experience.jsx";
import Projects from "./components/Projects.jsx";
import Skills from "./components/Skills.jsx";
import Honors from "./components/Honors.jsx";
import AILab from "./components/AILab.jsx";
import Footer from "./components/Footer.jsx";
import CustomCursor from "./components/CustomCursor.jsx";
import CommandPalette from "./components/CommandPalette.jsx";
import ChatFAB from "./components/ChatFAB.jsx";
import { useScrollProgress } from "./hooks/useScrollReveal.js";
import { useKonami } from "./hooks/useKonami.js";

export default function App() {
  const [progress, setProgress] = useState(0);
  const [konamiOpen, setKonamiOpen] = useState(false);
  useScrollProgress(setProgress);

  const onKonami = useCallback(() => {
    document.body.classList.add("konami-mode");
    setKonamiOpen(true);
    setTimeout(() => document.body.classList.remove("konami-mode"), 1600);
    setTimeout(() => setKonamiOpen(false), 3200);
  }, []);
  useKonami(onKonami);

  return (
    <>
      {/* Calm night sky — sits behind everything */}
      <UniverseBackground />

      {/* Custom cursor */}
      <CustomCursor />

      {/* Command palette (⌘K) */}
      <CommandPalette />

      {/* Floating Ask-the-AI button (bottom-right) */}
      <ChatFAB />

      {/* Konami easter-egg toast */}
      {konamiOpen && (
        <div className="konami-toast">✦ Hyperspace engaged ✦</div>
      )}

      {/* Scroll progress */}
      <div
        className="scroll-progress"
        style={{ transform: `scaleX(${progress})` }}
      />

      {/* Grain overlay on top of everything */}
      <div className="grain-overlay" />

      <StatusTicker />
      <Nav />

      <main style={{ paddingTop: 28, position: "relative", zIndex: 1 }}>
        <Hero />
        <Marquee />
        <Experience />
        <Projects />
        <Skills />
        <Honors />
        <AILab />
        <Footer />
      </main>
    </>
  );
}
