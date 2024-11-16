import React from "react";
import PoolCard from "../components/PoolCard";

const Home = () => {
    const donationPools = [
        { title: "Education for All", description: "Support underprivileged children.", totalDonations: "$500" },
        { title: "Clean Water", description: "Help provide clean water.", totalDonations: "$300" },
        { title: "Healthcare Fund", description: "Support community health programs.", totalDonations: "$800" },
    ];

    return (
        <div className="container mx-auto mt-12 text-center">
            {/* Title and Slogan */}
            <h2 className="text-3xl font-semibold text-gray-800">Empowering Change, One Donation at a Time</h2>
            <p className="text-lg text-gray-600 mt-4">
                Join us in making a difference. Support meaningful causes with ease.
            </p>

            {/* Donation Pools */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {donationPools.map((pool, index) => (
                    <PoolCard key={index} {...pool} />
                ))}
            </div>
        </div>
    );
};

export default Home;
