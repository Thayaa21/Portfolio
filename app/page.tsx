import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { About } from "@/components/sections/About";
import { Capabilities } from "@/components/sections/Capabilities";
import { Work } from "@/components/sections/Work";
import { MoreProjects } from "@/components/sections/MoreProjects";
import { Experience } from "@/components/sections/Experience";
import { Education } from "@/components/sections/Education";
import { Skills } from "@/components/sections/Skills";
import { NowLearning } from "@/components/sections/NowLearning";
import { ContactCta } from "@/components/sections/ContactCta";
import { resumeExists } from "@/lib/utils";

export default function Home() {
  const hasResume = resumeExists();
  return (
    <>
      <Hero hasResume={hasResume} />
      <Marquee />
      <About />
      <Capabilities />
      <Work />
      <MoreProjects />
      <Experience />
      <Education />
      <Skills />
      <NowLearning />
      <ContactCta />
    </>
  );
}
