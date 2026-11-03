// Copyright (c) 2026 Andrei Baranov (84softworks). All rights reserved. Published for reference only - see LICENSE.
/**
 * Product screenshots and the product catalog. Copy (headings, blurbs, statuses, link labels)
 * lives in the i18n dictionary; this file holds only the language-invariant resources: images,
 * screen names and public links.
 *
 * Home tiles pair with the dictionary by index — flagship: [0] SenseFlow, [1] TLDR;
 * ThunderVox: [0] console, [1] integration. The /products page pairs by product id.
 *
 * One shot per screen, each in the theme it reads best in; the first shot is the tile cover —
 * a dark screen by default (it stands out on the white page), unless Andrei picked another.
 * Customer personal data is blurred on the files themselves, so a swapped file under
 * /public/cases needs no code change.
 * View labels are English-only (technical screen names) — localize if needed.
 */

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
  hero: '/cases/sf-calls.png',
  shots: [
    { src: '/cases/sf-calls.png', view: 'Call log' },
    { src: '/cases/sf-ai-report.png', view: 'AI weekly report' },
    { src: '/cases/sf-summary.png', view: 'Call processing' },
    { src: '/cases/sf-call-card.png', view: 'Call card and transcript' },
    { src: '/cases/sf-queues.png', view: 'Task queues' },
    { src: '/cases/sf-chat-bot.png', view: 'Chat bot' }
  ]
};

const tldrCase: ProductCase = {
  name: 'TLDR',
  hero: '/cases/tldr-oper-list.png',
  shots: [
    { src: '/cases/tldr-oper-list.png', view: 'Operator workspace' },
    { src: '/cases/tldr-oper-stats.png', view: 'Operator stats' },
    { src: '/cases/tldr-oper-report.png', view: 'Operator report' },
    { src: '/cases/tldr-mobile.png', view: 'Client app' }
  ]
};

// ThunderVox: the live operator console in a browser window, English UI, light and dark themes.
const thundervoxConsoleCase: ProductCase = {
  name: 'ThunderVox Console',
  hero: '/cases/tvx-audit.png',
  shots: [
    { src: '/cases/tvx-audit.png', view: 'Audit trail' },
    { src: '/cases/tvx-dashboard.png', view: 'Dashboard' },
    { src: '/cases/tvx-sip-numbers.png', view: 'SIP numbers' },
    { src: '/cases/tvx-console-users.png', view: 'Console users and roles' },
    { src: '/cases/tvx-events.png', view: 'Event log' }
  ]
};

const thundervoxIntegrationCase: ProductCase = {
  name: 'ThunderVox Integration',
  hero: '/cases/tvx-integration.png',
  shots: [
    { src: '/cases/tvx-integration.png', view: 'Service API and endpoints' },
    { src: '/cases/tvx-wake-push.png', view: 'Wake push contract' },
    { src: '/cases/tvx-about.png', view: 'About and licence' }
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
  hero: '/cases/pf-qr-card.png',
  shots: [
    { src: '/cases/pf-qr-card.png', view: 'QR code card' },
    { src: '/cases/pf-qr-codes.png', view: 'QR codes' },
    { src: '/cases/pf-stats.png', view: 'Scan statistics' },
    { src: '/cases/pf-stats-breakdown.png', view: 'Codes and scan hours' },
    { src: '/cases/pf-about.png', view: 'About and licence' }
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
