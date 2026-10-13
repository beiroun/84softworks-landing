// Copyright (c) 2026 Andrei Baranov (84softworks). All rights reserved. Published for reference only - see LICENSE.
/**
 * Contact call-to-action: a trigger button that opens a popover with email actions
 * (copy address / Gmail compose / mail client) and social links. Replaces bare
 * mailto: links, which silently fail when the visitor has no default mail client.
 *
 * The panel is portaled to <body> so it escapes the fixed header's stacking context.
 * Otherwise the morphing hero wordmark (a high z-index sibling of the header) paints
 * over the panel while the page is unscrolled — the panel would be trapped at the
 * header's z-index and lose. Portaled, it anchors to the trigger via computed coords.
 */
import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useLang } from '../../i18n/LangContext';
import { EMAIL, contactLinkRows, gmailComposeUrl } from './contacts';

/** 'pill' = outlined trigger in the navy header · 'fill' = solid trigger in the Join block. */
type Variant = 'pill' | 'fill';

const COPIED_RESET_MS = 2000;
const PANEL_GAP = 10;
const SHEET_QUERY = '(max-width: 760px)';

interface PanelCoords {
  top: number;
  left?: number;
  right?: number;
}

interface ContactMenuProps {
  variant: Variant;
}

const ContactMenu = ({ variant }: ContactMenuProps) => {
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [sheet, setSheet] = useState(false);
  const [coords, setCoords] = useState<PanelCoords | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Anchor the desktop panel to the trigger. The pill sits near the right edge, so
  // it opens right-aligned; the Join button opens left-aligned. The mobile sheet is
  // laid out entirely in CSS, so coords are ignored there.
  const positionPanel = useCallback(() => {
    const trigger = triggerRef.current;
    if (!trigger) return;
    const rect = trigger.getBoundingClientRect();
    const top = rect.bottom + PANEL_GAP;
    setCoords(
      variant === 'pill'
        ? { top, right: window.innerWidth - rect.right }
        : { top, left: rect.left }
    );
  }, [variant]);

  const openMenu = () => {
    const isSheet = window.matchMedia(SHEET_QUERY).matches;
    setSheet(isSheet);
    if (!isSheet) positionPanel();
    setOpen(true);
  };

  // While open: dismiss on outside click / Escape, and keep the desktop panel anchored
  // to the trigger through scroll and resize.
  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: MouseEvent) => {
      const target = event.target as Node;
      const insideTrigger = triggerRef.current?.contains(target);
      const insidePanel = panelRef.current?.contains(target);
      if (!insideTrigger && !insidePanel) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };

    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    if (!sheet) {
      window.addEventListener('scroll', positionPanel, true);
      window.addEventListener('resize', positionPanel);
    }
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('scroll', positionPanel, true);
      window.removeEventListener('resize', positionPanel);
    };
  }, [open, sheet, positionPanel]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), COPIED_RESET_MS);
    } catch {
      // Clipboard API missing (insecure context / old browser) — fall back to the mail client.
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  const triggerClass = variant === 'pill' ? 'cta-pill' : 'btn-fill';

  const panel = (
    <div
      ref={panelRef}
      className={`contactmenu__panel${sheet ? ' contactmenu__panel--sheet' : ''}`}
      role="menu"
      style={sheet || !coords ? undefined : { top: coords.top, left: coords.left, right: coords.right }}
    >
      <div className="contactmenu__title">{t.contact.title}</div>

      <button
        type="button"
        className={`contactmenu__email${copied ? ' is-copied' : ''}`}
        onClick={copyEmail}
        aria-label={copied ? t.contact.copied : `${t.contact.copy} ${EMAIL}`}
        role="menuitem"
      >
        <span>{EMAIL}</span>
        <span className="contactmenu__feedback" aria-hidden="true">
          <svg
            className="contactmenu__copy-icon"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="9" y="9" width="13" height="13" rx="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
          <svg
            className="contactmenu__check-icon"
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </span>
      </button>

      <a className="contactmenu__row" href={gmailComposeUrl(EMAIL)} target="_blank" rel="noreferrer" role="menuitem">
        {t.contact.gmail}
      </a>
      <a className="contactmenu__row" href={`mailto:${EMAIL}`} role="menuitem">
        {t.contact.mail}
      </a>

      <div className="contactmenu__sep" />

      <div className="contactmenu__socials">
        {contactLinkRows.map((row) => (
          <div className="contactmenu__socials-row" key={row[0].label}>
            {row.map((social) => (
              <a key={social.label} href={social.href} target="_blank" rel="noreferrer" role="menuitem">
                {social.label}
              </a>
            ))}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className={`contactmenu contactmenu--${variant}`}>
      <button
        type="button"
        ref={triggerRef}
        className={triggerClass}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => (open ? setOpen(false) : openMenu())}
      >
        {t.cta}
      </button>
      {open &&
        createPortal(
          <>
            {sheet && <div className="contactmenu__scrim" aria-hidden="true" />}
            {panel}
          </>,
          document.body
        )}
    </div>
  );
};

export default ContactMenu;
