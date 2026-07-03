import { Plus } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import SidebarItem from "./SidebarItem.jsx";
import CreateChatModal from "./CreateChatModal.jsx";
const SidebarBody = ({ collapsed }) => {

    const [openCreateChatModal, setOpenCreateChatModal] = useState(false);
    const {chatSessions,isLoading,} = useSelector((state) => state.chatSession);

    return (
        <div className="flex flex-1 flex-col overflow-hidden">

            {/* New Chat */}

            <div className="p-4">

                <button
                    onClick={() => setOpenCreateChatModal(true)}
                    className={`
                        flex
                        w-full
                        items-center
                        rounded-xl
                        border
                        border-gray-700
                        px-4
                        py-3
                        text-white
                        transition
                        hover:bg-gray-800
                        ${collapsed ? "justify-center": "gap-3"}
                    `}
                >

                    <Plus size={20} />

                    {
                        !collapsed && (
                            <span className="font-medium">
                                New Chat
                            </span>
                        )
                    }

                </button>

            </div>
            <CreateChatModal
                open={openCreateChatModal}
                onClose={() => setOpenCreateChatModal(false)}
            />



            {/* Chat Sessions */}

            <div className="flex-1 overflow-y-auto px-2">

                {
                    isLoading ? (

                        <div className="p-4 text-center text-sm text-gray-400">

                            Loading chats...

                        </div>

                    ) : chatSessions.length === 0 ? (

                        !collapsed && (

                            <div className="p-4 text-center text-sm text-gray-500">

                                No chat sessions yet.

                            </div>

                        )

                    ) : (

                        chatSessions.map((chatSession) => (

                            <SidebarItem
                                key={chatSession._id}
                                chatSession={chatSession}
                                collapsed={collapsed}
                            />

                        ))

                    )
                }

            </div>

        </div>
    );
};

export default SidebarBody;