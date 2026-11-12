"use client";

import type { ComponentType, SVGProps } from "react";
import {
  SiPython,
  SiPytorch,
  SiHuggingface,
  SiLangchain,
  SiFastapi,
  SiRay,
  SiDocker,
  SiGooglecloud,
  SiCplusplus,
  SiGit,
} from "react-icons/si";
import { Boxes, Cloud } from "lucide-react";
import { marquee } from "@/content/site";

type SvgIcon = ComponentType<SVGProps<SVGSVGElement>>;

const icons: Record<string, SvgIcon> = {
  Python: SiPython,
  PyTorch: SiPytorch,
  "Hugging Face": SiHuggingface,
  LangChain: SiLangchain,
  FastAPI: SiFastapi,
  Ray: SiRay,
  Docker: SiDocker,
  AWS: Cloud,
  "Google Cloud": SiGooglecloud,
  "C++": SiCplusplus,
  Git: SiGit,
};

function Item({ name }: { name: string }) {
  const Icon = icons[name];
  return (
    <span className="flex shrink-0 items-center gap-2.5 px-7 text-[var(--color-text-muted)]">
      {Icon ? (
        <Icon className="h-5 w-5 opacity-80" aria-hidden="true" />
      ) : (
        <Boxes className="h-5 w-5 opacity-80" aria-hidden="true" />
      )}
      <span className="whitespace-nowrap text-[15px]">{name}</span>
    </span>
  );
}

export function Marquee() {
  const row = [...marquee.items, ...marquee.items];
  return (
    <section className="py-12 md:py-16" aria-label="Tools I ship with">
      <div className="container-content">
        <p className="mb-6 text-center font-mono text-[12px] uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
          {marquee.caption}
        </p>
      </div>
      <div className="marquee-group marquee-mask relative overflow-hidden">
        <div className="marquee-track flex w-max">
          {row.map((name, i) => (
            <Item key={`${name}-${i}`} name={name} />
          ))}
          <span className="sr-only">{marquee.items.join(", ")}</span>
        </div>
      </div>
    </section>
  );
}
