import { useState, useEffect, useContext } from "react";
import { Search, Plus, AlertCircle, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";
import ResumeCard from "../../components/ResumeCard";
import Button from "../../components/ui/Button";

const MyResumes = () => {
  const { token } = useContext(AuthContext);
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  const fetchResumes = async () => {
    try {
      setLoading(true);
      const url = searchTerm 
        ? `http://localhost:5000/api/resumes?keyword=${searchTerm}` 
        : 'http://localhost:5000/api/resumes';
        
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const text = await response.text(); 
        const errData = text ? JSON.parse(text) : {};
        throw new Error(errData.message || 'Failed to fetch resumes');
      }

      const data = await response.json();
      setResumes(data.resumes || []); 
    } catch (err) {
      console.error(err);
      setError("Failed to load resumes.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchResumes();
    }
  }, [token]); 

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      fetchResumes();
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this resume?")) return;
    
    setDeletingId(id);
    try {
       const response = await fetch(`http://localhost:5000/api/resumes/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
       });

       if (!response.ok) throw new Error('Failed to delete');

       setResumes(resumes.filter(r => r._id !== id));
       toast.success("Resume deleted successfully");
    } catch (err) {
       toast.error("Error deleting resume");
    } finally {
        setDeletingId(null);
    }
  };

  if (loading && resumes.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="animate-spin text-blue-600" size={32} />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
            <h1 className="text-3xl font-bold text-gray-100 tracking-tight">My Resumes</h1>
            <p className="text-gray-400 mt-1">Manage and track your professional resumes.</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input 
                    type="text" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={handleSearch}
                    placeholder="Search resumes..." 
                    className="pl-10 pr-4 py-2.5 bg-[#1E1E2D] border border-white/5 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none w-full text-gray-200 placeholder-gray-600 transition-all"
                />
            </div>
            <Link to="/dashboard/new-resume">
                <Button className="h-full bg-indigo-600 hover:bg-indigo-500 text-white border-none shadow-lg shadow-indigo-500/20">
                    <Plus size={18} className="mr-2" />
                    New Resume
                </Button>
            </Link>
        </div>
      </div>

      {error && (
         <div className="bg-red-500/10 text-red-400 p-4 rounded-xl flex items-center gap-2 text-sm border border-red-500/20">
            <AlertCircle size={18} />
            {error}
         </div>
      )}

      {!loading && resumes.length === 0 ? (
        <div className="text-center py-20 bg-[#1E1E2D] rounded-2xl border border-dashed border-white/5">
           <div className="h-16 w-16 bg-[#151521] rounded-full flex items-center justify-center mx-auto mb-4 text-indigo-500 shadow-inner">
             <Plus size={32} />
           </div>
           <h3 className="text-lg font-bold text-gray-200 mb-2">No resumes found</h3>
           <p className="text-gray-500 text-sm mb-6 max-w-sm mx-auto">You haven't created any resumes yet. Start building your professional profile today.</p>
           <Link to="/dashboard/create-resume">
             <Button className="bg-indigo-600 hover:bg-indigo-500 border-none">Create First Resume</Button>
           </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {resumes.map((resume) => (
            <ResumeCard 
                key={resume._id} 
                resume={resume} 
                onDelete={handleDelete}
                isDeleting={deletingId === resume._id}
            />
          ))}
          
          {/* Add New Card (Inline option) */}
          <Link to="/dashboard/new-resume" className="group">
              <div className="h-full min-h-[180px] bg-[#1E1E2D] border-2 border-dashed border-white/5 rounded-2xl flex flex-col items-center justify-center text-gray-500 hover:border-indigo-500/50 hover:bg-indigo-500/5 hover:text-indigo-400 transition-all duration-300">
                  <Plus size={32} className="mb-2" />
                  <span className="font-medium">Create New Resume</span>
              </div>
          </Link>
        </div>
      )}
    </div>
  );
};

export default MyResumes;
