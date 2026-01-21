import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, LayoutDashboard, LogIn, UserPlus } from 'lucide-react';
import useAuth from '../../hooks/useAuth';

const Navbar = () => {
    const { user, logout } = useAuth();
    
    return (
        <nav className="sticky top-0 z-50 bg-[#151521]/90 backdrop-blur-md border-b border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
                           <Briefcase className="h-6 w-6" />
                        </div>
                        <span className="text-2xl font-bold text-white tracking-tight">JobReady</span>
                    </Link>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link to="/" className="text-gray-300 hover:text-white font-medium transition-colors">Home</Link>
                        
                        {(!user || user.role !== 'admin') && (
                            <>
                                <a href="#features" className="text-gray-300 hover:text-white font-medium transition-colors">Features</a>
                                <a href="#how-it-works" className="text-gray-300 hover:text-white font-medium transition-colors">Process</a>
                            </>
                        )}
                        
                        {user && user.role !== 'admin' && (
                            <Link to="/dashboard" className="text-gray-300 hover:text-white font-medium transition-colors">Dashboard</Link>
                        )}

                        {!user && (
                            <Link to="/login" className="text-gray-300 hover:text-white font-medium transition-colors">Login</Link>
                        )}
                    </div>

                    {/* CTA Button / Profile */}
                    <div className="hidden md:flex items-center gap-4">
                        {user ? (
                           <div className="flex items-center gap-3 pl-6 border-l border-white/10">
                                <div className="text-right hidden lg:block">
                                    <p className="text-sm font-bold text-white leading-none">{user.name}</p>
                                    <p className="text-xs text-gray-400 mt-1">{user.email}</p>
                                </div>
                                
                                <div className="group relative">
                                    <button className="w-10 h-10 bg-[#1E1E2D] rounded-full flex items-center justify-center text-indigo-400 font-bold border-2 border-transparent hover:border-indigo-500/50 transition-all">
                                        {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                                    </button>
                                    
                                    {/* Dropdown Menu */}
                                    <div className="absolute right-0 top-full mt-2 w-48 bg-[#1E1E2D] rounded-xl shadow-xl border border-white/10 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all transform origin-top-right">
                                        <div className="py-2">
                                            {user.role === 'admin' && (
                                                <Link to="/admin" className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-white">
                                                    Admin Dashboard
                                                </Link>
                                            )}
                                            <Link to="/dashboard" className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-white">
                                                User Dashboard
                                            </Link>
                                            <div className="h-px bg-white/5 my-1"></div>
                                            <button 
                                                onClick={logout}
                                                className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-500/10"
                                            >
                                                Log Out
                                            </button>
                                        </div>
                                    </div>
                                </div>
                           </div>
                        ) : (
                           <div className="flex items-center gap-4">
                               <Link 
                                 to="/login" 
                                 className="text-gray-300 hover:text-white font-medium transition-colors"
                               >
                                 Log In
                               </Link>
                               <Link 
                                 to="/register" 
                                 className="bg-indigo-600 text-white font-semibold py-2.5 px-6 rounded-full hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-500/20 transform hover:-translate-y-0.5"
                               >
                                 Get Started
                               </Link>
                           </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
