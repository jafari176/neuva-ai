import { useEffect, useState } from 'react';

export default function PageLoader() {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const hide = () => {
      setFading(true);
      setTimeout(() => setVisible(false), 700);
    };

    if (document.readyState === 'complete') {
      // Already loaded — short delay so the loader is always visible at least briefly
      setTimeout(hide, 600);
    } else {
      window.addEventListener('load', () => setTimeout(hide, 400));
    }
  }, []);

  if (!visible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#f5f5f5',
        transition: 'opacity 0.7s ease',
        opacity: fading ? 0 : 1,
        pointerEvents: fading ? 'none' : 'all',
      }}
    >
      {/* Ambient orbs */}
      <div style={{
        position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none',
      }}>
        <div style={{
          position: 'absolute', top: '20%', left: '15%', width: 320, height: 320,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(167,229,211,0.35) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }} />
        <div style={{
          position: 'absolute', bottom: '20%', right: '15%', width: 280, height: 280,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(200,184,224,0.3) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }} />
        <div style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
          width: 200, height: 200, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(168,200,232,0.2) 0%, transparent 70%)',
          filter: 'blur(30px)',
        }} />
      </div>

      {/* Logo / wordmark */}
      <div style={{
        fontFamily: '"EB Garamond", serif',
        fontSize: 36,
        fontWeight: 300,
        color: '#0c0a09',
        letterSpacing: '-0.02em',
        marginBottom: 40,
        position: 'relative',
      }}>
        Neuva<em style={{ fontStyle: 'italic' }}>.</em>
      </div>

      {/* Animated bar */}
      <div style={{
        width: 120,
        height: 1,
        background: '#e7e5e4',
        borderRadius: 999,
        overflow: 'hidden',
        position: 'relative',
      }}>
        <div style={{
          position: 'absolute',
          top: 0, left: 0,
          height: '100%',
          width: '40%',
          background: '#0c0a09',
          borderRadius: 999,
          animation: 'neuva-loader-slide 1.1s ease-in-out infinite',
        }} />
      </div>

      <style>{`
        @keyframes neuva-loader-slide {
          0%   { left: -40%; }
          100% { left: 140%; }
        }
      `}</style>
    </div>
  );
}
