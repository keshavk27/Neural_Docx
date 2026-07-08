import { PanelLeft } from "lucide-react";

const TopBar = ({ sidebarCollapsed, toggleSidebar }) => {
    return (
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-[#242B3D] bg-[#0B0E14] px-6">
            
            <style>{` @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&display=swap');`}</style>

            <div className="flex items-center gap-4">
                {
                    sidebarCollapsed && (
                        <button onClick={toggleSidebar} className="rounded-3xl p-2 text-[#97A1B8] transition hover:bg-[#242B3D] hover:text-[#E9ECF3]" >
                            <PanelLeft size={22} />
                        </button>
                    )
                }

                <button className="flex items-center gap-2">

                    <h1 className="text-3xl font-bold text-[#E9ECF3]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        Neural Docx
                    </h1>

                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#97A1B8]"> <path d="m6 9 6 6 6-6" /> </svg>

                </button>

            </div>

            <div>
               {/* future options */}
            </div>
        </header>
    );
};

export default TopBar;