import type { Metadata } from "next";
import Link from "next/link";
import { profile, skillGroups, experience, projects, certifications, education } from "@/lib/data";
import PrintButton from "@/components/ui/PrintButton";

export const metadata: Metadata = {
  title: `Resume — ${profile.name}`,
  description: `Plain, printable resume for ${profile.name} — ${profile.title}.`,
};

/**
 * Instant-view, ATS-friendly resume — same source data as the rest of the
 * site, laid out as plain semantic HTML instead of the HUD chrome, so a
 * recruiter can skim or print without downloading the .docx first.
 */
export default function ResumePage() {
  return (
    <div className="min-h-svh bg-bg-void px-4 py-12 print:bg-white print:py-0">
      <div className="mx-auto mb-6 flex max-w-3xl items-center justify-between print:hidden">
        <Link href="/" className="text-xs uppercase tracking-widest text-fg-dim hover:text-fg">
          ← Back to site
        </Link>
        <div className="flex items-center gap-3">
          <PrintButton />
          <a
            href="/resume.docx"
            className="rounded-full border border-line px-5 py-2 text-xs uppercase tracking-widest text-fg-dim transition-colors hover:border-red-bright/40 hover:text-fg"
          >
            Download .docx
          </a>
        </div>
      </div>

      <article className="mx-auto max-w-3xl rounded-2xl bg-white p-8 text-[#1a1a1a] shadow-2xl sm:p-12 print:rounded-none print:p-0 print:shadow-none">
        <header className="border-b-2 border-[#8b0000] pb-6">
          <h1 className="text-3xl font-bold tracking-tight">{profile.name}</h1>
          <p className="mt-1 text-sm text-[#555]">{profile.title}</p>
          <p className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-[#555]">
            <span>{profile.location}</span>
            <span>{profile.phone}</span>
            <span>{profile.email}</span>
            <a href={profile.linkedin} className="text-[#8b0000] underline">
              linkedin.com/in/abdullah-butt
            </a>
            <a href={profile.github} className="text-[#8b0000] underline">
              github.com/Abdullah001butt
            </a>
          </p>
        </header>

        <section className="mt-6">
          <h2 className="mb-2 text-xs font-bold tracking-widest text-[#8b0000] uppercase">Summary</h2>
          <p className="text-sm leading-relaxed">{profile.summary}</p>
        </section>

        <section className="mt-6">
          <h2 className="mb-2 text-xs font-bold tracking-widest text-[#8b0000] uppercase">Technical Skills</h2>
          <dl className="grid gap-2 text-sm sm:grid-cols-2">
            {skillGroups.map((g) => (
              <div key={g.label}>
                <dt className="inline font-semibold">{g.label}: </dt>
                <dd className="inline text-[#333]">{g.skills.join(", ")}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="mt-6">
          <h2 className="mb-3 text-xs font-bold tracking-widest text-[#8b0000] uppercase">
            Professional Experience
          </h2>
          <div className="space-y-5">
            {experience.map((job) => (
              <div key={job.company}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                  <h3 className="text-sm font-semibold">
                    {job.role} <span className="font-normal text-[#555]">— {job.company}</span>
                  </h3>
                  <span className="text-xs text-[#777]">{job.duration}</span>
                </div>
                <ul className="mt-1 list-disc space-y-0.5 pl-5 text-sm text-[#333]">
                  {job.achievements.map((a) => (
                    <li key={a}>{a}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-6">
          <h2 className="mb-3 text-xs font-bold tracking-widest text-[#8b0000] uppercase">Projects</h2>
          <div className="space-y-4">
            {projects.map((p) => (
              <div key={p.name}>
                <h3 className="text-sm font-semibold">
                  {p.name} <span className="font-normal text-[#555]">— {p.tagline}</span>
                </h3>
                <p className="mt-1 text-sm text-[#333]">{p.overview}</p>
                <p className="mt-1 text-xs text-[#777]">{p.tech.join(" · ")}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <section>
            <h2 className="mb-2 text-xs font-bold tracking-widest text-[#8b0000] uppercase">Education</h2>
            <p className="text-sm font-semibold">{education.degree}</p>
            <p className="text-xs text-[#777]">
              {education.school} · {education.duration}
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-xs font-bold tracking-widest text-[#8b0000] uppercase">Certifications</h2>
            <ul className="space-y-0.5 text-sm text-[#333]">
              {certifications.map((c) => (
                <li key={c.name}>
                  {c.name}
                  {c.issuer && <span className="text-[#777]"> — {c.issuer}</span>}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </article>
    </div>
  );
}
