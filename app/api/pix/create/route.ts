import { NextResponse } from "next/server"

/**
 * Cria uma cobrança PIX via Pagou AI (API v2).
 * Docs: https://developer.pagou.ai/payments/pix/accept-payments
 *       https://developer.pagou.ai/start-here/authentication
 *
 * Body esperado do frontend:
 *   { value: number, phone: string, name: string, cpf: string }
 *
 * Resposta retornada ao frontend:
 *   { txid, qrCode, expiresAt, amount, phone }
 */

type PagouProblem = {
  type?: string
  title?: string
  status?: number
  detail?: string
}

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
} & PagouProblem

function resolveBaseUrl(secretKey: string): string {
  if (process.env.PAGOUAI_BASE_URL) return process.env.PAGOUAI_BASE_URL
  // Heuristica: chaves de sandbox costumam ter "test" ou "sandbox" no prefixo
  const key = secretKey.toLowerCase()
  if (key.includes("test") || key.includes("sandbox")) {
    return "https://api-sandbox.pagou.ai"
  }
  return "https://api.pagou.ai"
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

    const rawKey = process.env.PAGOUAI_SECRET_KEY
    if (!rawKey) {
      return NextResponse.json(
        { error: "Chave do gateway não configurada" },
        { status: 500 },
      )
    }

    // Remove espaços/quebras de linha acidentais
    const secretKey = rawKey.trim()
    const baseUrl = resolveBaseUrl(secretKey)

    const phoneDigits = phone.replace(/\D/g, "")
    const cpfDigits = cpf.replace(/\D/g, "")
    const amountCents = Math.round(value * 100)
    const externalRef = `claro_${Date.now()}_${Math.floor(Math.random() * 1000)}`

    if (cpfDigits.length !== 11) {
      return NextResponse.json({ error: "CPF inválido" }, { status: 400 })
    }

    if (phoneDigits.length < 10 || phoneDigits.length > 11) {
      return NextResponse.json({ error: "Telefone inválido" }, { status: 400 })
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

    const endpoint = `${baseUrl}/v2/transactions`
    console.log("[v0] Pagou AI POST:", endpoint)

    const upstream = await fetch(endpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${secretKey}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    })

    const rawText = await upstream.text()
    let json: PagouAiResponse = {}
    try {
      json = rawText ? (JSON.parse(rawText) as PagouAiResponse) : {}
    } catch {
      console.log("[v0] Resposta não-JSON do Pagou AI:", rawText.slice(0, 300))
    }

    if (!upstream.ok || !json.data) {
      console.log(
        "[v0] Pagou AI falhou:",
        upstream.status,
        JSON.stringify(json).slice(0, 500),
      )

      // Erro de autenticação: devolve mensagem explicativa
      if (upstream.status === 401) {
        return NextResponse.json(
          {
            error:
              "Chave do gateway inválida. Verifique se PAGOUAI_SECRET_KEY é uma chave v2 válida e está no ambiente correto (sandbox vs produção).",
            detail: json.detail ?? json.message ?? null,
            endpoint,
          },
          { status: 401 },
        )
      }

      const message =
        json.detail ??
        json.title ??
        json.message ??
        `Erro ao criar PIX no gateway (${upstream.status})`

      return NextResponse.json(
        { error: message },
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
