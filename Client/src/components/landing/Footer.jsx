import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const Footer = () => {
    const { isAuthenticated } = useSelector((state) => state.auth);

    return (

        <footer className="border-t border-neutral-800 bg-[#121212]">

            <div
                className="
                    mx-auto
                    flex
                    max-w-7xl
                    flex-col
                    items-center
                    justify-between
                    gap-6
                    px-6
                    py-8
                    text-sm
                    text-neutral-500
                    md:flex-row
                "
            >

                <div>

                    © {new Date().getFullYear()} Neural Docx.
                    All rights reserved.

                </div>



                <div
                    className=" flex items-center  gap-6"
                >

                    <Link
                        to="/"
                        className="hover:text-white transition"
                    >
                        Home
                    </Link>

                    {
                        isAuthenticated ? (

                            <Link
                                to="/chat"
                                className="hover:text-white transition"
                            >
                                Chat
                            </Link>

                        ) : (

                            <>
                                <Link
                                    to="/login"
                                    className="hover:text-white transition"
                                >
                                    Login
                                </Link>

                                <Link
                                    to="/register"
                                    className="hover:text-white transition"
                                >
                                    Register
                                </Link>
                            </>

                        )
                    }

                </div>

            </div>

        </footer>

    );

};

export default Footer;