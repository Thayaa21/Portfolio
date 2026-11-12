"use client";

import type { ReactNode, PointerEvent, CSSProperties } from "react";
import { useCallback } from "react";

export function GlassCard({
  children,
  className = "",
  radius = "card",
  as = "div",
  interactive = true,
  style,
}: {
  children: ReactNode;
  className?: string;
  radius?: "card" | "panel";
  as?: "div" | "article" | "li";
  interactive?: boolean;
  style?: CSSProperties;
}) {
  const handlePointer = useCallback((e: PointerEvent<HTMLElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  }, []);

  const radiusCls =
    radius === "panel" ? "rounded-[32px]" : "rounded-[22px]";
  const interactiveCls = interactive ? "glass-hover glass-glow" : "";
  const Tag = as;

  return (
    <Tag
      onPointerMove={interactive ? handlePointer : undefined}
      className={`glass ${radiusCls} ${interactiveCls} ${className}`}
      style={style}
    >
      {children}
    </Tag>
  );
}
