import {
  SiPython,
  SiCplusplus,
  SiTypescript,
  SiPytorch,
  SiHuggingface,
  SiScikitlearn,
  SiLangchain,
  SiFastapi,
  SiDocker,
  SiRay,
  SiApachekafka,
  SiNeo4J,
  SiStreamlit,
  SiGithubactions,
  SiGooglecloud,
  SiPostgresql,
  SiMeta,
} from "react-icons/si";
import { CircleDot, Cloud, Database, TrendingUp } from "lucide-react";
import type { ComponentType, SVGProps } from "react";
import { skills } from "@/content/site";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

type SvgIcon = ComponentType<SVGProps<SVGSVGElement>>;

const iconMap: Record<string, SvgIcon> = {
  python: SiPython,
  cplusplus: SiCplusplus,
  sql: SiPostgresql,
  typescript: SiTypescript,
  pytorch: SiPytorch,
  huggingface: SiHuggingface,
  scikitlearn: SiScikitlearn,
  xgboost: TrendingUp,
  langchain: SiLangchain,
  langgraph: SiLangchain,
  qlora: SiHuggingface,
  faiss: SiMeta,
  chromadb: Database,
  fastapi: SiFastapi,
  docker: SiDocker,
  ray: SiRay,
  apachekafka: SiApachekafka,
  neo4j: SiNeo4J,
  streamlit: SiStreamlit,
  githubactions: SiGithubactions,
  amazonaws: Cloud,
  googlecloud: SiGooglecloud,
};

export function Skills() {
  return (
    <section id="skills" className="section">
      <div className="container-content">
        <div className="mb-10">
          <Reveal>
            <SectionLabel>+ SKILLS</SectionLabel>
          </Reveal>
        </div>

        <RevealGroup className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {skills.groups.map((group) => (
            <RevealItem key={group.name}>
              <GlassCard className="h-full p-6">
                <h3 className="font-mono text-[12px] uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
                  {group.name}
                </h3>
                <div className="mt-5 flex flex-wrap gap-2.5">
                  {group.skills.map((s) => {
                    const Icon = iconMap[s.icon] ?? CircleDot;
                    return (
                      <span
                        key={s.name}
                        className="inline-flex items-center gap-2 rounded-[99px] border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1.5 text-[13px] text-[var(--color-text-2)]"
                      >
                        <Icon
                          className="h-5 w-5 text-[var(--color-accent-soft)]"
                          aria-hidden="true"
                        />
                        {s.name}
                      </span>
                    );
                  })}
                </div>
              </GlassCard>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
