"use client";

import { useEffect, useState } from "react";
import { gsap } from "@/lib/gsap";

/**
 * Full-black boot screen shown once per session. A red pulse activates,
 * then the AI OS "initializes" with a scanning readout before the curtain
 * lifts to reveal the Hero. Purely presentational — unmounts itself.
 */
export default function Intro({ onDone }: { onDone: () => void }) {
  const [visible, setVisible] = useState(true);
  const [line, setLine] = useState("");

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const lines = ["INITIALIZING CORE...", "CALIBRATING INTERFACE...", "SYSTEM ONLINE"];
    let i = 0;
    const interval = setInterval(() => {
      setLine(lines[i]);
      i++;
      if (i >= lines.length) clearInterval(interval);
    }, 480);

    const timer = setTimeout(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = "";
          setVisible(false);
          onDone();
        },
      });
      tl.to(".intro-content", { opacity: 0, duration: 0.4, ease: "power2.in" }).to(
        ".intro-curtain",
        { yPercent: -100, duration: 1, ease: "power4.inOut" },
        "-=0.1"
      );
    }, 1900);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!visible) return null;

  return (
    <div className="intro-curtain fixed inset-0 z-[999] flex items-center justify-center bg-bg-void">
      <div className="intro-content flex flex-col items-center gap-6">
        <div className="relative h-16 w-16">
          <span className="absolute inset-0 animate-ping rounded-full bg-red-primary/40" />
          <span className="absolute inset-2 rounded-full bg-red-bright shadow-[0_0_40px_10px_rgba(255,46,46,0.5)]" />
        </div>
        <p className="font-display text-xs uppercase tracking-[0.4em] text-fg-dim">
          {line || " "}
        </p>
      </div>
    </div>
  );
}
