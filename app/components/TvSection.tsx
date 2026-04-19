"use client"

import { useState } from "react"
import { Star, Tv } from "lucide-react"
import RechargeModal from "./RechargeModal"

type TvPlan = {
  name: string
  channels: string
  value: number
  dots: string[]
  highlight?: boolean
}

const tvPlans: TvPlan[] = [
  {
    name: "Inicial",
    channels: "+ de 40 canais",
    value: 20,
    dots: ["#1a8e3a", "#f5a623", "#4a90d9"],
  },
  {
    name: "Light",
    channels: "+ de 90 canais",
    value: 60,
    dots: ["#e63312", "#1a8e3a", "#111827"],
    highlight: true,
  },
  {
    name: "Mix",
    channels: "+ de 130 canais",
    value: 90,
    dots: ["#f5a623", "#e63312", "#6b7280"],
  },
  {
    name: "Top",
    channels: "+ de 150 canais",
    value: 110,
    dots: ["#1e88e5", "#111827", "#e63312"],
  },
]

export default function TvSection() {
  const [selectedValue, setSelectedValue] = useState<number | null>(null)
  const [selectedVariant, setSelectedVariant] = useState<string>("")

  const handleSelect = (plan: TvPlan) => {
    setSelectedValue(plan.value)
    setSelectedVariant(`Claro TV Pré-pago ${plan.name} (${plan.channels})`)
  }

  return (
    <section className="tv-section" id="tv">
      <h2 className="tv-title">Claro TV Pré-pago</h2>
      <p className="tv-subtitle">
        Programação do seu jeito, sem mensalidade e sem fidelidade.
      </p>

      <div className="tv-carousel">
        {tvPlans.map((plan) => (
          <div key={plan.name} className="tv-card">
            <div className="tv-card-header">
              {plan.highlight && (
                <span className="tv-card-highlight">
                  <Star size={12} strokeWidth={2.5} fill="currentColor" />
                  Melhor opção
                </span>
              )}
              <span className="tv-card-badge">{plan.name}</span>
            </div>

            <h3 className="tv-card-title">{plan.channels}</h3>

            <div className="tv-card-features">
              <div className="tv-feature">
                <span>Canais inclusos</span>
                <div className="tv-channels">
                  {plan.dots.map((color, i) => (
                    <span
                      key={i}
                      className="tv-channel-dot"
                      style={{ background: color }}
                    />
                  ))}
                </div>
              </div>
              <div className="tv-feature">
                <span>Recarregue quando quiser</span>
                <span className="tv-feature-icon" aria-hidden="true">
                  <Tv size={18} strokeWidth={2} />
                </span>
              </div>
            </div>

            <div className="tv-card-price">
              <div className="tv-price-label">Valor mensal</div>
              <div className="tv-price-value">
                <span className="tv-price-currency">R$</span>
                <span className="tv-price-amount">{plan.value}</span>
                <span className="tv-price-cents">,00</span>
              </div>
              <div className="tv-price-validity">Validade 30 dias</div>
            </div>

            <button
              className="plan-btn tv-btn"
              aria-label={`Recarregar Claro TV ${plan.name}`}
              onClick={() => handleSelect(plan)}
            >
              Recarregar
            </button>
          </div>
        ))}
      </div>

      <RechargeModal
        value={selectedValue}
        variant={selectedVariant}
        onClose={() => setSelectedValue(null)}
      />
    </section>
  )
}
