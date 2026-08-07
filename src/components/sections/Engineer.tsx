"use client";

import { useGsapContext } from "@/hooks/useGsapContext";
import { gsap } from "@/lib/gsap";
import SectionHeading from "@/components/ui/SectionHeading";
import RevealText from "@/components/ui/RevealText";

const philosophy = [
  {
    title: "Own the whole system",
    body: "UI, APIs, databases, SEO, and performance — I take a project from architecture through deployment, not just my slice of it.",
  },
  {
    title: "Clean over clever",
    body: "Clean Architecture and SOLID principles keep enterprise-grade .NET and React codebases maintainable as they grow.",
  },
  {
    title: "Build with AI, not just for it",
    body: "Prompt engineering, LLMs, and LangChain are part of my day-to-day toolkit — not a side interest.",
  },
];

const focus = ["React", "TypeScript", ".NET", "Azure", "AI", "Automation", "Modern UI", "Scalable Systems"];

export default function Engineer() {
  const scope = useGsapContext<HTMLDivElement>((ctx, el) => {
    gsap.fromTo(
      el.querySelectorAll("[data-card]"),
      { opacity: 0, y: 40, rotateX: -8 },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: { trigger: el, start: "top 70%" },
      }
    );
    gsap.fromTo(
      el.querySelectorAll("[data-tag]"),
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.4,
        stagger: 0.06,
        ease: "back.out(2)",
        scrollTrigger: { trigger: "[data-tags]", start: "top 85%" },
      }
    );
  }, []);

  return (
    <section className="relative bg-bg-void py-32" id="engineer">
      <div ref={scope} className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow="Who I Am" title="The Engineer" />

        <div className="mt-8 max-w-2xl text-lg leading-relaxed text-fg-dim">
          <RevealText
            text="A full-stack engineer who translates business goals into working software — combining high-performance React interfaces with scalable, cloud-native .NET and Azure backends."
            splitBy="word"
          />
        </div>

        <div className="mt-16 grid gap-6 [perspective:1200px] sm:grid-cols-3">
          {philosophy.map((item) => (
            <div
              key={item.title}
              data-card
              className="glass rounded-2xl p-7 opacity-0 transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="mb-4 h-8 w-8 rounded-full border border-red-bright/50" />
              <h3 className="font-display mb-2 text-lg font-medium text-fg">{item.title}</h3>
              <p className="text-sm leading-relaxed text-fg-dim">{item.body}</p>
            </div>
          ))}
        </div>

        <div data-tags className="mt-16 flex flex-wrap gap-3">
          {focus.map((tag) => (
            <span
              key={tag}
              data-tag
              className="rounded-full border border-line bg-bg-elevated px-4 py-2 text-xs uppercase tracking-widest text-silver opacity-0"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
