import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Wrench, PenTool, Plus } from 'lucide-react';
import AuthContext from '../context/AuthContext';

const Dashboard = () => {
    const { user } = useContext(AuthContext);

    // Mock stats for week 1 display - in real app fetch counts from API
    const stats = [
        { label: 'Total Projects', value: '05', icon: <Briefcase size={24} />, color: 'bg-primary-50 text-primary-600 border-primary-100' },
        { label: 'Total Skills', value: '08', icon: <Wrench size={24} />, color: 'bg-emerald-50 text-emerald-600 border-emerald-100' },
        { label: 'Blog Posts', value: '02', icon: <PenTool size={24} />, color: 'bg-amber-50 text-amber-600 border-amber-100' },
    ];

    return (
        <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold mb-2 text-slate-900 dark:text-white">Dashboard Overview</h1>
            <p className="text-slate-500 dark:text-slate-400 mb-8">Welcome back, {user?.username}!</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-md border border-slate-100 dark:border-slate-800 flex items-center justify-between">
                        <div>
                            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">{stat.label}</p>
                            <h3 className="text-3xl font-bold text-slate-800 dark:text-white">{stat.value}</h3>
                        </div>
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center border ${stat.color.replace('bg-', 'dark:bg-opacity-10 ')}`}>
                            {stat.icon}
                        </div>
                    </div>
                ))}
            </div>

            <h2 className="text-xl font-bold mb-4 text-slate-800 dark:text-white">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Link to="/projects/new" className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:shadow-md transition-shadow flex items-center group">
                    <div className="w-10 h-10 rounded-lg bg-primary-50 dark:bg-primary-900/20 text-primary-600 flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                        <Plus size={24} />
                    </div>
                    <div>
                        <h4 className="font-semibold text-slate-800 dark:text-white">Add New Project</h4>
                        <p className="text-sm text-slate-500">Showcase your latest work</p>
                    </div>
                </Link>
                <Link to="/blogs/new" className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:shadow-md transition-shadow flex items-center group">
                    <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/20 text-emerald-600 flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                        <PenTool size={24} />
                    </div>
                    <div>
                        <h4 className="font-semibold text-slate-800 dark:text-white">Write Blog Post</h4>
                        <p className="text-sm text-slate-500">Share your thoughts</p>
                    </div>
                </Link>
                <Link to="/skills/new" className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:shadow-md transition-shadow flex items-center group">
                    <div className="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-900/20 text-amber-600 flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                        <Wrench size={24} />
                    </div>
                    <div>
                        <h4 className="font-semibold text-slate-800 dark:text-white">Add New Skill</h4>
                        <p className="text-sm text-slate-500">Update your expertise</p>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default Dashboard;
