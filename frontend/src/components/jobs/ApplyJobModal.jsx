import { useState, useEffect, useContext } from "react";
import { X, Upload, FileText, CheckCircle, Loader2, Plus, PenTool } from "lucide-react";
import { AuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

/**
 * ApplyJobModal
 * Handles job application via existing resume, file upload, or creating a new one.
 */
const ApplyJobModal = ({ isOpen, onClose, jobTitle, jobId }) => {
  const { token, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("existing"); // existing | upload | create
  const [resumes, setResumes] = useState([]);
  const [selectedResumeId, setSelectedResumeId] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetchingResumes, setFetchingResumes] = useState(false);

  // Fetch user's resumes on mount
  useEffect(() => {
    if (isOpen) {
      fetchResumes();
    }
  }, [isOpen]);

  const fetchResumes = async () => {
    setFetchingResumes(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/resumes`, {
      // const res = await fetch("http://localhost:5000/api/resumes", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) {
        setResumes(data);
        if (data.length > 0) setSelectedResumeId(data[0]._id);
      }
    } catch (error) {
      console.error("Failed to fetch resumes", error);
    } finally {
      setFetchingResumes(false);
    }
  };

  const handleCreateNew = () => {
      onClose();
      navigate('/dashboard/select-template');
  };

  const handleApply = async () => {
    setLoading(true);
    try {
      let finalResumeId = selectedResumeId;

      // If upload tab, create a placeholder resume first
      if (activeTab === "upload") {
        if (!file) {
          toast.error("Please select a file to upload");
          setLoading(false);
          return;
        }

        // Create a basic resume entry for this file
        const createRes = await fetch(`${import.meta.env.VITE_API_URL}/api/resumes`, {
        // const createRes = await fetch("http://localhost:5000/api/resumes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                title: file.name,
                template: "modern",
                content: {
                    personalInfo: { fullName: user.name, email: user.email },
                    summary: `Resume uploaded from file: ${file.name}`
                }
            })
        });

        const newResume = await createRes.json();
        if (!createRes.ok) throw new Error(newResume.message || "Failed to process file");
        finalResumeId = newResume._id;
      }

      if (!finalResumeId && activeTab !== 'create') {
        toast.error("Please select a resume");
        setLoading(false);
        return;
      }

      // Apply to Job
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/jobs/${jobId}/apply`, {
      // const res = await fetch(`http://localhost:5000/api/jobs/${jobId}/apply`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ resumeId: finalResumeId })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to apply");

      toast.success("Application submitted successfully!");
      onClose();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Apply for Job</h2>
            <p className="text-sm text-gray-500 mt-1">{jobTitle}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500">
            <X size={20} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-100">
          <button
            onClick={() => setActiveTab("existing")}
            className={`flex-1 py-3 text-sm font-medium transition-colors border-b-2 ${
              activeTab === "existing" ? "text-blue-600 border-blue-600" : "text-gray-500 border-transparent hover:text-gray-700"
            }`}
          >
            Select Existing
          </button>
          <button
            onClick={() => setActiveTab("upload")}
            className={`flex-1 py-3 text-sm font-medium transition-colors border-b-2 ${
              activeTab === "upload" ? "text-blue-600 border-blue-600" : "text-gray-500 border-transparent hover:text-gray-700"
            }`}
          >
            Upload File
          </button>
          <button
            onClick={() => setActiveTab("create")}
            className={`flex-1 py-3 text-sm font-medium transition-colors border-b-2 ${
              activeTab === "create" ? "text-blue-600 border-blue-600" : "text-gray-500 border-transparent hover:text-gray-700"
            }`}
          >
            Create New
          </button>
        </div>

        {/* Content */}
        <div className="p-6 h-72 overflow-y-auto">
          {activeTab === "existing" && (
            <div className="space-y-4">
              {fetchingResumes ? (
                <div className="flex justify-center py-8"><Loader2 className="animate-spin text-blue-600" /></div>
              ) : resumes.length > 0 ? (
                <div className="space-y-3">
                    {resumes.map(resume => (
                        <div 
                            key={resume._id}
                            onClick={() => setSelectedResumeId(resume._id)}
                            className={`p-4 border rounded-lg cursor-pointer transition-all flex items-center justify-between ${
                                selectedResumeId === resume._id 
                                ? "border-blue-600 bg-blue-50 ring-1 ring-blue-600" 
                                : "border-gray-200 hover:border-blue-300"
                            }`}
                        >
                            <div className="flex items-center gap-3">
                                <FileText size={20} className={selectedResumeId === resume._id ? "text-blue-600" : "text-gray-400"} />
                                <div>
                                    <p className={`font-medium ${selectedResumeId === resume._id ? "text-blue-700" : "text-gray-700"}`}>
                                        {resume.title}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        Updated {new Date(resume.updatedAt).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                            {selectedResumeId === resume._id && <CheckCircle size={18} className="text-blue-600" />}
                        </div>
                    ))}
                </div>
              ) : (
                <div className="text-center py-10 text-gray-500">
                    <FileText size={48} className="mx-auto mb-3 opacity-20" />
                    <p>No saved resumes found.</p>
                    <p className="text-sm">Create one or upload a file.</p>
                </div>
              )}
            </div>
          )}

          {activeTab === "upload" && (
            <div className="space-y-4 h-full flex flex-col justify-center">
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 transition-colors bg-gray-50">
                    <input 
                        type="file" 
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => setFile(e.target.files[0])}
                        className="hidden" 
                        id="resume-upload" 
                    />
                    <label htmlFor="resume-upload" className="cursor-pointer block">
                        <div className="h-12 w-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Upload size={24} />
                        </div>
                        <p className="text-gray-700 font-medium mb-1">
                            {file ? file.name : "Click to upload resume"}
                        </p>
                        <p className="text-xs text-gray-500">PDF, DOCX up to 5MB</p>
                    </label>
                </div>
                {file && (
                     <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 p-3 rounded-lg">
                        <CheckCircle size={16} />
                        <span>Ready to upload: <strong>{file.name}</strong></span>
                     </div>
                )}
            </div>
          )}

          {activeTab === "create" && (
             <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
                    <PenTool size={32} />
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-gray-800">Build a New Resume</h3>
                    <p className="text-sm text-gray-500 mt-2 max-w-xs mx-auto">
                        Use our AI-powered resume builder to create a professional resume in minutes.
                    </p>
                </div>
                <button 
                    onClick={handleCreateNew}
                    className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md mt-2"
                >
                    <Plus size={18} /> Create Resume Now
                </button>
             </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100 flex justify-end gap-3 bg-gray-50">
          <button 
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors"
          >
            Cancel
          </button>
         
          {activeTab !== 'create' && (
              <button 
                onClick={handleApply}
                disabled={loading || (activeTab === "existing" && !selectedResumeId) || (activeTab === "upload" && !file)}
                className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow"
              >
                {loading ? <Loader2 className="animate-spin" size={18} /> : null}
                {activeTab === "upload" ? "Upload & Apply" : "Apply Now"}
              </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApplyJobModal;
