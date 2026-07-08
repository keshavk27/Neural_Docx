import {asyncHandler} from "../utils/asyncHandler.utility.js";
import {ApiResponse} from "../utils/apiResponse.js";

import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import ChatSession from "../models/chatsession.model.js";

export const getAnalytics = asyncHandler(async (req, res) => {

    // Total registered users
    const totalUsers = await User.countDocuments();

    // Total questions asked (user messages)
    const totalQuestions = await Message.countDocuments({ role: "user",});


    // Total chat sessions
    const totalChatSessions = await ChatSession.countDocuments();


    // Total uploaded documents
    const documentResult = await ChatSession.aggregate([
        {
            $project: {
                fileCount: {
                    $size: "$files",
                },
            },
        },
        {
            $group: {
                _id: null,
                totalDocuments: {
                    $sum: "$fileCount",
                },
            },
        },
    ]);

    const totalDocuments = documentResult.length > 0 ? documentResult[0].totalDocuments : 0;


    // Response
    return res.status(200).json(
        new ApiResponse(
            200,
            {
                users: totalUsers,
                questions: totalQuestions,
                documents: totalDocuments,
                chatSessions: totalChatSessions,
            },
            "Analytics fetched successfully."
        )
    );

});