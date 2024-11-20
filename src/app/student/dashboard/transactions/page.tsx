"use client"

import Container from "../../components/Container";

export default function Transaction() {
    return (
        <Container>
            <div className="h-screen flex justify-center items-center flex-col space-y-8">

                {/* Coming Soon Section */}
                <h2 className="text-2xl font-semibold text-yellow-300 bg-yellow-800 bg-opacity-25 rounded-md p-3 inline-block animate-pulse mb-4 max-w-[250px]">
                    Coming Soon
                </h2>

                {/* Glowing Placeholder for Transaction Structure */}
                <div className="w-full max-w-[500px] p-6 bg-gray-800 bg-opacity-25 rounded-xl shadow-lg animate-pulse">
                    <div className="w-full h-[200px] bg-gradient-to-r from-transparent via-gray-500 to-transparent rounded-md border-4 border-dashed border-gray-500 animate-pulse"></div>
                    <div className="mt-6">
                        <div className="w-full h-[50px] bg-gradient-to-r from-transparent via-gray-500 to-transparent rounded-md border-4 border-dashed border-gray-500 animate-pulse"></div>
                        <div className="w-full h-[50px] mt-4 bg-gradient-to-r from-transparent via-gray-500 to-transparent rounded-md border-4 border-dashed border-gray-500 animate-pulse"></div>
                        <div className="w-full h-[50px] mt-4 bg-gradient-to-r from-transparent via-gray-500 to-transparent rounded-md border-4 border-dashed border-gray-500 animate-pulse"></div>
                    </div>
                </div>
            </div>
        </Container>
    );
}
