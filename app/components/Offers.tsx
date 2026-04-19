export default function Offers() {
  return (
    <section className="offers" id="offers">
      <h2 className="offers-title">Outras ofertas para você</h2>
      <div className="offers-carousel">
        <div className="offer-card">
          <div className="offer-card-inner offer-card-image">
            <img
              src="/images/scheduled-banner.png"
              alt="Programe sua recarga no cartão a partir de R$30 e ganhe +10GB na primeira cobrança"
              className="offer-card-img"
              loading="lazy"
            />
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
