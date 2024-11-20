"use client"

import Container from "../../components/Container";

export default function NFTMarketplace() {
    return (
        <Container>
            <div className="h-screen justify-center items-center flex flex-col space-y-8">
                {/* Title */}
                <h2 className="text-2xl font-semibold text-yellow-300 bg-yellow-800 bg-opacity-25 rounded-md p-3 inline-block animate-pulse mb-8 max-w-full">
                    NFT Marketplace Coming Soon
                </h2>

                {/* NFT Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl px-4">
                    {/* NFT Card Placeholder */}
                    {Array(6).fill("").map((_, index) => (
                        <div key={index} className="flex flex-col items-center bg-[#1a1333] bg-opacity-90 p-6 rounded-xl shadow-lg transition-transform transform hover:scale-105 w-60 h-80 space-y-4">
                            {/* Image Placeholder */}
                            <div className="w-full h-40 bg-gradient-to-r from-transparent via-gray-600 to-transparent rounded-lg mb-4"></div>
                            
                            {/* NFT Title Placeholder */}
                            <div className="w-3/4 h-6 bg-gradient-to-r from-transparent via-gray-500 to-transparent rounded-md mb-2"></div>
                            
                            {/* NFT Price Placeholder */}
                            <div className="w-1/2 h-5 bg-gradient-to-r from-transparent via-gray-500 to-transparent rounded-md"></div>
                        </div>
                    ))}
                </div>
            </div>
        </Container>
    );
}
