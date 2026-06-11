/**
 * Magnetic Button Effect
 * Buttons that attract the cursor toward them within a radius.
 * Apply [data-magnetic] attribute to any element.
 */
import { gsap } from 'gsap';
import { prefersReducedMotion } from '../../lib/utils';

interface MagneticOptions {
  strength?: number;   // How strong the magnetic pull (0–1)
  radius?: number;     // Detection radius in pixels
  duration?: number;   // GSAP tween duration
}

export function initMagneticButtons(options: MagneticOptions = {}): void {
  if (typeof window === 'undefined') return;
  if (prefersReducedMotion()) return;

  const {
    strength = 0.35,
    radius = 100,
    duration = 0.6,
  } = options;

  const buttons = document.querySelectorAll<HTMLElement>('[data-magnetic]');

  buttons.forEach((btn) => {
    const inner = btn.querySelector<HTMLElement>('[data-magnetic-inner]') || btn;

    function handleMouseMove(e: MouseEvent) {
      const rect = btn.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distX = e.clientX - centerX;
      const distY = e.clientY - centerY;
      const distance = Math.sqrt(distX * distX + distY * distY);

      if (distance < radius) {
        const moveX = distX * strength;
        const moveY = distY * strength;

        gsap.to(btn, {
          x: moveX,
          y: moveY,
          duration,
          ease: 'power3.out',
        });
        gsap.to(inner, {
          x: moveX * 0.3,
          y: moveY * 0.3,
          duration,
          ease: 'power3.out',
        });
      }
    }

    function handleMouseLeave() {
      gsap.to(btn, {
        x: 0,
        y: 0,
        duration: 0.8,
        ease: 'elastic.out(1, 0.4)',
      });
      gsap.to(inner, {
        x: 0,
        y: 0,
        duration: 0.8,
        ease: 'elastic.out(1, 0.4)',
      });
    }

    document.addEventListener('mousemove', handleMouseMove);
    btn.addEventListener('mouseleave', handleMouseLeave);
  });
}
