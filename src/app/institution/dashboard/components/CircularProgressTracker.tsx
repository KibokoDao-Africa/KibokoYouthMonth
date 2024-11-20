import React from 'react';

function CircularProgressTracker() {
    const percentage = 100; // Progress percentage
    const radius = 50; // Radius of the circle
    const stroke = 10; // Stroke width of the circle
    const normalizedRadius = radius - stroke * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
        <div className="flex flex-col items-center">
            <h3 className="text-white text-lg font-semibold mb-4">Progress Tracker</h3>

            {/* SVG Circular Progress */}
            <svg
                height={radius * 2}
                width={radius * 2}
                className="transform rotate-90"
            >
                <circle
                    stroke="#4b5563" // background circle color (gray)
                    fill="transparent"
                    strokeWidth={stroke}
                    r={normalizedRadius}
                    cx={radius}
                    cy={radius}
                />
                <circle
                    stroke="#7c3aed" // progress circle color (purple)
                    fill="transparent"
                    strokeWidth={stroke}
                    strokeDasharray={circumference + ' ' + circumference}
                    style={{ strokeDashoffset }}
                    strokeLinecap="round"
                    r={normalizedRadius}
                    cx={radius}
                    cy={radius}
                    className="transition-all duration-500 ease-out"
                />
            </svg>

            {/* Display Percentage */}
            <div className="absolute flex items-center justify-center top-0 left-0 right-0 bottom-0">
                <span className="text-white text-2xl font-bold">{percentage}%</span>
            </div>

            {/* Next Button */}
            <button className="mt-4 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
                Next
            </button>
        </div>
    );
}

export default CircularProgressTracker;
