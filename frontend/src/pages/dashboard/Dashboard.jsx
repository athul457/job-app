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
      <Card className="bg-gradient-to-r from-blue-300 to-indigo-300 text-black border-none shadow-lg">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
                <h1 className="text-3xl font-bold">Welcome back, {user?.name || "User"} </h1>
                <p className="text-black mt-2 text-lg">Ready to land your dream job? Let's get to work.</p>
            </div>
            <Link to="/dashboard/new-resume">
                <Button variant="secondary" size="lg" className="shadow-none border-none bg-blue-400 text-black hover:bg-blue-200 backdrop-blur-sm">
                    <FilePlus className="mr-2 h-5 w-5" />
                    Create New Resume
                </Button>
            </Link>
        </div>
      </Card>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-bold text-gray-900 mb-4 px-1">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link to="/dashboard/new-resume" className="group">
                <Card className="h-full hover:shadow-lg hover:border-blue-200 transition-all duration-300 group-hover:-translate-y-1">
                    <div className="h-12 w-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                        <FilePlus size={24} />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Create Resume</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">Build a professional resume with our AI-powered templates.</p>
                </Card>
            </Link>

            <Link to="/dashboard/my-resumes" className="group">
                <Card className="h-full hover:shadow-lg hover:border-indigo-200 transition-all duration-300 group-hover:-translate-y-1">
                    <div className="h-12 w-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 mb-4 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                        <Files size={24} />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">My Resumes</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">View, edit, and manage your saved resumes and applications.</p>
                </Card>
            </Link>

            <Link to="/dashboard/ai-assistant" className="group">
                <Card className="h-full hover:shadow-lg hover:border-purple-200 transition-all duration-300 group-hover:-translate-y-1">
                    <div className="h-12 w-12 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600 mb-4 group-hover:bg-purple-600 group-hover:text-white transition-colors duration-300">
                        <Bot size={24} />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">AI Assistant</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">Get instant help with resume keywords and job interview tips.</p>
                </Card>
            </Link>
        </div>
      </div>

      {/* Latest Jobs Section */}
      <div>
        <div className="flex justify-between items-center mb-4 px-1">
            <h2 className="text-lg font-bold text-gray-900">Latest Jobs</h2>
            <Link to="/dashboard/jobs">
                <Button variant="link" className="text-blue-600 hover:text-blue-700 font-semibold p-0 h-auto">
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
                <div className="col-span-full py-12 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-100 flex flex-col items-center justify-center">
                    <Briefcase size={40} className="text-gray-300 mb-3" />
                    <p className="text-gray-500 font-medium">No job postings available right now.</p>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
