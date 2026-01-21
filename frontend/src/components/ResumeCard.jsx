import React from 'react';
import { FileText, Calendar, ArrowRight, Trash2, Edit } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card } from './ui/Card';

const ResumeCard = ({ resume, onDelete, isDeleting }) => {
  return (
    <Card className="bg-[#1E1E2D] hover:shadow-2xl hover:shadow-indigo-500/10 hover:border-indigo-500/30 transition-all duration-300 group relative p-5 border border-white/5">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-indigo-500/10 rounded-xl text-indigo-400 group-hover:scale-110 transition-transform duration-300 shadow-inner shadow-indigo-500/20">
            <FileText className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-bold text-gray-200 line-clamp-1">{resume.title}</h3>
            <p className="text-xs text-gray-400 font-medium bg-[#151521] px-2 py-0.5 rounded-full inline-block mt-1 border border-white/5">
               {resume.template || 'Modern'} Template
            </p>
          </div>
        </div>
        
        <button 
             onClick={() => onDelete(resume._id)}
             disabled={isDeleting}
             className="text-gray-500 hover:text-red-400 hover:bg-red-500/10 p-2 rounded-lg transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
             title="Delete Resume"
        >
             <Trash2 className="h-4 w-4" />
        </button>
      </div>

      <div className="pt-4 border-t border-white/5 flex justify-between items-center">
        <span className="text-xs text-gray-500 flex items-center font-medium">
          <Calendar className="h-3.5 w-3.5 mr-1.5" />
          {new Date(resume.updatedAt).toLocaleDateString()}
        </span>
        
        <Link
          to={`/dashboard/create-resume/${resume._id}`} // Updated to use correct edit route
          className="text-sm font-medium text-indigo-400 hover:text-indigo-300 flex items-center gap-1 group/link"
        >
          Edit Resume <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
        </Link>
        <Link
          to={`/dashboard/resume/${resume._id}`}
          className="ml-3 text-sm font-medium text-blue-400 hover:text-blue-300 flex items-center gap-1 group/link"
        >
          View <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
        </Link>
      </div>
    </Card>
  );
};

export default ResumeCard;
