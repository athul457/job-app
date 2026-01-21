import { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { Loader2, ArrowLeft, Download, PenSquare } from 'lucide-react';
import ModernTemplate from '../../components/templates/ModernTemplate';
import ProfessionalTemplate from '../../components/templates/ProfessionalTemplate';
import MinimalTemplate from '../../components/templates/MinimalTemplate';

const ViewResume = () => {
  const { id } = useParams();
  const { token } = useContext(AuthContext);
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const response = await fetch(`https://job-app-gl03.onrender.com/api/resumes/${id}`, {
        // const response = await fetch(`http://localhost:5000/api/resumes/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) throw new Error('Failed to fetch resume');
        const data = await response.json();
        setResume(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (token && id) fetchResume();
  }, [id, token]);

  if (loading) return <div className="flex justify-center p-12"><Loader2 className="animate-spin text-blue-600" /></div>;
  if (error) return <div className="p-8 text-red-600">Error: {error}</div>;
  if (!resume) return <div className="p-8">Resume not found</div>;

  // Transform backend data to template format
  const templateData = {
    personalInfo: {
      fullName: resume.content.contact?.fullName || 'Your Name', // Note: fullName wasn't in my CreateResume form! Need to fix that or use user name
      jobTitle: resume.content.contact?.jobTitle || '', // Also wasn't there
      email: resume.content.contact?.email,
      phone: resume.content.contact?.phone,
      linkedin: resume.content.contact?.linkedin,
      summary: resume.content.summary,
    },
    experience: resume.content.projects?.map(p => ({
        position: p.title,
        company: "Project", // reusing project as experience for now since my form had projects not experience
        startDate: "",
        endDate: "",
        description: p.description
    })) || [], // Mapping projects to experience for the template
    education: resume.content.education?.map(e => ({
        degree: e.degree,
        school: e.institution,
        location: "",
        graduationDate: `${e.startYear} - ${e.endYear}`
    })) || [],
    skills: resume.content.skills || []
  };

  const renderTemplate = () => {
    switch (resume.template?.toLowerCase()) {
      case 'professional': return <ProfessionalTemplate data={templateData} />;
      case 'minimal': return <MinimalTemplate data={templateData} />;
      default: return <ModernTemplate data={templateData} />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between no-print">
        <div className="flex items-center gap-4">
          <Link to="/dashboard/my-resumes" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
            <ArrowLeft size={18} /> Back
          </Link>
          <h1 className="text-2xl font-bold text-gray-800">{resume.title}</h1>
        </div>
        <div className="flex gap-3">
          <Link 
            to={`/dashboard/resume/${id}/edit`} 
            className="flex items-center gap-2 px-4 py-2 text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100"
          >
            <PenSquare size={18} /> Edit
          </Link>
          <button 
            onClick={() => window.print()} 
            className="flex items-center gap-2 px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700"
          >
            <Download size={18} /> PDF
          </button>
        </div>
      </div>

      <div className="border border-gray-200 shadow-lg rounded-xl overflow-hidden">
        {renderTemplate()}
      </div>
    </div>
  );
};

export default ViewResume;
