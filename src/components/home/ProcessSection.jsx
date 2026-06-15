import useProcessProgress from '../../hooks/useProcessProgress.js';

export default function ProcessSection() {
  useProcessProgress();

  return (
    <section className="section" id="process">
      <div className="container process-grid">
        <div className="process-heading" data-reveal="left">
          <p className="eyebrow">[05] Process</p>
          <h2 className="section-title">From <em className="serif accent">discovery</em> to <em className="serif accent">scale</em>.</h2>
          <div className="process-progress" aria-hidden="true">
            <span className="process-progress-step">01</span>
            <div className="process-progress-track">
              <span className="process-progress-fill"></span>
            </div>
            <span className="process-progress-total">04</span>
          </div>
        </div>

        <div className="process-list" data-reveal-group>
          <div className="process-step" data-reveal="up">
            <span className="process-step-index">01 / 04</span>
            <h3 className="process-step-title">Discover</h3>
            <p className="process-step-text">We dig into your business — workflows, bottlenecks and goals. Out of that comes a roadmap for where AI can drive the biggest impact.</p>
            <ul className="process-step-tags">
              <li>Business Audit</li>
              <li>AI Opportunity Mapping</li>
              <li>Workflow Analysis</li>
              <li>Roadmap</li>
            </ul>
          </div>

          <div className="process-step" data-reveal="up">
            <span className="process-step-index">02 / 04</span>
            <h3 className="process-step-title">Build</h3>
            <p className="process-step-text">We design and build the AI systems — chatbots, voice agents, automations and integrations — tailored to your business.</p>
            <ul className="process-step-tags">
              <li>Chatbot & Voice Agents</li>
              <li>CRM Automations</li>
              <li>Custom Integrations</li>
              <li>Workflow Design</li>
            </ul>
          </div>

          <div className="process-step" data-reveal="up">
            <span className="process-step-index">03 / 04</span>
            <h3 className="process-step-title">Deploy</h3>
            <p className="process-step-text">We launch your AI systems into production, connect them to your existing tools and get your team up to speed.</p>
            <ul className="process-step-tags">
              <li>Testing & QA</li>
              <li>Team Onboarding</li>
              <li>Go-Live</li>
              <li>Data Migration</li>
            </ul>
          </div>

          <div className="process-step" data-reveal="up">
            <span className="process-step-index">04 / 04</span>
            <h3 className="process-step-title">Optimize</h3>
            <p className="process-step-text">We monitor performance around the clock, then fine-tune and scale your systems — always-on AI that keeps compounding revenue lift.</p>
            <ul className="process-step-tags">
              <li>Performance Monitoring</li>
              <li>A/B Testing</li>
              <li>Continuous Improvement</li>
              <li>Scaling</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
