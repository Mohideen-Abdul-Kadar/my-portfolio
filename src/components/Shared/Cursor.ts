/**
 * Custom Cursor — dot + ring + bubble burst on click
 *
 * Strategy:
 *  - `cursor: none` is applied by JS ONLY when the custom cursor initialises
 *    successfully.  If we bail early (touch device, reduced motion, etc.) the
 *    native cursor is left intact and visible.
 *  - The smoke canvas is also hidden for touch / reduced-motion users.
 */
import { prefersReducedMotion } from '../../lib/utils';

export function initCursor(): void {
  if (typeof window === 'undefined') return;

  // Touch / no-hover → keep native cursor, bail out
  if (window.matchMedia('(hover: none)').matches) return;

  // Reduced motion → keep native cursor, bail out
  if (prefersReducedMotion()) return;

  const cursor = document.getElementById('custom-cursor');
  if (!cursor) return;

  const dot   = cursor.querySelector<HTMLElement>('.cursor-dot');
  const ring  = cursor.querySelector<HTMLElement>('.cursor-ring');
  const label = cursor.querySelector<HTMLElement>('.cursor-label');
  if (!dot || !ring) return;

  // ── Only NOW hide the native cursor ──────────────────────────────────
  document.body.style.cursor = 'none';

  let mouseX = -200, mouseY = -200;
  let ringX  = -200, ringY  = -200;
  let isVisible = false;

  // ── Animation loop ────────────────────────────────────────────────────
  function tick() {
    ringX += (mouseX - ringX) * 0.13;
    ringY += (mouseY - ringY) * 0.13;
    dot.style.transform  = `translate(${mouseX}px,${mouseY}px) translate(-50%,-50%)`;
    ring.style.transform = `translate(${ringX}px,${ringY}px) translate(-50%,-50%)`;
    requestAnimationFrame(tick);
  }
  tick();

  // ── Track mouse ───────────────────────────────────────────────────────
  document.addEventListener('mousemove', (e: MouseEvent) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (!isVisible) {
      isVisible = true;
      cursor.style.opacity = '1';
    }
  });

  // Hide custom cursor when mouse leaves the window
  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
    isVisible = false;
  });
  document.addEventListener('mouseenter', () => {
    if (isVisible) cursor.style.opacity = '1';
  });

  // ── Hover states ──────────────────────────────────────────────────────
  const INTERACTIVE = 'a, button, [data-cursor], input, textarea, select, label, [data-magnetic]';

  document.addEventListener('mouseover', (e: MouseEvent) => {
    const el = (e.target as HTMLElement).closest<HTMLElement>(INTERACTIVE);
    if (!el) return;
    document.body.classList.add('cursor-hover');
    const txt = el.dataset.cursor;
    if (txt && label) {
      label.textContent = txt;
      label.style.opacity = '1';
      label.style.transform = 'translate(-50%, 14px) scale(1)';
    }
  });

  document.addEventListener('mouseout', (e: MouseEvent) => {
    const el = (e.target as HTMLElement).closest<HTMLElement>(INTERACTIVE);
    if (!el) return;
    document.body.classList.remove('cursor-hover');
    if (label) {
      label.style.opacity = '0';
      label.style.transform = 'translate(-50%, 10px) scale(0.8)';
    }
  });

  // ── Click — bubble burst ──────────────────────────────────────────────
  document.addEventListener('mousedown', () => {
    document.body.classList.add('cursor-click');
    spawnBubbles(mouseX, mouseY);
  });
  document.addEventListener('mouseup', () => {
    document.body.classList.remove('cursor-click');
  });

  function spawnBubbles(x: number, y: number) {
    for (let i = 0; i < 8; i++) {
      const b     = document.createElement('div');
      const angle = (i / 8) * Math.PI * 2;
      const dist  = 20 + Math.random() * 25;
      const size  = 4 + Math.random() * 6;
      const tx    = Math.cos(angle) * dist;
      const ty    = Math.sin(angle) * dist;

      b.style.cssText = `
        position:fixed;left:${x}px;top:${y}px;
        width:${size}px;height:${size}px;border-radius:50%;
        background:rgba(0,229,255,${(0.4 + Math.random() * 0.4).toFixed(2)});
        pointer-events:none;z-index:9998;
        transform:translate(-50%,-50%);
        box-shadow:0 0 ${size * 2}px rgba(0,229,255,0.6);
      `;
      document.body.appendChild(b);

      b.animate(
        [
          { transform: 'translate(-50%,-50%) scale(1)', opacity: '1' },
          { transform: `translate(calc(-50% + ${tx}px),calc(-50% + ${ty}px)) scale(0)`, opacity: '0' },
        ],
        { duration: 500 + Math.random() * 200, easing: 'cubic-bezier(0.25,0.46,0.45,0.94)', fill: 'forwards' }
      ).onfinish = () => b.remove();
    }
  }
}
