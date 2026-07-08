import { useState, useRef, useEffect } from "react";
import { MoreHorizontal, Trash2 } from "lucide-react";

const SidebarMenu = ({ chatSession, onDeleteRequest }) => {

    const [open, setOpen] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) 
            {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleDeleteClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setOpen(false);
        
        if (onDeleteRequest) 
        {
            onDeleteRequest(chatSession);
        }
    };

    return (
        <div ref={menuRef} className="relative">
            <button type="button" onClick={(e) => { e.preventDefault(); e.stopPropagation(); setOpen((prev) => !prev);}} className=" rounded-md p-1.5 text-[#97A1B8] opacity-0 transition-all duration-200 group-hover:opacity-100 hover:bg-[#242B3D] hover:text-[#E9ECF3] ">
                <MoreHorizontal size={18} />
            </button>
            {
                open && 
                (
                    <div className=" absolute right-0 top-10 z-50 w-44  overflow-hidden rounded-xl border border-[#242B3D]  bg-[#131722] shadow-xl">
                    <button type="button" onClick={handleDeleteClick} className=" flex w-full items-center gap-3  px-4 py-3 text-left text-sm text-[#E8697A] transition hover:bg-[#1A1F2C] ">
                        <Trash2 size={16} />
                        Delete Chat
                    </button>
                </div>
            )}
        </div>
    );
};

export default SidebarMenu;