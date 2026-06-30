import express from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import {getAllChatSessions,deleteChatSession,getChatSessionById,createChatSession} from "../controllers/chatsession.controller.js"
import { uploadChatDocuments } from "../middleware/upload.middleware.js";

const chatSessionrouter = express.Router();


chatSessionrouter.get("/getallchatsession",verifyJWT,getAllChatSessions);
chatSessionrouter.get("/:sessionId",verifyJWT,getChatSessionById);
chatSessionrouter.delete("/:sessionId",verifyJWT,deleteChatSession)
chatSessionrouter.post("/createchatsession",verifyJWT,uploadChatDocuments,createChatSession)


export default chatSessionrouter;