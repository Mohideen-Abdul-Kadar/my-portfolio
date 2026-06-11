/**
 * Page Transition
 * Cinematic blur + scale + opacity transition on page load.
 */
import { gsap } from 'gsap';
import { prefersReducedMotion } from '../../lib/utils';

export function initPageTransition(): void {
  if (typeof window === 'undefined') return;

  const overlay = document.getElementById('page-transition');
  if (!overlay) return;

  if (prefersReducedMotion()) {
    overlay.style.display = 'none';
    return;
  }

  // Entry animation — reveal the page
  const tl = gsap.timeline();

  tl.to(overlay, {
    scaleY: 0,
    transformOrigin: 'top center',
    duration: 1.2,
    ease: 'power4.inOut',
    delay: 0.1,
  });

  // Fade in main content
  tl.fromTo(
    'main',
    { opacity: 0, filter: 'blur(8px)' },
    { opacity: 1, filter: 'blur(0px)', duration: 0.8, ease: 'power2.out' },
    '-=0.4'
  );

  // Handle link transitions (exit animation)
  document.addEventListener('click', (e: MouseEvent) => {
    const link = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href]');
    if (!link) return;
    
    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto')) return;
    
    e.preventDefault();

    gsap.to('main', {
      opacity: 0,
      filter: 'blur(8px)',
      duration: 0.4,
      ease: 'power2.in',
    });

    gsap.to(overlay, {
      scaleY: 1,
      transformOrigin: 'bottom center',
      duration: 0.6,
      ease: 'power4.inOut',
      onComplete: () => {
        window.location.href = href;
      },
    });
  });
}
