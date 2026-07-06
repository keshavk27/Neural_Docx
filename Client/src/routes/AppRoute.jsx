import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute.jsx";
import PublicRoute from "./PublicRoute.jsx";

import DashboardLayout from "../layouts/DashboardLayout.jsx";
import AuthLayout from "../layouts/AuthLayout.jsx";
import HomeLayout from "../layouts/HomeLayout.jsx";

import Dashboard from "../pages/Dashboard/Dashboard.jsx";
import Home from "../pages/Home/Home.jsx";

import Login from "../pages/Authentication/Login.jsx";
import Register from "../pages/Authentication/Register.jsx";
import VerifyOTP from "../pages/Authentication/VerifyOTP.jsx";

import NotFound from "../pages/NotFound.jsx";

const AppRoutes = () => { 
    return (
        <Routes>
            <Route element={<HomeLayout />}>
                <Route
                    path="/"
                    element={<Home />}
                />
            </Route>

            <Route element={<PublicRoute />}>
                <Route element={<AuthLayout />}>
                    <Route path="/login" element={<Login />}/>
                    <Route path="/register"element={<Register />}/>
                    <Route path="/verify-otp"element={<VerifyOTP />}/>
                </Route>
            </Route>


            <Route element={<ProtectedRoute />}>
                <Route element={<DashboardLayout />}>
                    <Route path="/chat" element={<Dashboard />}/>
                    <Route path="/chat/:sessionId" element={<Dashboard />}/>

                </Route>
            </Route>


            <Route
                path="*"
                element={<NotFound />}
            />

        </Routes>
    );
};

export default AppRoutes;