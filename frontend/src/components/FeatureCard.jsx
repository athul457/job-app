import React from 'react';

const FeatureCard = ({ icon: Icon, title, description }) => {
  return (
    <div className="bg-[#1E1E2D] p-8 rounded-2xl shadow-xl border border-white/5 hover:border-indigo-500/30 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 hover:-translate-y-1 group">
      <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-[#151521] text-indigo-400 border border-white/5 mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
        <Icon className="h-7 w-7" />
      </div>
      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-indigo-300 transition-colors">{title}</h3>
      <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
        {description}
      </p>
    </div>
  );
};

export default FeatureCard;
