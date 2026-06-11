/**
 * About Section Animations
 * Mouse-reactive glow on the card container + stat counter.
 * Scroll reveals are handled globally by scrollReveal.ts
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion, lerp } from '../../lib/utils';

export function initAboutAnimations(): void {
  if (typeof window === 'undefined') return;
  if (prefersReducedMotion()) return;

  gsap.registerPlugin(ScrollTrigger);

  const section = document.getElementById('about');
  if (!section) return;

  // ── Stagger stat items ──────────────────────────────────────────────────
  gsap.fromTo(
    '.stat-item',
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      duration: 0.7,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.about-stats',
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    }
  );

  // ── Mouse-reactive card glow ────────────────────────────────────────────
  const mouseGlow = section.querySelector<HTMLElement>('.about-mouse-glow');
  if (!mouseGlow) return;

  let targetX = 50;
  let targetY = 50;
  let currentGlowX = 50;
  let currentGlowY = 50;
  let rafId: number;

  section.addEventListener('mousemove', (e: Event) => {
    const me = e as MouseEvent;
    const rect = section.getBoundingClientRect();
    targetX = ((me.clientX - rect.left) / rect.width) * 100;
    targetY = ((me.clientY - rect.top) / rect.height) * 100;
  });

  function animateGlow() {
    currentGlowX = lerp(currentGlowX, targetX, 0.08);
    currentGlowY = lerp(currentGlowY, targetY, 0.08);
    mouseGlow!.style.background = `radial-gradient(ellipse 60% 60% at ${currentGlowX}% ${currentGlowY}%, rgba(0,229,255,0.08) 0%, transparent 70%)`;
    rafId = requestAnimationFrame(animateGlow);
  }

  animateGlow();
  window.addEventListener('beforeunload', () => cancelAnimationFrame(rafId));
}
