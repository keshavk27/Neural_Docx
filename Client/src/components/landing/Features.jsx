import {FileText,MessageSquareText, BrainCircuit, Search, ShieldCheck, Clock3,} from "lucide-react";

const features = [
    {
        icon: FileText,
        title: "Multi-Format Documents",
        description:"Upload PDFs, DOCX, PPTX, XLSX, CSV and TXT files in a single workspace.",
    },
    {
        icon: MessageSquareText,
        title: "Natural Conversations",
        description: "Ask questions in plain English and receive contextual answers from your own documents.",
    },
    {
        icon: BrainCircuit,
        title: "AI-Powered Understanding",
        description:"Powered by GPT-5.5 with Retrieval-Augmented Generation for accurate responses.",
    },
    {
        icon: Search,
        title: "Semantic Search",
        description:"Find information based on meaning instead of exact keyword matches using vector search.",
    },
    {
        icon: ShieldCheck,
        title: "Secure Sessions",
        description:"Each chat session keeps your uploaded documents isolated and accessible only to you.",
    },
    {
        icon: Clock3,
        title: "Persistent History",
        description: "Return to previous conversations anytime with complete chat history and uploaded documents.",
    },
];

const Features = () => {

    return (

        <section className="bg-[#0F121A] px-6 py-24">
            <style>{` @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&display=swap');`}</style>
            <div className="mx-auto max-w-7xl">

                <div className="mx-auto mb-16 max-w-3xl text-center">
                    <h2 className="text-4xl font-bold text-[#E9ECF3]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        Everything You Need for Intelligent Document Learning
                    </h2>
                    <p className="mt-5 text-lg leading-8 text-[#97A1B8]">
                        Neural Docx combines modern AI, semantic search,
                        and an intuitive interface to help you study,
                        research, and understand your documents faster.
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                    {
                        features.map((feature) => {
                            const Icon = feature.icon;
                            return (
                                <div
                                    key={feature.title}
                                    className=" rounded-2xl border border-[#242B3D] bg-[#131722]  p-8 transition-all duration-300 hover:-translate-y-1 hover:border-[#4FD9C5]/40 hover:shadow-xl hover:shadow-[#4FD9C5]/10 ">
                                    <div className=" mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-[#4FD9C5]/10 ">
                                        <Icon size={28} className="text-[#4FD9C5]"/>
                                    </div>
                                    <h3 className=" text-xl font-semibold text-[#E9ECF3] " style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                                        {feature.title}
                                    </h3>
                                    <p className=" mt-4 leading-7 text-[#97A1B8] ">
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