import { createSlice } from "@reduxjs/toolkit";
import { getAnalyticsThunk } from "./analyticsThunk.js";

const initialState = {
    analytics: {
        users: 0,
        questions: 0,
        documents: 0,
        chatSessions: 0,
    },
    isLoading: false,
    error: null,
};

const analyticsSlice = createSlice({
    name: "analytics",
    initialState,
    reducers: {
        clearAnalyticsError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder

            // Get Analytics
            .addCase(getAnalyticsThunk.pending, (state) => {

                state.isLoading = true;
                state.error = null;

            })
            .addCase(getAnalyticsThunk.fulfilled, (state, action) => {

                state.isLoading = false;
                state.analytics = action.payload;

            })
            .addCase(getAnalyticsThunk.rejected, (state, action) => {

                state.isLoading = false;
                state.error = action.payload;

            });

    },

});
export const {clearAnalyticsError,} = analyticsSlice.actions;
export default analyticsSlice.reducer;