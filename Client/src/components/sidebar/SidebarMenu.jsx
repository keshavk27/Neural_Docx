import { useState, useRef, useEffect } from "react";
import { MoreHorizontal, Trash2 } from "lucide-react";

import DeleteChatModal from "../sidebar/DeleteChatModal.jsx";

const SidebarMenu = ({ chatSession }) => {

    const [open, setOpen] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const menuRef = useRef(null);

    useEffect(() => {

        const handleClickOutside = (event) => {

            if (
                menuRef.current &&
                !menuRef.current.contains(event.target)
            ) {
                setOpen(false);
            }

        };

        document.addEventListener(
            "mousedown",
            handleClickOutside
        );

        return () =>
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );

    }, []);

    const handleDeleteClick = (e) => {

        e.preventDefault();
        e.stopPropagation();

        setOpen(false);
        setShowDeleteModal(true);

    };

    return (

        <>
            <div
                ref={menuRef}
                className="relative"
            >

                {/* Menu Button */}

                <button
                    onClick={(e) => {

                        e.preventDefault();
                        e.stopPropagation();

                        setOpen((prev) => !prev);

                    }}
                    className="
                        rounded-md
                        p-1.5
                        text-neutral-400
                        opacity-0
                        transition-all
                        duration-200
                        group-hover:opacity-100
                        hover:bg-neutral-700
                        hover:text-white
                    "
                >

                    <MoreHorizontal size={18} />

                </button>



                {/* Dropdown */}

                {
                    open && (

                        <div
                            className="
                                absolute
                                right-0
                                top-10
                                z-50
                                w-44
                                overflow-hidden
                                rounded-xl
                                border
                                border-neutral-700
                                bg-[#2B2B2B]
                                shadow-xl
                            "
                        >

                            <button
                                onClick={handleDeleteClick}
                                className="
                                    flex
                                    w-full
                                    items-center
                                    gap-3
                                    px-4
                                    py-3
                                    text-left
                                    text-sm
                                    text-red-400
                                    transition
                                    hover:bg-neutral-700
                                "
                            >

                                <Trash2 size={16} />

                                Delete Chat

                            </button>

                        </div>

                    )
                }

            </div>



            {/* Delete Modal */}

            <DeleteChatModal
                open={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                chatSession={chatSession}
            />

        </>

    );

};

export default SidebarMenu;