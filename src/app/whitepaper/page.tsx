"use client";

import React, { useState } from 'react';
import './style.css';
import DcnNavBar from '../components/dcnnavbar';
import Footer from '../components/footer';
import Image from 'next/image';
import speachimage from '../../assets/speachimage.png';
import partnerimage from '../../assets/partnerimage.png';
export default function Whitepaper() {
    const [showDrawer, setShowDrawer] = useState(false);

    const timelineData = [
        { title: 'Brief', month: 'January', description: 'Brief description for January.' },
        { title: 'Research', month: 'February', description: 'Brief description for February.' },
        { title: 'Discover', month: 'March', description: 'Brief description for March.' },
        { title: 'Design', month: 'April', description: 'Brief description for April.' },
        { title: 'Testing', month: 'May', description: 'Brief description for May.' },
        { title: 'Launch & Feedback', month: 'June', description: 'Brief description for June.' },
    ];

    return (
        <div className="whitepaper">
            {/* DCN NAVBAR */}
            <DcnNavBar />

            {/* Whitepaper */}
            <div className="academic-achievement">
                {/* DCN Journey Timeline */}
                <div className="timeline-header py-10 my-10 text-center">
                    <h1 className="timeline-title text-4xl font-bold text-white">Whitepaper</h1>
                    <div className="comingsoon mt-5">
                        <h2 className="text-2xl font-semibold text-yellow-300 bg-yellow-800 bg-opacity-25 rounded-md p-3 inline-block animate-pulse">
                            Coming Soon
                        </h2>
                    </div>

                    {/* Subtitle Timeline */}
                    <p className="timeline-subtitle text-gray-300 mt-10">
                        DCN Timeline From Inception to Launch.
                    </p>
                </div>

                {/* Timeline Content */}
                <div className="timeline-wrapper">
                    <div className="timeline-container">
                        {timelineData.map((item, index) => (
                            <div className="timeline-item" key={index}>
                                <div className="timeline-content">
                                    <h3>{item.title}</h3>
                                    <div className="month">{item.month}</div>
                                    <p>{item.description}</p>
                                </div>
                                <div className="timeline-dot" style={{ top: '50%' }} />
                            </div>
                        ))}
                    </div>
                </div>

                <div style={{ height: '300px' }}></div>

                {/* Footer Section with Speech Blog */}
                <div className="timeline-footer py-10 my-10 text-center">
                    <Image src={speachimage} alt="speachimage" className="w-64 h-64 mx-auto" />

                    {/* Speech Blog */}
                    <div className="speech-blog mt-10 px-4 md:px-20 lg:px-40 text-gray-300">
                        <h2 className="text-3xl font-semibold text-white mb-5">
                            Why a Decentralized Certificate Network?
                        </h2>
                        <p className="text-lg mb-4">
                            The Decentralized Certificate Network (DCN) redefines trust in digital credentials by enabling secure, verifiable, and tamper-proof certificates on the blockchain. With DCN, individuals gain control over their credentials, while institutions ensure authenticity in a cost-effective, scalable way.
                        </p>
                        <p className="text-lg mb-4">
                            Our mission is to bridge the gap between traditional credentialing systems and the emerging needs of the digital world. This project leverages decentralized technology to reduce fraud, streamline verification processes, and empower both certificate holders and verifiers with a system that values transparency and trust.
                        </p>
                        <p className="text-lg">
                            As we move towards launch, we’re excited to share our journey, challenges, and achievements with you. Join us in pioneering the future of digital certification—secure, accessible, and verified by all.
                        </p>
                    </div>

                    {/* Partner with Us Section */}
                    <div className="partner-with-us mt-20 px-4 md:px-20 lg:px-40 text-center">
                        <Image src={partnerimage} alt="partnerimage" className="w-[80%] h-64 mx-auto" />
                        <h2 className="text-5xl font-extrabold text-white mb-5">
                            Partner with Us
                        </h2>
                        <p className="text-lg text-gray-300 mb-5">
                            Are you interested in collaborating with us on the Decentralized Certificate Network project? Fill out the form below to become a partner and be a part of the future of secure, verifiable digital credentials.
                        </p>
                        <button 
                            onClick={() => setShowDrawer(true)} 
                            className="partner-button inline-block bg-yellow-500 text-white font-semibold py-3 px-6 rounded-md hover:bg-yellow-600 transition duration-300"
                        >
                            Fill Out Partner Form
                        </button>
                    </div>
                </div>

                {/* Slide-In Drawer for Google Form */}
                <div className={`drawer ${showDrawer ? 'open' : ''}`}>
                    <div className="drawer-content">
                        <button 
                            onClick={() => setShowDrawer(false)} 
                            className="close-button text-white text-lg absolute top-4 right-4"
                        >
                            &times;
                        </button>
                        <iframe 
                            src="https://docs.google.com/forms/d/e/1FAIpQLSdvOUVI0fwQ1jdYsZY8539KxjMyymutNcIO_VYQkCBF9Izsqg/viewform?embedded=true" 
                            width="100%" 
                            height="100%" 
                            frameBorder="0" 
                            marginHeight={0}
                            marginWidth={0}
                        >
                            Loading…
                        </iframe>
                    </div>
                </div>

                <Footer />
            </div>
        </div>
    );
}
