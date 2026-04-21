"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "claro-cookie-consent";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
  }, []);

  const handle = (value: "accepted" | "dismissed") => {
    localStorage.setItem(STORAGE_KEY, value);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Aviso de cookies"
      className="cookie-banner"
    >
      <div className="cookie-banner-card">
        <p className="cookie-banner-title">
          Nosso site armazena cookies para melhorar a sua navegação.
        </p>
        <p className="cookie-banner-text">
          Ao continuar, entendemos que você está de acordo com a{" "}
          <a href="#" className="cookie-banner-link">
            Política de Privacidade da Claro
          </a>
          .
        </p>

        <div className="cookie-banner-actions">
          <button
            type="button"
            onClick={() => handle("dismissed")}
            className="cookie-banner-btn cookie-banner-btn--ghost"
          >
            Dispensar
          </button>
          <button
            type="button"
            onClick={() => handle("accepted")}
            className="cookie-banner-btn cookie-banner-btn--primary"
          >
            Aceitar
          </button>
        </div>
      </div>
    </div>
  );
}
