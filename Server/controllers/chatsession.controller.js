import ChatSession from "../models/chatsession.model.js";
import Message from "../models/message.model.js"
import { asyncHandler } from "../utils/asyncHandler.utility.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import {uploadFileToCloudinary} from "../utils/cloudinary.utils.js";
import {uploadDocumentsToFastAPI,deleteVectorStoreFromFastAPI} from "../services/fastapi.service.js";
import { deleteTempFiles,rollbackCloudinaryUploads,rollbackVectorStore } from "../utils/rollback.utils.js";
import { deleteChatSessionTransaction } from "../utils/database.utils.js";
import mongoose from "mongoose";
import path from "path";



// create new chatsession
export const createChatSession = asyncHandler(
    async (req, res) => {

        // used for rollback
        const uploadedCloudinaryFiles = [];

        try {

            // Validate Uploaded Files
            if (!req.files ||req.files.length === 0) {
                throw new ApiError(
                    400,
                    "Please upload at least one document."
                );
            }

            if (req.files.length > 3) {
                throw new ApiError(
                    400,
                    "Maximum 3 files are allowed."
                );
            }

            // Validate User
            if (!req.user?._id) {
                throw new ApiError(
                    401,
                    "Unauthorized request."
                );
            }

            // Upload Files To Cloudinary
            for (const file of req.files) {
                const uploadedFile =await uploadFileToCloudinary(file.path);
                uploadedCloudinaryFiles.push(uploadedFile);
            }

            // Verify Upload Count
            if (uploadedCloudinaryFiles.length !==req.files.length) {
                throw new ApiError(
                    500,
                    "Some files failed to upload to Cloudinary."
                );
            }

            // Prepare Chat Session Data
            const files = uploadedCloudinaryFiles.map((file) => (
                {
                    fileName: file.fileName,
                    fileType: file.fileType,
                    cloudinaryUrl:file.cloudinaryUrl,
                    cloudinaryPublicId:file.cloudinaryPublicId,
                })
            );

            // Create Chat Session
            
            const title = path.parse(req.files[0].originalname).name || "Untitled Session";

            const chatSession =await ChatSession.create(
                {
                    userId: req.user._id,
                    title,
                    files,
                });

            if (!chatSession) {
                throw new ApiError(
                    500,
                    "Failed to create chat session."
                );
            }

            try {

                await uploadDocumentsToFastAPI(chatSession._id.toString(),req.files);

            } catch (error) {

                // Rollback Chat Session
                try {

                    await ChatSession.findByIdAndDelete(chatSession._id);

                } catch (rollbackError) {
                    console.error("ChatSession Rollback Error:",rollbackError.message);
                }

                throw error;
            }

            // Fetch Created Chat Session
            const createdChatSession =await ChatSession.findById(chatSession._id).populate("userId","fullname username avatar");

            if (!createdChatSession) {

                // Rollback Cloudinary Uploads
                await rollbackCloudinaryUploads(uploadedCloudinaryFiles);

                throw new ApiError(
                    500,
                    "Failed to fetch created chat session."
                );
            }
            
            // Success Response
            return res
                .status(201)
                .json(
                    new ApiResponse(
                        201,
                        createdChatSession,
                        "Chat session created successfully."
                    )
                );

        } catch (error) {

            // Rollback Cloudinary Uploads
            if (uploadedCloudinaryFiles.length > 0) {
                await rollbackCloudinaryUploads(uploadedCloudinaryFiles);
            }
            throw error;
        } finally {
            // Delete Temporary Multer Files
            deleteTempFiles(req.files);
        }
    }
);


// Get All Chat Sessions
export const getAllChatSessions = asyncHandler(async (req, res) => {

        // Validade User
        if (!req.user?._id) {
            throw new ApiError(
                401,
                "Unauthorized request."
            );
        }

        // Fetch Chat Sessions
        const chatSessions = await ChatSession.find({ userId: req.user._id,})
            .select("title  createdAt updatedAt")
            .sort({updatedAt: -1,});

        // Success Response
        return res.status(200).json(
            new ApiResponse(
                200,
                chatSessions,
                "Chat sessions fetched successfully."
            )
        );
    }
);


// Get Chat Session By ID
export const getChatSessionById = asyncHandler(async (req, res) => {

        // Validate User
        if (!req.user?._id) {
            throw new ApiError(
                401,
                "Unauthorized request."
            );
        }

        // Validate Session ID
        const { sessionId } = req.params;

        if (!sessionId) {
            throw new ApiError(
                400,
                "Session ID is required."
            );
        }

        // Fetch Chat Session
        const chatSession = await ChatSession.findOne({
            _id: sessionId,
            userId: req.user._id,
        }).populate(
            "userId",
            "fullname username avatar"
        );

        // Check Existence
        if (!chatSession) {
            throw new ApiError(
                404,
                "Chat session not found."
            );
        }

        // Success Response
        return res.status(200).json(
            new ApiResponse(
                200,
                chatSession,
                "Chat session fetched successfully."
            )
        );
    }
);


// Delete Chat Session
export const deleteChatSession = asyncHandler(async (req, res) => {

        // Validate User
        if (!req.user?._id) {
            throw new ApiError(
                401,
                "Unauthorized request."
            );
        }

        
        // Validate Session ID
        const { sessionId } = req.params;

        if (!sessionId) {
            throw new ApiError(
                400,
                "Session ID is required."
            );
        }

        // Find Chat Session
        const chatSession = await ChatSession.findOne({
            _id: sessionId,
            userId: req.user._id,
        });

        if (!chatSession) {
            throw new ApiError(
                404,
                "Chat session not found."
            );
        }

        // Delete Vector Store   (directly calling fastAPI service to propagate error)
        await deleteVectorStoreFromFastAPI(chatSession._id.toString());

        // Delete Cloudinary Files
        await rollbackCloudinaryUploads(chatSession.files);


        // MONGODB Transaction for message and chat deletion
        await deleteChatSessionTransaction(chatSession);
        


        // Success Response
        return res.status(200).json(
            new ApiResponse(
                200,
                {},
                "Chat session deleted successfully."
            )
        );
    }
);


// Add Documents to Existing Chat Session
export const addDocumentToSession = asyncHandler(async (req, res) => {
    
    const uploadedCloudinaryFiles = [];
    try {
        // Validate Session ID
        const { sessionId } = req.params;
        if (!sessionId) {
            throw new ApiError(400, "Session ID is required.");
        }

        // Validate Uploaded Files
        if (!req.files || req.files.length === 0) {
            throw new ApiError(400, "Please upload at least one document.");
        }

        // Keep your existing file limit rules
        if (req.files.length > 3) {
            throw new ApiError(400, "Maximum 3 files are allowed per upload.");
        }

        // Validate User & Session Existence
        const chatSession = await ChatSession.findOne({ 
            _id: sessionId, 
            userId: req.user._id 
        });

        if (!chatSession) {
            throw new ApiError(404, "Chat session not found or unauthorized.");
        }

        // Upload Files To Cloudinary
        for (const file of req.files) {
            const uploadedFile = await uploadFileToCloudinary(file.path);
            uploadedCloudinaryFiles.push(uploadedFile);
        }

        if (uploadedCloudinaryFiles.length !== req.files.length) {
            throw new ApiError(500, "Some files failed to upload to Cloudinary.");
        }

        // Send to FastAPI Vector Store
        try {
            await uploadDocumentsToFastAPI(sessionId, req.files);
        } catch (error) {
            throw error; 
        }

        // Prepare File Data for MongoDB
        const newFiles = uploadedCloudinaryFiles.map((file) => ({
            fileName: file.fileName,
            fileType: file.fileType,
            cloudinaryUrl: file.cloudinaryUrl,
            cloudinaryPublicId: file.cloudinaryPublicId,
        }));

        // Push new files to the existing MongoDB array and save
        chatSession.files.push(...newFiles);
        await chatSession.save();

        // Success Response 
        return res.status(200).json(
            new ApiResponse(
                200,
                newFiles, 
                "Documents added to session successfully."
            )
        );

    } catch (error) {
        // Rollback Cloudinary Uploads if anything fails (FastAPI or MongoDB)
        if (uploadedCloudinaryFiles.length > 0) {
            await rollbackCloudinaryUploads(uploadedCloudinaryFiles);
        }
        throw error;
    } finally {
        // Delete Temporary Multer Files
        if (req.files) {
            deleteTempFiles(req.files);
        }
    }
});