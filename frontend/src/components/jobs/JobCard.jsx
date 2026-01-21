import { MapPin, Briefcase, Clock, DollarSign, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Card from "../ui/Card";
import Button from "../ui/Button";

const JobCard = ({ job }) => {
  return (
    <Card className="bg-[#1E1E2D] hover:shadow-2xl hover:shadow-indigo-500/10 hover:border-indigo-500/30 transition-all duration-300 group flex flex-col h-full p-0 overflow-hidden border border-white/5">
      <div className="p-6 flex flex-col h-full">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-bold text-gray-200 group-hover:text-indigo-400 transition-colors mb-1 line-clamp-1">
              {job.title}
            </h3>
            <p className="text-sm font-medium text-gray-500">{job.company}</p>
          </div>
          <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 text-xs font-semibold rounded-full capitalize border border-indigo-500/20">
            {job.type}
          </span>
        </div>

        <div className="space-y-3 mb-6 flex-grow">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <MapPin size={16} className="text-gray-500" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <DollarSign size={16} className="text-gray-500" />
            <span>{job.salaryRange?.min} - {job.salaryRange?.max} {job.salaryRange?.currency}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Briefcase size={16} className="text-gray-500" />
            <span>{job.experienceLevel}</span>
          </div>
        </div>

        <Link to={`/dashboard/jobs/${job._id}`} className="mt-auto block">
          <Button variant="secondary" className="w-full bg-[#151521] text-gray-300 border-white/5 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600 justify-between">
            View Details
            <ArrowRight size={16} />
          </Button>
        </Link>
      </div>
    </Card>
  );
};

export default JobCard;
