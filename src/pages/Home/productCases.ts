// Copyright (c) 2026 Andrei Baranov (84softworks). All rights reserved. Published for reference only - see LICENSE.
/**
 * Product screenshots grouped per product: the flagship case studies and the own product.
 * Copy (tile heading + blurb) lives in the i18n dictionary; this file holds only the
 * language-invariant image resources. Order matches the dictionary tiles —
 * flagship: [0] SenseFlow, [1] TLDR; ThunderVox: [0] console, [1] integration.
 *
 * The screenshots are used as-is and anonymized on the source files; swapping a file in
 * /public/cases keeps the same path, so no code change is needed after redaction.
 * View labels are English-only for now (technical screen names) — localize if needed.
 */

export interface CaseShot {
  /** absolute path under /public */
  src: string;
  /** short screen name shown in the gallery header, e.g. "Call analytics" */
  view: string;
}

export interface ProductCase {
  /** short product label for the gallery header */
  name: string;
  /** tile cover — one of the shots, or a dedicated hero */
  hero: string;
  shots: CaseShot[];
}

export const flagshipCases: ProductCase[] = [
  {
    name: 'SenseFlow',
    hero: '/cases/sf-calls.png',
    shots: [
      { src: '/cases/sf-calls.png', view: 'Call analytics' },
      { src: '/cases/sf-analysis-call.png', view: 'AI analysis' },
      { src: '/cases/sf-chats.png', view: 'Chat analytics' },
      { src: '/cases/sf-week-report.png', view: 'AI report' }
    ]
  },
  {
    name: 'TLDR',
    hero: '/cases/tldr-oper-list.png',
    shots: [
      { src: '/cases/tldr-oper-list.png', view: 'Operator workspace' },
      { src: '/cases/tldr-oper-stats.png', view: 'Operator stats' },
      { src: '/cases/tldr-oper-report.png', view: 'Operator report' },
      { src: '/cases/tldr-mobile.png', view: 'Client app' }
    ]
  }
];

/**
 * The own product: the live operator console in a browser window, framed like the flagship
 * shots (English UI, light and dark themes). Stand addresses, the administrator login and
 * external ids are blurred on the files.
 */
export const thundervoxCases: ProductCase[] = [
  {
    name: 'ThunderVox Console',
    hero: '/cases/tvx-sip-numbers.png',
    shots: [
      { src: '/cases/tvx-sip-numbers.png', view: 'SIP numbers' },
      { src: '/cases/tvx-dashboard.png', view: 'Dashboard' },
      { src: '/cases/tvx-console-users.png', view: 'Console users and roles' },
      { src: '/cases/tvx-audit.png', view: 'Audit trail' }
    ]
  },
  {
    name: 'ThunderVox Integration',
    hero: '/cases/tvx-integration.png',
    shots: [
      { src: '/cases/tvx-integration.png', view: 'Service API and endpoints' },
      { src: '/cases/tvx-wake-push.png', view: 'Wake push contract' },
      { src: '/cases/tvx-about.png', view: 'About and licence' }
    ]
  }
];
