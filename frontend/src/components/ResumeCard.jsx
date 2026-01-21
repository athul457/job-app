import React from 'react';
import { FileText, Calendar, ArrowRight, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const ResumeCard = ({ resume, onDelete }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group relative">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
            <FileText className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 line-clamp-1">{resume.title}</h3>
            <p className="text-xs text-gray-500 uppercase tracking-wide">{resume.template} Template</p>
          </div>
        </div>
        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
           <button 
             onClick={() => onDelete(resume._id)}
             className="text-red-500 hover:bg-red-50 p-1.5 rounded"
             title="Delete Resume"
           >
             <Trash2 className="h-4 w-4" />
           </button>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-50 flex justify-between items-center text-sm">
        <span className="text-gray-500 flex items-center">
          <Calendar className="h-4 w-4 mr-1.5" />
          {new Date(resume.updatedAt).toLocaleDateString()}
        </span>
        
        <Link 
          to={`/resumes/${resume._id}/edit`} // Assuming edit route or view
          className="text-blue-600 font-medium flex items-center hover:underline"
        >
          View / Edit <ArrowRight className="h-4 w-4 ml-1" />
        </Link>
      </div>
    </div>
  );
};

export default ResumeCard;
