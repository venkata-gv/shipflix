"use client";

import { useEffect } from "react";

export default function KeyboardNav() {
  useEffect(() => {
    const cards = () =>
      Array.from(document.querySelectorAll<HTMLElement>('[role="link"][aria-label^="Open"]'));

    const onKey = (e: KeyboardEvent) => {
      const active = document.activeElement as HTMLElement | null;
      const all = cards();
      if (all.length === 0) return;
      const i = active ? all.indexOf(active) : -1;

      if (e.key === "ArrowRight" && i >= 0 && i < all.length - 1) {
        e.preventDefault();
        all[i + 1].focus();
      } else if (e.key === "ArrowLeft" && i > 0) {
        e.preventDefault();
        all[i - 1].focus();
      } else if (e.key === "ArrowDown" && i >= 0) {
        e.preventDefault();
        const rect = all[i].getBoundingClientRect();
        const next = all
          .slice(i + 1)
          .find((el) => el.getBoundingClientRect().top > rect.top + 20);
        if (next) next.focus();
      } else if (e.key === "ArrowUp" && i >= 0) {
        e.preventDefault();
        const rect = all[i].getBoundingClientRect();
        const prev = all
          .slice(0, i)
          .reverse()
          .find((el) => el.getBoundingClientRect().top < rect.top - 20);
        if (prev) prev.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return null;
}
