/**
 * Custom Cursor — dot + ring + bubble burst on click
 * The dot snaps instantly to mouse position.
 * The ring lerps behind with a delay (trailing effect).
 * On click: ripple bubble burst animation.
 */
import { prefersReducedMotion } from '../../lib/utils';

export function initCursor(): void {
  if (typeof window === 'undefined') return;
  if (window.matchMedia('(hover: none)').matches) return;
  if (prefersReducedMotion()) return;

  const cursor = document.getElementById('custom-cursor');
  if (!cursor) return;

  const dot  = cursor.querySelector<HTMLElement>('.cursor-dot');
  const ring = cursor.querySelector<HTMLElement>('.cursor-ring');
  const label = cursor.querySelector<HTMLElement>('.cursor-label');
  if (!dot || !ring) return;

  let mouseX = -200, mouseY = -200;
  let ringX  = -200, ringY  = -200;
  let isVisible = false;

  // ── Animate loop ───────────────────────────────────────────────────────
  function tick() {
    const LERP = 0.13;
    ringX += (mouseX - ringX) * LERP;
    ringY += (mouseY - ringY) * LERP;

    dot.style.transform  = `translate(${mouseX}px,${mouseY}px) translate(-50%,-50%)`;
    ring.style.transform = `translate(${ringX}px,${ringY}px) translate(-50%,-50%)`;

    requestAnimationFrame(tick);
  }
  tick();

  // ── Mouse move ─────────────────────────────────────────────────────────
  document.addEventListener('mousemove', (e: MouseEvent) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (!isVisible) {
      isVisible = true;
      cursor.style.opacity = '1';
    }
  });

  // ── Hover states ───────────────────────────────────────────────────────
  const INTERACTIVE = 'a, button, [data-cursor], input, textarea, select, label, [data-magnetic]';

  document.addEventListener('mouseover', (e: MouseEvent) => {
    const el = (e.target as HTMLElement).closest<HTMLElement>(INTERACTIVE);
    if (!el) return;

    document.body.classList.add('cursor-hover');

    // Show label if data-cursor attribute exists
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

  // ── Click — ripple bubble burst ────────────────────────────────────────
  document.addEventListener('mousedown', () => {
    document.body.classList.add('cursor-click');
    spawnClickBubbles(mouseX, mouseY);
  });

  document.addEventListener('mouseup', () => {
    document.body.classList.remove('cursor-click');
  });

  // ── Bubble burst on click ──────────────────────────────────────────────
  function spawnClickBubbles(x: number, y: number) {
    const count = 8;
    for (let i = 0; i < count; i++) {
      const bubble = document.createElement('div');
      const angle  = (i / count) * Math.PI * 2;
      const dist   = 20 + Math.random() * 25;
      const size   = 4 + Math.random() * 6;

      bubble.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: rgba(0,229,255,${0.4 + Math.random() * 0.4});
        pointer-events: none;
        z-index: 9998;
        transform: translate(-50%,-50%);
        box-shadow: 0 0 ${size * 2}px rgba(0,229,255,0.6);
      `;
      document.body.appendChild(bubble);

      const tx = Math.cos(angle) * dist;
      const ty = Math.sin(angle) * dist;

      // CSS keyframe animation via Web Animations API
      bubble.animate(
        [
          { transform: `translate(calc(-50% + 0px), calc(-50% + 0px)) scale(1)`, opacity: 1 },
          { transform: `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) scale(0)`, opacity: 0 },
        ],
        { duration: 500 + Math.random() * 200, easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)', fill: 'forwards' }
      ).onfinish = () => bubble.remove();
    }
  }
}
