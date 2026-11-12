"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { ArrowRight } from "lucide-react";
import { hero } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { GradientText } from "@/components/ui/GradientText";
import { AgentConsole } from "@/components/ui/AgentConsole";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero({ hasResume }: { hasResume: boolean }) {
  const reduce = useReducedMotion();
  const words = hero.h1Pre.trim().split(" ");

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
  };
  const item: Variants = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
  };

  return (
    <section
      id="top"
      className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28"
    >
      <div className="container-content relative">
        <motion.div
          className="mx-auto max-w-[840px] text-center"
          variants={container}
          initial={reduce ? undefined : "hidden"}
          animate={reduce ? undefined : "show"}
        >
          {/* announcement pill */}
          <motion.div variants={item}>
            <a
              href={hero.pillHref}
              className="inline-flex items-center gap-2 rounded-[99px] border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-1.5 font-mono text-[12px] uppercase tracking-[0.08em] text-[var(--color-text-2)] transition-colors hover:border-[var(--color-border-accent)]"
            >
              <span className="status-dot inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-success)]" />
              {hero.pill.replace("● ", "")}
            </a>
          </motion.div>

          {/* H1 */}
          <h1 className="mt-7 font-display text-[40px] font-medium leading-[1.05] tracking-[-0.035em] md:text-[64px]">
            {reduce ? (
              <>
                {hero.h1Pre}
                <GradientText>{hero.h1Gradient}</GradientText>
              </>
            ) : (
              <>
                {words.map((w, i) => (
                  <motion.span
                    key={i}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      show: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.5, ease, delay: 0.1 + i * 0.04 },
                      },
                    }}
                    className="inline-block"
                  >
                    {w}&nbsp;
                  </motion.span>
                ))}
                <motion.span variants={item} className="inline-block">
                  <GradientText>{hero.h1Gradient}</GradientText>
                </motion.span>
              </>
            )}
          </h1>

          {/* subhead */}
          <motion.p
            variants={item}
            className="mx-auto mt-6 max-w-[620px] text-[17px] text-[var(--color-text-muted)]"
          >
            {hero.subhead}
          </motion.p>

          {/* buttons */}
          <motion.div
            variants={item}
            className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Button href={hero.primaryCta.href} variant="primary">
              {hero.primaryCta.label}
              <ArrowRight size={16} />
            </Button>
            {hasResume && (
              <Button href={hero.ghostCta.href} variant="ghost" external>
                {hero.ghostCta.label}
              </Button>
            )}
          </motion.div>

          {/* small mono line */}
          <motion.p
            variants={item}
            className="mt-6 font-mono text-[12px] uppercase tracking-[0.06em] text-[var(--color-text-muted)]"
          >
            {hero.smallLine}
          </motion.p>
        </motion.div>

        {/* glowing arc + console */}
        <div className="relative mt-16 md:mt-20">
          {/* arc */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 -top-10 flex justify-center">
            <div className="relative h-[320px] w-[760px] max-w-[94vw]">
              <div
                className="absolute inset-0 rounded-[999px] blur-[60px]"
                style={{
                  background:
                    "radial-gradient(60% 70% at 50% 100%, rgba(138,114,255,0.35), transparent 70%)",
                }}
              />
              <div
                className="absolute bottom-0 left-1/2 h-[260px] w-[680px] max-w-[92vw] -translate-x-1/2 rounded-t-[999px] border-t border-[rgba(220,210,255,0.4)]"
                style={{
                  background:
                    "conic-gradient(from 180deg at 50% 100%, rgba(220,210,255,0.08), rgba(124,92,255,0.14), rgba(220,210,255,0.08))",
                  maskImage:
                    "radial-gradient(60% 100% at 50% 100%, black, transparent 72%)",
                  WebkitMaskImage:
                    "radial-gradient(60% 100% at 50% 100%, black, transparent 72%)",
                }}
              />
            </div>
          </div>

          <motion.div
            className="relative"
            initial={reduce ? undefined : { opacity: 0, y: 30 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.5 }}
          >
            <AgentConsole />
          </motion.div>
          <p className="sr-only">
            A mock agent console that turns a plain-language request into a
            validated automation workflow, then sends it to human review.
          </p>
        </div>
      </div>
    </section>
  );
}
