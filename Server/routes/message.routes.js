import express from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { getMessages, sendMessage } from "../controllers/message.controller.js";

const messagerouter=express.Router();

messagerouter.post("/send/:sessionId",verifyJWT,sendMessage);
messagerouter.get("/get/:sessionId",verifyJWT,getMessages);

export default messagerouter;