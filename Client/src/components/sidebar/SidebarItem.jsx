import { MessageSquare } from "lucide-react";
import { NavLink } from "react-router-dom";
import SidebarMenu from "./SidebarMenu.jsx";

const SidebarItem = ({ chatSession, collapsed, onDeleteRequest }) => {
    return (
        <NavLink to={`/chat/${chatSession._id}`} className={({ isActive }) =>` group mb-1 flex items-center rounded-4xl px-3 py-3 transition-all duration-200
                    ${collapsed ? "justify-center" : "gap-3"}
                    ${ isActive ? "bg-gray-800 text-white" : "text-gray-400 hover:bg-gray-900 hover:text-white"}`}>
            <MessageSquare size={20} className="shrink-0" />
            { 
                !collapsed && 
                (
                    <>
                        <span className="flex-1 truncate text-sm font-medium">{chatSession.title}</span>
                        <SidebarMenu chatSession={chatSession}  onDeleteRequest={onDeleteRequest}  />
                    </>
                )
            }
        </NavLink>
    );
};

export default SidebarItem;