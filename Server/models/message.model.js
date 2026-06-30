import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
    {
        sessionId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ChatSession",
            required: true,
        },

        role: {
            type: String,
            required: true,
            enum: ["user", "assistant"],
            trim:true
        },

        content: {
            type: String,
            required: true,
            trim: true,
        },
        
        citations: {
            type: [String],
            default: [],
        },

        metadata: {
            type: mongoose.Schema.Types.Mixed,
            default: {},
        },
    },
    {
        timestamps: true,
    }
);

const Message = mongoose.model("Message", messageSchema);

export default Message;