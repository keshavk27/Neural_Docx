import OTP from "../models/otp.model.js";

const OTP_EXPIRY_MINUTES = Number(process.env.OTP_EXPIRY_MINUTES || 5);

export const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

// Create/replace OTP for a user
export const createOTP = async (userId) => {

    await OTP.deleteOne({ userId });

    const otp = generateOTP();

    await OTP.create({
        userId,
        otp,
        expiresAt: new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000),
    });

    return otp;
};