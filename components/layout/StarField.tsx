"use client";

import { useMemo } from "react";
import { useReducedMotion } from "motion/react";

// Deterministic pseudo-random so SSR and client markup match.
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Star = {
  top: string;
  left: string;
  size: number;
  delay: string;
  duration: string;
};

function makeStars(count: number, seed: number): Star[] {
  const rand = mulberry32(seed);
  return Array.from({ length: count }, () => ({
    top: `${(rand() * 100).toFixed(2)}%`,
    left: `${(rand() * 100).toFixed(2)}%`,
    size: rand() > 0.85 ? 2 : 1,
    delay: `${(rand() * 4).toFixed(2)}s`,
    duration: `${(3 + rand() * 3).toFixed(2)}s`,
  }));
}

export function StarField() {
  const reduce = useReducedMotion();
  const stars = useMemo(
    () => [...makeStars(28, 7), ...makeStars(22, 42)],
    []
  );

  if (reduce) return null;

  return (
    <div className="absolute inset-0">
      {stars.map((s, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            top: s.top,
            left: s.left,
            width: s.size,
            height: s.size,
            animation: `star-twinkle ${s.duration} ease-in-out ${s.delay} infinite`,
          }}
        />
      ))}
    </div>
  );
}
