"use client";

import { useEffect, useRef, type ReactNode } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    // Mobile browser chrome (address bar) collapsing/expanding on scroll
    // recalculates viewport height mid-scroll — without this, ScrollTrigger
    // re-measures pinned sections on every one of those, producing visible
    // jumps. This tells it to ignore that specific resize source.
    ScrollTrigger.config({ ignoreMobileResize: true });

    // The one line that actually keeps ScrollTrigger's scrub/pin math in
    // lockstep with Lenis's virtual scroll position every frame — without
    // it, pinned/scrubbed animations (Hero, Experience, Process line, etc.)
    // can visibly lag a frame or two behind the smoothed scroll and read as
    // janky rather than fluid.
    lenis.on("scroll", ScrollTrigger.update);

    function onTick(time: number) {
      lenis.raf(time * 1000);
    }
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    // Fonts/video can finish loading and shift layout after the initial
    // pin/trigger positions were measured — re-measure once everything
    // settles so pinned sections don't start their scrub a beat early/late.
    function refresh() {
      ScrollTrigger.refresh();
    }
    window.addEventListener("load", refresh);

    return () => {
      gsap.ticker.remove(onTick);
      lenis.off("scroll", ScrollTrigger.update);
      window.removeEventListener("load", refresh);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
