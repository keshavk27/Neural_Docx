import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosinstance.api.js";

export const getAnalyticsThunk = createAsyncThunk("analytics/getAnalytics",async (_, thunkAPI) => {

        try {
            const response = await axiosInstance.get( "/analytics");
            return response.data.data;
        }
        catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message ||error.response?.data?.detail ||"Failed to fetch analytics.");
        }

    }
);