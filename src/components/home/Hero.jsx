import { useRef } from 'react';
import useHeroParallax from '../../hooks/useHeroParallax.js';

export default function Hero() {
  const heroRef = useRef(null);
  const splineInnerRef = useRef(null);

  useHeroParallax(heroRef, splineInnerRef);

  return (
    <section className="hero" ref={heroRef}>
      <div className="hero-spotlight" aria-hidden="true"></div>
      <div className="container hero-inner">
        <div className="hero-content" data-reveal-group>
          <p className="eyebrow" data-reveal="up">[01] AI-Powered Consulting OS</p>
          <h1 className="hero-title" data-reveal="up">
            We build the <em className="serif">AI systems</em> that <em className="serif accent">scale your revenue</em>.
          </h1>
          <p className="hero-text" data-reveal="up">
            Transform your business with intelligent automation. From chatbots to CRM, we design, build and deploy AI systems that scale your revenue.
          </p>
          <a href="#contact" className="btn btn-primary" data-reveal="up">Book a Consultation <span className="arrow">→</span></a>
        </div>
        <div className="hero-spline hero-spline--desktop" data-reveal="scale">
          <div className="hero-spline-inner" ref={splineInnerRef}>
            <spline-viewer url="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode" loading-anim-type="none"></spline-viewer>
          </div>
        </div>
      </div>
    </section>
  );
}
