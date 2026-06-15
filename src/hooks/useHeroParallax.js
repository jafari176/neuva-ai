import { useEffect } from 'react';

// Ports the hero Spline parallax logic from js/script.js
export default function useHeroParallax(heroRef, splineInnerRef) {
  useEffect(() => {
    const heroSection = heroRef.current;
    const heroSplineInner = splineInnerRef.current;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!heroSection || !heroSplineInner || prefersReducedMotion) return undefined;

    let parallaxTicking = false;

    const updateHeroParallax = () => {
      const rect = heroSection.getBoundingClientRect();
      const total = rect.height + window.innerHeight;
      const progress = Math.min(Math.max((window.innerHeight - rect.top) / total, 0), 1);
      const offset = (progress - 0.5) * 60;
      heroSplineInner.style.transform = `translateY(${offset}px)`;
      parallaxTicking = false;
    };

    const onScroll = () => {
      if (!parallaxTicking) {
        requestAnimationFrame(updateHeroParallax);
        parallaxTicking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    updateHeroParallax();

    return () => window.removeEventListener('scroll', onScroll);
  }, [heroRef, splineInnerRef]);
}
