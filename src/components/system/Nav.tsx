"use client";

import { useEffect, useState } from "react";
import { useActiveSection } from "@/hooks/useActiveSection";
import { SECTION_IDS } from "@/lib/sections";

const links = [
  { label: "Engineer", href: "#engineer", id: "engineer" },
  { label: "Work", href: "#creator", id: "creator" },
  { label: "Experience", href: "#experience", id: "experience" },
  { label: "Stack", href: "#stack", id: "stack" },
  { label: "Contact", href: "#contact", id: "contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const active = useActiveSection(SECTION_IDS);

  // Nav only links 5 of the 11 sections — while scrolled through one it
  // doesn't link (e.g. "system", "github"), highlight whichever linked
  // section comes last at-or-before it in document order, so the nav
  // never just goes blank.
  const activeIndex = SECTION_IDS.indexOf(active as (typeof SECTION_IDS)[number]);
  const activeLinkHref = links.reduce<string | null>((best, link) => {
    const linkIndex = SECTION_IDS.indexOf(link.id as (typeof SECTION_IDS)[number]);
    if (linkIndex <= activeIndex) return link.href;
    return best;
  }, null);

  // Lock scroll while the mobile drawer is open, and always close it on
  // resize past the mobile breakpoint so it can't get stuck open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 640) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <nav className="fixed inset-x-0 top-0 z-50">
      {/* Persistent bar — blend-difference only applies here, never to the
          opaque mobile drawer below (which needs a true solid background). */}
      <div className="flex items-center justify-between px-6 py-5 mix-blend-difference sm:px-10">
        <div className="flex items-center gap-5">
          <a href="#hero" data-cursor-hover className="font-display text-sm tracking-widest text-fg">
            A.BUTT
          </a>
          {/* Status badge — an honest, non-assumed claim about availability,
              only shown where there's room not to crowd the mobile bar. */}
          <div className="hidden items-center gap-2 border-l border-line pl-5 lg:flex">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-bright" />
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-fg-dim">
              Open to opportunities
            </span>
          </div>
        </div>

        {/* Desktop links */}
        <div className="hidden gap-8 sm:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              data-cursor-hover
              aria-current={l.href === activeLinkHref ? "true" : undefined}
              className={`flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] transition-colors hover:text-fg ${
                l.href === activeLinkHref ? "text-fg" : "text-fg/80"
              }`}
            >
              <span
                className={`h-1 w-1 rounded-full bg-red-bright transition-opacity duration-300 ${
                  l.href === activeLinkHref ? "opacity-100" : "opacity-0"
                }`}
              />
              {l.label}
            </a>
          ))}
        </div>

        {/* Placeholder to keep the bar's flex spacing — the real toggle
            button is rendered outside this blend-mode wrapper below, since
            mix-blend-difference creates its own stacking context and would
            trap the button's z-index underneath the drawer once it opens. */}
        <div className="h-8 w-8 sm:hidden" aria-hidden />
      </div>

      {/* Mobile menu toggle — sibling of the blend-mode bar and the drawer,
          with a z-index above both, so it always stays visible/clickable
          (as the "✕") even while the drawer is open on top of it. */}
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        data-cursor-hover
        className="absolute top-5 right-6 z-60 flex h-8 w-8 flex-col items-center justify-center gap-1.25 sm:hidden"
      >
        <span
          className={`h-px w-5 bg-fg transition-transform duration-300 ${open ? "translate-y-[6.5px] rotate-45" : ""}`}
        />
        <span
          className={`h-px w-5 bg-fg transition-opacity duration-300 ${open ? "opacity-0" : "opacity-100"}`}
        />
        <span
          className={`h-px w-5 bg-fg transition-transform duration-300 ${open ? "translate-y-[-6.5px] -rotate-45" : ""}`}
        />
      </button>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-bg-void transition-opacity duration-300 sm:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        {links.map((l, i) => (
          <a
            key={l.href}
            href={l.href}
            onClick={() => setOpen(false)}
            data-cursor-hover
            className="font-display text-2xl uppercase tracking-widest text-fg transition-transform duration-300"
            style={{ transitionDelay: open ? `${i * 60}ms` : "0ms" }}
          >
            {l.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
