# Deployment

The storefront ships in two parts, and they can be deployed independently.

- **Storefront (client)** — a static React build. This is what is live now on GitHub Pages.
- **API (server)** — Express + MongoDB. Needed for the live admin panel and dynamic catalogue.

## 1. GitHub Pages (current live setup)

The site is published from `main` by `.github/workflows/deploy-pages.yml`:

- Live URL: <https://zeeshanshaikh95.github.io/afshan-cosmetics/>
- Repo: <https://github.com/zeeshanshaikh95/afshan-cosmetics> *(create it as `afshan-cosmetics`; the workflow derives the base path from the repository name, so any name works)*

How it builds:

- `VITE_BASE=/<repo-name>/` so assets and the router basename resolve under the project path.
- `VITE_DEMO_CATALOGUE` defaults to `true`, so the build reads the committed snapshot at
  `client/public/demo/catalogue.json`.
- `client/dist/index.html` is copied to `404.html` so deep links (`/shop`, `/product/noor-layered-chain-set`,
  `/admin`) boot the SPA instead of a GitHub 404.

After changing catalogue data locally, refresh the snapshot and push:

```bash
npm run demo:catalogue
git add client/public/demo/catalogue.json
git commit -m "Refresh catalogue snapshot"
git push
```

The snapshot currently contains the 8 seeded pieces, 4 sections, 6 feed images and 3 hero
slides. It does not change when you edit in the admin panel — the admin writes to MongoDB, which
Pages cannot reach.

To publish for the first time in a new repository:

```bash
gh repo create <owner>/afshan-cosmetics --public --source . --remote origin --push
gh api "repos/<owner>/afshan-cosmetics/pages" -X POST -f build_type=workflow
```

(`gh` on this machine wants the endpoint without a leading slash.)

## 2. Render (API + optional static site)

`render.yaml` describes two services:

| Service | Type | Purpose |
| --- | --- | --- |
| `afshan-cosmetics-api` | Node web service | Express API, serves `/api/*` |
| `afshan-cosmetics-web` | Static site | The built client, pointed at the API |

Steps:

1. Push this repo to GitHub.
2. In Render: **New → Blueprint**, pick the repo.
3. Fill the `sync: false` values on the API service:
   - `MONGODB_URI` — MongoDB Atlas connection string.
   - `ADMIN_EMAIL` / `ADMIN_PASSWORD` — first admin account (change the password after sign-in).
   - `CLIENT_ORIGIN` — the public client origin, e.g. `https://afshan-cosmetics-web.onrender.com`.
   - `PUBLIC_API_URL` — the API origin including `/api`.
4. Deploy, then run the seed once against Atlas:

   ```bash
   MONGODB_URI="<atlas uri>" npm run seed
   ```

5. Set the GitHub repository variables so the Pages build talks to the API instead of the snapshot:

   | Variable | Value |
   | --- | --- |
   | `VITE_API_URL` | `https://afshan-cosmetics-api.onrender.com/api` |
   | `VITE_DEMO_CATALOGUE` | `false` |

   Re-run the Pages workflow (or push) afterwards.

With that done, `/admin` on the live site signs in against the API and edits appear immediately.

## 3. Environment variables

See `.env.example`. The important ones:

| Name | Where | Notes |
| --- | --- | --- |
| `MONGODB_URI` | server | Atlas in production, local mongod in development |
| `JWT_SECRET` | server | Long random string; rotating it signs admins out |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` | server | Used only to bootstrap the first admin |
| `CLIENT_ORIGIN` | server | CORS allow-list for the storefront |
| `PUBLIC_API_URL` | server | Absolute URL used in the sitemap/SEO helpers |
| `VITE_API_URL` | client build | API origin including `/api` |
| `VITE_DEMO_CATALOGUE` | client build | `true` reads the committed snapshot (Pages), `false` calls the API |
| `VITE_BASE` | client build | `/<repo>/` for project Pages, `/` for a custom domain |

## 4. Known limitations of the Pages-only build

- No live admin panel — `/admin` loads but cannot reach a database.
- Enquiries are WhatsApp deep links, not server-side orders. That is intentional.
- Deep links return HTTP 404 with the SPA body (Pages serves `404.html`); browsers render it
  normally, but crawlers see the 404 status.
- Product photographs are placeholders and the logo is the 150×150 Instagram avatar. Replace
  both under `client/public/` before sharing the site with customers.
