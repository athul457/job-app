import React from 'react';
import { Link } from 'react-router-dom';
import Antigravity from '../ui/Antigravity';
import { FileText, Cpu, Briefcase, Search, Award, CheckCircle2 } from 'lucide-react';

const HeroSection = () => {
    return (
        <section className="bg-white pt-20 pb-20 lg:pt-32 lg:pb-28 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
                    {/* Left Content */}
                    <div className="max-w-2xl relative z-10 pointer-events-none">
                         {/* Enable pointer events for links */}
                        <div className="pointer-events-auto">
                            <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-6">
                                Master Your Career with <span className="text-indigo-600">AI Intelligence</span>
                            </h1>
                            <p className="text-lg text-slate-600 mb-8 max-w-lg leading-relaxed">
                                Create ATS-optimized resumes, analyze job descriptions, and apply with confidence using our advanced AI tools. Join thousands of professionals today.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link 
                                    to="/register" 
                                    className="inline-flex justify-center items-center py-4 px-8 text-base font-semibold text-white rounded-full bg-indigo-600 hover:bg-indigo-700 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
                                >
                                    Get Started
                                </Link>
                                <Link 
                                    to="/login" 
                                    className="inline-flex justify-center items-center py-4 px-8 text-base font-semibold text-slate-700 bg-white border border-slate-200 rounded-full hover:bg-slate-50 transition-all"
                                >
                                    Log In
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Right Interactive Antigravity Area */}
                    <div className="relative h-96 w-full flex items-center justify-center">
                         <div className="absolute top-0 right-0 -z-10 bg-indigo-50 w-[120%] h-[120%] rounded-full blur-3xl opacity-50 translate-x-1/4 -translate-y-1/4"></div>
                         
                         <Antigravity className="w-full h-full">
                            {/* Floating Elements (Icons representing the platform) */}
                            {/* Note: They start invisible and fade in via the Antigravity comp logic */}
                            
                            <div className="gravity-item absolute top-0 left-0 bg-white p-4 rounded-2xl shadow-xl border border-indigo-100 text-indigo-600 select-none cursor-move">
                                <FileText className="w-8 h-8" />
                            </div>
                            
                            <div className="gravity-item absolute top-0 left-0 bg-slate-900 p-4 rounded-2xl shadow-xl border border-slate-700 text-white select-none cursor-move">
                                <Cpu className="w-8 h-8" />
                            </div>
                            
                            <div className="gravity-item absolute top-0 left-0 bg-white p-4 rounded-2xl shadow-xl border border-indigo-100 text-blue-600 select-none cursor-move">
                                <Search className="w-8 h-8" />
                            </div>

                             <div className="gravity-item absolute top-0 left-0 bg-indigo-600 p-4 rounded-2xl shadow-xl border border-indigo-500 text-white select-none cursor-move">
                                <Briefcase className="w-8 h-8" />
                            </div>
                            
                            <div className="gravity-item absolute top-0 left-0 bg-white p-4 rounded-2xl shadow-xl border border-indigo-100 text-orange-500 select-none cursor-move">
                                <Award className="w-8 h-8" />
                            </div>

                             <div className="gravity-item absolute top-0 left-0 bg-white p-4 rounded-2xl shadow-xl border border-indigo-100 text-green-500 select-none cursor-move">
                                <CheckCircle2 className="w-8 h-8" />
                            </div>

                         </Antigravity>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
