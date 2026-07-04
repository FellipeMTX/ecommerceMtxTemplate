<div align="center">
  <h1>ecommerceMtxTemplate</h1>
  <p>
    A modern multi-vendor e-commerce storefront template built with Next.js 15, Tailwind CSS v4 and Redux Toolkit.
  </p>
  <p>
    <img src="https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js" alt="Next.js">
    <img src="https://img.shields.io/badge/Tailwind-v4-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg?style=for-the-badge" alt="License">
  </p>
</div>

---

## Overview

`ecommerceMtxTemplate` is a reusable front-end template for building tech/gadget-style e-commerce sites. It ships a customer storefront, a vendor dashboard and an admin panel, all styled with a cohesive violet design system (Poppins + soft cards + gradient hero).

> **Note:** this is a UI template. Product, address and order data are currently mocked (`assets/assets.js` + Redux). Wire up a backend, auth and payments before production. The intended data model lives in `prisma/schema.prisma`.

## Tech Stack

- **Framework:** Next.js 15 (App Router, Turbopack)
- **Styling:** Tailwind CSS v4 (design tokens in `app/globals.css`)
- **State:** Redux Toolkit
- **Icons:** lucide-react
- **Charts:** Recharts

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Structure

```
app/(public)   # storefront (home, shop, product, cart, orders)
app/store      # vendor dashboard
app/admin      # admin panel
components/     # shared UI components
lib/            # Redux store and slices
assets/         # mock data and images
```

## Design System

The look is documented in [`DESIGN_BRIEF.md`](./DESIGN_BRIEF.md) — palette, typography, spacing, component specs and section layout. Brand tokens live under `@theme` in `app/globals.css`.

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md).

## License

MIT — see [LICENSE.md](./LICENSE.md). Based on an open-source MIT template.
