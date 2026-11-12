"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { nav, identity } from "@/content/site";
import { Button } from "@/components/ui/Button";

export function Nav({ hasResume }: { hasResume: boolean }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav
        className="border-b border-[var(--color-border)]"
        style={{
          background: "rgba(13,10,31,0.72)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
        }}
      >
        <div className="container-content flex h-16 items-center justify-between">
          {/* logo */}
          <a
            href="#top"
            className="flex items-center gap-1.5 font-display text-lg font-medium text-[var(--color-text)]"
          >
            {nav.logo}
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
          </a>

          {/* centre links (desktop) */}
          <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-7 md:flex">
            {nav.links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="text-sm text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          {/* right buttons (desktop) */}
          <div className="hidden items-center gap-3 md:flex">
            {hasResume && (
              <Button href={identity.cv} variant="ghost" external className="px-4 py-2 text-sm">
                {nav.downloadCv}
              </Button>
            )}
            <Button
              href={`mailto:${identity.email}`}
              variant="primary"
              className="px-4 py-2 text-sm"
            >
              {nav.getInTouch}
            </Button>
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
    </header>
  );
}
