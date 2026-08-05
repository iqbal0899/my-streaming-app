import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getTransactionsByEmail } from "../services/api/transaction";

/**
 * Ambil riwayat transaksi milik satu user dari MockAPI, berdasarkan email.
 */
export const fetchRiwayatTransaksi = createAsyncThunk(
  "transactions/fetchByEmail",
  async (email, { rejectWithValue }) => {
    try {
      const data = await getTransactionsByEmail(email);
      return data;
    } catch (err) {
      console.error("Gagal memuat riwayat transaksi:", err);
      return rejectWithValue(err.message || "Gagal memuat riwayat transaksi.");
    }
  }
);

const transactionSlice = createSlice({
  name: "transactions",
  initialState: {
    items: [],
    status: "idle", // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {
    clearRiwayatTransaksi(state) {
      state.items = [];
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRiwayatTransaksi.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchRiwayatTransaksi.fulfilled, (state, action) => {
        state.status = "succeeded";

        // Buang data duplikat (mis. id yang sama karena entri ganda di MockAPI)
        const unik = [];
        const seen = new Set();
        for (const trx of action.payload) {
          if (!seen.has(trx.id)) {
            seen.add(trx.id);
            unik.push(trx);
          }
        }

        // Terbaru di atas. MockAPI id increment, jadi urutkan numerik descending.
        state.items = unik.sort((a, b) => Number(b.id) - Number(a.id));
      })
      .addCase(fetchRiwayatTransaksi.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { clearRiwayatTransaksi } = transactionSlice.actions;
export default transactionSlice.reducer;