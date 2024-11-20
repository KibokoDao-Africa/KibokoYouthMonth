// Container with children

// components imports
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { useTheme } from "@/context/ThemeContext";

interface ContainerProps {
    children: React.ReactNode;
}

export default function Container({ children }: ContainerProps) {
    const { darkMode } = useTheme();
    
    return (
        <div className={`flex flex-row items-center h-screen ${darkMode ? "bg-gray-700" : "bg-gray-200"} `}
        style={{
            background: "#1E2327",
        }}
        >
            <div className="">
                <Sidebar />
            </div>

            <div className='w-full h-full rounded-xl overflow-y-scroll py-3 px-2'>   
                <div className="min-w-[100%] min-h-[100%] max-h-[calc(100vh-100px)] rounded-xl border border-[#2E343A] overflow-y-scroll scrollbar-hide"
                    style={{background: "#151A1D"}}
                >
                    <Topbar />
                    {children}
                </div>
            </div>
        </div>
    );
}