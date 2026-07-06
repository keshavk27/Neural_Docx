import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {

    const { isAuthenticated, user } = useSelector( (state) => state.auth);
    return (
        <header
            className="
                sticky
                top-0
                z-50
                border-b
                border-neutral-800
                bg-[#121212]/80
                backdrop-blur-lg
            "
        >
            <div
                className="
                    mx-auto
                    flex
                    h-18
                    max-w-7xl
                    items-center
                    justify-between
                    px-6
                "
            >
                {/* Logo */}
                <Link
                    to="/"
                    className="
                        text-2xl
                        font-bold
                        tracking-tight
                        text-white
                    "
                >
                    Neural Docx
                </Link>


                {/* Navigation */}
                <nav
                    className="
                        flex
                        items-center
                        gap-8
                    "
                >
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `
                                text-sm
                                font-medium
                                transition
                                ${
                                    isActive
                                        ? "text-white"
                                        : "text-neutral-400 hover:text-white"
                                }
                            `
                        }
                    >
                        Home
                    </NavLink>
                    {
                        isAuthenticated && (
                            <NavLink
                                to="/chat"
                                className={({ isActive }) =>
                                    `
                                        text-sm
                                        font-medium
                                        transition
                                        ${
                                            isActive
                                                ? "text-white"
                                                : "text-neutral-400 hover:text-white"
                                        }
                                    `
                                }
                            >
                                Chat
                            </NavLink>
                        )
                    }
                </nav>

                {/* Right Section */}
                <div
                    className="
                        flex
                        items-center
                        gap-3
                    "
                >
                    {
                        !isAuthenticated ? (
                            <>
                                <Link
                                    to="/login"
                                    className="
                                        rounded-lg
                                        px-4
                                        py-2
                                        text-sm
                                        font-medium
                                        text-neutral-300
                                        transition
                                        hover:bg-neutral-800
                                        hover:text-white
                                    "
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="
                                        rounded-lg
                                        bg-white
                                        px-5
                                        py-2
                                        text-sm
                                        font-semibold
                                        text-black
                                        transition
                                        hover:bg-neutral-200
                                    "
                                >
                                    Register
                                </Link>
                            </>
                        ) : (
                            <div
                                className="
                                    flex
                                    items-center
                                    gap-3
                                "
                            >
                                <div
                                    className="
                                        flex
                                        h-10
                                        w-10
                                        items-center
                                        justify-center
                                        rounded-full
                                        bg-neutral-700
                                        text-sm
                                        font-semibold
                                        uppercase
                                        text-white
                                    "
                                >

                                    {
                                        user?.fullName
                                            ?.charAt(0)
                                            ?.toUpperCase() || "U"
                                    }

                                </div>

                            </div>
                        )
                    }
                </div>
            </div>
        </header>
    );
};

export default Navbar;