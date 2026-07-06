import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { ArrowRight } from "lucide-react";

const CTA = () => {

    const { isAuthenticated } = useSelector(
        (state) => state.auth
    );

    return (

        <section className="bg-[#121212] px-6 py-24">

            <div
                className="
                    mx-auto
                    max-w-5xl
                    rounded-3xl
                    border
                    border-neutral-800
                    bg-linear-to-r
                    from-[#1A1A1A]
                    to-[#222222]
                    px-10
                    py-20
                    text-center
                "
            >

                <h2
                    className="
                        text-4xl
                        font-bold
                        text-white
                    "
                >

                    Ready to Study Smarter?

                </h2>

                <p
                    className="
                        mx-auto
                        mt-6
                        max-w-2xl
                        text-lg
                        leading-8
                        text-neutral-400
                    "
                >

                    Upload your documents, ask questions naturally,
                    and get accurate AI-powered answers using
                    Retrieval-Augmented Generation.

                </p>



                <div
                    className="
                        mt-10
                        flex
                        flex-wrap
                        justify-center
                        gap-4
                    "
                >

                    {

                        isAuthenticated ? (

                            <Link
                                to="/chat"
                                className="
                                    inline-flex
                                    items-center
                                    gap-2
                                    rounded-xl
                                    bg-white
                                    px-6
                                    py-3
                                    font-semibold
                                    text-black
                                    transition
                                    hover:bg-neutral-200
                                "
                            >

                                Open Chat

                                <ArrowRight size={18} />

                            </Link>

                        ) : (

                            <>

                                <Link
                                    to="/register"
                                    className="
                                        inline-flex
                                        items-center
                                        gap-2
                                        rounded-xl
                                        bg-white
                                        px-6
                                        py-3
                                        font-semibold
                                        text-black
                                        transition
                                        hover:bg-neutral-200
                                    "
                                >

                                    Get Started

                                    <ArrowRight size={18} />

                                </Link>

                                <Link
                                    to="/login"
                                    className="
                                        rounded-xl
                                        border
                                        border-neutral-700
                                        px-6
                                        py-3
                                        font-medium
                                        text-white
                                        transition
                                        hover:bg-neutral-800
                                    "
                                >

                                    Login

                                </Link>

                            </>

                        )

                    }

                </div>

            </div>

        </section>

    );

};

export default CTA;