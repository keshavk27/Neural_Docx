import multer from "multer";

import { ApiError } from "../utils/apiError.js";

export const errorHandler = (err,req,res,next) => {

    // Multer Errors
    if (err instanceof multer.MulterError) 
    {
        return res.status(400).json({
            success: false,
            message: err.message,
        });
    }

    
    // ApiError
    if (err instanceof ApiError) 
    {

        return res.status(err.statusCode).json(
        {

            success: false,

            statusCode: err.statusCode,

            message: err.message,

            errors: err.errors || [],

        });
    }

    
    // Unknown Errors
    console.error(err);

    return res.status(500).json({

        success: false,

        statusCode: 500,

        message: "Internal Server Error.",

    });
};