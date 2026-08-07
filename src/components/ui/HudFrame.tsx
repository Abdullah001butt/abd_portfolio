import { cn } from "@/lib/utils";

/** Decorative HUD corner brackets — evokes a targeting/interface frame. */
export default function HudFrame({ className }: { className?: string }) {
  return (
    <div className={cn("pointer-events-none absolute inset-0", className)}>
      <span className="hud-corner left-0 top-0 border-b-0 border-r-0" />
      <span className="hud-corner right-0 top-0 border-b-0 border-l-0" />
      <span className="hud-corner bottom-0 left-0 border-r-0 border-t-0" />
      <span className="hud-corner bottom-0 right-0 border-l-0 border-t-0" />
    </div>
  );
}
