// Copyright (c) 2026 Andrei Baranov (84softworks). All rights reserved. Published for reference only - see LICENSE.
/**
 * Case-study gallery: a fullscreen lightbox over a product section. Opened from a
 * ProductTile, it pages through that product's screenshots with arrows, thumbnails, the
 * keyboard (←/→/Esc) and a horizontal swipe on touch screens. On every screen size the
 * screenshot takes the whole viewport and every control floats above it, instead of the
 * image being squeezed between the arrows and the bars.
 *
 * Portaled to <body> so it clears the fixed header and the morphing wordmark's stacking
 * context — the same reason ContactMenu portals its popover.
 */
import { useCallback, useEffect, useRef, useState, type PointerEvent } from 'react';
import { createPortal } from 'react-dom';
import type { ProductCase } from './productCases';

interface CaseGalleryProps {
  /** the open case, or null when the gallery is closed */
  case_: ProductCase | null;
  onClose: () => void;
}

/** Horizontal travel (px) that counts as a swipe rather than a tap. */
const SWIPE_THRESHOLD_PX = 48;

const CaseGallery = ({ case_, onClose }: CaseGalleryProps) => {
  const [index, setIndex] = useState(0);
  // Where the current pointer press started; null while nothing is pressed.
  const pressStart = useRef<{ x: number; y: number } | null>(null);
  // A mouse drag ends with a click on the stage, which would dismiss the gallery; a finished
  // swipe raises this flag so that one click is swallowed instead.
  const swallowNextStageClick = useRef(false);

  // Start from the first shot whenever a different case opens.
  useEffect(() => setIndex(0), [case_]);

  const count = case_?.shots.length ?? 0;
  const step = useCallback(
    (delta: number) => setIndex((current) => (current + delta + count) % count),
    [count]
  );

  // While open: keyboard control and a body-scroll lock so the page behind stays put.
  useEffect(() => {
    if (!case_) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      else if (event.key === 'ArrowRight') step(1);
      else if (event.key === 'ArrowLeft') step(-1);
    };
    document.addEventListener('keydown', onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [case_, step, onClose]);

  const onStagePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    pressStart.current = { x: event.clientX, y: event.clientY };
    // A touch swipe never produces a click, so a flag left over from it must not swallow the
    // next genuine tap on the field.
    swallowNextStageClick.current = false;
  };

  const onStagePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    const start = pressStart.current;
    pressStart.current = null;
    if (!start) return;
    const deltaX = event.clientX - start.x;
    const deltaY = event.clientY - start.y;
    // Mostly-horizontal travel past the threshold pages; anything else stays a tap.
    if (Math.abs(deltaX) < SWIPE_THRESHOLD_PX || Math.abs(deltaX) < Math.abs(deltaY)) return;
    swallowNextStageClick.current = true;
    step(deltaX < 0 ? 1 : -1);
  };

  // The stage is the empty field around the image: a click there dismisses, a click on the
  // image itself does nothing (so a phone tap can't close the gallery by accident).
  const onStageClick = () => {
    if (swallowNextStageClick.current) {
      swallowNextStageClick.current = false;
      return;
    }
    onClose();
  };

  if (!case_) return null;
  const shot = case_.shots[index];

  return createPortal(
    <div className="gallery" role="dialog" aria-modal="true" aria-label={case_.name} data-lenis-prevent>
      <div
        className="gallery__stage"
        onClick={onStageClick}
        onPointerDown={onStagePointerDown}
        onPointerUp={onStagePointerUp}
        onPointerCancel={() => (pressStart.current = null)}
      >
        <img
          src={shot.src}
          alt={`${case_.name} – ${shot.view}`}
          draggable={false}
          onClick={(event) => event.stopPropagation()}
        />
      </div>

      <div className="gallery__top">
        <div className="gallery__title">
          <span className="gallery__view">
            {shot.view} <span className="gallery__prod">· {case_.name}</span>
          </span>
        </div>
        <div className="gallery__actions">
          <span className="gallery__count">{index + 1} / {count}</span>
          <button type="button" className="gallery__close" onClick={onClose} aria-label="Close gallery">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <button type="button" className="gallery__nav gallery__nav--prev" onClick={() => step(-1)} aria-label="Previous screen">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>
      <button type="button" className="gallery__nav gallery__nav--next" onClick={() => step(1)} aria-label="Next screen">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>

      {/* The dock is the approach zone along the bottom edge: with a mouse the thumbnail strip
          inside it stays hidden until the pointer comes near (see .gallery__dock in CSS). */}
      <div className="gallery__dock">
        <div className="gallery__thumbs">
          {case_.shots.map((thumb, thumbIndex) => (
            <button
              type="button"
              key={thumb.src}
              className={`gallery__thumb${thumbIndex === index ? ' is-active' : ''}`}
              onClick={() => setIndex(thumbIndex)}
              aria-label={thumb.view}
              aria-current={thumbIndex === index}
            >
              <img src={thumb.src} alt="" draggable={false} />
            </button>
          ))}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default CaseGallery;
