import { NextResponse } from "next/server"

/**
 * Cria uma cobrança PIX via Pagou AI (API v2).
 * Docs: https://developer.pagou.ai/pix/endpoints/create-payment
 *
 * Body esperado do frontend:
 *   { value: number, phone: string, name: string, cpf: string }
 *
 * Resposta retornada ao frontend:
 *   { txid, qrCode, expiresAt, amount, phone }
 */

const PAGOUAI_BASE_URL =
  process.env.PAGOUAI_BASE_URL ?? "https://api.pagou.ai"

type PagouAiResponse = {
  success?: boolean
  requestId?: string
  message?: string
  data?: {
    id: string
    status: string
    amount: number
    method: string
    pix?: {
      qr_code: string
      expiration_date: string
      end_to_end_id?: string | null
      receipt_url?: string | null
    }
  }
}

export async function POST(request: Request) {
  try {
    const { value, phone, name, cpf } = (await request.json()) as {
      value: number
      phone: string
      name: string
      cpf: string
    }

    if (!value || !phone || !name || !cpf) {
      return NextResponse.json(
        { error: "value, phone, name e cpf são obrigatórios" },
        { status: 400 },
      )
    }

    const secretKey = process.env.PAGOUAI_SECRET_KEY
    if (!secretKey) {
      console.log("[v0] PAGOUAI_SECRET_KEY não configurado")
      return NextResponse.json(
        { error: "Chave do gateway não configurada" },
        { status: 500 },
      )
    }

    const phoneDigits = phone.replace(/\D/g, "")
    const cpfDigits = cpf.replace(/\D/g, "")
    const amountCents = Math.round(value * 100)
    const externalRef = `claro_${Date.now()}_${Math.floor(Math.random() * 1000)}`

    if (cpfDigits.length !== 11) {
      return NextResponse.json(
        { error: "CPF inválido" },
        { status: 400 },
      )
    }

    if (phoneDigits.length < 10 || phoneDigits.length > 11) {
      return NextResponse.json(
        { error: "Telefone inválido" },
        { status: 400 },
      )
    }

    const payload = {
      external_ref: externalRef,
      amount: amountCents,
      currency: "BRL",
      method: "pix",
      buyer: {
        name: name.trim(),
        email: `${phoneDigits}@claro-recarga.com.br`,
        phone: phoneDigits,
        document: {
          type: "CPF",
          number: cpfDigits,
        },
      },
      products: [
        {
          name: `Recarga Claro R$ ${value.toFixed(2).replace(".", ",")}`,
          price: amountCents,
          quantity: 1,
          tangible: false,
        },
      ],
    }

    const upstream = await fetch(`${PAGOUAI_BASE_URL}/v2/transactions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${secretKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    })

    const json = (await upstream.json().catch(() => ({}))) as PagouAiResponse

    if (!upstream.ok || !json.success || !json.data) {
      console.log("[v0] Pagou AI erro:", upstream.status, json)
      return NextResponse.json(
        {
          error:
            json.message ?? `Erro ao criar PIX no gateway (${upstream.status})`,
        },
        { status: upstream.status >= 400 ? upstream.status : 502 },
      )
    }

    const pix = json.data.pix
    if (!pix?.qr_code) {
      console.log("[v0] Resposta Pagou AI sem qr_code:", json)
      return NextResponse.json(
        { error: "Gateway não retornou o código PIX" },
        { status: 502 },
      )
    }

    return NextResponse.json({
      txid: json.data.id,
      qrCode: pix.qr_code,
      expiresAt: pix.expiration_date,
      amount: value,
      phone: phoneDigits,
    })
  } catch (error) {
    console.log("[v0] Erro ao criar PIX:", error)
    return NextResponse.json(
      { error: "Erro ao criar cobrança PIX" },
      { status: 500 },
    )
  }
}
