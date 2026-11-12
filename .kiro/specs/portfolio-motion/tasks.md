# Implementation plan

- [x] 0. Finish the open fixes (if not already committed)
  - Hero arc now starts below the M.S. line (top clamped) and clears text/buttons at 390/768/1440.
  - About: the full "ENGINEER" word is clipped to its column and sits behind the portrait; no fragments and no overflow.
  - ContactCta LinkedIn button uses the LinkedIn brand mark (react-icons/fa6, since simple-icons dropped LinkedIn).

- [x] 1. Add the motion foundation
  - Installed `lenis`. Added `lib/motion.ts` tokens, `SmoothScroll` provider (single rAF loop, disabled under reduced motion, anchor interception with nav offset) and a spring-smoothed `ScrollProgress` bar. Nav anchors and "Back to top" route through Lenis.
  - _Requirements: 1.1, 1.2, 4.4, 8.4_

- [x] 2. Add SplitText headings
  - Built `SplitText` (word-by-word slide-up + de-blur, full text kept for screen readers) and `FadeUp`. Used for the hero H1 and every section H2; eyebrows and paragraphs fade in after their heading.
  - _Requirements: 2.1–2.3_

- [x] 3. Bring the hero to life
  - Arc entrance (opacity/y/scale), rim shimmer (rotating conic mask), pointer parallax on arc and glow (spring), console float (delayed CSS keyframe), staggered star twinkle.
  - _Requirements: 3.1–3.4_

- [x] 4. Add nav behaviour
  - Tighten past 40px, hide on scroll down / show on scroll up, sliding active-section pill via `layoutId` and IntersectionObserver.
  - _Requirements: 4.1–4.3_

- [x] 5. Make Selected work sticky stacking cards
  - Desktop (lg+) sticky stacking with scroll-driven scale (1→0.94) and brightness (1→0.6) on covered panels; mobile falls back to reveal. Visual zoom (1.04) and diagonal arrow nudge on hover. Panels made opaque so the stack reads cleanly.
  - _Requirements: 5.1–5.4_

- [x] 6. Add grid staggers and tilt
  - What I build, More projects, Skills and Now learning stagger by 0.06s. `TiltCard` (≤4°, spring) wraps More-projects cards and feeds the spotlight.
  - _Requirements: 6.1, 6.2_

- [x] 7. Make the timeline draw itself
  - Scroll-linked line draw (scaleY, transform-origin top), dot pop with one-shot ring pulse, cards slide in from the right. Shared by Experience and Education.
  - _Requirements: 7.1, 7.2_

- [x] 8. Add micro-interactions
  - `MagneticButton` + sheen on the hero primary CTA, nav "Get in touch" and contact "Email me". CountUp on 3.8 and 7B ("Sol" static). Contact glow breathes.
  - _Requirements: 8.1–8.3_

- [x] 9. Verify
  - Checked motion in a real browser (headless Chrome via CDP) at 1440px and 390px; confirmed reduced-motion shows final states (plain headings, console final state, no progress bar, no sticky transforms).
  - Off-screen loops pause (hero shimmer/float and ProjectVisual gated by useInView → `motion-paused`). No horizontal overflow at 360/390/768/1440/1920. `npm run build` and lint are clean.
  - NOTE: numeric Lighthouse scores (req 9.2) were not captured — no Lighthouse CLI in this environment. Animations use only transform/opacity/filter and images keep fixed dimensions, so no animation-driven CLS. Run Lighthouse against the Vercel preview to confirm performance ≥ 90.
  - _Requirements: 9.1–9.4_
