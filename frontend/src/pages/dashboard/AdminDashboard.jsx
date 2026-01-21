import React, { useState, useEffect } from 'react';
import DashboardNavbar from '../../components/layout/DashboardNavbar';
import { Users, Briefcase, FileText, CheckCircle, TrendingUp } from 'lucide-react';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    users: 0,
    jobs: 0,
    resumes: 0,
    applications: 0
  });

  // Mock data for now - will connect to API later
  useEffect(() => {
    // In a real app, fetch from /api/admin/stats
    setStats({
      users: 120,
      jobs: 45,
      resumes: 350,
      applications: 89
    });
  }, []);

  const StatCard = ({ icon: Icon, title, value, color }) => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
      <div className={`p-3 rounded-lg ${color}`}>
        <Icon className="h-8 w-8 text-white" />
      </div>
      <div>
        <p className="text-gray-500 text-sm font-medium">{title}</p>
        <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <DashboardNavbar />
      
      <main className="flex-grow container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard</h1>
          <p className="text-slate-500 mt-1">Overview of system performance and user activity.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            icon={Users} 
            title="Total Users" 
            value={stats.users} 
            color="bg-blue-500" 
          />
          <StatCard 
            icon={Briefcase} 
            title="Active Jobs" 
            value={stats.jobs} 
            color="bg-indigo-500" 
          />
          <StatCard 
            icon={FileText} 
            title="Resumes Created" 
            value={stats.resumes} 
            color="bg-purple-500" 
          />
          <StatCard 
            icon={CheckCircle} 
            title="Applications" 
            value={stats.applications} 
            color="bg-green-500" 
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-indigo-600" /> Recent Activity
                </h2>
                <div className="space-y-4">
                    {[1, 2, 3, 4, 5].map((item) => (
                        <div key={item} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                            <div>
                                <p className="font-medium text-slate-800">New User Registered</p>
                                <p className="text-xs text-slate-500">2 minutes ago</p>
                            </div>
                            <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">Completed</span>
                        </div>
                    ))}
                </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h2 className="text-lg font-bold text-slate-900 mb-4">Quick Actions</h2>
                <div className="space-y-3">
                    <button className="w-full text-left px-4 py-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                        Post a New Job
                    </button>
                    <button className="w-full text-left px-4 py-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                        Manage Users
                    </button>
                     <button className="w-full text-left px-4 py-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                        System Settings
                    </button>
                </div>
            </div>
        </div>

      </main>
    </div>
  );
};

export default AdminDashboard;
