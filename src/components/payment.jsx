import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Check, CreditCard, Landmark, Copy, CheckCheck, ArrowLeft } from "lucide-react";
import {
  formatRupiah,
  formatTanggal,
  generateKodePembayaran,
  formatCountdown,
} from "../api/payments";
import {
  createTransaction,
  updateTransactionStatus,
} from "../api/transaction";
import Invoice from "./invoice";
import "../css/subscript.css";

const ADMIN_FEE = 3000;
const DURATION_SECONDS = 60 * 60;

const cardSteps = [
  "Masukkan nomor kartu debit/kredit, tanggal kadaluarsa, dan CVV.",
  "Pastikan nama sesuai dengan yang tertera di kartu.",
  "Klik \"Konfirmasi Pembayaran\" untuk melanjutkan.",
  "Anda mungkin diminta memasukkan OTP dari bank penerbit kartu.",
  "Tunggu hingga muncul notifikasi pembayaran berhasil.",
];

const vaSteps = [
  "Buka aplikasi BCA Mobile Banking atau akses BCA Internet Banking.",
  "Login ke akun Anda.",
  "Pilih menu \"Transfer\" atau \"Pembayaran\".",
  "Pilih opsi \"Virtual Account\" atau \"Virtual Account Number\".",
  "Masukkan nomor virtual account dan jumlah pembayaran, lalu konfirmasikan pembayaran.",
];

export default function PaymentPage({ plan, metode, auth, onKembali, onExpire, onSuccess }) {
  const navigate = useNavigate();
  const [secondsLeft, setSecondsLeft] = useState(DURATION_SECONDS);
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState("idle");
  const [transactionId, setTransactionId] = useState(null);
  const [trxError, setTrxError] = useState("");
  const kodeRef = useRef(generateKodePembayaran());
  const tanggalRef = useRef(formatTanggal(new Date()));

  const hargaPaket = Math.floor(plan.price / 1000) * 1000;
  const total = hargaPaket + ADMIN_FEE;

  // Catat transaksi "pending" ke MockAPI begitu halaman payment dibuka
  useEffect(() => {
    let cancelled = false;

    async function catatTransaksi() {
      try {
        const trx = await createTransaction({
          email: auth?.email || null,
          planId: plan.id,
          planName: plan.name,
          metode,
          hargaPaket,
          adminFee: ADMIN_FEE,
          total,
          kodePembayaran: kodeRef.current,
          tanggal: tanggalRef.current,
          status: "pending",
        });
        if (!cancelled) setTransactionId(trx.id);
      } catch (err) {
        console.error(
          "Gagal mencatat transaksi ke MockAPI:",
          err.response?.data || err.message
        );
        if (!cancelled) {
          setTrxError("Gagal terhubung ke server. Kode pembayaran tetap bisa dipakai.");
        }
      }
    }

    catatTransaksi();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (secondsLeft <= 0) {
      (async () => {
        try {
          if (transactionId) {
            await updateTransactionStatus(transactionId, "expired");
          }
        } catch (err) {
          console.error("Gagal update status transaksi (expired) ke MockAPI:", err);
        } finally {
          onExpire();
        }
      })();
      return;
    }
    const timer = setInterval(() => {
      setSecondsLeft((s) => s - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [secondsLeft, onExpire, transactionId]);

  const { jam, menit, detik } = formatCountdown(secondsLeft);
  const steps = metode === "va" ? vaSteps : cardSteps;

  function handleCopy() {
    navigator.clipboard?.writeText(kodeRef.current).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  async function handleBayar() {
    setStatus("success");
    try {
      if (transactionId) {
        await updateTransactionStatus(transactionId, "success");
      }
    } catch (err) {
      console.error("Gagal update status transaksi (success) ke MockAPI:", err);
    }
    onSuccess?.(plan);
  }

  if (status === "success") {
    return (
      <div className="page">
        <Invoice
          trx={{
            kodePembayaran: kodeRef.current,
            tanggal: tanggalRef.current,
            planName: plan.name,
            akun: plan.akun,
            metode,
            hargaPaket,
            adminFee: ADMIN_FEE,
            total,
            email: auth?.email,
            nama: auth?.name,
          }}
          onKembali={() => navigate("/home")}
        />
      </div>
    );
  }

  return (
    <div className="page">
      <button type="button" className="back-link" onClick={onKembali}>
        <ArrowLeft size={16} /> Kembali
      </button>

      <div className="countdown-bar">
        <span className="countdown-label">Lakukan Pembayaran Sebelum</span>
        <div className="countdown-clock">
          <TimeBox value={jam} unit="Jam" />
          <span className="countdown-colon">:</span>
          <TimeBox value={menit} unit="Menit" />
          <span className="countdown-colon">:</span>
          <TimeBox value={detik} unit="Detik" />
        </div>
      </div>

      <h1 className="page-title">Ringkasan Pembayaran</h1>

      {trxError && <p className="login-error" style={{ marginBottom: 12 }}>{trxError}</p>}

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
          <div className="method-list">
            <label className="method-option method-option--active">
              <input type="radio" checked readOnly />
              {metode === "va" ? <Landmark size={18} /> : <CreditCard size={18} />}
              <span>{metode === "va" ? "BCA Virtual Account" : "Kartu Debit/Kredit"}</span>
            </label>
          </div>

          <div className="detail-rows">
            <div className="detail-row">
              <span>Tanggal Pembelian</span>
              <span>{tanggalRef.current}</span>
            </div>
            <div className="detail-row">
              <span>Kode Pembayaran</span>
              <span className="kode-cell">
                {kodeRef.current}
                <button
                  type="button"
                  className="copy-btn"
                  onClick={handleCopy}
                  aria-label="Salin kode pembayaran"
                >
                  {copied ? <CheckCheck size={14} /> : <Copy size={14} />}
                </button>
              </span>
            </div>
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

          <p className="panel-label">Tata Cara Pembayaran</p>
          <ol className="steps-list">
            {steps.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ol>

          <button type="button" className="pay-btn" onClick={handleBayar}>
            Bayar
          </button>
        </section>
      </div>
    </div>
  );
}

function TimeBox({ value, unit }) {
  return (
    <div className="time-box">
      <span className="time-value">{value}</span>
      <span className="time-unit">{unit}</span>
    </div>
  );
}