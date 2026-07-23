/**
 * Flagship case-study assets: real product screenshots grouped per product.
 * Copy (tile heading + blurb) lives in the i18n dictionary; this file holds only the
 * language-invariant image resources. Order matches dict `pillars` — [0] SenseFlow, [1] TLDR.
 *
 * The screenshots are used as-is and anonymized on the source files by hand; swapping a
 * file in /public/cases keeps the same path, so no code change is needed after redaction.
 * View labels are English-only for now (technical screen names) — localize if needed.
 */

export interface CaseShot {
  /** absolute path under /public */
  src: string;
  /** short screen name shown in the gallery header, e.g. "Call analytics" */
  view: string;
}

export interface FlagshipCase {
  /** short product label for the gallery header */
  name: string;
  /** tile cover — one of the shots, or a dedicated hero */
  hero: string;
  shots: CaseShot[];
}

export const flagshipCases: FlagshipCase[] = [
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
