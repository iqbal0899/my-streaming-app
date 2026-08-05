// api/transactions.js — createTransaction, updateTransactionStatus, getTransactionsByEmail, semua lewat axiosApi ke resource /transactions di MockAPI.
// payment.jsx:
// Begitu halaman payment dibuka → otomatis POST /transactions dengan status "pending" (isi: email, plan, metode, kode pembayaran, tanggal, total).
// Klik Bayar → PUT /transactions/:id status jadi "success", baru lanjut ke onSuccess(plan).
// Kalau countdown habis → PUT status jadi "expired" sebelum redirect balik ke pricing.
// Kalau gagal konek ke MockAPI, tidak menghalangi user tetap bisa lanjut bayar (fail-safe), cuma tampil notice kecil.
// App.jsx — teruskan auth ke <Payment> supaya transaksi bisa dikaitkan ke email user yang login.

import axiosApi from "./axiosApi";

/**
 * Catat transaksi/pembelian baru ke MockAPI (resource "transactions").
 * Dipanggil saat user masuk ke halaman Payment (status awal: "pending").
 */
export async function createTransaction(data) {
  const res = await axiosApi.post("/transaction", data);
  return res.data;
}

/**
 * Ubah status transaksi yang sudah ada, mis. jadi "success" atau "expired".
 */
export async function updateTransactionStatus(id, status) {
  const res = await axiosApi.put(`/transaction/${id}`, { status });
  return res.data;
}

/**
 * Ambil riwayat transaksi milik satu user (berdasarkan email).
 */
export async function getTransactionsByEmail(email) {
  const res = await axiosApi.get("/transaction", { params: { email } });
  return res.data;
}