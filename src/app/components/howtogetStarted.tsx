"use client";

export default function HowToGetStarted() {
    const institutionSteps = [
        {
            title: "Connect Wallet",
            description: "Connect your wallet (like MetaMask) to start issuing certificates"
        },
        {
            title: "Verify Institution",
            description: "Submit required documents and get verified as an authorized issuer"
        },
        {
            title: "Issue Certificates",
            description: "Start issuing secure, blockchain-verified certificates as NFTs"
        }
    ];

    const studentSteps = [
        {
            title: "Connect Wallet",
            description: "Connect your blockchain wallet (like MetaMask) to receive certificates"
        },
        {
            title: "Complete Profile",
            description: "Add your student details and connect with your institution"
        },
        {
            title: "Receive & Share",
            description: "Receive certificates as NFTs and share them with employers"
        }
    ];

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-8">
            <h1 className="text-4xl lg:text-5xl text-center font-extrabold text-white leading-tight mb-8">
                How to Get Started
            </h1>

            {/* Institution Section */}
            <div className="w-full max-w-5xl mb-16">
                <h2 className="text-2xl font-bold text-white mb-8 text-center">
                    For Institutions
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
                    {institutionSteps.map((step, index) => (
                        <div
                            key={index}
                            className="w-64 h-64 flex flex-col items-center justify-center rounded-lg p-4 text-center hover:scale-105"
                            style={{ backgroundColor: '#040b33' }}
                        >
                            <div className="bg-blue-600 w-10 h-10 rounded-full flex items-center justify-center mb-4">
                                <span className="text-white font-bold">{index + 1}</span>
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-2">{step.title}</h2>
                            <p className="text-gray-300">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Student Section */}
            <div className="w-full max-w-5xl mb-16">
                <h2 className="text-2xl font-bold text-white mb-8 text-center">
                    For Students
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
                    {studentSteps.map((step, index) => (
                        <div
                            key={index}
                            className="w-64 h-64 flex flex-col items-center justify-center rounded-lg p-4 text-center hover:scale-105"
                            style={{ backgroundColor: '#040b33' }}
                        >
                            <div className="bg-purple-600 w-10 h-10 rounded-full flex items-center justify-center mb-4">
                                <span className="text-white font-bold">{index + 1}</span>
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-2">{step.title}</h2>
                            <p className="text-gray-300">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Verifier Section */}
            <div className="w-full max-w-5xl">
                <h2 className="text-2xl font-bold text-white mb-8 text-center">
                    For Employers/Verifiers
                </h2>
                <div className="w-full bg-[#040b33] rounded-lg p-6 text-center">
                    <h3 className="text-xl font-bold text-white mb-4">Quick Verification - No Sign Up Needed</h3>
                    <p className="text-gray-300 mb-4">
                        Instantly verify any student's credentials using either:
                    </p>
                    <ul className="text-gray-300 list-disc list-inside space-y-2">
                        <li>Student's wallet address</li>
                        <li>Certificate's IPFS hash</li>
                    </ul>
                    <p className="text-gray-300 mt-4">
                        Simple, secure verification without any registration or login required
                    </p>
                </div>
            </div>
        </div>
    );
}