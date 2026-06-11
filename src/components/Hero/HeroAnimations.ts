/**
 * Hero Section Animations
 * Entry sequence + mouse parallax.
 * Sets initial hidden states via gsap.set (CSS no longer does this).
 */
import { gsap } from 'gsap';
import { prefersReducedMotion, lerp } from '../../lib/utils';

export function initHeroAnimations(): void {
  if (typeof window === 'undefined') return;

  const reduced = prefersReducedMotion();

  // Set initial states before animating
  gsap.set('.hero-name-line', { yPercent: 110 });
  gsap.set('.hero-role p',    { y: 30, opacity: 0 });
  gsap.set('.hero-badge',     { opacity: 0, y: 12 });
  gsap.set('.hero-tagline',   { y: 20, opacity: 0 });
  gsap.set('.hero-cta',       { opacity: 0, y: 20 });
  gsap.set('.hero-socials',   { opacity: 0, y: 15 });

  // ── Entry Timeline — name → role → badge → tagline → cta → socials ────
  const tl = gsap.timeline({ delay: 0.5 });

  if (!reduced) {
    tl.to('.hero-name-line', {
        yPercent: 0,
        duration: 1.1,
        ease: 'power4.out',
      })
      .to('.hero-role p', {
        y: 0, opacity: 1,
        duration: 0.7,
        ease: 'power3.out',
      }, '-=0.5')
      .to('.hero-badge', {
        opacity: 1, y: 0,
        duration: 0.6,
        ease: 'power3.out',
      }, '-=0.3')
      .to('.hero-tagline', {
        y: 0, opacity: 1,
        duration: 0.8,
        ease: 'power2.out',
      }, '-=0.3')
      .to('.hero-cta', {
        opacity: 1, y: 0,
        duration: 0.6,
        ease: 'power2.out',
      }, '-=0.3')
      .to('.hero-socials', {
        opacity: 1, y: 0,
        duration: 0.6,
        ease: 'power2.out',
      }, '-=0.3');
  } else {
    gsap.set(['.hero-badge', '.hero-cta', '.hero-socials'], { opacity: 1, y: 0 });
    gsap.set('.hero-name-line', { yPercent: 0 });
    gsap.set(['.hero-role p', '.hero-tagline'], { y: 0, opacity: 1 });
  }

  // ── Mouse Parallax ─────────────────────────────────────────────────────
  if (reduced) return;

  const orbs = document.querySelectorAll<HTMLElement>('.orb[data-depth]');
  const glow = document.getElementById('hero-glow');

  let mouseX = 0;
  let mouseY = 0;
  let currentX = 0;
  let currentY = 0;
  let rafId: number;

  document.addEventListener('mousemove', (e: MouseEvent) => {
    mouseX = (e.clientX / window.innerWidth) - 0.5;
    mouseY = (e.clientY / window.innerHeight) - 0.5;
  });

  function animateParallax() {
    currentX = lerp(currentX, mouseX, 0.06);
    currentY = lerp(currentY, mouseY, 0.06);

    orbs.forEach((orb) => {
      const depth = parseFloat(orb.dataset.depth || '0.2');
      orb.style.transform = `translate(${currentX * depth * 100}px, ${currentY * depth * 100}px)`;
    });

    if (glow) {
      const gx = 50 + currentX * 20;
      const gy = 50 + currentY * 20;
      glow.style.background = `radial-gradient(ellipse at ${gx}% ${gy}%, rgba(0,229,255,0.12) 0%, transparent 60%)`;
    }

    rafId = requestAnimationFrame(animateParallax);
  }

  animateParallax();
  window.addEventListener('beforeunload', () => cancelAnimationFrame(rafId));
}
