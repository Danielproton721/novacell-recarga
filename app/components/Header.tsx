export default function Header() {
  return (
    <header className="header" id="header">
      <div className="header-inner">
        <div className="logo">
          <svg className="logo-icon" viewBox="0 0 32 32" width="28" height="28">
            <circle cx="16" cy="16" r="14" fill="#E63312" />
            <path d="M10 16 Q16 8 22 16 Q16 24 10 16Z" fill="#fff" opacity="0.9" />
            <circle cx="16" cy="16" r="3" fill="#fff" />
          </svg>
          <span className="logo-text">
            Nova<span className="logo-accent">Cell</span>
          </span>
        </div>
      </div>
    </header>
  );
}
