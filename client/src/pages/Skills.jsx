import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import api from '../utils/api';

const SkillCategory = ({ title, skills, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay }}
        className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg border border-slate-100 dark:border-slate-700"
    >
        <h3 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white border-b border-primary-100 dark:border-slate-700 pb-4">{title}</h3>
        <div className="space-y-6">
            {skills.map((skill) => (
                <div key={skill._id} className="mb-4">
                    <div className="flex justify-between mb-1">
                        <span className="text-base font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
                            <span>{skill.icon}</span> {skill.name}
                        </span>
                        <span className="text-primary-600 dark:text-primary-400 font-bold">{skill.proficiency}%</span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5">
                        <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.proficiency}%` }}
                            transition={{ duration: 1, ease: 'easeOut' }}
                            className="bg-primary-600 h-2.5 rounded-full"
                        ></motion.div>
                    </div>
                </div>
            ))}
        </div>
    </motion.div>
);

const Skills = () => {
    const [skills, setSkills] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSkills = async () => {
            try {
                // Fetch from public API - assuming /api/skills is public or allows partial access 
                // Currently API requires auth for modification but GET usually is public for portfolio
                // Let's check authRoutes ... Middleware usage suggests we might need to make GET public
                // For now assuming we can fetch, if not we'll update backend
                const { data } = await api.get('/skills');
                setSkills(data);
            } catch (error) {
                console.error("Failed to load skills", error);
            } finally {
                setLoading(false);
            }
        };
        fetchSkills();
    }, []);

    const frontendSkills = skills.filter(s => s.category === 'Frontend');
    const backendSkills = skills.filter(s => s.category === 'Backend');
    const toolsSkills = skills.filter(s => s.category === 'Tools');

    if (loading) return (
        <div className="flex justify-center items-center min-h-[60vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
        </div>
    );

    return (
        <div className="container mx-auto px-4 py-12">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-16"
            >
                <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary-600 to-violet-600 bg-clip-text text-transparent">Skills & Tools</h2>
                <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                    A comprehensive look at my technical expertise and proficiency level across various technologies.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {frontendSkills.length > 0 && <SkillCategory title="Frontend Development" skills={frontendSkills} delay={0.2} />}
                {backendSkills.length > 0 && <SkillCategory title="Backend Development" skills={backendSkills} delay={0.4} />}
                {toolsSkills.length > 0 && <SkillCategory title="Tools & Workflow" skills={toolsSkills} delay={0.6} />}

                {skills.length === 0 && (
                    <div className="col-span-3 text-center text-slate-500">
                        No skills added yet. Visit dashboard to add skills.
                    </div>
                )}
            </div>
        </div>
    );
};

export default Skills;
