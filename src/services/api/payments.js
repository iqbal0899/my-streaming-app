export function formatRupiah(value) {
  return "Rp" + value.toLocaleString("id-ID");
}

export function formatTanggal(date) {
  const bulan = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember",
  ];
  const d = String(date.getDate()).padStart(2, "0");
  return `${d} ${bulan[date.getMonth()]} ${date.getFullYear()}`;
}

export function generateNoInvoice() {
  const now = new Date();
  const year = now.getFullYear().toString().slice(-2);
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `INV-${year}${month}${day}-${Math.floor(1000 + Math.random() * 9000)}`;
}

export function generateKodePembayaran() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < 9; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

export function formatCountdown(totalSeconds) {
  const jam = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
  const menit = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
  const detik = String(totalSeconds % 60).padStart(2, "0");
  return { jam, menit, detik };
}