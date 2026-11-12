import type { ReactNode } from "react";

export function Pill({
  children,
  as = "span",
  href,
  active = false,
  className = "",
}: {
  children: ReactNode;
  as?: "span" | "a";
  href?: string;
  active?: boolean;
  className?: string;
}) {
  const base =
    "inline-flex items-center gap-2 rounded-[99px] border px-4 py-1.5 font-mono text-[12px] font-medium uppercase tracking-[0.08em] transition-colors";
  const tone = active
    ? "border-[var(--color-border-accent)] text-[var(--color-accent-soft)] bg-[var(--color-surface-2)]"
    : "border-[var(--color-border)] text-[var(--color-text-muted)] bg-[var(--color-surface)]";
  const cls = `${base} ${tone} ${className}`;

  if (as === "a" && href) {
    return (
      <a href={href} className={`${cls} hover:border-[var(--color-border-accent)] hover:text-[var(--color-accent-soft)]`}>
        {children}
      </a>
    );
  }
  return <span className={cls}>{children}</span>;
}
