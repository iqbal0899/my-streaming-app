import { useState } from "react";
import { Check, CreditCard, Landmark, ArrowLeft } from "lucide-react";
import { formatRupiah } from "../api/payments";
import "../css/checkout.css";

const ADMIN_FEE = 3000;

export default function CheckoutPage({ plan, onKembali, onBayar }) {
  const [metode, setMetode] = useState("card");
  const [voucher, setVoucher] = useState("");

  const hargaPaket = Math.floor(plan.price / 1000) * 1000;
  const total = hargaPaket + ADMIN_FEE;

  return (
    <div className="page">
      <button type="button" className="back-link" onClick={onKembali}>
        <ArrowLeft size={16} /> Kembali
      </button>

      <h1 className="page-title">Ringkasan Pembayaran</h1>

      <div className="checkout-grid">
        <aside className="plan-card plan-card--summary">
          <span className="plan-badge">{plan.name}</span>
          <p className="plan-price">
            Mulai dari {formatRupiah(plan.price)}/bulan
          </p>
          <p className="plan-akun">{plan.akun}</p>

          <ul className="plan-features">
            {plan.features.map((f) => (
              <li key={f}>
                <Check size={14} />
                <span>{f}</span>
              </li>
            ))}
          </ul>

          <button type="button" className="plan-cta" disabled>
            Langganan
          </button>
          <p className="plan-note">Syarat dan Ketentuan Berlaku</p>
        </aside>

        <section className="checkout-panel">
          <p className="panel-label">Metode Pembayaran</p>

          <div className="method-list-checkout">
            <label
              className={`method-option-checkout ${metode === "card" ? "method-option--active" : ""}`}
            >
              <input
                type="radio"
                name="metode"
                checked={metode === "card"}
                onChange={() => setMetode("card")}
              />
              <CreditCard size={18} />
              <span>Kartu Debit/Kredit</span>
            </label>

            <label
              className={`method-option ${metode === "va" ? "method-option--active" : ""}`}
            >
              <input
                type="radio"
                name="metode"
                checked={metode === "va"}
                onChange={() => setMetode("va")}
              />
              <Landmark size={18} />
              <span>BCA Virtual Account</span>
            </label>
          </div>

          <p className="panel-label">Kode Voucher (Jika ada)</p>
          <div className="voucher-row">
            <input
              type="text"
              placeholder="Masukkan kode voucher"
              value={voucher}
              onChange={(e) => setVoucher(e.target.value)}
              className="voucher-input"
            />
            <button type="button" className="voucher-btn">
              Gunakan
            </button>
          </div>

          <p className="panel-label">Ringkasan Transaksi</p>
          <div className="summary-rows">
            <div className="summary-row">
              <span>Paket Premium {plan.name}</span>
              <span>{formatRupiah(hargaPaket)}</span>
            </div>
            <div className="summary-row">
              <span>Biaya Admin</span>
              <span>{formatRupiah(ADMIN_FEE)}</span>
            </div>
            <div className="summary-row summary-row--total">
              <span>Total Pembayaran</span>
              <span>{formatRupiah(total)}</span>
            </div>
          </div>

          <button
            type="button"
            className="pay-btn"
            onClick={() => onBayar(metode)}
          >
            Bayar
          </button>
        </section>
      </div>
    </div>
  );
}