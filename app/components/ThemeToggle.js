import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(false);

    useEffect(() => {
        const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;
        if (currentTheme === 'dark') {
            setDarkMode(true);
            document.documentElement.setAttribute('data-theme', 'dark');
        }
    }, []);

    const toggleTheme = () => {
        setIsTransitioning(true);
        const newMode = !darkMode;
        setDarkMode(newMode);
        const theme = newMode ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);

        // Reset transition state after animation completes
        setTimeout(() => {
            setIsTransitioning(false);
        }, 500);
    };

    return (
        <div className="pt-4">
            <button
                onClick={toggleTheme}
                className={`relative w-14 h-7 rounded-full transition-all duration-500 ease-in-out focus:outline-none border border-gray-200
                    ${darkMode
                        ? 'bg-gray-700 hover:bg-gray-600'
                        : 'bg-yellow-100 hover:bg-yellow-200'
                    }
                    ${isTransitioning
                        ? 'bg-gradient-to-r from-yellow-100 via-gray-400 to-gray-700'
                        : ''
                    }`}
                aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
                <div
                    className={`absolute top-1 left-1 transform transition-all duration-500 ease-in-out ${darkMode ? 'translate-x-7' : 'translate-x-0'
                        }`}
                >
                    <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center shadow-sm transition-all duration-500 ease-in-out
                            ${darkMode
                                ? 'bg-gradient-to-br from-gray-500 to-gray-700'
                                : 'bg-gradient-to-br from-yellow-200 to-yellow-400'
                            }
                        `}
                    >
                        <div className="transition-opacity duration-500 ease-in-out">
                            {darkMode ? (
                                <Moon size={12} className="text-gray-200" />
                            ) : (
                                <Sun size={12} className="text-yellow-600" />
                            )}
                        </div>
                    </div>
                </div>
            </button>
        </div>
    );
};

export default ThemeToggle;