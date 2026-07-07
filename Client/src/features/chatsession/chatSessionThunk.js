import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosinstance.api";


// Create Chat Session
export const createChatSessionThunk = createAsyncThunk("chatSession/create",async (formData, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post("/chatsessions/createchatsession",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            return response.data.data;
        } 
        catch (error) {
            return rejectWithValue(error.response?.data?.message ||"Failed to create chat session.");
        }
    }
);


// Get All Chat Sessions
export const getAllChatSessionsThunk = createAsyncThunk("chatSession/getAll",async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get("/chatsessions/getallchatsession" );
            return response.data.data;
        } 
        catch (error) {
            return rejectWithValue( error.response?.data?.message || "Failed to fetch chat sessions.");
        }
    }
);


// Get Chat Session By Id
export const getChatSessionByIdThunk = createAsyncThunk("chatSession/getById",async (sessionId, { rejectWithValue }) => {
        try {

            const response = await axiosInstance.get(`/chatsessions/${sessionId}`);
            return response.data.data;

        } 
        catch (error) {
            return rejectWithValue(error.response?.data?.message ||"Failed to fetch chat session.");
        }
    }
);


// Delete Chat Session
export const deleteChatSessionThunk = createAsyncThunk("chatSession/delete",async (sessionId, { rejectWithValue }) => {
        try {
            await axiosInstance.delete(`/chatsessions/${sessionId}`);
            return sessionId;
        } 
        catch (error) {
            return rejectWithValue(error.response?.data?.message ||"Failed to delete chat session.");
        }
    }
);


// Upload Document to Existing Session
export const uploadToExistingSessionThunk = createAsyncThunk("chatSession/uploadDocument",async ({ sessionId, formData }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post(`/chatsessions/${sessionId}/upload`, 
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            return response.data.data; 
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to upload document.");
        }
    }
);