import ChatSession from "../models/chatsession.model.js";
import Message from "../models/message.model.js";
import { asyncHandler } from "../utils/asyncHandler.utility.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { askQuestionToFastAPI } from "../services/fastapi.service.js";



// Send Message
export const sendMessage = asyncHandler(async (req, res) => {

        // Validate user
        if (!req.user?._id) {
            throw new ApiError(
                401,
                "Unauthorized request."
            );
        }


        // Validate session ID
        const { sessionId } = req.params;

        if (!sessionId) {
            throw new ApiError(
                400,
                "Session ID is required."
            );
        }


        // Validate mssg
        const { message } = req.body;

        if (!message ||message.trim() === "") 
        {
            throw new ApiError(
                400,
                "Message is required."
            );
        }

        
        // Find chat session
        const chatSession =await ChatSession.findOne({_id: sessionId,userId: req.user._id,});

        if (!chatSession) 
        {
            throw new ApiError(
                404,
                "Chat session not found."
            );
        }

        
        // Save user mssg
        const userMessage =await Message.create({sessionId,role: "user",content: message.trim(),});

        if (!userMessage) 
        {
            throw new ApiError(
                500,
                "Failed to save user message."
            );
        }

    
        // Fetch prv mssg
        const messages =await Message.find(
            {
                sessionId:sessionId,
                _id:{$ne: userMessage._id}
            })
            .sort({createdAt: -1,})
            .limit(20);

        messages.reverse();


        // Convert mssg history 
        const history = messages.map((message) => (
            {
                role: message.role,
                content: message.content,
            })
        );



        // Ask FastAPI
        let aiResponse;

        try {
            aiResponse =await askQuestionToFastAPI({sessionId,question: message.trim(),history,});

        } 
        catch (error) {
            if (userMessage && userMessage._id) {
                await Message.findByIdAndDelete(userMessage._id);
            }
            throw new ApiError(
                500,
                error.message ||"Failed to get AI response."
            );
        }

        
        // Validate AI response
        if (!aiResponse ||!aiResponse.answer) 
        {
            throw new ApiError(
                500,
                "Invalid response received from AI server."
            );
        }

        
        // Save assistant mssg 
        const assistantMessage =await Message.create(
            {
                sessionId,
                role: "assistant",
                content: aiResponse.answer,
                citations:aiResponse.citations || [],
                metadata:aiResponse.metadata || {},
            });

        if (!assistantMessage)
        {
            throw new ApiError(
                500,
                "Failed to save assistant message."
            );
        }

        
        // Update timestamp 
        chatSession.updatedAt = new Date();
        await chatSession.save({validateBeforeSave: false,});

        // Success 
        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    {
                        userMessage,
                        assistantMessage,
                    },
                    "Message sent successfully."
                )
            );
    }
);


// Get Messages
export const getMessages = asyncHandler(async (req, res) => {

        if (!req.user?._id) 
        {
            throw new ApiError(
                401,
                "Unauthorized request."
            );
        }

        
        // Validate session ID
        const { sessionId } = req.params;

        if (!sessionId) 
        {
            throw new ApiError(
                400,
                "Session ID is required."
            );
        }

        
        const chatSession = await ChatSession.findOne({
            _id: sessionId,
            userId: req.user._id,
        });

        if (!chatSession) 
        {
            throw new ApiError(
                404,
                "Chat session not found."
            );
        }

        
        const messages = await Message.find(
            {
                sessionId,
            })
            .select(
                "role content citations metadata createdAt"
            )
            .sort({
                createdAt: 1,
            }
        );

        
        // Success 
        return res.status(200).json(
            new ApiResponse(
                200,
                messages,
                "Messages fetched successfully."
            )
        );
    }
);