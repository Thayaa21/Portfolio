# Implementation plan

- [x] 1. Make the stacked work cards opaque
  - Stacked panels use a solid `linear-gradient(180deg, #0D0924, #080518)` with the `.work-panel` class removing the backdrop blur, so no covered panel shows through the one on top. The covered panel keeps its scale (.94) and brightness (.6).
  - _Requirements: 2.1_

- [x] 2. Fix LCP: hero visible without JS, lazy-load motion
  - Hero H1, subhead, button and M.S. line are plain server-rendered elements, visible on first paint; the CSS `hero-in` entrance only animates transform/filter (`animation-fill-mode: both`), never opacity-0-until-hydration. SplitText/FadeUp removed from the hero (still used for below-the-fold H2s).
  - Lenis is dynamically imported inside a `requestIdleCallback` (fallback `setTimeout`) so it's out of the initial chunk and starts after first paint. BlackHole is `next/dynamic({ ssr:false })`, mounting after the hero paints.
  - Measured on the gzip-served static build under 4x CPU + slow-4G emulation: FCP ≈ 784ms, LCP ≈ 784ms (hero text is the LCP element and paints immediately), well under the 2.5s target.
  - NOTE: a full numeric Lighthouse score needs the Lighthouse CLI, which won't install non-interactively here. LCP/FCP were measured directly via CDP. Run Lighthouse on the Vercel preview to confirm Performance ≥ 90 / TBT < 200ms.
  - _Requirements: 3.1–3.3_

- [x] 3. Build the BlackHole WebGL2 hero
  - `ui/BlackHole.tsx`: raw WebGL2 (no three.js), one full-screen triangle, one fragment shader. Lensed twinkling stars (2 layers), event horizon `#0C0530`, thin photon ring, three turbulent violet accretion bands (`#BFB1FF`/`#8A72FF`/`#7C5CFF`) with side-brightening, soft halo, `1 - exp(-col*1.4)` tone-map. Bottom gradient + a masked horizon overlay div keep the centre crisp. Verified against the reference in an isolated shader harness.
  - Runtime: init deferred (dynamic import after idle), DPR capped at 1.5 × 0.75 render scale, `ResizeObserver` for size, `IntersectionObserver` + `visibilitychange` start/stop the rAF loop, pointer shifts the lensing centre ≤2% (eased). Reduced motion draws one still frame; no WebGL2 → the CSS arc fallback stays.
  - Ring/glow stay below the M.S. line (centre pushed low, arch fades to BG at the top); no overflow at 360/390/768/1440/1920.
  - NOTE: headless SwiftShader mispaints the composited full page, so the on-page WebGL screenshot couldn't be captured here — confirm the live black hole on the Vercel preview. Shader output and CSS fallback were both verified directly.
  - _Requirements: 1.1–1.5_

- [x] 4. Fix heading order
  - `SectionLabel` now renders an `<h2>` where it is a section heading (Experience, Education, Skills, Now learning); the About eyebrow is an `<h2>`. Headings descend h1 → h2 → h3 with no skips (verified by dumping the heading outline).
  - _Requirements: 4.1_

- [ ] 5. Verify and push
  - No horizontal overflow at 360/390/768/1440/1920 (verified). Reduced motion shows final states (verified: no canvas, CSS arc, plain headings). `npm run build` and lint clean.
  - Commit on `redesign` and push.
  - Did NOT edit files in other spec folders.
