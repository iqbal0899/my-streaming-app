import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Receipt } from "lucide-react";
import { fetchRiwayatTransaksi } from "../store/transactionSlice";
import { formatRupiah } from "../services/api/payments";
import "../css/transactionHistory.css";

const STATUS_LABEL = {
  pending: { text: "Menunggu Pembayaran", className: "rt-badge-pending" },
  success: { text: "Berhasil", className: "rt-badge-success" },
  expired: { text: "Kedaluwarsa", className: "rt-badge-expired" },
};

export default function RiwayatTransaksi() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth.auth);
  const { items, status, error } = useSelector((state) => state.transactions);

  useEffect(() => {
    if (auth?.email) {
      dispatch(fetchRiwayatTransaksi(auth.email));
    }
  }, [auth?.email, dispatch]);

  return (
    <div className="rt-page">
      <h1 className="rt-heading">Riwayat Transaksi</h1>
      <p className="rt-subheading">
        Daftar transaksi langganan yang pernah kamu lakukan.
      </p>

      {status === "loading" && <p className="rt-info">Memuat riwayat transaksi...</p>}

      {status === "failed" && (
        <p className="rt-error">
          {error || "Gagal memuat riwayat transaksi. Coba muat ulang halaman."}
        </p>
      )}

      {status === "succeeded" && items.length === 0 && (
        <div className="rt-empty">
          <Receipt size={28} />
          <p>Belum ada transaksi.</p>
        </div>
      )}

      <div className="rt-list">
        {items.map((trx, index) => {
          const badge = STATUS_LABEL[trx.status] || STATUS_LABEL.pending;
          const metodeLabel =
            trx.metode === "va" ? "BCA Virtual Account" : "Kartu Debit/Kredit";

          return (
            <div key={`${trx.id}-${index}`} className="rt-card">
              <div className="rt-card-icon">
                <Receipt size={18} />
              </div>

              <div className="rt-card-body">
                <div className="rt-card-top">
                  <p className="rt-plan">
                    Paket {trx.planName}
                    {trx.akun && <span className="rt-akun"> · {trx.akun}</span>}
                  </p>
                  <span className={`rt-badge ${badge.className}`}>{badge.text}</span>
                </div>

                <p className="rt-kode">No. Invoice: {trx.noInvoice}</p>
                <p className="rt-kode">Kode Pembayaran: {trx.kodePembayaran}</p>

                <div className="rt-card-bottom">
                  <span className="rt-meta">
                    {trx.tanggal} · {metodeLabel}
                  </span>
                  <span className="rt-total">{formatRupiah(trx.total)}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}