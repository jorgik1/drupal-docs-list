'use client';
import React from 'react';
import { useTheme } from 'next-themes';

const ThemeSwitcher = () => {
    const { theme, setTheme } = useTheme();

    const switchTheme = () => {
        setTheme(theme === 'emerald' ? 'dracula' : 'emerald');
    };

    return (
        <button
            className="bg-gray-300 dark:bg-gray-700 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-gray-900"
            onClick={switchTheme}
        >
            {theme === 'emerald' ? '🌙' : '☀️'}
        </button>
    );
};

export default ThemeSwitcher;