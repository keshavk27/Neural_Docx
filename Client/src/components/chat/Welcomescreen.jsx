import { Sparkles } from "lucide-react";

const WelcomeScreen = () => {
    return (
        <div className="flex h-full flex-col items-center justify-center px-6 bg-[#0B0E14]">

            <style>{`@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&display=swap'); `}</style>

            <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-3xl bg-[#1A1F2C] border border-[#242B3D]">
                <Sparkles size={38} className="text-[#4FD9C5]"/>
            </div>

            <h1 className="text-5xl font-bold text-[#E9ECF3]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Welcome Back!
            </h1>

            <p className="mt-5 max-w-2xl text-center text-lg leading-8 text-[#97A1B8]">
                Upload your documents and ask questions in natural language.
                Retrieve accurate, context-aware answers powered by Retrieval-Augmented Generation (RAG).
            </p>

            <p className="mt-10 text-sm text-[#565F75]">
                Start by creating a new chat from the sidebar.
            </p>

        </div>
    );
};

export default WelcomeScreen;