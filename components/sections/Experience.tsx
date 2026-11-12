import { experience } from "@/content/site";
import { Timeline } from "@/components/sections/Timeline";

export function Experience() {
  return (
    <Timeline
      id="experience"
      label={experience.label}
      entries={experience.entries}
    />
  );
}
