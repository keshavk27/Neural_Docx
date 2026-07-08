import { AlertCircle, RefreshCw } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { markMessageSending } from "../../features/message/messageSlice.js";
import { sendMessageThunk } from "../../features/message/messageThunk.js";

const UserMessage = ({ message, sessionId }) => {

    const dispatch = useDispatch();
    const { isSending } = useSelector((state) => state.message);

    const handleRetry = async () => {
        if (isSending) return;
        dispatch(markMessageSending(message._id));
        try {
            await dispatch(sendMessageThunk({  sessionId,  message: message.content  })).unwrap();
        } 
        catch (error) {
            console.error("Retry failed", error);
        }
    };

    return (
        <div className="flex justify-end mb-4">
            <div className="max-w-[80%] flex flex-col items-end">
                
                <div className={`rounded-3xl  rounded-br-lg  border  px-5  py-3  text-[#E9ECF3]  shadow-sm  wrap-break-word transition-colors duration-200
                        ${
                            message.status === "failed"
                                ? "border-[#E8697A]/40 bg-[#E8697A]/10" 
                                : message.status === "sending"
                                ? "border-[#242B3D] bg-[#1A1F2C] opacity-70" 
                                : "border-[#242B3D] bg-[#1A1F2C]" 
                        }`} 
                >
                    <p className="whitespace-pre-wrap leading-7">
                        {message.content}
                    </p>
                </div>
            
                {message.status === "sending" && (<p className="mt-1 mr-2 text-right text-xs text-[#97A1B8]"> Sending...</p>)}

                {message.status === "failed" && (
                    <div className="mt-2 mr-1 flex items-center gap-2 text-xs text-[#E8697A]">
                        <AlertCircle size={14} />
                        <span>Failed to send</span>
                        <button onClick={handleRetry} disabled={isSending} className="ml-1 flex items-center gap-1 rounded-md bg-[#E8697A]/10 px-2 py-1 font-medium transition-colors hover:bg-[#E8697A]/20 disabled:cursor-not-allowed disabled:opacity-50 "><RefreshCw size={12} className={isSending ? "animate-spin" : ""} />
                            Retry
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserMessage;