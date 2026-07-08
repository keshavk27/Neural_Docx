import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { ArrowRight } from "lucide-react";

const CTA = () => {

    const { isAuthenticated } = useSelector((state) => state.auth);

    return (

        <section className="bg-[#0D1119] px-6 py-24">
            <style>{` @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&display=swap');`}</style>
            <div className=" mx-auto max-w-5xl rounded-3xl  border border-[#242B3D] bg-linear-to-r from-[#131722] to-[#1A1F2C] px-10 py-20 text-center shadow-xl shadow-[#0B0E14]/50" >
                <h2 className=" text-4xl font-bold text-[#E9ECF3]" style={{ fontFamily: "'Space Grotesk', sans-serif" }} >
                    Ready to Study Smarter?
                </h2>
                <p className=" mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#97A1B8]">
                    Upload your documents, ask questions naturally,
                    and get accurate AI-powered answers using
                    Retrieval-Augmented Generation.
                </p>
                <div className=" mt-10 flex flex-wrap justify-center gap-4 ">
                    {
                        isAuthenticated ?
                            (
                                <Link to="/chat" className=" inline-flex items-center gap-2  rounded-xl bg-[#4FD9C5] px-6  py-3  font-semibold text-[#06120F]  transition hover:-translate-y-px hover:brightness-110 ">
                                    Open Chat
                                    <ArrowRight size={18} />
                                </Link>
                            ) :
                            (
                                <>
                                    <Link to="/register" className="  inline-flex items-center  gap-2  rounded-xl bg-[#4FD9C5] px-6 py-3 font-semibold text-[#06120F] transition hover:-translate-y-px hover:brightness-110 ">
                                        Get Started
                                        <ArrowRight size={18} />
                                    </Link>
                                    <Link to="/login" className=" rounded-xl border border-[#242B3D]  bg-[#131722]  px-6 py-3  font-medium text-[#E9ECF3] transition hover:bg-[#1A1F2C] ">
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