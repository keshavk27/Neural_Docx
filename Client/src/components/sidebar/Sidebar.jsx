import SidebarHeader from "./SidebarHeader.jsx";
import SidebarBody from "./SidebarBody.jsx";
import SidebarFooter from "./SidebarFooter.jsx";

const Sidebar = ({ collapsed, toggleSidebar }) => {
    return (
        <aside className={`flex h-screen flex-col bg-[#0D1119]  transition-all duration-300 ${collapsed ? "w-20" : "w-80"}`}>
            
            <SidebarHeader collapsed={collapsed} toggleSidebar={toggleSidebar}/>

            <SidebarBody collapsed={collapsed} />

            <SidebarFooter collapsed={collapsed} />
        </aside>
    );
};

export default Sidebar;