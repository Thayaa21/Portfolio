export function SectionLabel({
  children,
  className = "",
}: {
  children: string;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-[8px] border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1.5 font-mono text-[12px] font-medium uppercase tracking-[0.08em] text-[var(--color-text-muted)] ${className}`}
    >
      {children}
    </span>
  );
}
