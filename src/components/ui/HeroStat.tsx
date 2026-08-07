"use client";

import { useEffect, useState } from "react";

/** A single HUD telemetry readout with a gently jittering value, purely decorative. */
export default function HeroStat({
  label,
  base,
  unit,
  align = "left",
}: {
  label: string;
  base: number;
  unit: string;
  align?: "left" | "right";
}) {
  const [val, setVal] = useState(base);

  useEffect(() => {
    const id = setInterval(() => {
      setVal(Math.max(0, base + (Math.random() - 0.5) * (base * 0.06)));
    }, 1400);
    return () => clearInterval(id);
  }, [base]);

  return (
    <div className={align === "right" ? "text-right" : "text-left"}>
      <p className="font-mono text-lg tabular-nums text-fg sm:text-xl">
        {val.toFixed(1)}
        <span className="text-red-bright"> {unit}</span>
      </p>
      <p className="mt-0.5 text-[10px] uppercase tracking-[0.25em] text-fg-dim">{label}</p>
    </div>
  );
}
