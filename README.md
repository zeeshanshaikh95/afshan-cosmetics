# Afshan Cosmetics & Jewellery

A small, fast storefront for **Afshan Cosmetics & Jewellery** — premium anti-tarnish,
gold-alike jewellery and everyday beauty from Mumbai, shipped across India.

Built on the same stack as the other client storefronts in this workspace: a React + Vite
single-page app, an Express API and MongoDB, with WhatsApp enquiries and a protected admin
panel. The design, palette and copy are entirely this brand's own.

- **Live site:** https://zeeshanshaikh95.github.io/afshan-cosmetics/
- **Instagram:** [@afshan_cosmetics_mumbai](https://www.instagram.com/afshan_cosmetics_mumbai/)
- **WhatsApp:** +91 97698 36346

## What is inside

| Part | Stack | Notes |
| --- | --- | --- |
| `client/` | React 18, Vite, TypeScript, Tailwind | Storefront, cart, admin UI |
| `server/` | Express, Mongoose, TypeScript | Catalogue, settings, reviews, analytics, admin auth |
| `scripts/` | Node | Builds the static catalogue snapshot used on GitHub Pages |

Customer routes: `/` (hero slider, new in, edits, promises, feed, reviews), `/shop`,
`/category/:slug`, `/product/:slug`, `/about`, `/gallery`, `/reviews`, `/contact`.
Admin lives at `/admin` (overview, pieces, sections, reviews, feed, settings, password).

There is no checkout and no payment processing. Every order is an enquiry: the bag composes a
WhatsApp message with the pieces, options and estimated total, and the boutique confirms stock,
price and shipping personally.

## Running locally

```bash
npm install
npm run dev:db      # local MongoDB (downloaded cache, no system install needed)
npm run seed        # admin user, settings, 4 sections, 8 pieces, 6 feed images
npm run dev         # API on :4000, client on :5173
```

Copy `.env.example` to `server/.env` and adjust if you need to. The seeded admin account is in
`server/.env` (`ADMIN_EMAIL` / `ADMIN_PASSWORD`); change the password on first sign-in.

Useful scripts:

```bash
npm run typecheck      # client + server
npm run build          # client build, then server build
npm run seed:reset     # wipe catalogue records and re-seed
npm run demo:catalogue # refresh client/public/demo/catalogue.json for Pages
```

## Editing the shop

Everything customer-facing is editable in **Admin**:

- **Pieces** — names, descriptions, prices, materials, care notes, sizes/finishes, images,
  stock, bestseller/new flags, archive.
- **Sections** — the collection edges shown in the navigation (Necklaces, Earrings, Rings &
  Bracelets, Beauty & Gifting).
- **Reviews** — approve or hide customer notes before they appear.
- **Feed** — the Instagram grid on the home and gallery pages.
- **Settings** — brand name, tagline, WhatsApp number, Instagram, hero slides, announcement
  bar, about copy, shipping and exchange policies, WhatsApp message templates.

Prices are optional. Left blank, a piece shows **Price on request** rather than an invented
number — which is how the brand currently sells on Instagram.

## Deployment

The storefront deploys to GitHub Pages on every push to `main` (see
`.github/workflows/deploy-pages.yml`), using the committed `client/public/demo/catalogue.json`
snapshot. `render.yaml` describes an optional API + static web service for a full deployment
with a live database and working admin panel. Details and caveats are in
[`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md).

## Content notes

- The logo in `client/public/brand/logo.jpg` is the brand's own Instagram avatar (150×150 —
  the largest public version available). Replace it with a higher-resolution file when the
  owner supplies one.
- Product photography in `client/public/images/` is placeholder editorial imagery generated for
  this build, standing in for the boutique's own photographs. Swap in her real pictures before
  promoting the site.
- All prices are `null` in the seed until the owner shares rates.
