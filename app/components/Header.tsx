import { User, Menu } from "lucide-react";

export default function Header() {
  return (
    <header className="header" id="header">
      <div className="header-inner">
        <a href="#" className="logo" aria-label="Claro">
          <img
            src="/images/claro-logo.png"
            alt="Claro"
            className="logo-img"
            width={120}
            height={44}
          />
        </a>
        <div className="header-actions">
          <button
            type="button"
            className="header-icon-btn"
            aria-label="Minha conta"
          >
            <User size={22} strokeWidth={2} />
          </button>
          <button
            type="button"
            className="header-icon-btn"
            aria-label="Abrir menu"
          >
            <Menu size={24} strokeWidth={2} />
          </button>
        </div>
      </div>
    </header>
  );
}
