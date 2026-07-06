import { House } from "lucide-react";
import { NavLink } from "react-router-dom";

const SidebarHome = ({ collapsed }) => {

    return (

        <NavLink
            to="/"
            className={({ isActive }) =>
                `
                    mb-3
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

            <House
                size={20}
                className="shrink-0"
            />

            {
                !collapsed && (

                    <span
                        className="
                            flex-1
                            text-sm
                            font-medium
                        "
                    >

                        Home

                    </span>

                )
            }

        </NavLink>

    );

};

export default SidebarHome;