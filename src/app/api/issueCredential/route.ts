import { ethers } from "ethers";
import abi from "../abi.js";

// Contract and provider setup
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS ?? "";
const provider = new ethers.JsonRpcProvider(process.env.LISK_SEPOLIA_NODE_URL ?? "");

// Helper function to connect a signer
async function getSignedContract() {
    if (!process.env.PRIVATE_KEY) {
        throw new Error("PRIVATE_KEY is not set in environment variables.");
    }
    // Request wallet connection
    // await (window as any).ethereum.request({ method: "eth_requestAccounts" });

    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
    return new ethers.Contract(CONTRACT_ADDRESS, abi, wallet); // Connect contract with signer
}

// POST handler
export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { address, tokenURI } = body;

        if (!address || !tokenURI) {
            return new Response(
                JSON.stringify({ success: false, message: "Missing required fields: address and tokenURI" }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

        // Use signed contract to send transactions
        const signedContract = await getSignedContract();
        const tx = await signedContract.issueCredential(address, tokenURI); // Signed transaction
        const receipt = await tx.wait(); // Wait for transaction confirmation
        console.log("Transaction receipt:", receipt);

        return new Response(
            JSON.stringify({
                success: true,
                transactionHash: tx.hash,
                receipt,
            }),
            { status: 200, headers: { "Content-Type": "application/json" } }
        );
    } catch (error: any) {
        console.error("Error issuing credential:", error);
        return new Response(
            JSON.stringify({
                success: false,
                message: error.message || "An error occurred while issuing the credential.",
            }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}
