const techStack = [
  { name: 'Retell AI', icon: 'graphic_eq', type: 'symbol' },
  { name: 'Vapi', icon: 'record_voice_over', type: 'symbol' },
  { name: 'n8n', icon: 'n8n', type: 'logo' },
  { name: 'Make', icon: 'make', type: 'logo' },
  { name: 'Zapier', icon: 'zapier', type: 'logo' },
  { name: 'OpenAI', icon: 'openai', type: 'logo' },
  { name: 'LangChain', icon: 'langchain', type: 'logo' },
  { name: 'Python', icon: 'python', type: 'logo' },
  { name: 'Next.js', icon: 'nextdotjs', type: 'logo' },
  { name: 'TypeScript', icon: 'typescript', type: 'logo' },
  { name: 'Supabase', icon: 'supabase', type: 'logo' },
  { name: 'Twilio', icon: 'twilio', type: 'logo' },
];

export default function TechStackSection() {
  const items = [...techStack, ...techStack];

  return (
    <section className="section tech-stack">
      <div className="container">
        <p className="eyebrow" data-reveal="up" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
          [Stack] Tooling
        </p>
        <h2 className="section-title" data-reveal="up">Tech stacks <em className="serif accent">we use</em>.</h2>
        <p className="tech-stack-subtitle" data-reveal="up">
          Built on the platforms and frameworks powering modern AI automation.
        </p>

        <div className="tech-marquee" data-reveal="up">
          <div className="tech-marquee-track">
            {items.map((tech, i) => (
              <span className="tech-pill" key={`${tech.name}-${i}`}>
                {tech.type === 'logo' ? (
                  <img
                    className="tech-pill-logo"
                    src={`https://cdn.simpleicons.org/${tech.icon}/0c0a09`}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                  />
                ) : (
                  <span className="material-symbols-outlined">{tech.icon}</span>
                )}
                {tech.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
