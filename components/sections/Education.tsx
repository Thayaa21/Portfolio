import { education } from "@/content/site";
import { Timeline } from "@/components/sections/Timeline";

export function Education() {
  return (
    <Timeline
      id="education"
      label={education.label}
      entries={education.entries}
    />
  );
}
