import User from "../models/user.model.js";
import OTP from "../models/otp.model.js";
import { asyncHandler } from "../utils/asyncHandler.utility.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { createOTP } from "../services/otp.service.js";
import { sendOTPEmail } from "../services/mail.service.js";
import {accessCookieOptions,refreshCookieOptions,} from "../utils/cookie.utils.js";
import { generateAccessAndRefreshTokens } from "../utils/tokens.utils.js";

export const registerUser = asyncHandler(async (req, res) => {
    const { fullname, username, email, password } = req.body;

    // Validate fields
    if (
        [fullname, username, email, password].some(
            (field) => !field || field.trim() === ""
        )
    ) {
        throw new ApiError(400, "All fields are required.");
    }

    const normalizedEmail = email.trim().toLowerCase();
    const normalizedUsername = username.trim().toLowerCase();

    // Check existing email or username
    const existingUser = await User.findOne({
        $or: [
            { email: normalizedEmail },
            { username: normalizedUsername },
        ],
    });

    if (existingUser) {
        if (existingUser.email === normalizedEmail) {
            if (!existingUser.isVerified) {
                throw new ApiError(
                    409,
                    "An account with this email already exists but is not verified. Please verify your email or request a new OTP."
                );
            }

            throw new ApiError(409, "Email is already registered.");
        }

        throw new ApiError(409, "Username already exists.");
    }

    // Generate avatar
    const avatar = `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(
        fullname.trim()
    )}`;

    // Create user
    const user = await User.create({
        fullname: fullname.trim(),
        username: normalizedUsername,
        email: normalizedEmail,
        password,
        avatar,
    });

    try {
        // Generate & store OTP
        const otp = await createOTP(user._id);
        // Send OTP email
        await sendOTPEmail(user.email, otp);
    } catch (error) {
        // Rollback
        await OTP.deleteOne({ userId: user._id });
        await User.findByIdAndDelete(user._id);
        throw new ApiError(
            500,
            "Failed to send OTP. Please try again."
        );
    }

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    );

    return res.status(201).json(
        new ApiResponse(
            201,
            createdUser,
            "Registration successful. Please verify your email using the OTP sent to your registered email."
        )
    );
});

export const verifyOTP = asyncHandler(async (req, res) => {

    const { email, otp } = req.body;

    // Validate input
    if (!email || !otp) {
        throw new ApiError(400, "Email and OTP are required.");
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Find user
    const user = await User.findOne({
        email: normalizedEmail,
    });

    if (!user) {
        throw new ApiError(404, "User not found.");
    }

    // Already verified
    if (user.isVerified) {
        throw new ApiError(400, "User is already verified.");
    }

    // Find OTP
    const otpRecord = await OTP.findOne({
        userId: user._id,
    });

    if (!otpRecord) {
        throw new ApiError(400, "Invalid OTP. Please request a new OTP.");
    }

    // Check expiry
    if (otpRecord.expiresAt < new Date()) {

        await OTP.deleteOne({
            userId: user._id,
        });

        throw new ApiError(
            400,
            "OTP has expired. Please request a new OTP."
        );
    }

    // Verify OTP
    if (otpRecord.otp !== otp) {
        throw new ApiError(400, "Invalid OTP.");
    }

    // Mark user as verified
    user.isVerified = true;

    await user.save({
        validateBeforeSave: false,
    });

    // Delete OTP
    await OTP.deleteOne({
        userId: user._id,
    });

    return res.status(200).json(
        new ApiResponse(
            200,
            {},
            "Email verified successfully. Please login."
        )
    );
});

export const resendOTP = asyncHandler(async (req, res) => {

    const { email } = req.body;

    // Validate email
    if (!email || email.trim() === "") {
        throw new ApiError(400, "Email is required.");
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Find user
    const user = await User.findOne({
        email: normalizedEmail,
    });

    if (!user) {
        throw new ApiError(404, "User not found.");
    }

    // Already verified
    if (user.isVerified) {
        throw new ApiError(
            400,
            "User is already verified. Please login."
        );
    }

    // Generate new OTP
    try {
        const otp = await createOTP(user._id);
        await sendOTPEmail(user.email, otp);
    } catch (error) {
        await OTP.deleteOne({ userId: user._id });
        throw new ApiError(
            500,
            "Failed to resend OTP. Please try again."
        );
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            {},
            "A new OTP has been sent to your registered email."
        )
    );
});


export const loginUser = asyncHandler(async (req, res) => {

    const { email, password } = req.body;

    // Validate
    if (!email || !password) {
        throw new ApiError(400, "Email and password are required.");
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Find user
    const user = await User.findOne({
        email: normalizedEmail,
    });

    if (!user) {
        throw new ApiError(401, "User not found.");
    }

    // Verify email
    if (!user.isVerified) {
        throw new ApiError(
            403,
            "Please verify your email before logging in."
        );
    }

    // Check password
    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid credentials.");
    }

    // Generate tokens
    const { accessToken, refreshToken } =await generateAccessAndRefreshTokens(user._id);

    // Remove sensitive fields
    const loggedInUser = await User.findById(user._id).select(
        "-password -refreshToken"
    );

    return res
        .status(200)
        .cookie(
            "accessToken",
            accessToken,
            accessCookieOptions
        )
        .cookie(
            "refreshToken",
            refreshToken,
            refreshCookieOptions
        )
        .json(
            new ApiResponse(
                200,
                {
                    user: loggedInUser,
                    
                },
                "Login successful."
            )
        );
});

export const logoutUser = asyncHandler(async (req, res) => {

    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                refreshToken: "",
            },
        },
        {
            new: true,
        }
    );

    return res
        .status(200)
        .clearCookie("accessToken", accessCookieOptions)
        .clearCookie("refreshToken", refreshCookieOptions)
        .json(
            new ApiResponse(
                200,
                {},
                "User logged out successfully."
            )
        );
});

export const getProfile = asyncHandler(
    async (req, res) => {

        const user = await User.findById(req.user._id).select("-password -refreshToken");

        return res.status(200).json(
            new ApiResponse(
                200,
                user,
                "Profile fetched successfully."
            )
        );

    }
);