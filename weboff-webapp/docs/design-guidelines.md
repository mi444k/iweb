# Design Reference – Main Menu & Hero

This document distills the current implementation of the sticky header (main menu) and the hero section. Treat it as a living design reference when building future sections.

## 1. Global Foundation

| Token | Value | Usage |
| --- | --- | --- |
| `--bg` | `#000000` | Page background, header overlay base |
| `--bg-elev` | `#12221b` | Elevated surfaces (secondary button hover, cards) |
| `--brand` | `#0e6b4d` | Primary backgrounds (hero CTA, accents) |
| `--brand-2` | `#11a57d` | Hover state for brand areas |
| `--brand-3` | `#89f0c8` | Highlighted hero text |
| `--accent` | `#c7f31b` | Primary CTA background, nav hover |
| `--accent-2` | `#9eea12` | CTA hover |
| `--muted` | `rgba(255, 255, 255, 0.5)` | Secondary text |
| `--line` | `rgba(137, 240, 200, 0.15)` | Borders, subtle separators |

- Typography: Inter (variable), monospace highlights via `font-mono` for hero heading and header labels.
- Layout container: `max-w-7xl` with horizontal padding `px-4`, responsive vertical rhythm (`py-24` → `py-32`).
- Motion: Framer Motion for hero heading fade/slide; header uses Intersection Observer for active link state.

### Layout

- Component: `components/Header/Header.tsx` (client component; sticky to viewport).
- Sticky bar: `sticky top-0 z-40` with translucent background `bg-(--bg)/70` + `backdrop-blur`.
- Height: implicit via `py-3`; content horizontally spaced using `flex` with brand on left, nav center (≥ `md`), controls right.

### Brand Block

- Left-aligned link to `/` containing:
  - Logo image `40×40` (`/images/logo.webp`).
  - Wordmark text (`translations.brand`) in `text-2xl`, `font-semibold`, tracking-tight.

### Navigation Links

- Render order is fixed: Stack → Work → Services → Testimonials.
- Desktop only: `hidden md:flex`, `gap-6`, `text-sm`.
- Active-state logic: Intersection Observer calculates visible section; active link uses `text-(--accent)`, others `text-white` with hover → `text-(--accent)`.
- Anchor format: `href={#sectionId}`; ensure sections expose matching `id`s.

### CTA Cluster

- Primary CTA button (`#contact`):
  - Styles: `bg-(--accent)`, `hover:bg-(--accent-2)`, `text-black`, `rounded-full`, `px-6 py-1`, `font-mono`.
  - Copy pulled from translations (`cta`) and must stay Russian for end users.
- Language switch: `LangSwitch` with gap `8px` from button; keep consistent alignment & height with CTA.

### Interaction & Accessibility

- Header remains readable over content via blur + 70% black overlay.
- Buttons/links have 200ms color transition.
- Ensure focus outlines remain visible (inherit current defaults) for keyboard navigation.

### Structure

- File: `components/SectionHero/SectionHero.tsx` (server component).
- Section: `id="top"`, `relative overflow-hidden` with decorative background image (`hero-bg.webp`).
- Grid: `lg:grid-cols-2`, `gap-12`, vertically centered content. Secondary column currently empty (reserved for future visual).

### Typography & Content

- Heading: `motion.h1` with `text-4xl md:text-5xl/[1.2]`, `font-extrabold`, `font-mono`.
  - Text uses `RichText` to parse embedded tags: `title1` regular, `title2` wrapped in `span.block text-(--accent-2)`.
- Description paragraph: `mt-5`, `text-lg`, `text-(--muted)`, `max-w-xl`, also rendered through `RichText` (supports `<br />`, `\n`, `<bold>`, `<red>`).

### Buttons

- Primary (Portfolio):
  - Classes: `rounded-2xl px-5 py-3 bg-(--brand) hover:bg-(--brand-2) transition inline-flex items-center gap-2`.
  - Includes `ArrowRight` icon `size-4`.
- Secondary (Services):
  - Outline look: `ring-soft` border, `hover:bg-(--bg-elev)`, same padding and structure as primary but transparent background.
- Buttons sit inside `flex flex-wrap gap-3` for responsiveness.

### Supporting List

- Bullets: `ul.mt-8 flex flex-col gap-2 text-sm text-(--muted)`.
  - Each `li` uses inline icon (Shield/Wrench/Sparkles) with `size-4` and `gap-2`.

### Background Elements

- Absolutely positioned backdrop fills section; ensure `-z-10` to stay behind content.
- `TechLogosMarquee` anchored to bottom of section to reinforce expertise; stretches to viewport width.

### Motion & Responsiveness (Hero)

- Heading animates on mount (`opacity` & `x` translation) over 1 second.
- Buttons and bullet list rely on standard flex/stack patterns and wrap cleanly under 640px.
- Section padding scales (`py-24`, `md:py-28`, `lg:py-32`) to preserve breathing room.

## 4. Content & Localization Rules

- User-facing strings must remain Russian—pulled from `lib/i18n.ts` via props.
- For any copy supporting inline emphasis, wrap tokens with `<bold>…</bold>`, `<red>…</red>`, `<br />`, or `\n`; `RichText` renders them safely.
- Keep CTA verbs action-oriented and concise to match button width and font size constraints.

## 5. Reuse Checklist for New Components

1. **Container width**: align with `max-w-7xl` + `px-4` for consistency.
2. **Color tokens**: reuse CSS variables above; never hard-code new colors without design approval.
3. **Typography**: primary headings use `font-mono` for tech feel; supporting text falls back to Inter with `text-(--muted)` when secondary.
4. **Buttons**: follow hero button styles for primary/secondary contrast; preserve rounded `2xl` radius and inline-flex alignment.
5. **Motion**: subtle framer-motion transitions (≤1s) for hero-like elements; consistent easing for nav state changes.
6. **Localization**: pass translation strings through `RichText` when markup is needed; otherwise render plain text.

Document updates should reference actual component diffs to stay accurate whenever visual styles evolve.
