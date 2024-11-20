import { ethers } from "ethers";
import abi from "./abi.js";

const contractAddress = process.env.CONTRACT_ADDRESS;
const provider = new ethers.JsonRpcProvider(process.env.LISK_SEPOLIA_NODE_URL);

const contract = new ethers.Contract(contractAddress, abi, provider);

export default async function handler(req, res) {
    const { tokenId } = req.query;

    if (!tokenId) {
        res.status(400).json({ message: "Missing tokenId" });
        return;
    }

    try {
        const uri = await contract.getCredential(tokenId);
        res.status(200).json(credential);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}   