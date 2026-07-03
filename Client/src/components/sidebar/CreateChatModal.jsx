import { useState } from "react";
import { Loader2, X } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import FileDropzone from "../UI/FileDropzone.jsx";
import SelectedFileList from "../UI/SelectedFileList.jsx";
import { createChatSessionThunk } from "../../features/chatSession/chatSessionThunk.js";

const CreateChatModal = ({ open, onClose }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [files, setFiles] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!open) return null;

    const handleClose = () => {
        if (isSubmitting) return;
        setFiles([]);
        onClose();
    };

    const handleCreateChat = async () => {

        if (files.length === 0) return;

        try {

            setIsSubmitting(true);

            const formData = new FormData();

            files.forEach((file) => {
                formData.append("files", file);
            });

            const chatSession = await dispatch(createChatSessionThunk(formData)).unwrap();
            setFiles([]);
            onClose();
            navigate(`/chat/${chatSession._id}`);

        }
        catch (error) {
            console.error(error);

        }
        finally {

            setIsSubmitting(false);

        }

    };

    return (

        <div
            onClick={handleClose}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
        >

            <div
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-2xl rounded-2xl bg-[#2B2B2B] shadow-2xl"
            >

                {/* Header */}

                <div className="flex items-center justify-between border-b border-neutral-700 px-6 py-5">

                    <h2 className="text-2xl font-semibold text-white">

                        Create New Chat

                    </h2>

                    <button
                        disabled={isSubmitting}
                        onClick={handleClose}
                        className="rounded-lg p-2 text-neutral-400 transition hover:bg-neutral-700 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                    >

                        <X size={20} />

                    </button>

                </div>

                {/* Body */}

                <div className="space-y-6 p-6">

                    <FileDropzone
                        files={files}
                        setFiles={setFiles}
                        disabled={isSubmitting}
                    />

                    <SelectedFileList
                        files={files}
                        setFiles={setFiles}
                    />

                </div>

                {/* Footer */}

                <div className="flex justify-end gap-4 border-t border-neutral-700 px-6 py-5">

                    <button
                        disabled={isSubmitting}
                        onClick={handleClose}
                        className="rounded-lg border border-neutral-600 px-5 py-2 font-medium text-white transition hover:bg-neutral-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >

                        Cancel

                    </button>

                    <button
                        onClick={handleCreateChat}
                        disabled={files.length === 0 || isSubmitting}
                        className="flex items-center gap-2 rounded-lg bg-white px-5 py-2 font-medium text-black transition hover:bg-neutral-200 disabled:cursor-not-allowed disabled:opacity-50"
                    >

                        {isSubmitting && (
                            <Loader2
                                size={18}
                                className="animate-spin"
                            />
                        )}

                        {
                            isSubmitting
                                ? "Creating..."
                                : "Create Chat"
                        }

                    </button>

                </div>

            </div>

        </div>

    );
};

export default CreateChatModal;