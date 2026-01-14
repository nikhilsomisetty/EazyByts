import { useState, useEffect } from 'react';
import api from '../utils/api';

const Blog = () => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const { data } = await api.get('/blogs');
                setBlogs(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchBlogs();
    }, []);

    return (
        <div className="container mx-auto px-4 py-12">
            <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-primary-600 to-violet-600 bg-clip-text text-transparent">Blog Posts</h2>
            <div className="space-y-8 max-w-4xl mx-auto">
                {blogs.map(blog => (
                    <div key={blog._id} className="bg-white dark:bg-slate-800/50 backdrop-blur-sm p-8 rounded-xl shadow-md transition-all hover:shadow-lg border border-slate-100 dark:border-slate-700">
                        <h3 className="text-2xl font-bold mb-2 text-slate-900 dark:text-slate-100">{blog.title}</h3>
                        <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">{new Date(blog.createdAt).toLocaleDateString()}</p>
                        <p className="text-slate-700 dark:text-slate-300 mb-4">{blog.summary}</p>
                        <a href={`#`} className="text-primary-600 dark:text-primary-400 font-semibold hover:text-primary-700 dark:hover:text-primary-300 hover:underline">Read More (Coming Soon)</a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Blog;
