import { MessageSquare } from "lucide-react";
import { NavLink } from "react-router-dom";
import SidebarMenu from "./SidebarMenu.jsx";

const SidebarItem = ({chatSession,collapsed,}) => {

    return (
        <NavLink
            to={`/chat/${chatSession._id}`}
            className={({ isActive }) =>
                `
                    group
                    mb-1
                    flex
                    items-center
                    rounded-xl
                    px-3
                    py-3
                    transition-all
                    duration-200
                    ${
                        collapsed
                            ? "justify-center"
                            : "gap-3"
                    }
                    ${
                        isActive
                            ? "bg-gray-800 text-white"
                            : "text-gray-400 hover:bg-gray-900 hover:text-white"
                    }
                `
            }
        >

            {/* Icon */}

            <MessageSquare
                size={20}
                className="shrink-0"
            />


            {/* Chat Title */}

            {
                !collapsed && (
                    <>

                    <span
                        className="
                            flex-1
                            truncate
                            text-sm
                            font-medium
                        "
                    >
                        {chatSession.title}
                    </span>

                    <SidebarMenu chatSession={chatSession}/>
                    </>

                )
            }

        </NavLink>
    );
};

export default SidebarItem;