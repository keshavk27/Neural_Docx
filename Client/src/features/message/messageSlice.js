import { createSlice } from "@reduxjs/toolkit";
import { getMessagesThunk,sendMessageThunk,} from "./messageThunk.js";

const initialState = {
    messages: [],
    isLoading: false,
    isSending: false,
    error: null,
};

const messageSlice = createSlice({
    name: "message",
    initialState,
    reducers: {
        clearMessages: (state) => {
            state.messages = [];
            state.error = null;
        },
    },

    extraReducers: (builder) => {

        builder

            // Get Messages
            .addCase(getMessagesThunk.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getMessagesThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.messages = action.payload;
            })
            .addCase(getMessagesThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            // Send Message
            .addCase(sendMessageThunk.pending, (state) => {
                state.isSending = true;
                state.error = null;
            })
            .addCase(sendMessageThunk.fulfilled, (state, action) => {
                state.isSending = false;
                state.messages.push(action.payload.userMessage);
                state.messages.push(action.payload.assistantMessage);
            })
            .addCase(sendMessageThunk.rejected, (state, action) => {
                state.isSending = false;
                state.error = action.payload;
            });

    },

});
export const {clearMessages,} = messageSlice.actions;
export default messageSlice.reducer;