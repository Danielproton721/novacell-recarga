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
      </div>
    </header>
  );
}
