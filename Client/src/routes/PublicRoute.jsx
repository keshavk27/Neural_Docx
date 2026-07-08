import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import AppLoader from "../components/common/appLoader.jsx";

const PublicRoute = () => {

    const {isAuthenticated,isInitializing,} = useSelector((state) => state.auth);

    if (isInitializing) 
    {
        return <AppLoader />;
    }

    if (isAuthenticated) 
    {
        return <Navigate to="/" replace/>
    }

    return <Outlet />;
};

export default PublicRoute;