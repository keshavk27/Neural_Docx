import express from "express";
import { registerUser } from "../controllers/user.controller.js";
import { verifyOTP,resendOTP } from "../controllers/user.controller.js";

const userrouter = express.Router();

userrouter.post("/register", registerUser);
userrouter.post("/verifyOTP", verifyOTP);
userrouter.post("/resend-OTP", resendOTP);

export default userrouter;