/**
 * Language-invariant contact data — shared by the founder section, the footer
 * and the ContactMenu popover. Labels and hrefs are the same in every language.
 */

export const EMAIL = '84softworks@gmail.com';

export interface SocialLink {
  label: string;
  href: string;
}

export const socialLinks: SocialLink[] = [
  { label: 'GitHub', href: 'https://github.com/beiroun' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/andrei-baranov-173993419' },
  { label: 'Instagram', href: 'https://www.instagram.com/84softworks' }
];

/** Gmail "compose" deep link — opens a prefilled draft in the web client. */
export const gmailComposeUrl = (to: string) =>
  `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(to)}`;
