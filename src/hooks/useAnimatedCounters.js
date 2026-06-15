import { useEffect } from 'react';

// Ports the animated stat counter logic from js/script.js
export default function useAnimatedCounters() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion || !('IntersectionObserver' in window)) return undefined;

    const animateStatValue = (el) => {
      const text = el.textContent.trim();
      const match = text.match(/^([\d.]+)(.*)$/);

      if (!match) return;

      const [, numStr, suffix] = match;
      const target = parseFloat(numStr);
      const decimals = (numStr.split('.')[1] || '').length;
      const duration = 1400;
      const start = performance.now();

      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = (target * eased).toFixed(decimals) + suffix;

        if (progress < 1) {
          requestAnimationFrame(tick);
        } else {
          el.textContent = numStr + suffix;
        }
      };

      requestAnimationFrame(tick);
    };

    const statObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateStatValue(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    document.querySelectorAll('.stat-value').forEach((el) => statObserver.observe(el));

    return () => statObserver.disconnect();
  }, []);
}
