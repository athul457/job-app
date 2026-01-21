import React from 'react';

const MinimalTemplate = ({ data }) => {
  const { personalInfo, experience, education, skills } = data || {};

  return (
    <div className="w-full bg-white min-h-[1000px] p-12 shadow-lg text-gray-800 font-sans">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-5xl font-light mb-4 text-gray-900">{personalInfo?.fullName || 'Your Name'}</h1>
        <p className="text-xl text-gray-500 mb-6 font-light">{personalInfo?.jobTitle || 'Job Title'}</p>
        
        <div className="flex flex-col text-sm text-gray-500 space-y-1">
          {personalInfo?.email && <span>{personalInfo.email}</span>}
          {personalInfo?.phone && <span>{personalInfo.phone}</span>}
          {personalInfo?.location && <span>{personalInfo.location}</span>}
          {personalInfo?.linkedin && <span>{personalInfo.linkedin}</span>}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-8">
        {/* Left Column (Skills & Education if compact) */}
        <div className="col-span-1 border-t-2 border-black pt-4">
           {skills?.length > 0 && (
             <div className="mb-10">
               <h3 className="text-sm font-bold uppercase tracking-widest mb-4">Skills</h3>
               <ul className="space-y-2 text-sm">
                 {skills.map((skill, index) => (
                   <li key={index}>{skill}</li>
                 ))}
               </ul>
             </div>
           )}

           {education?.length > 0 && (
             <div>
               <h3 className="text-sm font-bold uppercase tracking-widest mb-4">Education</h3>
               <div className="space-y-6">
                 {education.map((edu, index) => (
                   <div key={index}>
                     <p className="font-bold text-sm">{edu.school}</p>
                     <p className="text-sm italic mb-1">{edu.degree}</p>
                     <p className="text-xs text-gray-500">{edu.graduationDate}</p>
                   </div>
                 ))}
               </div>
             </div>
           )}
        </div>

        {/* Right Column (Experience & Summary) */}
        <div className="col-span-3 border-t-2 border-black pt-4">
            {personalInfo?.summary && (
              <div className="mb-10">
                <h3 className="text-sm font-bold uppercase tracking-widest mb-4">About</h3>
                <p className="text-sm leading-7 text-gray-600 max-w-prose">{personalInfo.summary}</p>
              </div>
            )}

            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest mb-6">Experience</h3>
              <div className="space-y-10">
                {experience?.length > 0 ? experience.map((exp, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-baseline mb-2">
                       <h4 className="font-bold text-lg">{exp.position}</h4>
                       <span className="text-xs font-mono text-gray-500">{exp.startDate} — {exp.endDate || 'Present'}</span>
                    </div>
                    <p className="text-sm font-semibold text-gray-700 mb-2">{exp.company}</p>
                    <p className="text-sm leading-6 text-gray-600">{exp.description}</p>
                  </div>
                )) : <p className="text-sm text-gray-400">Add experience...</p>}
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default MinimalTemplate;
