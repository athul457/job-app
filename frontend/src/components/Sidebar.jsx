import { NavLink } from "react-router-dom";
import { 
  LayoutDashboard, 
  FilePlus, 
  Files, 
  FileSearch,
  Bot, 
  Settings, 
  LogOut, 
  X,
  Briefcase,
  CheckCircle,
  HelpCircle
} from "lucide-react";
import useAuth from "../hooks/useAuth";

const Sidebar = ({ isOpen, onClose }) => {
  const { logout } = useAuth();
  
  const menuItems = [
    { path: "/dashboard", label: "Overview", icon: <LayoutDashboard size={20} />, end: true },
    { path: "/dashboard/jobs", label: "Find Jobs", icon: <Briefcase size={20} /> },
    { path: "/dashboard/applications", label: "Applications", icon: <CheckCircle size={20} /> },
    { path: "/dashboard/my-resumes", label: "My Resumes", icon: <Files size={20} /> },
    { path: "/dashboard/new-resume", label: "Create Resume", icon: <FilePlus size={20} /> },
    { path: "/dashboard/analyze", label: "Resume Analyzer", icon: <FileSearch size={20} /> },
    { path: "/dashboard/ai-assistant", label: "AI Assistant", icon: <Bot size={20} /> },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden animate-in fade-in"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-[#1E1E2D] border-r border-white/5 shadow-2xl transform transition-transform duration-300 ease-in-out md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between p-6 border-b border-white/5 h-20">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
               <Briefcase size={22} strokeWidth={2.5} />
             </div>
             <span className="text-xl font-bold text-white tracking-tight">JobReady</span>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-gray-400 hover:bg-white/5 rounded-lg md:hidden"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <div className="flex flex-col h-[calc(100vh-5rem)] justify-between p-4">
          <nav className="space-y-1">
            <p className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 mt-2">Menu</p>
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                onClick={() => onClose()}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${
                    isActive
                      ? "bg-indigo-600 shadow-lg shadow-indigo-500/30 text-white"
                      : "text-gray-400 hover:bg-white/5 hover:text-white"
                  }`
                }
              >
                {/* Icon wrapper to ensure alignment */}
                {({ isActive }) => (
                  <>
                    <span className={isActive ? "text-white" : "text-gray-500 group-hover:text-gray-300 transition-colors"}>
                        {item.icon}
                    </span>
                    {item.label}
                  </>
                )}
              </NavLink>
            ))}
            
            <p className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 mt-6">Preferences</p>
            <NavLink
              to="/dashboard/settings"
              onClick={() => onClose()}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${
                  isActive
                    ? "bg-indigo-600 shadow-lg shadow-indigo-500/30 text-white"
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Settings size={20} className={isActive ? "text-white" : "text-gray-500 group-hover:text-gray-300 transition-colors"} />
                  Settings
                </>
              )}
            </NavLink>
          </nav>

          {/* User / Logout */}
          <div className="border-t border-white/5 pt-4">
            <button 
              onClick={logout}
              className="flex items-center gap-3 px-4 py-3 w-full text-sm font-medium text-gray-400 hover:bg-red-500/10 hover:text-red-400 rounded-xl transition-colors group"
            >
              <LogOut size={20} className="text-gray-500 group-hover:text-red-400 transition-colors" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
