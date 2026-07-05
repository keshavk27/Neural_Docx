import { useState } from "react";
import { Trash2, X } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { deleteChatSessionThunk } from "../../features/chatSession/chatSessionThunk.js";

const DeleteChatModal = ({ open, onClose, chatSession,}) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { sessionId } = useParams();

    const [isDeleting, setIsDeleting] = useState(false);

    if (!open || !chatSession) return null;

    const handleDelete = async () => {
        setIsDeleting(true);
        const result = await dispatch(deleteChatSessionThunk(chatSession._id));

        setIsDeleting(false);

        if (deleteChatSessionThunk.fulfilled.match(result)) {
            onClose();
            if (sessionId === chatSession._id) {
                navigate("/");
            }

        }

    };

    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="w-full max-w-md rounded-2xl bg-[#2B2B2B] shadow-2xl">

                {/* Header */}
                <div className="flex items-center justify-between border-b border-neutral-700 px-6 py-5">
                    <h2 className="text-xl font-semibold text-white">
                        Delete Chat
                    </h2>
                    <button
                        onClick={onClose}
                        disabled={isDeleting}
                        className="
                            rounded-lg
                            p-2
                            text-neutral-400
                            transition
                            hover:bg-neutral-700
                            hover:text-white
                            disabled:cursor-not-allowed
                        "
                    >
                        <X size={20} />
                    </button>
                </div>


                {/* Body */}
                <div className="space-y-4 px-6 py-6">
                    <div className="flex justify-center">
                        <div className="rounded-full bg-red-500/10 p-4">
                            <Trash2 size={34}  className="text-red-500"/>
                        </div>
                    </div>

                    <div className="space-y-3 text-center">
                        <p className="text-lg font-medium text-white">
                            Delete "{chatSession.title}"?
                        </p>
                        <p className="text-sm leading-6 text-neutral-400">
                            This will permanently delete the chat,
                            all conversation history, uploaded
                            documents, and associated vector data.
                        </p>
                        <p className="text-sm font-medium text-red-400">
                            This action cannot be undone.
                        </p>
                    </div>
                </div>


                {/* Footer */}
                <div className="flex justify-end gap-3 border-t border-neutral-700 px-6 py-5">

                    <button
                        onClick={onClose}
                        disabled={isDeleting}
                        className="
                            rounded-lg
                            border
                            border-neutral-600
                            px-5
                            py-2
                            font-medium
                            text-white
                            transition
                            hover:bg-neutral-700
                            disabled:cursor-not-allowed
                        "
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleDelete}
                        disabled={isDeleting}
                        className="
                            flex
                            items-center
                            gap-2
                            rounded-lg
                            bg-red-600
                            px-5
                            py-2
                            font-medium
                            text-white
                            transition
                            hover:bg-red-700
                            disabled:cursor-not-allowed
                            disabled:opacity-50
                        "
                    >
                        <Trash2 size={16} />
                        {
                            isDeleting ? "Deleting..." : "Delete"
                        }
                    </button>
                </div>
            </div>
        </div>
    );
};
export default DeleteChatModal;