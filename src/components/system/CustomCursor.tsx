"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export default function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const ringPos = { x: 0, y: 0 };
    const quickDotX = gsap.quickTo(dot.current, "x", { duration: 0.1, ease: "power3.out" });
    const quickDotY = gsap.quickTo(dot.current, "y", { duration: 0.1, ease: "power3.out" });
    const quickRingX = gsap.quickTo(ring.current, "x", { duration: 0.35, ease: "power3.out" });
    const quickRingY = gsap.quickTo(ring.current, "y", { duration: 0.35, ease: "power3.out" });

    function onMove(e: MouseEvent) {
      quickDotX(e.clientX);
      quickDotY(e.clientY);
      quickRingX(e.clientX);
      quickRingY(e.clientY);
      ringPos.x = e.clientX;
      ringPos.y = e.clientY;
    }

    function onOver(e: MouseEvent) {
      const target = e.target as HTMLElement;
      const interactive = target.closest("a, button, [data-cursor-hover]");
      if (!ring.current) return;
      gsap.to(ring.current, {
        scale: interactive ? 1.8 : 1,
        borderColor: interactive ? "rgba(255,46,46,0.9)" : "rgba(255,46,46,0.5)",
        duration: 0.3,
      });
    }

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
    };
  }, []);

  return (
    <>
      <div ref={dot} className="cursor-dot hidden md:block" />
      <div ref={ring} className="cursor-ring hidden md:block" />
    </>
  );
}
