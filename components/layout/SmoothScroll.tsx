"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import Lenis from "lenis";
import { useReducedMotion } from "motion/react";

type ScrollTarget = string | number | HTMLElement;

type SmoothScrollContextValue = {
  scrollTo: (target: ScrollTarget, options?: { offset?: number }) => void;
};

const SmoothScrollContext = createContext<SmoothScrollContextValue>({
  scrollTo: (target) => {
    if (typeof window === "undefined") return;
    if (typeof target === "number") {
      window.scrollTo({ top: target, behavior: "smooth" });
    } else if (typeof target === "string") {
      document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
    } else {
      target.scrollIntoView({ behavior: "smooth" });
    }
  },
});

export function useSmoothScroll() {
  return useContext(SmoothScrollContext);
}

// Nav height offset so anchored sections aren't hidden under the sticky nav.
const NAV_OFFSET = -80;

export function SmoothScroll({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  const lenisRef = useRef<Lenis | null>(null);
  const [ctx, setCtx] = useState<SmoothScrollContextValue | null>(null);

  useEffect(() => {
    if (reduce) {
      lenisRef.current = null;
      setCtx(null);
      return;
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => 1 - Math.pow(2, -10 * t), // expo-out
    });
    lenisRef.current = lenis;

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    setCtx({
      scrollTo: (target, options) =>
        lenis.scrollTo(target, {
          offset: options?.offset ?? NAV_OFFSET,
        }),
    });

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [reduce]);

  // Intercept same-page anchor clicks so they route through Lenis with offset.
  useEffect(() => {
    if (reduce) return;
    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest(
        'a[href^="#"]'
      ) as HTMLAnchorElement | null;
      if (!anchor) return;
      const hash = anchor.getAttribute("href");
      if (!hash || hash === "#") return;
      const el = document.querySelector(hash);
      if (!el) return;
      e.preventDefault();
      lenisRef.current?.scrollTo(el as HTMLElement, { offset: NAV_OFFSET });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [reduce]);

  const value =
    ctx ??
    ({
      scrollTo: (target: ScrollTarget) => {
        if (typeof window === "undefined") return;
        if (typeof target === "number") {
          window.scrollTo({ top: target, behavior: "smooth" });
        } else if (typeof target === "string") {
          document
            .querySelector(target)
            ?.scrollIntoView({ behavior: "smooth" });
        } else {
          target.scrollIntoView({ behavior: "smooth" });
        }
      },
    } satisfies SmoothScrollContextValue);

  return (
    <SmoothScrollContext.Provider value={value}>
      {children}
    </SmoothScrollContext.Provider>
  );
}
