"use client";

import React from "react";
import DcnNavBar from './components/dcnnavbar';
import Carousel from "./components/Carousel";
import CarouselWidget from "./components/CarouselWidget";
import HowToGetStarted from "./components/howtogetStarted";
import FAQ from "./components/FAQ";
import Footer from "./components/footer";
import Image from "next/image";

export default function Home() {
    return (
        <main className="p-8 min-h-screen relative"
            style={{
                background: 'linear-gradient(180deg, #020321, #140221)',
                zIndex: 0,
            }}
        >
            {/* DCN NAVBAR */}
            <DcnNavBar />

            {/* Carousel */}
            <Carousel />

            {/* Carousel Widget */}
            <div className="min-w-screen flex items-center justify-center">
                <CarouselWidget />
            </div>

            {/* How to Get Started */}
            <HowToGetStarted />

            {/* FAQ */}
            <FAQ />

            {/* Sign Up Section */}
            <div className='flex items-center justify-center my-[10rem]'>
                <div className="max-w-[80%] relative flex flex-col lg:flex-row items-center z-10 p-6 lg:p-1 rounded-3xl shadow-lg flex-1 overflow-hidden"
                    style={{
                        minHeight: '350px',
                        background: 'linear-gradient(135deg, rgba(23, 34, 77, 0.8), rgba(43, 88, 118, 0.8))',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
                    }}
                >
                    <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left lg:mr-8 p-10">
                        <h2 className="text-3xl font-bold text-white mb-4 relative">
                            Sign up for email updates
                            <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-gradient-to-r from-blue-400 to-purple-500"></span>
                        </h2>
                        <p className="text-blue-200 mb-6">Keep up to date with the DCN</p>

                        <div className="relative w-full max-w-md">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full px-4 py-3 rounded-lg bg-gray-800 bg-opacity-50 text-white placeholder-gray-400 border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition duration-300"
                                style={{ backdropFilter: 'blur(5px)' }}
                            />
                            <button className="mt-4 w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg text-lg font-semibold transition duration-300 transform hover:scale-105 hover:shadow-lg">
                                Sign Up
                            </button>
                        </div>
                    </div>

                    <div className="w-full lg:w-1/2 flex justify-center lg:mt-0 relative overflow-hidden rounded-xl">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-600 opacity-75"></div>
                        {/* <Image
                            src="https://img.freepik.com/free-vector/abstract-blue-backgroud-modern-design_677411-2939.jpg"
                            alt="DCN Email"
                            loading="eager"
                            className="relative z-10 h-full w-full object-cover transform hover:scale-110 transition duration-500"
                            width={500}
                            height={200}
                        /> */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(23,34,77,0.8)] to-transparent"></div>
                    </div>

                    {/* 3D Floating Elements */}
                    <div className="absolute -top-10 -left-10 w-20 h-20 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                    <div className="absolute -bottom-10 -right-10 w-20 h-20 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
                </div>
            </div>

            {/* Footer */}
            <Footer />

            {/* Keyframe Animations */}
            <style jsx>{`
                @keyframes blob {
                    0% {
                        transform: translate(0px, 0px) scale(1);
                    }
                    33% {
                        transform: translate(30px, -50px) scale(1.1);
                    }
                    66% {
                        transform: translate(-20px, 20px) scale(0.9);
                    }
                    100% {
                        transform: translate(0px, 0px) scale(1);
                    }
                }
                .animate-blob {
                    animation: blob 7s infinite;
                }
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
                .animation-delay-4000 {
                    animation-delay: 4s;
                }
            `}</style>
        </main>
    );
}