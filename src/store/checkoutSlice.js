import { createSlice } from "@reduxjs/toolkit";

function loadSelectedPlan() {
  const plan = localStorage.getItem("selectedPlan");
  return plan ? JSON.parse(plan) : null;
}

const initialState = {
  selectedPlan: loadSelectedPlan(),
  selectedMetode: localStorage.getItem("selectedMetode") || "card",
  expiredNotice: false,
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    pilihPaket(state, action) {
      state.selectedPlan = action.payload;
      state.expiredNotice = false;
      localStorage.setItem("selectedPlan", JSON.stringify(action.payload));
    },
    pilihMetode(state, action) {
      state.selectedMetode = action.payload;
      localStorage.setItem("selectedMetode", action.payload);
    },
    setExpiredNotice(state, action) {
      state.expiredNotice = action.payload;
    },
  },
});

export const { pilihPaket, pilihMetode, setExpiredNotice } = checkoutSlice.actions;
export default checkoutSlice.reducer;