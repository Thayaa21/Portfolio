export type Link = { label: string; href: string };

export type NavLink = { label: string; href: string };

export type Project = {
  slug: string;
  title: string;
  label?: string;
  description: string;
  chips: string[];
  href?: string;
  image?: string;
  visual?: "pipeline" | "cluster" | "graph";
  featured?: boolean;
  number?: string;
  visible: boolean;
};

export type TimelineEntry = {
  org: string;
  title: string;
  dates: string;
  location: string;
  bullets: string[];
  image?: string;
};

export type SkillGroup = {
  name: string;
  skills: { name: string; icon: string }[];
};

export type Capability = {
  title: string;
  description: string;
  icon: string;
  badge?: string;
};

export type FactCard = {
  value: string;
  label: string;
};

export type LearningCard = {
  title: string;
  detail: string;
};
