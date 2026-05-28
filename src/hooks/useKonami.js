import { useEffect } from "react";

const SEQUENCE = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
  "b", "a",
];

export function useKonami(onTrigger) {
  useEffect(() => {
    let position = 0;
    const handler = (e) => {
      const expected = SEQUENCE[position];
      const got = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      if (got === expected) {
        position += 1;
        if (position === SEQUENCE.length) {
          onTrigger();
          position = 0;
        }
      } else {
        position = got === SEQUENCE[0] ? 1 : 0;
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onTrigger]);
}
