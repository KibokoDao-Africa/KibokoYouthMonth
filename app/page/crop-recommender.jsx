"use client";

import { useState, useEffect} from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertCircle, Loader2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import axios from "axios";
import { ABI } from "./abi";
import Web3 from "web3";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

export default function CropRecommender() {
  const [account, setAccount] = useState(null);
  const [formData, setFormData] = useState({
    n: "",
    p: "",
    k: "",
    temperature: "",
    humidity: "",
    ph: "",
    rainfall: "",
  });
  const [recommendation, setRecommendation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [position, setPosition] = useState(null);  


  useEffect(() => {
    const getUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setPosition({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          (error) => {
            console.error('Error getting user location:', error);
          }
        );
      } else {
        console.error('Geolocation is not supported by this browser.');
      }
    };

    getUserLocation();  

  }, []);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  async function connectWallet() {
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      const account = accounts[0];

      setAccount(account);

      // Create a contract instance
      // const contract = new web3.eth.Contract(contractABI, contractAddress);

      // Call a contract function (e.g., reading data)
      // const result = await contract.methods.yourFunction().call();

      // Call a contract function (e.g., sending a transaction)
      // const tx = await contract.methods.yourFunction(params).send({ from: account });
    } catch (error) {
      console.error(error);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setRecommendation("");

    try {
      connectWallet();
    let accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    let _account = accounts[0]
      const web3 = new Web3(window.ethereum); // Replace with your provider

      // Get contract instance using contract address and ABI
      const contract = new web3.eth.Contract(
        ABI,
        "0xBF0fCf1AEd56Dcf6f48C155DEB73C67C29b33Cf4",
        {
            from: _account,
            gasPrice: '20000000'
        }
      );
      contract.setProvider("wss://ws.sepolia-api.lisk.com")
      console.log("calling ", contract);
      const info = {
        n: formData.n,
        p: formData.p,
        k: formData.k,
        temperature: formData.temperature,
        // Omit temperature (not defined in the smart contract)
        humidity: formData.humidity,
        ph: formData.ph,
        rainfall: formData.rainfall,
      };
      console.log(info);
      contract.methods
        .submitData(
          Number(info.n),
          Number(info.p),
          Number(info.k),
          Number(info.temperature),
          Number(info.humidity),
          Number(info.ph),
          Number(info.rainfall),
        )
        .send({ from: account, gasPrice: '2000000000', gas: "200000000" })
        .on('transactionHash', function(hash){
            console.log(hash)
        })
        .on('error', function(error, receipt) { // If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.
            console.log("Error: ", error, receipt)
        });

    const tx = await contract.methods['submitData']

      console.log("Transaction hash:", tx.transactionHash);

      // Handle success or error based on transaction status
      if (!tx.status) {
        throw new Error("Failed to submit data to smart contract");
      }

      const response = await axios.post(
        "https://djangofarmers-production.up.railway.app/api/recommend/",
        {
          // Data to be sent in the request body
          n: formData.n,
          p: formData.p,
          k: formData.k,
          temperature: formData.temperature,
          humidity: formData.humidity,
          ph: formData.ph,
          rainfall: formData.rainfall,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setRecommendation(response.data.message);

      if (!response.ok) {
        throw new Error("Failed to get recommendation");
      }

      const data = await response.json();
      setRecommendation(data.prediction);
    } catch (err) {
      setError("Failed to get recommendation. Please try again." + err);
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Crop Recommender</CardTitle>
        <CardDescription>
          Enter soil and environmental data to get a crop recommendation.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="N">Nitrogen (N)</Label>
              <Input
                id="n"
                name="n"
                type="number"
                placeholder="0-140"
                value={formData.n}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="P">Phosphorus (P)</Label>
              <Input
                id="p"
                name="p"
                type="number"
                placeholder="5-145"
                value={formData.p}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="K">Potassium (K)</Label>
              <Input
                id="k"
                name="k"
                type="number"
                placeholder="5-205"
                value={formData.k}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="humidity">Humidity (%)</Label>
              <Input
                id="humidity"
                name="humidity"
                type="number"
                placeholder="14-100"
                value={formData.humidity}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="temperature">Temperature (°C)</Label>
              <Input
                id="temperature"
                name="temperature"
                type="number"
                placeholder="0-50"
                value={formData.temperature}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ph">pH</Label>
              <Input
                id="ph"
                name="ph"
                type="number"
                step="0.01"
                placeholder="3.5-10"
                value={formData.ph}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rainfall">Rainfall (mm)</Label>
              <Input
                id="rainfall"
                name="rainfall"
                type="number"
                placeholder="20-300"
                value={formData.rainfall}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Getting Recommendation...
              </>
            ) : (
              "Get Recommendation"
            )}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col items-start">
        {/* {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )} */}
        {recommendation && (
          <Alert>
            <AlertTitle>Recommended Crop</AlertTitle>
            <AlertDescription>
              {recommendation.replace("b'", "").replace("'", "")}
              
            </AlertDescription>
          </Alert>


        )}

      </CardFooter>
    </Card>
  );
}
