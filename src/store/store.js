import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import checkoutReducer from "./checkoutSlice";
import transactionReducer from "./transactionSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    checkout: checkoutReducer,
    transactions: transactionReducer,   // ← baris ini yang sering kelupaan
  },
});