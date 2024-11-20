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
        <div className={`flex flex-row items-center py-2 px-2 h-screen gap-10 ${darkMode ? "bg-gray-700" : "bg-gray-200"} `}
        style={{
            background: "radial-gradient(circle, #4d00af 0%,  #110a29 70%, #110a29 100%)",
        }}
        >
            <div className="py-2 px-2">
                <Sidebar />
            </div>

            <div className='w-full h-full rounded-xl overflow-y-scroll py-2 px-2'>    
                <Topbar />
                {children}
            </div>
        </div>
    );
}