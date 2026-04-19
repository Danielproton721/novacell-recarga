export default function Scheduled() {
  return (
    <section className="scheduled" id="scheduled">
      <div className="scheduled-banner">
        <div className="scheduled-banner-content">
          <p className="scheduled-banner-text">
            Esquecer de recarregar e ficar sem crédito?
          </p>
          <p className="scheduled-banner-strong">Nunca mais!</p>
        </div>
        <div className="scheduled-banner-right">
          <div className="scheduled-banner-tag">
            PROGRAME SUA RECARGA
            <br />
            NO CARTÃO
          </div>
          <div className="scheduled-price-label">a partir de</div>
          <div className="scheduled-price-value">
            R$<strong>30</strong><sup>,00</sup>
          </div>
          <div className="scheduled-banner-bonus">
            <span>Ganhe</span>
            <span className="scheduled-bonus-value">
              +10<small>GB</small>
            </span>
            <span className="scheduled-bonus-sub">na primeira cobrança</span>
          </div>
        </div>
        <img
          src="/images/promo-model.png"
          alt="Modelo com smartphone NovaCell"
          className="scheduled-banner-img"
          loading="lazy"
          width={180}
          height={220}
        />
      </div>

      <div className="scheduled-content">
        <h2 className="scheduled-title">
          Com a Programada, você não fica sem créditos!
        </h2>
        <ul className="scheduled-list">
          <li>
            <span className="scheduled-icon">🔄</span>
            <span>
              <strong className="text-accent">Recarga automática</strong> todos os meses
            </span>
          </li>
          <li>
            <span className="scheduled-icon">📅</span>
            <span>
              <strong>Sempre na data programada</strong>
            </span>
          </li>
          <li>
            <span className="scheduled-icon">💰</span>
            <span>
              <strong>Sem custos</strong> e{" "}
              <strong className="text-accent">sem fidelidade</strong>
            </span>
          </li>
          <li>
            <span className="scheduled-icon">⭐</span>
            <span>
              Ganhe <strong className="text-accent">10GB de bônus</strong> no primeiro mês
            </span>
          </li>
          <li>
            <span className="scheduled-icon">✏️</span>
            <span>
              <strong className="text-accent">Edite</strong> ou{" "}
              <strong className="text-accent">cancele</strong> a qualquer momento
            </span>
          </li>
        </ul>
        <button className="btn-primary" aria-label="Programar recarga automática">
          Programar recarga
        </button>
        <button className="btn-outline" aria-label="Gerenciar recarga existente">
          Gerenciar recarga
        </button>
      </div>
    </section>
  );
}
