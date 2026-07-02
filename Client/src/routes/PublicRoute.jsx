import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import AppLoader from "../components/common/appLoader.jsx";

const PublicRoute = () => {

    const {isAuthenticated,isInitializing,} = useSelector((state) => state.auth);


    // Wait until getProfile finishes
    if (isInitializing) 
    {
        return <AppLoader />;
    }


    // User is already logged in
    if (isAuthenticated) 
    {
        return <Navigate to="/" replace/>
    }

    // User is not logged in
    return <Outlet />;
};

export default PublicRoute;