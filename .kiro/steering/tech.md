# Tech

## Stack (decided, do not swap)
- **Next.js 15** (App Router) + **TypeScript** (strict)
- **Tailwind CSS v4**
- **motion** (`motion/react`, formerly Framer Motion) for animation
- **lucide-react** for UI icons; **simple-icons** (or `react-icons/si`) for tech logos
- Fonts:
  - **Satoshi** (headings): self-host the woff2 files from Fontshare (free licence) in `public/fonts/`, loaded with `next/font/local`
  - **Inter** (body) via `next/font/google`
  - **Geist Mono** (labels, console, small caps) via `next/font/google`
- Static site: `output: 'export'` in `next.config.ts`, `images: { unoptimized: true }`. No server, no database, no API routes, no analytics, no cookies.

## Quality bar
- Lighthouse (mobile): Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95.
- Fully responsive at 360px, 768px, 1024px and 1440px. Mobile is a first-class layout, not an afterthought.
- Respect `prefers-reduced-motion`: turn off the marquee, count-ups, parallax and console typing, and show final states.
- Semantic HTML, a visible focus ring, alt text on every image, and colour contrast of at least 4.5:1 for body text.
- No layout shift from fonts or images (set width/height).
- `npm run build` must pass with zero TypeScript or ESLint errors.

## SEO
- Metadata in `app/layout.tsx`: title "Thayaananthan Kanagaraj: AI Engineer", a description built from the hero text, Open Graph and Twitter cards (OG image = `public/og.png`, generated 1200×630 from the hero), canonical URL.
- JSON-LD `Person`: name, jobTitle "AI Engineer", worksFor qBotica, alumniOf Arizona State University and Sri Ramakrishna Engineering College, sameAs GitHub and LinkedIn.
- `app/sitemap.ts` and `app/robots.ts`.

## Workflow and deployment
- Do all work on a branch named **`redesign`**. Vercel builds a preview URL for each branch push, so the live site stays untouched until merge.
- Before merging to `main`, Thayaa must set Vercel **Project Settings → Build & Deployment → Framework Preset = Next.js**, because the old site was plain static HTML.
- Delete the old static site files (`index.html`, `404.html`, `experience/`, `projects/`, `assets/css`, `assets/js`, `skills.json`) **only in the final task**, after the new site is approved. Move reusable images to `public/images/` first.
