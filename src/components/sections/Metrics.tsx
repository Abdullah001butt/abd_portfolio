import MetricCounter from "@/components/ui/MetricCounter";
import { metrics } from "@/lib/data";

export default function Metrics() {
  return (
    <section className="relative bg-bg-void py-28" id="metrics">
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-10 px-6 sm:grid-cols-4">
        {metrics.map((m) => (
          <MetricCounter key={m.label} label={m.label} value={m.value} suffix={m.suffix} />
        ))}
      </div>
    </section>
  );
}
