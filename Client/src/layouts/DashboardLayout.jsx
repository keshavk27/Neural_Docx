import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar.jsx";
import TopBar from "../components/common/Topbar.jsx";

const DashboardLayout = () => {

    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const toggleSidebar = () => { setSidebarCollapsed((prev) => !prev); };

    return (
        <div className="flex h-screen overflow-hidden bg-[#0B0E14] text-[#E9ECF3]">
            <Sidebar collapsed={sidebarCollapsed} toggleSidebar={toggleSidebar}/>
            <div className="flex min-w-0 flex-1 flex-col">
                <TopBar sidebarCollapsed={sidebarCollapsed} toggleSidebar={toggleSidebar} />
                <main className="flex-1 overflow-hidden bg-[#0B0E14]">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;