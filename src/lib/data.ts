// Source of truth: Abdullah_Butt_Resume (1).docx — all content below is drawn
// directly from that resume. Nothing here is invented.

export const profile = {
  name: "Muhammad Abdullah",
  shortName: "Abdullah Butt",
  roles: [
    "Software Engineer",
    "Full Stack Engineer",
    "AI Engineer",
    "Digital Solutions Engineer",
    "Creative Technologist",
  ],
  title: "Full-Stack Software Engineer — React & .NET / Azure Cloud",
  location: "Dubai / Ajman, UAE",
  phone: "0554939866",
  email: "m.abdullahdev2008@gmail.com",
  linkedin: "https://www.linkedin.com/in/abdullah-butt-280675352/",
  github: "https://github.com/Abdullah001butt",
  summary:
    "Full-stack software engineer specializing in React, TypeScript, and the .NET/Azure ecosystem, with hands-on experience delivering production web applications from architecture through deployment. Skilled at combining high-performance frontend interfaces with scalable, cloud-native backend services built on Clean Architecture and SOLID principles. Comfortable owning a project end-to-end — UI, APIs, databases, SEO, and performance — while translating business goals into working software. Actively building applied AI skills (LLMs, prompt engineering) and pursuing a BSc in Computer Science.",
};

export const skillGroups = [
  {
    label: "Languages",
    skills: ["JavaScript", "TypeScript", "C#", "Python", "SQL", "HTML5", "CSS3"],
  },
  {
    label: "Frontend",
    skills: ["React", "TypeScript", "GSAP", "Framer Motion", "Responsive Design", "Accessibility", "SEO"],
  },
  {
    label: "Backend",
    skills: ["ASP.NET Core", ".NET", "Entity Framework Core", "REST APIs", "Clean Architecture", "OOP"],
  },
  {
    label: "Databases",
    skills: ["MS SQL Server", "SSMS", "PostgreSQL"],
  },
  {
    label: "Cloud & DevOps",
    skills: ["Microsoft Azure", "Oracle Cloud Infrastructure", "Docker", "Git", "GitHub", "GitHub Actions", "CI/CD"],
  },
  {
    label: "Testing & QA",
    skills: ["Jest", "xUnit", "Debugging"],
  },
  {
    label: "AI & Automation",
    skills: ["Prompt Engineering", "LLMs (Gemini API, OpenAI)", "LangChain", "AI-Assisted Workflows"],
  },
] as const;

export const experience = [
  {
    role: "Digital Solutions Engineer",
    company: "AL SURUR General Store Equipment Trading LLC",
    duration: "Aug 2026 — Present",
    tech: ["React", "TypeScript", "SEO", "Analytics"],
    achievements: [
      "Developed and launched the company's official website using React, TypeScript, and modern web technologies, establishing its core digital presence.",
      "Designed a responsive, high-performance UI focused on user experience and lead generation.",
      "Implemented on-page SEO best practices, improving search engine visibility and discoverability.",
      "Optimized site speed, responsiveness, and accessibility across devices.",
      "Managed domain, hosting, and deployment, and integrated contact-form and inquiry workflows to support the sales pipeline.",
      "Analyzed website analytics and user feedback to guide continuous performance improvements.",
    ],
  },
  {
    role: "General AI Fluency Intern",
    company: "FlyRank AI",
    duration: "Jul 2026 — Aug 2026",
    tech: ["Prompt Engineering", "LLMs", "AI Workflows"],
    achievements: [
      "Selected for a competitive AI Fluency internship cohort focused on applied Generative AI.",
      "Built practical fluency in prompt engineering, LLM-assisted workflows, and real-world AI use cases through hands-on projects.",
      "Collaborated with a global AI learning community to expand applied AI knowledge.",
    ],
  },
  {
    role: "Software Engineer Intern",
    company: "Graffitecs",
    duration: "Jun 2025 — Jul 2026",
    tech: ["React", "TypeScript", ".NET", "Azure"],
    achievements: [
      "Built scalable, user-centric full-stack web applications using React, TypeScript, .NET, and Microsoft Azure.",
      "Applied Clean Architecture and SOLID principles to deliver maintainable, enterprise-grade software.",
      "Expanded from a MERN-stack foundation into the Microsoft ecosystem, strengthening cloud-native development skills.",
      "Collaborated cross-functionally, translating technical concepts for non-technical stakeholders.",
    ],
  },
] as const;

export const projects = [
  {
    name: "DocuMind AI",
    tagline: "AI-Powered PDF Research Assistant",
    context: "Final-Year AI Course Project",
    overview:
      "An AI research assistant that lets users query PDF documents in natural language, built for retrieval-augmented generation over real documents.",
    tech: ["React 19", "TypeScript", "FastAPI", "LangChain", "FAISS", "Gemini", "OpenAI"],
    challenges:
      "Grounding LLM answers in source documents accurately while keeping retrieval fast enough for a natural conversational flow.",
    results:
      "Delivered a working RAG pipeline — chunking, vector search with FAISS, and grounded generation — wrapped in a React 19 interface.",
  },
  {
    name: "VoicePilot AI CRM",
    tagline: "AI-Powered Voice CRM",
    context: "University / Independent Project",
    overview:
      "A voice-driven CRM that analyzes uploaded sales calls with the Gemini API and a LangGraph agent workflow to auto-generate transcripts, extracted data, and follow-up actions.",
    tech: ["React 19", "TypeScript", "Vite", "Tailwind", "shadcn/ui", "FastAPI", "SQLAlchemy", "PostgreSQL", "Docker Compose"],
    challenges:
      "Orchestrating a multi-step LangGraph agent to reliably transcribe, extract structured data, and generate accurate follow-up actions from unstructured call audio.",
    results:
      "Architecting an end-to-end pipeline from raw sales-call audio to actionable CRM records, containerized for reproducible deployment.",
  },
] as const;

export const certifications = [
  {
    name: "Oracle Cloud Infrastructure 2025 Certified Associate",
    issuer: "Oracle",
  },
  {
    name: "Building Apps with React and .NET",
    issuer: "Microsoft",
  },
  {
    name: "Gemini Certified Student",
    issuer: "AI Skills Fest 2026",
  },
  {
    name: "Data Analyst 101",
    issuer: "",
  },
] as const;

export const education = {
  degree: "BSc Computer Science",
  duration: "Sep 2025 — Sep 2029",
  school: "The Superior University",
};

export const metrics = [
  { label: "Years Building", value: 3, suffix: "+" },
  { label: "Projects Shipped", value: 6, suffix: "+" },
  { label: "Technologies", value: 25, suffix: "+" },
  { label: "Certifications", value: 4, suffix: "" },
];

export const process = [
  "Idea",
  "Research",
  "Architecture",
  "Engineering",
  "Testing",
  "Automation",
  "Deployment",
  "Optimization",
] as const;

export const bootModules = [
  "Loading Experience...",
  "Loading Projects...",
  "Loading Skills...",
  "Loading Certifications...",
  "Loading Creativity...",
  "Loading Engineering...",
  "Loading AI...",
] as const;
