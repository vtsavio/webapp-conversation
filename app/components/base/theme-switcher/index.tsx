import React from 'react';
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import { themeConfig } from '@/config/theme';

const ThemeSwitcher = () => {
    const [theme, setTheme] = React.useState<'light' | 'dark'>('light');

    React.useEffect(() => {
        const savedTheme = localStorage.getItem('theme') || 'light';
        setTheme(savedTheme as 'light' | 'dark');
        if (savedTheme === 'dark') {
            document.documentElement.classList.add('dark');
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            document.documentElement.setAttribute('data-theme', 'light');
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);

        if (newTheme === 'dark') {
            document.documentElement.classList.add('dark');
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            document.documentElement.setAttribute('data-theme', 'light');
        }

        // Dispara um evento customizado para notificar outros componentes da mudança de tema
        window.dispatchEvent(new CustomEvent('themeChange', { detail: newTheme }));
    };

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-lg transition-colors duration-200 flex items-center justify-center bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200"
            aria-label="Alternar tema"
        >
            {theme === 'light' ? (
                <MoonIcon className="w-5 h-5" />
            ) : (
                <SunIcon className="w-5 h-5" />
            )}
        </button>
    );
};

export default ThemeSwitcher;