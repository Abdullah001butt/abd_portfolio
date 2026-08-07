"use client";

import { useGsapContext } from "@/hooks/useGsapContext";
import { gsap } from "@/lib/gsap";
import SectionHeading from "@/components/ui/SectionHeading";
import { process } from "@/lib/data";

export default function Process() {
  const scope = useGsapContext<HTMLDivElement>((ctx, el) => {
    // Horizontal line (lg+) draws left-to-right; vertical line (below lg,
    // where stages stack) draws top-to-bottom instead — same beat, axis
    // matches whichever layout is actually visible.
    gsap.matchMedia().add("(min-width: 1024px)", () => {
      gsap.fromTo(
        "[data-line-h]",
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          transformOrigin: "left",
          scrollTrigger: { trigger: el, start: "top 70%", end: "bottom 60%", scrub: 1 },
        }
      );
    });
    gsap.matchMedia().add("(max-width: 1023px)", () => {
      gsap.fromTo(
        "[data-line-v]",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          transformOrigin: "top",
          scrollTrigger: { trigger: el, start: "top 70%", end: "bottom 60%", scrub: 1 },
        }
      );
    });
    gsap.fromTo(
      el.querySelectorAll("[data-stage]"),
      { opacity: 0, y: 24 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.08,
        duration: 0.5,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 65%" },
      }
    );
  }, []);

  return (
    <section className="relative bg-bg-void py-32" id="process">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow="Workflow" title="My Process" align="center" />

        <div ref={scope} className="relative mt-20">
          {/* Horizontal connector — single-row layout at lg+ only */}
          <div className="absolute top-5 right-0 left-0 hidden h-[2px] bg-line lg:block">
            <div data-line-h className="h-full bg-gradient-to-r from-red-primary to-red-bright" />
          </div>
          {/* Vertical connector — stacked layout below lg */}
          <div className="absolute top-0 bottom-0 left-5 w-[2px] bg-line lg:hidden">
            <div data-line-v className="w-full bg-gradient-to-b from-red-primary to-red-bright" style={{ height: "100%" }} />
          </div>

          <div className="flex flex-col gap-y-10 lg:flex-row lg:flex-wrap lg:justify-between lg:gap-y-12">
            {process.map((stage, i) => (
              <div
                key={stage}
                data-stage
                className="flex flex-row items-center gap-4 opacity-0 lg:flex-col lg:gap-0"
              >
                <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-red-bright/50 bg-bg-void font-mono text-xs text-red-bright">
                  {i + 1}
                </div>
                <p className="text-xs uppercase tracking-[0.25em] text-fg-dim lg:mt-4">{stage}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
