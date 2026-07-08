import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import UploadedDocuments from "./UploadedDocuments.jsx";
import ChatMessage from "./ChatMessage.jsx";
import TypingIndicator from "./TypingIndicator.jsx";

const ChatWindow = ({sessionId}) => {

    const bottomRef = useRef(null);
    const {messages,isLoading,isSending,} = useSelector((state) => state.message);
    const {selectedChatSession} = useSelector((state) => state.chatSession);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({behavior: "smooth",});
    }, [messages, isSending]);

    
    if (!isLoading && messages.length === 0) 
    {
        return (
            <div className="flex h-full items-center justify-center text-[#97A1B8]">
                Start the conversation by asking a question.
            </div>
        );
    }

    if (isLoading) 
    {
        return (
            <div className="flex h-full items-center justify-center text-[#97A1B8]">
                Loading conversation...
            </div>
        );
    }
    
    return (
        <div className="flex h-full flex-col overflow-hidden bg-[#0B0E14]">
            <UploadedDocuments files={selectedChatSession?.files || []} />
            <div className=" flex-1 overflow-y-auto px-6 py-8" >
                <div className="mx-auto max-w-5xl space-y-6">
                    {
                        messages.map((message) => 
                        (
                            <ChatMessage key={message._id} message={message} sessionId={sessionId}/>
                        ))
                    }
                    {isSending && (<TypingIndicator />)}
                    <div ref={bottomRef} />
                </div>
            </div>
        </div>
    );
};

export default ChatWindow;