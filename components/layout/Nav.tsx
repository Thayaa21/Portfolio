"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  useReducedMotion,
} from "motion/react";
import { Menu, X } from "lucide-react";
import { nav, identity } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { MagneticButton } from "@/components/ui/MagneticButton";

const SECTION_IDS = nav.links.map((l) => l.href.replace("#", ""));

export function Nav({ hasResume }: { hasResume: boolean }) {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const lastY = useRef(0);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 40);
    const goingDown = y > lastY.current;
    if (!open) setHidden(goingDown && y > 200);
    lastY.current = y;
  });

  // active section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: [0, 0.25, 0.5, 1] }
    );
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50"
      initial={false}
      animate={{ y: hidden && !reduce ? "-110%" : "0%" }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <nav
        className="border-b transition-all duration-300"
        style={{
          background: scrolled
            ? "rgba(13,10,31,0.82)"
            : "rgba(13,10,31,0.72)",
          backdropFilter: scrolled ? "blur(20px)" : "blur(16px)",
          WebkitBackdropFilter: scrolled ? "blur(20px)" : "blur(16px)",
          borderColor: scrolled
            ? "var(--color-border-strong)"
            : "var(--color-border)",
        }}
      >
        <div
          className={`container-content flex items-center justify-between transition-all duration-300 ${
            scrolled ? "h-14" : "h-16"
          }`}
        >
          {/* logo */}
          <a
            href="#top"
            className="flex items-center gap-1.5 font-display text-lg font-medium text-[var(--color-text)]"
          >
            {nav.logo}
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
          </a>

          {/* centre links (desktop) with sliding active pill */}
          <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 md:flex">
            {nav.links.map((l) => {
              const id = l.href.replace("#", "");
              const isActive = active === id;
              return (
                <li key={l.href} className="relative">
                  <a
                    href={l.href}
                    className={`relative inline-block rounded-[99px] px-3.5 py-1.5 text-sm transition-colors ${
                      isActive
                        ? "text-[var(--color-text)]"
                        : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId={reduce ? undefined : "nav-pill"}
                        className="absolute inset-0 -z-10 rounded-[99px] border border-[var(--color-border)] bg-[var(--color-surface-2)]"
                        transition={{
                          type: "spring",
                          stiffness: 350,
                          damping: 30,
                        }}
                      />
                    )}
                    {l.label}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* right buttons (desktop) */}
          <div className="hidden items-center gap-3 md:flex">
            {hasResume && (
              <Button
                href={identity.cv}
                variant="ghost"
                external
                className="px-4 py-2 text-sm"
              >
                {nav.downloadCv}
              </Button>
            )}
            <MagneticButton
              href={`mailto:${identity.email}`}
              variant="primary"
              className="px-4 py-2 text-sm"
            >
              {nav.getInTouch}
            </MagneticButton>
          </div>

          {/* mobile toggle */}
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-[12px] border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] md:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* mobile glass sheet */}
      {open && (
        <div
          className="fixed inset-0 top-16 z-40 md:hidden"
          style={{
            background: "var(--color-surface-solid)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
          }}
        >
          <div className="container-content flex flex-col gap-2 py-8">
            {nav.links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-[12px] px-4 py-4 font-display text-2xl text-[var(--color-text)] hover:bg-[var(--color-surface)]"
              >
                {l.label}
              </a>
            ))}
            <div className="mt-6 flex flex-col gap-3">
              {hasResume && (
                <Button href={identity.cv} variant="ghost" external>
                  {nav.downloadCv}
                </Button>
              )}
              <Button href={`mailto:${identity.email}`} variant="primary">
                {nav.getInTouch}
              </Button>
            </div>
          </div>
        </div>
      )}
    </motion.header>
  );
}
