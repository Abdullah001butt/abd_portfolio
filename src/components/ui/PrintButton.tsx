"use client";

export default function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="rounded-full border border-red-bright/40 px-5 py-2 text-xs uppercase tracking-widest text-fg transition-colors hover:border-red-bright print:hidden"
    >
      Print / Save as PDF
    </button>
  );
}
