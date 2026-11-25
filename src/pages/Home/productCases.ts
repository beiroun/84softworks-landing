// Copyright (c) 2026 Andrei Baranov (84softworks). All rights reserved. Published for reference only - see LICENSE.
/**
 * Product screenshots and the product catalog. Copy (headings, blurbs, statuses, link labels)
 * lives in the i18n dictionary; this file holds only the language-invariant resources: images,
 * screen names and public links.
 *
 * Home tiles pair with the dictionary by index — flagship: [0] SenseFlow, [1] TLDR;
 * ThunderVox: [0] console, [1] integration. The /products page pairs by product id.
 *
 * One shot per screen, ordered by what tells a buyer most; the first shot is the tile cover and
 * is always a dark screen (it stands out on the white page).
 * Customer personal data is blurred on the files themselves; a swapped file under /public/cases
 * needs only a new SHOTS_VERSION.
 * View labels are English-only (technical screen names) — localize if needed.
 */

/**
 * Bumped with every new set of shots. The files keep their names, and the browser and Cloudflare keep a cached
 * image for hours, so without a new address a retaken shot would not show up until that expires.
 */
const SHOTS_VERSION = '2026-11-25';
const shot = (name: string) => `/cases/${name}.png?v=${SHOTS_VERSION}`;

export interface CaseShot {
  /** absolute path under /public */
  src: string;
  /** short screen name shown in the gallery header, e.g. "Call log" */
  view: string;
}

export interface ProductCase {
  /** short product label for the gallery header */
  name: string;
  /** tile cover — one of the shots, or a dedicated hero */
  hero: string;
  shots: CaseShot[];
}

const senseflowCase: ProductCase = {
  name: 'SenseFlow',
  hero: shot('sf-calls'),
  shots: [
    { src: shot('sf-calls'), view: 'Call log' },
    { src: shot('sf-ai-report'), view: 'AI weekly report' },
    { src: shot('sf-chat-card'), view: 'Chat card' },
    { src: shot('sf-chat-analysis'), view: 'Chat analysis' },
    { src: shot('sf-summary'), view: 'Call processing' },
    { src: shot('sf-queues'), view: 'Task queues' }
  ]
};

const tldrCase: ProductCase = {
  name: 'TLDR',
  hero: shot('tldr-workspace'),
  shots: [
    { src: shot('tldr-workspace'), view: 'Operator workspace' },
    { src: shot('tldr-mobile'), view: 'Client app' },
    { src: shot('tldr-stats'), view: 'Chat statistics' },
    { src: shot('tldr-reports'), view: 'Operator reports' }
  ]
};

// ThunderVox: the live operator console in a browser window, English UI, light and dark themes.
const thundervoxConsoleCase: ProductCase = {
  name: 'ThunderVox Console',
  hero: shot('tvx-dashboard'),
  shots: [
    { src: shot('tvx-dashboard'), view: 'Dashboard' },
    { src: shot('tvx-sip-numbers'), view: 'SIP numbers' },
    { src: shot('tvx-events'), view: 'Event log' },
    { src: shot('tvx-audit'), view: 'Audit trail' }
  ]
};

const thundervoxIntegrationCase: ProductCase = {
  name: 'ThunderVox Integration',
  hero: shot('tvx-integration'),
  shots: [
    { src: shot('tvx-integration'), view: 'Service API and endpoints' },
    { src: shot('tvx-wake-push'), view: 'Wake push contract' }
  ]
};

// The /products card shows ThunderVox as one product: console and integration in one gallery.
const thundervoxCase: ProductCase = {
  name: 'ThunderVox',
  hero: thundervoxConsoleCase.hero,
  shots: [...thundervoxConsoleCase.shots, ...thundervoxIntegrationCase.shots]
};

const pathfinderCase: ProductCase = {
  name: 'Pathfinder',
  hero: shot('pf-qr-card'),
  shots: [
    { src: shot('pf-qr-card'), view: 'QR code card' },
    { src: shot('pf-stats'), view: 'Scan statistics' },
    { src: shot('pf-stats-breakdown'), view: 'Devices, destinations and codes' },
    { src: shot('pf-qr-codes'), view: 'QR codes' },
    { src: shot('pf-about'), view: 'About and licence' }
  ]
};

export const flagshipCases: ProductCase[] = [senseflowCase, tldrCase];

export const thundervoxCases: ProductCase[] = [thundervoxConsoleCase, thundervoxIntegrationCase];

export type ProductId = 'senseflow' | 'tldr' | 'thundervox' | 'pathfinder';

/** A card of the /products page; its copy is dict `products.cards[id]`. */
export interface CatalogProduct {
  id: ProductId;
  case_: ProductCase;
  /** public source repository, for the open-source products */
  sourceUrl?: string;
  licenseUrl?: string;
}

export const productCatalog: CatalogProduct[] = [
  { id: 'senseflow', case_: senseflowCase },
  { id: 'tldr', case_: tldrCase },
  {
    id: 'thundervox',
    case_: thundervoxCase,
    sourceUrl: 'https://github.com/beiroun/thundervox',
    licenseUrl: 'https://github.com/beiroun/thundervox/blob/release/LICENSE'
  },
  {
    id: 'pathfinder',
    case_: pathfinderCase,
    sourceUrl: 'https://github.com/beiroun/pathfinder',
    licenseUrl: 'https://github.com/beiroun/pathfinder/blob/release/LICENSE'
  }
];
