import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import DashboardNavbar from "./layout/DashboardNavbar";

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#151521] flex text-gray-100 font-sans selection:bg-indigo-500/30">
      {/* Sidebar (Fixed) */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />

      {/* Main Content Shell */}
      <div className="flex-1 flex flex-col min-w-0 md:pl-72 transition-all duration-300">
        
        {/* Sticky Header */}
        <header className="sticky top-0 z-30 bg-[#151521]/80 backdrop-blur-xl border-b border-white/5 px-6 py-3">
          <DashboardNavbar onMenuClick={() => setIsSidebarOpen(true)} />
        </header>

        {/* Scrollable Page Content */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-2 duration-500">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
