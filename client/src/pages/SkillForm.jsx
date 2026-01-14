import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, useWatch } from 'react-hook-form';
import api from '../utils/api';

const SkillForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { register, handleSubmit, setValue, control, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false);

    // Watch the name field to auto-assign category/icon
    const skillName = useWatch({ control, name: 'name' });

    useEffect(() => {
        if (!skillName) return;

        const lowerName = skillName.toLowerCase();
        let autoIcon = '🔧'; // Default default

        // Auto-Icon Mapping
        if (lowerName.includes('react')) autoIcon = '⚛️';
        else if (lowerName.includes('node')) autoIcon = '🟢';
        else if (lowerName.includes('js') || lowerName.includes('javascript')) autoIcon = '💛';
        else if (lowerName.includes('html')) autoIcon = '🌐';
        else if (lowerName.includes('css') || lowerName.includes('tailwind') || lowerName.includes('sass')) autoIcon = '🎨';
        else if (lowerName.includes('python') || lowerName.includes('django')) autoIcon = '🐍';
        else if (lowerName.includes('mongo') || lowerName.includes('sql') || lowerName.includes('data')) autoIcon = '🗄️';
        else if (lowerName.includes('git')) autoIcon = '📚';
        else if (lowerName.includes('design') || lowerName.includes('figma')) autoIcon = '🖌️';
        else if (lowerName.includes('aws') || lowerName.includes('cloud')) autoIcon = '☁️';
        else if (lowerName.includes('docker') || lowerName.includes('kubernetes')) autoIcon = '🐳';

        // Only auto-set if the field is empty or matches the default to avoid overwriting user custom input
        // But the user requested "automatically rather than asking", so we might just set it.
        // Let's set it if it matches a known one, but allow override.
        // To be safe, let's only set it if the user hasn't manually typed something else yet, 
        // OR if they are just typing the name out. 
        // Simplest UX: Update it, user can change it back if they really want.
        setValue('icon', autoIcon);

    }, [skillName, setValue]);

    useEffect(() => {
        if (id) {
            const fetchSkill = async () => {
                try {
                    const { data } = await api.get('/skills'); // Ideally get by ID, but list is small
                    const skill = data.find(s => s._id === id);
                    if (skill) {
                        setValue('name', skill.name);
                        setValue('proficiency', skill.proficiency);
                        setValue('category', skill.category);
                        setValue('icon', skill.icon);
                        setValue('description', skill.description);
                    }
                } catch (error) {
                    console.error('Failed to fetch skill', error);
                }
            };
            fetchSkill();
        }
    }, [id, setValue]);

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            if (id) {
                await api.put(`/skills/${id}`, data);
            } else {
                await api.post('/skills', data);
            }
            navigate('/manage-skills');
        } catch (error) {
            console.error('Failed to save skill', error);
            const message = error.response?.data?.message || error.message || 'Failed to save skill';
            alert(`Error: ${message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-8 text-slate-900 dark:text-white">
                {id ? 'Edit Skill' : 'Add New Skill'}
            </h1>

            <form onSubmit={handleSubmit(onSubmit)} className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg border border-slate-100 dark:border-slate-800">

                <div className="mb-6">
                    <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-2">Skill Name</label>
                    <input
                        {...register('name', { required: 'Skill Name is required' })}
                        className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition"
                        placeholder="e.g. React.js"
                    />
                    {errors.name && <p className="text-rose-500 text-sm mt-1">{errors.name.message}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-2">Category</label>
                        <select
                            {...register('category', { required: true })}
                            className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition"
                        >
                            <option value="Frontend">Frontend</option>
                            <option value="Backend">Backend</option>
                            <option value="Tools">Tools</option>
                            <option value="Soft Skills">Soft Skills</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-2">Proficiency (0-100)</label>
                        <input
                            type="number"
                            {...register('proficiency', { required: true, min: 0, max: 100 })}
                            className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition"
                            placeholder="90"
                        />
                    </div>
                </div>

                <div className="mb-6">
                    <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-2">Icon (Auto-generated)</label>
                    <input
                        {...register('icon')}
                        className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition bg-slate-50 dark:bg-slate-900"
                        placeholder="e.g. ⚛️"
                    // readOnly // Keeping it editable just in case
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-2">Description (Optional)</label>
                    <textarea
                        {...register('description')}
                        className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition h-32 resize-none"
                        placeholder="Brief description of your experience..."
                    ></textarea>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-indigo-600 text-white py-3 rounded-lg font-bold hover:bg-indigo-700 transition hover:shadow-lg transform active:scale-95 duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? 'Saving...' : (id ? 'Update Skill' : 'Add Skill')}
                </button>
            </form>
        </div>
    );
};

export default SkillForm;
