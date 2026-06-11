/**
 * Projects Section Animations
 * Clean vertical scroll with parallax + fade-in per card.
 * No horizontal pin — fully reliable across all screen sizes.
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from '../../lib/utils';

export function initProjectAnimations(): void {
  if (typeof window === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger);

  const reduced = prefersReducedMotion();

  // ── Section header stagger ───────────────────────────────────────────────
  gsap.fromTo(
    '.proj-header-el',
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.12,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '#projects',
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    }
  );

  if (reduced) return;

  // ── Per-card animations ─────────────────────────────────────────────────
  const items = document.querySelectorAll<HTMLElement>('.project-item');

  items.forEach((item, i) => {
    const isEven = i % 2 === 0;
    const visual = item.querySelector<HTMLElement>('.project-visual');
    const content = item.querySelector<HTMLElement>('.project-content');
    const number = item.querySelector<HTMLElement>('.project-number span');

    // ── Fade + slide the whole card ────────────────────────────────────
    gsap.fromTo(
      item,
      {
        opacity: 0,
        y: 60,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: item,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      }
    );

    // ── Visual panel parallax (subtle vertical shift while scrolling) ──
    if (visual) {
      gsap.fromTo(
        visual,
        { yPercent: -6 },
        {
          yPercent: 6,
          ease: 'none',
          scrollTrigger: {
            trigger: item,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          },
        }
      );
    }

    // ── Content panel — slight opposite parallax ───────────────────────
    if (content) {
      gsap.fromTo(
        content,
        { yPercent: isEven ? 4 : -4 },
        {
          yPercent: isEven ? -4 : 4,
          ease: 'none',
          scrollTrigger: {
            trigger: item,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 2,
          },
        }
      );
    }

    // ── Big background number — deep parallax ──────────────────────────
    if (number) {
      gsap.fromTo(
        number,
        { yPercent: -15, opacity: 0.02 },
        {
          yPercent: 15,
          opacity: 0.06,
          ease: 'none',
          scrollTrigger: {
            trigger: item,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 3,
          },
        }
      );
    }

    // ── Hover lift ────────────────────────────────────────────────────
    const inner = item.querySelector<HTMLElement>('.project-card-inner');
    if (inner) {
      item.addEventListener('mouseenter', () => {
        gsap.to(inner, {
          y: -6,
          boxShadow: '0 30px 80px rgba(0,0,0,0.4)',
          duration: 0.4,
          ease: 'power2.out',
        });
      });

      item.addEventListener('mouseleave', () => {
        gsap.to(inner, {
          y: 0,
          boxShadow: '0 0px 0px rgba(0,0,0,0)',
          duration: 0.6,
          ease: 'elastic.out(1, 0.5)',
        });
      });
    }
  });

  // ── Refresh ScrollTrigger after all animations registered ────────────
  ScrollTrigger.refresh();
}
