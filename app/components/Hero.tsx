export default function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="hero-banner">
        <div className="hero-content">
          <p className="hero-eyebrow">Nos canais digitais da NovaCell,</p>
          <h2 className="hero-title">sua recarga vale mais!</h2>
          <p className="hero-subtitle">
            Recarregou? <strong>Ganhou!</strong>
          </p>
          <div className="hero-badge">
            <span className="hero-badge-label">de internet na 1ª recarga</span>
            <div className="hero-badge-value">
              <span className="hero-badge-prefix">Até</span>
              <span className="hero-badge-number">10</span>
              <span className="hero-badge-unit">GB</span>
            </div>
            <span className="hero-badge-sub">de internet em cada recarga</span>
          </div>
        </div>
        <div className="hero-image">
          <img
            src="/images/hero-model.png"
            alt="Modelo comemorando recarga NovaCell"
            loading="eager"
            width={300}
            height={360}
          />
        </div>
        <div className="hero-logo-corner">
          <svg viewBox="0 0 32 32" width="20" height="20">
            <circle cx="16" cy="16" r="14" fill="#fff" />
            <path d="M10 16 Q16 8 22 16 Q16 24 10 16Z" fill="#E63312" opacity="0.9" />
            <circle cx="16" cy="16" r="3" fill="#E63312" />
          </svg>
          <span>NovaCell</span>
        </div>
      </div>
    </section>
  );
}
