import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MapPin, Briefcase, DollarSign, Clock, CheckCircle, ArrowLeft, Building, Loader2 } from "lucide-react";
import { getJobById } from "../../api/job.api";
import ApplyJobModal from "../../components/jobs/ApplyJobModal";
import toast from "react-hot-toast";

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);

  useEffect(() => {
    fetchJob();
  }, [id]);

  const fetchJob = async () => {
    setLoading(true);
    try {
      const data = await getJobById(id);
      setJob(data);
    } catch (error) {
      toast.error("Failed to load job details");
      navigate("/dashboard/jobs");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="animate-spin text-blue-600" size={40} /></div>;
  if (!job) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center gap-2 text-gray-500 hover:text-gray-800 transition-colors"
      >
        <ArrowLeft size={18} />
        Back to Jobs
      </button>

      {/* Header Card */}
      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -mr-16 -mt-16 opacity-50"></div>
        
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row justify-between gap-6 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.title}</h1>
              <div className="flex items-center gap-2 text-lg text-gray-700 font-medium">
                <Building size={20} className="text-blue-600" />
                {job.company}
              </div>
            </div>
            <button 
              onClick={() => setIsApplyModalOpen(true)}
              className="px-8 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
            >
              Apply Now
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-gray-100">
             <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-50 rounded-lg text-gray-500"><MapPin size={20} /></div>
                <div>
                    <p className="text-xs text-gray-500 uppercase font-semibold">Location</p>
                    <p className="text-sm font-medium text-gray-800">{job.location}</p>
                </div>
             </div>
             <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-50 rounded-lg text-gray-500"><DollarSign size={20} /></div>
                <div>
                    <p className="text-xs text-gray-500 uppercase font-semibold">Salary</p>
                    <p className="text-sm font-medium text-gray-800">{job.salaryRange?.min} - {job.salaryRange?.max}</p>
                </div>
             </div>
             <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-50 rounded-lg text-gray-500"><Briefcase size={20} /></div>
                <div>
                    <p className="text-xs text-gray-500 uppercase font-semibold">Type</p>
                    <p className="text-sm font-medium text-gray-800 capitalize">{job.type}</p>
                </div>
             </div>
             <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-50 rounded-lg text-gray-500"><Clock size={20} /></div>
                <div>
                    <p className="text-xs text-gray-500 uppercase font-semibold">Experience</p>
                    <p className="text-sm font-medium text-gray-800">{job.experienceLevel}</p>
                </div>
             </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
            <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Job Description</h2>
                <div className="prose prose-blue max-w-none text-gray-600 leading-relaxed whitespace-pre-line">
                    {job.description}
                </div>
            </section>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
            <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Skills Required</h3>
                <div className="flex flex-wrap gap-2">
                    {job.skills?.map((skill, index) => (
                        <span key={index} className="px-3 py-1 bg-blue-50 text-blue-700 text-sm font-medium rounded-full">
                            {skill}
                        </span>
                    ))}
                </div>
            </section>
            
            <section className="bg-gradient-to-br from-blue-600 to-indigo-700 p-6 rounded-xl shadow-lg text-white">
                <h3 className="text-lg font-bold mb-2">Interested?</h3>
                <p className="text-blue-100 mb-6 text-sm">Don't miss this opportunity to join {job.company}. Apply now to get started.</p>
                <button 
                  onClick={() => setIsApplyModalOpen(true)}
                  className="w-full py-3 bg-white text-blue-700 font-bold rounded-lg hover:bg-blue-50 transition-colors"
                >
                  Apply Now
                </button>
            </section>
        </div>
      </div>

      <ApplyJobModal 
        isOpen={isApplyModalOpen} 
        onClose={() => setIsApplyModalOpen(false)} 
        jobTitle={job.title}
        jobId={job._id}
      />
    </div>
  );
};

export default JobDetails;
