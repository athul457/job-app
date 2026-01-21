import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { FilePlus, Files, Bot, Briefcase, ArrowRight } from "lucide-react";
import { getJobs } from "../../api/job.api";
import { AuthContext } from "../../context/AuthContext";
import JobCard from "../../components/jobs/JobCard";

/**
 * Dashboard Overview Page
 * Integrates with Sidebar: Default landing page for /dashboard route.
 * Purpose: Provides a high-level overview and quick access to key features.
 */
const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        const fetchLatestJobs = async () => {
            try {
                const data = await getJobs({ limit: 4 });
                setJobs(data.jobs || []);
            } catch (error) {
                console.error("Failed to load jobs", error);
            }
        };
        fetchLatestJobs();
    }, []);

  return (
    <div className="space-y-8 pb-10">
      {/* Welcome Section */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h1 className="text-2xl font-bold text-gray-800">Welcome back, {user?.name || "User"}! 👋</h1>
        <p className="text-gray-600 mt-2">Ready to land your dream job? Let's get to work.</p>
      </div>

      {/* Quick Actions */}
      <h2 className="text-lg font-semibold text-gray-800">Quick Actions</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Create Resume Card */}
        <Link 
          to="/dashboard/new-resume" 
          className="group p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all hover:border-blue-200"
        >
          <div className="h-12 w-12 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
            <FilePlus size={24} />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Create Resume</h3>
          <p className="text-sm text-gray-500">Build a professional resume with our AI-powered templates.</p>
        </Link>

        {/* My Resumes Card */}
        <Link 
          to="/dashboard/my-resumes"
          className="group p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all hover:border-blue-200"
        >
          <div className="h-12 w-12 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600 mb-4 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
            <Files size={24} />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">My Resumes</h3>
          <p className="text-sm text-gray-500">View, edit, and manage your saved resumes.</p>
        </Link>

        {/* AI Assistant Card */}
        <Link 
          to="/dashboard/ai-assistant"
          className="group p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all hover:border-blue-200"
        >
          <div className="h-12 w-12 bg-purple-50 rounded-lg flex items-center justify-center text-purple-600 mb-4 group-hover:bg-purple-600 group-hover:text-white transition-colors">
            <Bot size={24} />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">AI Assistant</h3>
          <p className="text-sm text-gray-500">Get instant help with resume keywords and job tips.</p>
        </Link>
      </div>

      {/* Latest Jobs Section */}
      <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-800">Latest Jobs</h2>
            <Link to="/dashboard/jobs" className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1">
                View All Jobs <ArrowRight size={16} />
            </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {jobs.length > 0 ? (
            jobs.map(job => (
                <JobCard key={job._id} job={job} />
            ))
        ) : (
            <div className="col-span-full text-center py-10 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                <Briefcase size={32} className="mx-auto text-gray-400 mb-2" />
                <p className="text-gray-500">No jobs available right now.</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
