import { PanelLeft } from "lucide-react";

const TopBar = ({sidebarCollapsed,toggleSidebar,}) => {
    return (
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-gray-800 bg-black px-6">

            {/* Left Section */}
            <div className="flex items-center gap-4">

                {
                    sidebarCollapsed && (
                        <button
                            onClick={toggleSidebar}
                            className="rounded-md p-2 text-gray-300 transition hover:bg-gray-800 hover:text-white"
                        >
                            <PanelLeft size={22} />
                        </button>
                    )
                }

                <button className="flex items-center gap-2">

                    <h1 className="text-3xl font-bold text-white">
                        Neural Docx
                    </h1>

                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-gray-400"
                    >
                        <path d="m6 9 6 6 6-6" />
                    </svg>

                </button>

            </div>

            {/* Right Section */}
            <div>

                {/* Future:
                    Settings
                    User Menu
                    Theme Toggle
                */}

            </div>

        </header>
    );
};

export default TopBar;