"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppKitAccount } from "@reown/appkit/react";

interface NavLinkProps {
    href: string;
    children: React.ReactNode;
}

interface DropdownItemProps {
    onClick: () => void;
    children: React.ReactNode;
}

const NavLink = ({ href, children }: NavLinkProps) => (
    <Link
        href={href}
        className="text-white hover:text-[#00E1FF] text-xl transition-colors duration-300 relative group"
    >
        {children}
        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#00E1FF] transition-all duration-300 group-hover:w-full"></span>
    </Link>
);

const DropdownItem = ({ onClick, children }: DropdownItemProps) => (
    <li>
        <button
            onClick={onClick}
            className="block px-4 py-4 my-2 text-xl font-bold hover:bg-[#0095FF] hover:bg-opacity-20 rounded-md w-full text-left text-white transition-all duration-300"
        >
            {children}
        </button>
    </li>
);

export default function DcnNavBar() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const { isConnected } = useAppKitAccount();

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleDashboardClick = async (dashboard: string) => {
        setDropdownOpen(false);
        router.push(`/${dashboard}/dashboard`);
    };

    const navItems = [
        { href: "#about", label: "About" },
        { href: "/whitepaper", label: "Whitepaper" },
        { href: "#learn", label: "Learn" },
        { href: "#develop", label: "Develop" },
        { href: "#Join the Team", label: "Join Us" },
        { href: "#Verify", label: "Verify" }
    ];

    return (
        <nav
            className="flex justify-between items-center p-4 rounded-md mb-8 py-10 px-10 relative overflow-visible"
            style={{
                backgroundColor: '#0A0B1E',
                boxShadow: '0 8px 32px 0 rgba(0, 149, 255, 0.1)',
                zIndex: 1000000
            }}
        >
            {/* Animated background dots */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 dot-pattern"></div>
                <div className="absolute inset-0 dot-pattern dot-pattern-2"></div>
            </div>

            {/* Logo */}
            <h1 className="text-2xl font-extrabold text-white mr-4 relative z-10">
                <Link href="/" className="text-white hover:text-[#00E1FF] text-5xl transition-colors duration-300">
                    DCN
                </Link>
            </h1>

            {/* Navigation Links */}
            <ul
                className="flex space-x-6 border border-[#0095FF]/30 py-2 px-4 rounded-xl relative z-10"
                style={{
                    background: 'linear-gradient(135deg, rgba(9,28,36,0.7) 0%, rgba(40,54,76,0.7) 100%)',
                    backdropFilter: 'blur(10px)',
                }}
            >
                {navItems.map((item) => (
                    <li key={item.href}>
                        <NavLink href={item.href}>{item.label}</NavLink>
                    </li>
                ))}
            </ul>

            {/* Wallet Connection / Dashboard */}
            {!isConnected ? (
                // @ts-ignore - Custom web component
                <w3m-button label='Log in/ Connect wallet' />
            ) : (
                <div className="relative z-10" ref={dropdownRef}>
                    <button
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        className="flex items-center text-xl px-8 py-2 text-white hover:text-[#00E1FF] rounded-md focus:outline-none transition-all duration-300"
                        style={{
                            background: 'linear-gradient(135deg, rgba(9,28,36,0.7) 0%, rgba(40,54,76,0.7) 100%)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(0, 149, 255, 0.3)',
                        }}
                    >
                        Dashboards
                        <svg
                            className={`w-4 h-4 ml-2 transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : 'rotate-0'}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path
                                fillRule="evenodd"
                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>

                    {/* Dropdown Menu */}
                    {dropdownOpen && (
                        <div
                            className="absolute right-0 mt-2 min-w-[290px] rounded-md shadow-lg z-10"
                            style={{
                                background: 'linear-gradient(135deg, rgba(9,28,36,0.9) 0%, rgba(40,54,76,0.9) 100%)',
                                backdropFilter: 'blur(20px)',
                                border: '1px solid rgba(0, 149, 255, 0.3)',
                                boxShadow: '0 10px 25px rgba(0, 149, 255, 0.2)',
                                zIndex: 100000,
                            }}
                        >
                            <ul className="py-1 px-3 text-white">
                                <DropdownItem onClick={() => handleDashboardClick('student')}>
                                    Student Dashboard
                                </DropdownItem>
                                <DropdownItem onClick={() => handleDashboardClick('institution')}>
                                    Institution Dashboard
                                </DropdownItem>
                                <DropdownItem onClick={() => handleDashboardClick('issuer')}>
                                    Issuer Dashboard
                                </DropdownItem>
                            </ul>
                            <hr className="border-[#0095FF]/30 my-2" />
                            <div className="p-2">
                                {/* @ts-ignore - Custom web component */}
                                <w3m-button />
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* CSS for animations */}
            <style jsx>{`
                .dot-pattern {
                    background-image: radial-gradient(
                        circle,
                        rgba(0, 149, 255, 0.3) 1px,
                        transparent 1px
                    );
                    background-size: 20px 20px;
                    animation: moveDots 15s linear infinite;
                }

                .dot-pattern-2 {
                    background-image: radial-gradient(
                        circle,
                        rgba(0, 225, 255, 0.2) 1px,
                        transparent 1px
                    );
                    background-size: 25px 25px;
                    animation: moveDots 20s linear infinite;
                }

                @keyframes moveDots {
                    0% {
                        background-position: 0 0;
                    }
                    100% {
                        background-position: 100px 100px;
                    }
                }

                .dot-pattern::before,
                .dot-pattern-2::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    right: 0;
                    bottom: 0;
                    left: 0;
                    background: radial-gradient(
                        circle at 50% 50%,
                        rgba(0, 149, 255, 0.1),
                        transparent 50%
                    );
                    filter: blur(20px);
                    opacity: 0.7;
                    animation: pulse 4s ease-in-out infinite alternate;
                }

                @keyframes pulse {
                    0% {
                        opacity: 0.5;
                    }
                    100% {
                        opacity: 0.8;
                    }
                }
            `}</style>
        </nav>
    );
}