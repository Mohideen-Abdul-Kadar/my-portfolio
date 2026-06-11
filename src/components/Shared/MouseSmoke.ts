/**
 * Mouse Smoke / Aura Trail
 * Canvas-based glowing smoke that follows the cursor.
 * Two layers: fast small sparks + slow large blobs.
 */
import { prefersReducedMotion } from '../../lib/utils';

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  life: number; maxLife: number;
  radius: number;
  r: number; g: number; b: number;
  alpha: number;
  type: 'smoke' | 'spark';
}

export function initMouseSmoke(): void {
  if (typeof window === 'undefined') return;
  if (prefersReducedMotion()) return;
  if (window.matchMedia('(hover: none)').matches) return;

  /* ── Canvas setup ──────────────────────────────────────────────────── */
  const canvas = document.createElement('canvas');
  canvas.id = 'mouse-smoke';
  canvas.style.cssText = `
    position:fixed; top:0; left:0;
    width:100%; height:100%;
    pointer-events:none;
    z-index:9996;
    mix-blend-mode:screen;
  `;
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d')!;
  let W = window.innerWidth, H = window.innerHeight;
  canvas.width = W; canvas.height = H;

  const ro = new ResizeObserver(() => {
    W = window.innerWidth; H = window.innerHeight;
    canvas.width = W; canvas.height = H;
  });
  ro.observe(document.body);

  /* ── State ─────────────────────────────────────────────────────────── */
  const pool: Particle[] = [];
  let mx = -500, my = -500, pmx = -500, pmy = -500;
  let frame = 0;

  document.addEventListener('mousemove', (e: MouseEvent) => {
    mx = e.clientX; my = e.clientY;
  });

  /* ── Spawn ─────────────────────────────────────────────────────────── */
  function spawn() {
    const dx = mx - pmx, dy = my - pmy;
    const speed = Math.sqrt(dx * dx + dy * dy);
    if (speed < 1) return;

    const smokeCount = Math.min(Math.floor(speed * 0.15) + 1, 4);
    const sparkCount = Math.min(Math.floor(speed * 0.1), 3);

    // Smoke blobs
    for (let i = 0; i < smokeCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const spread = speed * 0.04;
      pool.push({
        x: mx + (Math.random() - 0.5) * 8,
        y: my + (Math.random() - 0.5) * 8,
        vx: Math.cos(angle) * spread + dx * 0.04,
        vy: Math.sin(angle) * spread + dy * 0.04 - 0.3,
        life: 0, maxLife: 50 + Math.random() * 40,
        radius: 12 + Math.random() * 22,
        r: 0, g: 200 + Math.floor(Math.random() * 55), b: 230 + Math.floor(Math.random() * 25),
        alpha: 0.25 + Math.random() * 0.2,
        type: 'smoke',
      });
    }

    // Spark dots (smaller, faster, sharper)
    for (let i = 0; i < sparkCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const v = 1.5 + Math.random() * 3;
      // Alternate cyan / violet sparks
      const isCyan = Math.random() > 0.35;
      pool.push({
        x: mx + (Math.random() - 0.5) * 6,
        y: my + (Math.random() - 0.5) * 6,
        vx: Math.cos(angle) * v + dx * 0.06,
        vy: Math.sin(angle) * v + dy * 0.06 - 0.6,
        life: 0, maxLife: 20 + Math.random() * 20,
        radius: 2 + Math.random() * 4,
        r: isCyan ? 0   : 140,
        g: isCyan ? 229 : 80,
        b: isCyan ? 255 : 255,
        alpha: 0.7 + Math.random() * 0.3,
        type: 'spark',
      });
    }

    pmx = mx; pmy = my;
  }

  /* ── Draw ──────────────────────────────────────────────────────────── */
  function drawParticle(p: Particle) {
    const t = p.life / p.maxLife;
    const ease = 1 - Math.pow(t, p.type === 'spark' ? 1 : 1.5);
    const a = p.alpha * ease;
    if (a <= 0.005) return;

    const r = p.type === 'smoke'
      ? p.radius * (1 + t * 1.4)   // blobs expand
      : p.radius * (1 - t * 0.5);  // sparks shrink

    const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r);
    if (p.type === 'smoke') {
      grd.addColorStop(0,   `rgba(${p.r},${p.g},${p.b},${(a * 0.7).toFixed(3)})`);
      grd.addColorStop(0.5, `rgba(${p.r},${p.g},${p.b},${(a * 0.25).toFixed(3)})`);
      grd.addColorStop(1,   `rgba(${p.r},${p.g},${p.b},0)`);
    } else {
      grd.addColorStop(0,   `rgba(${p.r},${p.g},${p.b},${a.toFixed(3)})`);
      grd.addColorStop(0.6, `rgba(${p.r},${p.g},${p.b},${(a * 0.3).toFixed(3)})`);
      grd.addColorStop(1,   `rgba(${p.r},${p.g},${p.b},0)`);
    }

    ctx.beginPath();
    ctx.arc(p.x, p.y, Math.max(r, 0.1), 0, Math.PI * 2);
    ctx.fillStyle = grd;
    ctx.fill();
  }

  /* ── Loop ──────────────────────────────────────────────────────────── */
  function loop() {
    ctx.clearRect(0, 0, W, H);

    if (frame % 2 === 0) spawn();
    frame++;

    for (let i = pool.length - 1; i >= 0; i--) {
      const p = pool[i];
      p.life++;
      p.x += p.vx; p.y += p.vy;
      p.vx *= 0.97; p.vy *= 0.97;
      p.vy -= 0.012;
      if (p.life >= p.maxLife) { pool.splice(i, 1); continue; }
      drawParticle(p);
    }

    if (pool.length > 400) pool.splice(0, pool.length - 400);
    requestAnimationFrame(loop);
  }

  loop();
}
