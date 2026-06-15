import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Link to="/#top" className="logo accent">NEUVA</Link>
          <p>AI-Powered<br />Consulting <strong>OS</strong>.</p>
          <div className="social-links">
            <a href="#" aria-label="LinkedIn" className="social-icon">LI</a>
            <a href="#" aria-label="Instagram" className="social-icon">IG</a>
          </div>
        </div>

        <div className="footer-col">
          <p className="footer-heading">Sitemap</p>
          <Link to="/#top">Work</Link>
          <Link to="/services">Services</Link>
          <Link to="/#process">Process</Link>
          <Link to="/faq">FAQ</Link>
        </div>

        <div className="footer-col">
          <p className="footer-heading">Legal</p>
          <a href="#imprint">Imprint</a>
          <a href="#privacy">Privacy</a>
          <a href="#terms">Terms</a>
        </div>

        <div className="footer-col">
          <p className="footer-heading">Studio</p>
          <p>Weidenstraße 58<br />46395 Bocholt</p>
          <p className="accent mono-sm">51.8336° N · 6.6131° E</p>
        </div>
      </div>

      <div className="container footer-bottom">
        <p>© 2026 Neuva Solutions. All rights reserved.</p>
        <p>Built in Germany</p>
      </div>
    </footer>
  );
}
