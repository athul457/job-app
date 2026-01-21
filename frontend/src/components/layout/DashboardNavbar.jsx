import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Briefcase } from 'lucide-react';
import useAuth from '../../hooks/useAuth';

const DashboardNavbar = () => {
    const { user, logout } = useAuth();
    
    return (
        <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Left Side: Back to Home & Brand */}
                    <div className="flex items-center gap-6">
                        <Link to="/" className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors group">
                            <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
                            <span className="font-medium">Back to Home</span>
                        </Link>
                        
                        <div className="h-6 w-px bg-gray-200 hidden sm:block"></div>
                        
                        <Link to="/dashboard" className="flex items-center gap-2">
                             <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
                                <Briefcase className="h-5 w-5" />
                             </div>
                             <span className="text-xl font-bold text-slate-900 tracking-tight hidden sm:block">JobReady</span>
                        </Link>
                    </div>

                    {/* Right Side: User Profile */}
                    <div className="flex items-center gap-4">
                        {user && (
                           <div className="flex items-center gap-3">
                                <div className="text-right hidden md:block">
                                    <p className="text-sm font-bold text-slate-900 leading-none">{user.name}</p>
                                    <p className="text-xs text-slate-500 mt-1">{user.role === 'admin' ? 'Administrator' : 'User'}</p>
                                </div>
                                
                                <div className="group relative">
                                    <button className="w-9 h-9 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold border-2 border-transparent hover:border-indigo-200 transition-all">
                                        {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                                    </button>
                                    
                                    {/* Dropdown Menu */}
                                    <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all transform origin-top-right">
                                        <div className="py-2">
                                            <div className="px-4 py-2 border-b border-gray-100 md:hidden">
                                                <p className="text-sm font-bold text-slate-900">{user.name}</p>
                                                <p className="text-xs text-slate-500">{user.email}</p>
                                            </div>
                                            
                                            {user.role === 'admin' && (
                                                <Link to="/admin" className="block px-4 py-2 text-sm text-slate-700 hover:bg-indigo-50 hover:text-indigo-600">
                                                    Admin Dashboard
                                                </Link>
                                            )}
                                            <Link to="/dashboard" className="block px-4 py-2 text-sm text-slate-700 hover:bg-indigo-50 hover:text-indigo-600">
                                                My Dashboard
                                            </Link>
                                            <div className="h-px bg-gray-100 my-1"></div>
                                            <button 
                                                onClick={logout}
                                                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                                            >
                                                Log Out
                                            </button>
                                        </div>
                                    </div>
                                </div>
                           </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default DashboardNavbar;
