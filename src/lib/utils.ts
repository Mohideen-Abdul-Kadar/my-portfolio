/**
 * Shared animation and DOM utilities
 */

/** Check if the user prefers reduced motion */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** Clamp a value between min and max */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/** Map a value from one range to another */
export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}

/** Linear interpolation */
export function lerp(start: number, end: number, factor: number): number {
  return start + (end - start) * factor;
}

/** Debounce utility */
export function debounce<T extends (...args: unknown[]) => void>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

/** Split text into individual character spans */
export function splitTextToChars(element: HTMLElement): HTMLSpanElement[] {
  const text = element.textContent || '';
  element.textContent = '';
  return text.split('').map((char) => {
    const span = document.createElement('span');
    span.textContent = char === ' ' ? '\u00A0' : char;
    span.style.display = 'inline-block';
    span.style.overflow = 'hidden';
    element.appendChild(span);
    return span;
  });
}

/** Split text into word spans */
export function splitTextToWords(element: HTMLElement): HTMLSpanElement[] {
  const text = element.textContent || '';
  element.textContent = '';
  return text.split(' ').map((word, i, arr) => {
    const span = document.createElement('span');
    span.textContent = i < arr.length - 1 ? word + ' ' : word;
    span.style.display = 'inline-block';
    span.style.overflow = 'hidden';
    element.appendChild(span);
    return span;
  });
}

/** Generate stagger delays array */
export function staggerDelay(count: number, base: number = 0.05): number[] {
  return Array.from({ length: count }, (_, i) => i * base);
}
