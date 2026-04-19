import { MessageCircle, Smartphone, Phone, Mail, Hash } from "lucide-react";

export default function RechargeOptions() {
  return (
    <section className="recharge-options" id="options">
      <h3 className="recharge-options-title">RECARREGUE TAMBÉM</h3>
      <div className="recharge-options-grid">
        <div className="recharge-option">
          <span className="recharge-option-icon" aria-hidden="true">
            <MessageCircle size={22} strokeWidth={2} />
          </span>
          <div>
            <strong>WhatsApp</strong>
            <span>(11) 98765-4321</span>
          </div>
        </div>
        <div className="recharge-option">
          <span className="recharge-option-icon" aria-hidden="true">
            <Smartphone size={22} strokeWidth={2} />
          </span>
          <div>
            <strong>Meu NovaCell</strong>
          </div>
        </div>
        <div className="recharge-option">
          <span className="recharge-option-icon" aria-hidden="true">
            <Phone size={22} strokeWidth={2} />
          </span>
          <div>
            <strong>Telefone *444</strong>
          </div>
        </div>
        <div className="recharge-option">
          <span className="recharge-option-icon" aria-hidden="true">
            <Mail size={22} strokeWidth={2} />
          </span>
          <div>
            <strong>SMS *444</strong>
          </div>
        </div>
        <div className="recharge-option">
          <span className="recharge-option-icon" aria-hidden="true">
            <Hash size={22} strokeWidth={2} />
          </span>
          <div>
            <strong>USSD *444#</strong>
          </div>
        </div>
        <div className="recharge-option">
          <div className="recharge-option-pay">
            <svg viewBox="0 0 32 32" width="18" height="18">
              <circle cx="16" cy="16" r="14" fill="#E63312" />
              <path
                d="M10 16 Q16 8 22 16 Q16 24 10 16Z"
                fill="#fff"
                opacity="0.9"
              />
              <circle cx="16" cy="16" r="3" fill="#fff" />
            </svg>
            <strong>pay</strong>
          </div>
        </div>
      </div>
    </section>
  );
}
