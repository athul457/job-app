import React from 'react';
import { FileText, Calendar, ArrowRight, Trash2, Edit } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card } from './ui/Card';

const ResumeCard = ({ resume, onDelete, isDeleting }) => {
  return (
    <Card className="hover:shadow-lg hover:border-blue-100 transition-all duration-300 group relative p-5">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-blue-50 rounded-xl text-blue-600 group-hover:scale-110 transition-transform duration-300">
            <FileText className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 line-clamp-1">{resume.title}</h3>
            <p className="text-xs text-gray-500 font-medium bg-gray-100 px-2 py-0.5 rounded-full inline-block mt-1">
               {resume.template || 'Modern'} Template
            </p>
          </div>
        </div>
        
        <button 
             onClick={() => onDelete(resume._id)}
             disabled={isDeleting}
             className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
             title="Delete Resume"
        >
             <Trash2 className="h-4 w-4" />
        </button>
      </div>

      <div className="pt-4 border-t border-gray-50 flex justify-between items-center">
        <span className="text-xs text-gray-400 flex items-center font-medium">
          <Calendar className="h-3.5 w-3.5 mr-1.5" />
          {new Date(resume.updatedAt).toLocaleDateString()}
        </span>
        
        <Link
          to={`/dashboard/create-resume/${resume._id}`} // Updated to use correct edit route
          className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1 group/link"
        >
          Edit Resume <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
        </Link>
        <Link
          to={`/dashboard/resume/${resume._id}`}
          className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-700 flex items-center gap-1 group/link"
        >
          View <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
        </Link>
      </div>
    </Card>
  );
};

export default ResumeCard;
