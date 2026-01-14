import { useContext } from 'react';
import ThemeContext from '../context/ThemeContext';

const ThemeSettings = () => {
    const { theme, toggleTheme, setPrimaryColor, primaryColor } = useContext(ThemeContext);

    const colors = ['#4f46e5', '#2563eb', '#0891b2', '#059669', '#dc2626', '#db2777'];

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-8 text-slate-900 dark:text-white">Theme Settings</h1>

            <div className="bg-white dark:bg-slate-900 p-8 rounded-xl shadow-lg border border-slate-100 dark:border-slate-800">
                <div className="mb-8">
                    <h2 className="text-xl font-bold mb-4 text-slate-800 dark:text-slate-100">Appearance</h2>
                    <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                        <span className="text-slate-700 dark:text-slate-300 font-medium">Dark Mode</span>
                        <button
                            onClick={toggleTheme}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${theme === 'dark' ? 'bg-primary-600' : 'bg-slate-200'}`}
                        >
                            <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${theme === 'dark' ? 'translate-x-6' : 'translate-x-1'}`}
                            />
                        </button>
                    </div>
                </div>

                <div className="mb-0">
                    <h2 className="text-xl font-bold mb-4 text-slate-800 dark:text-slate-100">Primary Color</h2>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">Select your preferred primary color for the dashboard and portfolio.</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {colors.map((color) => (
                            <button
                                key={color}
                                className={`w-full h-12 rounded-lg shadow-sm border hover:scale-105 transition-transform ${primaryColor === color ? 'ring-2 ring-offset-2 ring-slate-400 dark:ring-slate-500' : 'border-slate-200 dark:border-slate-700'}`}
                                style={{ backgroundColor: color }}
                                title={color}
                                onClick={() => setPrimaryColor(color)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ThemeSettings;
