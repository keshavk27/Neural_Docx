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
            className="
                border-y
                border-neutral-800
                bg-[#171717]
                px-6
                py-20
            "
        >

            <div className="mx-auto max-w-7xl">

                <div className="mb-14 text-center">

                    <h2
                        className="
                            text-4xl
                            font-bold
                            text-white
                        "
                    >

                        Trusted by Learners

                    </h2>

                    <p
                        className="
                            mt-4
                            text-neutral-400
                        "
                    >

                        Neural Docx continues to grow every day.

                    </p>

                </div>



                <div
                    className="
                        grid
                        gap-6
                        sm:grid-cols-2
                        lg:grid-cols-4
                    "
                >

                    {

                        stats.map((stat) => (

                            <div
                                key={stat.title}
                                className="
                                    rounded-2xl
                                    border
                                    border-neutral-800
                                    bg-[#1F1F1F]
                                    p-8
                                    text-center
                                "
                            >

                                <h3
                                    className="
                                        text-4xl
                                        font-bold
                                        text-blue-400
                                    "
                                >

                                    {

                                        isLoading
                                            ? "..."
                                            : Number(
                                                stat.value
                                            ).toLocaleString()

                                    }

                                    +

                                </h3>

                                <p
                                    className="
                                        mt-4
                                        text-neutral-400
                                    "
                                >

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