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
          <div className="offer-card-inner offer-card-image">
            <img
              src="/images/claro-flex-banner.png"
              alt="Claro Flex: 20GB (15GB plano + 5GB redes sociais) com WhatsApp ilimitado por R$ 19,90 no primeiro mês"
              className="offer-card-img"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
