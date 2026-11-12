"use client";

import { motion, useScroll, useSpring, useReducedMotion } from "motion/react";
import { spring } from "@/lib/motion";

export function ScrollProgress() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, spring);

  if (reduce) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left"
      style={{
        scaleX,
        background: "var(--grad-text)",
      }}
    />
  );
}
