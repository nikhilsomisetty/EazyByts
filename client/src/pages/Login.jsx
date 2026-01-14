import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Login = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(formData.username, formData.password);
            navigate('/dashboard');
        } catch (err) {
            setError('Invalid credentials');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-64px)] bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg w-full max-w-md border border-slate-100 dark:border-slate-700">
                <h2 className="text-2xl font-bold mb-6 text-center text-slate-900 dark:text-white">Admin Login</h2>
                {error && <p className="text-rose-500 mb-4 text-center">{error}</p>}
                <div className="mb-4">
                    <label className="block text-slate-700 dark:text-slate-300 mb-2">Username</label>
                    <input
                        type="text"
                        className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg dark:bg-slate-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                        value={formData.username}
                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-slate-700 dark:text-slate-300 mb-2">Password</label>
                    <input
                        type="password"
                        className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg dark:bg-slate-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                </div>
                <button type="submit" className="w-full bg-primary-600 text-white py-2 rounded-lg font-bold hover:bg-primary-700 transition hover:shadow-lg transform active:scale-95 duration-200">
                    Login
                </button>

                <div className="mt-6 text-center">
                    <p className="text-slate-600 dark:text-slate-400">Don't have an account? <Link to="/register" className="text-primary-600 font-semibold hover:underline dark:text-primary-400">Register</Link></p>
                </div>
            </form>
        </div>
    );
};

export default Login;
