import { PanelLeftClose } from "lucide-react";

const SidebarHeader = ({collapsed,toggleSidebar,}) => {

    return (
        <div className={` flex h-16 items-center border-transparent px-4 ${collapsed? "justify-center": "justify-between"} `}>
            <div className="flex items-center gap-3 overflow-hidden">
                <img src="/logo.svg"  alt="N" className="h-10 w-10 shrink-0 rounded-2xl bg-black object-contain shadow-sm" />
                {
                    !collapsed && 
                    (
                        <div className=" whitespace-nowrap text-xl font-bold text-white ">
                            Neural Docx
                        </div>
                    )
                }
            </div>
            {
                !collapsed && 
                (
                    <button onClick={toggleSidebar} className="rounded-4xl p-2 text-gray-400 transition hover:bg-gray-800 hover:text-white " >
                        <PanelLeftClose size={20} />
                    </button>
                )
            }
        </div>
    );
};
export default SidebarHeader;