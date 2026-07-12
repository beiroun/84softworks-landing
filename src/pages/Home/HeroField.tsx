/**
 * Mounts the animated hero backdrop as a canvas layer inside the navy band.
 * The `variant` is chosen once per page load; `hostRef` is the band element the
 * canvas fills and reads pointer input from. Purely decorative (aria-hidden).
 */
import { useEffect, useRef } from 'react';
import { createHeroField, type HeroVariant } from './heroFieldEngine';

interface HeroFieldProps {
  variant: HeroVariant;
  hostRef: React.RefObject<HTMLDivElement | null>;
}

const HeroField = ({ variant, hostRef }: HeroFieldProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = hostRef.current;
    if (!canvas || !host) return;
    const field = createHeroField(canvas, host, variant);
    return () => field.destroy();
  }, [variant, hostRef]);

  return <canvas className="herofield" ref={canvasRef} aria-hidden="true" />;
};

export default HeroField;
