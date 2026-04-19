import { CalendarRange, Tv } from "lucide-react";

export default function TvSection() {
  return (
    <section className="tv-section" id="tv">
      <h2 className="tv-title">NovaCell TV Pré-pago</h2>
      <p className="tv-subtitle">
        Programação do seu jeito, sem mensalidade e sem fidelidade.
      </p>

      <div className="tv-card">
        <div className="tv-card-badge">Inicial</div>
        <h3 className="tv-card-title">+ de 40 canais</h3>
        <div className="tv-card-features">
          <div className="tv-feature">
            <span>Canais inclusos</span>
            <div className="tv-channels">
              <span className="tv-channel-dot" style={{ background: "#1a8e3a" }} />
              <span className="tv-channel-dot" style={{ background: "#f5a623" }} />
              <span className="tv-channel-dot" style={{ background: "#4a90d9" }} />
            </div>
          </div>
          <div className="tv-feature">
            <span>Recargas de 30, 60, 90 e 180 dias</span>
            <span className="tv-feature-icon" aria-hidden="true">
              <CalendarRange size={20} strokeWidth={2} />
            </span>
          </div>
          <div className="tv-feature">
            <span>Recarregue quando quiser</span>
            <span className="tv-feature-icon" aria-hidden="true">
              <Tv size={20} strokeWidth={2} />
            </span>
          </div>
        </div>
        <div className="tv-card-price">
          <div className="tv-price-label">Valor mensal</div>
          <div className="tv-price-value">
            <span className="tv-price-currency">R$</span>
            <span className="tv-price-amount">20</span>
            <span className="tv-price-cents">,00</span>
          </div>
          <div className="tv-price-validity">Validade 30 dias</div>
        </div>
        <button className="plan-btn tv-btn" aria-label="Recarregar NovaCell TV">
          Recarregar
        </button>
      </div>
    </section>
  );
}
