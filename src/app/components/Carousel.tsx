"use client";
// import Video from next
import React from "react";
// import worldVideo from "../../assets/world.mp4";
import ReactPlayer from 'react-player';

export default function Carousel() {
    return (
        <div className="min-h-screen flex flex-col relative overflow-hidden rounded-3xl">
            {/* Background Video */}
            <video
                src="https://videos.pexels.com/video-files/3125448/3125448-hd_1280_720_25fps.mp4"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                className="absolute top-0 left-0 w-full h-full z-0"
                muted
                autoPlay
                loop
            />

            {/* Overlay to dim the video */}
            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-1"></div>

            {/* Carousel Section */}
            <div className="relative flex-1 flex flex-col lg:flex-row items-center justify-center p-6 lg:p-12 rounded-3xl"
                style={{ background: 'linear-gradient(135deg, #0A0B1E, rgba(43, 88, 118, .8), #0A0B1E)' }}
            >

                {/* Text Section */}
                <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left lg:mr-8">
                    <h1 className="text-5xl lg:text-8xl font-extrabold text-white leading-tight mb-6 lg:mb-8" style={{ letterSpacing: '0.1em' }}>
                        Step Into Your Digital Future With DCN
                    </h1>
                    <p className="text-lg lg:text-xl text-gray-300 mb-8">
                        A decentralized network for managing credentials and certificates.
                        DCN is a decentralized network that allows users to manage their credentials and certificates in a secure and efficient way.
                    </p>

                    <div className="flex space-x-10 align-center">
                        <button className="bg-white hover:bg-blue-700 hover:text-white text-black text-lg font-semibold px-5 py-3 rounded-2xl transition duration-300 ease-in-out shadow-md">
                            Learn More
                        </button>

                        {/* Read documentation link */}
                        <a href="#read" className="text-white-800 text-lg font-semibold hover:underline">
                            Read Documentation -{">"}
                        </a>
                    </div>
                </div>

                {/* Image Section */}
                <div className="w-full lg:w-1/2 flex justify-center mt-8 lg:mt-0">
                   
                </div>
            </div>
        </div>
    );
}
