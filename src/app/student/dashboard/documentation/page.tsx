"use client";
import { useState } from "react";
import Container from "../../components/Container";
const docSections = [
    { title: "Introduction", description: "Learn about the basics of Decentralized Certificate Network (DCN), what it is, and why it matters." },
    { title: "How it Works", description: "Understand the mechanisms that make DCN secure, transparent, and decentralized." },
    { title: "Use Cases", description: "Explore various applications and use cases of DCN across industries." },
    { title: "Getting Started", description: "Begin your journey with DCN, from creating an account to issuing your first certificate." },
    { title: "Security & Privacy", description: "Learn about the security measures in place and how privacy is handled on the DCN." },
    { title: "Frequently Asked Questions", description: "Find answers to common questions about DCN, certificates, and verification." },
];

export default function Learn() {
    const [activeSection, setActiveSection] = useState(docSections[0]);

    return (
        <Container>
            <div className="bg-[#12132D] text-white p-6 rounded-xl w-full flex flex-col lg:flex-row gap-6">
                {/* Sidebar for Navigation */}
                <aside className="lg:w-1/4 w-full bg-[#1B1D3A] p-4 rounded-lg">
                    <h2 className="text-xl font-bold mb-4 text-gray-200">Learn DCN</h2>
                    <ul className="space-y-3">
                        {docSections.map((section, index) => (
                            <li key={index}>
                                <button
                                    onClick={() => setActiveSection(section)}
                                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                                        activeSection.title === section.title
                                            ? "bg-[#33355A] text-white font-semibold"
                                            : "bg-[#232548] text-gray-400 hover:bg-[#33355A] hover:text-white"
                                    }`}
                                >
                                    {section.title}
                                </button>
                            </li>
                        ))}
                    </ul>
                </aside>

                {/* Content Area */}
                <main className="lg:w-3/4 w-full p-4 bg-[#1B1D3A] rounded-lg">
                    <h3 className="text-2xl font-bold mb-2">{activeSection.title}</h3>
                    <p className="text-gray-300 leading-relaxed">{activeSection.description}</p>

                    {/* Additional Details and Call-to-Action */}
                    <div className="mt-6 bg-[#0A0B1E] p-4 rounded-lg shadow-lg">
                        <h4 className="text-lg font-semibold mb-2">Dive Deeper</h4>
                        <p className="text-gray-400">Explore our detailed documentation for {activeSection.title} on the DCN Docs website.</p>
                        <a
                            href="#"
                            className="inline-block mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Read Full Documentation
                        </a>
                    </div>
                </main>
            </div>
        </Container>
    );
}
