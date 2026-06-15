import { useEffect } from 'react';

// Ports the scroll-triggered reveal animation from js/script.js
export default function useScrollReveal(deps = []) {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    document.querySelectorAll('[data-reveal-group]').forEach((group) => {
      Array.from(group.children).forEach((child, index) => {
        if (child.hasAttribute('data-reveal')) {
          child.style.setProperty('--reveal-index', index);
        }
      });
    });

    const revealEls = document.querySelectorAll('[data-reveal]');

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      revealEls.forEach((el) => el.classList.add('is-visible'));
      return undefined;
    }

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -10% 0px',
    });

    revealEls.forEach((el) => revealObserver.observe(el));

    return () => revealObserver.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
