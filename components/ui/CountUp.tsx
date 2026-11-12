"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

/**
 * Counts up to a numeric target when scrolled into view.
 * Text values (non-numeric) render as-is with no animation.
 */
export function CountUp({
  value,
  duration = 1200,
  className = "",
}: {
  value: string;
  duration?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const match = value.match(/^(\d+(?:\.\d+)?)(.*)$/);
  const isNumeric = match !== null;
  const target = isNumeric ? parseFloat(match![1]) : 0;
  const suffix = isNumeric ? match![2] : "";
  const decimals = isNumeric && match![1].includes(".") ? 1 : 0;

  const [display, setDisplay] = useState(
    isNumeric ? `0${decimals ? ".0" : ""}${suffix}` : value
  );

  useEffect(() => {
    if (!isNumeric || reduce) {
      setDisplay(value);
      return;
    }
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    let started = false;

    const run = () => {
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        const current = (target * eased).toFixed(decimals);
        setDisplay(`${current}${suffix}`);
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started) {
          started = true;
          run();
          obs.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(el);

    return () => {
      obs.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [isNumeric, reduce, target, suffix, decimals, duration, value]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
