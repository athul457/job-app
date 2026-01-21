import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { FilePlus, Files, Bot, Briefcase, ArrowRight } from "lucide-react";
import { getJobs } from "../../api/job.api";
import { AuthContext } from "../../context/AuthContext";
import JobCard from "../../components/jobs/JobCard";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";

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
      {/* Welcome Section */}
      <Card className="bg-gradient-to-r from-indigo-900/50 to-purple-900/50 backdrop-blur-md border border-white/10 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-32 bg-indigo-500/10 blur-3xl rounded-full -mr-16 -mt-16 pointer-events-none" />
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 relative z-10">
            <div>
                <h1 className="text-3xl font-bold"><span className="text-xl italic text-gray-300 font-light"  >Welcome back,</span> {user?.name || "User"} </h1>
                <p className="text-indigo-200 mt-2 text-lg">Ready to land your dream job? Let's get to work.</p>
            </div>
            <Link to="/dashboard/new-resume">
                <Button variant="secondary" size="lg" className="shadow-lg shadow-indigo-500/30 border border-white/10 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm transition-all duration-300 transform hover:scale-105">
                    <FilePlus className="mr-2 h-5 w-5" />
                    Create New Resume
                </Button>
            </Link>
        </div>
      </Card>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-bold text-gray-100 mb-4 px-1">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link to="/dashboard/new-resume" className="group">
                <Card className="h-full bg-[#1E1E2D] border border-white/5 hover:border-indigo-500/30 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 group-hover:-translate-y-1">
                    <div className="h-12 w-12 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-400 mb-4 group-hover:bg-blue-500 group-hover:text-white transition-colors duration-300">
                        <FilePlus size={24} />
                    </div>
                    <h3 className="text-lg font-bold text-gray-100 mb-2">Create Resume</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">Build a professional resume with our AI-powered templates.</p>
                </Card>
            </Link>

            <Link to="/dashboard/my-resumes" className="group">
                <Card className="h-full bg-[#1E1E2D] border border-white/5 hover:border-indigo-500/30 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 group-hover:-translate-y-1">
                    <div className="h-12 w-12 bg-indigo-500/10 rounded-xl flex items-center justify-center text-indigo-400 mb-4 group-hover:bg-indigo-500 group-hover:text-white transition-colors duration-300">
                        <Files size={24} />
                    </div>
                    <h3 className="text-lg font-bold text-gray-100 mb-2">My Resumes</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">View, edit, and manage your saved resumes and applications.</p>
                </Card>
            </Link>

            <Link to="/dashboard/ai-assistant" className="group">
                <Card className="h-full bg-[#1E1E2D] border border-white/5 hover:border-purple-500/30 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300 group-hover:-translate-y-1">
                    <div className="h-12 w-12 bg-purple-500/10 rounded-xl flex items-center justify-center text-purple-400 mb-4 group-hover:bg-purple-500 group-hover:text-white transition-colors duration-300">
                        <Bot size={24} />
                    </div>
                    <h3 className="text-lg font-bold text-gray-100 mb-2">AI Assistant</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">Get instant help with resume keywords and job interview tips.</p>
                </Card>
            </Link>
        </div>
      </div>

      {/* Latest Jobs Section */}
      <div>
        <div className="flex justify-between items-center mb-4 px-1">
            <h2 className="text-lg font-bold text-gray-100">Latest Jobs</h2>
            <Link to="/dashboard/jobs">
                <Button variant="link" className="text-blue-400 hover:text-blue-300 font-semibold p-0 h-auto">
                    View All Jobs <ArrowRight size={16} className="ml-1" />
                </Button>
            </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {jobs.length > 0 ? (
                jobs.map(job => (
                    <JobCard key={job._id} job={job} />
                ))
            ) : (
                <div className="col-span-full py-12 bg-[#1E1E2D] rounded-2xl border-2 border-dashed border-white/5 flex flex-col items-center justify-center">
                    <Briefcase size={40} className="text-gray-600 mb-3" />
                    <p className="text-gray-400 font-medium">No job postings available right now.</p>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
