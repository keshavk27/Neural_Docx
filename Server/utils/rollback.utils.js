import fs from "fs";
import { deleteFileFromCloudinary } from "../utils/cloudinary.utils.js";
import Message from "../models/message.model.js";
import ChatSession from "../models/chatsession.model.js";
import { asyncHandler } from "../utils/asyncHandler.utility.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { deleteVectorStoreFromFastAPI } from "../services/fastapi.service.js";

// Rollback uploaded Cloudinary files.
export const rollbackCloudinaryUploads = async (uploadedFiles = []) => 
    {

    if (!uploadedFiles.length) {
        return;
    }

    for (const file of uploadedFiles) {

        try {

            await deleteFileFromCloudinary(file.cloudinaryPublicId,file.resourceType);

        } catch (error) {

            console.error(
                `Failed to rollback Cloudinary file (${file.cloudinaryPublicId}):`,
                error.message
            );
        }
    }
};


// Delete temporary multer files
export const deleteTempFiles = (files = []) => {

    for (const file of files) {
        try {

            if (file.path &&fs.existsSync(file.path) ) {
                fs.unlinkSync(file.path);
            }

        } catch (error) {

            console.error(
                `Failed to delete temp file ${file.path}:`,
                error.message
            );
        }
    }
};


//Rollback vector store
export const rollbackVectorStore = async (sessionId) => {
    try {

        await deleteVectorStoreFromFastAPI(sessionId);

    } catch (error) {

        console.error(
            "Vector Store Rollback Error:",
            error.message
        );
    }
};


