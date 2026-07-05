import AIMessage from "./AIMessage.jsx";
import UserMessage from "./UserMessage.jsx";

const ChatMessage = ({ message }) => {
    if (!message) return null;
    switch (message.role) {
        case "human":
        case "user":
            return (
                <UserMessage message={message}/>
            );

        case "assistant":
        case "ai":

            return (
                <AIMessage message={message}/>
            );

        default:
            return null;
    }
};

export default ChatMessage;