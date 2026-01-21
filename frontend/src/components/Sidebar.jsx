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
  CheckCircle
} from "lucide-react";

const Sidebar = ({ isOpen, onClose }) => {
  const menuItems = [
    { path: "/dashboard", label: "Dashboard", icon: <LayoutDashboard size={20} />, end: true },
    { path: "/dashboard/new-resume", label: "Create Resume", icon: <FilePlus size={20} /> },
    { path: "/dashboard/my-resumes", label: "My Resumes", icon: <Files size={20} /> },
    { path: "/dashboard/jobs", label: "Find Jobs", icon: <Briefcase size={20} /> },
    { path: "/dashboard/applications", label: "My Applications", icon: <CheckCircle size={20} /> },
    { path: "/dashboard/ai-assistant", label: "AI Assistant", icon: <Bot size={20} /> },
    { path: "/dashboard/settings", label: "Settings", icon: <Settings size={20} /> },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside 
        className={`fixed top-0 left-0 z-50 h-screen w-64 bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <h1 className="text-xl font-bold text-blue-600">JobPortal</h1>
          <button 
            onClick={onClose}
            className="p-1 text-gray-500 hover:bg-gray-100 rounded-md md:hidden"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="p-4 space-y-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              onClick={() => onClose()} // Close sidebar on mobile when clicked
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`
              }
            >
              {item.icon}
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 w-full p-4 border-t border-gray-100">
          <button className="flex items-center gap-3 px-4 py-3 w-full text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors">
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
