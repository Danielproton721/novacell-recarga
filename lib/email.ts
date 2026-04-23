import { Resend } from "resend"

type SendPixEmailInput = {
  to: string
  amount: number
  phone: string
  qrCode: string
  expiresAt: string
}

const BRL = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" })
const AMOUNT_FMT = new Intl.NumberFormat("pt-BR", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

function formatPhone(raw: string) {
  const d = (raw ?? "").replace(/\D/g, "")
  if (d.length === 11) return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`
  if (d.length === 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`
  return raw
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}

function buildHtml({ amount, phone, qrCode }: Omit<SendPixEmailInput, "to" | "expiresAt">) {
  const siteUrl = (process.env.SITE_URL ?? "https://emailsclaro.online").replace(/\/+$/, "")
  const logoUrl = `${siteUrl}/email/claro-logo.svg`
  const qrImgUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&margin=0&data=${encodeURIComponent(qrCode)}`
  const valor = AMOUNT_FMT.format(amount)
  const numero = formatPhone(phone)
  const pixCopy = escapeHtml(qrCode)

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <title>PIX gerado para sua recarga Claro</title>
</head>
<body style="margin:0;padding:0;background:#e7e7e7;font-family:Arial,'Helvetica Neue',Helvetica,sans-serif;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">
    Pague com QR Code ou PIX Copia e Cola para concluir sua recarga.
  </div>

  <div style="max-width:600px;margin:0 auto;background:#ffffff;">
    <div style="background:#da291c;height:5px;"></div>

    <div style="background:#ffffff;padding:24px 32px 20px;text-align:center;border-bottom:1px solid #f1f1f1;">
      <img src="${logoUrl}" alt="Claro" width="150" style="display:inline-block;height:auto;max-width:150px;" />
    </div>

    <div style="background:#fbfbfb;padding:18px 30px;text-align:center;border-bottom:1px solid #e9e9e9;">
      <h1 style="margin:0 0 7px;font-size:19px;color:#202020;font-weight:700;line-height:1.22;">
        Você acaba de gerar um PIX no valor de <span style="color:#da291c;">R$ ${valor}</span> para o número <span style="color:#da291c;">${numero}</span>.
      </h1>
      <p style="margin:0;font-size:12px;color:#666;line-height:1.36;">
        Escaneie o QR Code ou copie o código abaixo para concluir o pagamento da sua recarga.
      </p>
    </div>

    <div style="padding:16px 30px;">
      <div style="background:#ffffff;border-radius:15px;border:1px solid #ececec;overflow:hidden;box-shadow:0 10px 28px rgba(0,0,0,0.08);">
        <div style="background:#da291c;padding:11px;text-align:center;">
          <table cellpadding="0" cellspacing="0" style="margin:0 auto;">
            <tr>
              <td style="padding-right:10px;vertical-align:middle;">
                <div style="width:30px;height:30px;background:#ffffff;border-radius:8px;text-align:center;line-height:30px;">
                  <span style="color:#da291c;font-size:15px;font-weight:700;">P</span>
                </div>
              </td>
              <td style="vertical-align:middle;">
                <span style="color:#ffffff;font-size:15px;font-weight:700;letter-spacing:0.5px;">Pague com PIX</span>
              </td>
            </tr>
          </table>
        </div>

        <div style="padding:16px 24px 18px;text-align:center;background:#fafafa;">
          <div style="background:#ffffff;border-radius:12px;padding:9px;display:inline-block;box-shadow:0 2px 8px rgba(0,0,0,0.08);border:1px solid #ededed;">
            <img src="${qrImgUrl}" alt="QR Code PIX" width="150" height="150" style="display:block;border-radius:6px;" />
          </div>
          <p style="margin:7px 0 0;font-size:10px;color:#777;line-height:1.28;">
            Abra o app do seu banco e escaneie o QR Code.
          </p>
        </div>

        <div style="padding:0 24px 16px;background:#fafafa;">
          <div style="background:#ffffff;border:1px solid #e7e7e7;border-radius:18px;padding:24px;text-align:center;box-shadow:0 8px 22px rgba(0,0,0,0.06);">
            <p style="margin:0 0 8px;font-size:10px;color:#8d1d16;text-transform:uppercase;letter-spacing:1.2px;font-weight:700;">TOTAL DA RECARGA</p>
            <p style="margin:0 0 14px;font-size:28px;font-weight:700;color:#da291c;line-height:1.05;">R$ ${valor}</p>

            <div style="display:inline-block;background:#f1fff5;border:1px solid #c6edcf;border-radius:999px;padding:7px 13px;margin:0 0 18px;">
              <p style="margin:0;font-size:10px;color:#14752d;font-weight:700;line-height:1.25;">
                Pague agora sua recarga e ganhe 10GB de bônus
              </p>
            </div>

            <p style="margin:0 0 10px;font-size:13px;font-weight:700;color:#202020;">PIX Copia e Cola</p>
            <div style="background:#f7f7f7;border:1px solid #dfdfdf;border-radius:11px;padding:12px;margin:0 0 14px;">
              <p style="margin:0;font-size:11px;font-family:'Courier New',monospace;color:#555;line-height:1.5;word-break:break-all;text-align:left;">
                ${pixCopy}
              </p>
            </div>

            <a href="${siteUrl}" style="display:block;background:#da291c;color:#ffffff;text-decoration:none;padding:0 18px;border-radius:999px;font-size:14px;font-weight:700;line-height:54px;min-height:54px;box-shadow:0 8px 18px rgba(218,41,28,0.24);text-align:center;">
              Copiar código PIX
            </a>

            <p style="margin:10px 0 0;font-size:10px;color:#777;line-height:1.32;">
              Cole o código no app do seu banco para concluir.
            </p>
          </div>
        </div>

        <div style="padding:0 24px 22px;background:#fafafa;">
          <div style="background:#fff8e8;border:1px solid #f1d6a4;border-radius:9px;padding:12px;text-align:center;">
            <p style="margin:0;font-size:12px;color:#9a5b00;line-height:1.45;">
              Conclua o pagamento dentro do prazo para garantir sua recarga.
            </p>
          </div>
        </div>
      </div>
    </div>

    <div style="padding:0 32px 24px;">
      <div style="background:#f7f7f7;border-radius:10px;padding:13px 16px;text-align:center;border:1px solid #eeeeee;">
        <p style="margin:0;font-size:11px;color:#777;line-height:1.55;">
          Por segurança, confira o valor e o número antes de concluir o pagamento.
        </p>
      </div>
    </div>

    <div style="background:#202020;padding:28px 32px;text-align:center;">
      <img src="${logoUrl}" alt="Claro" width="110" style="display:inline-block;height:auto;max-width:110px;margin-bottom:6px;filter:brightness(0) invert(1);" />
      <div style="width:42px;height:2px;background:#da291c;margin:0 auto 14px;"></div>
      <p style="margin:0 0 14px;font-size:11px;color:#a7a7a7;line-height:1.45;">
        Recarga Claro para <span style="color:#ffffff;">${numero}</span>
      </p>
      <div style="border-top:1px solid #373737;padding-top:14px;">
        <p style="margin:0;font-size:11px;color:#8a8a8a;">Claro. Pagamento PIX para recarga.</p>
      </div>
    </div>
  </div>
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
