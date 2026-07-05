import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TextareaAutosize from "react-textarea-autosize";
import { ArrowUp, Paperclip } from "lucide-react";
import { sendMessageThunk } from "../../features/message/messageThunk.js";
import { addUserMessage,markMessageFailed } from "../../features/message/messageSlice.js";

const ChatInput = ({ sessionId }) => {

    const dispatch = useDispatch();
    const { isSending } = useSelector(
        (state) => state.message
    );

    const [message, setMessage] = useState("");
    const tempId=`temp-${Date.now()}`;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!sessionId) return;
        const currentMessage = message.trim();
        if (!currentMessage) return;
        try {
            dispatch(
                addUserMessage({
                    _id: tempId,
                    role: "user",
                    content: currentMessage,
                    createdAt: new Date().toISOString(),
                    status: "sending",
                })
            );
            try {
                await dispatch( sendMessageThunk(
                    {
                        sessionId,
                        message: currentMessage,
                    }
                )).unwrap();

                setMessage("");
                }
                catch (error) {
                    dispatch(markMessageFailed(tempId));
                    setMessage("");
                }
        }
        catch (error) {
            console.error(error);
        }

    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    return (

        <div className="border-t border-neutral-800 bg-[#212121] px-6 py-5">
            <form
                onSubmit={handleSubmit}
                className="mx-auto max-w-4xl"
            >
                <div className="flex items-end gap-2 rounded-3xl border border-neutral-700 bg-[#303030] px-4 py-3 shadow-lg">

                    {/* Attach Documents */}
                    <button
                        type="button"
                        disabled={!sessionId || isSending}
                        className="
                            mb-1
                            rounded-full
                            p-2
                            text-neutral-400
                            transition
                            hover:bg-neutral-700
                            hover:text-white
                            disabled:cursor-not-allowed
                            disabled:opacity-40
                        "
                    >

                        <Paperclip size={20} />
                    </button>

                    {/* Textarea */}
                    <TextareaAutosize
                        minRows={1}
                        maxRows={8}
                        value={message}
                        disabled={!sessionId || isSending}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder={
                            sessionId
                                ? "Ask anything about your documents..."
                                : "Create or open a chat to begin..."
                        }
                        className="
                            flex-1
                            resize-none
                            overflow-y-auto
                            bg-transparent
                            py-2
                            text-white
                            placeholder:text-neutral-500
                            focus:outline-none
                            disabled:cursor-not-allowed
                            disabled:opacity-60
                        "
                    />

                    {/* Send */}
                    <button
                        type="submit"
                        disabled={
                            !sessionId ||
                            !message.trim() ||
                            isSending
                        }
                        className="
                            rounded-full
                            bg-white
                            p-2
                            text-black
                            transition
                            hover:bg-neutral-300
                            disabled:cursor-not-allowed
                            disabled:opacity-40
                        "
                    >

                        <ArrowUp size={18} />
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ChatInput;