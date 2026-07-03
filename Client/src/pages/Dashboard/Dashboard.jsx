import WelcomeScreen from "../../components/chat/Welcomescreen.jsx";
import ChatInput from "../../components/chat/ChatInput.jsx";

const Dashboard = () => {

    return (

        <div className="flex h-full flex-col">

            <div className="flex-1 overflow-y-auto">

                <WelcomeScreen />

            </div>

            <ChatInput />

        </div>

    );
};

export default Dashboard;