"use client";

// components imports
import Container from "./components/Container";
import CircularProgressTracker from "./components/CircularProgressTracker";

export default function Dashboard() {
    return (
        <Container>
            <div className="flex px-10 flex-col gap-4 py-6">

                {/* Total Certificates */}
                <div className="w-[100%] bg-[#1E2327] min-h-[300px] rounded-xl border border-[#2E343A]">
                    <div className="flex flex-row items-center justify-between min-h-[180px] px-8 py-4">
                        <div className="flex flex-col justify-center min-h-[100%] w-1/3">
                            <h1 className="text-lg font-bold text-gray-300">Total Certificates</h1>
                            <h1 className="text-3xl font-bold text-gray-300">100</h1>
                            <p className="text-sm text-gray-400">Total number of certificates issued</p>
                        </div>
                        
                        <div className="flex items-center justify-center min-h-[100%] w-2/3">
                            <div className="min-w-[100%] h-[150px] bg-[#151A1D] rounded-xl"></div>
                        </div>
                    </div>
                    {/* brake line */}
                    <div className="w-[100%] h-[4px] bg-[#151A1D] rounded-xl"></div>
                </div>

                {/* Total Students */}
                <div className="w-[100%] flex flex-row gap-4 my-4">
                    <div className="w-2/3 bg-[#1E2327] min-h-[400px] rounded-xl border border-[#2E343A]">

                    </div>
                    <div className="w-1/3 flex flex-col gap-4">
                        <div className="w-[100%] bg-[#1E2327] min-h-[200px] rounded-xl border border-[#2E343A]"></div>
                        <div className="w-[100%] bg-[#1E2327] min-h-[200px] rounded-xl border border-[#2E343A] p-4">
                            <h1 className="text-lg font-bold text-gray-300 uppercase">Leader Board</h1>
                        </div>
                    </div>
                </div>

                {/* collection card */}
                <div className="w-[100%] bg-[#1E2327] min-h-[400px] rounded-xl border border-[#2E343A] p-4">
                    <div className="p-4 rounded-md flex items-center justify-between space-x-4">
                        <h1 className="text-lg font-bold text-gray-300 uppercase">Collection List</h1>
                        {/* Search Input */}
                        <div className="justify-center w-1/2">
                            <input
                                type="text"
                                placeholder="Search by name, contract address or key terms"
                                className="w-full bg-[#151A1D] text-white placeholder-gray-400 py-2 px-4 rounded-md focus:outline-none"
                            />
                        </div>

                        {/* Time Filter Buttons */}
                        <div className="flex space-x-2 bg-[#151A1D] rounded-lg py-2 px-4">
                            <button className="px-3 py-1 text-white rounded-md hover:bg-gray-600">
                                1D
                            </button>
                            <button className="px-3 py-1 text-white bg-gray-700 rounded-md hover:bg-gray-600">
                                7D
                            </button>
                            <button className="px-3 py-1 text-white rounded-md hover:bg-gray-600">
                                All
                            </button>
                            <button className="px-3 py-1 text-white rounded-md hover:bg-gray-600">
                                1M
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </Container>
    )
}