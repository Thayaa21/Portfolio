type Tag = "span" | "h2";

export function SectionLabel({
  children,
  className = "",
  as = "span",
}: {
  children: string;
  className?: string;
  as?: Tag;
}) {
  const Tag = as;
  return (
    <Tag
      className={`m-0 inline-flex items-center rounded-[8px] border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1.5 font-mono text-[12px] font-medium uppercase tracking-[0.08em] text-[var(--color-text-muted)] ${className}`}
    >
      {children}
    </Tag>
  );
}
