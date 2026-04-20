import { NextResponse } from "next/server"
import { generateValidCpf } from "@/lib/cpf"
import { generateIdentity } from "@/lib/identity"

/**
 * Integração Pagou AI v1 (legacy)
 * Docs:
 *   - https://pagouai.readme.io/reference/introducao
 *   - https://pagouai.readme.io/reference/criar-transacao
 *
 * Autenticação: Basic Auth com "SECRET_KEY:x" em base64
 * Endpoint:    https://api.conta.pagou.ai/v1/transactions
 *
 * Body esperado do frontend:
 *   { value: number, phone: string, name: string, cpf: string }
 *
 * Resposta retornada ao frontend:
 *   { txid, qrCode, qrCodeImage, expiresAt, amount, phone }
 */

type CreatePixBody = {
  value: number
  variant?: string
  phone: string
  name: string
  cpf: string
}

const DEFAULT_BASE_URL = "https://api.conta.pagou.ai"

function onlyDigits(s: string): string {
  return (s ?? "").replace(/\D/g, "")
}

export async function POST(request: Request) {
  let body: CreatePixBody
  try {
    body = (await request.json()) as CreatePixBody
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 })
  }

  const { value, phone, name, cpf } = body ?? {}

  if (!value || value <= 0) {
    return NextResponse.json({ error: "Valor inválido" }, { status: 400 })
  }
  if (!phone || !name || !cpf) {
    return NextResponse.json(
      { error: "Nome, CPF e telefone são obrigatórios" },
      { status: 400 },
    )
  }

  const cpfDigits = onlyDigits(cpf)
  const phoneDigits = onlyDigits(phone)

  if (cpfDigits.length !== 11) {
    return NextResponse.json({ error: "CPF deve ter 11 dígitos" }, { status: 400 })
  }
  if (phoneDigits.length < 10 || phoneDigits.length > 11) {
    return NextResponse.json(
      { error: "Telefone deve ter 10 ou 11 dígitos (com DDD)" },
      { status: 400 },
    )
  }

  const rawKey = process.env.PAGOUAI_SECRET_KEY
  if (!rawKey) {
    console.log("[v0] PAGOUAI_SECRET_KEY não configurada")
    return NextResponse.json(
      { error: "Servidor de pagamento não configurado" },
      { status: 500 },
    )
  }

  const secretKey = rawKey.trim()
  const baseUrl = (process.env.PAGOUAI_BASE_URL ?? DEFAULT_BASE_URL).replace(/\/+$/, "")
  const endpoint = `${baseUrl}/v1/transactions`

  const amountCents = Math.round(value * 100)

  // expirationDate v1 aceita formato AAAA-MM-DD (data do dia, validade ~24h)
  const expirationDate = new Date(Date.now() + 24 * 60 * 60 * 1000)
    .toISOString()
    .slice(0, 10)

  // Identidade mock pra Pagou — nome/email gerados por request, CPF válido gerado
  const mock = generateIdentity()

  // Payload conforme docs v1
  const payload = {
    amount: amountCents,
    paymentMethod: "pix",
    customer: {
      name: mock.name,
      email: mock.email,
      phone: phoneDigits,
      document: {
        number: generateValidCpf(),
        type: "cpf",
      },
    },
    items: [
      {
        title: "Promoção Escolhida",
        quantity: 1,
        unitPrice: amountCents,
        tangible: false,
      },
    ],
    pix: {
      expirationDate,
    },
  }

  // Basic Auth: base64("SECRET_KEY:x")
  const basicAuth = Buffer.from(`${secretKey}:x`).toString("base64")

  console.log("[v0] Pagou AI v1 POST:", endpoint)

  let upstream: Response
  try {
    upstream = await fetch(endpoint, {
      method: "POST",
      headers: {
        authorization: `Basic ${basicAuth}`,
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    })
  } catch (err) {
    console.log("[v0] Falha na chamada ao gateway:", err)
    return NextResponse.json(
      { error: "Falha de conexão com o gateway de pagamento" },
      { status: 502 },
    )
  }

  const raw = await upstream.text()
  let data: any = null
  try {
    data = raw ? JSON.parse(raw) : null
  } catch {
    data = null
  }

  if (!upstream.ok) {
    const detail =
      data?.message ||
      data?.error ||
      data?.errors?.[0]?.message ||
      (typeof raw === "string" ? raw.slice(0, 400) : "") ||
      "Erro desconhecido no gateway"

    console.log("[v0] Gateway retornou erro:", upstream.status, detail)

    if (upstream.status === 401) {
      return NextResponse.json(
        {
          error:
            "Chave PAGOUAI_SECRET_KEY inválida. Confira se está correta (copiada do painel sem espaços) e se é a chave SECRET (não a PUBLIC).",
          detail,
          endpoint,
        },
        { status: 401 },
      )
    }

    return NextResponse.json(
      { error: `Erro ao criar PIX no gateway (${upstream.status})`, detail },
      { status: 502 },
    )
  }

  // Resposta v1 contém `pix: { qrcode, url, expirationDate }`
  const pix = data?.pix ?? {}
  const qrCode: string = pix.qrcode ?? pix.qrCode ?? ""
  const qrCodeImage: string | null = pix.url ?? null
  const expirationRaw = pix.expirationDate ?? pix.expiration_date

  if (!qrCode) {
    console.log("[v0] Resposta sem QR Code:", JSON.stringify(data).slice(0, 400))
    return NextResponse.json(
      { error: "Gateway não retornou QR Code PIX" },
      { status: 502 },
    )
  }

  // Para o timer do frontend: v1 retorna apenas a data; usamos 10 min como countdown visual.
  let expiresAt: string
  if (expirationRaw && /\d{4}-\d{2}-\d{2}T/.test(String(expirationRaw))) {
    expiresAt = new Date(expirationRaw).toISOString()
  } else {
    expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString()
  }

  return NextResponse.json({
    txid: data?.id ?? data?.transactionId ?? null,
    qrCode,
    qrCodeImage,
    expiresAt,
    amount: value,
    phone: phoneDigits,
  })
}
