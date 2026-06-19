import { useState } from 'react';
import { Link } from 'react-router-dom';

const faqs = [
  {
    index: '01',
    question: 'What AI services does Neuva offer?',
    answer: 'We build Smart Chatbots, Voice Automation agents, Lead Generation pipelines, and Sales Recovery systems. Each solution is custom-built for your business and deployed within days.',
  },
  {
    index: '02',
    question: 'How long does implementation take?',
    answer: 'Most AI systems go live within 7–14 days. A chatbot or voice agent can be deployed in as little as 3 days. Larger multi-channel automations are scoped into milestones with clear timelines.',
  },
  {
    index: '03',
    question: 'Which platforms do you integrate with?',
    answer: 'We integrate with HubSpot, Salesforce, GoHighLevel, Pipedrive, Zapier, Make.com, Shopify, WordPress, and most CRMs via API. If you use a custom platform, we build a bespoke integration.',
  },
];

export default function FaqTeaser() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="section" id="faq">
      <div className="container">
        <p className="eyebrow" data-reveal="up">[FAQ] Frequently asked</p>
        <h2 className="section-title" data-reveal="up">Answers <em className="serif accent">up front</em>.</h2>

        <div className="faq-list" style={{ marginTop: 40 }}>
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={faq.index} className="faq-item" style={{ borderBottom: '1px solid var(--color-border)' }}>
                <button
                  className="faq-question"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    padding: '24px 0',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                    fontFamily: 'var(--font-display)',
                    fontSize: '18px',
                    fontWeight: 300,
                    color: 'var(--color-ink)',
                    gap: 16,
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <span style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--color-secondary)', letterSpacing: '0.08em', flexShrink: 0 }}>{faq.index}</span>
                    {faq.question}
                  </span>
                  <span style={{
                    display: 'inline-block',
                    flexShrink: 0,
                    fontSize: 18,
                    transition: 'transform 0.3s ease',
                    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    color: 'var(--color-secondary)',
                  }}>⌄</span>
                </button>

                <div style={{
                  overflow: 'hidden',
                  maxHeight: isOpen ? 300 : 0,
                  transition: 'max-height 0.35s ease',
                }}>
                  <p style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: 15,
                    lineHeight: 1.7,
                    color: 'var(--color-on-surface-variant)',
                    maxWidth: 600,
                    paddingBottom: 24,
                  }}>
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ marginTop: 40 }}>
          <Link to="/faq" className="link-arrow">Read the full FAQ <span className="arrow">→</span></Link>
        </div>
      </div>
    </section>
  );
}
