import { createSlice } from "@reduxjs/toolkit";
import {createChatSessionThunk,getAllChatSessionsThunk,getChatSessionByIdThunk,deleteChatSessionThunk,uploadToExistingSessionThunk} from "./chatSessionThunk";
const initialState = {
    chatSessions: [],
    selectedChatSession: null,
    isLoading: false,
    error: null,
};
const chatSessionSlice = createSlice({
    name: "chatSession",
    initialState,
    reducers: {
        clearChatSessionError: (state) => {
            state.error = null;
        },
        clearSelectedChatSession: (state) => {
            state.selectedChatSession = null;
        },
        updateSelectedChatSessionFiles: (state, action) => {

            if (!state.selectedChatSession) return;
            state.selectedChatSession.files = action.payload;

            const index = state.chatSessions.findIndex(
                (chat) => chat._id === state.selectedChatSession._id
            );
            if (index !== -1) 
            {
                state.chatSessions[index].files = action.payload;
            }
        },

    },

    extraReducers: (builder) => {
        builder

            // Create Chat Session
            .addCase(createChatSessionThunk.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(createChatSessionThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.chatSessions.unshift(action.payload);
                state.selectedChatSession = action.payload;
            })
            .addCase(createChatSessionThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })


            // Get All Chat Sessions
            .addCase(getAllChatSessionsThunk.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getAllChatSessionsThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.chatSessions = action.payload;
            })
            .addCase(getAllChatSessionsThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })


            // Get Chat Session By Id
            .addCase(getChatSessionByIdThunk.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getChatSessionByIdThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.selectedChatSession = action.payload;
            })
            .addCase(getChatSessionByIdThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })


            // Delete Chat Session
            .addCase(deleteChatSessionThunk.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deleteChatSessionThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.chatSessions = state.chatSessions.filter(
                    (chatSession) =>chatSession._id !== action.payload
                );
                if (state.selectedChatSession?._id ===action.payload) {
                    state.selectedChatSession = null;
                }
            })
            .addCase(deleteChatSessionThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            
            //addDocumentsToSession
            .addCase(uploadToExistingSessionThunk.fulfilled, (state, action) => {
                if (state.selectedChatSession) {
                    if(!state.selectedChatSession.files)
                    {
                        state.selectedChatSession.files=[];
                    }
                    state.selectedChatSession.files.push(...action.payload);
                }
                
                if (state.selectedChatSession) {
                    const index = state.chatSessions.findIndex(
                        (chat) => chat._id === state.selectedChatSession._id
                    );
                    if (index !== -1) {
                        if(!state.chatSessions[index].files)
                        {
                            state.chatSessions[index].files=[];
                        }
                        state.chatSessions[index].files.push(...action.payload);
                    }
                }
            });

    },
});
export const {clearChatSessionError,clearSelectedChatSession,updateSelectedChatSessionFiles} = chatSessionSlice.actions;
export default chatSessionSlice.reducer;