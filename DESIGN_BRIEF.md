# Design Brief — "Gadgets" Tech E-commerce

A design system for a modern, multi-vendor tech/gadgets e-commerce storefront. Clean, trustworthy, product-forward. Inspired by the Blocksy "Gadgets" aesthetic: generous white space, a deep-violet brand, soft shadows and rounded cards, with a dark→violet gradient used for hero and feature moments.

Use this brief to spin up a new design project (Figma, a landing page, a design-system doc, or a fresh UI kit). Everything below is concrete and ready to implement.

---

## 1. Brand & Mood

- **Personality:** modern, precise, friendly-premium. Think Apple-store calm meets startup energy.
- **Feeling to evoke:** trust, speed, "the latest tech, curated for you."
- **Do:** lots of breathing room, one confident accent color, crisp product photography on light surfaces.
- **Avoid:** loud gradients everywhere, clutter, more than one accent competing with violet, hard drop shadows.

---

## 2. Color Palette

| Role | Name | Hex | Usage |
|------|------|-----|-------|
| Brand primary | `brand` | `#5B38ED` | buttons, links, price, active states, icons |
| Brand dark | `brand-dark` | `#4928CF` | hover states, gradient end |
| Brand tint | `brand-tint` | `#EFEBFD` | soft violet backgrounds, chips, hover fills |
| Ink | `ink` | `#111518` | headings, dark gradient start, high-emphasis text |
| Muted | `muted` | `#4D5D6D` | body copy, secondary text |
| Line | `line` | `#E7EBEE` | borders, dividers, empty rating stars |
| Surface | `surface` | `#F3F5F7` | section backgrounds, image tiles |
| Surface 2 | `surface-2` | `#FBFBFC` | card backgrounds |
| White | `white` | `#FFFFFF` | page background, cards on color |

**Accent colors** (use sparingly — one per element, never together):
- Pink `#F00069` · Gold `#FFC750` (rating stars) · Teal `#09917F`

**Signature gradient** (hero, newsletter, category tiles):
`linear-gradient(135deg, #111518 0%, #4928CF 60%, #5B38ED 100%)` — dark ink into violet.

---

## 3. Typography

- **Typeface:** **Poppins** (Google Fonts). Weights: 400 / 500 / 600 / 700.
- **Headings:** 600–700, color `ink`, tight leading (~1.15).
- **Body:** 400, color `muted`, comfortable leading (~1.6).
- **Numbers/price:** 600, color `brand`.

| Token | Size (desktop) | Weight | Use |
|-------|----------------|--------|-----|
| Display / H1 | 48px (`text-5xl`) | 700 | hero headline |
| H2 | 30px (`text-3xl`) | 600 | section titles |
| H3 | 20px (`text-xl`) | 600 | card / tile titles |
| Body | 14–16px | 400 | paragraphs |
| Small / meta | 12–13px | 400–500 | ratings count, labels, footer |

---

## 4. Spacing, Radius, Shadows

- **Container:** max-width 1280px (`max-w-7xl`) for header/hero/footer; 1152px (`max-w-6xl`) for content sections. Horizontal page padding 24px (`mx-6`).
- **Section rhythm:** ~96–112px vertical spacing between major sections.
- **Radius scale:** cards 16px (`rounded-2xl`), hero/panels 24px (`rounded-3xl`), buttons & chips fully rounded (`rounded-full`), inputs pill or 8px.
- **Shadows (soft, colored, low-opacity):**
  - Card lift: `0px 30px 80px -30px rgba(193,199,212,0.4)`
  - Button/badge: `0px 12px 30px -14px rgba(93,84,140,0.25)`
- **Borders:** 1px `line` on light cards; use border + soft shadow together, never heavy borders.

---

## 5. Core Components

### Buttons
- **Primary:** bg `brand`, white text, `rounded-full`, padding ~`12px 28px`, hover → `brand-dark`, subtle `scale(1.03)` and soft shadow. Active `scale(0.95)`.
- **On-dark primary:** white bg, `ink` text, hover → `brand-tint`.
- **Ghost/link:** `brand` text with a trailing arrow that nudges right on hover.

### Product Card
- White card, 1px `line` border, `rounded-2xl`, 12px padding.
- Image sits on a `surface` tile (`rounded-xl`), product centered, **scales to 1.10 on hover**.
- A circular **Add-to-cart** button (`brand`, cart icon) floats bottom-right of the image, hidden until card hover (fade + slide up).
- Below image: gold star rating + `(n)` count, product name (`ink`, medium), price (`brand`, semibold).
- Whole card lifts with the soft shadow and a faint `brand` border on hover.

### Category Tile
- Gradient background (ink→violet or an accent duo), white text, `rounded-2xl`, ~176px tall.
- Icon top-left, name + one-line tagline bottom-left, arrow that appears top-right on hover.

### Badges / Chips
- Pill shape. Announcement badge uses `brand` fill; category chips use `surface` + `line`, hover fills `brand`.

### Inputs
- Pill or 8px radius, `surface` fill, 1px `line` border, focus ring `brand/40`. On dark panels: translucent white (`white/10`) with `white/20` border.

### Navbar
- Sticky, white, thin `line` bottom border. Wordmark left (lowercase name + violet dot). Center/right text menu (Home · Products · About · Blog · Contact). Pill search (`surface`), cart icon with `brand` count bubble, primary "Login" button.

### Announcement Bar
- Full-width, thin, ink→violet gradient, white centered text, "Claim offer" white pill on the right, dismissible.

### Footer
- White, `line` top border. Left: wordmark + short blurb + social icons (round `surface` buttons that fill `brand-tint` on hover). Right: 3 link columns (Products / Company / Contact). Thin copyright row.

---

## 6. Homepage Section Order

1. **Announcement bar** — free shipping / first-order discount.
2. **Navbar** (sticky).
3. **Hero** — split layout: large gradient feature card (badge → bold headline → "starting from" price → white "Shop Now" button, product image bleeding off bottom-right) + two stacked promo cards ("Best sellers", "20% discounts").
4. **Category marquee** — auto-scrolling pill chips (pause on hover).
5. **Shop by category** — 4 gradient tiles (Phones · Laptops · Gaming · Audio).
6. **Latest products** — centered title + 4-up product card grid.
7. **Best selling** — centered title + 8-up product card grid.
8. **Why shop with us** — 3 feature cards (Free Shipping · Easy Returns · 24/7 Support) with colored icon chips, lift on hover.
9. **Newsletter** — full-width gradient panel, "Don't miss our news", pill email input + white subscribe button.
10. **Footer.**

---

## 7. Motion & Interaction

- Transitions 200–300ms, ease-out. Reserve motion for hover/enter, not idle.
- Product image `scale(1.10)` on card hover; card translates up a few px.
- Buttons: `scale(1.03)` hover / `scale(0.95)` active.
- Arrows nudge right (`translate-x`) on hover.
- Marquee: continuous linear scroll, pauses on hover.
- Respect `prefers-reduced-motion` (disable transforms/scroll animations).

---

## 8. Imagery

- Product shots: real hardware, centered, on light `surface` tiles or transparent PNGs. Consistent scale and lighting.
- Hero product image bleeds off the card edge for depth.
- No stock-photo people in the core storefront; keep it product-first.

---

## 9. Accessibility

- Body text `muted` on white passes AA; never put `muted` on `surface` for long text — use `ink`.
- White text only on `brand`/`brand-dark`/`ink` (or the gradient), never on `brand-tint`.
- Focus-visible rings on all interactive elements (`brand/40`).
- Rating stars: pair color with the numeric `(n)` count so rating isn't color-only.

---

## 10. One-paragraph prompt (paste into a design tool / Claude)

> Design a modern multi-vendor **tech-gadgets e-commerce** storefront. Typeface **Poppins**. Brand color deep violet **#5B38ED** (hover **#4928CF**), on a clean white/light-gray palette (surfaces **#F3F5F7 / #FBFBFC**, borders **#E7EBEE**, headings **#111518**, body **#4D5D6D**). Rounded cards (16–24px), pill buttons, soft low-opacity violet-gray shadows, generous white space. Use a signature dark→violet gradient (ink #111518 → #5B38ED) for the hero, category tiles, and newsletter. Product cards: image on a light tile that scales on hover, a floating circular violet add-to-cart button, gold star rating, violet price. Homepage: announcement bar → sticky navbar → split gradient hero → category marquee → 4 gradient category tiles → latest products grid → best sellers grid → 3 feature cards → gradient newsletter panel → footer. Mood: precise, premium, trustworthy, product-first.

---

*Reference aesthetic: Blocksy "Gadgets" demo. This brief is the design system implemented in the **ecommerceMtxTemplate** Next.js + Tailwind v4 codebase — tokens live in `app/globals.css` under `@theme`.*
