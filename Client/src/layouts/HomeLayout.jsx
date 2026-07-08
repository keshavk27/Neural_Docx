import { Outlet } from "react-router-dom";
import Navbar from "../components/landing/Navbar.jsx";
import Footer from "../components/landing/Footer.jsx";

const HomeLayout = () => {
    return (

        <div className="min-h-screen bg-[#121212] text-white">

            <Navbar />

            <main>
                <Outlet />
            </main>

            <Footer />

        </div>
    );
};

export default HomeLayout;