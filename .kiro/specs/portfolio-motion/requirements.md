# Requirements: Portfolio motion layer

## Introduction
The redesign is built, but it feels static next to the Framer references (reflex-template.framer.ai, portfon.framer.website, danie.framer.website). This spec adds Framer-quality motion: smooth scroll, text reveals, sticky stacking project cards, a self-drawing timeline, nav behaviour and micro-interactions. Content does not change. All steering rules still apply.

## Requirement 1: Smooth scroll
1. THE site SHALL use Lenis smooth scrolling (duration ~1.1, easing expo-out), and anchor links SHALL scroll smoothly to their sections with a nav offset.
2. IF the user prefers reduced motion THEN Lenis SHALL NOT be started.

## Requirement 2: Text reveals
1. WHEN any H1/H2 enters the viewport THE heading SHALL reveal word by word: each word slides up from 100% inside a clipped line, fading from blur(8px) to 0, staggered by 0.05s.
2. WHEN a paragraph or eyebrow enters THE text SHALL fade and rise in 0.1s after its heading.
3. Reveals SHALL play once.

## Requirement 3: Hero life
1. THE glowing arc SHALL rise and fade in on load, then its rim SHALL slowly shimmer (a light sweep travelling along the rim about every 6s).
2. WHEN the pointer moves over the hero THE arc and background glow SHALL shift up to 12px toward the pointer (spring-smoothed).
3. THE AgentConsole SHALL float gently (y ±6px, 6s loop) after its intro finishes.
4. THE background star layer SHALL twinkle subtly (opacity variation, staggered).

## Requirement 4: Navigation
1. WHEN the page is scrolled past 40px THE nav SHALL tighten (smaller height, stronger blur and border).
2. WHEN the user scrolls down THE nav SHALL hide, and WHEN the user scrolls up it SHALL reappear.
3. THE nav link of the section currently in view SHALL show an active pill that slides between links (shared layout animation).
4. A thin violet gradient scroll-progress bar SHALL sit at the very top, spring-smoothed.

## Requirement 5: Selected work as sticky stacking cards
1. WHILE the viewport is 1024px or wider THE four work panels SHALL be sticky (top ≈ 96px + 16px × index), so each new panel slides over the previous one.
2. WHILE a panel is being covered THE covered panel SHALL scale down to 0.94 and dim to 60% brightness, driven by scroll progress.
3. WHILE the viewport is under 1024px THE panels SHALL use normal reveal, not sticky.
4. WHEN the pointer hovers a panel's visual THE image or ProjectVisual SHALL scale to 1.04, and the "Explore" arrow SHALL nudge diagonally.

## Requirement 6: Grids and lists stagger
1. THE "What I build" cells, More-projects cards, Skills chips and Now-learning cards SHALL reveal with a 0.06s stagger.
2. WHEN the pointer hovers a More-projects card THE card SHALL tilt up to 4° toward the pointer, and its spotlight SHALL follow the pointer.

## Requirement 7: Timeline draws itself
1. THE Experience and Education vertical lines SHALL draw from top to bottom (scaleY 0→1) linked to scroll progress through the section.
2. WHEN the line reaches an entry THE entry's dot SHALL pop in (scale 0→1 with a soft violet ring pulse) and the entry card SHALL slide in from the right.

## Requirement 8: Micro-interactions
1. Primary buttons SHALL be magnetic (move up to 6px toward the pointer), and a light sheen SHALL sweep across them on hover.
2. Numeric stats ("3.8", "7B") SHALL count up when they enter the viewport. "Sol" stays static.
3. The Contact CTA glow SHALL slowly "breathe" (scale/opacity loop, 5s).
4. Footer "BACK TO TOP ↑" SHALL smooth-scroll to the top through Lenis.

## Requirement 9: Performance and accessibility
1. Animations SHALL use only transform, opacity and filter. Do not animate layout properties.
2. Lighthouse mobile performance SHALL stay ≥ 90, with no jank on a mid-range phone and no CLS caused by animations.
3. IF the user prefers reduced motion THEN every effect in this spec SHALL be disabled and content shown in its final state.
4. Infinite loops (shimmer, float, twinkle, breathe) SHALL pause when their element is off-screen.
