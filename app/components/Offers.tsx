export default function Offers() {
  return (
    <section className="offers" id="offers">
      <h2 className="offers-title">Outras ofertas para você</h2>
      <div className="offers-carousel">
        <div className="offer-card">
          <div className="offer-card-inner offer-card-blue">
            <div className="offer-card-text">
              <h3>No Meu NovaCell APP, sua Recarga vale mais!</h3>
              <p>
                Recarregou? <strong>Ganhou!</strong>
              </p>
            </div>
            <div className="offer-card-badge">
              <span className="offer-badge-label">de internet na 1ª recarga</span>
              <div className="offer-badge-value">
                <span>10</span>
                <small>GB</small>
              </div>
              <span className="offer-badge-sub">de internet em cada recarga</span>
            </div>
          </div>
        </div>
        <div className="offer-card">
          <div className="offer-card-inner offer-card-gradient">
            <div className="offer-card-text">
              <h3>Meu NovaCell App</h3>
              <p>
                Baixe o Meu NovaCell App e receba até 10GB de internet. Aproveite para
                gerenciar tudo em um só lugar.
              </p>
            </div>
            <button className="offer-card-btn" aria-label="Baixar app NovaCell">
              Eu quero
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
