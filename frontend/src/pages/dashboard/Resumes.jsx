import React, { useState, useEffect } from 'react';
import DashboardNavbar from '../../components/layout/DashboardNavbar';
import ResumeCard from '../../components/ResumeCard';
import { Search, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import useDebounce from '../../hooks/useDebounce';

const Resumes = () => {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState('');
  const debouncedKeyword = useDebounce(keyword, 500);
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState({ total: 0, page: 1, pages: 1 });

  useEffect(() => {
    fetchResumes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedKeyword, page]);

  const fetchResumes = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`https://job-app-gl03.onrender.com/api/resumes?keyword=${debouncedKeyword}&page=${page}&limit=9`, {
      // const res = await fetch(`http://localhost:5000/api/resumes?keyword=${debouncedKeyword}&page=${page}&limit=9`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      const data = await res.json();
      if (res.ok) {
        setResumes(data.resumes);
        setMeta(data.meta);
      }
    } catch (error) {
      console.error('Error fetching resumes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this resume?')) return;
    try {
      const token = localStorage.getItem('token');
      await fetch(`https://job-app-gl03.onrender.com/api/resumes/${id}`, {
      // await fetch(`http://localhost:5000/api/resumes/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchResumes(); // Refresh
    } catch (error) {
      alert('Failed to delete resume');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <DashboardNavbar />
      <main className="flex-grow container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Resumes</h1>
            <p className="text-gray-500 mt-1">Manage and update your curriculum vitae.</p>
          </div>
          
          <div className="flex gap-3 w-full md:w-auto">
             <div className="relative flex-grow md:w-64">
              <input
                type="text"
                placeholder="Search resumes..."
                className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none w-full"
                value={keyword}
                onChange={(e) => {
                    setKeyword(e.target.value);
                    setPage(1);
                }}
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            
            <Link 
              to="/resumes/new"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium flex items-center hover:bg-blue-700 whitespace-nowrap"
            >
              <Plus className="h-5 w-5 mr-1" /> New Resume
            </Link>
          </div>
        </div>

        {loading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
             {[...Array(3)].map((_, i) => (
               <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-40 animate-pulse"></div>
             ))}
          </div>
        ) : (
          <>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
              {resumes.length > 0 ? resumes.map(resume => (
                <ResumeCard
                  key={resume._id}
                  resume={resume}
                  onDelete={handleDelete}
                />
              )) : (
                <div className="col-span-full py-12 text-center">
                  <div className="bg-white p-8 rounded-xl border border-gray-100 inline-block">
                    <p className="text-gray-500 mb-4">You haven't created any resumes yet.</p>
                    <Link to="/resumes/new" className="text-blue-600 font-semibold hover:underline">Create your first resume</Link>
                  </div>
                </div>
              )}
            </div>

            {/* Pagination */}
            {meta.pages > 1 && (
               <div className="flex justify-center items-center gap-4">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="p-2 border rounded-lg hover:bg-gray-100 disabled:opacity-50"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <span className="text-gray-600 font-medium">Page {page} of {meta.pages}</span>
                <button
                  onClick={() => setPage(p => Math.min(meta.pages, p + 1))}
                  disabled={page === meta.pages}
                  className="p-2 border rounded-lg hover:bg-gray-100 disabled:opacity-50"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default Resumes;
