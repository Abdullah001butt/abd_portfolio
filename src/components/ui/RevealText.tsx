"use client";

import { useGsapContext } from "@/hooks/useGsapContext";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";

type RevealTextProps = {
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  splitBy?: "char" | "word";
  delay?: number;
  scrub?: boolean;
};

/**
 * Masks and reveals text char-by-char or word-by-word on scroll into view.
 * Purpose-built to avoid a generic fade-in — each unit rises through a
 * clipped mask with a slight stagger, like the copy is being assembled.
 */
export default function RevealText({
  text,
  as = "p",
  className,
  splitBy = "word",
  delay = 0,
  scrub = false,
}: RevealTextProps) {
  const Tag = as;
  const units = splitBy === "char" ? Array.from(text) : text.split(" ");

  const scope = useGsapContext<HTMLSpanElement>((ctx, el) => {
    const items = el.querySelectorAll<HTMLElement>("[data-unit]");
    gsap.set(items, { yPercent: 110, opacity: 0 });
    gsap.to(items, {
      yPercent: 0,
      opacity: 1,
      duration: 0.9,
      ease: "power4.out",
      stagger: splitBy === "char" ? 0.018 : 0.06,
      delay,
      scrollTrigger: scrub
        ? undefined
        : {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
          },
    });
  }, [text]);

  return (
    <Tag className={cn("inline-block overflow-hidden align-top", className)}>
      <span ref={scope} className="inline-block">
        {units.map((unit, i) => (
          <span
            key={i}
            className="inline-block overflow-hidden align-top"
            style={{ marginRight: splitBy === "word" ? "0.28em" : undefined }}
          >
            <span data-unit className="inline-block will-change-transform">
              {unit === " " ? " " : unit}
            </span>
          </span>
        ))}
      </span>
    </Tag>
  );
}
