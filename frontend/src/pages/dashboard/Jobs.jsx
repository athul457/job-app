import { useState, useEffect } from "react";
import { Search, Filter, Briefcase, Loader2, X } from "lucide-react";
import JobCard from "../../components/jobs/JobCard";
import { getJobs } from "../../api/job.api";
import toast from "react-hot-toast";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Card from "../../components/ui/Card";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Filter States
  const [keyword, setKeyword] = useState("");
  const [type, setType] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");
  const [minSalary, setMinSalary] = useState("");
  const [sort, setSort] = useState("newest");
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  useEffect(() => {
    fetchJobs();
  }, []); // Initial load

  useEffect(() => {
    fetchJobs();
  }, [type, experienceLevel, minSalary, sort]);

  const fetchJobs = async () => {
    setLoading(true);
    try {
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

  const hasFilters = type || experienceLevel || minSalary || keyword;

  return (
    <div className="space-y-6 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-100 tracking-tight">Explore Jobs</h1>
          <p className="text-gray-400 mt-1">Discover your next career opportunity from thousands of listings.</p>
        </div>
      </div>

      {/* Filters & Search Section */}
      <Card className="p-5 border border-white/5 shadow-xl bg-[#1E1E2D]">
        <div className="flex flex-col md:flex-row gap-4 items-center">
             <div className="flex-1 w-full relative">
                <Search className="absolute left-3 top-3 text-gray-500" size={20} />
                <input 
                  type="text" 
                  placeholder="Search by job title, company, or keywords..." 
                  className="w-full pl-10 pr-4 py-2.5 bg-[#151521] border border-white/5 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-[#151521] text-gray-200 placeholder-gray-600 transition-all"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && fetchJobs()}
                />
             </div>
             <div className="flex items-center gap-3 w-full md:w-auto">
                 <Button onClick={fetchJobs} className="flex-1 md:flex-none bg-indigo-600 hover:bg-indigo-500 text-white border-none shadow-lg shadow-indigo-500/20">Search</Button>
                 <Button 
                    variant="secondary" 
                    className="flex items-center gap-2 md:hidden bg-[#151521] text-gray-300 border-white/5 hover:bg-white/5"
                    onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                 >
                    <Filter size={18} /> Filters
                 </Button>
             </div>
        </div>

        {/* Desktop & Mobile Filters Area */}
        <div className={`
             mt-4 pt-4 border-t border-white/5 flex flex-col md:flex-row flex-wrap items-center gap-4
             ${isFiltersOpen ? 'flex' : 'hidden md:flex'}
        `}>
             <div className="flex items-center gap-2 text-gray-400 text-sm font-medium mr-2">
                <Filter size={16} /> Filters:
             </div>
             
             <div className="grid grid-cols-2 md:flex gap-3 w-full md:w-auto">
                 <select 
                   value={type}
                   onChange={(e) => setType(e.target.value)}
                   className="px-4 py-2 bg-[#151521] border border-white/5 rounded-lg text-sm text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:bg-white/5 transition-colors cursor-pointer"
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
                   className="px-4 py-2 bg-[#151521] border border-white/5 rounded-lg text-sm text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:bg-white/5 transition-colors cursor-pointer"
                 >
                   <option value="">Experience Level</option>
                   <option value="Junior">Junior</option>
                   <option value="Mid">Mid Level</option>
                   <option value="Senior">Senior</option>
                 </select>

                 <select 
                   value={minSalary}
                   onChange={(e) => setMinSalary(e.target.value)}
                   className="px-4 py-2 bg-[#151521] border border-white/5 rounded-lg text-sm text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:bg-white/5 transition-colors cursor-pointer"
                 >
                   <option value="">Min Salary</option>
                   <option value="30000">$30k+</option>
                   <option value="50000">$50k+</option>
                   <option value="80000">$80k+</option>
                   <option value="100000">$100k+</option>
                   <option value="120000">$120k+</option>
                   <option value="150000">$150k+</option>
                 </select>
             </div>

             <div className="flex items-center gap-3 ml-auto w-full md:w-auto justify-end">
                  <select 
                   value={sort}
                   onChange={(e) => setSort(e.target.value)}
                   className="px-4 py-2 bg-[#151521] border border-white/5 rounded-lg text-sm font-medium text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                  >
                   <option value="newest">Newest First</option>
                   <option value="oldest">Oldest First</option>
                   <option value="a-z">A-Z</option>
                  </select>

                 {hasFilters && (
                    <button 
                      onClick={clearFilters}
                      className="text-sm text-red-400 hover:text-red-300 font-medium flex items-center gap-1 hover:bg-red-500/10 px-3 py-2 rounded-lg transition-colors"
                    >
                      <X size={16} /> Clear
                    </button>
                  )}
             </div>
        </div>
      </Card>

      {/* Jobs Grid */}
      {loading ? (
        <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-indigo-500" size={40} />
        </div>
      ) : jobs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
          {jobs.map((job) => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-[#1E1E2D] rounded-2xl border border-dashed border-white/5">
            <div className="inline-flex h-20 w-20 bg-[#151521] rounded-full items-center justify-center text-gray-600 mb-4 shadow-inner">
                <Briefcase size={40} />
            </div>
            <h3 className="text-xl font-bold text-gray-200">No jobs found</h3>
            <p className="text-gray-500 mt-2 max-w-sm mx-auto">We couldn't find any jobs matching your current filters. Try adjusting them or searching for something else.</p>
            <Button 
              onClick={clearFilters}
              variant="secondary"
              className="mt-6 bg-[#151521] text-gray-300 border-white/5 hover:bg-white/5"
            >
              Clear All Filters
            </Button>
        </div>
      )}
    </div>
  );
};

export default Jobs;
