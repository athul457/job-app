import { MapPin, Briefcase, Clock, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";

/**
 * JobCard Component
 * Displays a summary of a job listing.
 * Props:
 * - job: Object containing job details (title, company, type, location, salary, experienceLevel, _id)
 */
const JobCard = ({ job }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all flex flex-col h-full group">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
            {job.title}
          </h3>
          <p className="text-gray-600 font-medium">{job.company}</p>
        </div>
        <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-semibold rounded-full capitalize">
          {job.type}
        </span>
      </div>

      <div className="space-y-2 mb-6 text-sm text-gray-500 flex-grow">
        <div className="flex items-center gap-2">
          <MapPin size={16} className="text-gray-400" />
          <span>{job.location}</span>
        </div>
        <div className="flex items-center gap-2">
          <DollarSign size={16} className="text-gray-400" />
          <span>{job.salaryRange?.min} - {job.salaryRange?.max} {job.salaryRange?.currency}</span>
        </div>
        <div className="flex items-center gap-2">
          <Briefcase size={16} className="text-gray-400" />
          <span>{job.experienceLevel}</span>
        </div>
      </div>

      <Link
        to={`/dashboard/jobs/${job._id}`}
        className="w-full block text-center py-2.5 bg-gray-50 text-gray-700 font-medium rounded-lg hover:bg-gray-100 transition-colors group-hover:bg-blue-600 group-hover:text-white"
      >
        View Details
      </Link>
    </div>
  );
};

export default JobCard;
