import { useEffect } from 'react';

const PULL = 0.3; // fraction of cursor offset the button follows
const SELECTOR = '.btn, .btn-anim-border, .social-icon, .nav-toggle';

// Buttons gently follow the cursor while hovered and spring back on leave.
// Delegated on document so it survives route changes and re-renders.
export default function useMagneticButtons() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
    if (prefersReducedMotion || isCoarsePointer) return undefined;

    let activeEl = null;
    let rafId = null;
    let pointerX = 0;
    let pointerY = 0;

    const applyPull = () => {
      rafId = null;
      if (!activeEl) return;
      const rect = activeEl.getBoundingClientRect();
      const dx = pointerX - (rect.left + rect.width / 2);
      const dy = pointerY - (rect.top + rect.height / 2);
      activeEl.style.transform = `translate(${(dx * PULL).toFixed(1)}px, ${(dy * PULL).toFixed(1)}px)`;
    };

    const release = (el) => {
      el.style.transition = 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)';
      el.style.transform = '';
      setTimeout(() => {
        el.style.transition = '';
      }, 450);
    };

    const onPointerMove = (e) => {
      const el = e.target.closest(SELECTOR);

      if (el !== activeEl) {
        if (activeEl) release(activeEl);
        activeEl = el;
        if (activeEl) activeEl.style.transition = 'transform 0.1s ease-out';
      }

      if (!activeEl) return;
      pointerX = e.clientX;
      pointerY = e.clientY;
      if (rafId === null) rafId = requestAnimationFrame(applyPull);
    };

    const reset = () => {
      if (activeEl) {
        release(activeEl);
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
