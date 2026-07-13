/**
 * Scroll-linked header morph + hero reveal.
 *
 * The hero band is split into two fixed layers: the animated backdrop (bandBg, behind
 * the page body) and the wordmark layer (bandFront, above it). The page body is opaque
 * and scrolls up over the fixed backdrop, revealing the page and covering the animation
 * bottom-up — so nothing ever clips against the header's edge.
 *
 * The wordmark is interpolated (FLIP-style) from its hero slot straight into the fixed
 * header's logo slot. The morph spans exactly the distance the rising body needs to cover
 * the band, so the wordmark docks in the same instant the body reaches the header — the
 * wordmark rides just above the body's edge the whole way, leaving no transitional gap.
 * Header fill (--nav-alpha) is tied to the same morph progress.
 *
 * Geometry is measured from the DOM; transforms are written imperatively per rAF frame,
 * never through React state, to keep the morph off the render path. On mobile the morph
 * is disabled (the wordmark wraps) and only the header reveal-on-scroll runs.
 */
import { useEffect, useRef } from 'react';

const MORPH_MIN = 240; // floor for the morph distance (px) on short viewports
const REVEAL_EASE = 0.18; // header hide/show smoothing (0..1)
const DIR_THRESHOLD = 2; // px of scroll before a direction flip counts
const ALPHA_FRACTION = 0.7; // header reaches full navy at this fraction of the morph

export const useHeaderMorph = () => {
  const logo = useRef<HTMLDivElement>(null);
  const navAnchor = useRef<HTMLDivElement>(null);
  const navbar = useRef<HTMLElement>(null);
  const bandFront = useRef<HTMLDivElement>(null); // wordmark layer — also the band-height source
  const bandBg = useRef<HTMLDivElement>(null); // animated backdrop — physically covered by the rising body
  const eyebrow = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const logoEl = logo.current;
    const anchorEl = navAnchor.current;
    const navEl = navbar.current;
    const frontEl = bandFront.current;
    const eyebrowEl = eyebrow.current; // optional flourish; morph runs without it
    if (!logoEl || !anchorEl || !navEl || !frontEl) return;

    // Measured geometry — viewport coords, since the band layers are fixed.
    let heroTop = 0;
    let heroLeft = 0;
    let navViewTop = 0;
    let navViewLeft = 0;
    let scale = 0.1;
    let morphDistance = MORPH_MIN;
    let bandHeight = 0;
    let pinUntil = MORPH_MIN; // scroll at which the body has fully covered the band
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

      // Band height comes from the wordmark layer's natural content height; publish it so
      // the fixed backdrop and the flow spacer both size to it.
      bandHeight = frontEl.offsetHeight;
      document.documentElement.style.setProperty('--band-h', `${bandHeight}px`);

      // Reset the transform before reading the wordmark's untransformed rect.
      logoEl.style.transform = 'none';
      const heroRect = logoEl.getBoundingClientRect();
      const anchorRect = anchorEl.getBoundingClientRect();
      heroTop = heroRect.top;
      heroLeft = heroRect.left;
      navViewTop = anchorRect.top;
      navViewLeft = anchorRect.left;
      scale = anchorRect.height / heroRect.height;
      // Morph spans exactly the distance the rising body needs to cover the band
      // (band height minus the header). So the wordmark docks in the same instant the body
      // reaches the header — the wordmark rides just above the body's edge the whole way,
      // leaving no gap between "wordmark arrived" and "band gone".
      morphDistance = Math.max(MORPH_MIN, bandHeight - navH);
      pinUntil = morphDistance;
    };

    const updateDirection = (y: number) => {
      if (y <= pinUntil) hideTarget = 0; // band still in play: header stays put
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
        navEl.style.setProperty('--nav-alpha', String(clamp01(y / (navH * 1.2))));
        logoEl.style.transform = 'none';
        navEl.style.transform = `translateY(${hideCurrent}px)`;
        raf = requestAnimationFrame(frame);
        return;
      }

      const p = clamp01(y / morphDistance);
      // Header fills navy in step with the morph, not on a separate short ramp.
      navEl.style.setProperty('--nav-alpha', String(clamp01(p / ALPHA_FRACTION)));

      // Eyebrow is a hero-only flourish: lift and fade it out early in the morph.
      if (eyebrowEl) {
        const ep = clamp01(p / 0.45);
        eyebrowEl.style.opacity = String(1 - ep);
        eyebrowEl.style.transform = `translateY(${-ep * 24}px)`;
      }

      // Fixed layers, so no scroll compensation — interpolate straight toward the header slot.
      const translateY = p * (navViewTop - heroTop) + hideCurrent;
      const translateX = p * (navViewLeft - heroLeft);
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
      navEl.style.removeProperty('--nav-alpha');
      document.documentElement.style.removeProperty('--band-h');
      if (eyebrowEl) {
        eyebrowEl.style.opacity = '';
        eyebrowEl.style.transform = '';
      }
    };
  }, []);

  return { logo, navAnchor, navbar, bandFront, bandBg, eyebrow };
};
