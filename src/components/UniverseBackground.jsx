import React, { useEffect, useRef } from "react";

/**
 * Calm universe background.
 *
 * Real-night-sky pacing:
 *  - 180 stars that twinkle slowly (no horizontal drift — they stay put,
 *    the way actual stars look to us)
 *  - Bright stars get a soft halo
 *  - Rare slow meteors (one every 35–90 seconds, gentle 5x slower than before)
 *  - Layered on top of a deep gradient sky + 4 very slowly drifting nebulas
 *    (CSS, 90–160s loops) + a subtle ambient aurora band
 *  - Pauses when the tab is hidden
 *  - No mouse interaction — the sky just exists
 */
export default function UniverseBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    // Black hole focal position (matches .black-hole CSS at top:22%, right:8%).
    // Stars within this radius are dimmed / culled — they're being "consumed".
    const getBHCenter = () => ({
      x: width * 0.92 - 180, // right: 8% of viewport, then center of 360px disc
      y: height * 0.22 + 180,
      r: 230,                // soft gravitational radius
    });
    let bh = getBHCenter();

    // Single set of stars — no horizontal drift, just slow twinkle.
    // Size varies for depth perception (bigger = "closer/brighter").
    const stars = [];
    const STAR_COUNT = 450;
    let attempts = 0;
    while (stars.length < STAR_COUNT && attempts < STAR_COUNT * 8) {
      attempts++;
      const x = Math.random() * width;
      const y = Math.random() * height;
      const dx = x - bh.x;
      const dy = y - bh.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Hard-reject deep inside the event horizon — nothing escapes.
      if (dist < bh.r * 0.5) continue;

      // Distance-based opacity falloff (1 at edge of BH, full beyond gravity well)
      const proximity = Math.min(1, Math.max(0, (dist - bh.r * 0.5) / (bh.r * 1.5)));

      const isAccent = Math.random() < 0.04;
      const accentChoice = Math.random() < 0.5 ? "255, 150, 80" : "210, 190, 255";

      stars.push({
        x, y,
        size: rand(0.35, 1.7) * (0.6 + 0.4 * proximity),
        baseOpacity: rand(0.15, 0.6) * (0.4 + 0.6 * proximity),
        twinkleSpeed: rand(0.0008, 0.0035),
        twinkleOffset: Math.random() * Math.PI * 2,
        color: isAccent ? accentChoice : "255, 255, 255",
      });
    }

    // Very rare meteors
    const meteors = [];
    let lastMeteor = performance.now();
    let nextMeteorDelay = 8000 + Math.random() * 14000; // 8–22s

    let frame = 0;
    let running = true;
    let rafId;

    const onVisibility = () => {
      running = !document.hidden;
      if (running) tick();
    };
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("resize", resize);

    function tick() {
      if (!running) return;
      frame++;
      ctx.clearRect(0, 0, width, height);

      // Twinkling stars — stationary
      for (const s of stars) {
        const twinkle = 0.55 + 0.45 * Math.sin(frame * s.twinkleSpeed + s.twinkleOffset);
        const finalOpacity = s.baseOpacity * twinkle;
        const finalSize = s.size * (0.9 + twinkle * 0.2);

        ctx.beginPath();
        ctx.arc(s.x, s.y, finalSize, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${s.color}, ${finalOpacity})`;
        ctx.fill();

        // Halo for the brightest stars only
        if (s.size > 1.15) {
          const haloRadius = finalSize * 4.5;
          const halo = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, haloRadius);
          halo.addColorStop(0, `rgba(${s.color}, ${finalOpacity * 0.28})`);
          halo.addColorStop(1, `rgba(${s.color}, 0)`);
          ctx.beginPath();
          ctx.arc(s.x, s.y, haloRadius, 0, Math.PI * 2);
          ctx.fillStyle = halo;
          ctx.fill();
        }
      }

      // Rare, slow meteors
      const now = performance.now();
      if (now - lastMeteor > nextMeteorDelay) {
        const angle = Math.PI * (0.12 + Math.random() * 0.16);
        meteors.push({
          x: Math.random() * width * 0.9,
          y: Math.random() * height * 0.35,
          length: 70 + Math.random() * 60,
          speed: 2.2 + Math.random() * 1.3, // ~3× slower than before
          angle,
          life: 1,
        });
        lastMeteor = now;
        nextMeteorDelay = 35000 + Math.random() * 55000;
      }

      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i];
        m.x += Math.cos(m.angle) * m.speed;
        m.y += Math.sin(m.angle) * m.speed;
        m.life -= 0.0055; // ~2× longer than before
        if (m.life <= 0 || m.x > width + 200 || m.y > height + 200) {
          meteors.splice(i, 1);
          continue;
        }
        const tailX = m.x - Math.cos(m.angle) * m.length;
        const tailY = m.y - Math.sin(m.angle) * m.length;
        const grad = ctx.createLinearGradient(m.x, m.y, tailX, tailY);
        grad.addColorStop(0, `rgba(255, 255, 255, ${m.life * 0.9})`);
        grad.addColorStop(0.5, `rgba(212, 255, 58, ${m.life * 0.45})`);
        grad.addColorStop(1, "rgba(255, 255, 255, 0)");
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.4;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();

        // Head glow
        ctx.beginPath();
        ctx.arc(m.x, m.y, 1.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${m.life})`;
        ctx.fill();
      }

      rafId = requestAnimationFrame(tick);
    }
    tick();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <>
      {/* Deep gradient sky */}
      <div className="space-base" />

      {/* Slowly drifting nebula light */}
      <div className="nebula nebula-1" />
      <div className="nebula nebula-2" />
      <div className="nebula nebula-3" />
      <div className="nebula nebula-4" />

      {/* Warm accretion glow leaking outward */}
      <div className="space-aurora" />

      {/* The black hole — event horizon + accretion disk */}
      <div className="black-hole" aria-hidden="true" />

      {/* Edge vignette (much darker now — deep void) */}
      <div className="space-vignette" />

      {/* Stars */}
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
    </>
  );
}

function rand(min, max) {
  return min + Math.random() * (max - min);
}
