"use client"

import { useState } from "react"
import RechargeModal from "./RechargeModal"

const mainPlans = [
  { value: 15, bonus: null, days: 30, featured: false },
  { value: 20, bonus: "+1GB de bônus", days: 30, featured: false },
  { value: 30, bonus: "+2GB de bônus", days: 60, featured: true },
  { value: 40, bonus: "+3GB de bônus", days: 90, featured: false },
]

const extraPlans = [
  { value: 50, bonus: "+5GB de bônus", days: 120, featured: false },
  { value: 75, bonus: "+7GB de bônus", days: 150, featured: false },
  { value: 100, bonus: "+10GB de bônus", days: 180, featured: false },
]

function PlanCard({
  value,
  bonus,
  days,
  featured,
  onSelect,
}: {
  value: number
  bonus: string | null
  days: number
  featured?: boolean
  onSelect: (value: number) => void
}) {
  return (
    <div
      className={`plan-card${featured ? " plan-card--featured" : ""}`}
      data-plan={value}
    >
      {featured && <span className="plan-badge">Mais escolhido</span>}
      <div className="plan-value">
        <span className="plan-currency">R$</span>
        <span className="plan-amount">{value}</span>
      </div>
      <span className="plan-bonus">{bonus || " "}</span>
      <span className="plan-validity">Válido por {days} dias</span>
      <button
        className="plan-btn"
        aria-label={`Recarregar R$${value}`}
        onClick={() => onSelect(value)}
      >
        Recarregar
      </button>
    </div>
  )
}

export default function Plans() {
  const [showExtra, setShowExtra] = useState(false)
  const [selectedValue, setSelectedValue] = useState<number | null>(null)
  const [selectedVariant, setSelectedVariant] = useState<string>("")

  const handleSelect = (value: number, bonus: string | null) => {
    setSelectedValue(value)
    setSelectedVariant(
      bonus
        ? `Recarga R$ ${value},00 ${bonus}`
        : `Recarga R$ ${value},00`
    )
  }

  return (
    <section className="plans" id="plans">
      <div className="plans-header">
        <h1 className="plans-title">Recarregue e ganhe bônus</h1>
        <p className="plans-subtitle">
          Escolha o valor da sua recarga e aproveite bônus exclusivos!
        </p>
      </div>

      <div className="plans-grid">
        {mainPlans.map((plan) => (
          <PlanCard
            key={plan.value}
            value={plan.value}
            bonus={plan.bonus}
            days={plan.days}
            featured={plan.featured}
            onSelect={(v) => handleSelect(v, plan.bonus)}
          />
        ))}
      </div>

      <button
        className={`see-more-btn${showExtra ? " active" : ""}`}
        onClick={() => setShowExtra(!showExtra)}
        aria-label="Ver mais valores de recarga"
      >
        {showExtra ? "Ver menos valores" : "Ver mais valores"}
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M4 6L8 10L12 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {showExtra && (
        <div className="plans-grid plans-extra visible">
          {extraPlans.map((plan) => (
            <PlanCard
              key={plan.value}
              value={plan.value}
              bonus={plan.bonus}
              days={plan.days}
              onSelect={(v) => handleSelect(v, plan.bonus)}
            />
          ))}
        </div>
      )}

      <RechargeModal
        value={selectedValue}
        variant={selectedVariant}
        onClose={() => setSelectedValue(null)}
      />
    </section>
  )
}
