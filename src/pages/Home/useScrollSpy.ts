/**
 * Scroll spy for the header nav — reports which page section the viewport is in,
 * so the nav's active dot tracks the real scroll position instead of a hardcoded item.
 *
 * A section counts as "current" once its top crosses the activation line just below
 * the fixed header; the last one to have crossed wins. Above the first section (hero)
 * nothing is active. The last section is forced active at the document's very bottom,
 * because a short final section may never reach the activation line.
 */
import { useEffect, useState } from 'react';

// Must stay >= the |offset| used by scrollToSection (76px above target), or a nav click
// would land a section exactly on the line without activating its own dot.
const ACTIVATION_OFFSET = 80;
const BOTTOM_EPSILON = 2; // px of slack for fractional scroll positions at the page end

export const useScrollSpy = (sectionHrefs: string[]): string | null => {
  const [activeHref, setActiveHref] = useState<string | null>(null);

  useEffect(() => {
    let raf = 0;

    const update = () => {
      raf = 0;
      const scrolledToBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - BOTTOM_EPSILON;
      if (scrolledToBottom) {
        setActiveHref(sectionHrefs[sectionHrefs.length - 1] ?? null);
        return;
      }
      let current: string | null = null;
      for (const href of sectionHrefs) {
        const section = document.querySelector<HTMLElement>(href);
        if (section && section.getBoundingClientRect().top <= ACTIVATION_OFFSET) {
          current = href;
        }
      }
      setActiveHref(current);
    };

    // rAF-throttle: scroll events can outpace frames (Lenis re-emits per frame anyway).
    const requestUpdate = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
    };
  }, [sectionHrefs]);

  return activeHref;
};
