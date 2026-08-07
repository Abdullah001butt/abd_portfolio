"use client";

import { useGsapContext } from "@/hooks/useGsapContext";
import { gsap } from "@/lib/gsap";
import SectionHeading from "@/components/ui/SectionHeading";
import { experience } from "@/lib/data";

/**
 * Horizontal "data conveyor" — company modules translate across the
 * viewport as the section is pinned and scrubbed by scroll. Each module
 * scales/rotates up as it nears center to read as the "active" record.
 */
export default function Experience() {
  const scope = useGsapContext<HTMLDivElement>((ctx, el) => {
    const track = el.querySelector<HTMLElement>("[data-track]");
    const modules = el.querySelectorAll<HTMLElement>("[data-module]");
    if (!track) return;

    // The pinned/scrubbed "conveyor" is a desktop interaction — hijacking
    // vertical touch-scroll to drive horizontal motion on phones fights the
    // OS's native gesture and reads as broken, not cinematic. Mobile gets a
    // real horizontal scroll-snap track instead (see the JSX className).
    gsap.matchMedia().add("(min-width: 1024px)", () => {
      const distance = track.scrollWidth - window.innerWidth + 160;

      const scrollTween = gsap.to(track, {
        x: -distance,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: () => `+=${distance + window.innerHeight}`,
          scrub: 1,
          pin: true,
        },
      });

      modules.forEach((mod) => {
        gsap.fromTo(
          mod,
          { scale: 0.86, opacity: 0.4, rotateY: -12 },
          {
            scale: 1,
            opacity: 1,
            rotateY: 0,
            ease: "none",
            scrollTrigger: {
              trigger: mod,
              containerAnimation: scrollTween,
              start: "left 75%",
              end: "left 30%",
              scrub: true,
            },
          }
        );
      });
    });

    // Below the pin breakpoint the track scrolls natively (overflow-x-auto,
    // touch-driven) instead of the window — a ScrollTrigger watching window
    // scroll would never fire against it, so cards are just shown at full
    // opacity rather than left silently stuck mid-fade.
    gsap.matchMedia().add("(max-width: 1023px)", () => {
      gsap.set(modules, { opacity: 1, scale: 1, rotateY: 0 });
    });
  }, []);

  return (
    <section className="relative overflow-hidden bg-bg-void py-32" id="experience">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow="Career Log" title="Experience" />
      </div>

      <div ref={scope} className="relative mt-16 perspective-[1400px]">
        {/* Below lg: a real horizontal scroll-snap track (native touch
            scrolling). At lg+: GSAP takes over via translateX + pin, so
            native overflow scrolling is switched off to avoid double-driving
            the same axis. */}
        <div
          data-track
          data-lenis-prevent
          className="flex w-max gpu-layer snap-x snap-mandatory gap-8 overflow-x-auto px-[8vw] pb-4 lg:snap-none lg:overflow-visible lg:pb-0"
        >
          {experience.map((job) => (
            <article
              key={job.company}
              data-module
              className="glass gpu-layer relative w-[82vw] shrink-0 snap-center rounded-3xl p-8 sm:w-[46vw] lg:w-[32vw]"
            >
              <div className="mb-6 flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-widest text-red-bright/70">
                  {job.duration}
                </span>
                <span className="h-2 w-2 rounded-full bg-red-bright shadow-[0_0_12px_2px_rgba(255,46,46,0.7)]" />
              </div>
              <h3 className="font-display text-2xl font-medium text-fg">{job.role}</h3>
              <p className="mt-1 text-sm uppercase tracking-widest text-fg-dim">{job.company}</p>

              <div className="mt-5 flex flex-wrap gap-2">
                {job.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-line px-3 py-1 text-[11px] text-silver"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <ul className="mt-6 space-y-2 border-t border-line pt-5">
                {job.achievements.map((a) => (
                  <li key={a} className="flex gap-2 text-sm leading-relaxed text-fg-dim">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-red-bright" />
                    {a}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
