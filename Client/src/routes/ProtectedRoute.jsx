import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import AppLoader from "../components/common/appLoader.jsx";

const ProtectedRoute = () => {

    const location = useLocation();
    const {isAuthenticated,isInitializing,} = useSelector((state) => state.auth);


    if (isInitializing) 
    {
        return <AppLoader />;
    }


    if (!isAuthenticated) 
    {
        return  <Navigate to="/login" replace state={{from: location,}}/>
    }

    return <Outlet />;
};

export default ProtectedRoute;