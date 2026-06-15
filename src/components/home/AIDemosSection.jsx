import { lazy, Suspense } from 'react';
import ChatAgentDemo from './ChatAgentDemo.jsx';

// Lazy-load VoiceAgentDemo so the 513 kB Retell WebRTC bundle only
// downloads when the demos section actually renders.
const VoiceAgentDemo = lazy(() => import('./VoiceAgentDemo.jsx'));

function VoiceSkeleton() {
  return (
    <div className="flex flex-col gap-6 h-full animate-pulse">
      <div className="space-y-3">
        <div className="h-3 w-24 rounded bg-[#e7e5e4]" />
        <div className="h-6 w-56 rounded bg-[#e7e5e4]" />
        <div className="h-4 w-80 rounded bg-[#e7e5e4]" />
      </div>
      <div className="rounded-xl border border-hairline bg-[#fafafa]" style={{ height: 280 }} />
    </div>
  );
}

export default function AIDemosSection() {
  return (
    <section className="section" id="ai-agents">
      <div className="container">
        <p className="eyebrow" data-reveal="up">[02] AI Agents / Live Demos</p>
        <h2 className="section-title" data-reveal="up">Agents that <em className="serif accent">work</em>, not just chat.</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter mt-stack-lg" data-reveal-group>
          <div data-reveal="up">
            <ChatAgentDemo />
          </div>
          <div data-reveal="up">
            <Suspense fallback={<VoiceSkeleton />}>
              <VoiceAgentDemo />
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  );
}
