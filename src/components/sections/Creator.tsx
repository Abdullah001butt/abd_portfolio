import SectionHeading from "@/components/ui/SectionHeading";
import ProjectCard from "@/components/ui/ProjectCard";
import { projects } from "@/lib/data";

export default function Creator() {
  return (
    <section className="relative bg-bg-void py-32" id="creator">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow="Selected Work" title="The Creator" />
        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {projects.map((p, i) => (
            <ProjectCard key={p.name} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
