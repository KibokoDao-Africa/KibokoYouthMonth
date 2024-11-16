import React, { useState } from "react";

const CreatePool = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle pool creation logic here
        console.log({ title, description });
        setTitle("");
        setDescription("");
    };

    return (
        <div className="container mx-auto mt-12 px-4 sm:px-8 text-center">
            {/* Title and Description */}
            <h2 className="text-3xl font-semibold text-gray-800">Start Your Donation Pool Today</h2>
            <p className="text-lg text-gray-600 mt-4">
                Create a pool to collect donations for a cause you care about.
            </p>

            {/* Form */}
            <form 
                className="mt-8 bg-white shadow-md rounded-lg p-6 max-w-md mx-auto" 
                onSubmit={handleSubmit}
            >
                {/* Title Input */}
                <div className="mb-4">
                    <label htmlFor="title" className="block text-left font-medium text-gray-700">
                        Pool Title
                    </label>
                    <input
                        id="title"
                        type="text"
                        placeholder="e.g., Help Build a School"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full mt-2 p-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none"
                        required
                    />
                </div>

                {/* Description Input */}
                <div className="mb-4">
                    <label htmlFor="description" className="block text-left font-medium text-gray-700">
                        Description
                    </label>
                    <textarea
                        id="description"
                        placeholder="Describe your cause and why it matters"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full mt-2 p-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none"
                        rows="4"
                        required
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="bg-teal-500 text-white px-6 py-3 rounded-lg shadow hover:bg-teal-600 transition-all duration-300"
                >
                    Create Pool
                </button>
            </form>
        </div>
    );
};

export default CreatePool;
