import { Bot, Search, SlidersHorizontal, Phone, Workflow, Cpu } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { capabilities } from "@/content/site";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SplitText } from "@/components/ui/SplitText";

const iconMap: Record<string, LucideIcon> = {
  bot: Bot,
  search: Search,
  sliders: SlidersHorizontal,
  phone: Phone,
  workflow: Workflow,
  cpu: Cpu,
};

export function Capabilities() {
  return (
    <section id="capabilities" className="section">
      <div className="container-content">
        <SplitText
          as="h2"
          text={capabilities.h2}
          className="font-display text-[30px] font-medium tracking-[-0.028em] md:text-[42px]"
        />

        <RevealGroup className="mt-10 grid grid-cols-1 overflow-hidden rounded-[22px] border border-[var(--color-border)] sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.cards.map((card) => {
            const Icon = iconMap[card.icon] ?? Bot;
            return (
              <RevealItem
                key={card.title}
                className="border-b border-[var(--color-border)] bg-[var(--color-surface)] p-7 last:border-b-0 sm:[&:nth-last-child(-n+1)]:border-b-0 lg:[&:nth-child(n+4)]:border-b-0"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-10 w-10 items-center justify-center rounded-[10px] border border-[var(--color-border)] bg-[var(--color-surface-2)] text-[var(--color-accent-soft)]">
                    <Icon size={18} />
                  </span>
                  {card.badge && (
                    <span className="inline-flex items-center gap-1.5 rounded-[99px] border border-[var(--color-border-accent)] bg-[var(--color-surface-2)] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.06em] text-[var(--color-accent-soft)]">
                      {card.badge}
                    </span>
                  )}
                </div>
                <h3 className="mt-5 font-display text-[20px] font-medium text-[var(--color-text)]">
                  {card.title}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-[var(--color-text-muted)]">
                  {card.description}
                </p>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
