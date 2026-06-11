/**
 * Skills Animations
 * - Card stagger + hover: full glowing border + tag color on hover
 * - Skill tag individual hover: border color + text color from group color
 * - Cloud fade-in
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from '../../lib/utils';

export function initSkillsAnimations(): void {
  if (typeof window === 'undefined') return;
  if (prefersReducedMotion()) return;

  gsap.registerPlugin(ScrollTrigger);

  // ── Cards stagger in ────────────────────────────────────────────────────
  gsap.fromTo(
    '.skill-group',
    { opacity: 0, y: 40, scale: 0.96 },
    {
      opacity: 1, y: 0, scale: 1,
      duration: 0.7,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.skills-grid',
        start: 'top 82%',
        toggleActions: 'play none none none',
      },
    }
  );

  // ── Per-card: full glowing border on hover + tag highlighting ────────────
  document.querySelectorAll<HTMLElement>('.skill-group').forEach((card) => {
    const color   = card.dataset.color || '#00e5ff';
    const topLine = card.querySelector<HTMLElement>('.skill-top-line');
    const tags    = card.querySelectorAll<HTMLElement>('.skill-tag');

    // Stagger tags in when card enters viewport
    gsap.fromTo(
      tags,
      { opacity: 0, scale: 0.85 },
      {
        opacity: 1, scale: 1,
        duration: 0.35,
        stagger: 0.04,
        ease: 'back.out(1.5)',
        scrollTrigger: {
          trigger: card,
          start: 'top 86%',
          toggleActions: 'play none none none',
        },
      }
    );

    // Card hover — full glowing border (box-shadow trick) + bright top line
    card.addEventListener('mouseenter', () => {
      gsap.to(card, {
        y: -5,
        boxShadow: `0 0 0 1px ${color}50, 0 8px 40px ${color}15, 0 0 60px ${color}08`,
        duration: 0.35,
        ease: 'power2.out',
      });
      if (topLine) {
        topLine.style.background = `linear-gradient(90deg, transparent, ${color}, transparent)`;
        topLine.style.opacity = '1';
      }
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        y: 0,
        boxShadow: 'none',
        duration: 0.5,
        ease: 'elastic.out(1, 0.5)',
      });
      if (topLine) {
        topLine.style.background = `linear-gradient(90deg, transparent, ${color}50, transparent)`;
        topLine.style.opacity = '0.6';
      }
    });

    // Individual tag hover — color text + tinted border
    tags.forEach((tag) => {
      tag.addEventListener('mouseenter', () => {
        tag.style.color   = '#ffffff';
        tag.style.borderColor = `${color}60`;
        tag.style.background  = `${color}12`;
        tag.style.boxShadow   = `0 0 10px ${color}20`;
      });
      tag.addEventListener('mouseleave', () => {
        tag.style.color   = '';
        tag.style.borderColor = '#1f1f1f';
        tag.style.background  = '';
        tag.style.boxShadow   = '';
      });
    });
  });

  // ── Cloud row fade in ────────────────────────────────────────────────────
  gsap.to('.skills-cloud', {
    opacity: 1,
    duration: 1,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.skills-cloud',
      start: 'top 90%',
      toggleActions: 'play none none none',
    },
  });
}
