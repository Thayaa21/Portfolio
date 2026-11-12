# Design: Portfolio redesign

These tokens were measured from the live Framer templates (computed styles), so use them as given.

## 1. Design tokens (Tailwind v4 `@theme` in `app/globals.css`)

### Colour (from Reflex)
| Token | Value | Use |
|---|---|---|
| `--bg` | `#040014` | page background |
| `--surface` | `rgba(255,255,255,0.03)` | glass cards |
| `--surface-2` | `rgba(255,255,255,0.075)` | hover / raised |
| `--surface-solid` | `rgba(13,10,31,0.92)` | nav sheet, console body |
| `--border` | `rgba(255,255,255,0.08)` | default 1px borders |
| `--border-strong` | `rgba(255,255,255,0.12)` | hover borders |
| `--border-accent` | `rgba(201,190,255,0.45)` | primary button, active pill |
| `--text` | `#FFFFFF` | headings |
| `--text-2` | `#F4F0FF` | body |
| `--text-muted` | `rgba(244,240,255,0.6)` | secondary |
| `--accent` | `#7C5CFF` | primary violet |
| `--accent-2` | `#8A72FF` | glows |
| `--accent-soft` | `#DCD2FF` | light violet text and chips |
| `--success` | `#4ADE9B` | "running" / status dots |
| `--grad-text` | `linear-gradient(90deg,#F6CFFF 0%,#D3C4FF 50%,#BCD3FF 100%)` | gradient words |
| `--grad-button` | `linear-gradient(180deg, rgba(113,64,255,.16), rgba(84,34,196,.42))` | primary button fill |

### Effects
- Glass card: `background: var(--surface); border: 1px solid var(--border); backdrop-filter: blur(12px); box-shadow: inset 0 0 12px rgba(255,255,255,.06), inset 0 1px 0 rgba(255,255,255,.06);`
- Primary button: `--grad-button` fill, border `--border-accent`, `box-shadow: inset 0 0 12px rgba(194,178,255,.28), inset 0 1px 0 rgba(255,255,255,.14), 0 0 20px rgba(124,92,255,.16);`
- Section glow: `radial-gradient(40% 55% at 50% 22%, rgba(138,114,255,.12), transparent)`
- Status dot glow: `box-shadow: 0 0 10px 1px rgba(74,222,155,.7)`
- Nav: `rgba(13,10,31,0.72)` + `backdrop-filter: blur(16px)`, bottom border `--border`.
- A subtle star/noise layer on the page background (CSS radial dots or a tiny tiled SVG, opacity ≤ 0.35).

### Radius
pill `99px` · button `14px` · card `22px` · large card / section panel `32px` · small chip `8px`

### Typography
| Role | Font | Size (desktop / mobile) | Weight | Letter-spacing |
|---|---|---|---|---|
| H1 | Satoshi | 64 / 40px, line-height 1.05 | 500 | -0.035em |
| H2 | Satoshi | 42 / 30px | 500 | -0.028em |
| H3 | Satoshi | 24 / 20px | 500 | -0.02em |
| Body | Inter | 17 / 16px, line-height 1.6 | 400 | -0.01em |
| Label / eyebrow | Geist Mono | 12–13px, UPPERCASE | 500 | 0.08em |
| Big stat | Satoshi | 56px | 500 | -0.03em |
| Giant background word (Portfon) | Satoshi | clamp(96px, 18vw, 240px) | 800 | -0.02em; fill = vertical gradient from rgba(255,255,255,.10) to transparent |

Max content width: 1200px; gutters 24px mobile, 40px desktop; section padding 120px desktop / 80px mobile.

## 2. Page composition (top to bottom)

1. **Background** (fixed): `--bg`, star/noise layer, and one large violet glow behind the hero.
2. **Nav** (Reflex): logo left, links centre, CV and contact buttons right; glass sheet on mobile.
3. **Hero** (Reflex): centred announcement pill, H1 with "outside the demo" in gradient text, subhead, 2 buttons, mono line. Below it sits a **glowing arc**: a large half-ellipse built from layered `radial-gradient`s and `conic-gradient` with a white-violet rim and blur, rising behind the **AgentConsole** card, which overlaps the arc's bottom edge the way Reflex's console overlaps its arc.
   - AgentConsole: glass solid card, 3 traffic-light dots, title "thayaa.agent", green "● running" chip on the right, input row with a sparkle icon, then the steps list in Geist Mono. Max width 760px.
4. **Tech marquee** (Danie): mono caption, then 2 duplicated rows of logo + name in `--text-muted`, gradient fade masks on both edges.
5. **About** (Portfon): two columns on desktop. Left: the giant faded word "ENGINEER" sits behind an **arch portrait** (border-radius `999px 999px 32px 32px`, violet → transparent gradient behind the photo). Right: eyebrow, paragraphs, then a 3-up row of fact cards and the tag card. On mobile the word scales down and sits above the portrait.
6. **What I build** (Reflex): H2 "What I build", plus a 3×2 bordered grid (cells share 1px borders like Reflex's 8-item grid). Each cell has a 36px rounded-square icon tile, a title and one line. The GPU cell carries a "Learning now" pill.
7. **Selected work** (Portfon): eyebrow "Selected work", H2 "Work that shipped, and why it holds up." Four large glass panels (radius 32px, padding 40px). Each panel: title top-left, the big number top-right in faded Satoshi (like Portfon's "01"), description and chips bottom-left, "Explore →" pill (button with a round arrow circle on the right, as in Portfon) and a visual on the right (image or `ProjectVisual`). Text and visual alternate sides on desktop and stack on mobile.
   - `ProjectVisual` modes are pure SVG and CSS on a dark glass tile, each animated subtly:
     - `pipeline`: 4 nodes connected by lines, with a pulse travelling along them.
     - `cluster`: a 6×4 grid of dots lighting up in waves.
     - `graph`: about 12 nodes with edges, gently drifting.
8. **More projects** (Reflex): a glass card grid with an image thumbnail on top (if any), title, line, chips and a GitHub icon link.
9. **Experience + Education** (Danie): left column is a mono label in a small bordered box ("+ EXPERIENCE"), with a vertical 1px line running down and a dot per entry. The right column holds a glass card with the entries stacked: date line in Geist Mono (uppercase), org and title in mono caps, bullets in Inter. Education uses the same component.
10. **Skills** (Danie grid inside a Reflex card): 4 groups, each a row of chips with a 20px logo + name.
11. **Now learning**: 4 small glass cards, each with a violet top border glow and a "Learning" pill.
12. **Contact CTA** (Reflex closing): a big rounded panel with a radial violet glow from the bottom, the H2 centred, and 2 buttons.
13. **Footer** (Danie): link columns, socials, bottom row with the status pill and "BACK TO TOP ↑".

## 3. Motion (motion/react)
- `Reveal` wrapper: `initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true, margin:"-80px"}} transition={{duration:0.6, ease:[0.22,1,0.36,1]}}`, with children staggered by 0.06s.
- Hero entrance: pill → H1 (word-by-word, stagger 0.04s) → subhead → buttons → arc fades and scales from 0.96 → console rises in.
- AgentConsole: typing at about 28ms per character, then each step after 600ms with a check-mark draw; the timer uses `requestAnimationFrame`.
- Cards: a pointer-follow radial highlight (CSS vars `--mx`, `--my` set on `pointermove`), and on hover the border goes to `--border-strong` and the card lifts `translateY(-2px)`.
- Marquee: CSS keyframes, 40s linear infinite, paused on hover.
- Giant word: slight parallax (`useScroll` → y −40px to 40px).
- Every effect is gated behind `useReducedMotion()`.

## 4. Data model (`lib/types.ts`)
```ts
type Link = { label: string; href: string };
type Project = {
  slug: string; title: string; label?: string; description: string;
  chips: string[]; href?: string; image?: string;
  visual?: 'pipeline' | 'cluster' | 'graph';
  featured?: boolean; number?: string; visible: boolean;
};
type TimelineEntry = { org: string; title: string; dates: string; location: string; bullets: string[]; image?: string };
type SkillGroup = { name: string; skills: { name: string; icon: string }[] };
```

## 5. Accessibility notes
- The console is decorative: wrap it with `aria-hidden`, and give screen readers a short `sr-only` sentence describing it.
- The marquee duplicate row gets `aria-hidden`.
- Gradient text keeps a solid `color` fallback.
- All interactive elements have a `:focus-visible` ring of 2px `--accent-soft`.
