/**
 * Experience Timeline Animations
 * Growing line on scroll + card reveals.
 * Scroll reveals handled globally by scrollReveal.ts
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from '../../lib/utils';

export function initTimelineAnimations(): void {
  if (typeof window === 'undefined') return;
  if (prefersReducedMotion()) return;

  gsap.registerPlugin(ScrollTrigger);

  const container = document.querySelector<HTMLElement>('.timeline-container');
  if (!container) return;

  // ── Growing timeline line ───────────────────────────────────────────────
  const progress = document.querySelector<HTMLElement>('.timeline-progress');
  if (progress) {
    gsap.set(progress, { height: '0%' });
    ScrollTrigger.create({
      trigger: container,
      start: 'top 70%',
      end: 'bottom 30%',
      scrub: 1.5,
      onUpdate: (self) => {
        progress.style.height = `${self.progress * 100}%`;
      },
    });
  }

  // ── Timeline dot glow ───────────────────────────────────────────────────
  document.querySelectorAll<HTMLElement>('.timeline-dot').forEach((dot) => {
    ScrollTrigger.create({
      trigger: dot,
      start: 'top 72%',
      onEnter: () => {
        gsap.to(dot, {
          borderColor: '#00e5ff',
          boxShadow: '0 0 0 4px rgba(0,229,255,0.2)',
          duration: 0.5,
          ease: 'power2.out',
        });
      },
    });
  });

  // ── Card alternating slide reveal ───────────────────────────────────────
  document.querySelectorAll<HTMLElement>('.timeline-card').forEach((card, i) => {
    const isLeft = i % 2 === 0;

    gsap.fromTo(
      card,
      { opacity: 0, x: isLeft ? -60 : 60, y: 20 },
      {
        opacity: 1,
        x: 0,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 86%',
          toggleActions: 'play none none none',
        },
      }
    );

    // Hover lift
    card.addEventListener('mouseenter', () => {
      gsap.to(card, { y: -4, duration: 0.3, ease: 'power2.out' });
    });
    card.addEventListener('mouseleave', () => {
      gsap.to(card, { y: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)' });
    });
  });
}
