import { useEffect } from 'react';

// Ports the scroll progress bar logic from js/script.js
export default function useScrollProgress(ref) {
  useEffect(() => {
    const scrollProgress = ref.current;

    if (!scrollProgress) return undefined;

    const updateScrollProgress = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? window.scrollY / docHeight : 0;
      scrollProgress.style.transform = `scaleX(${Math.min(Math.max(progress, 0), 1)})`;
    };

    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    window.addEventListener('resize', updateScrollProgress);
    updateScrollProgress();

    return () => {
      window.removeEventListener('scroll', updateScrollProgress);
      window.removeEventListener('resize', updateScrollProgress);
    };
  }, [ref]);
}
