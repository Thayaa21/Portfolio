# Requirements: Portfolio redesign

## Introduction
Rebuild Thayaa's portfolio as a Next.js static site that mixes three Framer templates: Reflex's visual style, Portfon's portfolio patterns and Danie's resume patterns. All copy comes from `.kiro/steering/content.md`. The content rules in `.kiro/steering/product.md` are absolute.

## Requirement 1: Content integrity
**User story:** As Thayaa, I want the site to say only true things, so that nothing on it can hurt me in an interview or a background check.
1. THE site SHALL render only text and data defined in `content/site.ts`, which mirrors `steering/content.md`.
2. THE site SHALL NOT show any metric, percentage or outcome for qBotica work.
3. THE site SHALL NOT show testimonials, client logos, pricing, services-for-hire, FAQ, blog or newsletter sections.
4. WHEN a project has `visible: false` THE site SHALL NOT render it anywhere, including in the sitemap or metadata.
5. THE site SHALL show GPU/CUDA/HIP/C++ systems topics only in the "Now learning" section and the "Learning now" badge.

## Requirement 2: First screen
**User story:** As a recruiter, I want to know within 5 seconds who he is, what he builds and how to reach him.
1. WHEN the page loads on a 360px or wider viewport THE hero SHALL show the H1, subhead, primary CTA and announcement pill without scrolling.
2. THE nav SHALL stay visible (sticky, glass blur) and contain the section links, "Download CV" and "Get in touch".
3. WHILE the viewport is under 768px THE nav SHALL collapse into a menu button that opens a full-screen glass sheet with the links.
4. IF `public/resume.pdf` does not exist at build time THEN the site SHALL hide every "Download CV" button.

## Requirement 3: Hero agent console
**User story:** As a visitor, I want a live-feeling demo that hints at what he builds.
1. WHEN the console scrolls into view THE input text SHALL type itself in, then the 4 steps SHALL appear one after another with check marks, and the last step SHALL keep a spinner.
2. WHILE the console is visible THE mono timer SHALL count up in tenths of a second.
3. IF the user prefers reduced motion THEN the console SHALL render in its final state with no typing or timer.

## Requirement 4: Work showcase
**User story:** As a hiring manager, I want to see his strongest work first, in depth.
1. THE "Selected work" section SHALL render 4 large numbered cards (01–04) in the order given in content.
2. WHEN a card has a repo link THE card SHALL show an "Explore" pill button that opens the repo in a new tab.
3. WHEN a card has no image THE card SHALL render a `ProjectVisual` in its configured mode (pipeline, cluster or graph) instead of an empty frame.
4. THE "More projects" grid SHALL render the remaining visible projects as glass cards with a GitHub link.

## Requirement 5: Resume sections
1. THE Experience and Education sections SHALL use the Danie timeline: a mono label column, a vertical line with a dot per entry, and entries inside a card.
2. EACH entry SHALL show organisation, title, dates, location and its bullets exactly as in content.
3. THE Skills section SHALL show the 4 groups with an icon per skill and fall back to a generic icon if one is missing.

## Requirement 6: Motion and feel
1. WHEN a section enters the viewport THE section SHALL fade and rise in (opacity 0→1, y 24→0, 0.6s, ease-out), with children staggered by 0.06s. This happens once, not on every scroll.
2. THE tech marquee SHALL loop seamlessly and pause on hover.
3. WHEN the pointer hovers a glass card THE card SHALL show a violet radial highlight that follows the pointer, and its border SHALL brighten.
4. IF the user prefers reduced motion THEN all looping, typing, count-up and parallax motion SHALL be turned off.

## Requirement 7: Quality
1. THE production build SHALL pass `next build` with zero type or lint errors and export a fully static site.
2. THE site SHALL meet the Lighthouse targets in `steering/tech.md`.
3. THE site SHALL include metadata, Open Graph, JSON-LD Person, a sitemap, robots.txt and a styled 404.
4. THE site SHALL have no horizontal scroll at any width from 360px to 1920px.
