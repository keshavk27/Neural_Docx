import { createSlice } from "@reduxjs/toolkit";

import {loginThunk,registerThunk,verifyOTPThunk,resendOTPThunk,logoutThunk,getProfileThunk,} from "./authThunk.js";

const initialState = {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    isInitializing: true,
    error: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        clearAuthError: (state) => {
            state.error = null;
        },
        resetAuthState: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.error = null;
        },
    },

    extraReducers: (builder) => {
        builder

            // Register
            .addCase(registerThunk.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(registerThunk.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(registerThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })


            // Verify OTP
            .addCase(verifyOTPThunk.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(verifyOTPThunk.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(verifyOTPThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })


            // Resend OTP
            .addCase(resendOTPThunk.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(resendOTPThunk.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(resendOTPThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })


            // Login
            .addCase(loginThunk.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(loginThunk.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(loginThunk.rejected, (state, action) => {

                state.isLoading = false;
                state.error = action.payload;
            })


            // Get Profile
            .addCase(getProfileThunk.pending, (state) => {
                state.isInitializing = true;
            })
            .addCase(getProfileThunk.fulfilled, (state, action) => {
                state.isInitializing = false;
                state.user = action.payload;
                state.isAuthenticated = true;
            })
            .addCase(getProfileThunk.rejected, (state) => {
                state.isInitializing = false;
                state.user = null;
                state.isAuthenticated = false;
            })


            // Logout
            .addCase(logoutThunk.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(logoutThunk.fulfilled, (state) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;
            })
            .addCase(logoutThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});
export const {clearAuthError,resetAuthState,} = authSlice.actions;
export default authSlice.reducer;