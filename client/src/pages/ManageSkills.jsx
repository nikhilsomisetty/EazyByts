import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';

const ManageSkills = () => {
    const [skills, setSkills] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchSkills();
    }, []);

    const fetchSkills = async () => {
        try {
            const { data } = await api.get('/skills');
            setSkills(data);
            setLoading(false);
        } catch (error) {
            console.error('Failed to fetch skills', error);
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this skill?')) {
            try {
                await api.delete(`/skills/${id}`);
                setSkills(skills.filter(s => s._id !== id));
            } catch (error) {
                console.error('Failed to delete skill', error);
                alert('Failed to delete skill');
            }
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Manage Skills</h1>
                <Link to="/skills/new" className="px-5 py-2.5 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition shadow-lg flex items-center">
                    <span className="mr-2">+</span> Add Skill
                </Link>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-slate-100 dark:border-slate-800 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 text-sm uppercase tracking-wider">
                                <th className="p-4 font-semibold">Skill Name</th>
                                <th className="p-4 font-semibold">Category</th>
                                <th className="p-4 font-semibold">Proficiency</th>
                                <th className="p-4 font-semibold text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {skills.map((skill) => (
                                <tr key={skill._id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                    <td className="p-4 flex items-center">
                                        <span className="text-2xl mr-3">{skill.icon}</span>
                                        <span className="font-bold text-slate-900 dark:text-white">{skill.name}</span>
                                    </td>
                                    <td className="p-4">
                                        <span className="px-2 py-0.5 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 text-xs rounded-full border border-indigo-100 dark:border-indigo-800">
                                            {skill.category}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center">
                                            <div className="w-24 bg-slate-200 dark:bg-slate-700 rounded-full h-2 mr-2">
                                                <div
                                                    className="bg-indigo-600 h-2 rounded-full"
                                                    style={{ width: `${skill.proficiency}%` }}
                                                ></div>
                                            </div>
                                            <span className="text-xs text-slate-500">{skill.proficiency}%</span>
                                        </div>
                                    </td>
                                    <td className="p-4 text-right space-x-2">
                                        <Link
                                            to={`/skills/edit/${skill._id}`}
                                            className="px-3 py-1.5 text-sm font-medium text-amber-600 bg-amber-50 rounded hover:bg-amber-100 dark:bg-amber-900/20 dark:text-amber-400 dark:hover:bg-amber-900/40 transition-colors"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(skill._id)}
                                            className="px-3 py-1.5 text-sm font-medium text-rose-600 bg-rose-50 rounded hover:bg-rose-100 dark:bg-rose-900/20 dark:text-rose-400 dark:hover:bg-rose-900/40 transition-colors"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {skills.length === 0 && (
                                <tr>
                                    <td colSpan="4" className="p-8 text-center text-slate-500 dark:text-slate-400">
                                        No skills found. Add your first skill!
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageSkills;
