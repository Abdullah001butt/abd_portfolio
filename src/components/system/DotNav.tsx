"use client";

import { useActiveSection } from "@/hooks/useActiveSection";
import { SECTIONS, SECTION_IDS } from "@/lib/sections";

/**
 * Side dot-rail — the only real orientation device on an otherwise
 * featureless 11-section single-page scroll. Current section highlights
 * automatically (useActiveSection); each dot jumps on click and reveals its
 * label on hover, kept out of the way on mobile where vertical space is at
 * a premium and a thumb-reachable rail isn't worth the layout cost.
 */
export default function DotNav() {
  const active = useActiveSection(SECTION_IDS);

  return (
    <nav
      aria-label="Section navigation"
      className="fixed top-1/2 right-6 z-40 hidden -translate-y-1/2 flex-col items-end gap-3 lg:flex"
    >
      {SECTIONS.map((s) => {
        const isActive = active === s.id;
        return (
          <a
            key={s.id}
            href={`#${s.id}`}
            data-cursor-hover
            aria-current={isActive ? "true" : undefined}
            className="group flex items-center gap-3"
          >
            <span
              className={`pointer-events-none whitespace-nowrap rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest opacity-0 transition-all duration-300 group-hover:opacity-100 ${
                isActive
                  ? "border-red-bright/40 bg-bg-elevated/90 text-fg"
                  : "border-line bg-bg-elevated/90 text-fg-dim"
              }`}
            >
              {s.label}
            </span>
            <span
              className={`block rounded-full transition-all duration-300 ${
                isActive
                  ? "h-2.5 w-2.5 bg-red-bright shadow-[0_0_10px_2px_rgba(255,46,46,0.6)]"
                  : "h-1.5 w-1.5 bg-fg-dim/50 group-hover:bg-fg-dim"
              }`}
            />
          </a>
        );
      })}
    </nav>
  );
}
