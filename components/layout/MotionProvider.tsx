"use client";

import { LazyMotion, domMax } from "motion/react";
import type { ReactNode } from "react";

/**
 * Loads a DOM feature set lazily instead of pulling the full `motion`
 * bundle into the initial chunk; components use `m.*` instead of `motion.*`.
 * `domMax` (rather than `domAnimation`) is needed because the nav's active
 * pill uses a shared-layout `layoutId` animation. This still strips a large
 * amount of JavaScript off the main thread to cut Total Blocking Time.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <LazyMotion features={domMax}>{children}</LazyMotion>;
}
