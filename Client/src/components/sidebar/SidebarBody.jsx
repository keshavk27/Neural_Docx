import { Plus } from "lucide-react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import SidebarItem from "./SidebarItem.jsx";
import CreateChatModal from "./CreateChatModal.jsx";
import DeleteChatModal from "./DeleteChatModal.jsx";
import { getAllChatSessionsThunk } from "../../features/chatsession/chatSessionThunk.js";
import SidebarHome from "./SidebarHome.jsx";

const SidebarBody = ({ collapsed }) => {

    const dispatch = useDispatch();
    const [openCreateChatModal, setOpenCreateChatModal] = useState(false);
    const [sessionToDelete, setSessionToDelete] = useState(null); 
    const { chatSessions, isLoading } = useSelector((state) => state.chatSession);

    useEffect(() => {
        dispatch(getAllChatSessionsThunk());
    }, [dispatch]);

    return (
        <div className="flex flex-1 flex-col overflow-hidden bg-transparent">
            
            <div className="p-4">
                <button
                    onClick={() => setOpenCreateChatModal(true)}
                    className={`flex  w-full items-center rounded-4xl px-4 py-3 text-[#E9ECF3] transition hover:bg-[#1A1F2C] ${collapsed ? "justify-center" : "gap-3"} `}>
                    <Plus size={20} className="text-[#4FD9C5]" />
                    {!collapsed && <span className="font-medium">New Chat</span>}
                </button>
            </div>
            
            <CreateChatModal open={openCreateChatModal} onClose={() => setOpenCreateChatModal(false)} />

            <div className="px-4 pb-2 text-[#97A1B8] transition-colors hover:text-[#4FD9C5]">
                <SidebarHome collapsed={collapsed} />
            </div>

            <hr className="mx-4 mb-3 border-[#242B3D]" />

            <div className="flex-1 overflow-y-auto px-2">
                {
                    isLoading ? 
                    (<div className="p-4 text-center text-sm text-[#97A1B8]"> Loading chats... </div>) : 
                    chatSessions.length === 0 ? 
                    (
                        !collapsed && 
                        (
                            <div className="p-4 text-center text-sm text-[#565F75]">
                                No chat sessions yet.
                            </div>
                        )
                ) : 
                (
                    chatSessions.map((chatSession) => (
                        <SidebarItem key={chatSession._id} chatSession={chatSession} collapsed={collapsed} onDeleteRequest={setSessionToDelete} />
                    ))
                )}
            </div>

            <DeleteChatModal open={!!sessionToDelete} onClose={() => setSessionToDelete(null)} chatSession={sessionToDelete} />
        </div>
    );
};

export default SidebarBody;