import { Resend } from "resend"

type SendPixEmailInput = {
  to: string
  amount: number
  phone: string
  qrCode: string
  expiresAt: string
}

const BRL = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" })

function formatPhone(raw: string) {
  const d = (raw ?? "").replace(/\D/g, "")
  if (d.length === 11) return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`
  if (d.length === 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`
  return raw
}

function buildHtml({ amount, phone, qrCode, expiresAt }: Omit<SendPixEmailInput, "to">) {
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=260x260&margin=0&data=${encodeURIComponent(qrCode)}`
  const expires = new Date(expiresAt).toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })

  return `<!doctype html>
<html lang="pt-BR">
  <body style="margin:0;padding:0;background:#f4f4f6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#111;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f6;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 16px rgba(0,0,0,0.06);">
            <tr>
              <td style="background:#e60000;padding:24px 32px;color:#fff;">
                <div style="font-size:20px;font-weight:700;letter-spacing:0.3px;">Claro Recarga</div>
                <div style="font-size:14px;opacity:0.9;margin-top:4px;">Seu PIX está pronto</div>
              </td>
            </tr>
            <tr>
              <td style="padding:32px;">
                <p style="margin:0 0 8px;font-size:15px;color:#555;">Recarga de</p>
                <p style="margin:0 0 24px;font-size:28px;font-weight:700;color:#111;">${BRL.format(amount)}</p>
                <p style="margin:0 0 24px;font-size:15px;color:#333;">Número: <strong>${formatPhone(phone)}</strong></p>

                <div style="text-align:center;margin:24px 0;">
                  <img src="${qrUrl}" alt="QR Code PIX" width="240" height="240" style="border-radius:12px;border:1px solid #eee;" />
                </div>

                <p style="margin:0 0 8px;font-size:14px;color:#555;">Ou copie o código PIX abaixo e cole no app do seu banco:</p>
                <div style="background:#f7f7f9;border:1px solid #e5e5ea;border-radius:10px;padding:14px;font-family:'SFMono-Regular',Consolas,Monaco,monospace;font-size:12px;word-break:break-all;color:#222;">
                  ${qrCode}
                </div>

                <p style="margin:24px 0 0;font-size:13px;color:#888;">
                  Pagamento expira em: <strong>${expires}</strong>
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding:20px 32px;background:#fafafa;color:#888;font-size:12px;text-align:center;border-top:1px solid #eee;">
                Este é um email automático. Após o pagamento, sua recarga é processada em instantes.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`
}

export async function sendPixEmail(input: SendPixEmailInput): Promise<{ ok: true; id: string } | { ok: false; error: string }> {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    return { ok: false, error: "RESEND_API_KEY não configurada" }
  }

  const fromEmail = process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev"
  const fromName = process.env.RESEND_FROM_NAME ?? "Claro Recarga"
  const from = `${fromName} <${fromEmail}>`

  const resend = new Resend(apiKey)

  try {
    const { data, error } = await resend.emails.send({
      from,
      to: input.to,
      subject: `Seu PIX de ${BRL.format(input.amount)} para recarga Claro`,
      html: buildHtml(input),
    })

    if (error) {
      return { ok: false, error: error.message ?? String(error) }
    }
    return { ok: true, id: data?.id ?? "" }
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : String(err) }
  }
}
