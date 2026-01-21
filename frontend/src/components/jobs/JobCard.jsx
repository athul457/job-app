import { MapPin, Briefcase, Clock, DollarSign, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Card from "../ui/Card";
import Button from "../ui/Button";

const JobCard = ({ job }) => {
  return (
    <Card className="hover:shadow-lg hover:border-blue-100 transition-all duration-300 group flex flex-col h-full p-0 overflow-hidden border-gray-100">
      <div className="p-6 flex flex-col h-full">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-1 line-clamp-1">
              {job.title}
            </h3>
            <p className="text-sm font-medium text-gray-500">{job.company}</p>
          </div>
          <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full capitalize border border-blue-100">
            {job.type}
          </span>
        </div>

        <div className="space-y-3 mb-6 flex-grow">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <MapPin size={16} className="text-gray-400" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <DollarSign size={16} className="text-gray-400" />
            <span>{job.salaryRange?.min} - {job.salaryRange?.max} {job.salaryRange?.currency}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Briefcase size={16} className="text-gray-400" />
            <span>{job.experienceLevel}</span>
          </div>
        </div>

        <Link to={`/dashboard/jobs/${job._id}`} className="mt-auto block">
          <Button variant="secondary" className="w-full group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 justify-between">
            View Details
            <ArrowRight size={16} />
          </Button>
        </Link>
      </div>
    </Card>
  );
};

export default JobCard;
