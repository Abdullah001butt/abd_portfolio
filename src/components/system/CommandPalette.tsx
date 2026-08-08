"use client";

import { useEffect, useRef, useState } from "react";
import { profile } from "@/lib/data";
import Magnetic from "@/components/ui/Magnetic";

type Command = {
  id: string;
  label: string;
  hint: string;
  run: () => void;
};

/**
 * Cmd/Ctrl+K palette — jump to any section, copy contact info, or open
 * external links without leaving the keyboard. Purely client-side, no
 * external command-menu library: the action list is short and static, so a
 * plain filtered array + arrow-key index is simpler than pulling in cmdk.
 */
export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const commands: Command[] = [
    { id: "hero", label: "Go to Hero", hint: "Section", run: () => scrollTo("#hero") },
    { id: "engineer", label: "Go to The Engineer", hint: "Section", run: () => scrollTo("#engineer") },
    { id: "creator", label: "Go to The Creator", hint: "Section", run: () => scrollTo("#creator") },
    { id: "experience", label: "Go to Experience", hint: "Section", run: () => scrollTo("#experience") },
    { id: "stack", label: "Go to Tech Stack", hint: "Section", run: () => scrollTo("#stack") },
    { id: "github-activity", label: "Go to Version Control", hint: "Section", run: () => scrollTo("#github") },
    { id: "certifications", label: "Go to Certifications", hint: "Section", run: () => scrollTo("#certifications") },
    { id: "contact", label: "Go to Contact", hint: "Section", run: () => scrollTo("#contact") },
    {
      id: "email",
      label: `Copy email — ${profile.email}`,
      hint: "Action",
      run: () => {
        navigator.clipboard?.writeText(profile.email);
        setCopied(true);
      },
    },
    { id: "github", label: "Open GitHub", hint: "Link", run: () => window.open(profile.github, "_blank", "noreferrer") },
    { id: "linkedin", label: "Open LinkedIn", hint: "Link", run: () => window.open(profile.linkedin, "_blank", "noreferrer") },
    { id: "resume", label: "Download resume", hint: "Link", run: () => window.open("/resume.docx", "_blank") },
  ];

  const filtered = commands.filter((c) => c.label.toLowerCase().includes(query.toLowerCase()));

  function scrollTo(hash: string) {
    document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
  }

  function close() {
    setOpen(false);
    setQuery("");
    setActiveIndex(0);
    setCopied(false);
  }

  // Global open shortcut
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") close();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Focus the input and lock scroll whenever the palette opens
  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const cmd = filtered[activeIndex];
      if (cmd) {
        cmd.run();
        if (cmd.id !== "email") close();
      }
    }
  }

  if (!open) {
    return (
      <Magnetic strength={0.3} className="fixed right-6 bottom-6 z-40 hidden md:block">
        <button
          type="button"
          onClick={() => setOpen(true)}
          data-cursor-hover
          aria-label="Open command palette"
          className="flex items-center gap-2 rounded-full border border-line bg-bg-elevated/80 px-4 py-2 font-mono text-[11px] uppercase tracking-widest text-fg-dim backdrop-blur transition-colors hover:border-red-bright/50 hover:text-fg"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-red-bright" />
          ⌘K
        </button>
      </Magnetic>
    );
  }

  return (
    <div className="fixed inset-0 z-100 flex items-start justify-center bg-bg-void/80 px-4 pt-[18vh] backdrop-blur-sm" onClick={close}>
      <div
        className="glass w-full max-w-lg overflow-hidden rounded-2xl border border-red-primary/30 shadow-[0_0_80px_-20px_rgba(255,46,46,0.35)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-line px-5 py-4">
          <span className="font-mono text-red-bright">{">"}</span>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Search sections, links, actions…"
            className="w-full bg-transparent font-mono text-sm text-fg outline-none placeholder:text-fg-dim/60"
          />
          <span className="font-mono text-[10px] uppercase tracking-widest text-fg-dim">esc</span>
        </div>

        <div className="max-h-80 overflow-y-auto p-2">
          {filtered.length === 0 && (
            <p className="px-3 py-6 text-center font-mono text-xs text-fg-dim">No matches.</p>
          )}
          {filtered.map((cmd, i) => (
            <button
              key={cmd.id}
              type="button"
              data-cursor-hover
              onMouseEnter={() => setActiveIndex(i)}
              onClick={() => {
                cmd.run();
                if (cmd.id !== "email") close();
              }}
              className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                i === activeIndex ? "bg-red-primary/15 text-fg" : "text-fg-dim"
              }`}
            >
              <span>{cmd.id === "email" && copied ? "Copied ✓" : cmd.label}</span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-fg-dim/70">{cmd.hint}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
