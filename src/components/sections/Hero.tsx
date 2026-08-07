"use client";

import { gsap } from "@/lib/gsap";
import { useGsapContext } from "@/hooks/useGsapContext";
import ScrambleText from "@/components/ui/ScrambleText";
import TypingText from "@/components/ui/TypingText";
import HeroStat from "@/components/ui/HeroStat";
import CornerBrackets from "@/components/ui/CornerBrackets";
import ParticleField from "@/components/ui/ParticleField";
import { profile } from "@/lib/data";

export default function Hero() {
  const scope = useGsapContext<HTMLDivElement>(() => {
    // ── Boot-in sequence: the module resolves into focus, the scanner
    // sweeps once, the brackets snap in, then identity resolves. Runs on
    // every viewport — only the scroll-pin below is desktop-only. ──
    const intro = gsap.timeline({ delay: 0.15 });

    intro
      .from(".hero-module", {
        opacity: 0,
        scale: 0.85,
        filter: "blur(18px)",
        duration: 1.1,
        ease: "power3.out",
      })
      .from(
        ".hero-brackets span",
        { opacity: 0, scale: 1.6, duration: 0.5, stagger: 0.06, ease: "power2.out" },
        "-=0.5"
      )
      .fromTo(
        ".hero-scan-sweep",
        { yPercent: -110 },
        { yPercent: 210, duration: 1.4, ease: "power1.inOut" },
        "-=0.6"
      )
      .from(".hero-reticle", { opacity: 0, duration: 0.6 }, "-=1")
      .from(
        ".hero-tag",
        { opacity: 0, y: 8, duration: 0.5, stagger: 0.1 },
        "-=0.4"
      )
      .from(
        ".hero-stat",
        { opacity: 0, x: (i, t) => (t.classList.contains("hero-stat-right") ? 24 : -24), duration: 0.6, stagger: 0.12 },
        "-=0.5"
      );

    // Ambient continuous scan sweep + ring rotation
    gsap.to(".hero-scan-loop", {
      yPercent: 210,
      duration: 3.2,
      repeat: -1,
      ease: "none",
      delay: 2.5,
    });
    gsap.to(".hero-ring-slow", { rotate: 360, duration: 50, repeat: -1, ease: "none" });
    gsap.to(".hero-ring-fast", { rotate: -360, duration: 30, repeat: -1, ease: "none" });

    // ── Scroll-tied: composition breathes slightly, then the whole rig
    // recedes/fades as the next section takes over. No fullscreen zoom. ──
    // Desktop only — pinning a section shorter than its content on small
    // phones (address-bar resizing, short landscape viewports) is what
    // causes clipped/cut-off HUD elements, so mobile just scrolls normally.
    // gsap.matchMedia() created inside an active gsap.context() is tracked
    // and reverted automatically alongside it — no separate cleanup needed.
    gsap.matchMedia().add("(min-width: 768px)", () => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: scope.current,
            start: "top top",
            end: "+=100%",
            scrub: 1,
            pin: true,
          },
        })
        .to(".hero-module", { scale: 1.06, ease: "none" }, 0)
        .to(".hero-grid", { opacity: 0.4, ease: "none" }, 0)
        .to(".hero-ring", { opacity: 0, scale: 1.25, ease: "none" }, 0.1)
        .to(".hero-stat-left", { xPercent: -30, opacity: 0, ease: "none" }, 0)
        .to(".hero-stat-right", { xPercent: 30, opacity: 0, ease: "none" }, 0)
        .to(".hero-copy", { yPercent: 15, opacity: 0, ease: "none" }, 0.05);
    });
  }, []);

  return (
    <section
      ref={scope}
      className="relative flex min-h-svh w-full flex-col items-center justify-center overflow-hidden bg-bg-void py-24 md:h-screen md:py-0"
      id="hero"
    >
      {/* Layer: background grid */}
      <div className="hero-grid grid-bg absolute inset-0 opacity-15" />

      {/* Layer: particles */}
      <ParticleField />

      {/* Layer: ambient rings, centered behind the module */}
      <div className="hero-ring hero-ring-slow gpu-layer pointer-events-none absolute left-1/2 top-[42%] h-[46vmin] w-[46vmin] -translate-x-1/2 -translate-y-1/2 rounded-full border border-red-primary/20 sm:h-[38vmin] sm:w-[38vmin]" />
      <div className="hero-ring hero-ring-fast gpu-layer pointer-events-none absolute left-1/2 top-[42%] h-[34vmin] w-[34vmin] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-red-bright/15 sm:h-[28vmin] sm:w-[28vmin]" />

      {/* Status pulse — below the fixed Nav, never overlapping it */}
      <div className="pointer-events-none absolute inset-x-0 top-20 flex justify-center sm:top-24">
        <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-red-bright/80">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-bright" />
          system online
        </span>
      </div>

      {/* Left telemetry — flanks the module, doesn't touch the face */}
      <div className="hero-stat hero-stat-left pointer-events-none absolute left-6 top-[42%] hidden -translate-y-1/2 flex-col gap-8 sm:left-10 lg:flex">
        <HeroStat label="Neural Load" base={95} unit="%" />
        <HeroStat label="Throughput" base={15.9} unit="gb/s" />
        <HeroStat label="Latency" base={10.9} unit="ms" />
      </div>

      {/* Right telemetry */}
      <div className="hero-stat hero-stat-right pointer-events-none absolute right-6 top-[42%] hidden -translate-y-1/2 flex-col gap-8 sm:right-10 lg:flex">
        <HeroStat label="Vector Index" base={135.1} unit="%" align="right" />
        <HeroStat label="Coherence" base={89.1} unit="%" align="right" />
        <HeroStat label="Integrity" base={98.2} unit="%" align="right" />
      </div>

      {/* ── The biometric scan module — the video lives here, contained. ── */}
      <div className="relative flex flex-1 items-center justify-center px-6 pt-10">
        <div className="hero-module gpu-layer relative aspect-3/4 w-[52vmin] max-w-[300px] sm:w-[30vmin] sm:max-w-85">
          {/* Top label chip */}
          <div className="hero-tag absolute -top-9 left-0 font-mono text-[9px] uppercase tracking-[0.25em] text-fg-dim">
            subject · rj-001
          </div>
          <div className="hero-tag absolute -top-9 right-0 font-mono text-[9px] uppercase tracking-[0.25em] text-red-bright/70">
            lock
          </div>

          <div className="relative h-full w-full overflow-hidden rounded-lg border border-red-primary/30 bg-black shadow-[0_0_60px_-15px_rgba(255,46,46,0.35)]">
            <video
              className="h-full w-full scale-[1.35] object-cover opacity-95"
              style={{
                objectPosition: "50% 32%",
                // Feathered oval mask: fades the surrounding room to the
                // module's black background so only the head/shoulders
                // read as "extracted" — no real segmentation needed.
                WebkitMaskImage:
                  "radial-gradient(ellipse 68% 62% at 50% 40%, black 45%, transparent 92%)",
                maskImage:
                  "radial-gradient(ellipse 68% 62% at 50% 40%, black 45%, transparent 92%)",
              }}
              src="/video/hero.mp4"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
            />

            {/* Duotone grade — keeps the face fully legible */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-red-primary/10 via-transparent to-bg-void/40 mix-blend-multiply" />

            {/* Reticle crosshair */}
            <div className="hero-reticle pointer-events-none absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-red-bright/40">
              <span className="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-bright" />
            </div>

            {/* Scan sweep (intro, one-shot) */}
            <div className="hero-scan-sweep pointer-events-none absolute inset-x-0 h-1/3 bg-gradient-to-b from-transparent via-red-bright/25 to-transparent" />
            {/* Scan sweep (ambient loop) */}
            <div className="hero-scan-loop pointer-events-none absolute inset-x-0 h-1/4 bg-gradient-to-b from-transparent via-red-bright/10 to-transparent" />

            {/* Fine scanline texture */}
            <div
              className="pointer-events-none absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, rgba(255,46,46,0.12) 0px, transparent 2px, transparent 4px)",
                backgroundSize: "100% 6px",
              }}
            />
          </div>

          <CornerBrackets className="hero-brackets" />

          {/* Bottom label chip */}
          <div className="hero-tag absolute -bottom-9 left-0 font-mono text-[9px] uppercase tracking-[0.25em] text-fg-dim">
            scan integrity · 99.8%
          </div>
          <div className="hero-tag absolute -bottom-9 right-0 font-mono text-[9px] uppercase tracking-[0.25em] text-fg-dim">
            verified
          </div>
        </div>
      </div>

      {/* Identity copy — sits below the module, never over the face */}
      <div className="hero-copy relative z-10 flex flex-col items-center px-4 pb-10 sm:pb-14">
        <ScrambleText
          as="h1"
          text={profile.name}
          trigger="immediate"
          delay={1.4}
          className="font-display text-center text-[9vw] font-medium uppercase leading-[0.9] tracking-tight text-fg sm:text-[5vw] md:text-[3.4vw]"
        />

        <div className="relative mt-4 h-7 sm:h-8">
          <TypingText
            words={profile.roles}
            className="text-sm font-medium uppercase tracking-[0.3em] text-gradient-red sm:text-base"
          />
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.3em] text-fg-dim">
        Scroll to initialize ↓
      </div>
    </section>
  );
}
