import { NextResponse } from "next/server"

/**
 * Endpoint stub para criar cobrança PIX.
 *
 * INTEGRAÇÃO:
 * Substitua o bloco marcado abaixo pela sua chamada real ao gateway PIX
 * (ex.: Mercado Pago, Gerencianet/Efí, PagSeguro, Banco Inter, etc.).
 *
 * Body esperado:
 *   { value: number, phone: string }
 *
 * Resposta esperada pelo frontend:
 *   {
 *     txid: string,
 *     qrCode: string,          // payload "copia e cola" (BR Code)
 *     expiresAt: string,       // ISO date
 *     amount: number,
 *     phone: string
 *   }
 */
export async function POST(request: Request) {
  try {
    const { value, phone } = (await request.json()) as {
      value: number
      phone: string
    }

    if (!value || !phone) {
      return NextResponse.json(
        { error: "value e phone são obrigatórios" },
        { status: 400 },
      )
    }

    // ====== INÍCIO: SUBSTITUIR PELA INTEGRAÇÃO REAL DO GATEWAY PIX ======
    const txid = `CLARO${Date.now()}${Math.floor(Math.random() * 1000)}`
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString() // 10 minutos

    // Payload BR Code (copia-e-cola) - exemplo/mock.
    // Em produção, este valor vem do seu gateway.
    const qrCode =
      `00020101021226940014br.gov.bcb.pix2572pix.claro.recarga/v2/qr/cob/` +
      `${txid.toLowerCase()}5204000053039865802BR5925PLATAFORMA DE ` +
      `RECARGA LTDA6009SAO PAULO62070503***6304C9F8`
    // ====== FIM: SUBSTITUIR PELA INTEGRAÇÃO REAL DO GATEWAY PIX ======

    return NextResponse.json({
      txid,
      qrCode,
      expiresAt,
      amount: value,
      phone,
    })
  } catch (error) {
    console.log("[v0] Erro ao criar PIX:", error)
    return NextResponse.json(
      { error: "Erro ao criar cobrança PIX" },
      { status: 500 },
    )
  }
}
