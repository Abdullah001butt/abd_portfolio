"use client";

import { useEffect, useRef } from "react";

/**
 * Thin bar tracking overall scroll progress (0–100%) — the macro
 * complement to DotNav's per-section indicator. Writes directly to the
 * DOM via a ref on scroll rather than React state, so a fast scroll
 * doesn't trigger a re-render on every frame.
 */
export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onScroll() {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${Math.min(1, Math.max(0, progress))})`;
      }
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="fixed inset-x-0 top-0 z-70 h-[2px] bg-transparent">
      <div
        ref={barRef}
        className="h-full origin-left bg-gradient-to-r from-red-primary via-red-bright to-red-primary"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
