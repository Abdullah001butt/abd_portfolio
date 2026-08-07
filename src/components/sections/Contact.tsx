"use client";

import { useState } from "react";
import { profile } from "@/lib/data";

const links = [
  { label: "Email", value: profile.email, href: `mailto:${profile.email}` },
  { label: "LinkedIn", value: "abdullah-butt", href: profile.linkedin },
  { label: "GitHub", value: "Abdullah001butt", href: profile.github },
  { label: "Resume", value: "Download", href: "/resume.docx" },
];

export default function Contact() {
  const [active, setActive] = useState(false);

  return (
    <section className="relative overflow-hidden bg-bg-void py-40" id="contact">
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-10" />
      <div className="relative mx-auto flex max-w-4xl flex-col items-center px-6 text-center">
        <p className="mb-4 text-xs uppercase tracking-[0.4em] text-red-bright/80">Let&apos;s Connect</p>
        <h2 className="font-display text-4xl font-medium leading-tight text-fg sm:text-6xl">
          Activate the <span className="text-gradient-red">AI</span>
        </h2>

        <button
          data-cursor-hover
          onClick={() => setActive((v) => !v)}
          className="group relative mt-16 flex h-40 w-40 items-center justify-center rounded-full border border-red-bright/50 sm:h-52 sm:w-52"
        >
          <span
            className={`absolute inset-0 rounded-full border border-red-bright/30 transition-transform duration-700 ${
              active ? "scale-150 opacity-0" : "scale-100 opacity-100"
            }`}
          />
          <span
            className={`absolute inset-0 rounded-full border border-red-bright/20 transition-transform duration-1000 ${
              active ? "scale-[1.8] opacity-0" : "scale-100 opacity-100"
            }`}
          />
          <span className="absolute inset-0 rounded-full bg-red-primary/10 blur-2xl transition-opacity duration-500 group-hover:opacity-80" />
          <span className="font-display relative z-10 text-sm font-medium uppercase tracking-[0.2em] text-fg">
            Initiate
            <br />
            Connection
          </span>
        </button>

        <div
          className={`mt-16 grid w-full gap-4 overflow-hidden transition-all duration-700 sm:grid-cols-2 ${
            active ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target={l.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              data-cursor-hover
              className="glass flex items-center justify-between rounded-xl px-5 py-4 text-left transition-colors hover:border-red-bright/50"
            >
              <span className="text-xs uppercase tracking-widest text-fg-dim">{l.label}</span>
              <span className="text-sm text-fg">{l.value}</span>
            </a>
          ))}
        </div>
      </div>

      <footer className="relative mt-32 border-t border-line pt-8 text-center text-xs text-fg-dim">
        © {new Date().getFullYear()} {profile.shortName}. Built with Next.js, GSAP &amp; Lenis.
      </footer>
    </section>
  );
}
