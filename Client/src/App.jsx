import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppRoutes from "./routes/AppRoute.jsx";
import { getProfileThunk } from "./features/auth/authThunk.js";
import AppLoader from "./components/common/appLoader.jsx";

const App = () => {

    const dispatch = useDispatch();
    const {isInitializing} = useSelector((state) => state.auth);

    useEffect(() => {

        dispatch(getProfileThunk());

    }, [dispatch]);


    if (isInitializing) 
    {
      return <AppLoader />;
    }

    return <AppRoutes />;
};

export default App;