"use client";


import {
    Dashboard,
    People,
    Assignment,
    Wallet,
    Create,
    Settings,
    Notifications,
    ExitToApp,
} from "@mui/icons-material";
import { useTheme } from "@/context/ThemeContext";
import { usePathname } from 'next/navigation';

const NavLinks = [
    { name: "Dashboard", href: "/institution/dashboard", icon: <Dashboard /> },
    { name: "Wallet Account", href: "/institution/dashboard/wallet", icon: <Wallet /> },
    { name: "Create Certificate", href: "/institution/dashboard/create-certificate", icon: <Create /> },
    { name: "NFT Collection", href: "/institution/dashboard/nft-collection", icon: <Create /> },
    { name: "Admins", href: "/institution/dashboard/admins", icon: <People /> },
];

const walletLinks = [
];

const additionalLinks = [
    { name: "Settings", href: "/institution/dashboard/settings", icon: <Settings /> },
    { name: "Disconnect Wallet", href: "#", icon: <ExitToApp /> },
];


export default function Sidebar() {
    const { darkMode } = useTheme();
    const pathname = usePathname();

    return (
        <div className={`flex flex-col min-w-[320px] pl-4 min-h-[100vh] relative`}
            style={{ background: "#1E2327" }}
        >

            <div className="flex items-center p-2 py-4 rounded-lg space-x-4 text-white max-w-xs">
                {/* App Icon */}
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 animate-gradient">
                    {/* Insert your logo/icon here */}
                    {/* <img src="/path-to-your-logo.png" alt="App Icon" className="w-8 h-8" /> */}
                </div>


                {/* App Details */}
                <div>
                    <div className="flex items-center space-x-2">
                        <h1 className="text-lg font-semibold line-clamp-1 truncate max-w-[150px]">Mount Kenya University</h1>
                        <span className="text-xs font-bold text-blue-500 bg-blue-100 rounded-md px-2 py-0.5">BETA</span>
                    </div>
                    <p className="text-sm text-gray-400">Decentralized Credentials</p>
                </div>

                {/* Dropdown Icon */}
                {/* <ChevronDown className="text-gray-400" /> */}
            </div>

            <div className="flex items-center border rounded-lg p-2" style={{ background: "#151A1D", borderColor: "#2E343A" }}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" />
                </svg>
                <input type="text" placeholder="Search" className="outline-none flex-1 bg-transparent text-gray-700 placeholder-gray-400" />
            </div>

            {/* Overview Section */}
            <div className="flex flex-col gap-4 mt-4">
                {NavLinks.map((link, index) => (
                    <a
                        key={index}
                        href={link.href}
                        className={`flex items-center gap-4 py-2 px-4 rounded-xl text-md text-gray-400
                      ${pathname === link.href ? "border-4 border-[#151A1D] bg-gradient-to-r from-blue-500 to-transparent text-gray-100 shadow-md" : "hover:text-blue-400"}
                    `}
                        style={pathname === link.href ? { backgroundSize: '30% 100%', backgroundRepeat: 'no-repeat' } : {}}
                    >
                        <div className={`w-[30px] h-[30px] flex justify-center items-center rounded-lg
                      ${pathname === link.href ? "bg-transparent text-gray-100" : "bg-[#0d499b]"}
                    `}
                        >
                            {link.icon}
                        </div>
                        {link.name}
                    </a>

                ))}
            </div>




            {/* Connected Wallet Icon at the Bottom */}
            <div className="mt-auto flex flex-col justify-center w-full">
                <div className="w-full h-[1px]" style={{ background: "#2E343A" }}></div>

                {/* Additional Section */}
                <div className="flex flex-col gap-4 mt-4">
                    {additionalLinks.map((link, index) => (
                        <a
                            key={index}
                            href={link.href}
                            className={`flex items-center gap-4 py-1 hover:text-blue-300 text-md text-gray-400`}
                        >
                            <div className="w-[30px] h-[30px] flex justify-center items-center rounded-lg bg-[#0d499b]">{link.icon}</div>
                            {link.name}
                        </a>
                    ))}
                </div>
                <div className="w-[300px] my-3 h-[200px] rounded-2xl shadow-md flex flex-col justify-center px-6"
                    style={{
                        backgroundImage: "url('https://demos.creative-tim.com/vision-ui-dashboard-react/static/media/sidenav-card-background.00019e46.png')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                    }}
                >
                    <p className="text-white font-extrabold">Need help?</p>
                    <p className="text-gray-300">Please check our docs</p>
                    <a className="rounded-lg font-bold my-2 px-6 py-1"
                        style={{
                            background: "#4d00af",
                        }}
                        href={"/student/dashboard/documentation"}
                    >Documentation</a>
                    <h2 className="text-white font-bold">Choose your Network</h2>
                    <w3m-network-button />
                </div>
            </div>
        </div>
    );
}
