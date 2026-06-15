import { Routes, Route } from 'react-router-dom';
import PageLoader from './components/layout/PageLoader.jsx';
import Header from './components/layout/Header.jsx';
import Footer from './components/layout/Footer.jsx';
import ScrollProgressBar from './components/layout/ScrollProgressBar.jsx';
import ScrollToHash from './components/layout/ScrollToHash.jsx';
import CursorGlow from './components/layout/CursorGlow.jsx';
import AmbientBackground from './components/layout/AmbientBackground.jsx';
import useSmoothScroll from './hooks/useSmoothScroll.js';
import useTiltCards from './hooks/useTiltCards.js';
import useMagneticButtons from './hooks/useMagneticButtons.js';
import HomePage from './pages/HomePage.jsx';
import ServicesPage from './pages/ServicesPage.jsx';
import FaqPage from './pages/FaqPage.jsx';

export default function App() {
  useSmoothScroll();
  useTiltCards();
  useMagneticButtons();

  return (
    <>
      <PageLoader />
      <ScrollToHash />
      <ScrollProgressBar />
      <AmbientBackground />
      <CursorGlow />
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/faq" element={<FaqPage />} />
      </Routes>
      <Footer />
    </>
  );
}
