# 84softworks-landing

Organization business-card site for **84softworks** — legitimacy, project
portfolio, hiring and founder socials.

Stack: React 19 + TypeScript + Vite 6, `react-router-dom` v7. Architecture
mirrors `modus2.0/m2/panic-web-interface` (token-driven CSS under `src/styles`,
`pages/` + `routes/` split), minus the auth/API layer — this is a static
landing with no backend yet.

## Scripts

- `npm run dev` — dev server
- `npm run build` — typecheck + production build
- `npm run lint` — ESLint
- `npm run preview` — preview a production build
