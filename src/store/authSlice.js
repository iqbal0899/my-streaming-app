import { createSlice } from "@reduxjs/toolkit";

function loadAuthFromStorage() {
    const user = localStorage.getItem("currentUser");

    return user ? JSON.parse(user) : null;
}

const initialState = {
    auth: loadAuthFromStorage(),
    subscription: null,
    saving: false,
    error: null,
};

const authSlice = createSlice({
    name: "auth",

    initialState,

    reducers: {
        // Dipanggil setelah login berhasil
        loginSuccess: (state, action) => {
            const user = action.payload;

            state.auth = user;
            state.error = null;

            // Simpan data user
            localStorage.setItem(
                "currentUser",
                JSON.stringify(user)
            );
        },

        // Logout
        logout: (state) => {
            state.auth = null;
            state.subscription = null;
            state.error = null;

            localStorage.removeItem("currentUser");
            localStorage.removeItem("token");
        },

        // Update data user
        updateUser: (state, action) => {
            const updatedUser = action.payload;

            state.auth = {
                ...state.auth,
                ...updatedUser
            };

            localStorage.setItem(
                "currentUser",
                JSON.stringify(state.auth)
            );
        },

        // Update subscription di frontend
        confirmPayment: (state, action) => {
            state.subscription = action.payload;
        },
    },
});

export const {
    loginSuccess,
    logout,
    updateUser,
    confirmPayment,
} = authSlice.actions;



export default authSlice.reducer;