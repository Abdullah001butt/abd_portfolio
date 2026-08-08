// Single source of truth for the page's section order — used by DotNav
// (every section, for fine-grained orientation) and Nav (a curated subset,
// mapped back onto this order to figure out which nav link should be
// "active" even while scrolled through a section Nav doesn't link to).
export const SECTIONS = [
  { id: "hero", label: "Hero" },
  { id: "system", label: "System Init" },
  { id: "engineer", label: "Engineer" },
  { id: "creator", label: "Creator" },
  { id: "experience", label: "Experience" },
  { id: "stack", label: "Tech Stack" },
  { id: "github", label: "Version Control" },
  { id: "certifications", label: "Certifications" },
  { id: "metrics", label: "Metrics" },
  { id: "process", label: "Process" },
  { id: "contact", label: "Contact" },
] as const;

export const SECTION_IDS = SECTIONS.map((s) => s.id);
