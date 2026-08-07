"use client";

import { useMemo, useState } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import { skillGroups } from "@/lib/data";

type Node = { id: string; label: string; group: number; x: number; y: number };

const GROUP_COLORS = [
  "#ff2e2e",
  "#c1121f",
  "#8b0000",
  "#c7c7c9",
  "#ff2e2e",
  "#c1121f",
  "#8b0000",
];

/**
 * Tech stack rendered as a neural network: nodes positioned in concentric
 * rings by group, connected to a shared center, with hover highlighting the
 * edges attached to that node.
 */
export default function TechStack() {
  const [active, setActive] = useState<string | null>(null);

  const nodes: Node[] = useMemo(() => {
    const result: Node[] = [];
    const groupCount = skillGroups.length;
    skillGroups.forEach((group, gi) => {
      const ringRadius = 26 + gi * 9;
      const angleOffset = (gi / groupCount) * Math.PI * 2;
      group.skills.forEach((skill, si) => {
        const angle = angleOffset + (si / group.skills.length) * Math.PI * 2 * 0.9;
        result.push({
          id: `${gi}-${si}`,
          label: skill,
          group: gi,
          x: 50 + ringRadius * Math.cos(angle),
          y: 50 + ringRadius * Math.sin(angle) * 0.72,
        });
      });
    });
    return result;
  }, []);

  return (
    <section className="relative overflow-hidden bg-bg-void py-32" id="stack">
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-10" />
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow="Neural Map" title="Tech Stack" align="center" />
      </div>

      {/* Neural map — needs real canvas space for ~37 labeled nodes without
          overlapping text, so it only renders at md+. Below that, a grouped
          chip list (below) carries the same content, just laid out linearly. */}
      <div className="relative mx-auto mt-16 hidden aspect-square w-full max-w-4xl px-4 md:block">
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full overflow-visible">
          {nodes.map((n) => (
            <line
              key={`line-${n.id}`}
              x1={50}
              y1={50}
              x2={n.x}
              y2={n.y}
              stroke={active === n.id ? "#ff2e2e" : "rgba(139,0,0,0.35)"}
              strokeWidth={active === n.id ? 0.4 : 0.18}
              className="transition-all duration-300"
            />
          ))}
          <circle cx={50} cy={50} r={3.2} fill="#ff2e2e" opacity={0.9}>
            <animate attributeName="r" values="3.2;4;3.2" dur="2.5s" repeatCount="indefinite" />
          </circle>
        </svg>

        {nodes.map((n) => (
          <button
            key={n.id}
            data-cursor-hover
            onMouseEnter={() => setActive(n.id)}
            onMouseLeave={() => setActive(null)}
            className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border px-2.5 py-1 text-[9px] font-medium uppercase tracking-wide whitespace-nowrap transition-all duration-300 sm:text-[10px]"
            style={{
              left: `${n.x}%`,
              top: `${n.y}%`,
              borderColor: active === n.id ? GROUP_COLORS[n.group] : "rgba(244,242,240,0.12)",
              background: active === n.id ? "rgba(255,46,46,0.12)" : "rgba(12,12,13,0.7)",
              color: active === n.id ? "#fff" : "var(--fg-dim)",
              transform: `translate(-50%, -50%) scale(${active === n.id ? 1.15 : 1})`,
              zIndex: active === n.id ? 10 : 1,
            }}
          >
            {n.label}
          </button>
        ))}
      </div>

      {/* Mobile fallback: grouped chip list */}
      <div className="mx-auto mt-14 flex max-w-2xl flex-col gap-8 px-6 md:hidden">
        {skillGroups.map((group, gi) => (
          <div key={group.label}>
            <p
              className="mb-3 font-mono text-[10px] uppercase tracking-[0.3em]"
              style={{ color: GROUP_COLORS[gi] }}
            >
              {group.label}
            </p>
            <div className="flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-line bg-bg-elevated px-3 py-1.5 text-xs text-silver"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
