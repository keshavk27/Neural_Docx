import { createSlice } from "@reduxjs/toolkit";
import { getMessagesThunk, sendMessageThunk } from "./messageThunk.js";

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
        addUserMessage: (state, action) => {
            const exists = state.messages.some((msg) => msg._id === action.payload._id);
            if (!exists) {
                state.messages.push(action.payload);
            }
        },
        markMessageFailed: (state, action) => {
            const message = state.messages.find(
                (msg) => msg._id === action.payload
            );
            if (message) {
                message.status = "failed";
            }
        },
        markMessageSending:(state,action)=>{
            const message=state.messages.find((msg)=>msg._id===action.payload)
            if(message)
            {
                message.status="sending";
            }
        }
    },
    extraReducers: (builder) => {
        builder
            // GET MESSAGES
            .addCase(getMessagesThunk.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getMessagesThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.messages = action.payload.map((msg) => ({
                    ...msg,
                    status: "sent",
                }));
            })
            .addCase(getMessagesThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            // SEND MESSAGE
            .addCase(sendMessageThunk.pending, (state) => {
                state.isSending = true;
                state.error = null;
            })
            .addCase(sendMessageThunk.fulfilled, (state, action) => {
                state.isSending = false;

                state.messages = state.messages.filter(
                    (msg) => msg.status !== "sending" && !String(msg._id).startsWith("temp-")
                );

                const { userMessage, assistantMessage } = action.payload;

                if (userMessage && !state.messages.some((m) => m._id === userMessage._id)) {
                    state.messages.push({
                        ...userMessage,
                        status: "sent",
                    });
                }

                if (assistantMessage && !state.messages.some((m) => m._id === assistantMessage._id)) {
                    state.messages.push({
                        ...assistantMessage,
                        status: "sent",
                    });
                }
            })
            .addCase(sendMessageThunk.rejected, (state, action) => {
                state.isSending = false;
                state.error = action.payload;
                
                const index = state.messages.findIndex( (msg) =>
                        msg.status === "sending" && msg.role === "user"
                );
                if (index !== -1) {
                    state.messages[index].status = "failed";
                }
            });
    },
});

export const { clearMessages, addUserMessage, markMessageFailed,markMessageSending } = messageSlice.actions;
export default messageSlice.reducer;