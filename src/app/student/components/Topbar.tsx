"use client";
import { Brightness4, Brightness7, Notifications, Search, Home } from "@mui/icons-material";
import { useTheme } from "@/context/ThemeContext";
import { useState } from "react";


export default function Topbar() {
    const { darkMode, toggleTheme } = useTheme();
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    // Get the last part of the path for the title
    const path = window.location.pathname.split("/").pop();
    const title = path ? path.charAt(0).toUpperCase() + path.slice(1) : '';

    return (
        <div className={`flex flex-row items-center justify-between w-full h-16 px-4 rounded-md sticky top-0 z-10`}>

            {/* Left Section: Dashboard Title */}
            <div className="flex items-center space-x-4">
                <Home className="text-2xl text-white" />
                <h1 className="text-lg font-bold text-white">
                    / {title}
                </h1>
            </div>


            {/* Right Section: Icons and Buttons */}
            <div className="flex items-center space-x-4">
                <div className={`relative rounded-xl flex items-center px-3 py-1 w-1/4 min-w-[200px] hover:min-w-[400px] h-10 transition-all duration-300 ease-in-out`}
                    style={{ background: "#110a29" }}
                >
                    <Search className="mr-2 text-gray-500" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        placeholder="Search..."
                        className="w-full bg-transparent outline-none text-sm"
                    />
                </div>

                {/* Notification Icon */}
                <button className="relative">
                    <Notifications className="text-2xl text-white" />
                    <span className="absolute top-0 right-0 h-2 w-2 bg-red-600 rounded-full"></span>
                </button>

                {/* Account Balance Button */}
                <w3m-button label="Login" />

                {/* Theme Toggle Button */}
                <button onClick={toggleTheme} className="text-2xl text-white">
                    {darkMode ? <Brightness7 /> : <Brightness4 />}
                </button>
            </div>
        </div>
    );
}
