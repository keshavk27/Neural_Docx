import axios from "axios";
import FormData from "form-data";
import fs from "fs";

import { ApiError } from "../utils/apiError.js";

const FASTAPI_BASE_URL = process.env.FASTAPI_URL || "http://localhost:8001";

const FASTAPI_INTERNAL_SECRET = process.env.FASTAPI_INTERNAL_SECRET || "local_dev_secret_123";

// Upload documents to FastAPI
export const uploadDocumentsToFastAPI = async (sessionId, files) => {
    try {
        const formData = new FormData();
        formData.append("sessionId", sessionId);

        for (const file of files) {
            formData.append(
                "files",
                fs.createReadStream(file.path),
                file.originalname
            );
        }

        const response = await axios.post(
            `${FASTAPI_BASE_URL}/api/v1/documents/upload`,
            formData,
            {
                headers: {
                    ...formData.getHeaders(), 
                    "X-API-Key": FASTAPI_INTERNAL_SECRET 
                },
                maxBodyLength: Infinity,
                maxContentLength: Infinity,
            }
        );

        return response.data;

    } catch (error) {
        throw new ApiError(
            error.response?.status || 500,
            error.response?.data?.detail || "Failed to upload documents to FastAPI."
        );
    }
};


// Ask question
export const askQuestionToFastAPI = async ({ sessionId, question, history }) => {
    try {
    
        const response = await axios.post(
            `${FASTAPI_BASE_URL}/api/v1/chat/ask`,
            {
                sessionId,
                question,
                history,
            },
            {
                headers: {
                    "X-API-Key": FASTAPI_INTERNAL_SECRET
                }
            }
        );

        return response.data;

    } catch (error) {
        throw new ApiError(
            error.response?.status || 500,
            error.response?.data?.detail || "Failed to get response from FastAPI."
        );
    }
};


// Delete vector store
export const deleteVectorStoreFromFastAPI = async (sessionId) => {
    try {
        const response = await axios.delete(
            `${FASTAPI_BASE_URL}/api/v1/vector-store/${sessionId}`,
            {
                headers: {
                    "X-API-Key": FASTAPI_INTERNAL_SECRET
                }
            }
        );

        return response.data;

    } catch (error) {
        throw new ApiError(
            error.response?.status || 500,
            error.response?.data?.detail || "Failed to delete vector store."
        );
    }
};