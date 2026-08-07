"use client";

import { useLayoutEffect, useRef, type RefObject } from "react";
import { gsap } from "@/lib/gsap";

/**
 * Scopes a gsap.context to a ref and cleans it up (killing tweens +
 * ScrollTriggers created inside) automatically on unmount.
 */
export function useGsapContext<T extends HTMLElement>(
  callback: (context: gsap.Context, el: T) => void,
  deps: unknown[] = []
): RefObject<T | null> {
  const scope = useRef<T>(null);

  useLayoutEffect(() => {
    if (!scope.current) return;
    // gsap.context invokes its callback synchronously and passes the
    // context instance as the first argument (avoids referencing the
    // not-yet-assigned outer `const` before initialization).
    const ctx = gsap.context((self) => {
      callback(self as gsap.Context, scope.current as T);
    }, scope);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return scope;
}
