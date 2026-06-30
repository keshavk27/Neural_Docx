import { upload } from "./multer.middleware.js";
import { ApiError } from "../utils/apiError.js";

export const uploadChatDocuments = (req,res,next) => {

    upload.array("files", 3)(req,res,(error) => 
        {
            if (error) 
            {
                return next(
                    new ApiError(
                        400,
                        error.message
                    )
                );
            }

            next();
        }
    );
};