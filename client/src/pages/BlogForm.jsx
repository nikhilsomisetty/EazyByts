import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../utils/api';

const BlogForm = () => {
    const { register, handleSubmit, reset } = useForm();
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditMode = !!id;

    const onSubmit = async (data) => {
        const payload = {
            ...data,
            tags: data.tags.split(',').map(tag => tag.trim())
        };

        try {
            if (isEditMode) {
                await api.put(`/blogs/${id}`, payload);
            } else {
                await api.post('/blogs', payload);
            }
            navigate('/dashboard');
        } catch (error) {
            console.error(error);
            alert('Failed to save blog');
        }
    };

    return (
        <div className="container mx-auto px-4 py-12 max-w-2xl">
            <h2 className="text-3xl font-bold mb-8">{isEditMode ? 'Edit Blog Post' : 'Create Blog Post'}</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg space-y-6 border border-slate-100 dark:border-slate-700">
                <div>
                    <label className="block text-slate-700 dark:text-slate-300 mb-2">Title</label>
                    <input {...register('title', { required: true })} className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg dark:bg-slate-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all" />
                </div>
                <div>
                    <label className="block text-slate-700 dark:text-slate-300 mb-2">Summary</label>
                    <input {...register('summary', { required: true })} className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg dark:bg-slate-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all" />
                </div>
                <div>
                    <label className="block text-slate-700 dark:text-slate-300 mb-2">Content</label>
                    <textarea {...register('content', { required: true })} rows="10" className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg dark:bg-slate-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"></textarea>
                </div>
                <div>
                    <label className="block text-slate-700 dark:text-slate-300 mb-2">Image URL</label>
                    <input {...register('imageUrl')} className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg dark:bg-slate-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all" />
                </div>
                <div>
                    <label className="block text-slate-700 dark:text-slate-300 mb-2">Tags (comma separated)</label>
                    <input {...register('tags')} className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg dark:bg-slate-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all" placeholder="React, Tech, Tutorial" />
                </div>
                <button type="submit" className="w-full bg-emerald-600 text-white py-3 rounded-lg font-bold hover:bg-emerald-700 transition hover:shadow-lg transform active:scale-95 duration-200">
                    {isEditMode ? 'Update Post' : 'Publish Post'}
                </button>
            </form>
        </div>
    );
};

export default BlogForm;
