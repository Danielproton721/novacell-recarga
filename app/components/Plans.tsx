"use client"

import { useState } from "react"
import RechargeModal from "./RechargeModal"

const mainPlans = [
  { value: 15, bonus: "+500MB de bônus", days: 30 },
  { value: 20, bonus: "+1GB de bônus", days: 30 },
  { value: 30, bonus: "+2GB de bônus", days: 60 },
  { value: 40, bonus: "+3GB de bônus", days: 90 },
]

const extraPlans = [
  { value: 50, bonus: "+5GB de bônus", days: 120 },
  { value: 75, bonus: "+7GB de bônus", days: 150 },
  { value: 100, bonus: "+10GB de bônus", days: 180 },
]

const DEFAULT_SELECTED = 30

function PlanCard({
  value,
  bonus,
  days,
  selected,
  onSelect,
}: {
  value: number
  bonus: string | null
  days: number
  selected: boolean
  onSelect: (value: number) => void
}) {
  return (
    <div
      className={`plan-card${selected ? " plan-card--featured" : ""}`}
      data-plan={value}
      onClick={() => onSelect(value)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          onSelect(value)
        }
      }}
    >
      {value === 30 && <span className="plan-badge">Mais escolhido</span>}
      <div className="plan-value">
        <span className="plan-currency">R$</span>
        <span className="plan-amount">{value}</span>
      </div>
      <span className="plan-bonus">{bonus || " "}</span>
      <span className="plan-validity">Válido por {days} dias</span>
      <button
        className="plan-btn"
        aria-label={`Recarregar R$${value}`}
        onClick={(e) => {
          e.stopPropagation()
          onSelect(value)
        }}
      >
        Recarregar
      </button>
    </div>
  )
}

export default function Plans() {
  const [showExtra, setShowExtra] = useState(false)
  const [highlightedValue, setHighlightedValue] = useState<number>(DEFAULT_SELECTED)
  const [modalValue, setModalValue] = useState<number | null>(null)
  const [modalVariant, setModalVariant] = useState<string>("")

  const handleSelect = (value: number, bonus: string | null) => {
    setHighlightedValue(value)
    setModalValue(value)
    setModalVariant(
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
            selected={plan.value === highlightedValue}
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
              selected={plan.value === highlightedValue}
              onSelect={(v) => handleSelect(v, plan.bonus)}
            />
          ))}
        </div>
      )}

      <RechargeModal
        value={modalValue}
        variant={modalVariant}
        onClose={() => setModalValue(null)}
      />
    </section>
  )
}
