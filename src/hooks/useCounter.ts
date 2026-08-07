"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

export function useCounter(target: number, options?: { duration?: number }) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const counter = { val: 0 };
    const tween = gsap.to(counter, {
      val: target,
      duration: options?.duration ?? 2,
      ease: "power2.out",
      onUpdate: () => setValue(Math.round(counter.val)),
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);

  return { ref, value };
}
