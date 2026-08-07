"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type TypingTextProps = {
  words: readonly string[];
  className?: string;
  typingSpeed?: number;
  deletingSpeed?: number;
  /** How long the fully-typed word holds before it starts deleting, in ms. */
  pause?: number;
};

/**
 * Classic typewriter loop: types a word out, holds, deletes it, moves to
 * the next. Runs on a plain setTimeout state machine (not GSAP) since the
 * branching type/hold/delete logic doesn't map cleanly onto a tween — the
 * `cancelled` flag + cleared timeout in the effect cleanup is what actually
 * stops it on unmount, unlike a naive setInterval-only approach.
 */
export default function TypingText({
  words,
  className,
  typingSpeed = 55,
  deletingSpeed = 30,
  pause = 1400,
}: TypingTextProps) {
  const [display, setDisplay] = useState("");
  const wordIndex = useRef(0);
  const charIndex = useRef(0);
  const deleting = useRef(false);

  useEffect(() => {
    let cancelled = false;
    let timeoutId: ReturnType<typeof setTimeout>;

    function tick() {
      if (cancelled || words.length === 0) return;
      const word = words[wordIndex.current % words.length];

      if (!deleting.current) {
        charIndex.current += 1;
        setDisplay(word.slice(0, charIndex.current));

        if (charIndex.current >= word.length) {
          deleting.current = true;
          timeoutId = setTimeout(tick, pause);
          return;
        }
        timeoutId = setTimeout(tick, typingSpeed);
      } else {
        charIndex.current -= 1;
        setDisplay(word.slice(0, charIndex.current));

        if (charIndex.current <= 0) {
          deleting.current = false;
          wordIndex.current += 1;
        }
        timeoutId = setTimeout(tick, deletingSpeed);
      }
    }

    timeoutId = setTimeout(tick, typingSpeed);
    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
  }, [words, typingSpeed, deletingSpeed, pause]);

  return (
    <span className={cn("font-mono", className)}>
      {display}
      <span className="typing-cursor" aria-hidden="true">
        _
      </span>
    </span>
  );
}
