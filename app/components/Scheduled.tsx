export default function Scheduled() {
  return (
    <section className="scheduled" id="scheduled">
      <div className="scheduled-banner">
        <img
          src="/images/scheduled-banner.png"
          alt="Programe sua recarga no cartão a partir de R$30 e ganhe +10GB na primeira cobrança"
          className="scheduled-banner-img"
          loading="lazy"
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
