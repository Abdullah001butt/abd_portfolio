"use client";

import { useCounter } from "@/hooks/useCounter";

export default function MetricCounter({
  label,
  value,
  suffix,
}: {
  label: string;
  value: number;
  suffix: string;
}) {
  const { ref, value: current } = useCounter(value);

  return (
    <div className="text-center">
      <span
        ref={ref}
        className="font-display text-gradient-red text-5xl font-medium tabular-nums sm:text-6xl"
      >
        {current}
        {suffix}
      </span>
      <p className="mt-2 text-xs uppercase tracking-[0.3em] text-fg-dim">{label}</p>
    </div>
  );
}
