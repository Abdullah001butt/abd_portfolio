// Fixed, deterministic layout (no Math.random() at render — that would
// desync server/client markup and trigger a hydration error). The drift
// animation itself is pure CSS, driven by nth-child timing offsets.
const PARTICLES = [
  { top: "12%", left: "8%", size: 2, delay: "0s" },
  { top: "22%", left: "88%", size: 3, delay: "1.2s" },
  { top: "68%", left: "6%", size: 2, delay: "2.4s" },
  { top: "80%", left: "92%", size: 3, delay: "0.6s" },
  { top: "34%", left: "18%", size: 1.5, delay: "3.1s" },
  { top: "48%", left: "82%", size: 2, delay: "1.8s" },
  { top: "14%", left: "48%", size: 1.5, delay: "2.9s" },
  { top: "88%", left: "40%", size: 2, delay: "0.3s" },
  { top: "60%", left: "72%", size: 1.5, delay: "3.6s" },
  { top: "40%", left: "60%", size: 2, delay: "1.4s" },
  { top: "76%", left: "20%", size: 2.5, delay: "2.1s" },
  { top: "6%", left: "70%", size: 1.5, delay: "0.9s" },
];

export default function ParticleField({ className }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ""}`}>
      {PARTICLES.map((p, i) => (
        <span
          key={i}
          className="particle-drift absolute rounded-full bg-red-bright/50"
          style={{
            top: p.top,
            left: p.left,
            width: p.size,
            height: p.size,
            animationDelay: p.delay,
          }}
        />
      ))}
    </div>
  );
}
