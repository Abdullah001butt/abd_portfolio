"use client";

import { useGsapContext } from "@/hooks/useGsapContext";
import { gsap } from "@/lib/gsap";
import SectionHeading from "@/components/ui/SectionHeading";
import { certifications } from "@/lib/data";

export default function Certifications() {
  const scope = useGsapContext<HTMLDivElement>((ctx, el) => {
    el.querySelectorAll<HTMLElement>("[data-cert]").forEach((card, i) => {
      const overlay = card.querySelector("[data-overlay]");
      const tl = gsap.timeline({
        scrollTrigger: { trigger: card, start: "top 80%" },
        delay: i * 0.1,
      });
      tl.fromTo(card, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" })
        .to(overlay, { scaleX: 0, duration: 0.6, ease: "power4.inOut", transformOrigin: "right" }, "-=0.2");
    });
  }, []);

  return (
    <section className="relative bg-bg-void py-32" id="certifications">
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeading eyebrow="Verified Credentials" title="Certifications" />

        <div ref={scope} className="mt-16 grid gap-5 sm:grid-cols-2">
          {certifications.map((cert) => (
            <div
              key={cert.name}
              data-cert
              className="glass relative overflow-hidden rounded-2xl p-6 opacity-0"
            >
              <div
                data-overlay
                className="absolute inset-0 z-10 bg-bg-elevated"
                style={{ transformOrigin: "right" }}
              />
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-red-bright/70">
                Clearance Granted
              </span>
              <h3 className="font-display mt-3 text-lg font-medium text-fg">{cert.name}</h3>
              {cert.issuer && (
                <p className="mt-1 text-xs uppercase tracking-widest text-fg-dim">{cert.issuer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
