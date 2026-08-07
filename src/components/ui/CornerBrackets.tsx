import { cn } from "@/lib/utils";

/**
 * Four target-lock corner brackets around a bounding box — the classic
 * "biometric scan module" framing device. Purely decorative chrome.
 */
export default function CornerBrackets({
  className,
  size = 22,
  inset = -14,
}: {
  className?: string;
  size?: number;
  inset?: number;
}) {
  const common = "absolute border-red-bright/70";
  const style = { width: size, height: size };

  return (
    <div className={cn("pointer-events-none absolute inset-0", className)}>
      <span
        className={cn(common, "border-l-[1.5px] border-t-[1.5px]")}
        style={{ ...style, top: inset, left: inset }}
      />
      <span
        className={cn(common, "border-r-[1.5px] border-t-[1.5px]")}
        style={{ ...style, top: inset, right: inset }}
      />
      <span
        className={cn(common, "border-l-[1.5px] border-b-[1.5px]")}
        style={{ ...style, bottom: inset, left: inset }}
      />
      <span
        className={cn(common, "border-r-[1.5px] border-b-[1.5px]")}
        style={{ ...style, bottom: inset, right: inset }}
      />
    </div>
  );
}
