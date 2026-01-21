import { useState, useEffect } from "react";
import { Search, Filter, Briefcase, Loader2 } from "lucide-react";
import JobCard from "../../components/jobs/JobCard";
import { getJobs } from "../../api/job.api";
import toast from "react-hot-toast";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Filter States
  const [keyword, setKeyword] = useState("");
  const [type, setType] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");
  const [minSalary, setMinSalary] = useState("");
  const [sort, setSort] = useState("newest");

  useEffect(() => {
    fetchJobs();
  }, []); // Initial load

  // Re-fetch when filters change (debouncing could be added for keyword, but button trigger is fine)
  useEffect(() => {
    fetchJobs();
  }, [type, experienceLevel, minSalary, sort]);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      // Build query string params
      const params = {
        keyword,
        ...(type && { type }),
        ...(experienceLevel && { experienceLevel }),
        ...(minSalary && { minSalary }),
        sort
      };
      
      const data = await getJobs(params);
      setJobs(data.jobs || []);
    } catch (error) {
      toast.error("Failed to load jobs");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchJobs();
  };

  const clearFilters = () => {
    setKeyword("");
    setType("");
    setExperienceLevel("");
    setMinSalary("");
    setSort("newest");
  };

  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Explore Jobs</h1>
          <p className="text-gray-500 mt-1">Find your next career opportunity.</p>
        </div>
      </div>

      {/* Filters & Search Section */}
      <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 space-y-4">
        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="Search by job title, company, or keywords..." 
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>
          <button 
            type="submit"
            className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm flex items-center justify-center gap-2"
          >
            Search
          </button>
        </form>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-4 pt-2 border-t border-gray-50">
          <div className="flex items-center gap-2 text-gray-500 text-sm font-medium">
            <Filter size={16} />
            Filters:
          </div>
          
          <select 
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Job Types</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
            <option value="Freelance">Freelance</option>
            <option value="Internship">Internship</option>
          </select>

          <select 
            value={experienceLevel}
            onChange={(e) => setExperienceLevel(e.target.value)}
            className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Experience Levels</option>
            <option value="Junior">Junior</option>
            <option value="Mid">Mid Level</option>
            <option value="Senior">Senior</option>
          </select>

          <select 
            value={minSalary}
            onChange={(e) => setMinSalary(e.target.value)}
            className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Min Salary</option>
            <option value="30000">$30,000+</option>
            <option value="50000">$50,000+</option>
            <option value="80000">$80,000+</option>
            <option value="100000">$100,000+</option>
            <option value="120000">$120,000+</option>
            <option value="150000">$150,000+</option>
          </select>

          <select 
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ml-auto"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="a-z">A-Z</option>
          </select>

          {(type || experienceLevel || minSalary || keyword) && (
            <button 
              onClick={clearFilters}
              className="text-sm text-red-500 hover:text-red-700 font-medium ml-2"
            >
              Clear All
            </button>
          )}
        </div>
      </div>

      {/* Jobs Grid */}
      {loading ? (
        <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-blue-600" size={40} />
        </div>
      ) : jobs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-xl border border-gray-100 border-dashed">
            <div className="inline-flex h-16 w-16 bg-gray-50 rounded-full items-center justify-center text-gray-400 mb-4">
                <Briefcase size={32} />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">No jobs found</h3>
            <p className="text-gray-500">Try adjusting your filters or search terms.</p>
            <button 
              onClick={clearFilters}
              className="mt-4 text-blue-600 hover:underline font-medium"
            >
              Clear Filters
            </button>
        </div>
      )}
    </div>
  );
};

export default Jobs;
