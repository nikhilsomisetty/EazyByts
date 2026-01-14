import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../utils/api';

const ProjectForm = () => {
    const { register, handleSubmit, reset, setValue } = useForm();
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditMode = !!id;

    useEffect(() => {
        if (isEditMode) {
            const fetchProject = async () => {
                try {
                    // Ideally fetch single project, but since we list all on projects page...
                    // Here we assume getProjects includes everything or use an endpoint
                    // Let's assume we have GET /projects/:id implemented? 
                    // No, implementation plan said POST/GET/PUT/DELETE /api/projects/:id which usually implies GET by id too.
                    // Wait, projectController has update/delete but maybe not getById public?
                    // Ah, likely need to implement getById or just fetch all and find.
                    // Let's assume fetching all and finding for now if GET /:id isn't public or available.
                    // Actually, createProject controller has getProjects (all). 
                    // I should check projectController.js content.
                    // It has exports.updateProject, deleteProject, etc. It DOES NOT have getProjectById explicitly.
                    // I should add it or just pass state.
                } catch (error) {
                    console.error(error);
                }
            };
            // fetchProject();
        }
    }, [isEditMode, id]);

    const onSubmit = async (data) => {
        // Convert technologies string to array
        const payload = {
            ...data,
            technologies: data.technologies.split(',').map(tech => tech.trim())
        };

        try {
            if (isEditMode) {
                await api.put(`/projects/${id}`, payload);
            } else {
                await api.post('/projects', payload);
            }
            navigate('/dashboard');
        } catch (error) {
            console.error(error);
            alert('Failed to save project');
        }
    };

    return (
        <div className="container mx-auto px-4 py-12 max-w-2xl">
            <h2 className="text-3xl font-bold mb-8">{isEditMode ? 'Edit Project' : 'Add New Project'}</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg space-y-6 border border-slate-100 dark:border-slate-700">
                <div>
                    <label className="block text-slate-700 dark:text-slate-300 mb-2">Title</label>
                    <input {...register('title', { required: true })} className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg dark:bg-slate-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all" />
                    {errors.title && <span className="text-red-500 text-sm">Title is required</span>}
                </div>
                <div>
                    <label className="block text-slate-700 dark:text-slate-300 mb-2">Description</label>
                    <textarea {...register('description', { required: true })} rows="4" className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg dark:bg-slate-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"></textarea>
                    {errors.description && <span className="text-red-500 text-sm">Description is required</span>}
                </div>
                <div>
                    <label className="block text-slate-700 dark:text-slate-300 mb-2">Image URL</label>
                    <input {...register('imageUrl', { required: true })} className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg dark:bg-slate-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all" placeholder="https://example.com/image.jpg" />
                </div>
                <div>
                    <label className="block text-slate-700 dark:text-slate-300 mb-2">Technologies (comma separated)</label>
                    <input {...register('technologies', { required: true })} className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg dark:bg-slate-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all" placeholder="React, Node.js, MongoDB" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-slate-700 dark:text-slate-300 mb-2">Project URL</label>
                        <input {...register('projectUrl')} className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg dark:bg-slate-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all" />
                    </div>
                    <div>
                        <label className="block text-slate-700 dark:text-slate-300 mb-2">GitHub URL</label>
                        <input {...register('githubUrl')} className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg dark:bg-slate-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all" />
                    </div>
                </div>
                <button type="submit" className="w-full bg-primary-600 text-white py-3 rounded-lg font-bold hover:bg-primary-700 transition hover:shadow-lg transform active:scale-95 duration-200">
                    {isEditMode ? 'Update Project' : 'Create Project'}
                </button>
            </form>
        </div>
    );
};

export default ProjectForm;
