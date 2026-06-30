import mongoose from "mongoose";
import ChatSession from "../models/chatsession.model.js";
import Message from "../models/message.model.js";



export const deleteChatSessionTransaction = async (chatSession) => {

    const session = await mongoose.startSession();
    try {

        session.startTransaction();
        await Message.deleteMany(
            {
                sessionId:chatSession._id,
            },
            {
                session,
            }
        );

        await ChatSession.findByIdAndDelete(
            chatSession._id,
            {
                session,
            }
        );

        await session.commitTransaction();

    } catch (error) {

        await session.abortTransaction();

        throw error;

    } finally {

        await session.endSession();
    }
};