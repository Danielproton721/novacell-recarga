import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import CookieBanner from "./components/CookieBanner";

const GTAG_ID = "AW-17772563177";

export const metadata: Metadata = {
  title: "NovaCell Recarga - Recarregue e ganhe bônus",
  description: "Recarregue seu celular NovaCell e ganhe bônus exclusivos de internet. Valores a partir de R$15.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#E63312",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GTAG_ID}`}
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GTAG_ID}');
          `}
        </Script>
      </head>
      <body>
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
