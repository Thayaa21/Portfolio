"use client";

import { useRef, type ReactNode, type PointerEvent } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "motion/react";
import { spring } from "@/lib/motion";

type Variant = "primary" | "ghost";

const MAX = 6; // px of magnetic pull

/**
 * A button that drifts up to 6px toward the pointer and springs back on
 * leave, with a light sheen sweep on hover. Renders a plain anchor under
 * reduced motion.
 */
export function MagneticButton({
  children,
  href,
  variant = "primary",
  external = false,
  className = "",
  ariaLabel,
}: {
  children: ReactNode;
  href: string;
  variant?: Variant;
  external?: boolean;
  className?: string;
  ariaLabel?: string;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, spring);
  const sy = useSpring(y, spring);

  const base =
    "relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-[14px] px-5 py-3 text-[15px] font-medium transition-colors duration-300";
  const styles =
    variant === "primary"
      ? "btn-primary text-white"
      : "border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-2)] hover:border-[var(--color-border-strong)] hover:bg-[var(--color-surface-2)]";

  const linkProps = external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  if (reduce) {
    return (
      <a
        href={href}
        aria-label={ariaLabel}
        className={`${base} ${styles} ${className}`}
        {...linkProps}
      >
        {children}
      </a>
    );
  }

  const onMove = (e: PointerEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const dx = ((e.clientX - (r.left + r.width / 2)) / (r.width / 2)) * MAX;
    const dy = ((e.clientY - (r.top + r.height / 2)) / (r.height / 2)) * MAX;
    x.set(Math.max(-MAX, Math.min(MAX, dx)));
    y.set(Math.max(-MAX, Math.min(MAX, dy)));
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      aria-label={ariaLabel}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ x: sx, y: sy }}
      className={`group ${base} ${styles} ${className}`}
      {...linkProps}
    >
      {/* sheen sweep */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -translate-x-full skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
      />
      <span className="relative inline-flex items-center gap-2">{children}</span>
    </motion.a>
  );
}
