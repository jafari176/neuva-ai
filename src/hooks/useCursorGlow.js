import { useEffect } from 'react';

const INTERACTIVE = 'a, button, [role="button"], input, textarea, label, select, [data-tilt]';

// Smoothly trails the cursor with eased lag, used by CursorGlow.
// Drives both the soft glow (slow lerp) and the precision ring (fast lerp);
// the ring expands while hovering interactive elements.
export default function useCursorGlow(glowRef, ringRef) {
  useEffect(() => {
    const glow = glowRef.current;
    const ring = ringRef ? ringRef.current : null;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!glow || prefersReducedMotion) return undefined;

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let glowX = targetX;
    let glowY = targetY;
    let ringX = targetX;
    let ringY = targetY;
    let rafId;
    let visible = false;
    let ringScale = 1;
    let targetRingScale = 1;

    const onMouseMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!visible) {
        glow.style.opacity = '1';
        if (ring) ring.style.opacity = '1';
        visible = true;
      }
      if (ring && e.target instanceof Element) {
        targetRingScale = e.target.closest(INTERACTIVE) ? 2.4 : 1;
      }
    };

    const onMouseLeave = () => {
      glow.style.opacity = '0';
      if (ring) ring.style.opacity = '0';
      visible = false;
    };

    const tick = () => {
      glowX += (targetX - glowX) * 0.08;
      glowY += (targetY - glowY) * 0.08;
      glow.style.transform = `translate3d(${glowX}px, ${glowY}px, 0) translate(-50%, -50%)`;

      if (ring) {
        ringX += (targetX - ringX) * 0.22;
        ringY += (targetY - ringY) * 0.22;
        ringScale += (targetRingScale - ringScale) * 0.15;
        ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%) scale(${ringScale.toFixed(3)})`;
      }

      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.documentElement.addEventListener('mouseleave', onMouseLeave);
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.documentElement.removeEventListener('mouseleave', onMouseLeave);
      cancelAnimationFrame(rafId);
    };
  }, [glowRef, ringRef]);
}
