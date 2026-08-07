"use client";

import { useEffect, useState } from "react";

const links = [
  { label: "Engineer", href: "#engineer" },
  { label: "Work", href: "#creator" },
  { label: "Experience", href: "#experience" },
  { label: "Stack", href: "#stack" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

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
        <a href="#hero" data-cursor-hover className="font-display text-sm tracking-widest text-fg">
          A.BUTT
        </a>

        {/* Desktop links */}
        <div className="hidden gap-8 sm:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              data-cursor-hover
              className="text-xs uppercase tracking-[0.2em] text-fg/80 transition-colors hover:text-fg"
            >
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
