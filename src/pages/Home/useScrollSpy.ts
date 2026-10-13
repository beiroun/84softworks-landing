// Copyright (c) 2026 Andrei Baranov (84softworks). All rights reserved. Published for reference only - see LICENSE.
/**
 * Scroll spy for the header nav — reports which page section the viewport is in,
 * so the nav's active dot tracks the real scroll position instead of a hardcoded item.
 *
 * A section counts as "current" once it fills roughly the bottom third of the viewport —
 * the reader has started it, even though the previous section is still on screen; the
 * last one to have crossed wins. Above the first section (hero) nothing is active. The
 * last section is forced active at the document's very bottom, because a short final
 * section may never reach the activation line.
 */
import { useEffect, useState } from 'react';

// A section activates when its top rises above this fraction of the viewport height
// (i.e. it occupies the bottom third). The line sits far below the 76px nav-click
// landing offset, so a clicked section always activates its own dot.
const ACTIVATION_LINE_FRACTION = 2 / 3;
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
      const activationLine = window.innerHeight * ACTIVATION_LINE_FRACTION;
      let current: string | null = null;
      for (const href of sectionHrefs) {
        const section = document.querySelector<HTMLElement>(href);
        if (section && section.getBoundingClientRect().top <= activationLine) {
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
