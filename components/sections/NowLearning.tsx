import { nowLearning } from "@/content/site";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

export function NowLearning() {
  return (
    <section id="now-learning" className="section">
      <div className="container-content">
        <Reveal>
          <SectionLabel>{nowLearning.label}</SectionLabel>
          <p className="mt-5 max-w-[560px] text-[17px] text-[var(--color-text-2)]">
            {nowLearning.intro}
          </p>
        </Reveal>

        <RevealGroup className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {nowLearning.cards.map((card) => (
            <RevealItem key={card.title}>
              <div className="glass glass-hover relative h-full overflow-hidden rounded-[22px] p-5">
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-px"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(220,210,255,0.6), transparent)",
                  }}
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-16 opacity-60 blur-xl"
                  style={{
                    background:
                      "radial-gradient(60% 100% at 50% 0%, rgba(138,114,255,0.3), transparent)",
                  }}
                />
                <div className="relative">
                  <span className="inline-flex items-center rounded-[99px] border border-[var(--color-border-accent)] bg-[var(--color-surface-2)] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.06em] text-[var(--color-accent-soft)]">
                    Learning
                  </span>
                  <h3 className="mt-4 font-display text-[20px] font-medium text-[var(--color-text)]">
                    {card.title}
                  </h3>
                  {card.detail && (
                    <p className="mt-2 text-[14px] leading-relaxed text-[var(--color-text-muted)]">
                      {card.detail}
                    </p>
                  )}
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
