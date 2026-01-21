import { useState, useContext, useEffect } from "react";
import { Save, AlertCircle, Plus, Layout, X, Trash2 } from "lucide-react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";
import SkillInput from "../../components/resume/SkillInput";
import EducationForm from "../../components/resume/EducationForm";
import ProjectForm from "../../components/resume/ProjectForm";
import SocialLinks from "../../components/resume/SocialLinks";
import ListInput from "../../components/resume/ListInput";

/**
 * CreateResume Page (Handles both Create and Edit)
 * 
 * Manages the state for creating and editing resumes.
 * If URL param :id exists, it loads data and enters "Edit Mode".
 */
const CreateResume = () => {
  const { id } = useParams(); // Get ID for edit mode
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { token } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(!!id);
  const [error, setError] = useState(null);

  // Form State
  const [basicInfo, setBasicInfo] = useState({ title: "", summary: "" });
  const [contactInfo, setContactInfo] = useState({ fullName: "", jobTitle: "", email: "", phone: "", linkedin: "", github: "" });
  const [skills, setSkills] = useState([]);
  const [education, setEducation] = useState([]);
  const [projects, setProjects] = useState([]);
  const [template, setTemplate] = useState(searchParams.get("template") || "modern");

  // Dynamic Sections State
  const [languages, setLanguages] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [awards, setAwards] = useState([]);
  
  // Custom Sections State
  const [customSections, setCustomSections] = useState([]); // [{id, title, items: []}]
  const [isAddingSection, setIsAddingSection] = useState(false);
  const [newSectionTitle, setNewSectionTitle] = useState("");

  // Visibility State for Dynamic Sections
  const [showLanguages, setShowLanguages] = useState(false);
  const [showCertifications, setShowCertifications] = useState(false);
  const [showAwards, setShowAwards] = useState(false);

  // Load existing data if editing
  useEffect(() => {
    if (id && token) {
      const fetchResume = async () => {
        try {
          const res = await fetch(`${import.meta.env.VITE_API_URL}/api/resumes/${id}`, {
          // const res = await fetch(`http://localhost:5000/api/resumes/${id}`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          if (!res.ok) throw new Error("Failed to load resume");
          const data = await res.json();
          
          setBasicInfo({ title: data.title, summary: data.content?.summary || "" });
          setContactInfo(data.content?.contact || { fullName: "", jobTitle: "", email: "", phone: "", linkedin: "", github: "" });
          setSkills(data.content?.skills || []);
          setEducation(data.content?.education || []);
          setProjects(data.content?.projects || []);
          setTemplate(data.template || "Modern");
          
          // Load Dynamic Sections
          if (data.content?.languages?.length > 0) {
              setLanguages(data.content.languages);
              setShowLanguages(true);
          }
          if (data.content?.certifications?.length > 0) {
              setCertifications(data.content.certifications);
              setShowCertifications(true);
          }
           if (data.content?.awards?.length > 0) {
              setAwards(data.content.awards);
              setShowAwards(true);
          }
          if (data.content?.customSections?.length > 0) {
              setCustomSections(data.content.customSections);
          }

        } catch (err) {
          setError(err.message);
        } finally {
          setInitialLoading(false);
        }
      };
      fetchResume();
    }
  }, [id, token]);

  // Handlers
  const handleBasicChange = (e) => setBasicInfo({ ...basicInfo, [e.target.name]: e.target.value });
  const handleContactChange = (field, value) => {
    if (field?.target) {
        setContactInfo({ ...contactInfo, [field.target.name]: field.target.value });
    } else {
        setContactInfo({ ...contactInfo, [field]: value });
    }
  };

  // Skill Handlers
  const addSkill = (skill) => setSkills([...skills, skill]);
  const removeSkill = (skill) => setSkills(skills.filter(s => s !== skill));

  // Education Handlers
  const addEducation = () => setEducation([...education, { degree: "", institution: "", startYear: "", endYear: "", description: "" }]);
  const removeEducation = (index) => setEducation(education.filter((_, i) => i !== index));
  const updateEducation = (index, field, value) => {
    const newEdu = [...education];
    newEdu[index] = { ...newEdu[index], [field]: value };
    setEducation(newEdu);
  };

  // Project Handlers
  const addProject = () => setProjects([...projects, { title: "", description: "", techStack: "", link: "" }]);
  const removeProject = (index) => setProjects(projects.filter((_, i) => i !== index));
  const updateProject = (index, field, value) => {
    const newProj = [...projects];
    newProj[index] = { ...newProj[index], [field]: value };
    setProjects(newProj);
  };

  // Dynamic Section Handlers (Reusable)
  const handleListChange = (setter, list, index, value) => {
      const newList = [...list];
      newList[index] = value;
      setter(newList);
  };
  const handleListAdd = (setter, list) => setter([...list, ""]);
  const handleListRemove = (setter, list, index) => setter(list.filter((_, i) => i !== index));

  // Custom Section Handlers
  const addCustomSection = () => {
      if (!newSectionTitle.trim()) return;
      const newSection = {
          id: Date.now(),
          title: newSectionTitle,
          items: [""]
      };
      setCustomSections([...customSections, newSection]);
      setNewSectionTitle("");
      setIsAddingSection(false);
  };

  const removeCustomSection = (id) => {
      setCustomSections(customSections.filter(s => s.id !== id));
  };

  const handleCustomItemChange = (sectionId, itemIndex, value) => {
      setCustomSections(customSections.map(s => {
          if (s.id === sectionId) {
              const newItems = [...s.items];
              newItems[itemIndex] = value;
              return { ...s, items: newItems };
          }
          return s;
      }));
  };

  const handleCustomItemAdd = (sectionId) => {
      setCustomSections(customSections.map(s => {
          if (s.id === sectionId) {
              return { ...s, items: [...s.items, ""] };
          }
          return s;
      }));
  };

  const handleCustomItemRemove = (sectionId, itemIndex) => {
      setCustomSections(customSections.map(s => {
          if (s.id === sectionId) {
              return { ...s, items: s.items.filter((_, i) => i !== itemIndex) };
          }
          return s;
      }));
  };

  // Submit Handler
  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    if (!basicInfo.title) {
      setError("Please key in a Resume Title");
      setLoading(false);
      return;
    }

    const payload = {
      title: basicInfo.title,
      template: template,
      content: {
        summary: basicInfo.summary,
        contact: contactInfo,
        skills,
        education,
        projects,
        languages: showLanguages ? languages : [],
        certifications: showCertifications ? certifications : [],
        awards: showAwards ? awards : [],
        customSections: customSections
      }
    };

    try {
        const url = id 
            ? `${import.meta.env.VITE_API_URL}/api/resumes/${id}` 
            : `${import.meta.env.VITE_API_URL}/api/resumes`;
            
        // const url = id 
        //     ? `http://localhost:5000/api/resumes/${id}` 
        //     : 'http://localhost:5000/api/resumes';
            
        const method = id ? 'PUT' : 'POST';

        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(payload)
        });

        const data = await response.text();
        const json = data ? JSON.parse(data) : {};

        if (!response.ok) {
            throw new Error(json.message || 'Failed to save resume');
        }

        toast.success(id ? "Resume updated successfully!" : "Resume created successfully!");
        navigate('/dashboard/my-resumes');
    } catch (err) {
        console.error(err);
        toast.error(err.message || "Failed to save resume.");
        setError(err.message || "Failed to save resume. Please try again.");
    } finally {
        setLoading(false);
    }
  };

  if (initialLoading) return <div className="p-8 text-center text-gray-500">Loading resume...</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-32">
      <div className="flex items-center justify-between">
        <div>
           <Link to="/dashboard/my-resumes" className="text-sm text-gray-400 hover:text-white transition-colors">← Back to My Resumes</Link>
           <h1 className="text-2xl font-bold text-gray-100 mt-1">{id ? 'Edit Resume' : 'Create New Resume'}</h1>
        </div>
        
        <button 
          onClick={handleSubmit} 
          disabled={loading}
          className="flex items-center gap-2 px-6 py-2.5 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-500 disabled:opacity-50 transition-all shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30"
        >
          {loading ? 'Saving...' : (
             <>
               <Save size={18} />
               {id ? 'Save Resume' : 'Create Resume'}
             </>
          )}
        </button>
      </div>

      {error && (
        <div className="bg-red-500/10 text-red-400 p-4 rounded-lg flex items-center gap-2 text-sm border border-red-500/20">
            <AlertCircle size={18} />
            {error}
        </div>
      )}

      {/* 1. Basic Info */}
      <section className="bg-[#1E1E2D] p-6 rounded-xl shadow-xl border border-white/5 space-y-4">
        <h2 className="text-lg font-semibold text-gray-100 border-b border-white/5 pb-2">1. Basic Information</h2>
        
        <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Resume Title (For your reference)</label>
            <input 
              type="text" 
              name="title"
              value={basicInfo.title}
              onChange={handleBasicChange}
              placeholder="e.g. Software Engineer Resume 2024" 
              className="w-full p-2.5 bg-[#151521] border border-white/5 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-white placeholder-gray-600"
            />
        </div>

        <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Professional Summary</label>
            <textarea 
              name="summary"
              value={basicInfo.summary}
              onChange={handleBasicChange}
              placeholder="Brief summary of your expertise..." 
              className="w-full p-2.5 h-32 bg-[#151521] border border-white/5 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none resize-none text-white placeholder-gray-600"
            ></textarea>
        </div>
      </section>

      {/* 2. Contact Info */}
      <section className="bg-[#1E1E2D] p-6 rounded-xl shadow-xl border border-white/5 space-y-4">
        <h2 className="text-lg font-semibold text-gray-100 border-b border-white/5 pb-2">2. Personal Details</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Full Name</label>
                <input 
                  type="text" 
                  name="fullName"
                  value={contactInfo.fullName || ""}
                  onChange={handleContactChange}
                  placeholder="John Doe" 
                  className="w-full p-2.5 bg-[#151521] border border-white/5 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-white placeholder-gray-600"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Job Title</label>
                <input 
                  type="text" 
                  name="jobTitle"
                  value={contactInfo.jobTitle || ""}
                  onChange={handleContactChange}
                  placeholder="Software Engineer" 
                  className="w-full p-2.5 bg-[#151521] border border-white/5 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-white placeholder-gray-600"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
                <input 
                  type="email" 
                  name="email"
                  value={contactInfo.email}
                  onChange={handleContactChange}
                  placeholder="you@example.com" 
                  className="w-full p-2.5 bg-[#151521] border border-white/5 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-white placeholder-gray-600"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Phone</label>
                <input 
                  type="tel" 
                  name="phone"
                  value={contactInfo.phone}
                  onChange={handleContactChange}
                  placeholder="+1 234 567 890" 
                  className="w-full p-2.5 bg-[#151521] border border-white/5 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-white placeholder-gray-600"
                />
            </div>
        </div>
        
        <SocialLinks values={contactInfo} onChange={handleContactChange} />
      </section>

      {/* 3. Skills */}
      <section className="bg-[#1E1E2D] p-6 rounded-xl shadow-xl border border-white/5">
        <h2 className="text-lg font-semibold text-gray-100 border-b border-white/5 pb-2 mb-4">3. Skills</h2>
        <SkillInput skills={skills} onAdd={addSkill} onRemove={removeSkill} />
      </section>
    
      {/* 4. Education */}
      <section className="bg-[#1E1E2D] p-6 rounded-xl shadow-xl border border-white/5">
        <EducationForm 
            education={education}
            onAdd={addEducation}
            onRemove={removeEducation}
            onChange={updateEducation}
        />
      </section>

      {/* 5. Projects */}
      <section className="bg-[#1E1E2D] p-6 rounded-xl shadow-xl border border-white/5">
        <ProjectForm 
            projects={projects}
            onAdd={addProject}
            onRemove={removeProject}
            onChange={updateProject}
        />
      </section>

      {/* Optional Sections */}
      {showLanguages && (
          <section className="bg-[#1E1E2D] p-6 rounded-xl shadow-xl border border-white/5 animate-in fade-in slide-in-from-bottom-2">
            <ListInput 
                title="Languages" 
                items={languages} 
                onItemChange={(i, v) => handleListChange(setLanguages, languages, i, v)}
                onItemAdd={() => handleListAdd(setLanguages, languages)}
                onItemRemove={(i) => handleListRemove(setLanguages, languages, i)}
                placeholder="e.g. English (Native)"
            />
            <button onClick={() => setShowLanguages(false)} className="text-sm text-red-400 mt-2 hover:underline">Remove Section</button>
          </section>
      )}

      {showCertifications && (
          <section className="bg-[#1E1E2D] p-6 rounded-xl shadow-xl border border-white/5 animate-in fade-in slide-in-from-bottom-2">
             <ListInput 
                title="Certifications" 
                items={certifications} 
                onItemChange={(i, v) => handleListChange(setCertifications, certifications, i, v)}
                onItemAdd={() => handleListAdd(setCertifications, certifications)}
                onItemRemove={(i) => handleListRemove(setCertifications, certifications, i)}
                placeholder="e.g. AWS Certified Solutions Architect"
            />
             <button onClick={() => setShowCertifications(false)} className="text-sm text-red-400 mt-2 hover:underline">Remove Section</button>
          </section>
      )}
      
      {showAwards && (
          <section className="bg-[#1E1E2D] p-6 rounded-xl shadow-xl border border-white/5 animate-in fade-in slide-in-from-bottom-2">
             <ListInput 
                title="Awards & Honors" 
                items={awards} 
                onItemChange={(i, v) => handleListChange(setAwards, awards, i, v)}
                onItemAdd={() => handleListAdd(setAwards, awards)}
                onItemRemove={(i) => handleListRemove(setAwards, awards, i)}
                 placeholder="e.g. Employee of the Month"
            />
             <button onClick={() => setShowAwards(false)} className="text-sm text-red-400 mt-2 hover:underline">Remove Section</button>
          </section>
      )}

      {/* Custom Sections */}
      {customSections.map((section) => (
          <section key={section.id} className="bg-[#1E1E2D] p-6 rounded-xl shadow-xl border border-white/5 animate-in fade-in slide-in-from-bottom-2 relative">
             <ListInput 
                title={section.title} 
                items={section.items} 
                onItemChange={(itemIndex, value) => handleCustomItemChange(section.id, itemIndex, value)}
                onItemAdd={() => handleCustomItemAdd(section.id)}
                onItemRemove={(itemIndex) => handleCustomItemRemove(section.id, itemIndex)}
                placeholder={`Add ${section.title} item...`}
            />
             <button 
                onClick={() => removeCustomSection(section.id)} 
                className="text-sm text-red-400 mt-2 hover:underline flex items-center gap-1"
            >
                <Trash2 size={14} /> Remove {section.title} Section
            </button>
          </section>
      ))}

      {/* Add Section Button Panel */}
      <div className="p-6 bg-[#151521] border-2 border-dashed border-white/5 rounded-xl text-center">
        <h3 className="text-gray-500 font-medium mb-4">Add More Sections</h3>
        <div className="flex flex-wrap justify-center gap-3">
             {!showLanguages && (
                <button 
                    onClick={() => setShowLanguages(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-[#1E1E2D] border border-white/5 rounded-lg shadow-sm hover:border-indigo-500/50 hover:text-indigo-400 text-gray-300 transition-all text-sm font-medium"
                >
                    <Plus size={16} /> Languages
                </button>
             )}
             {!showCertifications && (
                <button 
                    onClick={() => setShowCertifications(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-[#1E1E2D] border border-white/5 rounded-lg shadow-sm hover:border-indigo-500/50 hover:text-indigo-400 text-gray-300 transition-all text-sm font-medium"
                >
                    <Plus size={16} /> Certifications
                </button>
             )}
              {!showAwards && (
                <button 
                    onClick={() => setShowAwards(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-[#1E1E2D] border border-white/5 rounded-lg shadow-sm hover:border-indigo-500/50 hover:text-indigo-400 text-gray-300 transition-all text-sm font-medium"
                >
                    <Plus size={16} /> Awards
                </button>
             )}
             
             {/* Add Custom Section Button */}
             {isAddingSection ? (
                 <div className="flex items-center gap-2 animate-in fade-in">
                    <input 
                        type="text" 
                        value={newSectionTitle}
                        onChange={(e) => setNewSectionTitle(e.target.value)}
                        placeholder="Section Name (e.g. Hobbies)"
                        className="px-3 py-2 bg-[#151521] border border-indigo-500/50 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 text-white placeholder-gray-600 text-sm"
                        autoFocus
                        onKeyDown={(e) => e.key === 'Enter' && addCustomSection()}
                    />
                    <button 
                        onClick={addCustomSection}
                        className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500"
                    >
                        <Plus size={16} />
                    </button>
                    <button 
                        onClick={() => setIsAddingSection(false)}
                        className="p-2 text-gray-500 hover:bg-white/10 rounded-lg"
                    >
                        <X size={16} />
                    </button>
                 </div>
             ) : (
                <button 
                    onClick={() => setIsAddingSection(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-[#1E1E2D] border border-dashed border-indigo-500/30 text-indigo-400 rounded-lg shadow-sm hover:bg-indigo-500/10 transition-all text-sm font-medium"
                >
                    <Plus size={16} /> Custom Section
                </button>
             )}
        </div>
      </div>

      {/* Action Button Bottom */}
      <div className="flex justify-end pt-4">
        <button 
          onClick={handleSubmit} 
          disabled={loading}
          className="flex items-center gap-2 px-8 py-3 text-base font-medium text-white bg-indigo-600 rounded-xl hover:bg-indigo-500 disabled:opacity-50 transition-all shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30"
        >
          {loading ? 'Saving...' : (
             <>
               <Save size={20} />
               {id ? 'Save Resume' : 'Create Resume'}
             </>
          )}
        </button>
      </div>
    </div>
  );
};
export default CreateResume;
