import { useRef } from 'react';
import useCursorGlow from '../../hooks/useCursorGlow.js';

export default function CursorGlow() {
  const glowRef = useRef(null);
  const ringRef = useRef(null);
  useCursorGlow(glowRef, ringRef);

  return (
    <>
      <div className="cursor-glow" ref={glowRef} aria-hidden="true" />
      <div className="cursor-ring" ref={ringRef} aria-hidden="true" />
    </>
  );
}
