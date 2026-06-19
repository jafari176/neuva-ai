export default function DisciplinesSection() {
  return (
    <section className="section" id="services">
      <div className="container">
        <p className="eyebrow" data-reveal="up">[04] What we build</p>
        <h2 className="section-title" data-reveal="up">Four <em className="serif accent">AI systems</em>. One platform.</h2>

        <div className="discipline-grid" data-reveal-group>
          <article className="discipline-card" data-reveal="up">
            <div className="discipline-media" data-tilt>
              <img src="/assets/service-chatbot.jpg" alt="Smart Chatbots" />
            </div>
            <span className="discipline-index">01</span>
            <h3 className="discipline-title">Smart Chatbots</h3>
            <p className="discipline-text">AI-powered conversational agents that engage customers 24/7 and drive conversions.</p>
          </article>

          <article className="discipline-card" data-reveal="up">
            <div className="discipline-media" data-tilt>
              <img src="/assets/service-voice.jpg" alt="Voice Automation" />
            </div>
            <span className="discipline-index">02</span>
            <h3 className="discipline-title">Voice Automation</h3>
            <p className="discipline-text">Intelligent voice solutions that handle calls, qualify leads, and book appointments.</p>
          </article>

          <article className="discipline-card" data-reveal="up">
            <div className="discipline-media" data-tilt>
              <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80&fit=crop" alt="Lead Generation" />
            </div>
            <span className="discipline-index">03</span>
            <h3 className="discipline-title">Lead Generation</h3>
            <p className="discipline-text">Automated pipelines that capture, score, and nurture leads at scale.</p>
          </article>

          <article className="discipline-card" data-reveal="up">
            <div className="discipline-media" data-tilt>
              <img src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80&fit=crop" alt="Sales Recovery" />
            </div>
            <span className="discipline-index">04</span>
            <h3 className="discipline-title">Sales Recovery</h3>
            <p className="discipline-text">Win back lost opportunities with AI-driven follow-ups and re-engagement.</p>
          </article>
        </div>
      </div>
    </section>
  );
}
