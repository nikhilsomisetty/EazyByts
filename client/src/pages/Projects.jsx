import { useState, useEffect } from 'react';
import api from '../utils/api';
import { motion } from 'framer-motion';

const Projects = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const { data } = await api.get('/projects');
                setProjects(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchProjects();
    }, []);

    return (
        <div className="container mx-auto px-4 py-12">
            <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-primary-600 to-violet-600 bg-clip-text text-transparent">My Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project, index) => (
                    <motion.div
                        key={project._id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="bg-white dark:bg-slate-900 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow border border-slate-100 dark:border-slate-800"
                    >
                        <img src={project.imageUrl || 'https://via.placeholder.com/400x250'} alt={project.title} className="w-full h-48 object-cover" />
                        <div className="p-6">
                            <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">{project.title}</h3>
                            <p className="text-slate-600 dark:text-slate-400 mb-4 line-clamp-3">{project.description}</p>
                            <div className="flex flex-wrap gap-2 mb-4">
                                {project.technologies.map((tech) => (
                                    <span key={tech} className="px-3 py-1 bg-primary-50 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300 text-xs rounded-full font-medium border border-primary-100 dark:border-primary-800">{tech}</span>
                                ))}
                            </div>
                            <div className="flex justify-between items-center mt-4">
                                {project.projectUrl && <a href={project.projectUrl} target="_blank" rel="noopener noreferrer" className="text-primary-600 dark:text-primary-400 font-semibold hover:text-primary-700 dark:hover:text-primary-300 hover:underline">Live Demo</a>}
                                {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white">GitHub</a>}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Projects;
