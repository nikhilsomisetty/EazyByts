import { Link, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { LayoutDashboard, Briefcase, Wrench, Palette, LogOut } from 'lucide-react';
import AuthContext from '../context/AuthContext';

const Sidebar = () => {
    const { logout } = useContext(AuthContext);
    const location = useLocation();

    const menuItems = [
        { path: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
        { path: '/manage-projects', label: 'Projects', icon: <Briefcase size={20} /> },
        { path: '/manage-skills', label: 'Skills', icon: <Wrench size={20} /> },
        { path: '/theme-settings', label: 'Theme', icon: <Palette size={20} /> },
    ];

    return (
        <div className="w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col h-screen fixed left-0 top-0 transition-colors">
            <div className="p-6 border-b border-slate-200 dark:border-slate-700 flex items-center justify-center">
                <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-violet-600 bg-clip-text text-transparent">
                    MyCMS
                </Link>
            </div>

            <div className="flex-1 overflow-y-auto py-4">
                <ul className="space-y-2 px-4">
                    {menuItems.map((item) => (
                        <li key={item.path}>
                            <Link
                                to={item.path}
                                className={`flex items-center px-6 py-3 text-slate-700 dark:text-slate-300 hover:bg-primary-50 dark:hover:bg-slate-800 hover:text-primary-600 dark:hover:text-primary-400 transition-colors ${location.pathname === item.path ? 'bg-primary-50 dark:bg-slate-800 text-primary-600 dark:text-primary-400 font-semibold border-r-4 border-primary-600' : ''}`}
                            >
                                <span className="mr-3 text-xl">{item.icon}</span>
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="p-4 border-t border-slate-200 dark:border-slate-700">
                <button
                    onClick={logout}
                    className="flex items-center w-full px-6 py-3 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-slate-800 rounded-lg transition-colors"
                >
                    <LogOut size={20} className="mr-3" />
                    Logout
                </button>
            </div>
        </div>
    );
};



export default Sidebar;
