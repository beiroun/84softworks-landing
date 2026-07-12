/**
 * Scroll-linked header morph.
 *
 * The hero wordmark is pinned to the viewport and interpolated straight into the
 * fixed header's logo slot as the navy band scrolls by, so the whole animation stays
 * on screen (it never scrolls off the top). Once the band ends, the header itself
 * hides on scroll-down and reveals on scroll-up.
 *
 * Geometry is measured from the DOM (FLIP-style) so the wordmark lands exactly on the
 * invisible nav anchor; transforms are written imperatively per rAF frame — never
 * through React state — to keep it off the render path.
 */
import { useEffect, useRef } from 'react';

const MORPH_MIN = 240; // floor for the morph distance (px)
const REVEAL_EASE = 0.18; // header hide/show smoothing (0..1)
const DIR_THRESHOLD = 2; // px of scroll before a direction flip counts

export const useHeaderMorph = () => {
  const logo = useRef<HTMLDivElement>(null);
  const navAnchor = useRef<HTMLDivElement>(null);
  const navbar = useRef<HTMLElement>(null);
  const topband = useRef<HTMLDivElement>(null);
  const eyebrow = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const logoEl = logo.current;
    const anchorEl = navAnchor.current;
    const navEl = navbar.current;
    const bandEl = topband.current;
    const eyebrowEl = eyebrow.current; // optional flourish; morph runs without it
    if (!logoEl || !anchorEl || !navEl || !bandEl) return;

    // Measured geometry (page/viewport coords).
    let heroDocTop = 0;
    let heroDocLeft = 0;
    let navViewTop = 0;
    let navViewLeft = 0;
    let scale = 0.1;
    let morphDistance = MORPH_MIN;
    let pinUntil = MORPH_MIN; // header stays put until the navy band ends
    let navH = 60;
    let mobile = false;

    let lastY = window.scrollY;
    let hideTarget = 0; // 0 = header shown, -navH = hidden
    let hideCurrent = 0;
    let raf = 0;

    const clamp01 = (v: number) => Math.min(Math.max(v, 0), 1);

    const measure = () => {
      mobile = window.innerWidth <= 760;
      navH = navEl.offsetHeight;
      logoEl.style.transform = 'none';
      const heroRect = logoEl.getBoundingClientRect();
      const anchorRect = anchorEl.getBoundingClientRect();
      heroDocTop = heroRect.top + window.scrollY;
      heroDocLeft = heroRect.left;
      navViewTop = anchorRect.top;
      navViewLeft = anchorRect.left;
      scale = anchorRect.height / heroRect.height;
      // Reveal-on-direction begins exactly when the navy band's bottom slides under the header.
      pinUntil = bandEl.getBoundingClientRect().bottom + window.scrollY - navH;
      // Morph spans the whole band, so the wordmark reaches its small form as the band ends.
      morphDistance = Math.max(MORPH_MIN, pinUntil);
    };

    const updateDirection = (y: number) => {
      if (y <= pinUntil) hideTarget = 0; // whole band in play: header stays put
      else if (y > lastY + DIR_THRESHOLD) hideTarget = -navH; // scrolling down
      else if (y < lastY - DIR_THRESHOLD) hideTarget = 0; // scrolling up: reveal anywhere
      lastY = y;
    };

    const frame = () => {
      const y = window.scrollY;
      updateDirection(y);
      hideCurrent += (hideTarget - hideCurrent) * REVEAL_EASE;

      if (mobile) {
        // No morph on mobile (the wordmark wraps); only the header reveal runs.
        logoEl.style.transform = 'none';
        navEl.style.transform = `translateY(${hideCurrent}px)`;
        raf = requestAnimationFrame(frame);
        return;
      }

      const p = clamp01(y / morphDistance);
      // Eyebrow is a hero-only flourish: lift it away and fade it out early in the morph,
      // so it never collides with the compact header the wordmark docks into.
      if (eyebrowEl) {
        const ep = clamp01(p / 0.45);
        eyebrowEl.style.opacity = String(1 - ep);
        eyebrowEl.style.transform = `translateY(${-ep * 24}px)`;
      }
      // Pin to the viewport (+y) and interpolate toward the header slot (+p·delta).
      const translateY = y + p * (navViewTop - heroDocTop) + hideCurrent;
      const translateX = p * (navViewLeft - heroDocLeft);
      const sc = 1 - (1 - scale) * p;

      logoEl.style.transform = `translate(${translateX}px, ${translateY}px) scale(${sc})`;
      navEl.style.transform = `translateY(${hideCurrent}px)`;
      raf = requestAnimationFrame(frame);
    };

    measure();
    window.addEventListener('resize', measure);
    // Fonts change glyph metrics — re-measure once they're ready.
    if (document.fonts?.ready) document.fonts.ready.then(measure);
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', measure);
      logoEl.style.transform = '';
      navEl.style.transform = '';
      if (eyebrowEl) {
        eyebrowEl.style.opacity = '';
        eyebrowEl.style.transform = '';
      }
    };
  }, []);

  return { logo, navAnchor, navbar, topband, eyebrow };
};
