import { useEffect, useRef, useState, useCallback } from 'react';
import '../../styles/ai-demos.css';

const PERSONAS = [
  {
    key: 'sales',
    name: 'Aria',
    role: 'Sales Specialist',
    icon: 'payments',
    color: '#a7e5d3',
    greeting: "Hi! I'm Aria, Neuva AI's sales specialist. I can help you understand our services, pricing, and ROI. What's your biggest automation challenge right now?",
    suggestions: [
      'What services does Neuva offer?',
      'How much does a chatbot cost?',
      'What ROI can I expect?',
      'Can you integrate with HubSpot?',
    ],
  },
  {
    key: 'support',
    name: 'Max',
    role: 'Technical Support',
    icon: 'support_agent',
    color: '#c8b8e0',
    greeting: "Hey! I'm Max, Neuva AI's technical support specialist. I can walk you through setup, integrations, and any platform questions. What do you need help with?",
    suggestions: [
      'How do I install the chat widget?',
      'Which CRMs do you support?',
      'How do I connect Zapier?',
      'How long does setup take?',
    ],
  },
  {
    key: 'booking',
    name: 'Sophie',
    role: 'Appointment Specialist',
    icon: 'calendar_month',
    color: '#f4c5a8',
    greeting: "Hello! I'm Sophie from the Neuva AI team. I'd love to help you schedule a free strategy session with our experts. What kind of AI automation are you exploring?",
    suggestions: [
      'Book a free strategy call',
      'What happens on the call?',
      'Is there any cost?',
      'When are you available?',
    ],
  },
  {
    key: 'demo',
    name: 'Nova',
    role: 'AI Demo Guide',
    icon: 'auto_awesome',
    color: '#a8c8e8',
    greeting: "Welcome! I'm Nova — and I'm actually the product you're looking at. Right now you're experiencing what we can build for your business. Ask me anything about our AI agents!",
    suggestions: [
      'How does this chatbot work?',
      'How fast can you build one?',
      'Can it handle 1000s of users?',
      'What AI model powers this?',
    ],
  },
];

function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="flex items-center gap-1 px-4 py-3 rounded-2xl rounded-tl-none bg-[#f0efed] border border-hairline">
        <span className="w-1.5 h-1.5 rounded-full bg-[#a8a29e] animate-bounce [animation-delay:0ms]" />
        <span className="w-1.5 h-1.5 rounded-full bg-[#a8a29e] animate-bounce [animation-delay:150ms]" />
        <span className="w-1.5 h-1.5 rounded-full bg-[#a8a29e] animate-bounce [animation-delay:300ms]" />
      </div>
    </div>
  );
}

export default function ChatAgentDemo() {
  const [activePersonaKey, setActivePersonaKey] = useState('sales');
  const persona = PERSONAS.find((p) => p.key === activePersonaKey);

  const [messages, setMessages] = useState([{ role: 'assistant', content: persona.greeting }]);
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState(null);
  const bottomRef = useRef(null);
  const messagesRef = useRef(null);
  const inputRef = useRef(null);
  const abortRef = useRef(null);

  // Switch persona — reset conversation
  const switchPersona = useCallback((key) => {
    if (key === activePersonaKey || isStreaming) return;
    abortRef.current?.abort();
    const p = PERSONAS.find((x) => x.key === key);
    setActivePersonaKey(key);
    setMessages([{ role: 'assistant', content: p.greeting }]);
    setInput('');
    setError(null);
    setIsStreaming(false);
    setTimeout(() => inputRef.current?.focus(), 100);
  }, [activePersonaKey, isStreaming]);

  useEffect(() => {
    // Scroll only the messages container, never the page
    const el = messagesRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, isStreaming]);

  const sendMessage = useCallback(async (text) => {
    const trimmed = (text || input).trim();
    if (!trimmed || isStreaming) return;

    setInput('');
    setError(null);

    const userMessage = { role: 'user', content: trimmed };
    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setIsStreaming(true);

    setMessages((prev) => [...prev, { role: 'assistant', content: '', streaming: true }]);

    abortRef.current = new AbortController();

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: nextMessages.map(({ role, content }) => ({ role, content })),
          personaKey: activePersonaKey,
        }),
        signal: abortRef.current.signal,
      });

      if (!res.ok) throw new Error(`API error ${res.status}`);

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop();
        for (const line of lines) {
          if (!line.startsWith('data: ')) continue;
          const payload = line.slice(6);
          if (payload === '[DONE]') break;
          try {
            const { text: chunk, error: streamErr } = JSON.parse(payload);
            if (streamErr) throw new Error(streamErr);
            if (chunk) {
              setMessages((prev) => {
                const copy = [...prev];
                const last = copy[copy.length - 1];
                if (last?.streaming) copy[copy.length - 1] = { ...last, content: last.content + chunk };
                return copy;
              });
            }
          } catch { /* skip malformed SSE lines */ }
        }
      }
    } catch (err) {
      if (err.name !== 'AbortError') {
        setError('Something went wrong. Please try again.');
        setMessages((prev) => prev.filter((m) => !m.streaming));
      }
    } finally {
      setMessages((prev) => prev.map((m) => (m.streaming ? { role: 'assistant', content: m.content } : m)));
      setIsStreaming(false);
      inputRef.current?.focus();
    }
  }, [input, messages, isStreaming, activePersonaKey]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  const isFirstMessage = messages.length === 1 && !isStreaming;

  return (
    <div className="flex flex-col gap-6 h-full">
      <div>
        <span className="font-label-mono text-label-mono text-ink uppercase tracking-widest">Chat Agent</span>
        <h3 className="font-headline-md text-headline-md mt-3 mb-3 text-on-background">Always-on conversations.</h3>
        <p className="font-body-md text-body-md text-on-surface-variant max-w-md">
          Real AI chat agents — each trained for a specific role. Switch personas and ask anything.
        </p>
      </div>

      {/* Persona switcher tabs */}
      <div className="flex gap-2 flex-wrap">
        {PERSONAS.map((p) => (
          <button
            key={p.key}
            type="button"
            onClick={() => switchPersona(p.key)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 ${
              activePersonaKey === p.key
                ? 'border-transparent text-[#0c0a09]'
                : 'border-hairline text-secondary hover:border-ink/30 hover:text-ink'
            }`}
            style={activePersonaKey === p.key ? { backgroundColor: p.color } : {}}
          >
            <span className="material-symbols-outlined text-sm">{p.icon}</span>
            {p.name}
          </button>
        ))}
      </div>

      <div
        className="ai-glass rounded-xl flex flex-col w-full max-w-[480px] shadow-xl overflow-hidden transition-all duration-300"
        style={{ minHeight: 420, maxHeight: 520, borderColor: `${persona.color}aa` }}
      >
        {/* Header */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-hairline bg-white/60">
          <div className="w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-300" style={{ backgroundColor: persona.color }}>
            <span className="material-symbols-outlined text-[#0c0a09] text-base">{persona.icon}</span>
          </div>
          <div>
            <div className="font-semibold text-sm text-on-background">{persona.name}</div>
            <div className="flex items-center gap-1 text-[10px] text-secondary mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Online · {persona.role}
            </div>
          </div>
        </div>

        {/* Messages */}
        <div ref={messagesRef} className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.role === 'assistant' && msg.content === '' && msg.streaming ? (
                <TypingIndicator />
              ) : (
                <div
                  className={`px-4 py-2.5 rounded-2xl text-sm max-w-[85%] leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-[#0c0a09] text-white rounded-tr-none'
                      : 'bg-[#f0efed] text-on-background rounded-tl-none border border-hairline'
                  }`}
                >
                  {msg.content}
                  {msg.streaming && <span className="inline-block w-0.5 h-3.5 ml-0.5 bg-current align-middle animate-pulse" />}
                </div>
              )}
            </div>
          ))}

          {error && (
            <div className="flex justify-start">
              <div className="px-4 py-2.5 rounded-2xl text-sm bg-red-50 text-red-600 border border-red-200 rounded-tl-none max-w-[85%]">
                {error}
              </div>
            </div>
          )}
        </div>

        {/* Suggestions */}
        {isFirstMessage && (
          <div className="px-5 pb-3 flex flex-wrap gap-2">
            {persona.suggestions.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => sendMessage(s)}
                className="text-xs px-3 py-1.5 rounded-full border border-hairline-strong text-secondary hover:text-ink transition-colors duration-200"
                style={{ '--hover-border': persona.color }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = persona.color}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = ''}
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="px-5 py-4 border-t border-hairline bg-white/40 flex items-end gap-2">
          <textarea
            ref={inputRef}
            className="flex-1 resize-none bg-transparent text-sm text-on-background placeholder-secondary outline-none leading-relaxed"
            placeholder={`Ask ${persona.name} anything…`}
            rows={1}
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              e.target.style.height = 'auto';
              e.target.style.height = `${Math.min(e.target.scrollHeight, 96)}px`;
            }}
            onKeyDown={handleKeyDown}
          />
          {isStreaming ? (
            <button
              type="button"
              onClick={() => abortRef.current?.abort()}
              className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg bg-[#0c0a09] text-white"
              aria-label="Stop"
            >
              <span className="material-symbols-outlined text-sm">stop</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => sendMessage()}
              disabled={!input.trim()}
              className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg bg-[#0c0a09] text-white disabled:opacity-30 transition-opacity duration-200"
              aria-label="Send"
            >
              <span className="material-symbols-outlined text-sm">arrow_upward</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
