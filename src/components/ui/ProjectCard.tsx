"use client";

import { useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import type { projects } from "@/lib/data";
import Modal from "./Modal";
import ProjectModal from "./ProjectModal";

type Project = (typeof projects)[number];

export default function ProjectCard({ project, index }: { project: Project; index: number }) {
  const card = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = card.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    gsap.to(el, {
      rotateY: x * 10,
      rotateX: -y * 10,
      duration: 0.4,
      ease: "power2.out",
      transformPerspective: 900,
    });
    gsap.to(el.querySelector("[data-layer-1]"), {
      x: x * 18,
      y: y * 18,
      duration: 0.5,
      ease: "power2.out",
    });
    gsap.to(el.querySelector("[data-layer-2]"), {
      x: x * 34,
      y: y * 34,
      duration: 0.5,
      ease: "power2.out",
    });
  }

  function onLeave() {
    gsap.to(card.current, { rotateY: 0, rotateX: 0, duration: 0.6, ease: "power3.out" });
    gsap.to(card.current?.querySelectorAll("[data-layer-1], [data-layer-2]") ?? [], {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: "power3.out",
    });
  }

  return (
    <>
      <div
        ref={card}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        onClick={() => setOpen(true)}
        data-cursor-hover
        className="glass gpu-layer group relative cursor-pointer overflow-hidden rounded-3xl p-8 transform-3d sm:p-10"
      >
        <div
          data-layer-2
          className="gpu-layer pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-red-primary/25 blur-3xl"
        />
        <div data-layer-1 className="gpu-layer relative transform-[translateZ(30px)]">
          <span className="font-mono text-xs text-red-bright/70">0{index + 1}</span>
          <h3 className="font-display mt-2 text-2xl font-medium text-fg sm:text-3xl">{project.name}</h3>
          <p className="mt-1 text-sm uppercase tracking-widest text-fg-dim">{project.tagline}</p>
          <p className="mt-1 text-xs text-fg-dim/70">{project.context}</p>

          <p className="mt-6 text-sm leading-relaxed text-fg-dim">{project.overview}</p>

          <div className="mt-6 flex flex-wrap gap-2">
            {project.tech.slice(0, 4).map((t) => (
              <span
                key={t}
                className="rounded-full border border-line px-3 py-1 text-[11px] uppercase tracking-wide text-silver"
              >
                {t}
              </span>
            ))}
            {project.tech.length > 4 && (
              <span className="rounded-full border border-line px-3 py-1 text-[11px] uppercase tracking-wide text-fg-dim">
                +{project.tech.length - 4}
              </span>
            )}
          </div>

          <div className="mt-7 flex items-center gap-2 border-t border-line pt-6 text-xs uppercase tracking-widest text-red-bright/80">
            View Case Study
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </div>
        </div>
      </div>

      <Modal open={open} onClose={() => setOpen(false)}>
        <ProjectModal project={project} index={index} onClose={() => setOpen(false)} />
      </Modal>
    </>
  );
}
