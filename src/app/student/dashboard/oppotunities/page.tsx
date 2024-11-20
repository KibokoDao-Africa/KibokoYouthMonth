"use client"

import Image from 'next/image';
import React from 'react';
import Container from '../../components/Container';
import upworkimage from '../../../../assets/upwork.png';

const JobLinks = () => {
    return (
        <Container>

            <div className="min-h-screen text-white">
                <div className="max-w-6xl mx-auto py-12 px-6 text-center">
                    <h1 className="text-4xl font-bold text-white mb-8">
                        We're Working on Displaying Jobs from These Web3-Friendly Sites!
                    </h1>
                    <p className="text-xl mb-12">
                        Our platform is aggregating the best remote and blockchain-related job opportunities for you. Stay tuned!
                    </p>

                    <h2 className="text-2xl font-semibold text-yellow-300 bg-yellow-800 bg-opacity-25 rounded-md p-3 inline-block animate-pulse mb-4">
                        Coming Soon
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Job Websites */}
                        <div className="group bg-gray-800 rounded-lg p-6 shadow-xl transform hover:scale-105 transition-transform duration-300">
                            <a href={'upworkimage'} target="_blank" rel="noopener noreferrer">
                                <div className="flex justify-center mb-4">
                                    <Image src={upworkimage} alt="Upwork" className="h-12 w-auto" width={48} height={48} />
                                </div>
                                <h2 className="text-2xl font-semibold mb-2">Upwork</h2>
                                <p>Find blockchain and Web3 jobs on one of the largest freelance platforms.</p>
                            </a>
                        </div>

                        <div className="group bg-gray-800 rounded-lg p-6 shadow-xl transform hover:scale-105 transition-transform duration-300">
                            <a href="https://remote3.co/" target="_blank" rel="noopener noreferrer">
                                <div className="flex justify-center mb-4">
                                    <img src="https://accounts.kaleido.ai/assets/logo-kaleido-small-eac541164956a91b30573ad25f579631e904e16e57380ffefd11fc6a2420779f.svg" alt="Remote3" className="h-12 w-auto" />
                                </div>
                                <h2 className="text-2xl font-semibold mb-2">Remote3</h2>
                                <p>Discover blockchain and remote jobs specifically for the Web3 community.</p>
                            </a>
                        </div>

                        <div className="group bg-gray-800 rounded-lg p-6 shadow-xl transform hover:scale-105 transition-transform duration-300">
                            <a href="https://web3.career/?ref=producthunt" target="_blank" rel="noopener noreferrer">
                                <div className="flex justify-center mb-4">
                                    <img src="https://cdn.prod.website-files.com/60a73a3351750977d4ece3b9/60d722695cf05b55e10b9419_icon256x256.png" alt="Web3 Career" className="h-12 w-auto" />
                                </div>
                                <h2 className="text-2xl font-semibold mb-2">Web3 Career</h2>
                                <p>Your one-stop destination for Web3 jobs and blockchain development opportunities.</p>
                            </a>
                        </div>

                        <div className="group bg-gray-800 rounded-lg p-6 shadow-xl transform hover:scale-105 transition-transform duration-300">
                            <a href="https://cryptojobslist.com/" target="_blank" rel="noopener noreferrer">
                                <div className="flex justify-center mb-4">
                                    <img src="https://cryptojobslist.com/favicon.ico" alt="CryptoJobsList" className="h-12 w-auto" />
                                </div>
                                <h2 className="text-2xl font-semibold mb-2">CryptoJobsList</h2>
                                <p>Explore the latest cryptocurrency and blockchain job postings.</p>
                            </a>
                        </div>

                        <div className="group bg-gray-800 rounded-lg p-6 shadow-xl transform hover:scale-105 transition-transform duration-300">
                            <a href="https://bitcoinjobs.com/" target="_blank" rel="noopener noreferrer">
                                <div className="flex justify-center mb-4">
                                    <img src="https://cdn.niceboard.co/boards/bitcoinerjobs/assets/favicon-ek9Ftpz4W-32x32.png" alt="Bitcoin Jobs" className="h-12 w-auto" />
                                </div>
                                <h2 className="text-2xl font-semibold mb-2">Bitcoin Jobs</h2>
                                <p>Find jobs in the Bitcoin and blockchain space.</p>
                            </a>
                        </div>

                        <div className="group bg-gray-800 rounded-lg p-6 shadow-xl transform hover:scale-105 transition-transform duration-300">
                            <a href="https://www.dreamstartupjob.com/" target="_blank" rel="noopener noreferrer">
                                <div className="flex justify-center mb-4">
                                    <img src="https://www.dreamstartupjob.com/templates/BootstrapDND/assets/images/ROCKET%201%20(1).png" alt="Dream Startup Job" className="h-12 w-auto" />
                                </div>
                                <h2 className="text-2xl font-semibold mb-2">Dream Startup Job</h2>
                                <p>Find your next dream job in a startup with a focus on Web3 and blockchain.</p>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default JobLinks;
