import React, { useState, useEffect } from 'react';

const ThemeSwitcher = () => {
    const [theme, setTheme] = useState('emerald');

    useEffect(() => {
        const root = window.document.documentElement;
        const initialTheme = root.getAttribute('data-theme');
        setTheme(initialTheme);
    }, [theme]);

    const switchTheme = () => {
        const newTheme = theme === 'emerald' ? 'dracula' : 'emerald';
        setTheme(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
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
