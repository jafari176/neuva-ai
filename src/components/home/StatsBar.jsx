export default function StatsBar() {
  return (
    <section className="stats">
      <div className="container stats-inner" data-reveal-group>
        <div className="stat" data-reveal="up">
          <div className="stat-value accent">50+</div>
          <div className="stat-label">AI systems deployed</div>
        </div>
        <div className="stat" data-reveal="up">
          <div className="stat-value">3x</div>
          <div className="stat-label">Avg. revenue lift</div>
        </div>
        <div className="stat" data-reveal="up">
          <div className="stat-value accent">24/7</div>
          <div className="stat-label">Always-on AI</div>
        </div>
      </div>
    </section>
  );
}
