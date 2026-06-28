import mongoose from "mongoose";

const fileSchema = new mongoose.Schema(
    {
        fileName: {
            type: String,
            required: true,
        },
        fileType: {
            type: String,
            required: true,
            enum: ["pdf","docx","pptx","txt","csv","xlsx",],
        },
        cloudinaryUrl: {
            type: String,
            required: true,
        },

        cloudinaryPublicId: {
            type: String,
            required: true,
        },
    },
    {
        _id: false,
    }
);

const chatSessionSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        title: {
            type: String,
            required: true,
            trim:true
        },

        files: {
            type: [fileSchema],
            required: true,
            
        },

        vectorStoreLocation: {
            type: String,
            required: true,
        },

       
    },
    {
        timestamps: true,
    }
);

const ChatSession = mongoose.model("ChatSession",chatSessionSchema);
export default ChatSession