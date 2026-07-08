import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import WelcomeScreen from "../../components/chat/Welcomescreen.jsx"; 
import ChatInput from "../../components/chat/ChatInput.jsx";
import ChatWindow from "../../components/chat/ChatWindow.jsx";
import { getChatSessionByIdThunk } from "../../features/chatsession/chatSessionThunk.js";
import { getMessagesThunk } from "../../features/message/messageThunk.js";

const Dashboard = () => {

    const dispatch = useDispatch();
    const { sessionId } = useParams();

    useEffect(() => {
        if (!sessionId) return;
        dispatch(getChatSessionByIdThunk(sessionId));
        dispatch(getMessagesThunk(sessionId));

    }, [dispatch, sessionId]);

    return (
        <div className="flex h-full flex-col bg-[#0B0E14]">
            <div className="flex-1 overflow-y-auto">
                {
                    sessionId ? <ChatWindow sessionId={sessionId} /> : <WelcomeScreen />
                }
            </div>
            <ChatInput sessionId={sessionId} />
        </div>
    );
};

export default Dashboard;