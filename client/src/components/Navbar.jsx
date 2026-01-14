import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Sun, Moon, User, LogOut, LayoutDashboard } from 'lucide-react';
import AuthContext from '../context/AuthContext';
import ThemeContext from '../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const { theme, toggleTheme } = useContext(ThemeContext);
    const [isOpen, setIsOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    return (
        <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 dark:bg-slate-900/80 dark:text-white transition-colors border-b border-slate-200 dark:border-slate-800">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-violet-600 bg-clip-text text-transparent hover:from-primary-500 hover:to-violet-500 transition-all">MyPortfolio</Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-6">
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition"
                    >
                        {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                    </button>
                    <Link to="/" className="text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition">Home</Link>
                    <Link to="/projects" className="text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition">Projects</Link>
                    <Link to="/skills" className="text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition">Skills</Link>
                    <Link to="/blog" className="text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition">Blog</Link>
                    <Link to="/contact" className="text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition">Contact</Link>

                    {/* Profile Dropdown */}
                    <div className="relative group">
                        <button
                            className="flex items-center focus:outline-none"
                            onMouseEnter={() => setIsProfileOpen(true)}
                            onMouseLeave={() => setIsProfileOpen(false)}
                        >
                            <div className="w-10 h-10 rounded-full bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400 transition-colors border border-primary-200 dark:border-primary-800 hover:bg-primary-100 dark:hover:bg-primary-900/50">
                                <User size={20} />
                            </div>
                        </button>

                        {/* Dropdown Menu */}
                        <div
                            className="absolute right-0 pt-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right z-50"
                            onMouseEnter={() => setIsProfileOpen(true)}
                            onMouseLeave={() => setIsProfileOpen(false)}
                        >
                            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-100 dark:border-slate-700 overflow-hidden">
                                {user ? (
                                    <>
                                        <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-700">
                                            <p className="text-sm text-slate-900 dark:text-white font-semibold truncate">{user.username}</p>
                                            <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{user.email || 'User'}</p>
                                        </div>
                                        <Link to="/profile" className="block px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-primary-50 dark:hover:bg-slate-700 hover:text-primary-600 dark:hover:text-primary-400 transition-colors flex items-center">
                                            <User size={16} className="mr-2" /> Profile
                                        </Link>
                                        <Link to="/dashboard" className="block px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-primary-50 dark:hover:bg-slate-700 hover:text-primary-600 dark:hover:text-primary-400 transition-colors flex items-center">
                                            <LayoutDashboard size={16} className="mr-2" /> Dashboard
                                        </Link>
                                        <button onClick={logout} className="block w-full text-left px-4 py-2 text-sm text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-slate-700 transition-colors flex items-center">
                                            <LogOut size={16} className="mr-2" /> Logout
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <Link to="/login" className="block px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-primary-50 dark:hover:bg-slate-700 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                                            Login
                                        </Link>
                                        <Link to="/register" className="block px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-primary-50 dark:hover:bg-slate-700 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                                            Register
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden flex items-center space-x-4">
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"
                    >
                        {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                    </button>
                    <button onClick={() => setIsOpen(!isOpen)} className="text-slate-600 dark:text-slate-300 focus:outline-none">
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 overflow-hidden"
                    >
                        <div className="flex flex-col p-4 space-y-4">
                            <Link to="/" className="text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium" onClick={() => setIsOpen(false)}>Home</Link>
                            <Link to="/projects" className="text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium" onClick={() => setIsOpen(false)}>Projects</Link>
                            <Link to="/skills" className="text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium" onClick={() => setIsOpen(false)}>Skills</Link>
                            <Link to="/blog" className="text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium" onClick={() => setIsOpen(false)}>Blog</Link>
                            <Link to="/contact" className="text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium" onClick={() => setIsOpen(false)}>Contact</Link>
                            {user ? (
                                <>
                                    <div className="h-px bg-slate-100 dark:bg-slate-800 my-2"></div>
                                    <Link to="/dashboard" className="text-primary-600 font-medium flex items-center" onClick={() => setIsOpen(false)}><LayoutDashboard size={16} className="mr-2" />Dashboard</Link>
                                    <Link to="/profile" className="text-slate-600 dark:text-slate-300 font-medium flex items-center" onClick={() => setIsOpen(false)}><User size={16} className="mr-2" />Profile</Link>
                                    <button onClick={() => { logout(); setIsOpen(false); }} className="text-rose-600 font-medium text-left flex items-center"><LogOut size={16} className="mr-2" />Logout</button>
                                </>
                            ) : (
                                <div className="grid grid-cols-2 gap-4 mt-4">
                                    <Link to="/login" className="text-center py-2 border border-primary-600 text-primary-600 rounded-lg hover:bg-primary-50" onClick={() => setIsOpen(false)}>Login</Link>
                                    <Link to="/register" className="text-center py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700" onClick={() => setIsOpen(false)}>Register</Link>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
