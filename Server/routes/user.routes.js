import express from "express";
import { registerUser,loginUser,logoutUser,getProfile } from "../controllers/user.controller.js";
import { verifyOTP,resendOTP } from "../controllers/user.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const userrouter = express.Router();

userrouter.post("/register", registerUser);
userrouter.post("/verifyOTP", verifyOTP);
userrouter.post("/resend-OTP", resendOTP);
userrouter.post("/login", loginUser);
userrouter.post("/logout",verifyJWT, logoutUser);
userrouter.get("/profile", verifyJWT, getProfile);

export default userrouter;