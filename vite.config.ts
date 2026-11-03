// Copyright (c) 2026 Andrei Baranov (84softworks). All rights reserved. Published for reference only - see LICENSE.
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

const SITE_ORIGIN = 'https://84softworks.com';
// Client routes besides "/" that must survive a direct visit or a reload.
const CLIENT_ROUTES = ['products'];

/**
 * The site is plain static files and the host's SPA fallback is not configured anywhere, so a
 * direct hit on /products would 404. Each client route gets its own copy of index.html in a
 * folder of the same name — any static host serves it — with the canonical and og:url naming
 * the route itself rather than the home page.
 */
const clientRouteEntries = (): Plugin => {
  let outDir = 'dist';
  return {
    name: 'client-route-entries',
    apply: 'build',
    configResolved(config) {
      outDir = path.resolve(config.root, config.build.outDir);
    },
    async closeBundle() {
      const indexHtml = await readFile(path.join(outDir, 'index.html'), 'utf8');
      for (const route of CLIENT_ROUTES) {
        const routeUrl = `${SITE_ORIGIN}/${route}`;
        const routeHtml = indexHtml
          .replace(`<link rel="canonical" href="${SITE_ORIGIN}/" />`, `<link rel="canonical" href="${routeUrl}" />`)
          .replace(`<meta property="og:url" content="${SITE_ORIGIN}/" />`, `<meta property="og:url" content="${routeUrl}" />`);
        if (!routeHtml.includes(routeUrl)) {
          // The tags in index.html changed shape — the copy would claim to be the home page.
          this.warn(`canonical/og:url not rewritten for /${route}`);
        }
        await mkdir(path.join(outDir, route), { recursive: true });
        await writeFile(path.join(outDir, route, 'index.html'), routeHtml);
      }
    }
  };
};

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), clientRouteEntries()]
});
