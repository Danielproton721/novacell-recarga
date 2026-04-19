import { Phone, Smartphone, MessageSquare, Hash } from "lucide-react";

export default function RechargeOptions() {
  return (
    <section className="recharge-options" id="options">
      <h3 className="footer-heading">RECARREGUE TAMBÉM</h3>
      <div className="recharge-options-grid">
        <div className="recharge-option">
          <span className="recharge-option-icon" aria-hidden="true">
            <Phone size={18} strokeWidth={2} />
          </span>
          <div>
            <strong>WhatsApp</strong>
            <span>(11) 99991-0621</span>
          </div>
        </div>
        <div className="recharge-option">
          <span className="recharge-option-icon" aria-hidden="true">
            <Smartphone size={18} strokeWidth={2} />
          </span>
          <div>
            <strong>Minha Claro</strong>
          </div>
        </div>
        <div className="recharge-option">
          <span className="recharge-option-icon" aria-hidden="true">
            <Phone size={18} strokeWidth={2} />
          </span>
          <div>
            <strong>Telefone *555</strong>
          </div>
        </div>
        <div className="recharge-option">
          <span className="recharge-option-icon" aria-hidden="true">
            <MessageSquare size={18} strokeWidth={2} />
          </span>
          <div>
            <strong>SMS *555</strong>
          </div>
        </div>
        <div className="recharge-option">
          <span className="recharge-option-icon" aria-hidden="true">
            <Hash size={18} strokeWidth={2} />
          </span>
          <div>
            <strong>USSD *555#</strong>
          </div>
        </div>
        <div className="recharge-option recharge-option--pay">
          <span className="claro-pay-logo" aria-label="Claro Pay">
            <span className="claro-pay-claro">claro</span>
            <svg
              viewBox="0 0 18 18"
              width="12"
              height="12"
              fill="none"
              aria-hidden="true"
              className="claro-pay-tick"
            >
              <path
                d="M2 9 L7 14 L16 3"
                stroke="#D52B1E"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="claro-pay-pay">pay</span>
          </span>
        </div>
      </div>
    </section>
  );
}
