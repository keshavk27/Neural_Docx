const expiryToMilliseconds = (expiry) => {
    const value = parseInt(expiry);

    switch (expiry.slice(-1)) {
        case "m":
            return value * 60 * 1000;

        case "h":
            return value * 60 * 60 * 1000;

        case "d":
            return value * 24 * 60 * 60 * 1000;

        default:
            throw new Error("Invalid expiry format.");
    }
};

export const accessCookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite:
        process.env.NODE_ENV === "production"
            ? "none"
            : "lax",

    maxAge: expiryToMilliseconds(
        process.env.ACCESS_TOKEN_EXPIRY
    ),
};

export const refreshCookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite:
        process.env.NODE_ENV === "production"
            ? "none"
            : "lax",

    maxAge: expiryToMilliseconds(
        process.env.REFRESH_TOKEN_EXPIRY
    ),
};