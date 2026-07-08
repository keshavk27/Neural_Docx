import { useState, useEffect } from "react";
import { Trash2, X, Loader2 } from "lucide-react"; 
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { deleteChatSessionThunk } from "../../features/chatsession/chatSessionThunk.js";

const DeleteChatModal = ({ open, onClose, chatSession }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { sessionId } = useParams();
    const [isDeleting, setIsDeleting] = useState(false);
    const [localSession, setLocalSession] = useState(chatSession);

    useEffect(() => {
        if (chatSession) 
        {
            setLocalSession(chatSession);
        }
    }, [chatSession]);

    const handleClose = (e) => {
        if (e) 
        {
            e.preventDefault();
            e.stopPropagation();
        }
        if (isDeleting) return;
        onClose();
    };

    if (!open || !localSession) return null;

    const handleDelete = async (e) => {
        if (e) 
        {
            e.preventDefault();
            e.stopPropagation();
        }
        
        try {
            setIsDeleting(true);
            await dispatch(deleteChatSessionThunk(localSession._id)).unwrap();
            toast.success("Session deleted successfully.");
            if (sessionId === localSession._id) 
            {
                navigate("/chat");
            }
        } 
        catch (error) {
            toast.error(error || "Failed to delete session.");
        } 
        finally {
            setIsDeleting(false);
            onClose(); 
        }
    };

    return (
        <div onClick={handleClose}  className="fixed inset-0 z-50 flex items-center justify-center bg-[#0B0E14]/80 backdrop-blur-sm" >
            <style>{`@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&display=swap'); `}</style>

            <div onClick={(e) => { e.preventDefault(); e.stopPropagation();}}  className="w-full max-w-md cursor-default rounded-2xl border border-[#242B3D] bg-[#131722] shadow-2xl">

                <div className="flex items-center justify-between border-b border-[#242B3D] px-6 py-5">
                   
                    <h2 className="text-xl font-semibold text-[#E9ECF3]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        Delete Chat
                    </h2>
                    <button type="button" onClick={handleClose} disabled={isDeleting} className=" rounded-lg p-2 text-[#97A1B8] transition hover:bg-[#242B3D] hover:text-[#E9ECF3] disabled:cursor-not-allowed ">
                        <X size={20} />
                    </button>
                </div>

                <div className="space-y-4 px-6 py-6">
                    <div className="flex justify-center">
                        <div className="rounded-full bg-[#E8697A]/10 p-4">
                            <Trash2 size={34} className="text-[#E8697A]" />
                        </div>
                    </div>

                    <div className="space-y-3 text-center">
                        <p className="text-lg font-medium text-[#E9ECF3]">
                            Delete "{localSession.title}"?
                        </p>
                        <p className="text-sm leading-6 text-[#97A1B8]">
                            This will permanently delete the chat,
                            all conversation history, uploaded
                            documents, and associated vector data.
                        </p>
                        <p className="text-sm font-medium text-[#E8697A]">
                            This action cannot be undone.
                        </p>
                    </div>
                </div>

                <div className="flex justify-end gap-3 border-t border-[#242B3D] px-6 py-5">
                    
                    <button type="button" onClick={handleClose} disabled={isDeleting} className=" rounded-lg border border-[#242B3D] bg-transparent px-5 py-2 font-medium text-[#E9ECF3] transition hover:bg-[#1A1F2C] disabled:cursor-not-allowed">
                        Cancel
                    </button>
                    <button type="button" onClick={handleDelete} disabled={isDeleting} className=" flex items-center gap-2 rounded-lg bg-[#E8697A] px-5  py-2 font-medium text-white transition hover:-translate-y-px hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50">
                        {
                            isDeleting && 
                            (
                                <Loader2 size={16} className="animate-spin" />
                            )
                        }
                        {isDeleting ? "Deleting..." : "Delete"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteChatModal;