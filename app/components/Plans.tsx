"use client"

import { useState } from "react"
import RechargeModal from "./RechargeModal"

const mainPlans = [
  { value: 15, bonus: null },
  { value: 20, bonus: "+1GB de bônus" },
  { value: 30, bonus: "+2GB de bônus" },
  { value: 40, bonus: "+3GB de bônus" },
]

const extraPlans = [
  { value: 50, bonus: "+5GB de bônus" },
  { value: 75, bonus: "+7GB de bônus" },
  { value: 100, bonus: "+10GB de bônus" },
]

function PlanCard({
  value,
  bonus,
  onSelect,
}: {
  value: number
  bonus: string | null
  onSelect: (value: number) => void
}) {
  return (
    <div className="plan-card" data-plan={value}>
      <div className="plan-value">
        <span className="plan-currency">R$</span>
        <span className="plan-amount">{value}</span>
      </div>
      {bonus && <span className="plan-bonus">{bonus}</span>}
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
            onSelect={setSelectedValue}
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
              onSelect={setSelectedValue}
            />
          ))}
        </div>
      )}

      <RechargeModal
        value={selectedValue}
        onClose={() => setSelectedValue(null)}
      />
    </section>
  )
}
