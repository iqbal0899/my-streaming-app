import {
  Download,
  Ban,
  Clapperboard,
  Sparkles,
  MonitorSmartphone,
  MessageSquareText,
  Check,
} from "lucide-react";
import { formatRupiah } from "../api/payments";
import "../css/subscript.css";

const benefits = [
  { icon: Download, label: "Download Konten Pilihan" },
  { icon: Ban, label: "Tidak Ada Iklan" },
  { icon: Clapperboard, label: "Tonton Semua Konten" },
  { icon: Sparkles, label: "Kualitas Maksimal Sampai Dengan 4K" },
  { icon: MonitorSmartphone, label: "Tonton di Tv, Tablet, Mobile, dan Laptop" },
  { icon: MessageSquareText, label: "Subtitle Untuk Konten Pilihan" },
];

const plans = [
  {
    id: "individual",
    name: "Individual",
    price: 49990,
    akun: "1 Akun",
    features: ["Tidak ada iklan", "Kualitas 720p", "Download konten pilihan"],
  },
  {
    id: "berdua",
    name: "Berdua",
    price: 79990,
    akun: "2 Akun",
    features: ["Tidak ada iklan", "Kualitas 1080p", "Download konten pilihan"],
  },
  {
    id: "keluarga",
    name: "Keluarga",
    price: 159990,
    akun: "3-7 Akun",
    features: ["Tidak ada iklan", "Kualitas 4K", "Download konten pilihan"],
  },
];

export default function PricingPage({ onPilihPaket }) {
  return (
    <div className="page">
      <section className="benefits">
        <h2 className="benefits-title">Kenapa Harus Berlangganan?</h2>
        <div className="benefits-grid">
          {benefits.map(({ icon: Icon, label }) => (
            <div className="benefit-item" key={label}>
              <div className="benefit-icon">
                <Icon size={20} />
              </div>
              <p className="benefit-label">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="plans-section">
        <h2 className="plans-title">Pilih Paketmu</h2>
        <p className="plans-subtitle">Temukan paket sesuai kebutuhanmu</p>

        <div className="plans-grid">
          {plans.map((plan) => (
            <div className="plan-card" key={plan.id}>
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

              <button
                type="button"
                className="plan-cta"
                onClick={() => onPilihPaket(plan)}
              >
                Langganan
              </button>
              <p className="plan-note">Syarat dan Ketentuan Berlaku</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}