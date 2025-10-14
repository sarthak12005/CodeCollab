import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

export const ThemeProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        // Check localStorage for saved theme preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            return savedTheme === 'dark';
        }
        // Default to dark mode (current theme)
        return true;
    });

    // Update localStorage when theme changes
    useEffect(() => {
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');

        // Update document class for global styles
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
            document.documentElement.classList.remove('light');
        } else {
            document.documentElement.classList.add('light');
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkMode]);

    const toggleTheme = () => {
        setIsDarkMode(prev => !prev);
    };

    // Theme colors object
    const theme = {
        // Background colors
        bg: {
            primary: isDarkMode ? 'bg-[#0f0f23]' : 'bg-gray-50',
            secondary: isDarkMode ? 'bg-[#1a1a2e]' : 'bg-white',
            tertiary: isDarkMode ? 'bg-[#16213e]' : 'bg-gray-100',
            card: isDarkMode ? 'bg-[#1a1a2e]' : 'bg-white',
            header: isDarkMode ? 'bg-[#0f0f23]' : 'bg-white',
            modal: isDarkMode ? 'bg-[#1a1a2e]' : 'bg-white',
            input: isDarkMode ? 'bg-[#16213e]' : 'bg-white',
            hover: isDarkMode ? 'hover:bg-[#16213e]' : 'hover:bg-gray-50',

        },

        // Text colors
        text: {
            primary: isDarkMode ? 'text-[#e0e0e8]' : 'text-gray-900',
            secondary: isDarkMode ? 'text-[#c4c4c4]' : 'text-gray-600',
            tertiary: isDarkMode ? 'text-[#a0a0a8]' : 'text-gray-500',
            accent: isDarkMode ? 'text-[#1cb8ff]' : 'text-blue-600',
            success: isDarkMode ? 'text-green-400' : 'text-green-600',
            error: isDarkMode ? 'text-red-400' : 'text-red-600',
            warning: isDarkMode ? 'text-yellow-400' : 'text-yellow-600',
            blackWhite: isDarkMode ?  'text-white' : 'text-black' 
        },

        // Border colors
        border: {
            primary: isDarkMode ? 'border-[#2a2a3e]' : 'border-gray-200',
            secondary: isDarkMode ? 'border-[#3a3a4e]' : 'border-gray-300',
            accent: isDarkMode ? 'border-[#1cb8ff]' : 'border-blue-500',
            focus: isDarkMode ? 'focus:border-[#1cb8ff]' : 'focus:border-blue-500'
        },

        // Button styles
        button: {
            primary: isDarkMode
                ? 'bg-gradient-to-r from-[#6e44ff] to-[#1cb8ff] text-white hover:shadow-[0_0_15px_rgba(110,68,255,0.5)]'
                : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700',
            secondary: isDarkMode
                ? 'bg-[#16213e] text-[#e0e0e8] border border-[#2a2a3e] hover:bg-[#1a2642]'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50',
            danger: isDarkMode
                ? 'bg-red-600 text-white hover:bg-red-700'
                : 'bg-red-600 text-white hover:bg-red-700',
            success: isDarkMode
                ? 'bg-green-600 text-white hover:bg-green-700'
                : 'bg-green-600 text-white hover:bg-green-700'
        },

        // Input styles
        input: {
            base: isDarkMode
                ? 'bg-[#16213e] border-[#2a2a3e] text-[#e0e0e8] placeholder-[#a0a0a8] focus:border-[#1cb8ff] focus:ring-[#1cb8ff]'
                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500'
        },

        // Card styles
        card: {
            base: isDarkMode
                ? 'bg-[#1a1a2e] border border-[#2a2a3e] shadow-lg'
                : 'bg-white border border-gray-200 shadow-lg',
            hover: isDarkMode
                ? 'hover:bg-[#1e1e32] hover:border-[#3a3a4e] hover:shadow-xl'
                : 'hover:bg-gray-50 hover:border-gray-300 hover:shadow-xl'
        },

        // Gradient styles
        gradient: {
            primary: isDarkMode
                ? 'bg-gradient-to-r from-[#6e44ff] to-[#1cb8ff]'
                : 'bg-gradient-to-r from-blue-600 to-indigo-600',
            secondary: isDarkMode
                ? 'bg-gradient-to-r from-[#1a1a2e] to-[#16213e]'
                : 'bg-gradient-to-r from-gray-100 to-gray-200'
        },

        // Shadow styles
        shadow: {
            sm: isDarkMode ? 'shadow-lg shadow-black/20' : 'shadow-sm',
            md: isDarkMode ? 'shadow-xl shadow-black/30' : 'shadow-md',
            lg: isDarkMode ? 'shadow-2xl shadow-black/40' : 'shadow-lg'
        }
    };

    const value = {
        isDarkMode,
        toggleTheme,
        theme
    };

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
};
