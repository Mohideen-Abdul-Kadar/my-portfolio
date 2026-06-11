/**
 * GSAP Initializer
 * Central place to register GSAP plugins and set global defaults.
 * Import this once in MainLayout or wherever you bootstrap animations.
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';

export function initGSAP() {
  gsap.registerPlugin(ScrollTrigger, TextPlugin);

  // Global GSAP defaults
  gsap.defaults({
    ease: 'power3.out',
    duration: 0.8,
  });

  // ScrollTrigger defaults
  ScrollTrigger.defaults({
    toggleActions: 'play none none reverse',
    start: 'top 85%',
  });

  return { gsap, ScrollTrigger };
}

export { gsap, ScrollTrigger };
