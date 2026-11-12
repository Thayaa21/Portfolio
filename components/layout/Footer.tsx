import { Github, Linkedin, Mail } from "lucide-react";
import { footer, identity, nav } from "@/content/site";

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)]">
      <div className="container-content py-16">
        <div className="grid gap-12 md:grid-cols-[1.2fr_2fr] md:gap-8">
          {/* left */}
          <div>
            <a
              href="#top"
              className="flex items-center gap-1.5 font-display text-xl font-medium text-[var(--color-text)]"
            >
              {nav.logo}
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
            </a>
            <p className="mt-2 text-sm text-[var(--color-text-muted)]">
              {footer.tagline}
            </p>
          </div>

          {/* link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {footer.columns.map((col) => (
              <div key={col.title}>
                <h3 className="font-mono text-[12px] font-medium uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
                  {col.title}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        className="text-sm text-[var(--color-text-2)] transition-colors hover:text-[var(--color-text)]"
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* socials */}
        <div className="mt-12 flex items-center gap-3">
          <a
            href={identity.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="flex h-10 w-10 items-center justify-center rounded-[12px] border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-2)] transition-colors hover:border-[var(--color-border-strong)] hover:text-[var(--color-text)]"
          >
            <Github size={18} />
          </a>
          <a
            href={identity.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="flex h-10 w-10 items-center justify-center rounded-[12px] border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-2)] transition-colors hover:border-[var(--color-border-strong)] hover:text-[var(--color-text)]"
          >
            <Linkedin size={18} />
          </a>
          <a
            href={`mailto:${identity.email}`}
            aria-label="Email"
            className="flex h-10 w-10 items-center justify-center rounded-[12px] border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-2)] transition-colors hover:border-[var(--color-border-strong)] hover:text-[var(--color-text)]"
          >
            <Mail size={18} />
          </a>
        </div>

        {/* bottom row */}
        <div className="mt-10 flex flex-col gap-4 border-t border-[var(--color-border)] pt-6 text-sm text-[var(--color-text-muted)] sm:flex-row sm:items-center sm:justify-between">
          <span>{footer.copyright}</span>
          <span className="inline-flex items-center gap-2 rounded-[99px] border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.08em]">
            <span className="status-dot inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-success)]" />
            Currently building at qBotica
          </span>
          <a
            href="#top"
            className="font-mono text-[11px] uppercase tracking-[0.08em] text-[var(--color-text-2)] transition-colors hover:text-[var(--color-text)]"
          >
            {footer.backToTop}
          </a>
        </div>
      </div>
    </footer>
  );
}
