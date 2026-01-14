import Sidebar from './Sidebar';

const CMSLayout = ({ children }) => {
    return (
        <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors">
            <Sidebar />
            <div className="flex-1 ml-64 p-8 overflow-y-auto h-screen">
                {children}
            </div>
        </div>
    );
};

export default CMSLayout;
