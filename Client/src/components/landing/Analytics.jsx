import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAnalyticsThunk } from "../../features/analytics/analyticsThunk.js";

const Analytics = () => {

    const dispatch = useDispatch();
    const {analytics,isLoading,} = useSelector((state) => state.analytics);

    useEffect(() => {
        dispatch(getAnalyticsThunk());
    }, [dispatch]);

    const stats = [
        {
            title: "Registered Users",
            value: analytics?.users ?? "--",
        },

        {
            title: "Questions Answered",
            value: analytics?.questions ?? "--",
        },

        {
            title: "Documents Processed",
            value: analytics?.documents ?? "--",
        },

        {
            title: "Chat Sessions",
            value: analytics?.chatSessions ?? "--",
        },

    ];

    return (

        <section
            className=" border-[#242B3D] bg-[#0F121A] px-6 py-20 ">
            <style>{` @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&display=swap');`}</style>

            <div className="mx-auto max-w-7xl">
                <div className="mb-14 text-center">
                    <h2 className=" text-4xl font-bold text-[#E9ECF3] " style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        Trusted by Learners
                    </h2>
                    <p className=" mt-4 text-[#97A1B8] " >
                        Neural Docx continues to grow every day.
                    </p>
                </div>

                <div className=" grid gap-6  sm:grid-cols-2 lg:grid-cols-4 ">
                    {
                        stats.map((stat) => (
                            <div key={stat.title} className=" rounded-2xl  border border-[#242B3D] bg-[#131722]  p-8 text-center transition-all duration-200  hover:-translate-y-1 hover:border-[#4FD9C5]/40">
                                <h3 className=" inline-block text-4xl font-bold  bg-linear-to-r from-blue-400  to-[#4FD9C5] bg-clip-text text-transparent">
                                    { isLoading ? "..." : Number( stat.value ).toLocaleString() }
                                    +
                                </h3>
                                <p className=" mt-4 text-[#97A1B8] " >
                                    {stat.title}
                                </p>
                            </div>
                        ))
                    }
                </div>
            </div>
        </section>
    );
};
export default Analytics;