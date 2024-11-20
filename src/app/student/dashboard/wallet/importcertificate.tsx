"use client";

import { useState } from "react";
import { CircularProgress } from "@mui/material";

type ImportCertificateModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onImport: (contractAddress: string, tokenId: string) => Promise<void>; // Updated to support async
};


export default function ImportCertificateModal({
    isOpen,
    onClose,
    onImport,
}: ImportCertificateModalProps) {
    const [contractAddress, setContractAddress] = useState("");
    const [tokenId, setTokenId] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleImport = async () => {
        if (!contractAddress || !tokenId) {
            setError("Both fields are required.");
            return;
        }
        
        setIsLoading(true);
        setError("");
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-[#110a29] shadow-lg border shadow-[#00B8FF] bg-gray-800 rounded-lg p-6 w-full max-w-md">
                <h2 className="text-xl font-semibold mb-4 text-gray-300 text-gray-200">
                    {isLoading ? "Importing Certificate..." : "Import Certificate"}
                </h2>

                {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-10">
                        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                        <p className="text-gray-300 text-gray-300">
                            Please wait while we import your certificate.
                        </p>

                        <CircularProgress size="large" />

                        <button
                            onClick={onClose}
                            className="mr-2 px-4 py-2 bg-gray-200 text-gray-300 mt-6 rounded-md bg-gray-600 text-gray-300"
                        >
                            Cancel
                        </button>

                    </div>
                ) : (
                    <>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-300 text-gray-300">
                                Contract Address
                            </label>
                            <input
                                type="text"
                                value={contractAddress}
                                onChange={(e) => setContractAddress(e.target.value)}
                                placeholder="Enter contract address"
                                className="mt-1 block w-full p-2 border border-gray-700 rounded-md bg-gray-700 border-gray-600 text-white"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-300 text-gray-300">
                                Token ID
                            </label>
                            <input
                                type="text"
                                value={tokenId}
                                onChange={(e) => setTokenId(e.target.value)}
                                placeholder="Enter token ID"
                                className="mt-1 block w-full p-2 border border-gray-700 rounded-md bg-gray-700 border-gray-600 text-white"
                            />
                        </div>

                        <div className="flex justify-end mt-4">
                            <button
                                onClick={onClose}
                                className="mr-2 px-4 py-2 bg-gray-200 text-gray-300 rounded-md bg-gray-600 text-gray-300"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleImport}
                                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                            >
                                Import
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
