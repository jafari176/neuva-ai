import useScrollReveal from '../hooks/useScrollReveal.js';
import useAnimatedCounters from '../hooks/useAnimatedCounters.js';
import Hero from '../components/home/Hero.jsx';
import AIDemosSection from '../components/home/AIDemosSection.jsx';
import StatsBar from '../components/home/StatsBar.jsx';
import TechStackSection from '../components/home/TechStackSection.jsx';
import DisciplinesSection from '../components/home/DisciplinesSection.jsx';
import ProcessSection from '../components/home/ProcessSection.jsx';
import ContactSection from '../components/home/ContactSection.jsx';
import FaqTeaser from '../components/home/FaqTeaser.jsx';

export default function HomePage() {
  useScrollReveal();
  useAnimatedCounters();

  return (
    <main>
      <Hero />
      <AIDemosSection />
      <StatsBar />
      <TechStackSection />
      <DisciplinesSection />
      <ProcessSection />
      <ContactSection />
      <FaqTeaser />
    </main>
  );
}
