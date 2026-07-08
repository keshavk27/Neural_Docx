import Hero from "../../components/landing/Hero.jsx";
import Analytics from "../../components/landing/Analytics.jsx";
import Features from "../../components/landing/Features.jsx";
import CTA from "../../components/landing/CTA.jsx";

const Home = () => {

    return (

        <div className="bg-[#121212] text-white">
            <Hero />
            <Analytics />
            <Features />
            <CTA />
        </div>
    );
};

export default Home;