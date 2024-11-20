"use client";
import { useState } from 'react';

interface FAQItemProps {
    question: string;
    answer: string | string[];
}

const FAQItem = ({ question, answer }: FAQItemProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const renderAnswer = () => {
        if (typeof answer === 'string') {
            return <p className="text-sm text-blue-200 mt-2">{answer}</p>;
        }
        
        return (
            <ul className="list-disc pl-5 mt-2">
                {answer.map((item, idx) => (
                    <li key={idx} className="text-sm text-blue-200 mb-1">{item}</li>
                ))}
            </ul>
        );
    };

    return (
        <div
            onClick={() => setIsOpen(!isOpen)}
            className="p-4 text-white rounded-lg my-2 cursor-pointer transition-transform transform hover:scale-105 border-2 border-blue-900"
            style={{ maxWidth: "500px", minWidth: "500px", minHeight: "60px" }}
        >
            <div className="flex items-center justify-between space-x-2">
                <h3 className="text-lg">{question}</h3>
                <div className="text-2xl font-bold">{isOpen ? "▲" : "▼"}</div>
            </div>
            {isOpen && renderAnswer()}
        </div>
    );
};

const FAQ = () => {
    const faqs = [
        {
            question: "What is DCN ? (Decentralized Credential Network)",
            answer: "It's like a digital filing cabinet for important Credential documents (like diplomas or certificates) that nobody can mess with or fake. Instead of one organization keeping all the records, they're stored across many computers."
        },
        {
            question: "How does a Decentralized Credential Network work?",
            answer: [
                "Schools or organizations create digital certificates",
                "These certificates are stored in a special way that's like putting them in an unbreakable glass case",
                "Anyone can look at them to check if they're real",
                "Nobody can change or fake them once they're created"
            ]
        },
        {
            question: "What are the benefits of a Decentralized Credential Network?",
            answer: [
                "You can't lose your certificates",
                "Nobody can make fake copies",
                "Anyone can check if a certificate is real",
                "You don't need to go through lots of offices to verify your documents"
            ]
        },
        {
            question: "WTF is an NFT?",
            answer: "Think of an NFT like a one-of-a-kind digital sticker that can't be copied. In this case, your certificate is like a special sticker that proves your achievement is real and belongs to you."
        }
    ];

    return (
        <div className="max-w-full mx-auto p-6 flex flex-col items-center justify-center">
            <h2 className="text-4xl font-bold text-white mb-4 text-center">Frequently Asked Questions</h2>
            <p className="text-center text-blue-200 mb-6">The Web 3.0 leverages AI, Machine Learning, and blockchain technology. It is expected to achieve real-world communication.</p>
            {faqs.map((faq, index) => (
                <div key={index} className="flex items-center justify-start space-x-10 p-4 text-white rounded-lg my-2 cursor-pointer transition-transform transform hover:scale-105">
                    <div 
                        className="bg-blue-600 rounded-full flex items-center justify-center"
                        style={{ width: "40px", height: "40px" }}
                    >
                        <span>{index + 1}</span>
                    </div>
                    <div 
                        className="bg-blue-600 faq_line" 
                        style={{ width: "300px", height: '1px'}}
                    />
                    <FAQItem 
                        question={faq.question} 
                        answer={faq.answer} 
                    />
                </div>
            ))}
        </div>
    );
};

export default FAQ;