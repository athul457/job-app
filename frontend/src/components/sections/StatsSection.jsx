import React from 'react';

const stats = [
  { id: 1, name: 'Resumes Created', value: '10,000+' },
  { id: 2, name: 'Jobs Available', value: '5,000+' },
  { id: 3, name: 'ATS Scans', value: '25,000+' },
  { id: 4, name: 'Active Users', value: '8,500+' },
];

const StatsSection = () => {
  return (
    <div className="bg-[#151521] py-16 border-y border-white/5 relative">
      <div className="absolute inset-0 bg-indigo-900/5 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 text-center">
          {stats.map((stat) => (
            <div key={stat.id}>
              <div className="text-4xl md:text-5xl font-extrabold text-white mb-2">
                {stat.value}
              </div>
              <div className="text-indigo-400 font-medium text-lg">
                {stat.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsSection;
