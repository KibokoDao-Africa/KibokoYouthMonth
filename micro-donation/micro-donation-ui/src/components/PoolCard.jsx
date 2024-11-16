import React from "react";

const PoolCard = ({ title, description, totalDonations }) => {
    return (
        <div className="card">
            <h2 className="text-xl font-semibold">{title}</h2>
            <p className="text-gray-600 my-2">{description}</p>
            <p className="text-sm text-gray-500">Total Donations: {totalDonations}</p>
            <button className="mt-4">Donate Now</button>
        </div>
    );
};

export default PoolCard;
