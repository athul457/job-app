import React from 'react';
import { FileEdit, Cpu, ScanSearch, CheckCircle2 } from 'lucide-react';
import FeatureCard from '../FeatureCard';

const features = [
  {
    icon: FileEdit,
    title: 'Smart Resume Builder',
    description: 'Build professional, ATS-friendly resumes in minutes with our drag-and-drop templates designed by experts.'
  },
  {
    icon: Cpu,
    title: 'AI Keyword Generator',
    description: 'Automatically extract and inject high-value keywords from job descriptions to beat the ATS bots.'
  },
  {
    icon: ScanSearch,
    title: 'Resume Analyzer',
    description: 'Get an instant match score between your resume and target job. Identify gaps and fix them before applying.'
  },
  {
    icon: CheckCircle2,
    title: 'One-Click Apply',
    description: 'Streamline your job search. Apply to multiple positions directly from your dashboard with verified documents.'
  }
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 bg-[#151521] relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[10%] left-[5%] w-72 h-72 bg-indigo-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-[10%] right-[5%] w-72 h-72 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-indigo-400 font-semibold tracking-wide uppercase text-sm mb-3">Our Features</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">Everything You Need to Get Hired</h3>
          <p className="text-lg text-gray-400">
            A complete toolkit designed to give you a competitive edge in today's job market.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
