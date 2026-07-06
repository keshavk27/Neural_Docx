import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
    ArrowRight,
    Sparkles,
    CheckCircle2,
} from "lucide-react";

const features = [
    "Chat with PDFs, DOCX, PPTX, CSV, TXT & Excel",
    "Retrieval-Augmented Generation (RAG)",
    "Google Gemini Powered AI",
    "Qdrant Vector Database",
    "Persistent Chat Sessions",
    "Fast Semantic Search",
    "Modern & Secure Architecture",
    "Built with React, Node.js & FastAPI",
];

const Hero = () => {

    const { isAuthenticated } = useSelector(
        (state) => state.auth
    );

    return (

        <section className="relative overflow-hidden bg-[#121212] px-6 py-24">

            {/* Background Glow */}

            <div
                className="
                    absolute
                    left-1/2
                    top-0
                    h-[500px]
                    w-[500px]
                    -translate-x-1/2
                    rounded-full
                    bg-blue-500/10
                    blur-3xl
                "
            />



            <div
                className="
                    relative
                    mx-auto
                    grid
                    max-w-7xl
                    items-center
                    gap-20
                    lg:grid-cols-2
                "
            >

                {/* Left Section */}

                <div>

                    <div
                        className="
                            mb-6
                            inline-flex
                            items-center
                            gap-2
                            rounded-full
                            border
                            border-neutral-700
                            bg-neutral-900
                            px-4
                            py-2
                            text-sm
                            text-neutral-300
                        "
                    >

                        <Sparkles
                            size={16}
                            className="text-yellow-400"
                        />

                        AI Powered Study Assistant

                    </div>



                    <h1
                        className="
                            text-5xl
                            font-bold
                            leading-tight
                            text-white
                            lg:text-6xl
                        "
                    >

                        Study Smarter with

                        <span className="text-blue-400">

                            {" "}Neural Docx

                        </span>

                    </h1>



                    <p
                        className="
                            mt-8
                            max-w-2xl
                            text-lg
                            leading-8
                            text-neutral-400
                        "
                    >

                        Upload your study materials and interact with
                        them naturally. Neural Docx uses
                        Retrieval-Augmented Generation (RAG) and
                        semantic search to answer questions using
                        your own documents instead of generic internet
                        knowledge.

                    </p>



                    {/* Buttons */}

                    <div
                        className="
                            mt-10
                            flex
                            flex-wrap
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

                            )

                        }



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

                    </div>

                </div>



                {/* Right Section */}

                <div
                    className="
                        rounded-3xl
                        border
                        border-neutral-800
                        bg-[#1A1A1A]
                        p-8
                        shadow-2xl
                    "
                >

                    <h2
                        className="
                            mb-8
                            text-2xl
                            font-semibold
                            text-white
                        "
                    >

                        Why Choose Neural Docx?

                    </h2>



                    <div className="grid gap-5">

                        {

                            features.map((feature) => (

                                <div
                                    key={feature}
                                    className="flex gap-4"
                                >

                                    <CheckCircle2
                                        size={22}
                                        className="
                                            mt-1
                                            shrink-0
                                            text-green-400
                                        "
                                    />

                                    <p
                                        className="
                                            text-neutral-300
                                            leading-7
                                        "
                                    >

                                        {feature}

                                    </p>

                                </div>

                            ))

                        }

                    </div>

                </div>

            </div>

        </section>

    );

};

export default Hero;