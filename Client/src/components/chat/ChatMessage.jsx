import AIMessage from "./AIMessage.jsx";
import UserMessage from "./UserMessage.jsx";

const ChatMessage = ({ message ,sessionId}) => {
    if (!message) return null;
    switch (message.role) {
        case "human":
        case "user":
            return (<UserMessage message={message} sessionId={sessionId}/>);
        case "assistant":
        case "ai":
            return ( <AIMessage message={message}/>);
        default:
            return null;
    }
};

export default ChatMessage;