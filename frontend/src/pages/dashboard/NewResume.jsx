import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { ArrowRight, ArrowLeft, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import TemplateCard from "../../components/resume/TemplateCard";
import StepIndicator from "../../components/resume/StepIndicator";

const NewResume = () => {
  const navigate = useNavigate();
  const { user, token } = useContext(AuthContext);
  
  const [step, setStep] = useState(1);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [resumeName, setResumeName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Auto-generate resume name when user user loads or step changes
  useEffect(() => {
    if (user && !resumeName) {
      const cleanName = (user.name || user.email?.split('@')[0] || 'user')
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '');
      setResumeName(`${cleanName}_resume`);
    }
  }, [user]);

  const templates = [
    { name: "Modern", description: "Clean and minimalist design for tech professionals." },
    { name: "Professional", description: "Traditional layout suitable for corporate roles." },
    { name: "Creative", description: "Bold colors and layout for design-focused roles." },
  ];

  const handleNext = () => {
    if (step === 1 && selectedTemplate) {
      setStep(2);
    }
  };

  const handleBack = () => {
    if (step === 2) {
      setStep(1);
    }
  };

  const handleCreate = async () => {
    if (!resumeName || resumeName.length < 3) {
      setError("Resume name must be at least 3 characters.");
      return;
    }

    setLoading(true);
    setError(null);

    const payload = {
      title: resumeName,
      template: selectedTemplate,
      content: {
          // Initialize empty content structure expected by backend
          contact: { fullName: user?.name || "", email: user?.email || "" }
      }
    };

    try {
      const response = await fetch('http://localhost:5000/api/resumes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const data = await response.text();
      const json = data ? JSON.parse(data) : {};

      if (!response.ok) {
        throw new Error(json.message || 'Failed to create resume');
      }

      toast.success("Resume created successfully!");
      navigate(`/dashboard/resume/${json._id}/edit`);
      
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to create resume.");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <div className="mb-8">
        <Link to="/dashboard/my-resumes" className="text-sm text-gray-400 hover:text-white transition-colors">
          ← Back to My Resumes
        </Link>
        <h1 className="text-2xl font-bold text-gray-100 mt-2 text-center">Create New Resume</h1>
      </div>

      <StepIndicator currentStep={step} />

      {error && (
        <div className="max-w-md mx-auto mb-6 bg-red-50 text-red-600 p-4 rounded-lg text-sm text-center">
            {error}
        </div>
      )}

      {/* STEP 1: Template Selection */}
      {step === 1 && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="text-center space-y-2">
            <h2 className="text-xl font-semibold text-gray-100">Select a Template</h2>
            <p className="text-gray-400">Choose a design that best fits your style.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {templates.map((t) => (
              <TemplateCard 
                key={t.name}
                name={t.name}
                description={t.description}
                selected={selectedTemplate === t.name}
                onSelect={setSelectedTemplate}
              />
            ))}
          </div>

          <div className="flex justify-end pt-4">
            <button
              onClick={handleNext}
              disabled={!selectedTemplate}
              className="flex items-center gap-2 px-8 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30"
            >
              Next Step <ArrowRight size={18} />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: Resume Name */}
      {step === 2 && (
        <div className="max-w-md mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="text-center space-y-2">
            <h2 className="text-xl font-semibold text-gray-100">Name Your Resume</h2>
            <p className="text-gray-400">Give your resume a memorable name.</p>
          </div>

          <div className="bg-[#1E1E2D] p-8 rounded-2xl shadow-xl border border-white/5">
             <label className="block text-sm font-medium text-gray-400 mb-2">Resume Name</label>
             <input 
               type="text" 
               value={resumeName}
               onChange={(e) => setResumeName(e.target.value)}
               placeholder="e.g. my_resume"
               className="w-full p-4 bg-[#151521] border border-white/5 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-lg text-white placeholder-gray-600"
               autoFocus
             />
             <p className="text-xs text-gray-500 mt-2">
               This name is for your reference only and won't appear on the resume.
             </p>
          </div>

          <div className="flex items-center justify-between pt-4">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-gray-400 hover:text-white font-medium px-4 py-2 transition-colors"
            >
              <ArrowLeft size={18} /> Back
            </button>
            
            <button
              onClick={handleCreate}
              disabled={loading || !resumeName.trim()}
              className="flex items-center gap-2 px-8 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-500 disabled:opacity-50 transition-all shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 min-w-[160px] justify-center"
            >
              {loading ? <Loader2 className="animate-spin" /> : "Create Resume"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewResume;
