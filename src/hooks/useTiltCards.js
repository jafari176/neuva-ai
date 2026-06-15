import { useEffect } from 'react';

const MAX_TILT = 7; // degrees
const SCALE = 1.015;

// Gives any element with [data-tilt] a 3D perspective tilt that follows
// the cursor, plus a moving glare highlight via --tilt-glare-x/y.
// Delegated on document so it survives route changes and re-renders.
export default function useTiltCards() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
    if (prefersReducedMotion || isCoarsePointer) return undefined;

    let activeEl = null;
    let rafId = null;
    let pointerX = 0;
    let pointerY = 0;

    const applyTilt = () => {
      rafId = null;
      if (!activeEl) return;
      const rect = activeEl.getBoundingClientRect();
      const px = (pointerX - rect.left) / rect.width;
      const py = (pointerY - rect.top) / rect.height;
      const rotateY = (px - 0.5) * 2 * MAX_TILT;
      const rotateX = (0.5 - py) * 2 * MAX_TILT;
      activeEl.style.transform = `perspective(900px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale(${SCALE})`;
      activeEl.style.setProperty('--tilt-glare-x', `${(px * 100).toFixed(1)}%`);
      activeEl.style.setProperty('--tilt-glare-y', `${(py * 100).toFixed(1)}%`);
    };

    const onPointerMove = (e) => {
      const el = e.target.closest('[data-tilt]');

      if (el !== activeEl) {
        if (activeEl) {
          activeEl.style.transform = '';
          activeEl.classList.remove('is-tilting');
        }
        activeEl = el;
        if (activeEl) activeEl.classList.add('is-tilting');
      }

      if (!activeEl) return;
      pointerX = e.clientX;
      pointerY = e.clientY;
      if (rafId === null) rafId = requestAnimationFrame(applyTilt);
    };

    const reset = () => {
      if (activeEl) {
        activeEl.style.transform = '';
        activeEl.classList.remove('is-tilting');
        activeEl = null;
      }
    };

    document.addEventListener('pointermove', onPointerMove, { passive: true });
    document.documentElement.addEventListener('mouseleave', reset);

    return () => {
      document.removeEventListener('pointermove', onPointerMove);
      document.documentElement.removeEventListener('mouseleave', reset);
      if (rafId !== null) cancelAnimationFrame(rafId);
      reset();
    };
  }, []);
}
