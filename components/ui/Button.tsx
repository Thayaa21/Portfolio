import type { ReactNode } from "react";

type Variant = "primary" | "ghost";

export function Button({
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
  const base =
    "inline-flex items-center justify-center gap-2 rounded-[14px] px-5 py-3 text-[15px] font-medium transition-all duration-300";
  const styles =
    variant === "primary"
      ? "btn-primary text-white hover:brightness-110"
      : "border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-2)] hover:border-[var(--color-border-strong)] hover:bg-[var(--color-surface-2)]";

  return (
    <a
      href={href}
      aria-label={ariaLabel}
      className={`${base} ${styles} ${className}`}
      {...(external
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
    >
      {children}
    </a>
  );
}
