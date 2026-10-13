// Copyright (c) 2026 Andrei Baranov (84softworks). All rights reserved. Published for reference only - see LICENSE.
/**
 * Global smooth scroll (Lenis).
 *
 * The header morph (useHeaderMorph) is scroll-linked: it reads window.scrollY every frame
 * and rides the wordmark on the page body's rising edge. Safari delivers wheel/trackpad
 * scroll in coarse steps, so that morph janks there while Firefox smooths it natively.
 * Lenis interpolates a single scroll position that both the body and the morph follow, so
 * the animation stays smooth and in sync. Wheel/trackpad only — touch stays native (there's
 * no morph on mobile). Honors prefers-reduced-motion by staying fully native.
 */
import Lenis from 'lenis';

let lenis: Lenis | null = null;

/** Start global smooth scroll. Returns a cleanup that restores native scrolling. */
export const startSmoothScroll = (): (() => void) => {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return () => {};

  lenis = new Lenis({
    duration: 1.05, // gentle glide — absorbs Safari's coarse steps without a heavy slide
    smoothWheel: true // wheel/trackpad only; touch is left native
  });

  let raf = requestAnimationFrame(function frame(time) {
    lenis?.raf(time);
    raf = requestAnimationFrame(frame);
  });

  return () => {
    cancelAnimationFrame(raf);
    lenis?.destroy();
    lenis = null;
  };
};

/**
 * Smooth-scroll to an element selector or an absolute Y. `offset` shifts the landing
 * position — pass a negative value to clear the fixed header. Falls back to native scroll
 * when Lenis is disabled (reduced motion).
 */
export const smoothScrollTo = (target: string | number, offset = 0) => {
  if (lenis) {
    lenis.scrollTo(target, { offset });
    return;
  }
  if (typeof target === 'number') {
    window.scrollTo({ top: target + offset, behavior: 'smooth' });
  } else {
    document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' });
  }
};
