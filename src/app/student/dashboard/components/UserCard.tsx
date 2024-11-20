"use client";
import { IconButton } from "@mui/material";
import { Share } from "@mui/icons-material";
import { ContentCopy } from "@mui/icons-material";
import { useAppKitAccount } from "@reown/appkit/react";
import { QrCode2 } from "@mui/icons-material";
import { useState } from "react";
import ReactCardFlip from "react-card-flip";
import QRCode from 'react-qr-code';
import Image from "next/image";


export default function UserCard() {
    const { address, isConnected } = useAppKitAccount();
    const [isFlipped, setIsFlipped] = useState(false);

    // Function to trim the address
    const trimAddress = (address: string) => {
        return `${address.slice(0, 6)}...${address.slice(-4)}`;
    };

    // Toggle the flip state
    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    return (
        <div className={`perspective-1000 bg-[#0d0f2a] text-light shadow-xl item-end w-2/4 p-4 px-8 rounded-2xl min-h-[300px] transition-transform duration-500 ${isFlipped ? "rotate-y-180" : ""}`}
            style={{
                transformStyle: "preserve-3d",
                backgroundImage: `url("	https://demos.creative-tim.com/vision-ui-dashboard-react/static/media/cardimgfree.5771cbbb.png")`,
            }}
        >
            <ReactCardFlip
                isFlipped={isFlipped}
                flipDirection="vertical"
            >

                <div className="front absolute inset-0 backface-hidden text-light p-4 rounded-lg">
                    <div className="flex justify-between">
                        <div>
                            <div className="h-[130px] w-[130px] rounded-xl">
                                <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="profile" className="h-full w-full object-cover rounded-xl" />
                            </div>

                            {/* wallet address if connected with copy mui icon */}
                            <div className="flex items-center mt-4">
                                <span className="text-gray-300">
                                    {isConnected && address ? trimAddress(address) : "Connecting Wallet..."}
                                </span>
                                <IconButton className="text-gray-300">
                                    <ContentCopy fontSize="small" className="text-white" />
                                </IconButton>
                            </div>
                        </div>

                        {/* Share and QR Code Flip Icons */}
                        <div className="flex space-x-2">
                            <IconButton style={{ backgroundColor: '#110a29', width: 40, height: 40 }}>
                                <Share fontSize="small" style={{ color: '#4caf50' }} />
                            </IconButton>
                            <IconButton className="text-gray-200" style={{ backgroundColor: '#110a29', width: 40, height: 40 }} onClick={handleFlip}>
                                <QrCode2 fontSize="small"  style={{ color: '#fff' }} />
                            </IconButton>
                        </div>
                    </div>

                    <div className="mt-4 flex flex-row items-center w-[100%]">
                        <div className="flex flex-col w-1/4 ml-4">
                            <h3 className="text-lg font-bold text-gray-300">NFTs</h3>
                            <h2 className="text-2xl font-extrabold text-white">03</h2>
                        </div>

                        <div className="flex flex-col text-center w-2/4 px-3 border-r-2 border-l-2">
                            <h3 className="text-lg font-bold text-gray-300">Collections</h3>
                            <h2 className="text-2xl font-extrabold text-white">03</h2>
                        </div>

                        <div className="flex flex-col w-1/3 px-3 text-center">
                            <h3 className="text-lg font-bold text-gray-300">Holding</h3>
                            <h2 className="text-2xl font-extrabold text-white">03</h2>
                        </div>
                    </div>
                </div>
                <div className="back inset-0 backface-hidden text-light p-4 rounded-lg flex items-center justify-center">
                    {/* QR Code Placeholder */}
                    <QRCode value="https://www.example.com" />
                    <IconButton onClick={handleFlip} style={{ backgroundColor: '#110a29', width: 40, height: 40 , position: 'absolute', top: 1, right: 2}}>
                        <QrCode2 fontSize="small" color={'primary'} />
                    </IconButton>
                </div>
            </ReactCardFlip>
        </div>
    )

}