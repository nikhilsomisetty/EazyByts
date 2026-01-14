import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Blog from './pages/Blog';
import Skills from './pages/Skills';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import ProjectForm from './pages/ProjectForm';
import BlogForm from './pages/BlogForm';
import ManageProjects from './pages/ManageProjects';
import ManageSkills from './pages/ManageSkills';
import SkillForm from './pages/SkillForm';
import ThemeSettings from './pages/ThemeSettings';
import CMSLayout from './components/CMSLayout';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <div className="min-h-screen bg-slate-50 text-slate-900 font-sans dark:bg-slate-950 dark:text-slate-100 transition-colors duration-200">
            <Navbar />
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/skills" element={<Skills />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Private Routes */}
              <Route element={<ProtectedRoute />}>
                {/* CMS Routes wrapped in CMS Layout */}
                <Route path="/dashboard" element={
                  <CMSLayout>
                    <Dashboard />
                  </CMSLayout>
                } />
                <Route path="/manage-projects" element={
                  <CMSLayout>
                    <ManageProjects />
                  </CMSLayout>
                } />
                <Route path="/projects/new" element={
                  <CMSLayout>
                    <ProjectForm />
                  </CMSLayout>
                } />
                <Route path="/projects/edit/:id" element={
                  <CMSLayout>
                    <ProjectForm />
                  </CMSLayout>
                } />
                <Route path="/blogs/new" element={
                  <CMSLayout>
                    <BlogForm />
                  </CMSLayout>
                } />
                <Route path="/blogs/edit/:id" element={
                  <CMSLayout>
                    <BlogForm />
                  </CMSLayout>
                } />
                <Route path="/manage-skills" element={
                  <CMSLayout>
                    <ManageSkills />
                  </CMSLayout>
                } />
                <Route path="/skills/new" element={
                  <CMSLayout>
                    <SkillForm />
                  </CMSLayout>
                } />
                <Route path="/skills/edit/:id" element={
                  <CMSLayout>
                    <SkillForm />
                  </CMSLayout>
                } />
                <Route path="/theme-settings" element={
                  <CMSLayout>
                    <ThemeSettings />
                  </CMSLayout>
                } />
                <Route path="/profile" element={
                  <CMSLayout>
                    <Profile />
                  </CMSLayout>
                } />
              </Route>
            </Routes>
          </div>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
