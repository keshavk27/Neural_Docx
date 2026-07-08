import { useState } from "react";
import { Loader2, X } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
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
            navigate(`/chat/${chatSession._id}`);
            toast.success("Session created.")
        }
        catch (error) {
            toast.error("Error uploading documents");
            console.error(error);
        }
        finally {
            setFiles([]);
            onClose();
            setIsSubmitting(false);
        }
    };

    return (

        <div onClick={handleClose} className="fixed inset-0 z-50 flex items-center justify-center bg-[#0B0E14]/80 backdrop-blur-sm">
            <style>{` @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&display=swap');`}</style>
            <div onClick={(e) => e.stopPropagation()} className="w-full max-w-2xl rounded-2xl border border-[#242B3D] bg-[#131722] shadow-2xl" >

                <div className="flex items-center justify-between border-b border-[#242B3D] px-6 py-5">
                    <h2 className="text-2xl font-semibold text-[#E9ECF3]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        Create New Chat
                    </h2>
                    <button disabled={isSubmitting} onClick={handleClose} className="rounded-lg p-2 text-[#97A1B8] transition hover:bg-[#242B3D] hover:text-[#E9ECF3] disabled:cursor-not-allowed disabled:opacity-50">
                        <X size={20} />
                    </button>
                </div>

                <div className="space-y-6 p-6">
                    <FileDropzone files={files} setFiles={setFiles} disabled={isSubmitting}/>
                    <SelectedFileList files={files} setFiles={setFiles}/>
                </div>

                <div className="flex justify-end gap-4 border-t border-[#242B3D] px-6 py-5">
                    <button disabled={isSubmitting} onClick={handleClose} className="rounded-lg border border-[#242B3D] bg-transparent px-5 py-2 font-medium text-[#E9ECF3] transition hover:bg-[#1A1F2C] disabled:cursor-not-allowed disabled:opacity-50">
                        Cancel
                    </button>
                    <button onClick={handleCreateChat} disabled={files.length === 0 || isSubmitting} className="flex items-center gap-2 rounded-lg bg-[#4FD9C5] px-5 py-2 font-medium text-[#06120F] transition hover:-translate-y-px hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50">
                        {
                            isSubmitting && 
                            (
                                <Loader2 size={18} className="animate-spin"/>
                            )
                        }
                        {
                            isSubmitting ? "Creating..." : "Create Chat"
                        }
                    </button>
                </div>
            </div>
        </div>
    );
};
export default CreateChatModal;