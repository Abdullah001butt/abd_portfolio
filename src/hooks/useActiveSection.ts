"use client";

import { useEffect, useState } from "react";

/**
 * Tracks which section id is currently most in view, via IntersectionObserver
 * (cheap — no scroll-event polling). Used to drive both the side dot-nav and
 * the top Nav's active-link highlight, so a visitor always has orientation
 * on what would otherwise be a very long, featureless single-page scroll.
 */
export function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState(ids[0] ?? "");

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick whichever visible section's top is closest to the viewport's
        // upper third — reads as "the section you're actually looking at"
        // more reliably than "largest intersection ratio" on tall sections.
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length === 0) return;

        const closest = visible.reduce((best, entry) =>
          Math.abs(entry.boundingClientRect.top) < Math.abs(best.boundingClientRect.top) ? entry : best
        );
        setActive(closest.target.id);
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}
