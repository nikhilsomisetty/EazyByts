import { useState } from 'react';
import { useForm } from 'react-hook-form';
import api from '../utils/api';

const Contact = () => {
    const { register, handleSubmit, reset } = useForm();
    const [status, setStatus] = useState('');

    const onSubmit = async (data) => {
        setStatus('sending');
        try {
            await api.post('/contact', data);
            setStatus('success');
            reset();
        } catch (error) {
            setStatus('error');
        }
    };

    return (
        <div className="container mx-auto px-4 py-12 max-w-2xl">
            <h2 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-primary-600 to-violet-600 bg-clip-text text-transparent">Get In Touch</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white dark:bg-slate-800/80 p-8 rounded-xl shadow-lg space-y-6 border border-slate-100 dark:border-slate-700">
                <div>
                    <label className="block text-slate-700 dark:text-slate-300 mb-2">Name</label>
                    <input {...register('name', { required: true })} className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg dark:bg-slate-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all" placeholder="Your Name" />
                </div>
                <div>
                    <label className="block text-slate-700 dark:text-slate-300 mb-2">Email</label>
                    <input {...register('email', { required: true })} type="email" className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg dark:bg-slate-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all" placeholder="your@email.com" />
                </div>
                <div>
                    <label className="block text-slate-700 dark:text-slate-300 mb-2">Message</label>
                    <textarea {...register('message', { required: true })} rows="5" className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg dark:bg-slate-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all" placeholder="How can I help you?"></textarea>
                </div>

                <button type="submit" disabled={status === 'sending'} className="w-full bg-primary-600 text-white py-3 rounded-lg font-bold hover:bg-primary-700 transition disabled:opacity-50 hover:shadow-lg transform active:scale-95 duration-200">
                    {status === 'sending' ? 'Sending...' : 'Send Message'}
                </button>

                {status === 'success' && <p className="text-green-600 text-center font-semibold">Message sent successfully!</p>}
                {status === 'error' && <p className="text-red-500 text-center font-semibold">Something went wrong. Please try again.</p>}
            </form>
        </div>
    );
};

export default Contact;
