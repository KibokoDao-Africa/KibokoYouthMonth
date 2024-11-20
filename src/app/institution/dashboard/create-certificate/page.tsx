"use client";

import { useState } from "react";
import Container from "../components/Container";
import SmartContractForm from "./component/SmartContractForm";
import DropContractCertificate from "./component/dropContractCertificate";

export default function CreateCertificate() {
    const [activeTab, setActiveTab] = useState("Create New Collection");

    return (
        <Container>
            {/* Top Bar for Toggle between Drop Cert and Create New Collection */}
            <div className="flex items-center justify-between w-full h-16 px-4 text-black shadow-md rounded-t-xl">
                <div className="flex space-x-8">
                    <button
                        onClick={() => setActiveTab("Create New Collection")}
                        className={`text-lg font-semibold ${
                            activeTab === "Create New Collection" ? "text-blue-500 border-b-2 border-blue-500" : "text-gray-400"
                        }`}
                    >
                        Create New Collection
                    </button>
                    <button
                        onClick={() => setActiveTab("Drop Cert")}
                        className={`text-lg font-semibold  ${
                            activeTab === "Drop Cert" ? "text-blue-900 border-b-2 border-blue-500" : "text-gray-400"
                        }`}
                    >
                        Drop / Issue Cert
                    </button>
                </div>
            </div>

            <div className="flex items-center justify-between w-full h-full px-4 text-black shadow-md rounded-b-xl">
                {/* Content based on selected tab */}
                {activeTab === "Drop Cert" ? (
                    <div className="w-full p-8">
                        <DropContractCertificate />
                    </div>
                ) : (
                    <div className="w-full p-8">
                        {/* Content for Create New Collection */}
                        <SmartContractForm />
                    </div>
                )}
            </div>
        </Container>
    );
}
