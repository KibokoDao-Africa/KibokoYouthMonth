'use client';
import { useState, useEffect } from "react";
import { IconButton, CircularProgress } from "@mui/material";
import { MoreHoriz } from "@mui/icons-material";

export default function RefaralTracking() {
    const [progress, setProgress] = useState(0);
    const targetProgress = 66.67;

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prevProgress) => {
                const nextProgress = prevProgress + 1;
                if (nextProgress >= targetProgress) {
                    clearInterval(timer);
                    return targetProgress;
                }
                return nextProgress;
            });
        }, 10); // Adjust interval for speed (lower values = faster)

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="bg-[#12132D] p-4 rounded-2xl w-2/4">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-gray-100">Referral Tracking</h3>
                <IconButton style={{backgroundColor: '#110a29', color: "white", width: 40, height: 40, borderRadius: 4 }}>
                    <MoreHoriz fontSize="small" />
                </IconButton>
            </div>

            <div className="flex gap-4 mt-4 justify-between w-[100%]">
                <div className="flex flex-col gap-4 w-1/2">
                    {/* Invited */}
                    <div className="shadow rounded-3xl p-4 bg-[#0A0B1E]">
                        <h3 className="text-md font-bold text-gray-400">Invited</h3>
                        <h2 className="text-2xl font-extrabold text-white">03</h2>
                    </div>

                    {/* DCN Bonus */}
                    <div className="shadow rounded-3xl p-4 bg-[#0A0B1E]">
                        <h3 className="text-md font-bold text-gray-400">DCN Bonus</h3>
                        <h2 className="text-2xl font-extrabold text-white">30</h2>
                    </div>
                </div>

                {/* Circular Progress with Centered Text */}
                <div className="w-1/2 flex items-center justify-center relative">
                    <CircularProgress
                        size={140}
                        variant="determinate"
                        value={progress}
                        style={{ color: '#4caf50', transition: 'all 0.2s ease-in-out' }}
                    />
                    <div className="absolute flex flex-col items-center justify-center inset-0">
                        <span className="text-white font-bold text-lg">03</span>
                        <span className="text-gray-400 text-md">Total invites</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
