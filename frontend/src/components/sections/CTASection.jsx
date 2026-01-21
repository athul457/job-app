import React from 'react';
import { Link } from 'react-router-dom';

const CTASection = () => {
    return (
        <section className="py-20 bg-[#151521]">
           <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
               <div className="bg-gradient-to-r from-indigo-900/50 to-purple-900/50 rounded-3xl p-10 md:p-16 text-center relative overflow-hidden shadow-2xl border border-white/10 backdrop-blur-sm">
                   {/* Background Elements */}
                   <div className="absolute top-0 right-0 -m-10 w-40 h-40 bg-indigo-500 rounded-full opacity-20 blur-3xl"></div>
                   <div className="absolute bottom-0 left-0 -m-10 w-40 h-40 bg-purple-500 rounded-full opacity-20 blur-3xl"></div>

                   <div className="relative z-10">
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                            Ready to Land Your Dream Job?
                        </h2>
                        <p className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto">
                            Join thousands of job seekers who act fast and get hired.
                        </p>
                        <Link 
                            to="/register" 
                            className="inline-block bg-white text-indigo-900 font-bold py-4 px-10 rounded-full hover:bg-gray-100 transition-transform hover:scale-105 shadow-xl shadow-black/20"
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
