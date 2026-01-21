import React from 'react';

const steps = [
  { 
    id: 1, 
    title: 'Create Your Profile', 
    description: 'Sign up securely and set up your professional dashboard.' 
  },
  { 
    id: 2, 
    title: 'Build or Upload', 
    description: 'Use our smart builder to create a resume or upload your existing one.' 
  },
  { 
    id: 3, 
    title: 'Optimize with AI', 
    description: 'Analyze your resume against job descriptions to increase your match score.' 
  },
  { 
    id: 4, 
    title: 'Apply & Track', 
    description: 'Apply to jobs directly and track your application status in real-time.' 
  }
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 bg-[#151521] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
           <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">How It Works</h2>
           <p className="text-lg text-gray-400 max-w-2xl mx-auto">Your journey to a better career in four simple steps.</p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div key={step.id} className="text-center relative group">
               <div className="w-16 h-16 mx-auto bg-[#1E1E2D] border border-white/10 rounded-full flex items-center justify-center text-indigo-400 text-xl font-bold mb-6 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-500 transition-all duration-300 shadow-lg shadow-black/20 group-hover:shadow-indigo-500/20">
                 {step.id}
               </div>
               <h3 className="text-xl font-bold text-white mb-3 group-hover:text-indigo-300 transition-colors">{step.title}</h3>
               <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
