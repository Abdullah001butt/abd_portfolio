"use client";

import { useGsapContext } from "@/hooks/useGsapContext";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";

const GLYPHS = "!<>-_\\/[]{}—=+*^?#$%~";

type ScrambleTextProps = {
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  delay?: number;
  /** "viewport" plays once the element scrolls into view; "immediate" plays on mount (Hero). */
  trigger?: "viewport" | "immediate";
};

/**
 * "Cipher decode" reveal — characters cycle through scrambled glyphs before
 * resolving left-to-right into the real text, like a terminal decrypting a
 * string. Distinct from RevealText's mask-lift; used where a section needs
 * a sharper, more "alive" beat (headings, hero identity).
 *
 * Driven entirely by gsap.to (not a native setInterval), so the tween is
 * tracked by the enclosing gsap.context and cleaned up automatically by
 * useGsapContext's ctx.revert() on unmount — no manual interval teardown.
 */
export default function ScrambleText({
  text,
  as = "span",
  className,
  delay = 0,
  trigger = "viewport",
}: ScrambleTextProps) {
  const Tag = as;

  const scope = useGsapContext<HTMLSpanElement>((ctx, el) => {
    const state = { progress: 0 };

    function decode() {
      gsap.fromTo(
        state,
        { progress: 0 },
        {
          progress: text.length,
          duration: Math.max(0.5, text.length * 0.045),
          ease: "none",
          onUpdate: () => {
            el.textContent = text
              .split("")
              .map((char, i) => {
                if (char === " ") return " ";
                if (i < state.progress) return char;
                return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
              })
              .join("");
          },
          onComplete: () => {
            el.textContent = text;
          },
        }
      );
    }

    if (trigger === "immediate") {
      gsap.delayedCall(delay, decode);
      return;
    }

    gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        once: true,
        onEnter: () => gsap.delayedCall(delay, decode),
      },
    });
  }, [text]);

  return (
    <Tag className={cn("inline-block", className)}>
      <span ref={scope} className="inline-block">
        {text}
      </span>
    </Tag>
  );
}
