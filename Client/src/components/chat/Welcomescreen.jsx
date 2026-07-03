import { Sparkles } from "lucide-react";

const WelcomeScreen = () => {
    return (
        <div className="flex h-full flex-col items-center justify-center px-6">

            {/* Logo */}

            <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-3xl bg-white">

                <Sparkles
                    size={38}
                    className="text-black"
                />

            </div>


            {/* Heading */}

            <h1 className="text-5xl font-bold text-white">

                Neural Docx

            </h1>


            {/* Subtitle */}

            <p className="mt-5 max-w-2xl text-center text-lg leading-8 text-gray-400">

                Upload your documents and ask questions in natural language.
                Retrieve accurate, context-aware answers powered by Retrieval-Augmented Generation (RAG).

            </p>


            {/* Small Hint */}

            <p className="mt-10 text-sm text-gray-500">

                Start by creating a new chat from the sidebar.

            </p>

        </div>
    );
};

export default WelcomeScreen;