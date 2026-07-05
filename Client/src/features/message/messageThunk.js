import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axiosinstance.api";


export const getMessagesThunk = createAsyncThunk("message/get",async (sessionId, { rejectWithValue }) => {
        try {
            const response = await api.get(`/messages/get/${sessionId}`);
            return response.data.data;
        }
        catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch messages.");
        }
    }
);

export const sendMessageThunk = createAsyncThunk("message/send", async ( { sessionId, message },{ rejectWithValue }) => {

        try {
            const response = await api.post( `/messages/send/${sessionId}`, { message });
            return response.data.data;
        }
        catch (error) {
            return rejectWithValue( error.response?.data?.message ||"Failed to send message.");
        }

    }
);