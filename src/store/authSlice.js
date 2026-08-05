import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { updateSubscription } from "../services/api/userApi";

// Anggap "belum berlangganan" kalau kosong/null/undefined ATAU objeknya
// tidak punya field "name" (mis. MockAPI menyimpan {} bukan null secara default)
function normalizeSubscription(sub) {
  return sub && sub.name ? sub : null;
}

function loadAuthFromStorage() {
  const user = localStorage.getItem("currentUser");
  return user ? JSON.parse(user) : null;
}

const initialAuth = loadAuthFromStorage();

const initialState = {
  auth: initialAuth, // null = belum login, isi objek user kalau sudah login
  subscription: normalizeSubscription(initialAuth?.subscription),
  saving: false,
  error: null,
};

/**
 * Dipanggil dari halaman Payment saat pembayaran berhasil dikonfirmasi.
 * Simpan status langganan ke MockAPI supaya persisten & ikut ke device/login lain.
 */
export const confirmPayment = createAsyncThunk(
  "auth/confirmPayment",
  async (plan, { getState, rejectWithValue }) => {
    const { auth } = getState().auth;
    if (!auth?.id) return plan;
    try {
      return await updateSubscription(auth.id, plan);
    } catch (err) {
      console.error("Gagal menyimpan status langganan ke MockAPI:", err);
      return rejectWithValue(err.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess(state, action) {
      const user = action.payload;
      state.auth = user;
      state.subscription = normalizeSubscription(user.subscription);
      localStorage.setItem("currentUser", JSON.stringify(user));
    },
    logout(state) {
      state.auth = null;
      state.subscription = null;
      localStorage.removeItem("currentUser");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(confirmPayment.pending, (state, action) => {
        // Update UI dulu biar terasa instan, sambil nunggu request ke MockAPI selesai
        state.saving = true;
        state.subscription = action.meta.arg;
      })
      .addCase(confirmPayment.fulfilled, (state, action) => {
        state.saving = false;
        const updatedUser = action.payload;
        if (updatedUser?.id) {
          state.auth = updatedUser;
          state.subscription = normalizeSubscription(updatedUser.subscription);
          localStorage.setItem("currentUser", JSON.stringify(updatedUser));
        }
      })
      .addCase(confirmPayment.rejected, (state, action) => {
        state.saving = false;
        state.error = action.payload || "Gagal menyimpan status langganan.";
      });
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;