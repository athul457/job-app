import React, { useState } from 'react';
import { Briefcase, MapPin, Clock, CheckCircle } from 'lucide-react';
import { applyToJob } from '../api/job.api';

const JobCard = ({ job, resumes, onApplySuccess }) => {
  const [selectedResume, setSelectedResume] = useState('');
  const [isApplying, setIsApplying] = useState(false);
  const [showApplyModal, setShowApplyModal] = useState(false);

  const handleApply = async () => {
    if (!selectedResume) return alert('Please select a resume');
    
    setIsApplying(true);
    try {
      const token = localStorage.getItem('token');
      await applyToJob(job._id, selectedResume, token);
      alert('Application Submitted!');
      setShowApplyModal(false);
      if (onApplySuccess) onApplySuccess();
    } catch (error) {
      alert(error.message);
    } finally {
      setIsApplying(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900">{job.title}</h3>
          <p className="text-blue-600 font-medium">{job.company}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold
          ${job.experienceLevel === 'Senior' ? 'bg-purple-100 text-purple-700' : 
            job.experienceLevel === 'Mid' ? 'bg-blue-100 text-blue-700' : 
            'bg-green-100 text-green-700'}`}>
          {job.experienceLevel}
        </span>
      </div>

      <div className="flex space-x-4 text-gray-500 text-sm mb-4">
        <span className="flex items-center"><MapPin className="h-4 w-4 mr-1" /> {job.location}</span>
        <span className="flex items-center"><Clock className="h-4 w-4 mr-1" /> {new Date(job.createdAt).toLocaleDateString()}</span>
      </div>

      <p className="text-gray-600 mb-4 line-clamp-2">{job.description}</p>

      <div className="flex flex-wrap gap-2 mb-6">
        {job.skills.map((skill, idx) => (
          <span key={idx} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">{skill}</span>
        ))}
      </div>

      {showApplyModal ? (
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 animate-fadeIn">
          <label className="block text-sm font-medium text-gray-700 mb-2">Select Resume to Apply:</label>
          <select
            value={selectedResume}
            onChange={(e) => setSelectedResume(e.target.value)}
            className="w-full p-2 border rounded-md mb-3"
          >
             <option value="">-- Choose Resume --</option>
             {resumes.map(r => (
               <option key={r._id} value={r._id}>{r.title}</option>
             ))}
          </select>
          <div className="flex gap-2">
            <button
              onClick={handleApply}
              disabled={isApplying}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50"
            >
              {isApplying ? 'Sending...' : 'Confirm Application'}
            </button>
            <button
              onClick={() => setShowApplyModal(false)}
              className="text-gray-500 px-4 py-2 text-sm hover:text-gray-700"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setShowApplyModal(true)}
          className="w-full border border-blue-600 text-blue-600 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
        >
          Apply Now
        </button>
      )}
    </div>
  );
};

export default JobCard;
