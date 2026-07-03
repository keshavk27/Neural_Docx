import { Outlet } from "react-router-dom";

const AuthLayout = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            <div className="mx-auto flex min-h-screen w-full max-w-7xl items-center justify-center px-6 py-10">
                <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;