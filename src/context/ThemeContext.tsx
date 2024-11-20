"use client";

import { createContext, useContext, useState, ReactNode } from "react";

// Define the shape of the theme context
interface ThemeContextProps {
    darkMode: boolean;
    toggleTheme: () => void;
}

// Create the context with default values
const ThemeContext = createContext<ThemeContextProps>({
    darkMode: false,
    toggleTheme: () => {},
});

// Provider component to wrap the app and manage theme state
export function ThemeProvider({ children }: { children: ReactNode }) {
    const [darkMode, setDarkMode] = useState(false);

    const toggleTheme = () => {
        setDarkMode(!darkMode);
    };

    return (
        <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

// Custom hook to use the ThemeContext
export function useTheme() {
    return useContext(ThemeContext);
}
