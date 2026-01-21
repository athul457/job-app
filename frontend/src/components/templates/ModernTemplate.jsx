import React from 'react';

const ModernTemplate = ({ data }) => {
  const { personalInfo, experience, education, skills } = data || {};

  return (
    <div className="w-full bg-white min-h-[1000px] flex shadow-lg">
      {/* Sidebar */}
      <div className="w-1/3 bg-gray-800 text-white p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold leading-tight">{personalInfo?.fullName || 'Your Name'}</h1>
          <p className="text-blue-400 mt-2 text-lg">{personalInfo?.jobTitle || 'Job Title'}</p>
        </div>

        <div className="mb-8">
          <h3 className="text-sm font-bold uppercase tracking-wider mb-4 border-b border-gray-600 pb-2">Contact</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            {personalInfo?.email && <li>{personalInfo.email}</li>}
            {personalInfo?.phone && <li>{personalInfo.phone}</li>}
            {personalInfo?.location && <li>{personalInfo.location}</li>}
            {personalInfo?.linkedin && <li>{personalInfo.linkedin}</li>}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider mb-4 border-b border-gray-600 pb-2">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {skills?.length > 0 ? skills.map((skill, index) => (
              <span key={index} className="bg-gray-700 px-2 py-1 rounded text-xs">{skill}</span>
            )) : <span className="text-gray-400 text-xs">Add your skills...</span>}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-2/3 p-8">
        {personalInfo?.summary && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 uppercase tracking-wider border-b-2 border-blue-500 pb-2 mb-4">Profile</h2>
            <p className="text-gray-600 leading-relaxed">{personalInfo.summary}</p>
          </div>
        )}

        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 uppercase tracking-wider border-b-2 border-blue-500 pb-2 mb-4">Experience</h2>
          <div className="space-y-6">
            {experience?.length > 0 ? experience.map((exp, index) => (
              <div key={index}>
                <h3 className="font-bold text-lg text-gray-800">{exp.position}</h3>
                <div className="flex justify-between text-sm text-blue-600 mb-2">
                  <span>{exp.company}</span>
                  <span>{exp.startDate} - {exp.endDate || 'Present'}</span>
                </div>
                <p className="text-gray-600 text-sm">{exp.description}</p>
              </div>
            )) : <p className="text-gray-400 italic">No experience listed</p>}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold text-gray-800 uppercase tracking-wider border-b-2 border-blue-500 pb-2 mb-4">Education</h2>
          <div className="space-y-4">
            {education?.length > 0 ? education.map((edu, index) => (
              <div key={index}>
                <h3 className="font-bold text-gray-800">{edu.degree}</h3>
                <div className="text-sm text-gray-600">
                  <span>{edu.school}, {edu.location}</span>
                  <span className="block text-gray-500 text-xs mt-1">{edu.graduationDate}</span>
                </div>
              </div>
            )) : <p className="text-gray-400 italic">No education listed</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernTemplate;
