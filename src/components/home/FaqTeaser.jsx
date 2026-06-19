import { useState } from 'react';
import { Link } from 'react-router-dom';

const faqs = [
  {
    index: '01',
    question: 'What does a website at Wibify cost?',
    answer: "It depends on scope and complexity. A focused marketing site typically starts in the low four figures, while larger projects with custom software or e-commerce scale from there. After a short briefing call we'll send you a transparent, fixed-scope quote.",
  },
  {
    index: '02',
    question: 'How long does a project take?',
    answer: 'Most websites take 3–6 weeks from kickoff to launch, depending on the number of pages, content readiness and feedback loops. Larger software or app projects are scoped into milestones with their own timelines.',
  },
  {
    index: '03',
    question: 'Which technologies do you use?',
    answer: 'We build on a modern stack — Next.js and React on the frontend, headless CMS for content, and Node-based APIs on the backend. Everything is built performance-first and tested for a perfect Pagespeed score.',
  },
];

export default function FaqTeaser() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="section" id="faq">
      <div className="container">
        <p className="eyebrow" data-reveal="up">[FAQ] Frequently asked</p>
        <h2 className="section-title" data-reveal="up">Answers <em className="serif accent">up front</em>.</h2>

        <div className="faq-list" data-reveal-group>
          {faqs.map((faq, i) => (
            <div className={`faq-item${openIndex === i ? ' is-open' : ''}`} data-reveal="up" key={faq.index}>
              <button
                className="faq-question"
                aria-expanded={openIndex === i}
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <span><span className="faq-index">{faq.index}</span> {faq.question}</span>
                <span className="faq-chevron">⌄</span>
              </button>
              <div className="faq-answer">
                <div className="faq-answer-inner">
                  <p>{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Link to="/faq" className="link-arrow">Read the full FAQ <span className="arrow">→</span></Link>
      </div>
    </section>
  );
}
