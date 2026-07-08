import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TextareaAutosize from "react-textarea-autosize";
import { ArrowUp, Paperclip, Loader2, FilePlus } from "lucide-react";
import { sendMessageThunk } from "../../features/message/messageThunk.js";
import { addUserMessage, markMessageFailed } from "../../features/message/messageSlice.js";
import { uploadToExistingSessionThunk } from "../../features/chatSession/chatSessionThunk.js";

const ChatInput = ({ sessionId }) => {
    const dispatch = useDispatch();
    const { isSending } = useSelector((state) => state.message);
    
    const [message, setMessage] = useState("");
    const [isUploading, setIsUploading] = useState(false);
    
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);
    
    const fileInputRef = useRef(null);
    const tempId = `temp-${Date.now()}`;

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) 
            {
                setIsMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    //submit message
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!sessionId) return;
        
        const currentMessage = message.trim();
        if (!currentMessage) return;
        setMessage("");
        
        try {
            dispatch(addUserMessage(
                {
                    _id: tempId,
                    role: "user",
                    content: currentMessage,
                    createdAt: new Date().toISOString(),
                    status: "sending",
                })
            );
            
            try {
                await dispatch( sendMessageThunk({ sessionId, message: currentMessage})).unwrap();
            } catch (error) {
                dispatch(markMessageFailed(tempId));
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) 
        {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    // file upload
    const handleFileChange = async (e) => {

        const files = Array.from(e.target.files);
        if (!files || files.length === 0) return;

        if (files.length > 3) 
        {
            alert("Maximum 3 files are allowed per upload.");
            if (fileInputRef.current) fileInputRef.current.value = "";
            return;
        }

        setIsUploading(true);
        try {
            const formData = new FormData();
            files.forEach((file) => {formData.append("files", file)});
            await dispatch(uploadToExistingSessionThunk({ sessionId, formData })).unwrap();
            
        } catch (error) {
            console.error("Upload failed:", error);
            const errorMessage = typeof error === "string" ? error : (error?.message || "Failed to upload document.");
            alert(errorMessage);
        } finally {
            setIsUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = ""; 
        }
    };

    return (
        <div className="px-6 py-2">
            <form onSubmit={handleSubmit} className="mx-auto max-w-3xl">
                <div className="flex items-end gap-2 rounded-2xl border border-[#242B3D] bg-[#1A1F2C] pl-3 pr-2 py-2 shadow-sm transition-all focus-within:border-[#4FD9C5] focus-within:ring-1 focus-within:ring-[#4FD9C5]/30">
                    
                    <input type="file"  multiple  ref={fileInputRef}  onChange={handleFileChange}  className="hidden"  accept=".pdf,.docx,.pptx,.txt,.csv,.xlsx"  />

                    <div className="relative mb-0.5" ref={menuRef}>
                        
                        {isMenuOpen && 
                            (
                            <div className="absolute bottom-full left-0 mb-3 flex w-48 flex-col overflow-hidden rounded-xl border border-[#242B3D] bg-[#0B0E14] p-1.5 shadow-xl">
                                <button
                                    type="button"
                                    onClick={() => {fileInputRef.current?.click(); setIsMenuOpen(false);  }} className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-[#E9ECF3] transition-colors hover:bg-[#1A1F2C]" >
                                    <FilePlus size={16} className="text-[#4FD9C5]" />
                                    Add Document
                                </button>
                            </div>
                        )}

                        <button type="button" onClick={() => setIsMenuOpen((prev) => !prev)} disabled={!sessionId || isSending || isUploading} className={`rounded-xl p-1.5 transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${isMenuOpen ? "bg-[#242B3D] text-[#E9ECF3]" : "text-[#97A1B8] hover:bg-[#242B3D] hover:text-[#E9ECF3]"  } `} >
                            {isUploading ? 
                            (
                                <Loader2 size={18} className="animate-spin text-[#4FD9C5]" />
                            ) : 
                            (
                                <Paperclip size={18} />
                            )}
                        </button>
                    </div>

                    <TextareaAutosize
                        minRows={1}
                        maxRows={8}
                        value={message}
                        disabled={!sessionId || isSending || isUploading}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder={ sessionId ? isUploading ? "Uploading documents..." : "Ask anything about your documents..." : "Create or open a chat to begin..." }
                        className=" flex-1 resize-none overflow-y-auto bg-transparent py-1.5 text-sm text-[#E9ECF3] placeholder:text-[#565F75] focus:outline-none disabled:cursor-not-allowed disabled:opacity-60 "/>

                    <button
                        type="submit"
                        disabled={!sessionId || !message.trim() || isSending || isUploading}
                        className="mb-0.5 rounded-xl bg-[#4FD9C5] p-1.5 text-[#06120F] transition hover:-translate-y-px hover:brightness-110 disabled:cursor-not-allowed  disabled:opacity-40" >
                        <ArrowUp size={18} />
                    </button>
                </div>
            </form>
        </div>
    );
};
export default ChatInput;