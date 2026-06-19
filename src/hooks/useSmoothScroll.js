import { useEffect } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

// Site-wide inertia scrolling. Native scroll position still updates,
// so IntersectionObserver reveals, scroll progress and parallax keep working.
export default function useSmoothScroll() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.matchMedia('(pointer: coarse)').matches;
    // Disable Lenis on mobile — native scroll is smoother on touch devices
    if (prefersReducedMotion || isMobile) return undefined;

    const lenis = new Lenis({
      duration: 0.9,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    // Route anchor clicks (e.g. /#contact) through Lenis for a consistent glide
    const onClick = (e) => {
      const anchor = e.target.closest('a[href^="#"]');
      if (!anchor) return;
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        lenis.scrollTo(target, { offset: -72 });
      }
    };
    document.addEventListener('click', onClick);

    return () => {
      document.removeEventListener('click', onClick);
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);
}
