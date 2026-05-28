import React, { useEffect, useRef } from "react";

/**
 * A custom cursor: a small accent dot + a soft outer ring that lags behind.
 * The ring expands when hovering over interactive elements.
 * Falls back to the native cursor on touch devices.
 */
export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    document.body.classList.add("has-custom-cursor");

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let isHover = false;
    let visible = false;

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!visible) {
        visible = true;
        dotRef.current?.classList.add("is-visible");
        ringRef.current?.classList.add("is-visible");
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }

      const target = e.target;
      const hoverable =
        target && target.closest
          ? target.closest('a, button, input, textarea, [data-cursor="hover"]')
          : null;
      if (hoverable && !isHover) {
        isHover = true;
        ringRef.current?.classList.add("is-hover");
      } else if (!hoverable && isHover) {
        isHover = false;
        ringRef.current?.classList.remove("is-hover");
      }
    };

    const onLeave = () => {
      visible = false;
      dotRef.current?.classList.remove("is-visible");
      ringRef.current?.classList.remove("is-visible");
    };

    let rafId;
    const tick = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      }
      rafId = requestAnimationFrame(tick);
    };
    tick();

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.body.classList.remove("has-custom-cursor");
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="custom-cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="custom-cursor-ring" aria-hidden="true" />
    </>
  );
}
