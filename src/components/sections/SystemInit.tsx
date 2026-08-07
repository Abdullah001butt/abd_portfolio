"use client";

import { useGsapContext } from "@/hooks/useGsapContext";
import { gsap } from "@/lib/gsap";
import { bootModules, profile } from "@/lib/data";

export default function SystemInit() {
  const scope = useGsapContext<HTMLDivElement>((ctx, el) => {
    const rows = el.querySelectorAll<HTMLElement>("[data-boot-row]");
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: "top 70%",
        toggleActions: "play none none none",
      },
    });

    rows.forEach((row, i) => {
      const bar = row.querySelector("[data-bar]");
      const status = row.querySelector("[data-status]");
      tl.fromTo(
        row,
        { opacity: 0, x: -16 },
        { opacity: 1, x: 0, duration: 0.35, ease: "power2.out" },
        i * 0.22
      )
        .fromTo(
          bar,
          { scaleX: 0 },
          { scaleX: 1, duration: 0.5, ease: "power3.out", transformOrigin: "left" },
          i * 0.22 + 0.05
        )
        .fromTo(
          status,
          { opacity: 0 },
          { opacity: 1, duration: 0.2 },
          i * 0.22 + 0.5
        );
    });

    tl.fromTo(
      "[data-verified]",
      { opacity: 0, scale: 0.9, letterSpacing: "0.1em" },
      { opacity: 1, scale: 1, letterSpacing: "0.4em", duration: 0.6, ease: "power3.out" }
    );
  }, []);

  return (
    <section className="relative overflow-hidden bg-bg-void py-32" id="system">
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-10" />
      <div ref={scope} className="relative mx-auto max-w-3xl px-6">
        <p className="mb-2 font-mono text-xs uppercase tracking-[0.3em] text-red-bright/70">
          {"> "}SYSTEM INITIALIZING...
        </p>
        <div className="mb-10 h-[2px] w-full overflow-hidden bg-line">
          <div className="h-full w-full origin-left animate-pulse bg-gradient-to-r from-red-primary via-red-bright to-red-primary" />
        </div>

        <div className="flex flex-col gap-5">
          {bootModules.map((label) => (
            <div key={label} data-boot-row className="flex items-center gap-2 opacity-0 sm:gap-4">
              <span className="w-28 shrink-0 font-mono text-xs text-fg-dim sm:w-48 sm:text-sm md:w-64">
                {label}
              </span>
              <div className="h-[3px] flex-1 overflow-hidden rounded-full bg-line">
                <div data-bar className="h-full w-full rounded-full bg-red-bright" />
              </div>
              <span
                data-status
                className="w-10 shrink-0 text-right font-mono text-[10px] text-red-bright opacity-0 sm:w-14 sm:text-xs"
              >
                100%
              </span>
            </div>
          ))}
        </div>

        <div className="mt-14 border-t border-line pt-10">
          <p data-verified className="mb-6 font-mono text-sm tracking-[0.4em] text-red-bright opacity-0">
            IDENTITY VERIFIED
          </p>
          <p className="max-w-2xl text-lg leading-relaxed text-fg-dim sm:text-xl">
            {profile.summary}
          </p>
        </div>
      </div>
    </section>
  );
}
