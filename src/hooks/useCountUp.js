import { useEffect, useRef, useState } from "react";

/**
 * Animate a number from 0 → target when the element enters the viewport.
 * Returns { ref, value, formatted } — attach `ref` to the element to observe.
 */
export function useCountUp(target, options = {}) {
  const {
    duration = 1800,
    threshold = 0.4,
    prefix = "",
    suffix = "",
    locale = "en-US",
  } = options;

  const [value, setValue] = useState(0);
  const ref = useRef(null);
  const startedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || startedRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !startedRef.current) {
          startedRef.current = true;
          observer.disconnect();
          const start = performance.now();
          const tick = (now) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
            setValue(Math.floor(target * eased));
            if (progress < 1) requestAnimationFrame(tick);
            else setValue(target);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration, threshold]);

  const formatted = `${prefix}${value.toLocaleString(locale)}${suffix}`;
  return { ref, value, formatted };
}
