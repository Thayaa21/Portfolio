"use client";

import Image from "next/image";
import { useRef } from "react";
import { m, useReducedMotion, useScroll, useTransform } from "motion/react";
import { about, identity } from "@/content/site";
import { GlassCard } from "@/components/ui/GlassCard";
import { CountUp } from "@/components/ui/CountUp";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

export function About() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const wordY = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  return (
    <section id="about" className="section relative">
      <div className="container-content">
        <div
          ref={ref}
          className="grid items-center gap-12 md:grid-cols-2 md:gap-16"
        >
          {/* left: giant word + arch portrait */}
          <div className="relative flex justify-center">
            {/* giant faded word, clipped so it never causes horizontal overflow */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 -z-0 flex justify-center overflow-hidden"
            >
              <m.span
                style={reduce ? undefined : { y: wordY }}
                className="giant-word block whitespace-nowrap text-center text-[clamp(52px,13vw,150px)] leading-none"
              >
                {about.bgWord}
              </m.span>
            </div>

            <Reveal className="relative z-10 w-full max-w-[360px]">
              <div
                className="relative overflow-hidden"
                style={{ borderRadius: "999px 999px 32px 32px" }}
              >
                {/* violet → transparent gradient behind the photo */}
                <div
                  className="absolute inset-0 z-0"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(124,92,255,0.55), rgba(124,92,255,0.15) 45%, transparent 75%)",
                  }}
                />
                <Image
                  src={identity.portrait}
                  alt="Portrait of Thayaananthan Kanagaraj"
                  width={797}
                  height={980}
                  className="relative z-10 h-auto w-full object-cover"
                  priority={false}
                />
              </div>
            </Reveal>
          </div>

          {/* right: text + cards */}
          <div>
            <Reveal>
              <h2 className="m-0 font-mono text-[12px] font-medium uppercase tracking-[0.08em] text-[var(--color-accent-soft)]">
                {about.eyebrow}
              </h2>
            </Reveal>
            <RevealGroup className="mt-5 space-y-4">
              {about.paragraphs.map((p, i) => (
                <RevealItem key={i}>
                  <p className="text-[17px] text-[var(--color-text-2)]">{p}</p>
                </RevealItem>
              ))}
            </RevealGroup>

            {/* fact cards */}
            <RevealGroup className="mt-8 grid grid-cols-3 gap-3">
              {about.factCards.map((f) => (
                <RevealItem key={f.label}>
                  <GlassCard className="h-full p-4">
                    <div className="font-display text-[clamp(28px,4vw,40px)] font-medium leading-none text-[var(--color-text)]">
                      <CountUp value={f.value} />
                    </div>
                    <p className="mt-2 text-[12px] leading-snug text-[var(--color-text-muted)]">
                      {f.label}
                    </p>
                  </GlassCard>
                </RevealItem>
              ))}
            </RevealGroup>

            {/* tag card */}
            <Reveal className="mt-4">
              <GlassCard className="p-5">
                <h3 className="font-display text-[20px] font-medium text-[var(--color-text)]">
                  {about.tagCard.title}
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {about.tagCard.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-[8px] border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1.5 text-[13px] text-[var(--color-accent-soft)]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </GlassCard>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
