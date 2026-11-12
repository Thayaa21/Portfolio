import Image from "next/image";
import type { TimelineEntry } from "@/lib/types";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

export function Timeline({
  id,
  label,
  entries,
}: {
  id: string;
  label: string;
  entries: TimelineEntry[];
}) {
  return (
    <section id={id} className="section">
      <div className="container-content">
        <div className="grid gap-8 md:grid-cols-[220px_1fr] md:gap-12">
          <div>
            <Reveal>
              <SectionLabel>{label}</SectionLabel>
            </Reveal>
          </div>

          <RevealGroup className="relative">
            {/* vertical line */}
            <span
              aria-hidden="true"
              className="absolute left-[7px] top-2 bottom-2 w-px bg-[var(--color-border)]"
            />
            <div className="space-y-5">
              {entries.map((e, i) => (
                <RevealItem key={`${e.org}-${i}`} className="relative pl-8">
                  {/* dot */}
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-5 h-[15px] w-[15px] rounded-full border-2 border-[var(--color-accent)] bg-[var(--color-bg)]"
                  />
                  <GlassCard className="p-5 md:p-6">
                    <div className="flex items-start gap-4">
                      {e.image && (
                        <Image
                          src={e.image}
                          alt={`${e.org} logo`}
                          width={48}
                          height={48}
                          className="h-12 w-12 shrink-0 rounded-[10px] border border-[var(--color-border)] object-cover"
                        />
                      )}
                      <div className="min-w-0 flex-1">
                        <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
                          {e.dates} · {e.location}
                        </p>
                        <h3 className="mt-2 font-display text-[18px] font-medium text-[var(--color-text)]">
                          {e.org}
                        </h3>
                        <p className="font-mono text-[12px] uppercase tracking-[0.06em] text-[var(--color-accent-soft)]">
                          {e.title}
                        </p>
                        {e.bullets.length > 0 && (
                          <ul className="mt-3 space-y-2">
                            {e.bullets.map((b, bi) => (
                              <li
                                key={bi}
                                className="flex gap-2 text-[14px] leading-relaxed text-[var(--color-text-muted)]"
                              >
                                <span className="mt-2 inline-block h-1 w-1 shrink-0 rounded-full bg-[var(--color-accent-soft)]" />
                                {b}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </GlassCard>
                </RevealItem>
              ))}
            </div>
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
