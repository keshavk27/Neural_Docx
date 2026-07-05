import nodemailer from "nodemailer";
import {ApiError} from "../utils/apiError.js"



export const sendOTPEmail = async (email, otp) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });
        
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Neural Docx : Email Verification",
            html: `
                <h2>Verify your email</h2>
                <p>Your OTP is:</p>
                <h1>${otp}</h1>
                <p>This OTP is valid for 5 minutes.</p>
            `,
        });
    } catch (error) {
        
        throw new ApiError(500, error.message);
    }
};