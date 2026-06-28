
import { ApiError } from "./apiError.js";
import User from "../models/user.model.js";

export const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId);

        if (!user) {
            throw new ApiError(401, "User not found.");
        }

        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;

        await user.save({
            validateBeforeSave: false,
        });

        return { accessToken, refreshToken };

    } catch (error) {
        throw new ApiError(
            500,
            "Failed to generate access and refresh tokens."
        );
    }
};