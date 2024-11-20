"use client"

import Container from "../../components/Container";

export default function Portfolio() {
    return (
        <Container>
            <div className="text-white text-center p-6 space-y-4 text-lg relative z-10">
                {/* Main Message */}
                <h2 className="text-2xl font-bold">
                    🚀 We are putting AI to work to craft you a custom portfolio that you can mint as an NFT!
                </h2>
                <p className="text-xl">
                    Perfect for wowing employers and standing out in job applications. While we are building this clever career hack, we will keep sharing links to gigs and jobs that could use your talents.
                </p>

                {/* Future Goals */}
                <p className="text-xl">
                    🔮 Down the line? We will be teaming up with top companies to make sure the right roles are chasing <span className="text-[#00E1FF] font-semibold">*you.*</span>
                </p>

                <h2 className="text-2xl font-semibold text-yellow-300 bg-yellow-800 bg-opacity-25 rounded-md p-3 inline-block animate-pulse mb-4">
                    Coming Soon
                </h2>

                {/* Portfolio Structure Placeholder */}
                <div className="mt-10 flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-6">
                    
                    {/* Profile Image Placeholder */}
                    <div className="w-[150px] h-[150px] md:w-[200px] md:h-[200px] bg-gradient-to-r from-transparent via-gray-500 to-transparent rounded-full border-4 border-dashed border-gray-500 animate-pulse"></div>
                    
                    {/* Info Cards */}
                    <div className="flex flex-col space-y-4 w-full max-w-md">
                        <div className="h-12 bg-gradient-to-r from-transparent via-gray-500 to-transparent rounded-md border-4 border-dashed border-gray-500 animate-pulse"></div>
                        <div className="h-12 bg-gradient-to-r from-transparent via-gray-500 to-transparent rounded-md border-4 border-dashed border-gray-500 animate-pulse"></div>
                        <div className="h-12 bg-gradient-to-r from-transparent via-gray-500 to-transparent rounded-md border-4 border-dashed border-gray-500 animate-pulse"></div>
                    </div>
                </div>

                {/* Certifications or Additional Information Placeholder */}
                <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                    <div className="h-24 bg-gradient-to-r from-transparent via-gray-500 to-transparent rounded-md border-4 border-dashed border-gray-500 animate-pulse"></div>
                    <div className="h-24 bg-gradient-to-r from-transparent via-gray-500 to-transparent rounded-md border-4 border-dashed border-gray-500 animate-pulse"></div>
                    <div className="h-24 bg-gradient-to-r from-transparent via-gray-500 to-transparent rounded-md border-4 border-dashed border-gray-500 animate-pulse"></div>
                    <div className="h-24 bg-gradient-to-r from-transparent via-gray-500 to-transparent rounded-md border-4 border-dashed border-gray-500 animate-pulse"></div>
                </div>
            </div>
        </Container>
    );
}
