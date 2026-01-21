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
        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
      >
        <ArrowLeft size={18} />
        Back to Jobs
      </button>

      {/* Header Card */}
      <div className="bg-[#1E1E2D] p-8 rounded-xl shadow-xl border border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-bl-full -mr-16 -mt-16 blur-xl pointer-events-none"></div>
        
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row justify-between gap-6 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">{job.title}</h1>
              <div className="flex items-center gap-2 text-lg text-gray-300 font-medium">
                <Building size={20} className="text-indigo-400" />
                {job.company}
              </div>
            </div>
            <button 
              onClick={() => setIsApplyModalOpen(true)}
              className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-500/20"
            >
              Apply Now
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-white/5">
             <div className="flex items-center gap-3">
                <div className="p-2 bg-[#151521] rounded-lg text-gray-400 border border-white/5"><MapPin size={20} /></div>
                <div>
                    <p className="text-xs text-gray-500 uppercase font-semibold">Location</p>
                    <p className="text-sm font-medium text-gray-300">{job.location}</p>
                </div>
             </div>
             <div className="flex items-center gap-3">
                <div className="p-2 bg-[#151521] rounded-lg text-gray-400 border border-white/5"><DollarSign size={20} /></div>
                <div>
                    <p className="text-xs text-gray-500 uppercase font-semibold">Salary</p>
                    <p className="text-sm font-medium text-gray-300">{job.salaryRange?.min} - {job.salaryRange?.max}</p>
                </div>
             </div>
             <div className="flex items-center gap-3">
                <div className="p-2 bg-[#151521] rounded-lg text-gray-400 border border-white/5"><Briefcase size={20} /></div>
                <div>
                    <p className="text-xs text-gray-500 uppercase font-semibold">Type</p>
                    <p className="text-sm font-medium text-gray-300 capitalize">{job.type}</p>
                </div>
             </div>
             <div className="flex items-center gap-3">
                <div className="p-2 bg-[#151521] rounded-lg text-gray-400 border border-white/5"><Clock size={20} /></div>
                <div>
                    <p className="text-xs text-gray-500 uppercase font-semibold">Experience</p>
                    <p className="text-sm font-medium text-gray-300">{job.experienceLevel}</p>
                </div>
             </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
            <section className="bg-[#1E1E2D] p-6 rounded-xl shadow-xl border border-white/5">
                <h2 className="text-xl font-bold text-white mb-4">Job Description</h2>
                <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed whitespace-pre-line">
                    {job.description}
                </div>
            </section>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
            <section className="bg-[#1E1E2D] p-6 rounded-xl shadow-xl border border-white/5">
                <h3 className="text-lg font-bold text-white mb-4">Skills Required</h3>
                <div className="flex flex-wrap gap-2">
                    {job.skills?.map((skill, index) => (
                        <span key={index} className="px-3 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-sm font-medium rounded-full">
                            {skill}
                        </span>
                    ))}
                </div>
            </section>
            
            <section className="bg-gradient-to-br from-indigo-600 to-purple-800 p-6 rounded-xl shadow-lg text-white border border-white/10">
                <h3 className="text-lg font-bold mb-2">Interested?</h3>
                <p className="text-indigo-100 mb-6 text-sm">Don't miss this opportunity to join {job.company}. Apply now to get started.</p>
                <button 
                  onClick={() => setIsApplyModalOpen(true)}
                  className="w-full py-3 bg-white text-indigo-700 font-bold rounded-lg hover:bg-indigo-50 transition-colors shadow-lg"
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
