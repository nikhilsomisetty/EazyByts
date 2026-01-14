import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="flex flex-col md:flex-row items-center justify-between min-h-[calc(100vh-64px)] bg-gradient-to-br from-indigo-50 via-white to-violet-50 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950 px-8 md:px-20 transition-colors duration-200">
            <div className="md:w-1/2 text-left">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-5xl md:text-7xl font-bold text-slate-800 dark:text-white mb-6 leading-tight"
                >
                    Hi, I'm <span className="bg-gradient-to-r from-primary-600 to-violet-600 bg-clip-text text-transparent">Your Name</span>
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-10 max-w-lg"
                >
                    A Full Stack Developer passionate about building robust web applications and creative solutions.
                </motion.p>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="space-x-4"
                >
                    <Link to="/projects" className="px-8 py-3 bg-primary-600 text-white rounded-full font-semibold hover:bg-primary-700 hover:shadow-xl transition-all shadow-lg transform hover:-translate-y-1">
                        View Work
                    </Link>
                    <Link to="/contact" className="px-8 py-3 border-2 border-primary-600 text-primary-600 dark:border-primary-400 dark:text-primary-400 rounded-full font-semibold hover:bg-primary-50 dark:hover:bg-primary-900/30 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                        Contact Me
                    </Link>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="md:w-1/2 flex justify-center mt-10 md:mt-0"
            >
                <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=500&h=500"
                    alt="Profile"
                    className="w-64 h-64 md:w-96 md:h-96 object-cover rounded-full shadow-2xl border-4 border-white dark:border-slate-800 ring-4 ring-primary-100 dark:ring-primary-900/50"
                />
            </motion.div>
        </div>
    );
};

export default Home;
