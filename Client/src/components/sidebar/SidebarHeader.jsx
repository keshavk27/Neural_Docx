import { PanelLeftClose } from "lucide-react";

const SidebarHeader = ({collapsed,toggleSidebar,}) => {
    return (
        <div
            className={`
                flex
                h-16
                items-center
                border-b
                border-gray-800
                px-4
                ${collapsed? "justify-center": "justify-between"} `}
        >

            {/* Logo */}

            <div className="flex items-center gap-3 overflow-hidden">
                <img src="\Temp\logo.svg"  alt="N" className="h-10 w-10 shrink-0 rounded-lg bg-black object-contain shadow-sm" />
                {
                    !collapsed && (

                        <div
                            className="
                                whitespace-nowrap
                                text-xl
                                font-bold
                                text-white
                            "
                        >
                            Neural Docx
                        </div>

                    )
                }

            </div>



            {/* Collapse Button */}

            {
                !collapsed && (

                    <button
                        onClick={toggleSidebar}
                        className="
                            rounded-lg
                            p-2
                            text-gray-400
                            transition
                            hover:bg-gray-800
                            hover:text-white
                        "
                    >
                        <PanelLeftClose size={20} />
                    </button>

                )
            }

        </div>
    );
};

export default SidebarHeader;