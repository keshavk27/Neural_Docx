import { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { ArrowUp, Paperclip } from "lucide-react";

const ChatInput = () => {

    const [message, setMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!message.trim()) return;
        console.log(message);
        setMessage("");
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) 
        {
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

                    {/* Upload */}

                    <button
                        type="button"
                        className="
                            mb-1
                            rounded-full
                            p-2
                            text-neutral-400
                            transition
                            hover:bg-neutral-700
                            hover:text-white
                        "
                    >

                        <Paperclip size={20} />

                    </button>



                    {/* Textarea */}

                    <TextareaAutosize
                        minRows={1}
                        maxRows={8}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Ask anything about your documents..."
                        className="
                            flex-1
                            resize-none
                            overflow-y-auto
                            bg-transparent
                            py-2
                            text-white
                            placeholder:text-neutral-500
                            focus:outline-none
                        "
                    />



                    {/* Send */}

                    <button
                        type="submit"
                        disabled={!message.trim()}
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