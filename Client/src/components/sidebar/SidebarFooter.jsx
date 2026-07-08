import { User, LogOut } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logoutThunk } from "../../features/auth/authThunk.js";

const SidebarFooter = ({ collapsed }) => {

    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const handleLogout = () => {
        dispatch(logoutThunk());
    };

    return (
        <div className=" p-2 py-1.5 bg-transparent">

            <button className={`flex w-full items-center rounded-4xl px-3  py-2 transition hover:bg-gray-800 ${ collapsed ? "justify-center" : "gap-3" } `}>

                <div className=" flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white shrink-0">
                    <User size={20} />
                </div>

                {
                    !collapsed && 
                    (
                        <div className="flex flex-1 flex-col overflow-hidden text-left">
                            <span className="truncate text-sm font-semibold text-white">
                                {user?.fullname}
                            </span>
                            <span className="truncate text-xs text-gray-400">
                                @{user?.username}
                            </span>
                        </div>
                    )
                }
                {
                    !collapsed && 
                    (
                        <button onClick={handleLogout} className=" rounded-3xl p-2 text-gray-400 transition hover:bg-gray-700 hover:text-red-400 ">
                            <LogOut size={18} />
                        </button>
                    )
                }
            </button>
        </div>
    );
};
export default SidebarFooter;