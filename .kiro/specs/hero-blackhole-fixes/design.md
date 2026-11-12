# Design: Black hole hero + fixes

## 1. Black hole hero (`ui/BlackHole.tsx`)
Reflex renders this with a WebGL2 canvas plus a masked dark disc on top. Build ours the same way, with **no three.js** (raw WebGL2, one full-screen triangle, one fragment shader, ~150 lines).

**Placement:** an absolutely positioned container centred behind the console, about 960×560px on desktop (100vw × 420px on mobile). The ring centre sits about 62% down the container, so the console (z-index above) covers its lower half. A bottom gradient (`transparent → --bg`) blends it into the page. The top of the outer glow must stay below the M.S. line.

**Fragment shader recipe** (uniforms: `u_res`, `u_time`, `u_mouse`):
1. `p = (fragCoord - centre) / u_res.y`; `centre += u_mouse * 0.02`; `r = length(p)`, `a = atan(p.y, p.x)`.
2. **Lensing:** bend the star-sample coordinates with `q = p * (1.0 + 0.045 / (r*r + 0.002))`, so stars smear around the hole.
3. **Stars:** hash-grid point stars on `q` (2 layers, different densities); each twinkles with `0.6 + 0.4*sin(u_time*rate + hash*6.28)`; colour `#F4F0FF` at 0.5–0.9 brightness.
4. **Event horizon:** radius `R = 0.20`. Inside `smoothstep(R, R-0.01, r)` → colour `#0C0530`, which hides the stars.
5. **Photon ring:** `exp(-pow((r - R*1.06)/0.0055, 2.0))`, colour mixing `#FFFFFF → #DCD2FF`, intensity 1.6.
6. **Accretion bands:** 3 gaussian rings at `R*1.18`, `R*1.34`, `R*1.55`, widths `0.018 / 0.03 / 0.05`, colours `#BFB1FF`, `#8A72FF`, `#7C5CFF`, intensities `0.9 / 0.6 / 0.35`. Modulate each by turbulence `fbm(vec2(a*3.0 + u_time*0.12, r*9.0 - u_time*0.05))` (range 0.55–1.0), and by side brightening `1.0 + 0.35*cos(a - u_time*0.3)`.
7. **Halo:** `exp(-max(r - R, 0.0) * 5.5) * 0.35`, colour `#7C5CFF`.
8. Sum, tone map with `1 - exp(-col*1.4)`, and output on the page background `#040014` (opaque canvas, no blending issues).

**Overlay:** a `div` the size of the horizon (border-radius 50%, background `#0C0530`, mask `radial-gradient(78% 78%, #000 80%, transparent 100%)`) sits exactly over the hole, as Reflex does, to keep the centre crisp at any DPR.

**Runtime:** set up in `useEffect` after `requestIdleCallback` (fallback `setTimeout(…, 200)`). DPR = `min(devicePixelRatio, 1.5)`, render scale 0.75, `ResizeObserver` for size. `IntersectionObserver` and `visibilitychange` stop and start the rAF loop. Under reduced motion, draw one frame at `u_time = 8.0` and stop. Without WebGL2, keep the existing CSS arc as the fallback. Clean up the GL context on unmount.

**Entrance:** the canvas container fades and rises in (`opacity 0→1`, `y 40→0`, `scale .96→1`, 0.9s) after the H1 reveal, then the existing pointer parallax applies to the container.


## 2. Opaque stacking cards
In `sections/Work`, the sticky panel background becomes `linear-gradient(180deg, #0D0924, #080518)` with the existing border and inner highlight. Keep the backdrop blur only on non-stacked cards. The covered panel keeps its scale (.94) and brightness (.6) transform.

## 3. LCP fix
- Hero: replace the opacity-0 word reveal with a CSS-only entrance (`@keyframes heroIn { from { transform: translateY(12px); filter: blur(6px) } to { transform:none; filter:none } }`) that runs on first paint, so the text is visible and counts for LCP immediately. SplitText for H2s below the fold can stay as is.
- Wrap `SmoothScroll`, `BlackHole`, `TiltCard`, `MagneticButton` and the timeline motion in `next/dynamic(..., { ssr: false })` or start them after `requestIdleCallback`.
- Check that bundle chunks don't include unused motion features (import from `motion/react` only what's used; consider `LazyMotion` + `domAnimation`).
- Measure with `npx serve out` (gzip on) + Lighthouse mobile. Iterate until targets are met and report the actual numbers.
