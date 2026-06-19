import { Link } from 'react-router-dom';
import useScrollReveal from '../hooks/useScrollReveal.js';
import '../styles/faq.css';

export default function FaqPage() {
  useScrollReveal();

  return (
    <div className="font-body-md text-body-md selection:bg-neon-lime selection:text-surface-deep bg-background text-on-background">
      <main>
        {/* Hero Section */}
        <section className="px-4 md:px-margin-desktop pt-24 pb-section-v-space max-w-container-max mx-auto relative overflow-hidden">
          <div className="max-w-4xl relative z-10">
            <div className="mb-stack-md">
              <span className="font-label-mono text-label-mono text-ink uppercase tracking-widest bg-surface-strong rounded-pill px-3 py-1">Support · 2026</span>
            </div>
            <h1 className="font-headline-display text-headline-display-mobile md:text-headline-display mb-stack-lg leading-tight">
              Answers <span className="font-italic-accent italic text-neon-lime">up front.</span>
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
              Transparency is the foundation of every successful partnership. Here are the clear details on how we build, bill, and deliver <span className="italic text-primary">high-performance</span> digital assets.
            </p>
          </div>
        </section>

        {/* Dynamic Marquee */}
        <div className="marquee-container bg-surface-elevated py-8 border-y border-subtle mb-section-v-space">
          <div className="marquee-content font-headline-lg text-headline-lg uppercase tracking-tighter flex gap-20">
            <span>Direct Access</span>
            <span className="text-neon-lime">No Junior Devs</span>
            <span>Fixed Pricing</span>
            <span className="text-on-surface-variant">Clean Code</span>
            <span>100 Lighthouse Scores</span>
            <span className="text-neon-lime">Global Remote</span>
            <span>Direct Access</span>
            <span className="text-neon-lime">No Junior Devs</span>
            <span>Fixed Pricing</span>
            <span className="text-on-surface-variant">Clean Code</span>
            <span>100 Lighthouse Scores</span>
            <span className="text-neon-lime">Global Remote</span>
          </div>
        </div>

        {/* FAQ Content Grid (Asymmetric) */}
        <section className="px-4 md:px-margin-desktop pb-section-v-space max-w-container-max mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
            {/* Left Column: Navigation/Category */}
            <div className="lg:col-span-3">
              <div className="sticky top-32 space-y-8">
                <div>
                  <h3 className="font-label-mono text-label-mono text-on-surface-variant uppercase mb-4">Categories</h3>
                  <ul className="space-y-4 font-headline-md text-headline-md">
                    <li><a className="hover:text-neon-lime transition-colors block" href="#pricing">Pricing</a></li>
                    <li><a className="hover:text-neon-lime transition-colors block" href="#timeline">Timeline</a></li>
                    <li><a className="hover:text-neon-lime transition-colors block" href="#stack">Stack</a></li>
                    <li><a className="hover:text-neon-lime transition-colors block" href="#delivery">Delivery</a></li>
                  </ul>
                </div>
                <div className="p-6 bg-surface-elevated border border-subtle rounded-xl">
                  <p className="font-body-md text-body-md mb-4 text-on-surface-variant">Still have questions? Let's skip the reading and jump on a call.</p>
                  <Link className="font-label-mono text-ink flex items-center gap-2 group" to="/#contact">
                    BOOK A BRIEFING <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Column: The Questions */}
            <div className="lg:col-span-9 space-y-24" data-reveal-group>
              {/* 01 Pricing */}
              <article className="group" id="pricing" data-reveal="up">
                <div className="flex gap-8 items-start">
                  <span className="font-label-mono text-on-tertiary-container text-4xl">01</span>
                  <div className="flex-1">
                    <h2 className="font-headline-lg text-headline-lg mb-stack-md group-hover:text-neon-lime transition-colors">What does a website at Wibify <span className="font-italic-accent italic">cost?</span></h2>
                    <div className="font-body-lg text-body-lg text-on-surface-variant space-y-4 max-w-3xl">
                      <p>At Wibify, we eliminate the uncertainty of hourly billing. We provide a <span className="text-primary font-semibold">fixed-price quote</span> immediately following our briefing call.</p>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                        <li className="p-6 bg-surface-elevated border border-subtle rounded-xl">
                          <span className="block font-label-mono text-ink mb-2">STARTERS</span>
                          <p className="text-primary font-headline-md text-headline-md">€1,490+</p>
                          <p className="text-sm mt-2">Marketing sites & landing pages built for conversion.</p>
                        </li>
                        <li className="p-6 bg-surface-elevated border border-subtle rounded-xl">
                          <span className="block font-label-mono text-ink mb-2">CUSTOM</span>
                          <p className="text-primary font-headline-md text-headline-md">Individual Scope</p>
                          <p className="text-sm mt-2">Complex SaaS, E-commerce, or custom internal tools.</p>
                        </li>
                      </ul>
                      <p className="text-sm pt-4 border-t border-subtle italic">No hidden costs, no setup fees, and zero licensing traps. You know exactly what you pay before we write the first line of code.</p>
                    </div>
                  </div>
                </div>
              </article>

              {/* 02 Timeline */}
              <article className="group" id="timeline" data-reveal="up">
                <div className="flex gap-8 items-start">
                  <span className="font-label-mono text-on-tertiary-container text-4xl">02</span>
                  <div className="flex-1">
                    <h2 className="font-headline-lg text-headline-lg mb-stack-md group-hover:text-neon-lime transition-colors">How long does a <span className="font-italic-accent italic">project</span> take?</h2>
                    <div className="font-body-lg text-body-lg text-on-surface-variant max-w-3xl">
                      <p>Speed is our competitive advantage, but quality remains non-negotiable. Our timelines are focused and milestone-driven:</p>
                      <div className="mt-8 space-y-4">
                        <div className="flex justify-between items-end border-b border-subtle pb-4">
                          <span>Marketing Website</span>
                          <span className="font-label-mono text-neon-lime">4–6 WEEKS</span>
                        </div>
                        <div className="flex justify-between items-end border-b border-subtle pb-4">
                          <span>Full Branding Identity</span>
                          <span className="font-label-mono text-neon-lime">6–8 WEEKS</span>
                        </div>
                        <div className="flex justify-between items-end border-b border-subtle pb-4">
                          <span>Software / SaaS MVP</span>
                          <span className="font-label-mono text-neon-lime">12+ WEEKS</span>
                        </div>
                      </div>
                      <p className="mt-6 text-sm italic">These timelines include research, strategy, high-fidelity design, development, and rigorous QA testing.</p>
                    </div>
                  </div>
                </div>
              </article>

              {/* 03 Stack */}
              <article className="group" id="stack" data-reveal="up">
                <div className="flex gap-8 items-start">
                  <span className="font-label-mono text-on-tertiary-container text-4xl">03</span>
                  <div className="flex-1">
                    <h2 className="font-headline-lg text-headline-lg mb-stack-md group-hover:text-neon-lime transition-colors">Which technologies <span className="font-italic-accent italic">do you use?</span></h2>
                    <div className="font-body-lg text-body-lg text-on-surface-variant max-w-3xl">
                      <p className="mb-8">We build on the bleeding edge of the web. No WordPress, no Wix, no technical debt. Our default high-performance stack includes:</p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="p-4 border border-subtle rounded-lg text-center hover:border-ink transition-colors">
                          <span className="block font-label-mono text-xs mb-1">FRONTEND</span>
                          <span className="text-primary font-semibold">Next.js 16</span>
                        </div>
                        <div className="p-4 border border-subtle rounded-lg text-center hover:border-ink transition-colors">
                          <span className="block font-label-mono text-xs mb-1">UI LIBRARY</span>
                          <span className="text-primary font-semibold">React 19</span>
                        </div>
                        <div className="p-4 border border-subtle rounded-lg text-center hover:border-ink transition-colors">
                          <span className="block font-label-mono text-xs mb-1">STYLING</span>
                          <span className="text-primary font-semibold">Tailwind 4</span>
                        </div>
                        <div className="p-4 border border-subtle rounded-lg text-center hover:border-ink transition-colors">
                          <span className="block font-label-mono text-xs mb-1">BACKEND</span>
                          <span className="text-primary font-semibold">Supabase</span>
                        </div>
                      </div>
                      <p className="mt-8">We leverage Headless CMS solutions like <span className="text-primary">Sanity</span> or <span className="text-primary">Payload</span> for content management, ensuring your site remains fast and your data remains portable.</p>
                    </div>
                  </div>
                </div>
              </article>

              {/* 04 Delivery */}
              <article className="group" id="delivery" data-reveal="up">
                <div className="flex gap-8 items-start">
                  <span className="font-label-mono text-on-tertiary-container text-4xl">04</span>
                  <div className="flex-1">
                    <h2 className="font-headline-lg text-headline-lg mb-stack-md group-hover:text-neon-lime transition-colors">Local presence or <span className="font-italic-accent italic">remote?</span></h2>
                    <div className="font-body-lg text-body-lg text-on-surface-variant max-w-3xl">
                      <p>Our team works <span className="text-primary">fully remote</span> — delivering AI automation projects for clients across the globe with a refined async-first workflow.</p>
                      <div className="relative mt-10 h-64 w-full bg-surface-elevated border border-subtle rounded-xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-500">
                        <div className="absolute inset-0 z-0">
                          <img className="w-full h-full object-cover" alt="Remote team collaboration" src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=900&q=80&fit=crop" />
                        </div>
                        <div className="absolute bottom-6 left-6 z-10 bg-surface-elevated/90 backdrop-blur p-4 border border-subtle rounded-lg">
                          <span className="block font-label-mono text-xs text-ink">LOCATION</span>
                          <span className="text-primary font-semibold">Remote-first · Global delivery</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </article>

              {/* 05 Team */}
              <article className="group" data-reveal="up">
                <div className="flex gap-8 items-start">
                  <span className="font-label-mono text-on-tertiary-container text-4xl">05</span>
                  <div className="flex-1">
                    <h2 className="font-headline-lg text-headline-lg mb-stack-md group-hover:text-neon-lime transition-colors">Who <span className="font-italic-accent italic">actually</span> builds the project?</h2>
                    <div className="font-body-lg text-body-lg text-on-surface-variant max-w-3xl">
                      <p>No handoffs. No outsourcing. No black-boxes.</p>
                      <p className="mt-4">Every AI system is built by our <span className="text-primary font-semibold">in-house specialists</span> — strategy, development, and deployment under one roof. To maintain quality, we only take on a <span className="text-primary underline decoration-ink">maximum of four</span> new projects per quarter.</p>
                      <div className="mt-8 flex items-center gap-6 p-6 bg-surface-elevated border border-subtle rounded-xl">
                        <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-ink flex items-center justify-center bg-[#a7e5d3]">
                          <span className="material-symbols-outlined text-3xl text-[#0c0a09]">person</span>
                        </div>
                        <div>
                          <span className="block text-primary font-semibold">Neuva AI Team</span>
                          <span className="block font-label-mono text-xs text-on-surface-variant">AI AUTOMATION SPECIALISTS</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </article>

              {/* 06 Ownership */}
              <article className="group" data-reveal="up">
                <div className="flex gap-8 items-start">
                  <span className="font-label-mono text-on-tertiary-container text-4xl">06</span>
                  <div className="flex-1">
                    <h2 className="font-headline-lg text-headline-lg mb-stack-md group-hover:text-neon-lime transition-colors">Do I own the <span className="font-italic-accent italic">source code?</span></h2>
                    <div className="font-body-lg text-body-lg text-on-surface-variant max-w-3xl">
                      <p className="mb-4">Absolutely. We don't believe in holding clients hostage through vendor lock-in or proprietary licensing traps.</p>
                      <p>Upon full payment, <span className="text-primary">100% exclusive usage rights</span> are transferred to you. The production repository is transferred to your organization on GitHub or GitLab, and you receive the full design system files (Figma).</p>
                      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="flex items-start gap-3">
                          <span className="material-symbols-outlined text-ink">code</span>
                          <div>
                            <span className="block text-primary font-semibold text-sm">Full Repo Access</span>
                            <span className="text-xs">GitHub / GitLab Transfer</span>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <span className="material-symbols-outlined text-ink">draw</span>
                          <div>
                            <span className="block text-primary font-semibold text-sm">Figma Assets</span>
                            <span className="text-xs">Original UI Components</span>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <span className="material-symbols-outlined text-ink">key</span>
                          <div>
                            <span className="block text-primary font-semibold text-sm">No Lock-in</span>
                            <span className="text-xs">Your data, your platform</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-surface-elevated border-y border-subtle py-section-v-space text-center px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="font-headline-lg text-headline-lg mb-stack-md">Ready to start your <span className="font-italic-accent italic text-ink">transformation?</span></h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-stack-lg">We're currently booking for Q3/Q4. Send us a short briefing and we'll reply within 24 hours.</p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Link className="btn-anim-border bg-ink text-on-ink px-10 py-5 rounded-sm font-medium text-title-md active:scale-95 transition-transform hover:bg-ink-active" to="/#contact">
                Send Briefing →
              </Link>
              <Link className="btn-anim-border border border-hairline-strong text-ink px-10 py-5 rounded-sm font-medium text-title-md active:scale-95 transition-transform hover:border-ink" to="/#top">
                View Work
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
