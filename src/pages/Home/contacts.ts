// Copyright (c) 2026 Andrei Baranov (84softworks). All rights reserved. Published for reference only - see LICENSE.
/**
 * Language-invariant contact data — shared by the founder section, the footer
 * and the ContactMenu popover. Labels and hrefs are the same in every language.
 */

export const EMAIL = '84softworks@gmail.com';

export interface SocialLink {
  label: string;
  href: string;
}

/**
 * Two rows everywhere links render: English-audience networks first, Russian second.
 */
export const contactLinkRows: SocialLink[][] = [
  [
    { label: 'GitHub', href: 'https://github.com/beiroun' },
    { label: 'X', href: 'https://x.com/beiroun_stderr' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/andrei-baranov-173993419' }
  ],
  [
    { label: 'Telegram', href: 'https://t.me/beiroun_stderr' },
    { label: 'Instagram', href: 'https://instagram.com/beiroun_stderr' },
    { label: 'Threads', href: 'https://www.threads.com/@beiroun_stderr' }
  ]
];

/** Gmail "compose" deep link — opens a prefilled draft in the web client. */
export const gmailComposeUrl = (to: string) =>
  `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(to)}`;
