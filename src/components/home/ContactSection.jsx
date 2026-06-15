import { useState } from 'react';

export default function ContactSection() {
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    event.target.reset();
    setIsSent(true);
    setTimeout(() => setIsSent(false), 2500);
  };

  return (
    <section className="section" id="contact">
      <div className="container">
        <p className="eyebrow" data-reveal="up">[07] Contact</p>
        <h2 className="section-title" data-reveal="up">Let's <em className="serif accent">talk</em>.</h2>

        <div className="contact-grid">
          <div className="contact-info" data-reveal="left">
            <p className="contact-lead">Tell us what you need and we'll show you how AI can transform your business.</p>
            <a href="mailto:contact@neuvasol.com" className="contact-link">
              <span className="contact-icon">✉</span> contact@neuvasol.com
            </a>
            <a href="tel:+4915754405511" className="contact-link">
              <span className="contact-icon">📞</span> +49 1575 4405511
            </a>
          </div>

          <form className="contact-form" id="contact-form" data-reveal="right" onSubmit={handleSubmit}>
            <p className="form-label">Briefing — send us a short brief</p>
            <div className="form-row">
              <div className="form-field">
                <label htmlFor="first-name">First name *</label>
                <input type="text" id="first-name" name="first-name" required />
              </div>
              <div className="form-field">
                <label htmlFor="last-name">Last name *</label>
                <input type="text" id="last-name" name="last-name" required />
              </div>
            </div>
            <div className="form-field">
              <label htmlFor="email">Email *</label>
              <input type="email" id="email" name="email" required />
            </div>
            <div className="form-field">
              <label htmlFor="message">Message optional</label>
              <textarea id="message" name="message" rows="4"></textarea>
            </div>
            <label className="form-checkbox">
              <input type="checkbox" name="consent" required />
              <span>I consent to the processing of my data according to the <a href="#privacy">privacy policy</a>.</span>
            </label>
            <button type="submit" className="btn btn-primary btn-block">
              {isSent ? 'Request sent ✓' : <>Send request <span className="arrow">→</span></>}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
