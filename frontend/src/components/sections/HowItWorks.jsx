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
    <section id="how-it-works" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
           <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">How It Works</h2>
           <p className="text-lg text-slate-600 max-w-2xl mx-auto">Your journey to a better career in four simple steps.</p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div key={step.id} className="text-center relative group">
               <div className="w-16 h-16 mx-auto bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 text-xl font-bold mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                 {step.id}
               </div>
               <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
               <p className="text-slate-600 text-sm leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
