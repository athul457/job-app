import { NavLink } from "react-router-dom";
import { 
  LayoutDashboard, 
  FilePlus, 
  Files, 
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
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-gray-100 shadow-xl md:shadow-none transform transition-transform duration-300 ease-in-out md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between p-6 border-b border-gray-50 h-20">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
               <Briefcase size={22} strokeWidth={2.5} />
             </div>
             <span className="text-xl font-bold text-gray-900 tracking-tight">JobReady</span>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-gray-500 hover:bg-gray-50 rounded-lg md:hidden"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <div className="flex flex-col h-[calc(100vh-5rem)] justify-between p-4">
          <nav className="space-y-1">
            <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 mt-2">Menu</p>
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                onClick={() => onClose()}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${
                    isActive
                      ? "bg-blue-50 text-blue-700 shadow-sm"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`
                }
              >
                {/* Icon wrapper to ensure alignment */}
                <span className={({ isActive }) => isActive ? "text-blue-600" : "text-gray-400 group-hover:text-gray-600"}>
                    {item.icon}
                </span>
                {item.label}
              </NavLink>
            ))}
            
            <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 mt-6">Preferences</p>
            <NavLink
              to="/dashboard/settings"
              onClick={() => onClose()}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${
                  isActive
                    ? "bg-blue-50 text-blue-700 shadow-sm"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`
              }
            >
              <Settings size={20} className="text-gray-400 group-hover:text-gray-600" />
              Settings
            </NavLink>
          </nav>

          {/* User / Logout */}
          <div className="border-t border-gray-100 pt-4">
            <button 
              onClick={logout}
              className="flex items-center gap-3 px-4 py-3 w-full text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-xl transition-colors group"
            >
              <LogOut size={20} className="text-gray-400 group-hover:text-red-500" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
