const expiryToMilliseconds = (expiry) => {
    if (!expiry) {
        throw new Error("Expiry value is missing.");
    }

    const value = parseInt(expiry);

    switch (expiry.slice(-1)) {
        case "s":
            return value * 1000;

        case "m":
            return value * 60 * 1000;

        case "h":
            return value * 60 * 60 * 1000;

        case "d":
            return value * 24 * 60 * 60 * 1000;

        default:
            throw new Error(`Invalid expiry format: ${expiry}`);
    }
};

const isProduction = process.env.NODE_ENV === "production";



export const accessCookieOptions = {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    maxAge: expiryToMilliseconds(process.env.ACCESS_TOKEN_EXPIRY),
};

export const refreshCookieOptions = {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    maxAge: expiryToMilliseconds(process.env.REFRESH_TOKEN_EXPIRY),
};