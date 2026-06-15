import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const closeMenu = () => setIsOpen(false);

  const isHome = location.pathname === '/';
  const hash = location.hash;

  const isServicesActive = location.pathname.startsWith('/services');
  const isFaqActive = location.pathname.startsWith('/faq');
  const isWorkActive = isHome && (hash === '' || hash === '#work' || hash === '#top');
  const isProcessActive = isHome && hash === '#process';

  return (
    <header className="site-header" id="top">
      <div className="container header-inner">
        <Link to="/#top" className="logo" onClick={closeMenu}>NEUVA</Link>

        <nav className={`main-nav${isOpen ? ' is-open' : ''}`} id="main-nav">
          <Link to="/#top" className={`nav-link${isWorkActive ? ' is-active' : ''}`} onClick={closeMenu}>Work</Link>
          <Link to="/services" className={`nav-link${isServicesActive ? ' is-active' : ''}`} onClick={closeMenu}>Services</Link>
          <Link to="/#process" className={`nav-link${isProcessActive ? ' is-active' : ''}`} onClick={closeMenu}>Process</Link>
          <Link to="/faq" className={`nav-link${isFaqActive ? ' is-active' : ''}`} onClick={closeMenu}>FAQ</Link>
        </nav>

        <Link to="/#contact" className="btn btn-primary header-cta" onClick={closeMenu}>Get Started</Link>

        <button
          className={`nav-toggle${isOpen ? ' is-open' : ''}`}
          id="nav-toggle"
          aria-label="Toggle navigation"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span></span><span></span><span></span>
        </button>
      </div>
    </header>
  );
}
