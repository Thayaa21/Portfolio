"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { Check, Loader2, Sparkles } from "lucide-react";
import { hero } from "@/content/site";

const { console: c } = hero;
const TYPE_MS = 28;
const STEP_MS = 600;

export function AgentConsole() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const [typed, setTyped] = useState(reduce ? c.input : "");
  const [visibleSteps, setVisibleSteps] = useState(reduce ? c.steps.length : 0);
  const [elapsed, setElapsed] = useState(0);
  const [started, setStarted] = useState(reduce);

  // start when scrolled into view
  useEffect(() => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setStarted(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [reduce]);

  // typing
  useEffect(() => {
    if (!started || reduce) return;
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setTyped(c.input.slice(0, i));
      if (i >= c.input.length) clearInterval(id);
    }, TYPE_MS);
    return () => clearInterval(id);
  }, [started, reduce]);

  // steps appear after typing finishes
  useEffect(() => {
    if (!started || reduce) return;
    if (typed.length < c.input.length) return;
    if (visibleSteps >= c.steps.length) return;
    const id = setTimeout(
      () => setVisibleSteps((n) => Math.min(n + 1, c.steps.length)),
      STEP_MS
    );
    return () => clearTimeout(id);
  }, [started, reduce, typed, visibleSteps]);

  // timer via rAF
  useEffect(() => {
    if (!started || reduce) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      setElapsed((now - start) / 1000);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [started, reduce]);

  const typingDone = typed.length >= c.input.length;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="glass mx-auto w-full max-w-[760px] overflow-hidden rounded-[22px]"
      style={{ background: "var(--color-surface-solid)" }}
    >
      {/* header */}
      <div className="flex items-center justify-between border-b border-[var(--color-border)] px-5 py-3.5">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full bg-[#ff5f57]/80" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e]/80" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]/80" />
          </div>
          <span className="font-mono text-[13px] text-[var(--color-text-2)]">
            {c.title}
          </span>
        </div>
        <span className="inline-flex items-center gap-2 rounded-[99px] border border-[var(--color-border)] px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.06em] text-[var(--color-success)]">
          <span className="status-dot inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-success)]" />
          running
        </span>
      </div>

      {/* body */}
      <div className="px-5 py-5 font-mono text-[13px] leading-relaxed">
        {/* input row */}
        <div className="flex items-start gap-2.5 rounded-[12px] border border-[var(--color-border)] bg-[var(--color-surface)] px-3.5 py-3">
          <Sparkles size={15} className="mt-0.5 shrink-0 text-[var(--color-accent-soft)]" />
          <span className="text-[var(--color-text-2)]">
            {typed}
            {!reduce && !typingDone && (
              <span className="ml-0.5 inline-block h-4 w-[7px] translate-y-0.5 animate-pulse bg-[var(--color-accent-soft)]" />
            )}
          </span>
        </div>

        {/* thinking + steps */}
        {(typingDone || reduce) && (
          <div className="mt-4">
            <div className="flex items-center justify-between text-[var(--color-text-muted)]">
              <span>{c.thinking}</span>
              <span className="tabular-nums text-[var(--color-text-muted)]">
                {elapsed.toFixed(1)}s
              </span>
            </div>
            <ul className="mt-3 space-y-2.5">
              {c.steps.map((step, i) => {
                const shown = i < visibleSteps;
                const isSpinner = !step.resolves;
                return (
                  <li
                    key={step.label}
                    className={`flex items-center gap-2.5 transition-opacity duration-300 ${
                      shown ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center">
                      {shown && isSpinner ? (
                        <Loader2
                          size={15}
                          className={`text-[var(--color-accent-soft)] ${
                            reduce ? "" : "animate-spin"
                          }`}
                        />
                      ) : shown ? (
                        <Check size={15} className="text-[var(--color-success)]" />
                      ) : null}
                    </span>
                    <span
                      className={
                        isSpinner
                          ? "text-[var(--color-text-muted)]"
                          : "text-[var(--color-text-2)]"
                      }
                    >
                      {step.label}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
