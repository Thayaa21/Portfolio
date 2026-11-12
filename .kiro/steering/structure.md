# Structure

```
app/
  layout.tsx          fonts, metadata, JSON-LD, <Background/>, <Nav/>, <Footer/>
  page.tsx            composes the sections in order
  not-found.tsx       styled 404 with a "Back home" button
  sitemap.ts  robots.ts
components/
  sections/           Hero, Marquee, About, Capabilities, Work, MoreProjects,
                      Experience, Education, Skills, NowLearning, ContactCta
  ui/                 GlassCard, Pill, Button, SectionLabel, GradientText,
                      AgentConsole, Reveal (scroll-reveal wrapper), CountUp,
                      ProjectVisual (fallback visual when there's no image)
  layout/             Nav, Footer, Background
content/
  site.ts             ALL copy and data, typed (single source of truth, from steering/content.md)
lib/
  types.ts  utils.ts
public/
  images/             reused from the old site (see content.md for paths)
  fonts/              Satoshi woff2
  resume.pdf          added by Thayaa; hide the CV button if missing
  og.png  favicon.svg
```

Rules:
- Components never hard-code copy. Everything comes from `content/site.ts`.
- One component per file, named exports, no default exports except Next.js pages and layouts.
- Keep the client/server split clean: sections are server components unless they need motion or state.
