import { useState, useEffect, useContext } from "react";
import { Search, Edit, Eye, Trash2, Plus, AlertCircle, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";

/**
 * MyResumes Page
 * Integrates with Sidebar: Accessed via "My Resumes" link.
 * Purpose: Lists all user resumes with options to search, view, edit, or delete.
 * Fetches real data from /api/resumes.
 */
const MyResumes = () => {
  const { token } = useContext(AuthContext);
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

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
        const text = await response.text(); // safe read
        const errData = text ? JSON.parse(text) : {};
        throw new Error(errData.message || 'Failed to fetch resumes');
      }

      const data = await response.json();
      // Backend returns { resumes: [], meta: {} }
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
  }, [token]); // Initial load

  // Debounced search could be better, but triggering on enter or button is simpler for now.
  // We'll simplisticly just filter client side for instant feedback if list is small, 
  // or re-fetch if we want real server search.
  // Given the backend has ?keyword=..., let's simple re-fetch on search button click or Enter.
  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      fetchResumes();
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this resume?")) return;
    
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
       alert("Error deleting resume");
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric'
    });
  };

  if (loading && resumes.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="animate-spin text-blue-600" size={32} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-800">My Resumes</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleSearch}
            placeholder="Search resumes (Press Enter)..." 
            className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none w-full md:w-64"
          />
        </div>
      </div>

      {error && (
         <div className="bg-red-50 text-red-600 p-4 rounded-lg flex items-center gap-2 text-sm">
            <AlertCircle size={18} />
            {error}
         </div>
      )}

      {!loading && resumes.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
           <div className="h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3 text-gray-400">
             <Plus size={24} />
           </div>
           <h3 className="text-gray-900 font-medium mb-1">No resumes found</h3>
           <p className="text-gray-500 text-sm mb-4">Create your first professional resume today.</p>
           <Link to="/dashboard/create-resume" className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
             Create Resume
           </Link>
        </div>
      ) : (
        <div className="grid gap-4">
          {resumes.map((resume) => (
            <div key={resume._id} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4 w-full md:w-auto">
                <div className="h-12 w-12 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 font-bold shrink-0">
                  CV
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">{resume.title}</h3>
                  <p className="text-sm text-gray-500">
                     {resume.template} • Last updated {formatDate(resume.updatedAt)}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 w-full md:w-auto justify-end">
                <Link 
                  to={`/dashboard/resume/${resume._id}`}
                  className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors" 
                  title="View"
                >
                  <Eye size={18} />
                </Link>
                <Link 
                  to={`/dashboard/resume/${resume._id}/edit`}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" 
                  title="Edit"
                >
                  <Edit size={18} />
                </Link>
                <button 
                  onClick={() => handleDelete(resume._id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" 
                  title="Delete"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyResumes;
