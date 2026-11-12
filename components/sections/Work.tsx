import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { work, visibleProjects } from "@/content/site";
import { GlassCard } from "@/components/ui/GlassCard";
import { ProjectVisual } from "@/components/ui/ProjectVisual";
import { Reveal } from "@/components/ui/Reveal";

export function Work() {
  const projects = visibleProjects(work.projects);

  return (
    <section id="work" className="section">
      <div className="container-content">
        <Reveal>
          <p className="font-mono text-[12px] uppercase tracking-[0.08em] text-[var(--color-accent-soft)]">
            {work.eyebrow}
          </p>
          <h2 className="mt-4 max-w-[640px] font-display text-[30px] font-medium tracking-[-0.028em] md:text-[42px]">
            {work.h2}
          </h2>
        </Reveal>

        <div className="mt-12 space-y-6">
          {projects.map((p, i) => {
            const flip = i % 2 === 1;
            return (
              <Reveal key={p.slug}>
                <GlassCard radius="panel" className="p-6 md:p-10">
                  <div
                    className={`grid items-center gap-8 md:grid-cols-2 md:gap-12 ${
                      flip ? "md:[&>*:first-child]:order-2" : ""
                    }`}
                  >
                    {/* text */}
                    <div>
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          {p.label && (
                            <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
                              {p.label}
                            </p>
                          )}
                          <h3 className="mt-2 font-display text-[24px] font-medium leading-tight text-[var(--color-text)] md:text-[28px]">
                            {p.title}
                          </h3>
                        </div>
                        <span className="font-display text-[44px] font-bold leading-none text-[rgba(220,210,255,0.14)] md:text-[64px]">
                          {p.number}
                        </span>
                      </div>

                      <p className="mt-4 text-[15px] leading-relaxed text-[var(--color-text-muted)]">
                        {p.description}
                      </p>

                      <div className="mt-5 flex flex-wrap gap-2">
                        {p.chips.map((c) => (
                          <span
                            key={c}
                            className="rounded-[8px] border border-[var(--color-border)] bg-[var(--color-surface)] px-2.5 py-1 font-mono text-[12px] text-[var(--color-accent-soft)]"
                          >
                            {c}
                          </span>
                        ))}
                      </div>

                      {p.href ? (
                        <a
                          href={p.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group mt-6 inline-flex items-center gap-3 rounded-[99px] border border-[var(--color-border)] bg-[var(--color-surface)] py-1.5 pl-4 pr-1.5 text-sm text-[var(--color-text)] transition-colors hover:border-[var(--color-border-accent)]"
                        >
                          Explore
                          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--color-surface-2)] text-[var(--color-accent-soft)] transition-transform group-hover:translate-x-0.5">
                            <ArrowUpRight size={15} />
                          </span>
                        </a>
                      ) : (
                        <span className="mt-6 inline-flex items-center gap-2 rounded-[99px] border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-1.5 text-sm text-[var(--color-text-muted)]">
                          Case study
                        </span>
                      )}
                    </div>

                    {/* visual */}
                    <div>
                      {p.image ? (
                        <div className="overflow-hidden rounded-[22px] border border-[var(--color-border)]">
                          <Image
                            src={p.image}
                            alt={`${p.title} preview`}
                            width={640}
                            height={480}
                            className="h-auto w-full object-cover"
                          />
                        </div>
                      ) : p.visual ? (
                        <ProjectVisual mode={p.visual} />
                      ) : null}
                    </div>
                  </div>
                </GlassCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
