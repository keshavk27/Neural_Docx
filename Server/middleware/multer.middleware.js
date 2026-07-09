import multer from "multer";
import path from "path";
import os from "os";

const allowedExtensions = [
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

const allowedMimeTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "text/plain",
    "text/csv",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/vnd.ms-powerpoint",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
];

const storage = multer.diskStorage({
    destination(req, file, cb) {
        // cb(null, "./public/tempfiles");
        cb(null, os.tmpdir());
    },

    filename(req, file, cb) {

        const uniqueName =Date.now() +"-" +Math.round(Math.random() * 1e9) +path.extname(file.originalname);

        cb(null, uniqueName);
    },
});

const fileFilter = (req, file, cb) => {

    const extension = path
        .extname(file.originalname)
        .toLowerCase();

    if (allowedExtensions.includes(extension) && allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(
            new Error(`Unsupported file type: ${extension}`),
            false
        );
    }
};

export const upload = multer({
    storage,
    fileFilter,
    limits: {
        files:3,
        fileSize: 40 * 1024 * 1024,
    },
});