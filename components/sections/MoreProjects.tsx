import Image from "next/image";
import { Github } from "lucide-react";
import { moreProjects, visibleProjects } from "@/content/site";
import { GlassCard } from "@/components/ui/GlassCard";
import { ProjectVisual } from "@/components/ui/ProjectVisual";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

export function MoreProjects() {
  const projects = visibleProjects(moreProjects.projects);

  return (
    <section id="more-projects" className="section">
      <div className="container-content">
        <Reveal>
          <h2 className="font-display text-[30px] font-medium tracking-[-0.028em] md:text-[42px]">
            {moreProjects.h2}
          </h2>
        </Reveal>

        <RevealGroup className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <RevealItem key={p.slug}>
              <GlassCard as="article" className="flex h-full flex-col overflow-hidden">
                {p.image ? (
                  <div className="overflow-hidden border-b border-[var(--color-border)]">
                    <Image
                      src={p.image}
                      alt={`${p.title} preview`}
                      width={480}
                      height={300}
                      className="h-44 w-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="h-44 overflow-hidden border-b border-[var(--color-border)]">
                    <div className="flex h-full items-center justify-center [&>div]:aspect-auto [&>div]:h-full [&>div]:w-full [&>div]:rounded-none [&>div]:border-0 [&>div]:bg-transparent">
                      <ProjectVisual mode="graph" />
                    </div>
                  </div>
                )}
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display text-[18px] font-medium leading-tight text-[var(--color-text)]">
                      {p.title}
                    </h3>
                    {p.href && (
                      <a
                        href={p.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${p.title} on GitHub`}
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-2)] transition-colors hover:border-[var(--color-border-strong)] hover:text-[var(--color-text)]"
                      >
                        <Github size={15} />
                      </a>
                    )}
                  </div>
                  <p className="mt-2 flex-1 text-[14px] leading-relaxed text-[var(--color-text-muted)]">
                    {p.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {p.chips.map((c) => (
                      <span
                        key={c}
                        className="rounded-[8px] border border-[var(--color-border)] bg-[var(--color-surface)] px-2 py-0.5 font-mono text-[11px] text-[var(--color-accent-soft)]"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </GlassCard>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
