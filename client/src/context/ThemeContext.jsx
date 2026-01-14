import { createContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
    const [primaryColor, setPrimaryColor] = useState(localStorage.getItem('primaryColor') || '#4f46e5');

    useEffect(() => {
        const root = window.document.documentElement;
        if (theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    useEffect(() => {
        const root = window.document.documentElement;
        // Map hex colors to Tailwind-friendly HSL or use CSS variable override
        // For simplicity with Tailwind v4, we can set the CSS variable directly if configured in CSS
        root.style.setProperty('--color-primary', primaryColor);
        localStorage.setItem('primaryColor', primaryColor);
    }, [primaryColor]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, primaryColor, setPrimaryColor }}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeContext;
