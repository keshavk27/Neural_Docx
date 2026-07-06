import {FileText,MessageSquareText, BrainCircuit, Search, ShieldCheck, Clock3,} from "lucide-react";

const features = [
    {
        icon: FileText,
        title: "Multi-Format Documents",
        description:
            "Upload PDFs, DOCX, PPTX, XLSX, CSV and TXT files in a single workspace.",
    },
    {
        icon: MessageSquareText,
        title: "Natural Conversations",
        description:
            "Ask questions in plain English and receive contextual answers from your own documents.",
    },
    {
        icon: BrainCircuit,
        title: "AI-Powered Understanding",
        description:
            "Powered by Ollama with Retrieval-Augmented Generation for accurate responses.",
    },
    {
        icon: Search,
        title: "Semantic Search",
        description:
            "Find information based on meaning instead of exact keyword matches using vector search.",
    },
    {
        icon: ShieldCheck,
        title: "Secure Sessions",
        description:
            "Each chat session keeps your uploaded documents isolated and accessible only to you.",
    },
    {
        icon: Clock3,
        title: "Persistent History",
        description:
            "Return to previous conversations anytime with complete chat history and uploaded documents.",
    },
];

const Features = () => {

    return (

        <section className="bg-[#121212] px-6 py-24">

            <div className="mx-auto max-w-7xl">

                {/* Heading */}

                <div className="mx-auto mb-16 max-w-3xl text-center">

                    <h2 className="text-4xl font-bold text-white">

                        Everything You Need for Intelligent Document Learning

                    </h2>

                    <p className="mt-5 text-lg leading-8 text-neutral-400">

                        Neural Docx combines modern AI, semantic search,
                        and an intuitive interface to help you study,
                        research, and understand your documents faster.

                    </p>

                </div>



                {/* Feature Cards */}

                <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

                    {

                        features.map((feature) => {

                            const Icon = feature.icon;

                            return (

                                <div
                                    key={feature.title}
                                    className="
                                        rounded-2xl
                                        border
                                        border-neutral-800
                                        bg-[#1A1A1A]
                                        p-8
                                        transition-all
                                        duration-300
                                        hover:-translate-y-1
                                        hover:border-blue-500/40
                                        hover:shadow-xl
                                        hover:shadow-blue-500/10
                                    "
                                >

                                    <div
                                        className="
                                            mb-6
                                            flex
                                            h-14
                                            w-14
                                            items-center
                                            justify-center
                                            rounded-xl
                                            bg-blue-500/10
                                        "
                                    >

                                        <Icon
                                            size={28}
                                            className="text-blue-400"
                                        />

                                    </div>

                                    <h3
                                        className="
                                            text-xl
                                            font-semibold
                                            text-white
                                        "
                                    >

                                        {feature.title}

                                    </h3>

                                    <p
                                        className="
                                            mt-4
                                            leading-7
                                            text-neutral-400
                                        "
                                    >

                                        {feature.description}

                                    </p>

                                </div>

                            );

                        })

                    }

                </div>

            </div>

        </section>

    );

};

export default Features;