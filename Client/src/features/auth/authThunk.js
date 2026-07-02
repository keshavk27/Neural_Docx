import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosinstance.api.js";


// Register
export const registerThunk = createAsyncThunk("auth/register",async (userData, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post("/user/register",userData);
            return response.data.data;
        } 
        catch (error) {
            return rejectWithValue(error.response?.data?.message ||"Registration failed.");
        }
    }
);


// Verify OTP
export const verifyOTPThunk = createAsyncThunk("auth/verifyOTP",async (otpData, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post("/user/verifyOTP",otpData);
            return response.data.data;
        } 
        catch (error) {
            return rejectWithValue(error.response?.data?.message ||"OTP verification failed.");
        }
    }
);


// Resend OTP
export const resendOTPThunk = createAsyncThunk("auth/resendOTP",async (email, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post("/user/resend-OTP",{email});
            return response.data.data;
        } 
        catch (error) {
            return rejectWithValue(error.response?.data?.message ||"Failed to resend OTP.");
        }
    }
);


// Login
export const loginThunk = createAsyncThunk("auth/login",async (credentials, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post("/user/login",credentials);
            return response.data.data;

        } 
        catch (error) {
            return rejectWithValue(error.response?.data?.message ||"Login failed.");
        }
    }
);


// Logout
export const logoutThunk = createAsyncThunk("auth/logout",async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post("/user/logout");
            return response.data.data;
        } 
        catch (error) {
            return rejectWithValue(error.response?.data?.message ||"Logout failed.");
        }
    }
);


// Get Profile
export const getProfileThunk = createAsyncThunk("auth/getProfile",async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get("/user/profile");
            return response.data.data;

        } 
        catch (error) {
            return rejectWithValue(error.response?.data?.message ||"Failed to fetch profile.");
        }
    }
);