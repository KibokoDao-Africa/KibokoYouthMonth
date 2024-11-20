import { useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import { FileUpload } from "@/components/ui/file-upload";
import { Button } from "@/components/ui/moving-border";

// Sample data for signers
const availableSigners = [
    { name: "Signer 1", address: "0x1234567890abcdef" },
    { name: "Signer 2", address: "0xabcdef1234567890" },
    { name: "Signer 3", address: "0x9876543210abcdef" },
];

export default function SmartContractForm() {
    const { darkMode } = useTheme();
    const [file, setFile] = useState<File>();
    const [url, setUrl] = useState("");
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState<{ message: string, type: string } | null>(null);
    const [uid, setUid] = useState("");
    const [signersModalOpen, setSignersModalOpen] = useState(false);
    const [signers, setSigners] = useState<string[]>([]); // To store selected signers
    const [clickedInputIndex, setClickedInputIndex] = useState<number | null>(null); // Track clicked input index
    const [certData, setCertData] = useState<{ studentName: string, grade: string, imageCid: string, issuerName: string, signers: string[] }>({ studentName: "", grade: "", imageCid: "", issuerName: "", signers: [] });

    const handleFileChange = (files: File[]) => {
        setFile(files[0]);
    };

    const uploadFile = async () => {
        try {
            if (!file) {
                alert("No file selected");
                return;
            }

            setUploading(true);
            const data = new FormData();
            data.set("file", file);
            const uploadRequest = await fetch("/api/files", {
                method: "POST",
                body: data,
            });
            const ipfsUrl = await uploadRequest.json();
            const ipfsHash = ipfsUrl.split('/ipfs/')[1];
            const ipfsFormat = `ipfs://${ipfsHash}`;
            setUid(ipfsFormat);
            setUploading(false);
            setMessage({
                message: "File uploaded successfully",
                type: "success"
            });
        } catch (e) {
            console.log(e);
            setUploading(false);
            setMessage({
                message: "Trouble uploading file",
                type: "error"
            });
        }
    };

    const handleSignerSelect = (address: string) => {
        if (clickedInputIndex !== null) {
            // Update the signer in the clicked input field
            const updatedSigners = [...signers];
            updatedSigners[clickedInputIndex] = address;
            setSigners(updatedSigners);
        }
        setSignersModalOpen(false);
    };

    const handleGetJson = () => {
        const jsonData = {
            studentName: certData.studentName || "",
            grade: certData.grade || "",
            imageCid: uid,
            issuerName: certData.issuerName || "",
            signers: signers,
        };

        const jsonString = JSON.stringify(jsonData, null, 2);
        const blob = new Blob([jsonString], { type: "application/json" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        // save with contract_studenName_date.json
        link.download = `contract_${jsonData.studentName}_${new Date().toISOString().split('T')[0]}.json`;
        link.click();
    };

    return (
        <div className={`flex flex-col md:flex-row p-8 rounded-lg shadow-lg max-w-5xl mx-auto`}>
            {/* Left Section - Main Form */}
            <div className="flex-1 mr-0 md:mr-8">
                <h1 className={`text-3xl font-bold mb-2 text-gray-300`}>First lets store our metadata on ipfs. 🥳</h1>
                <p className={`text-gray-400 mb-6`}>
                    You will need store to the metadata on IPFS for easier retrieval {'.'}
                    <a href="#" className="text-blue-400 underline">What is a ipfs?</a>
                </p>

                {/* File Upload */}
                <div className="mb-6">
                    <label className="block text-sm font-semibold mb-2 text-gray-300">Certificate image</label>
                    <div className="w-full max-w-4xl mx-auto border border-dashed bg-gray-600 border-neutral-200 dark:border-neutral-800 rounded-lg">
                        <FileUpload onChange={handleFileChange} />
                    </div>
                    <div className="flex flex-row justify-end">
                        <button
                            onClick={uploadFile}
                            className="mt-2 px-3 py-1 text-white rounded-md hover:bg-gray-600 flex items-center justify-center border border-gray-600 relative"
                        >
                            {uploading && (
                                <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-gray-300 mr-2"></span>
                            )}
                            {uploading ? "Uploading..." : "Upload to IPFS"}
                            {!uploading && (
                                <span className="pointer-indicator animate-bounce absolute -right-0 top-1/2 transform -translate-x-1 text-gray-300"
                                    style={{
                                        right: '-200px',
                                    }}
                                >
                                    ⬅️ Upload cert image first
                                </span>
                            )}
                        </button>
                    </div>
                    {message && 'message' in message && 'type' in message && (
                        <p className={`text-sm mt-2 text-gray-400 ${message.type === "success" ? "text-green-400" : "text-red-400"}`}>
                            {message.message}
                        </p>
                    )}

                    <p className={`text-sm mt-2 text-gray-400`}>
                        Recommended size: 350 x 350. File types: JPG, PNG, SVG, or GIF
                    </p>
                </div>

                {/* Contract Name & Token Symbol */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    {/* student name */}
                    <div>
                        <label className="block text-sm font-semibold mb-1 text-gray-300">Student Name</label>
                        <input
                            type="text"
                            placeholder="Enter Student Name"
                            required
                            value={certData.studentName}
                            onChange={(e) => setCertData({ ...certData, studentName: e.target.value })}
                            minLength={3}
                            maxLength={100}
                            className="w-full my-2 p-2 rounded focus:outline-none bg-[#1E2327] border border-gray-600 text-gray-300"
                        />
                    </div>

                    {/* student grade */}
                    <div>
                        <label className="block text-sm font-semibold mb-1 text-gray-300">Distinction</label>
                        <input
                            type="text"
                            placeholder="Enter grade"
                            required
                            pattern="^[A-Fa-f]{1}$"  // Restrict to single letter grade
                            value={certData.grade}
                            onChange={(e) => setCertData({ ...certData, grade: e.target.value })}
                            className="w-full my-2 p-2 rounded focus:outline-none bg-[#1E2327] border border-gray-600 text-gray-300"
                        />
                    </div>

                    {/* Image CID */}
                    <div>
                        <label className="block text-sm font-semibold mb-1 text-gray-300">Image CID</label>
                        <input
                            type="text"
                            placeholder="ipfs://Qm..."
                            value={uid}
                            disabled
                            className="w-full my-2 p-2 rounded focus:outline-none bg-[#1E2327] border border-gray-600 text-gray-300"
                        />
                    </div>

                    {/* Issuer Name */}
                    <div>
                        <label className="block text-sm font-semibold mb-1 text-gray-300"> Name of Issuer </label>
                        <input
                            type="text"
                            placeholder="Enter Issuer Name"
                            required
                            value={certData.issuerName}
                            onChange={(e) => setCertData({ ...certData, issuerName: e.target.value })}
                            minLength={3}
                            maxLength={100}
                            className="w-full my-2 p-2 rounded focus:outline-none bg-[#1E2327] border border-gray-600 text-gray-300"
                        />
                    </div>

                    <div className='flex flex-wrap w-[100%]'>
                        <label className="block text-sm font-semibold mb-1 text-gray-300">Other Signers</label>
                        {["", "", ""].map((_, index) => (
                            <div key={index} className="w-full">
                                <input
                                    type="text"
                                    placeholder="Enter Signer"
                                    className="w-full my-2 p-2 rounded focus:outline-none bg-[#1E2327] border border-gray-600 text-gray-300"
                                    onFocus={() => {
                                        setClickedInputIndex(index); // Track the clicked input index
                                        setSignersModalOpen(true);
                                    }}
                                    value={signers[index] || ""}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Advanced Settings */}
                <div className={`mt-4 cursor-pointer text-blue-400 flex justify-between items-center`}>
                    <h1 className="text-lg font-semibold mb-4 text-gray-300">Advanced settings</h1>
                    <Button onClick={handleGetJson}>
                        GET JSON FILE
                    </Button>
                </div>
            </div>

            {/* Signers Modal */}
            {signersModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-md shadow-lg">
                        <h3>Select Signer</h3>
                        <ul>
                            {availableSigners.map((signer, index) => (
                                <li
                                    key={index}
                                    onClick={() => handleSignerSelect(signer.address)}
                                    className="cursor-pointer hover:bg-gray-200 p-2"
                                >
                                    {signer.name} ({signer.address})
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
}
