import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Bell, Search, ChevronDown } from 'lucide-react';
import useAuth from '../../hooks/useAuth';

const DashboardNavbar = ({ onMenuClick }) => {
    const { user, logout } = useAuth();
    const location = useLocation();

    // Helper to get page title based on path
    const getPageTitle = () => {
        const path = location.pathname.split('/')[2];
        if (!path) return 'Dashboard';
        return path.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    };
    
    return (
        <div className="flex items-center justify-between h-14">
            {/* Left: Mobile Toggle & Page Title */}
            <div className="flex items-center gap-4">
                <button 
                    onClick={onMenuClick}
                    className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg md:hidden transition-colors"
                >
                    <Menu size={24} />
                </button>
                <h1 className="text-xl font-bold text-gray-800 hidden md:block">{getPageTitle()}</h1>
            </div>

            {/* Middle: Search (Optional, Visual only for now) */}
            <div className="hidden md:flex items-center w-96 px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus-within:ring-2 focus-within:ring-blue-100 transition-all">
                <Search size={18} className="text-gray-400" />
                <input 
                    type="text" 
                    placeholder="Search..." 
                    className="bg-transparent border-none outline-none text-sm w-full ml-2 text-gray-700 placeholder-gray-400"
                />
            </div>

            {/* Right: Actions & Profile */}
            <div className="flex items-center gap-4">
                <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors relative">
                    <Bell size={20} />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                </button>

                <div className="h-8 w-px bg-gray-200 hidden sm:block"></div>

                {user && (
                    <div className="flex items-center gap-3">
                        <div className="text-right hidden md:block">
                            <p className="text-sm font-semibold text-gray-900 leading-none">{user.name}</p>
                            <p className="text-xs text-gray-500 mt-0.5">{user.role}</p>
                        </div>
                        
                        <div className="group relative">
                            <button className="flex items-center gap-2 focus:outline-none">
                                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold shadow-md ring-2 ring-white">
                                    {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                                </div>
                                <ChevronDown size={14} className="text-gray-400 group-hover:text-gray-600 transition-colors" />
                            </button>
                            
                            {/* Dropdown Menu */}
                            <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all transform origin-top-right z-50">
                                <div className="p-2">
                                    <div className="px-3 py-2 border-b border-gray-50 mb-1 md:hidden">
                                        <p className="text-sm font-bold text-gray-900">{user.name}</p>
                                        <p className="text-xs text-slate-500">{user.email}</p>
                                    </div>
                                    
                                    <Link to="/dashboard/settings" className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                                        Profile Settings
                                    </Link>
                                    <button 
                                        onClick={logout}
                                        className="w-full text-left flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                    >
                                        Sign Out
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DashboardNavbar;
