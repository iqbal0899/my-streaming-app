import { CheckCircle2, Printer } from "lucide-react";
import Logo from "../assets/Logo.png";
import { formatRupiah } from "../api/payments";
import "../css/invoice.css";

/**
 * Tampilan invoice/laporan transaksi, muncul setelah pembayaran berhasil.
 *
 * Props (trx):
 * - kodePembayaran, tanggal, planName, akun, metode
 * - hargaPaket, adminFee, total
 * - email, nama (opsional)
 */
export default function Invoice({ trx, onKembali }) {
  if (!trx) return null;

  const {
    kodePembayaran,
    tanggal,
    planName,
    akun,
    metode,
    hargaPaket,
    adminFee,
    total,
    email,
    nama,
  } = trx;

  const metodeLabel = metode === "va" ? "BCA Virtual Account" : "Kartu Debit/Kredit";

  return (
    <div className="inv-wrap">
      <div className="inv-success-banner">
        <CheckCircle2 size={22} />
        <span>Pembayaran berhasil dikonfirmasi</span>
      </div>

      <div className="inv-card invoice-print">
        <div className="inv-header">
          <img src={Logo} alt="Logo" className="inv-logo" />
          <div className="inv-header-right">
            <p className="inv-title">INVOICE</p>
            <span className="inv-status">LUNAS</span>
          </div>
        </div>

        <div className="inv-meta">
          <div>
            <p className="inv-meta-label">No. Invoice</p>
            <p className="inv-meta-value">{kodePembayaran}</p>
          </div>
          <div>
            <p className="inv-meta-label">Tanggal</p>
            <p className="inv-meta-value">{tanggal}</p>
          </div>
          <div>
            <p className="inv-meta-label">Ditagihkan kepada</p>
            <p className="inv-meta-value">{nama || email || "-"}</p>
            {nama && email && <p className="inv-meta-sub">{email}</p>}
          </div>
        </div>

        <table className="inv-table">
          <thead>
            <tr>
              <th>Deskripsi</th>
              <th className="inv-right">Jumlah</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                Paket Langganan {planName}
                {akun && <span className="inv-sub"> ({akun})</span>}
              </td>
              <td className="inv-right">{formatRupiah(hargaPaket)}</td>
            </tr>
            <tr>
              <td>Biaya Admin</td>
              <td className="inv-right">{formatRupiah(adminFee)}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td>Total Pembayaran</td>
              <td className="inv-right inv-total">{formatRupiah(total)}</td>
            </tr>
          </tfoot>
        </table>

        <div className="inv-footer-row">
          <span>Metode Pembayaran</span>
          <span>{metodeLabel}</span>
        </div>

        <p className="inv-thanks">Terima kasih telah berlangganan.</p>
        <span className="inv-thanks">App Streaming By Muhammad Iqbal.</span>
      </div>

      <div className="inv-actions">
        <button
          type="button"
          className="inv-btn inv-btn-outline"
          onClick={() => window.print()}
        >
          <Printer size={16} /> Cetak / Unduh Invoice
        </button>
        <button type="button" className="inv-btn inv-btn-primary" onClick={onKembali}>
          Kembali ke Beranda
        </button>
      </div>
    </div>
  );
}