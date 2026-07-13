/**
 * Mounts the animated hero backdrop as canvas layers inside the navy band. The
 * `variant` is chosen on load and re-rolled by the full-screen wordmark; each new
 * variant is stacked as a fresh layer that fades in over the previous one (crossfade),
 * and the old layer is dropped once the fade completes. `hostRef` is the band the
 * canvas fills and reads pointer input from. Purely decorative (aria-hidden).
 */
import { useEffect, useRef, useState } from 'react';
import { createHeroField, type HeroVariant } from './heroFieldEngine';

interface HeroFieldProps {
  variant: HeroVariant;
  hostRef: React.RefObject<HTMLDivElement | null>;
}

interface Layer {
  key: number;
  variant: HeroVariant;
}

interface HeroLayerProps {
  variant: HeroVariant;
  hostRef: React.RefObject<HTMLDivElement | null>;
  fadeIn: boolean;
  onEntered: () => void;
}

const HeroLayer = ({ variant, hostRef, fadeIn, onEntered }: HeroLayerProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // The base layer is visible immediately; stacked layers start hidden and fade in.
  const [shown, setShown] = useState(!fadeIn);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = hostRef.current;
    if (!canvas || !host) return;
    const field = createHeroField(canvas, host, variant);
    return () => field.destroy();
  }, [variant, hostRef]);

  useEffect(() => {
    if (!fadeIn) return;
    // Flip opacity on the next frame so the transition actually runs.
    const id = requestAnimationFrame(() => setShown(true));
    return () => cancelAnimationFrame(id);
  }, [fadeIn]);

  return (
    <canvas
      ref={canvasRef}
      className="herofield"
      aria-hidden="true"
      style={{ opacity: shown ? 1 : 0 }}
      onTransitionEnd={fadeIn ? onEntered : undefined}
    />
  );
};

const HeroField = ({ variant, hostRef }: HeroFieldProps) => {
  const [layers, setLayers] = useState<Layer[]>(() => [{ key: 0, variant }]);
  const nextKey = useRef(1);

  // A new variant stacks a fresh layer on top; the crossfade cleanup drops the old ones.
  useEffect(() => {
    setLayers((prev) => {
      if (prev[prev.length - 1].variant === variant) return prev;
      return [...prev, { key: nextKey.current++, variant }];
    });
  }, [variant]);

  // Once a stacked layer has faded in, drop every layer beneath it.
  const handleEntered = (key: number) => {
    setLayers((prev) => (prev.length > 1 ? prev.filter((layer) => layer.key >= key) : prev));
  };

  return (
    <>
      {layers.map((layer) => (
        <HeroLayer
          key={layer.key}
          variant={layer.variant}
          hostRef={hostRef}
          fadeIn={layer.key !== 0}
          onEntered={() => handleEntered(layer.key)}
        />
      ))}
    </>
  );
};

export default HeroField;
