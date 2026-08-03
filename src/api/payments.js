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