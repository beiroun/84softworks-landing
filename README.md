# 84softworks Landing

The website of [84softworks](https://84softworks.com) - an engineering studio
building reliable B2B software, founded by Andrei Baranov. One page in English
and Russian: the founder, the flagship case, the products in development, the
track record and hiring. Fully static - no backend, no API calls, no external
requests.

---

## Sections

| Section | What it shows |
|---|---|
| Hero | the headline, the lede and four metrics over an animated dot field; on mobile the hero wordmark morphs into the header |
| Founder | who builds this: bio and social links |
| Flagship | FusionDynamics - SenseFlow (AI analytics core) and TLDR Messenger, with screenshot galleries |
| Products | ThunderVox - the product in development: console screenshots, deployment status, links to its source and licence |
| Track record | facts and figures |
| Join | hiring note and the contact menu: copy the address, open in Gmail or in the mail client |

Every display string lives in `src/i18n/dict.ts`, one object per language; the
EN/RU switch is in the header. The navigation follows the scroll (scroll-spy),
anchors scroll smoothly.

## Stack

| | |
|---|---|
| Language | TypeScript 5.8, strict |
| UI | React 19, plain CSS with design tokens (`src/styles`) |
| Routing | React Router 7 (`createBrowserRouter`): one route, everything else redirects to `/` |
| Scrolling | Lenis (smooth scroll), a scroll-spy for the navigation, a header that morphs out of the hero wordmark |
| Build | Vite 6, Node 24 LTS |
| Lint / format | ESLint 9 (flat config), Prettier |

Conventions: functional components and hooks, token-driven CSS (`tokens.css` →
`base.css` → `home.css`, imported in that order by `index.css`), comments in
English.

## Structure (`src/`)

```
i18n/           dict.ts (EN + RU copy), LangContext (current language)
pages/Home/     Home.tsx (the sections), HeroField + heroFieldEngine (animated dot field),
                ProductTile + CaseGallery + productCases.ts (screenshot tiles and the lightbox),
                ContactMenu + contacts.ts, LanguageToggle, useHeaderMorph, useScrollSpy
routes/         createBrowserRouter, a single route
styles/         tokens.css (colors, type, spacing), base.css (reset, @font-face), home.css (sections)
smoothScroll.ts Lenis setup
```

## Public assets

- **Icons** - `favicon.ico` (BMP 16/32/48), PNG 16/32/96, `apple-touch-icon.png`
  180, maskable 192/512, `site.webmanifest`, `og-image.png` 1200×630 for link
  previews. The art and its generator live in the 84softworks design library,
  outside this repository; bump `?v=` in `index.html` when the art changes.
- **Fonts** - self-hosted in `public/fonts`, preloaded in `index.html`, no CDN.
  Onest for the body (SIL Open Font License 1.1, Latin / Latin-extended /
  Cyrillic subsets, licence text in `public/fonts/OFL-Onest.txt`); Clash Display
  for the two wordmarks (Indian Type Foundry via Fontshare, ITF Free Font
  License - see `NOTICE`).
- **Metadata** - `index.html` carries the description, canonical, Open Graph and
  Twitter card tags; `public/sitemap.xml` and the manifest name the site. The
  absolute addresses name `84softworks.com` - change them together when the site
  lives on another name.
- **Screenshots** - `public/cases/`, product screens with customer data blurred.

## Local development

```bash
npm install
npm run dev          # http://localhost:5173
```

| Script | What it does |
|---|---|
| `npm run dev` | Vite dev server |
| `npm run build` | `tsc -b` then `vite build` → `dist/` |
| `npm run build:dev` / `build:prod` | the same with an explicit Vite mode |
| `npm run lint` | ESLint |
| `npm run preview` | serve a production build locally |

## Deploy

The site is fully static: `npm run build` produces `dist/`, which is uploaded
to the host as-is. There is no server-side code.

## License

Proprietary - copyright (c) 2026 Andrei Baranov (84softworks), all rights
reserved. The code is published for reference only, so that it can be read and
reviewed; no license to use, copy, modify, publish or host it is granted - see
[`LICENSE`](LICENSE). Third-party components and fonts keep their own licenses,
and the 84softworks name and marks, the founder photo and the product
screenshots are brand assets - see [`NOTICE`](NOTICE).
