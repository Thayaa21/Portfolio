# Requirements: Black hole hero + performance fixes

## Introduction
Follow-up to portfolio-motion. The Reflex black hole was never built, the stacked work cards show the card underneath through them, and mobile Lighthouse performance is 57 (target ≥ 90) because the hero text stays invisible until JavaScript runs.

## Requirement 1: Black hole hero (Reflex signature visual)
1. THE hero SHALL render a real-time WebGL2 black hole behind the AgentConsole: a dark event-horizon disc, a thin bright photon ring, layered violet accretion-glow bands with swirling turbulence, a soft halo and lensed twinkling stars, matching reflex-template.framer.ai.
2. THE AgentConsole SHALL overlap the lower half of the ring so the ring reads as an arch rising behind it. The ring and glow SHALL NOT cross the hero text, button or M.S. line at 390/768/1440px.
3. THE shader SHALL animate slowly (turbulence drift; brighter/dimmer sides rotate about every 20s) and shift its lensing centre by at most 2% toward the pointer.
4. IF WebGL2 is unavailable THEN the site SHALL show the current CSS arc. IF the user prefers reduced motion THEN it SHALL render one still frame.
5. THE canvas SHALL initialise after first paint, cap DPR at 1.5, render at 0.75 scale, and pause when off-screen or the tab is hidden.

## Requirement 2: Opaque stacking cards
1. WHILE work panels are stacked THE top panel SHALL be fully opaque. No text or visuals from the covered panel may show through it. Use a solid surface colour (e.g. `#0B0720`, mixed toward the glass look with a gradient) instead of a translucent glass background on the stacked panels.

## Requirement 3: LCP and main-thread performance
1. THE hero H1, subhead, button and M.S. line SHALL be visible in the server-rendered HTML before any JavaScript runs. Entrance animations SHALL only use transform/filter starting from a visible state (or CSS animations with `animation-fill-mode: both` that start immediately), never opacity 0 waiting for hydration.
2. Lenis, the BlackHole canvas and below-the-fold motion components SHALL load lazily (dynamic import / after idle) so they do not block first render.
3. Mobile Lighthouse (local production build served with gzip, e.g. `npx serve out`) SHALL score Performance ≥ 90 with LCP < 2.5s and TBT < 200ms.

## Requirement 4: Heading order
1. Headings SHALL descend sequentially (h1 → h2 → h3, with no skipped levels) to fix the Lighthouse heading-order audit.
