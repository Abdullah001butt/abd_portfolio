import ScrambleText from "./ScrambleText";
import { cn } from "@/lib/utils";

export default function SectionHeading({
  eyebrow,
  title,
  align = "left",
  className,
}: {
  eyebrow: string;
  title: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div className={cn(align === "center" && "text-center", className)}>
      <div
        className={cn(
          "mb-4 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.35em] text-red-bright/80",
          align === "center" && "justify-center"
        )}
      >
        <span className="h-[1px] w-8 bg-red-bright/60" />
        {eyebrow}
      </div>
      <ScrambleText
        as="h2"
        text={title}
        className="font-display text-4xl font-medium leading-[1.05] tracking-tight text-fg sm:text-5xl md:text-6xl"
      />
    </div>
  );
}
