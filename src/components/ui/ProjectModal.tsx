import type { projects } from "@/lib/data";

type Project = (typeof projects)[number];

/**
 * Full case-study breakdown for a single project — same underlying data as
 * the card (overview/challenges/results/tech, all sourced from the resume,
 * nothing invented), just given the room a "case study" deserves instead of
 * being compressed onto a hover card.
 */
export default function ProjectModal({
  project,
  index,
  onClose,
}: {
  project: Project;
  index: number;
  onClose: () => void;
}) {
  return (
    <div className="glass relative mx-auto max-w-2xl overflow-hidden rounded-3xl border border-red-primary/30 p-8 shadow-[0_0_100px_-20px_rgba(255,46,46,0.4)] sm:p-12">
      <button
        type="button"
        onClick={onClose}
        data-cursor-hover
        aria-label="Close case study"
        className="absolute top-6 right-6 flex h-9 w-9 items-center justify-center rounded-full border border-line text-fg-dim transition-colors hover:border-red-bright/50 hover:text-fg"
      >
        ✕
      </button>

      <span className="font-mono text-xs text-red-bright/70">0{index + 1} · Case Study</span>
      <h3 className="font-display mt-3 text-3xl font-medium text-fg sm:text-4xl">{project.name}</h3>
      <p className="mt-2 text-sm uppercase tracking-widest text-fg-dim">{project.tagline}</p>
      <p className="mt-1 text-xs text-fg-dim/70">{project.context}</p>

      <div className="mt-8 flex flex-wrap gap-2">
        {project.tech.map((t) => (
          <span key={t} className="rounded-full border border-line px-3 py-1 text-[11px] uppercase tracking-wide text-silver">
            {t}
          </span>
        ))}
      </div>

      <div className="mt-8 space-y-6 border-t border-line pt-8">
        <div>
          <p className="mb-2 text-xs uppercase tracking-widest text-red-bright/70">Overview</p>
          <p className="text-sm leading-relaxed text-fg-dim">{project.overview}</p>
        </div>
        <div>
          <p className="mb-2 text-xs uppercase tracking-widest text-red-bright/70">Challenge</p>
          <p className="text-sm leading-relaxed text-fg-dim">{project.challenges}</p>
        </div>
        <div>
          <p className="mb-2 text-xs uppercase tracking-widest text-red-bright/70">Result</p>
          <p className="text-sm leading-relaxed text-fg-dim">{project.results}</p>
        </div>
      </div>
    </div>
  );
}
