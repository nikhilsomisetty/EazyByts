import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import api from '../utils/api';

const ManageProjects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const { data } = await api.get('/projects');
            setProjects(data);
            setLoading(false);
        } catch (error) {
            console.error('Failed to fetch projects', error);
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this project?')) {
            try {
                await api.delete(`/projects/${id}`);
                setProjects(projects.filter(p => p._id !== id));
            } catch (error) {
                console.error('Failed to delete project', error);
                alert('Failed to delete project');
            }
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Manage Projects</h1>
                <Link to="/projects/new" className="px-5 py-2.5 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition shadow-lg flex items-center">
                    <Plus size={20} className="mr-2" />
                    Add Project
                </Link>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-md overflow-hidden border border-slate-100 dark:border-slate-800">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-sm uppercase tracking-wider">
                            <th className="p-4">Title</th>
                            <th className="p-4">Technologies</th>
                            <th className="p-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {projects.map((project) => (
                            <tr key={project._id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition">
                                <td className="p-4 font-semibold text-slate-800 dark:text-white">
                                    <div className="flex items-center">
                                        <div className="h-10 w-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center mr-3 overflow-hidden">
                                            {project.imageUrl && <img src={project.imageUrl} alt="" className="h-full w-full object-cover" />}
                                        </div>
                                        {project.title}
                                    </div>
                                </td>
                                <td className="p-4">
                                    <div className="flex flex-wrap gap-1">
                                        {project.technologies.slice(0, 3).map((tech, i) => (
                                            <span key={i} className="px-2 py-0.5 bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-300 text-xs rounded-full border border-primary-100 dark:border-primary-800">
                                                {tech}
                                            </span>
                                        ))}
                                        {project.technologies.length > 3 && (
                                            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium pt-1">+{project.technologies.length - 3}</span>
                                        )}
                                    </div>
                                </td>
                                <td className="p-4 text-right space-x-2">
                                    <Link
                                        to={`/projects/edit/${project._id}`}
                                        className="px-3 py-1.5 text-sm font-medium text-amber-600 bg-amber-50 rounded hover:bg-amber-100 dark:bg-amber-900/20 dark:text-amber-400 dark:hover:bg-amber-900/40 transition-colors"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(project._id)}
                                        className="px-3 py-1.5 text-sm font-medium text-rose-600 bg-rose-50 rounded hover:bg-rose-100 dark:bg-rose-900/20 dark:text-rose-400 dark:hover:bg-rose-900/40 transition-colors"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {projects.length === 0 && (
                            <tr>
                                <td colSpan="3" className="p-8 text-center text-slate-500 dark:text-slate-400">
                                    No projects found. Create your first one!
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageProjects;
