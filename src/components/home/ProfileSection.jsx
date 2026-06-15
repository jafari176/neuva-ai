export default function ProfileSection() {
  return (
    <section className="section" id="profile">
      <div className="container profile-grid">
        <div className="profile-media" data-reveal="left" data-tilt>
          <img src="/assets/profile-kerim.png" alt="Kerim Bilin, founder of Wibify" />
        </div>
        <div className="profile-text" data-reveal="right">
          <p className="eyebrow eyebrow-right">[08] Profile · Mind behind</p>
          <h2 className="profile-name">Kerim<br /><span className="accent serif">Bilin.</span></h2>
          <div className="profile-tags">
            <span className="chip">Founder</span>
            <span className="chip">Developer</span>
            <span className="chip">Designer</span>
          </div>
          <p className="profile-bio">First HTML project at the age of <em className="serif">ten</em>. Today Wibify is a studio with over eleven years of experience.</p>
          <div className="profile-stats" data-reveal-group>
            <div className="stat" data-reveal="up">
              <div className="stat-value">20</div>
              <div className="stat-label">Age</div>
            </div>
            <div className="stat" data-reveal="up">
              <div className="stat-value">11+</div>
              <div className="stat-label">Years coding</div>
            </div>
            <div className="stat" data-reveal="up">
              <div className="stat-value">2015</div>
              <div className="stat-label">First project</div>
            </div>
            <div className="stat" data-reveal="up">
              <div className="stat-value">NRW</div>
              <div className="stat-label">Location</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
