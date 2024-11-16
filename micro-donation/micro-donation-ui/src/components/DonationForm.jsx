import React, { useState } from "react";

const DonationForm = ({ onSubmit }) => {
    const [amount, setAmount] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(amount);
        setAmount("");
    };

    return (
        <form className="mt-4" onSubmit={handleSubmit}>
            <input
                type="number"
                placeholder="Enter donation amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="mb-2"
            />
            <button type="submit">Submit Donation</button>
        </form>
    );
};

export default DonationForm;
