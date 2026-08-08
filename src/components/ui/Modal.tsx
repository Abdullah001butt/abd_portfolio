"use client";

import { useEffect, type ReactNode } from "react";

/**
 * Shared full-screen overlay primitive — backdrop click / Escape to close,
 * scroll-locked while open. Used by ProjectModal (and anything else that
 * needs a lightbox-style detail view) so the open/close/lock behavior only
 * lives in one place.
 */
export default function Modal({
  open,
  onClose,
  children,
}: {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}) {
  useEffect(() => {
    if (!open) return;

    document.body.style.overflow = "hidden";
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center overflow-y-auto bg-bg-void/85 px-4 py-10 backdrop-blur-sm"
      onClick={onClose}
    >
      <div onClick={(e) => e.stopPropagation()} className="w-full">
        {children}
      </div>
    </div>
  );
}
