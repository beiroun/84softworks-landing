// Copyright (c) 2026 Andrei Baranov (84softworks). All rights reserved. Published for reference only - see LICENSE.
/**
 * Hero background field — the animated navy-band backdrop. One canvas engine with
 * nine variants across three families (dot-grid, waveform, node-network); the site
 * picks one at random per load via pickHeroVariant. Ported from preview/hero-final.html.
 *
 * Drawing is imperative per rAF frame and never touches React state. Pointer input is
 * read from `host` (the topband) so hovering anywhere over the band — including behind
 * the wordmark — drives the effect. Honors prefers-reduced-motion with one static frame.
 */

const ACCENT = '221,84,16';

export type HeroVariant =
  | 'dotgrid-cells'
  | 'dotgrid-magnetic'
  | 'dotgrid-ripple'
  | 'waveform-ribbon'
  | 'waveform-bars'
  | 'waveform-layered'
  | 'network-drift'
  | 'network-magnetic'
  | 'network-pulses';

export const HERO_VARIANTS: readonly HeroVariant[] = [
  'dotgrid-cells',
  'dotgrid-magnetic',
  'dotgrid-ripple',
  'waveform-ribbon',
  'waveform-bars',
  'waveform-layered',
  'network-drift',
  'network-magnetic',
  'network-pulses'
];

export const pickHeroVariant = (): HeroVariant =>
  HERO_VARIANTS[Math.floor(Math.random() * HERO_VARIANTS.length)];

export interface HeroFieldController {
  destroy(): void;
}

/** Per-variant hooks the shared loop drives. */
interface Engine {
  rebuild(): void; // rebuild geometry after a resize
  moved(): void; // pointer moved (only the ripple variant reacts)
  clicked(x: number, y: number): void;
  frame(t: number): void; // paint one frame; canvas is pre-cleared with the accent glow
}

export function createHeroField(
  canvas: HTMLCanvasElement,
  host: HTMLElement,
  variant: HeroVariant
): HeroFieldController {
  const ctx = canvas.getContext('2d');
  if (!ctx) return { destroy() {} };

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const sub = variant.slice(variant.indexOf('-') + 1);

  let W = 0;
  let H = 0;
  let mx: number | null = null;
  let my: number | null = null;
  let raf = 0;
  const start = performance.now();

  const lerp = (a: number, b: number, k: number) => a + (b - a) * k;

  const roundRect = (x: number, y: number, w: number, h: number, r: number) => {
    r = Math.min(r, w / 2, h / 2);
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  };

  /* ------------------------------ dot-grid ------------------------------ */
  const dotgrid = (): Engine => {
    const S = 40;
    const RADIUS = 150;
    let cols = 0;
    let rows = 0;
    let pts: { hx: number; hy: number; x: number; y: number }[] = [];
    const cellGlow = new Map<string, number>();
    const ripples: { x: number; y: number; age: number; radius: number; big?: boolean }[] = [];
    let lastRx: number | null = null;
    let lastRy: number | null = null;

    const baseAlpha = (y: number) => 0.05 + 0.11 * (1 - (y / H) * 0.8);
    const dot = (x: number, y: number, g: number) => {
      const a = Math.min(1, baseAlpha(y) + g * 0.85);
      ctx.beginPath();
      ctx.arc(x, y, 1.4 + g * 2.4, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${(255 - 34 * g) | 0},${(255 - 171 * g) | 0},${(255 - 239 * g) | 0},${a})`;
      ctx.fill();
    };

    const cells = () => {
      for (const [k, v] of cellGlow) {
        const nv = v * 0.82;
        if (nv < 0.01) cellGlow.delete(k);
        else cellGlow.set(k, nv);
      }
      if (mx != null && my != null) {
        const cc = Math.floor(mx / S);
        const cr = Math.floor(my / S);
        const set = (c: number, r: number, v: number) => {
          const k = c + ',' + r;
          cellGlow.set(k, Math.max(cellGlow.get(k) || 0, v));
        };
        set(cc, cr, 1);
        set(cc - 1, cr, 0.4);
        set(cc + 1, cr, 0.4);
        set(cc, cr - 1, 0.4);
        set(cc, cr + 1, 0.4);
        set(cc - 1, cr - 1, 0.22);
        set(cc + 1, cr - 1, 0.22);
        set(cc - 1, cr + 1, 0.22);
        set(cc + 1, cr + 1, 0.22);
      }
      for (const [k, v] of cellGlow) {
        const parts = k.split(',');
        ctx.fillStyle = `rgba(${ACCENT},${v * 0.2})`;
        ctx.fillRect(Number(parts[0]) * S, Number(parts[1]) * S, S, S);
      }
      for (let r = 0; r <= rows; r++) {
        for (let c = 0; c <= cols; c++) {
          const g = Math.max(
            cellGlow.get(c + ',' + r) || 0,
            cellGlow.get(c - 1 + ',' + r) || 0,
            cellGlow.get(c + ',' + (r - 1)) || 0,
            cellGlow.get(c - 1 + ',' + (r - 1)) || 0
          );
          dot(c * S, r * S, g);
        }
      }
    };

    const magnetic = () => {
      for (const p of pts) {
        let tx = p.hx;
        let ty = p.hy;
        let g = 0;
        if (mx != null && my != null) {
          const dx = mx - p.hx;
          const dy = my - p.hy;
          const d = Math.hypot(dx, dy);
          if (d < RADIUS) {
            const k = 1 - d / RADIUS;
            g = Math.pow(k, 1.4);
            tx = p.hx + dx * k * 0.28;
            ty = p.hy + dy * k * 0.28;
          }
        }
        p.x = lerp(p.x, tx, 0.18);
        p.y = lerp(p.y, ty, 0.18);
        dot(p.x, p.y, g);
      }
    };

    const ripple = () => {
      for (let i = ripples.length - 1; i >= 0; i--) {
        const rp = ripples[i];
        rp.age += 1;
        rp.radius = rp.age * (rp.big ? 4.6 : 3.4);
        if (rp.radius > (rp.big ? 900 : 520)) ripples.splice(i, 1);
      }
      const band = 26;
      for (let r = 0; r <= rows; r++) {
        for (let c = 0; c <= cols; c++) {
          const x = c * S;
          const y = r * S;
          let g = 0;
          for (const rp of ripples) {
            const dr = Math.abs(Math.hypot(x - rp.x, y - rp.y) - rp.radius);
            if (dr < band) {
              const life = 1 - rp.radius / (rp.big ? 900 : 520);
              g += (1 - dr / band) * life * (rp.big ? 1 : 0.85);
            }
          }
          dot(x, y, Math.min(1, g));
        }
      }
    };

    const paint = sub === 'magnetic' ? magnetic : sub === 'ripple' ? ripple : cells;

    return {
      rebuild() {
        cols = Math.ceil(W / S);
        rows = Math.ceil(H / S);
        pts = [];
        for (let r = 0; r <= rows; r++) {
          for (let c = 0; c <= cols; c++) pts.push({ hx: c * S, hy: r * S, x: c * S, y: r * S });
        }
      },
      moved() {
        if (sub !== 'ripple' || mx == null || my == null) return;
        if (lastRx == null || lastRy == null || Math.hypot(mx - lastRx, my - lastRy) > 26) {
          ripples.push({ x: mx, y: my, age: 0, radius: 0 });
          lastRx = mx;
          lastRy = my;
          if (ripples.length > 18) ripples.shift();
        }
      },
      clicked(x: number, y: number) {
        if (sub === 'ripple') ripples.push({ x, y, age: 0, radius: 0, big: true });
      },
      frame() {
        paint();
      }
    };
  };

  /* ------------------------------ waveform ------------------------------ */
  const waveform = (): Engine => {
    const SIG = 120;
    const PULL = 0.85;
    const SPEED = 1.7;
    let ex: number | null = null;
    let ey: number | null = null;
    let mAmt = 0;

    const bump = (x: number) => (ex == null ? 0 : Math.exp(-((x - ex) * (x - ex)) / (2 * SIG * SIG)));

    const line = (t: number, baseY: number, amp: number, alpha: number, lw: number, glow: boolean) => {
      const path = new Path2D();
      for (let x = 0; x <= W; x += 8) {
        let y =
          baseY +
          Math.sin(x * 0.012 + t * 1.2) * amp +
          Math.sin(x * 0.026 - t * 0.9) * amp * 0.5 +
          Math.sin(x * 0.006 + t * 0.4) * amp * 0.3;
        if (ex != null && ey != null && mAmt > 0.01) y += (ey - y) * bump(x) * PULL * mAmt;
        if (x === 0) path.moveTo(x, y);
        else path.lineTo(x, y);
      }
      ctx.lineJoin = 'round';
      // cheap glow: one wide translucent pass instead of costly shadowBlur
      if (glow) {
        ctx.strokeStyle = `rgba(${ACCENT},0.14)`;
        ctx.lineWidth = lw + 8;
        ctx.stroke(path);
      }
      ctx.strokeStyle = `rgba(${ACCENT},${alpha})`;
      ctx.lineWidth = lw;
      ctx.stroke(path);
    };

    const fill = (t: number, baseY: number, amp: number, color: string) => {
      ctx.beginPath();
      ctx.moveTo(0, H);
      for (let x = 0; x <= W; x += 8) {
        let y = baseY + Math.sin(x * 0.01 + t * 1.1) * amp + Math.sin(x * 0.022 - t * 0.8) * amp * 0.5;
        if (ex != null && ey != null && mAmt > 0.01) y += (ey - y) * bump(x) * PULL * mAmt;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(W, H);
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.fill();
    };

    const bars = (t: number) => {
      const gap = 10;
      const bw = 6;
      const step = gap + bw;
      const baseY = H; // sit the equalizer on the band's bottom edge
      const maxH = H * 0.52;
      for (let i = 0, x = 0; x < W; i++, x += step) {
        const n = 0.5 + 0.5 * Math.sin(i * 0.5 + t * 3) * (0.6 + 0.4 * Math.sin(i * 0.13 - t * 1.7));
        let h = 6 + Math.abs(n) * maxH;
        // bounded reactive boost near the cursor — grows in place, never flies to the mouse
        if (ex != null && ey != null && mAmt > 0.01) h = Math.min(h + bump(x) * mAmt * maxH * 0.55, H * 0.78);
        const edge = Math.min(1, Math.min(x, W - x) / 140);
        const g = ctx.createLinearGradient(0, baseY - h, 0, baseY);
        g.addColorStop(0, `rgba(${ACCENT},${0.9 * edge})`);
        g.addColorStop(1, `rgba(${ACCENT},${0.12 * edge})`);
        ctx.fillStyle = g;
        roundRect(x, baseY - h, bw, h, 3);
        ctx.fill();
      }
    };

    const ribbon = (t: number) => {
      line(t * 0.7, H * 0.14, H * 0.02, 0.1, 1, false);
      line(t * 0.85, H * 0.42, H * 0.06, 0.18, 1.5, false);
      line(t, H * 0.6, H * 0.14, 0.9, 2.5, true);
    };

    const layered = (t: number) => {
      fill(t * 0.6, H * 0.66, H * 0.1, 'rgba(255,255,255,0.04)');
      fill(t * 0.8, H * 0.72, H * 0.12, `rgba(${ACCENT},0.1)`);
      fill(t * 1.0, H * 0.8, H * 0.1, `rgba(${ACCENT},0.16)`);
      line(t, H * 0.66, H * 0.1, 0.85, 2, true);
      line(t * 0.7, H * 0.14, H * 0.02, 0.1, 1, false);
    };

    const paint = sub === 'bars' ? bars : sub === 'layered' ? layered : ribbon;

    return {
      rebuild() {},
      moved() {},
      clicked() {},
      frame(t: number) {
        // ease the mouse so the wave trails it, and relax when the cursor leaves
        mAmt = lerp(mAmt, mx != null ? 1 : 0, 0.16);
        if (mx != null && my != null) {
          ex = ex == null ? mx : lerp(ex, mx, 0.28);
          ey = ey == null ? my : lerp(ey, my, 0.28);
        }
        paint(t * SPEED);
      }
    };
  };

  /* ---------------------------- node-network ---------------------------- */
  const network = (): Engine => {
    const LINK = 132;
    const MOUSE_R = 190;
    let nodes: { x: number; y: number; hx: number; hy: number; vx: number; vy: number; ph: number }[] = [];

    const step = () => {
      for (const n of nodes) {
        if (sub === 'magnetic') {
          n.x += (n.hx - n.x) * 0.05;
          n.y += (n.hy - n.y) * 0.05;
          if (mx != null && my != null) {
            const dx = mx - n.x;
            const dy = my - n.y;
            const d = Math.hypot(dx, dy);
            if (d < MOUSE_R) {
              const f = (1 - d / MOUSE_R) * 0.18;
              n.x += dx * f;
              n.y += dy * f;
            }
          }
        } else {
          n.x += n.vx;
          n.y += n.vy;
          if (n.x < 0 || n.x > W) n.vx *= -1;
          if (n.y < 0 || n.y > H) n.vy *= -1;
          n.x = Math.max(0, Math.min(W, n.x));
          n.y = Math.max(0, Math.min(H, n.y));
        }
      }
    };

    const draw = (t: number) => {
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d >= LINK) continue;
          const k = 1 - d / LINK;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(255,255,255,${k * 0.16})`;
          ctx.lineWidth = 1;
          ctx.stroke();
          if (sub === 'pulses') {
            const frac = (t * 0.35 + (a.ph + b.ph) * 0.5) % 1;
            ctx.beginPath();
            ctx.arc(lerp(a.x, b.x, frac), lerp(a.y, b.y, frac), 1.8, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${ACCENT},${k * 0.9})`;
            ctx.fill();
          }
        }
      }
      for (const n of nodes) {
        let near = 0;
        if (mx != null && my != null) {
          const d = Math.hypot(n.x - mx, n.y - my);
          if (d < MOUSE_R) {
            near = 1 - d / MOUSE_R;
            ctx.beginPath();
            ctx.moveTo(mx, my);
            ctx.lineTo(n.x, n.y);
            ctx.strokeStyle = `rgba(${ACCENT},${near * 0.45})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
        ctx.beginPath();
        ctx.arc(n.x, n.y, 1.7 + near * 2.4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${(255 - 34 * near) | 0},${(255 - 171 * near) | 0},${(255 - 239 * near) | 0},${0.45 + near * 0.55})`;
        ctx.fill();
      }
    };

    return {
      rebuild() {
        const count = Math.max(24, Math.min(80, Math.round((W * H) / 17000)));
        nodes = [];
        for (let i = 0; i < count; i++) {
          const x = Math.random() * W;
          const y = Math.random() * H;
          nodes.push({ x, y, hx: x, hy: y, vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35, ph: Math.random() });
        }
      },
      moved() {},
      clicked() {},
      frame(t: number) {
        step();
        draw(t);
      }
    };
  };

  const engine: Engine = variant.startsWith('dotgrid')
    ? dotgrid()
    : variant.startsWith('waveform')
      ? waveform()
      : network();

  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = host.clientWidth;
    H = host.clientHeight;
    if (!W || !H) return;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    engine.rebuild();
  };

  const onMove = (e: MouseEvent) => {
    const r = canvas.getBoundingClientRect();
    mx = e.clientX - r.left;
    my = e.clientY - r.top;
    engine.moved();
  };
  const onLeave = () => {
    mx = null;
    my = null;
  };
  const onClick = (e: MouseEvent) => {
    const r = canvas.getBoundingClientRect();
    engine.clicked(e.clientX - r.left, e.clientY - r.top);
  };

  const observer = new ResizeObserver(() => resize());
  observer.observe(host);
  host.addEventListener('mousemove', onMove);
  host.addEventListener('mouseleave', onLeave);
  host.addEventListener('click', onClick);
  resize();

  const loop = (now: number) => {
    ctx.clearRect(0, 0, W, H);
    engine.frame((now - start) / 1000);
    raf = requestAnimationFrame(loop);
  };

  if (reduce) {
    ctx.clearRect(0, 0, W, H);
    engine.frame(0);
  } else {
    raf = requestAnimationFrame(loop);
  }

  return {
    destroy() {
      cancelAnimationFrame(raf);
      observer.disconnect();
      host.removeEventListener('mousemove', onMove);
      host.removeEventListener('mouseleave', onLeave);
      host.removeEventListener('click', onClick);
    }
  };
}
