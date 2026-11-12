"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  m,
  useScroll,
  useInView,
  useReducedMotion,
} from "motion/react";
import type { TimelineEntry } from "@/lib/types";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { ease } from "@/lib/motion";

export function Timeline({
  id,
  label,
  entries,
}: {
  id: string;
  label: string;
  entries: TimelineEntry[];
}) {
  const reduce = useReducedMotion();
  const listRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 70%", "end 60%"],
  });

  return (
    <section id={id} className="section">
      <div className="container-content">
        <div className="grid gap-8 md:grid-cols-[220px_1fr] md:gap-12">
          <div>
            <Reveal>
              <SectionLabel as="h2">{label}</SectionLabel>
            </Reveal>
          </div>

          <div ref={listRef} className="relative">
            {/* track + self-drawing line */}
            <span
              aria-hidden="true"
              className="absolute left-[7px] top-2 bottom-2 w-px bg-[var(--color-border)]"
            />
            <m.span
              aria-hidden="true"
              className="absolute left-[7px] top-2 bottom-2 w-px origin-top bg-[var(--color-accent)]"
              style={{ scaleY: reduce ? 1 : scrollYProgress }}
            />
            <div className="space-y-5">
              {entries.map((e, i) => (
                <TimelineRow key={`${e.org}-${i}`} entry={e} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineRow({ entry: e }: { entry: TimelineEntry }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-45% 0px -45% 0px" });

  return (
    <div ref={ref} className="relative pl-8">
      {/* dot pops in with a ring pulse when the line reaches it */}
      <m.span
        aria-hidden="true"
        className={`absolute left-0 top-5 h-[15px] w-[15px] rounded-full border-2 border-[var(--color-accent)] bg-[var(--color-bg)] ${
          inView && !reduce ? "timeline-dot-pulse" : ""
        }`}
        initial={reduce ? false : { scale: 0 }}
        animate={reduce ? { scale: 1 } : { scale: inView ? 1 : 0 }}
        transition={{ duration: 0.4, ease }}
      />
      <m.div
        initial={reduce ? false : { opacity: 0, x: 24 }}
        animate={
          reduce
            ? { opacity: 1, x: 0 }
            : { opacity: inView ? 1 : 0, x: inView ? 0 : 24 }
        }
        transition={{ duration: 0.6, ease }}
      >
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
      </m.div>
    </div>
  );
}
