import { useEffect, useRef, useState, useCallback } from 'react';
import { RetellWebClient } from 'retell-client-js-sdk';
import '../../styles/ai-demos.css';

const R = 110; // orbit radius from center
const NODE_SIZE = 56; // px (w-14 h-14)
const HUB_SIZE = 96;

// Angles for 4 nodes: top, right, bottom, left
const ANGLES = [-90, 0, 90, 180]; // degrees

const agents = [
  {
    id: 'sales',
    agentKey: 'sales',
    name: 'Aria',
    role: 'Sales Specialist',
    icon: 'payments',
    color: '#a7e5d3',
    description: 'Qualifies your leads, handles objections, and books discovery calls — powered by real AI.',
  },
  {
    id: 'support',
    agentKey: 'support',
    name: 'Max',
    role: 'Technical Support',
    icon: 'support_agent',
    color: '#c8b8e0',
    description: 'Resolves technical questions about integrations, CRM setup, and platform capabilities.',
  },
  {
    id: 'booking',
    agentKey: 'booking',
    name: 'Sophie',
    role: 'Appointment Specialist',
    icon: 'calendar_month',
    color: '#f4c5a8',
    description: 'Books your free 30-minute strategy session with the Neuva AI team — fast and effortless.',
  },
  {
    id: 'demo',
    agentKey: 'demo',
    name: 'Nova',
    role: 'AI Demo Guide',
    icon: 'auto_awesome',
    color: '#a8c8e8',
    description: 'Nova IS the demo — experience first-hand what a real AI voice agent sounds and feels like.',
  },
];

function deg2rad(d) { return (d * Math.PI) / 180; }

function formatDuration(s) {
  return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
}

function SpeakingWave({ active }) {
  return (
    <div className="flex items-end gap-0.5 h-4">
      {[1, 2, 3, 4, 3, 2, 1].map((h, i) => (
        <div
          key={i}
          className="w-0.5 rounded-full bg-current"
          style={{
            height: active ? `${h * 4}px` : '2px',
            animation: active ? `wave-bar 0.7s ease-in-out ${i * 60}ms infinite alternate` : 'none',
            transition: 'height 0.15s',
          }}
        />
      ))}
    </div>
  );
}

export default function VoiceAgentDemo() {
  const [activeId, setActiveId] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);
  const [callState, setCallState] = useState('idle'); // idle | requesting | connecting | active | error
  const [callSeconds, setCallSeconds] = useState(0);
  const [agentTalking, setAgentTalking] = useState(false);
  const [userTalking, setUserTalking] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const clientRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => () => { clientRef.current?.stopCall(); clearInterval(timerRef.current); }, []);

  useEffect(() => {
    if (callState === 'active') {
      timerRef.current = setInterval(() => setCallSeconds((s) => s + 1), 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [callState]);

  const endCall = useCallback((resetAgent = true) => {
    clientRef.current?.stopCall();
    clientRef.current = null;
    setCallState('idle');
    setCallSeconds(0);
    setAgentTalking(false);
    setUserTalking(false);
    if (resetAgent) setActiveId(null);
  }, []);

  const [isMuted, setIsMuted] = useState(false);

  const startCall = useCallback(async (agentId) => {
    setActiveId(agentId);
    setCallState('requesting');
    setCallSeconds(0);
    setErrorMsg('');
    setIsMuted(false);
    const agent = agents.find((a) => a.id === agentId);
    try {
      // Explicitly request mic permission first so the browser prompt is clear
      await navigator.mediaDevices.getUserMedia({ audio: true });

      const res = await fetch('/api/retell-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ agentKey: agent?.agentKey || 'sales' }),
      });
      if (!res.ok) {
        const { error } = await res.json().catch(() => ({}));
        throw new Error(error || `Token request failed (${res.status})`);
      }
      const { access_token } = await res.json();
      const retell = new RetellWebClient();
      clientRef.current = retell;
      retell.on('call_started', () => setCallState('active'));
      retell.on('call_ended', () => endCall(false));
      retell.on('agent_start_talking', () => setAgentTalking(true));
      retell.on('agent_stop_talking', () => setAgentTalking(false));
      retell.on('user_start_talking', () => setUserTalking(true));
      retell.on('user_stop_talking', () => setUserTalking(false));
      retell.on('error', (err) => {
        setErrorMsg(err?.message || 'Call error. Please try again.');
        endCall(false);
        setCallState('error');
      });
      setCallState('connecting');
      await retell.startCall({ accessToken: access_token });
    } catch (err) {
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        setErrorMsg('Microphone access denied. Please allow mic access in your browser and try again.');
      } else {
        setErrorMsg(err.message || 'Could not start call. Please try again.');
      }
      setCallState('error');
      setActiveId(null);
    }
  }, [endCall]);

  const toggleMute = useCallback(() => {
    if (!clientRef.current) return;
    if (isMuted) {
      clientRef.current.unmute();
      setIsMuted(false);
    } else {
      clientRef.current.mute();
      setIsMuted(true);
    }
  }, [isMuted]);

  const inCall = callState !== 'idle' && callState !== 'error';
  const focusedId = activeId || hoveredId;
  const focusedAgent = agents.find((a) => a.id === focusedId);

  // Canvas size: hub center + orbit radius + node half-size on each side
  const CANVAS = (R + NODE_SIZE / 2) * 2;
  const CX = CANVAS / 2;
  const CY = CANVAS / 2;

  return (
    <div className="flex flex-col gap-6 h-full">
      <div>
        <span className="font-label-mono text-label-mono text-ink uppercase tracking-widest">Voice Agent</span>
        <h3 className="font-headline-md text-headline-md mt-3 mb-3 text-on-background">Voice that picks up the phone.</h3>
        <p className="font-body-md text-body-md text-on-surface-variant max-w-md">
          Real AI voice calls — right in your browser. Click a node to speak with that agent.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row items-center gap-6">
        {/* Orbital canvas */}
        <div className="relative shrink-0" style={{ width: CANVAS, height: CANVAS }}>
          {/* Orbit ring — hidden on mobile via CSS */}
          <div
            className="absolute rounded-full orbital-path ambient-rotation pointer-events-none orbital-ring-desktop"
            style={{ width: R * 2, height: R * 2, top: CY - R, left: CX - R }}
          />

          {/* Central hub */}
          <div
            className="absolute flex items-center justify-center rounded-full z-20"
            style={{ width: HUB_SIZE, height: HUB_SIZE, top: CY - HUB_SIZE / 2, left: CX - HUB_SIZE / 2 }}
          >
            <div className="absolute inset-0 rounded-full core-glow ai-animate-orb pointer-events-none" />
            <div
              className="relative w-full h-full rounded-full border-2 flex flex-col items-center justify-center gap-1 bg-white/60 backdrop-blur-xl transition-all duration-500"
              style={{
                borderColor: focusedAgent ? `${focusedAgent.color}aa` : '#e7e5e4',
                boxShadow: inCall ? `0 0 60px ${focusedAgent?.color}80` : focusedAgent ? `0 0 32px ${focusedAgent.color}40` : 'none',
              }}
            >
              <span className="material-symbols-outlined text-2xl text-[#0c0a09] transition-all duration-300">
                {callState === 'active' ? 'graphic_eq' : inCall ? 'call' : focusedAgent?.icon || 'settings_input_antenna'}
              </span>
              <span className="font-medium text-[7px] tracking-[0.18em] uppercase text-[#777169] transition-colors duration-300">
                {callState === 'requesting' ? 'Requesting' : callState === 'connecting' ? 'Connecting' : callState === 'active' ? 'On Call' : focusedAgent?.name || 'Ready'}
              </span>
            </div>
          </div>

          {/* Agent nodes */}
          {agents.map((agent, i) => {
            const angle = deg2rad(ANGLES[i]);
            // When this node is active, pull it to center; otherwise place on orbit
            const isActive = activeId === agent.id;
            const nx = isActive ? CX : CX + R * Math.cos(angle);
            const ny = isActive ? CY : CY + R * Math.sin(angle);

            return (
              <div
                key={agent.id}
                className={`absolute flex items-center justify-center rounded-full cursor-pointer z-10 ai-glass transition-all duration-500 ${
                  isActive ? 'opacity-0 pointer-events-none scale-75' : 'hover:scale-110 active:scale-95'
                }`}
                style={{
                  width: NODE_SIZE,
                  height: NODE_SIZE,
                  left: nx - NODE_SIZE / 2,
                  top: ny - NODE_SIZE / 2,
                  borderColor: hoveredId === agent.id ? `${agent.color}bb` : undefined,
                  boxShadow: hoveredId === agent.id ? `0 0 16px ${agent.color}50` : undefined,
                }}
                onMouseEnter={() => !inCall && setHoveredId(agent.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => {
                  if (!inCall) startCall(agent.id);
                }}
              >
                <span className="material-symbols-outlined text-xl text-[#0c0a09]">{agent.icon}</span>
              </div>
            );
          })}
        </div>

        {/* Detail card */}
        <div className="w-full lg:flex-1">
          <div
            className="ai-glass rounded-xl p-5 transition-all duration-300"
            style={{ borderColor: focusedAgent ? `${focusedAgent.color}aa` : undefined }}
          >
            {focusedAgent ? (
              <>
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center border transition-colors duration-300"
                    style={{ borderColor: `${focusedAgent.color}aa`, backgroundColor: `${focusedAgent.color}33` }}
                  >
                    <span className="material-symbols-outlined text-lg text-[#0c0a09]">{focusedAgent.icon}</span>
                  </div>
                  <div>
                    <div className="font-semibold text-on-background">{focusedAgent.name}</div>
                    <div className="text-xs text-on-surface-variant">{focusedAgent.role}</div>
                  </div>
                </div>

                {/* Status */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-widest text-secondary">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: callState === 'active' && activeId === focusedAgent.id ? '#22c55e' : focusedAgent.color }} />
                    {activeId === focusedAgent.id && callState === 'requesting' && 'Requesting…'}
                    {activeId === focusedAgent.id && callState === 'connecting' && 'Connecting…'}
                    {activeId === focusedAgent.id && callState === 'active' && `On call · ${formatDuration(callSeconds)}`}
                    {activeId === focusedAgent.id && callState === 'error' && 'Call ended'}
                    {activeId !== focusedAgent.id && 'Available'}
                  </div>
                  {callState === 'active' && activeId === focusedAgent.id && (
                    <div className="flex items-center gap-3 text-[10px] text-secondary">
                      <div className="flex items-center gap-1" style={{ color: agentTalking ? '#0c0a09' : '#a8a29e' }}>
                        <SpeakingWave active={agentTalking} /><span>AI</span>
                      </div>
                      <div className="flex items-center gap-1" style={{ color: userTalking ? '#0c0a09' : '#a8a29e' }}>
                        <SpeakingWave active={userTalking} /><span>You</span>
                      </div>
                    </div>
                  )}
                </div>

                <p className="text-sm text-on-surface-variant mb-4">{focusedAgent.description}</p>

                {callState === 'error' && activeId === focusedAgent.id && errorMsg && (
                  <p className="text-xs text-red-500 mb-3 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{errorMsg}</p>
                )}

                <div className="pt-3 border-t border-hairline space-y-2">
                  {/* Not this agent's call */}
                  {activeId !== focusedAgent.id && (
                    <button
                      type="button"
                      disabled={inCall}
                      className="w-full flex items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-semibold text-[#0c0a09] transition-all duration-200 active:scale-95 hover:brightness-95 disabled:opacity-40"
                      style={{ backgroundColor: focusedAgent.color }}
                      onClick={() => startCall(focusedAgent.id)}
                    >
                      <span className="material-symbols-outlined text-base">call</span>
                      Call {focusedAgent.name}
                    </button>
                  )}

                  {/* This agent — connecting / requesting */}
                  {activeId === focusedAgent.id && (callState === 'requesting' || callState === 'connecting') && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-center gap-1.5 py-2 text-sm text-secondary">
                        <span className="connecting-dot">●</span>
                        <span className="connecting-dot" style={{ animationDelay: '0.2s' }}>●</span>
                        <span className="connecting-dot" style={{ animationDelay: '0.4s' }}>●</span>
                        <span className="ml-1">{callState === 'requesting' ? 'Requesting…' : 'Connecting…'}</span>
                      </div>
                      <button
                        type="button"
                        className="w-full flex items-center justify-center gap-2 rounded-lg border border-hairline-strong py-2.5 text-sm font-semibold text-on-background hover:border-red-400/50 hover:text-red-400 transition-colors duration-300"
                        onClick={() => endCall(true)}
                      >
                        Cancel
                      </button>
                    </div>
                  )}

                  {/* This agent — active */}
                  {activeId === focusedAgent.id && callState === 'active' && (
                    <div className="flex gap-2">
                      <button
                        type="button"
                        className={`flex items-center justify-center gap-1.5 rounded-lg px-4 py-2.5 text-sm font-semibold transition-all duration-200 active:scale-95 border ${isMuted ? 'bg-amber-50 border-amber-300 text-amber-700' : 'border-hairline-strong text-on-background hover:border-ink/40'}`}
                        onClick={toggleMute}
                        title={isMuted ? 'Unmute' : 'Mute'}
                      >
                        <span className="material-symbols-outlined text-base">{isMuted ? 'mic_off' : 'mic'}</span>
                        {isMuted ? 'Muted' : 'Mute'}
                      </button>
                      <button
                        type="button"
                        className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-red-500 py-2.5 text-sm font-semibold text-white transition-all duration-200 active:scale-95 hover:bg-red-600"
                        onClick={() => endCall(true)}
                      >
                        <span className="material-symbols-outlined text-base">call_end</span>
                        End Call
                      </button>
                    </div>
                  )}

                  {/* Error state */}
                  {activeId === focusedAgent.id && callState === 'error' && (
                    <button
                      type="button"
                      className="w-full flex items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-semibold text-[#0c0a09] transition-all duration-200 active:scale-95 hover:brightness-95"
                      style={{ backgroundColor: focusedAgent.color }}
                      onClick={() => startCall(focusedAgent.id)}
                    >
                      <span className="material-symbols-outlined text-base">call</span>
                      Try Again
                    </button>
                  )}

                  {(activeId !== focusedAgent.id || callState === 'idle') && (
                    <p className="text-center text-[10px] text-secondary">
                      Microphone access required · No phone needed
                    </p>
                  )}
                </div>
              </>
            ) : (
              /* Default state — nothing hovered/active */
              <div className="flex flex-col items-center justify-center py-8 text-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#f0efed] flex items-center justify-center">
                  <span className="material-symbols-outlined text-2xl text-secondary">settings_input_antenna</span>
                </div>
                <div>
                  <div className="font-semibold text-on-background mb-1">4 AI Voice Agents</div>
                  <p className="text-sm text-secondary">Hover a node to preview · Click to start a real call</p>
                </div>
                <div className="flex gap-2 flex-wrap justify-center mt-2">
                  {agents.map((a) => (
                    <span key={a.id} className="text-xs px-2.5 py-1 rounded-full border border-hairline" style={{ color: a.color, borderColor: `${a.color}80` }}>
                      {a.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
