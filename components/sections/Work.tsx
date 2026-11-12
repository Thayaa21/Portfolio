"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "motion/react";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/types";
import { work, visibleProjects } from "@/content/site";
import { GlassCard } from "@/components/ui/GlassCard";
import { ProjectVisual } from "@/components/ui/ProjectVisual";
import { Reveal } from "@/components/ui/Reveal";
import { SplitText, FadeUp } from "@/components/ui/SplitText";
import { ease, viewportOnce } from "@/lib/motion";

export function Work() {
  const projects = visibleProjects(work.projects);

  return (
    <section id="work" className="section">
      <div className="container-content">
        <div>
          <FadeUp
            as="p"
            delay={0}
            className="font-mono text-[12px] uppercase tracking-[0.08em] text-[var(--color-accent-soft)]"
          >
            {work.eyebrow}
          </FadeUp>
          <SplitText
            as="h2"
            text={work.h2}
            className="mt-4 max-w-[760px] text-balance font-display text-[30px] font-medium tracking-[-0.028em] md:text-[42px]"
          />
        </div>

        {/* Desktop (lg+): sticky stacking. Mobile: normal reveal flow. */}
        <div className="mt-12 space-y-6 lg:space-y-0">
          {projects.map((p, i) => (
            <WorkPanel
              key={p.slug}
              project={p}
              index={i}
              total={projects.length}
            />
          ))}
        </div>
        {/* trailing spacer so the last sticky panel can settle */}
        <div aria-hidden="true" className="hidden lg:block lg:h-[20vh]" />
      </div>
    </section>
  );
}

function WorkPanel({
  project: p,
  index,
  total,
}: {
  project: Project;
  index: number;
  total: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const flip = index % 2 === 1;
  const isLast = index === total - 1;

  // Scroll progress of this panel moving out of view (being covered).
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const brightness = useTransform(scrollYProgress, [0, 1], [1, 0.6]);
  const filter = useTransform(brightness, (b) => `brightness(${b})`);

  const stickyTop = 96 + index * 16;

  const panelInner = (
    <GlassCard
      radius="panel"
      className="p-6 md:p-10"
      style={{ background: "var(--color-surface-solid)" }}
    >
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
              className="group/btn mt-6 inline-flex items-center gap-3 rounded-[99px] border border-[var(--color-border)] bg-[var(--color-surface)] py-1.5 pl-4 pr-1.5 text-sm text-[var(--color-text)] transition-colors hover:border-[var(--color-border-accent)]"
            >
              Explore
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--color-surface-2)] text-[var(--color-accent-soft)] transition-transform duration-300 group-hover/panel:translate-x-0.5 group-hover/panel:-translate-y-0.5 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1">
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
        <div className="overflow-hidden rounded-[22px]">
          <div className="transition-transform duration-500 ease-out group-hover/panel:scale-[1.04]">
            {p.image ? (
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[22px] border border-[var(--color-border)] bg-[var(--color-surface)]">
                <Image
                  src={p.image}
                  alt={`${p.title} preview`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            ) : p.visual ? (
              <ProjectVisual mode={p.visual} />
            ) : null}
          </div>
        </div>
      </div>
    </GlassCard>
  );

  // Reduced motion or mobile: plain reveal, no sticky/scale.
  if (reduce) {
    return (
      <div className="group/panel mb-6 last:mb-0 lg:mb-0">{panelInner}</div>
    );
  }

  return (
    <>
      {/* Mobile: simple reveal */}
      <Reveal className="group/panel lg:hidden">{panelInner}</Reveal>

      {/* Desktop: sticky stacking with scale/dim */}
      <motion.div
        ref={ref}
        className="group/panel sticky hidden lg:block"
        style={{
          top: stickyTop,
          scale: isLast ? 1 : scale,
          filter: isLast ? undefined : filter,
          zIndex: index + 1,
          marginBottom: isLast ? 0 : "6vh",
        }}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportOnce}
        transition={{ duration: 0.6, ease }}
      >
        {panelInner}
      </motion.div>
    </>
  );
}
