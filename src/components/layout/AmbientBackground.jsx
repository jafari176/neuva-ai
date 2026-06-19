import { useEffect, useRef } from 'react';

// Fixed full-viewport layer of slow-drifting pastel orbs that also
// translate at different speeds while scrolling, giving the page depth.
export default function AmbientBackground() {
  const layerRef = useRef(null);

  useEffect(() => {
    const layer = layerRef.current;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.matchMedia('(pointer: coarse)').matches;
    if (!layer || prefersReducedMotion || isMobile) return undefined;

    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        layer.style.setProperty('--ambient-scroll-slow', `${(y * -0.04).toFixed(1)}px`);
        layer.style.setProperty('--ambient-scroll-fast', `${(y * -0.09).toFixed(1)}px`);
        ticking = false;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="ambient-bg" ref={layerRef} aria-hidden="true">
      <div className="ambient-orb ambient-orb--mint" />
      <div className="ambient-orb ambient-orb--lavender" />
      <div className="ambient-orb ambient-orb--peach" />
    </div>
  );
}
