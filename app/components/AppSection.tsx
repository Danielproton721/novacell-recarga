export default function AppSection() {
  return (
    <section className="app-section" id="app">
      <h3 className="footer-heading">APP CLARO RECARGA</h3>
      <div className="app-buttons">
        <a href="#" className="store-btn" aria-label="Disponível no Google Play">
          <svg width="22" height="24" viewBox="0 0 20 22" fill="none" aria-hidden="true">
            <path d="M1 1L11 11L1 21V1Z" fill="#4CAF50" />
            <path d="M1 1L14 8L11 11L1 1Z" fill="#FFC107" />
            <path d="M1 21L14 14L11 11L1 21Z" fill="#F44336" />
            <path d="M14 8L19 11L14 14L11 11L14 8Z" fill="#2196F3" />
          </svg>
          <div>
            <small>DISPONÍVEL NO</small>
            <strong>Google Play</strong>
          </div>
        </a>
        <a href="#" className="store-btn" aria-label="Baixar na App Store">
          <svg width="20" height="24" viewBox="0 0 18 22" fill="none" aria-hidden="true">
            <path
              d="M14.5 0C13 0 11.2 1 10.2 2.2C9.3 3.3 8.5 5 8.8 6.5C10.4 6.6 12 5.7 13 4.5C13.9 3.4 14.6 1.7 14.5 0ZM17.7 16.3C17 17.8 15.6 19.8 13.8 19.8C12.2 19.9 11.6 18.9 9.7 18.9C7.8 18.9 7.1 19.8 5.6 19.9C3.9 20 2.2 17.5 1.5 16C0 12.8 0.4 8.6 2.5 6.3C4 4.7 6 3.8 7.8 3.8C9.5 3.8 10.6 4.8 12 4.8C13.3 4.8 14.2 3.7 16.1 3.8C17.2 3.8 19 4.3 17.7 16.3Z"
              fill="white"
            />
          </svg>
          <div>
            <small>Baixar na</small>
            <strong>App Store</strong>
          </div>
        </a>
      </div>
    </section>
  );
}
