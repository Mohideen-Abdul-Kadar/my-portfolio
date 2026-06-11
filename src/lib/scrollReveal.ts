/**
 * Global Scroll Reveal
 * Handles all .reveal-hidden, .reveal-scale, etc. elements site-wide.
 * Called once from MainLayout after GSAP is initialized.
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from './utils';

export function initScrollReveal(): void {
  if (typeof window === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger);

  if (prefersReducedMotion()) {
    // Make everything visible immediately
    gsap.set([
      '.reveal-hidden',
      '.reveal-hidden-left',
      '.reveal-hidden-right',
      '.reveal-scale',
    ], { opacity: 1, x: 0, y: 0, scale: 1 });
    return;
  }

  // ── reveal-hidden (fade up) ──────────────────────────────────────────
  gsap.utils.toArray<HTMLElement>('.reveal-hidden').forEach((el) => {
    // Skip project section — handled by ProjectAnimations
    if (el.closest('#projects')) return;

    gsap.fromTo(
      el,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      }
    );
  });

  // ── reveal-hidden-left (slide from left) ────────────────────────────
  gsap.utils.toArray<HTMLElement>('.reveal-hidden-left').forEach((el) => {
    if (el.closest('#projects')) return;

    gsap.fromTo(
      el,
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      }
    );
  });

  // ── reveal-hidden-right (slide from right) ───────────────────────────
  gsap.utils.toArray<HTMLElement>('.reveal-hidden-right').forEach((el) => {
    if (el.closest('#projects')) return;

    gsap.fromTo(
      el,
      { opacity: 0, x: 50 },
      {
        opacity: 1,
        x: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      }
    );
  });

  // ── reveal-scale (scale + fade) ──────────────────────────────────────
  gsap.utils.toArray<HTMLElement>('.reveal-scale').forEach((el) => {
    if (el.closest('#projects')) return;

    gsap.fromTo(
      el,
      { opacity: 0, scale: 0.92, y: 20 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      }
    );
  });

  // Refresh after all triggers registered
  ScrollTrigger.refresh();
}
