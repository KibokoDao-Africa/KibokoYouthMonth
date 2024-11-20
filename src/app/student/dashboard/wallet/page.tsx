"use client";

import { useState } from "react";
import Container from "../../components/Container";
// Import the plus icon from MUI
import { Add, Search } from "@mui/icons-material";
import FileList from "./filelist";
import { CircularProgress } from "@mui/material";
import ImportCertificateModal from "./importcertificate";

import { useAppKitAccount } from "@reown/appkit/react";


export default function WalletAccount() {
    const [startDate, setStartDate] = useState("");
    const { isConnected } = useAppKitAccount()
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleImport = async (contractAddress: string, tokenId: string): Promise<void> => {
        // Add your logic here to handle the import with contractAddress and tokenId
        console.log(contractAddress, tokenId);
    };
    return (
        <Container>
            <div className="flex justify-center min-w-[calc(100%-320px)]">
                {/* modal */}
                <ImportCertificateModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onImport={handleImport} />

                <div className="min-w-[90%] max-w-[1200px] mx-auto">
                    {/* Header Section */}
                    <div className="flex justify-between items-center py-10 w-full">
                        <h1 className="text-4xl font-extrabold text-gray-300">Certificates</h1>
                        <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition-colors"
                            onClick={() => setIsModalOpen(true)}
                        >
                            <Add />
                            <span className="text-sm font-semibold">Import Certificate</span>
                        </button>
                    </div>

                    {/* Filter Section */}
                    <div className="flex gap-4 w-full mt-4 py-5 px-6 bg-[#12132D] shadow-lg rounded-xl">
                        <input
                            className="flex-1 p-2 border border-gray-800 rounded-md h-[50px] bg-[#0A0B1E]"
                            placeholder="Search Certificates by address, Date or Name"
                        />
                        <label className="flex items-center gap-2 text-gray-300"> From </label>

                        <input
                            type="date"
                            className="p-2 border border-gray-800 rounded-md text-gray-300  bg-[#0A0B1E]"
                            placeholder="Start Date"
                        />
                        <label className="flex items-center gap-2 text-gray-300"> To </label>
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="p-2 border border-gray-800 rounded-md text-gray-300 bg-[#0A0B1E]"
                        />

                        <button className="animate-glow px-6 bg-gray-400 text-white rounded-2xl font-bold shadow hover:bg-blue-600 transition-colors flex gap-5 py-3"
                            style={{background: 'linear-gradient(90deg, #00E1FF 0%, #0095FF 100%)'}}
                        >
                            <Search />
                            Search
                        </button>
                    </div>

                    {/* List of Certificates (Placeholder) */}
                    <div className="mt-8">
                        {isConnected ? (
                            <FileList />
                        ) : (
                            <div className="flex items-center justify-center h-96">
                                <CircularProgress />
                                <p className="text-center text-gray-300">Please connect your wallet to view certificates.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Container>
    );
}
