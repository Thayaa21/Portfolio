"use client";

import { useRef, type PointerEvent } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useInView,
  useReducedMotion,
} from "motion/react";
import { ArrowRight } from "lucide-react";
import { hero } from "@/content/site";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/Button";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { AgentConsole } from "@/components/ui/AgentConsole";
import { ease, spring } from "@/lib/motion";

// The WebGL black hole is decorative and heavy; load it after the hero
// paints so it never blocks LCP. The CSS arc shows until it mounts.
const BlackHole = dynamic(
  () => import("@/components/ui/BlackHole").then((m) => m.BlackHole),
  { ssr: false }
);

export function Hero({ hasResume }: { hasResume: boolean }) {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { margin: "0px" });
  const paused = !inView;

  // pointer parallax for the arc + glow
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const ax = useSpring(px, spring);
  const ay = useSpring(py, spring);

  const onPointerMove = (e: PointerEvent<HTMLElement>) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
    const ny = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
    px.set(Math.max(-1, Math.min(1, nx)) * 12);
    py.set(Math.max(-1, Math.min(1, ny)) * 12);
  };
  const onPointerLeave = () => {
    px.set(0);
    py.set(0);
  };

  return (
    <section
      ref={sectionRef}
      id="top"
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28"
    >
      <div className="container-content relative">
        {/* Text is server-rendered and visible on first paint; the CSS
            `hero-in` entrance only nudges transform/filter, so it counts
            for LCP immediately instead of waiting for hydration. */}
        <div className="mx-auto max-w-[840px] text-center">
          {/* announcement pill */}
          <a
            href={hero.pillHref}
            className="hero-in inline-flex items-center gap-2 rounded-[99px] border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-1.5 font-mono text-[12px] uppercase tracking-[0.08em] text-[var(--color-text-2)] transition-colors hover:border-[var(--color-border-accent)]"
          >
            <span className="status-dot inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-success)]" />
            {hero.pill.replace("● ", "")}
          </a>

          {/* H1 */}
          <h1
            className="hero-in mt-7 font-display text-[40px] font-medium leading-[1.05] tracking-[-0.035em] md:text-[64px]"
            style={{ animationDelay: "0.06s" }}
          >
            {hero.h1Pre}
            <span className="grad-text">{hero.h1Gradient}</span>
          </h1>

          {/* subhead */}
          <p
            className="hero-in mx-auto mt-6 max-w-[620px] text-[17px] text-[var(--color-text-muted)]"
            style={{ animationDelay: "0.14s" }}
          >
            {hero.subhead}
          </p>

          {/* buttons */}
          <div
            className="hero-in mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
            style={{ animationDelay: "0.22s" }}
          >
            <MagneticButton href={hero.primaryCta.href} variant="primary">
              {hero.primaryCta.label}
              <ArrowRight size={16} />
            </MagneticButton>
            {hasResume && (
              <Button href={hero.ghostCta.href} variant="ghost" external>
                {hero.ghostCta.label}
              </Button>
            )}
          </div>

          {/* small mono line */}
          <p
            className="hero-in mt-6 font-mono text-[12px] uppercase tracking-[0.06em] text-[var(--color-text-muted)]"
            style={{ animationDelay: "0.3s" }}
          >
            {hero.smallLine}
          </p>
        </div>

        {/* glowing arc + console */}
        <div className="relative mt-28 md:mt-36">
          {/* glowing arc: rises behind the console, which overlaps its lower edge.
              top clamps the arc below the M.S. line so it never crosses the text. */}
          <motion.div
            aria-hidden="true"
            style={reduce ? undefined : { x: ax, y: ay }}
            initial={reduce ? undefined : { opacity: 0, y: 40, scale: 0.96 }}
            animate={reduce ? undefined : { opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, ease, delay: 0.3 }}
            className="pointer-events-none absolute inset-x-0 bottom-0 top-[-90px] flex items-start justify-center overflow-hidden md:top-[-110px]"
          >
            <div className="relative h-[460px] w-[900px] max-w-[150vw]">
              {/* soft ambient bloom */}
              <div
                className="absolute inset-x-0 top-0 h-[360px] blur-[70px]"
                style={{
                  background:
                    "radial-gradient(50% 60% at 50% 55%, rgba(138,114,255,0.5), transparent 72%)",
                }}
              />
              {/* filled half-ellipse body */}
              <div
                className="absolute left-1/2 top-0 h-[460px] w-[760px] max-w-[128vw] -translate-x-1/2 rounded-[999px]"
                style={{
                  background:
                    "radial-gradient(50% 50% at 50% 50%, rgba(124,92,255,0.30), rgba(84,34,196,0.10) 60%, transparent 72%)",
                }}
              />
              {/* bright white-violet rim */}
              <div
                className="absolute left-1/2 top-0 h-[460px] w-[760px] max-w-[128vw] -translate-x-1/2 rounded-[999px]"
                style={{
                  padding: "1.5px",
                  background:
                    "conic-gradient(from 180deg at 50% 50%, rgba(220,210,255,0) 0deg, rgba(246,207,255,0.9) 120deg, rgba(188,211,255,0.9) 240deg, rgba(220,210,255,0) 360deg)",
                  WebkitMask:
                    "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                  WebkitMaskComposite: "xor",
                  maskComposite: "exclude",
                  filter: "blur(0.3px)",
                }}
              />
              {/* shimmer sweep travelling along the rim */}
              {!reduce && (
                <div
                  className={`hero-arc-shimmer absolute left-1/2 top-0 h-[460px] w-[760px] max-w-[128vw] -translate-x-1/2 rounded-[999px] ${
                    paused ? "motion-paused" : ""
                  }`}
                  style={{
                    padding: "1.5px",
                    background:
                      "conic-gradient(from 0deg at 50% 50%, rgba(255,255,255,0) 0deg, rgba(255,255,255,0.85) 20deg, rgba(255,255,255,0) 60deg, rgba(255,255,255,0) 360deg)",
                    WebkitMask:
                      "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                    WebkitMaskComposite: "xor",
                    maskComposite: "exclude",
                  }}
                />
              )}

              {/* WebGL2 black hole on top: composites over the CSS arc, which
                  is the fallback when WebGL2 is unavailable or reduced motion.
                  It self-manages its render loop (pauses off-screen / tab hidden). */}
              <BlackHole className="absolute left-1/2 top-0 h-[520px] w-[900px] max-w-[150vw] -translate-x-1/2" />
            </div>
          </motion.div>

          <motion.div
            className={`relative z-10 ${reduce ? "" : "hero-console-float"} ${
              paused ? "motion-paused" : ""
            }`}
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
