# Design: Portfolio motion layer

## Libraries
- `motion` (already installed): `motion/react` for whileInView, useScroll, useTransform, useSpring, layoutId and useReducedMotion.
- `lenis` (add): smooth scroll. Mount it in a client `SmoothScroll` provider in `app/layout.tsx`. Integrate with motion by running `lenis.raf` from a single requestAnimationFrame loop. Expose `scrollTo` via context for nav links and "Back to top".

## Shared motion tokens (`lib/motion.ts`)
```ts
export const ease = [0.22, 1, 0.36, 1] as const;   // expo-out
export const dur = { fast: 0.35, base: 0.6, slow: 0.9 };
export const stagger = { words: 0.05, items: 0.06 };
export const spring = { stiffness: 120, damping: 20, mass: 0.4 };
export const viewportOnce = { once: true, margin: "-80px" } as const;
```
Every component imports from here instead of hard-coding values.

## New and updated components
| Component | Behaviour |
|---|---|
| `ui/SplitText` | Splits a string into words; each word sits in `overflow:hidden` inline-block; child animates `y: '100%' → 0`, `filter: blur(8px) → 0`, `opacity 0 → 1`. Used by every H1/H2 (`as` prop keeps semantics; full text stays in DOM for screen readers). |
| `layout/SmoothScroll` | Lenis provider, disabled under reduced motion. |
| `layout/ScrollProgress` | Fixed 2px bar at top; `scaleX` = `useSpring(scrollYProgress)`; gradient `--grad-text`. |
| `layout/Nav` | `useScroll` + `useMotionValueEvent` → `scrolled` (y > 40) and `hidden` (direction down and y > 200). Active section via IntersectionObserver; active pill uses `layoutId="nav-pill"`. |
| `sections/Hero` | Arc: `initial {opacity:0, y:40, scale:.96}` → in; rim shimmer = conic-gradient mask rotating via CSS keyframes (transform only). Pointer parallax: `useMotionValue` x/y → `useSpring` → translate on arc and glow (±12px). Console float: CSS keyframe `float` after a 2.5s delay. |
| `layout/Background` | Stars as 2 layers of absolutely-positioned dots with staggered `twinkle` keyframes (opacity .2↔.8). |
| `sections/Work` | Desktop: each panel wrapper `position: sticky; top: calc(96px + 16px * i)`. Each panel gets `useScroll({ target: nextPanelRef, offset: ['start end','start start'] })` → `scale: 1 → .94`, `filter: brightness(1 → .6)`. Container height grows naturally from stacked panels plus a trailing spacer of about 20vh. Under 1024px: plain `Reveal`. |
| `ui/ProjectVisual` | Animations run only while in view (`useInView`). |
| `ui/TiltCard` | Pointer → rotateX/rotateY ≤ 4°, spring; combines with the existing spotlight. Used by More-projects cards. |
| `sections/Timeline` | Line: `useScroll({target: sectionRef, offset:['start 70%','end 60%']})` → `scaleY` with `transformOrigin: top`. Each entry: `useInView` → dot `scale 0→1` + ring pulse; card `x: 24 → 0, opacity 0 → 1`. |
| `ui/MagneticButton` | Wraps primary buttons; pointer offset × 0.25 clamped to 6px, spring back on leave; `::after` sheen sweep on hover (translateX −100% → 100%). |
| `ui/CountUp` | Animates numeric part only ("3.8" with 1 decimal, "7" + "B"). |
| `sections/ContactCta` | Glow `breathe` keyframe (scale 1↔1.08, opacity .7↔1, 5s). |

## Pausing off-screen loops
Wrap infinite animations with `useInView` (or IntersectionObserver) and toggle `animation-play-state: paused` / stop the motion value when out of view.

## Reduced motion
A single `useReducedMotion()` check in each component. When true, render final states, skip Lenis, skip sticky stacking (normal flow), and show the timeline line fully drawn.
