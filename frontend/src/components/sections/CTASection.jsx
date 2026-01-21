import React from 'react';
import { Link } from 'react-router-dom';

const CTASection = () => {
    return (
        <section className="py-20 bg-white">
           <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
               <div className="bg-slate-900 rounded-3xl p-10 md:p-16 text-center relative overflow-hidden shadow-2xl">
                   {/* Background Elements */}
                   <div className="absolute top-0 right-0 -m-10 w-40 h-40 bg-indigo-500 rounded-full opacity-20 blur-2xl"></div>
                   <div className="absolute bottom-0 left-0 -m-10 w-40 h-40 bg-blue-500 rounded-full opacity-20 blur-2xl"></div>

                   <div className="relative z-10">
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                            Ready to Land Your Dream Job?
                        </h2>
                        <p className="text-lg text-slate-300 mb-10 max-w-2xl mx-auto">
                            Join thousands of job seekers who act fast and get hired.
                        </p>
                        <Link 
                            to="/register" 
                            className="inline-block bg-indigo-600 text-white font-bold py-4 px-10 rounded-full hover:bg-indigo-700 transition-transform hover:scale-105 shadow-lg"
                        >
                            Create Free Account
                        </Link>
                   </div>
               </div>
           </div>
        </section>
    );
};

export default CTASection;
