# Implementation plan

- [x] 1. Set up the project on branch `redesign`
  - Create the `redesign` branch. Scaffold Next.js 15 (App Router, TS, ESLint, Tailwind v4) at the repo root alongside the old files.
  - Install `motion`, `lucide-react`, `react-icons`. Configure `output: 'export'` and unoptimized images.
  - Add Satoshi (local), Inter and Geist Mono via `next/font`.
  - Copy the images listed in `steering/content.md` into `public/images/`.
  - _Requirements: 7.1_

- [x] 2. Add design tokens and base UI
  - Put every token from design.md §1 into `app/globals.css` (`@theme`).
  - Build `GlassCard` (with pointer-follow highlight), `Pill`, `Button` (primary/ghost), `SectionLabel` (mono boxed label), `GradientText`, `Reveal`, `CountUp`.
  - Build `Background` (bg colour, star/noise layer, hero glow).
  - _Requirements: 6.1, 6.3, 6.4_

- [x] 3. Write the content layer
  - Create `lib/types.ts` (design.md §4) and `content/site.ts`, copying `steering/content.md` exactly, with hidden projects set to `visible: false`.
  - Add a helper that filters `visible` and a build-time check for `public/resume.pdf`.
  - _Requirements: 1.1–1.5, 2.4_

- [x] 4. Build the nav and footer
  - Sticky glass nav with smooth-scroll anchors and a mobile glass sheet. Footer as in design.md §2.13.
  - _Requirements: 2.2, 2.3_

- [x] 5. Build the hero
  - Pill, H1 with gradient phrase, subhead, CTAs and mono line, plus the entrance sequence.
  - Glowing arc built in CSS layers.
  - `AgentConsole` with typing, steps, spinner and timer, plus the reduced-motion final state.
  - _Requirements: 2.1, 3.1–3.3_

- [x] 6. Build the tech marquee and About
  - Seamless looping marquee with edge masks that pauses on hover.
  - About section: giant faded word with parallax, arch portrait, text, fact cards and tag card.
  - _Requirements: 6.2_

- [x] 7. Build "What I build"
  - 3×2 shared-border grid with icon tiles and the "Learning now" badge.

- [x] 8. Build Selected work and More projects
  - 4 numbered panels with alternating layout and the "Explore →" pill.
  - `ProjectVisual` pipeline / cluster / graph modes (SVG plus CSS animation).
  - More-projects glass grid, filtered by `visible`.
  - _Requirements: 4.1–4.4_

- [x] 9. Build Experience, Education and Skills
  - Danie timeline component reused for both resume sections; skills groups with icon fallback.
  - _Requirements: 5.1–5.3_

- [x] 10. Build Now learning, Contact CTA and 404
  - _Requirements: 1.5, 7.3_

- [x] 11. Add SEO
  - Metadata, OG image (1200×630, dark with name + H1), JSON-LD Person, sitemap, robots.
  - _Requirements: 7.3_

- [x] 12. Check the quality bar
  - Checked 360 / 768 / 1024 / 1440 / 1920px via CDP device metrics: no horizontal overflow at any width.
  - Reduced motion is gated on every effect (marquee, count-up, parallax, console typing/timer, reveals).
  - `npm run build` passes clean (zero TS/ESLint errors) and exports a fully static site.
  - Verified every visible string against `steering/content.md`: no invented text, no qBotica numbers, fixed job titles, hidden projects excluded.
  - NOTE: Lighthouse CLI was not installed in this environment, so the numeric Lighthouse scores were not captured. The underlying targets (static export, no CLS from sized fonts/images, semantic HTML, alt text, focus rings) are in place; run Lighthouse against the Vercel preview to confirm the scores.
  - _Requirements: 6.4, 7.1, 7.2, 7.4_

- [ ] 13. Clean up (ONLY after Thayaa approves the preview)
  - Remind him to set the Vercel Framework Preset to Next.js.
  - Remove the old static files listed in `steering/tech.md`, update README.md for the new stack, and open a PR from `redesign` into `main`.

