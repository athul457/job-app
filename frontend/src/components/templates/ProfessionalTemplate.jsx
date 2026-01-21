import React from 'react';

const ProfessionalTemplate = ({ data }) => {
  const { personalInfo, experience, education, skills } = data || {};

  return (
    <div className="w-full bg-white min-h-[1000px] p-10 shadow-lg text-gray-900 font-serif">
      {/* Header */}
      <div className="text-center border-b-2 border-gray-300 pb-6 mb-8">
        <h1 className="text-4xl font-bold uppercase tracking-wide mb-2">{personalInfo?.fullName || 'Your Name'}</h1>
        <p className="text-lg text-gray-600 mb-4">{personalInfo?.jobTitle || 'Professional Title'}</p>
        <div className="flex justify-center flex-wrap gap-4 text-sm text-gray-500">
          {personalInfo?.email && <span>{personalInfo.email}</span>}
          {personalInfo?.phone && <span>| {personalInfo.phone}</span>}
          {personalInfo?.location && <span>| {personalInfo.location}</span>}
          {personalInfo?.linkedin && <span>| {personalInfo.linkedin}</span>}
        </div>
      </div>

      {/* Summary */}
      {personalInfo?.summary && (
        <div className="mb-8">
          <h2 className="text-lg font-bold uppercase border-b border-gray-400 mb-3 pb-1">Professional Summary</h2>
          <p className="text-sm leading-relaxed">{personalInfo.summary}</p>
        </div>
      )}

      {/* Experience */}
      <div className="mb-8">
        <h2 className="text-lg font-bold uppercase border-b border-gray-400 mb-4 pb-1">Experience</h2>
        <div className="space-y-6">
          {experience?.length > 0 ? experience.map((exp, index) => (
            <div key={index}>
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="font-bold text-md">{exp.company}</h3>
                <span className="text-sm text-gray-600 italic">{exp.location}</span>
              </div>
              <div className="flex justify-between items-baseline mb-2">
                <span className="text-sm font-semibold italic">{exp.position}</span>
                <span className="text-sm text-gray-600">{exp.startDate} – {exp.endDate || 'Present'}</span>
              </div>
              <p className="text-sm text-gray-800 leading-snug">{exp.description}</p>
            </div>
          )) : <p className="text-sm text-gray-500 italic">Add your professional experience here.</p>}
        </div>
      </div>

      {/* Education */}
      <div className="mb-8">
        <h2 className="text-lg font-bold uppercase border-b border-gray-400 mb-4 pb-1">Education</h2>
        <div className="space-y-4">
          {education?.length > 0 ? education.map((edu, index) => (
            <div key={index} className="flex justify-between">
              <div>
                <h3 className="font-bold text-sm">{edu.school}</h3>
                <p className="text-sm italic">{edu.degree}</p>
              </div>
              <div className="text-right">
                 <span className="text-sm text-gray-600 block">{edu.location}</span>
                 <span className="text-sm text-gray-600 block">{edu.graduationDate}</span>
              </div>
            </div>
          )) : <p className="text-sm text-gray-500 italic">Add your education here.</p>}
        </div>
      </div>

      {/* Skills */}
      <div>
        <h2 className="text-lg font-bold uppercase border-b border-gray-400 mb-4 pb-1">Key Skills</h2>
        <div className="text-sm leading-relaxed">
            {skills?.length > 0 ? skills.join(' • ') : <span className="text-gray-500 italic">List your key skills here.</span>}
        </div>
      </div>
    </div>
  );
};

export default ProfessionalTemplate;
