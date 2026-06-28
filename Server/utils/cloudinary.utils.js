import { v2 as cloudinary } from "cloudinary";
import path from "path";

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});

const RAW_FILE_EXTENSIONS = [
    ".pdf",
    ".doc",
    ".docx",
    ".ppt",
    ".pptx",
    ".txt",
    ".csv",
    ".xls",
    ".xlsx",
];

export const uploadFileToCloudinary = async (localFilePath) => {
    try {

        if (!localFilePath) {
            throw new Error("Local file path is required.");
        }

        const absolutePath = path.resolve(localFilePath);

        const extension = path.extname(absolutePath).toLowerCase();

        const resourceType = RAW_FILE_EXTENSIONS.includes(extension)
            ? "raw"
            : "auto";

        const response = await cloudinary.uploader.upload(
            absolutePath,
            {
                folder: "Neural_Docx",
                resource_type: resourceType,
            }
        );

        return {
            fileName: response.original_filename,
            fileType: extension.substring(1),
            cloudinaryUrl: response.secure_url,
            cloudinaryPublicId: response.public_id,
            resourceType: response.resource_type,
        };

    } catch (error) {

        console.error(
            "Cloudinary Upload Error:",
            error.message
        );

        throw new Error(
            `Cloudinary upload failed: ${error.message}`
        );
    }
};

export const deleteFileFromCloudinary = async (
    publicId,
    resourceType = "raw"
) => {
    try {

        if (!publicId) {
            throw new Error(
                "Cloudinary Public ID is required."
            );
        }

        await cloudinary.uploader.destroy(publicId, {
            resource_type: resourceType,
        });

    } catch (error) {

        console.error(
            "Cloudinary Delete Error:",
            error.message
        );

        throw new Error(
            `Cloudinary delete failed: ${error.message}`
        );
    }
};