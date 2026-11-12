# Beehive CBs Hub

A public, multi-language resource hub for Beehive contributors — onboarding, the
full guidelines, the QC spec rubric, the common-errors deck, and worked examples.
Mirrors the Nectarbloom CBs Hub's layout, rebranded to Beehive (honey/amber, dark).

Built with **Next.js (App Router, static export)** + **TypeScript** + **Tailwind v4**
+ **next-intl**. No server — it exports to static files and deploys to **GitHub Pages**.

## Local development

```bash
npm install
npm run dev     # http://localhost:3000  → redirects to /en/
```

Build the static site locally:

```bash
npm run build   # outputs ./out
npm run start   # preview ./out with `serve`
```

## Content

All page content is rendered at build time from **read-only** Markdown in
`content/source/` (verbatim copies of the canonical Beehive docs — never edit them
here; re-copy from source if they change). The original common-errors deck is kept
in `content/assets/`. Images live in `content/media/` and are copied to `public/media`
by `scripts/copy-media.mjs` (runs automatically on dev/build).

Everything the team hasn't supplied yet (onboarding video URLs, Outlier Community
link, War Room/dashboard links, QM contacts, mascot name) lives in `site.config.ts`
as clearly-marked placeholders — swap each to `{ status: 'ready', value: … }` when known.

## Deployment (GitHub Pages)

This repo ships a GitHub Actions workflow (`.github/workflows/deploy.yml`) that builds
the static export and publishes it to GitHub Pages on every push to `main`.

One-time setup in the new repo:

1. Push this project to a new GitHub repo.
2. In **Settings → Pages**, set **Source = GitHub Actions**.
3. Push to `main` (or run the workflow manually). The site publishes at
   `https://<owner>.github.io/<repo>/`.

The workflow sets `PAGES_BASE_PATH=/<repo>` automatically so assets resolve under the
project subpath. For a user/org page (`<owner>.github.io`) or a custom domain, it uses
the root path. Locally, `PAGES_BASE_PATH` is empty (served at `/`).

## Internationalisation

English (`en`) is the complete base locale. Other locales deep-merge their chrome
strings over English (`messages/<locale>.json`) and may drop translated Markdown at
`content/translations/<locale>/…`; anything missing falls back to English with a
visible `[EN]` notice. Add a locale in `site.config.ts` — no page code changes.
