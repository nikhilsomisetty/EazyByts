import { useContext } from 'react';
import { User } from 'lucide-react';
import AuthContext from '../context/AuthContext';

const Profile = () => {
    const { user } = useContext(AuthContext);

    return (
        <div className="container mx-auto px-4 py-12 flex justify-center">
            <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg w-full max-w-md border border-slate-100 dark:border-slate-700 text-center">
                <div className="w-24 h-24 bg-primary-100 dark:bg-primary-900/50 rounded-full mx-auto mb-6 flex items-center justify-center text-primary-600 dark:text-primary-400">
                    <User size={48} />
                </div>
                <h2 className="text-2xl font-bold mb-2 text-slate-900 dark:text-white">{user?.username || 'User'}</h2>
                <p className="text-slate-600 dark:text-slate-400 mb-6">{user?.email || 'user@example.com'}</p>
                <div className="bg-primary-50 dark:bg-primary-900/20 p-4 rounded-lg">
                    <p className="text-sm text-primary-700 dark:text-primary-300">My Profile Settings (Coming Soon)</p>
                </div>
            </div>
        </div>
    );
};

export default Profile;
