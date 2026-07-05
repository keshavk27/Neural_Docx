import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice.js';
import chatReducer from '../features/chatsession/chatSessionSlice.js';
import messageReducer from '../features/message/messageSlice.js';
export const store = configureStore({
    reducer: {
        auth: authReducer,
        chatSession: chatReducer,
        message: messageReducer
    },    
})