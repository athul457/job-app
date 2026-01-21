import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";

import SelectTemplate from "./pages/ResumeBuilder/SelectTemplate";

import BuilderCreateResume from "./pages/ResumeBuilder/CreateResume";
import Jobs from "./pages/dashboard/Jobs";
import JobDetails from "./pages/dashboard/JobDetails";
import MyApplications from "./pages/dashboard/MyApplications";
import Resumes from "./pages/dashboard/Resumes";  
import AdminDashboard from "./pages/dashboard/AdminDashboard";

// New Dashboard Imports
import DashboardLayout from "./components/DashboardLayout";

import Dashboard from "./pages/dashboard/Dashboard";
import CreateResume from "./pages/dashboard/CreateResume";
import MyResumes from "./pages/dashboard/MyResumes";
import ViewResume from "./pages/dashboard/ViewResume";
import NewResume from "./pages/dashboard/NewResume";
import AIAssistant from "./pages/dashboard/AIAssistant";
import Settings from "./pages/dashboard/Settings";
import AnalyzeResume from "./pages/dashboard/AnalyzeResume";

import { Toaster } from "react-hot-toast";

function App() {
  return (
    <AuthProvider>
      <Toaster position="top-right" />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          <Route element={<ProtectedRoute />}>
             {/* <Route path="/jobs" element={<Jobs />} />  <-- moved to dashboard */}
             
             {/* New Dashboard Routes */}
             <Route path="/dashboard" element={<DashboardLayout />}>
               <Route index element={<Dashboard />} />
               <Route path="jobs" element={<Jobs />} />
               <Route path="jobs/:id" element={<JobDetails />} />
               <Route path="applications" element={<MyApplications />} />
               
               <Route path="new-resume" element={<NewResume />} />
               <Route path="select-template" element={<SelectTemplate />} />
               <Route path="create-resume" element={<CreateResume />} />
               <Route path="my-resumes" element={<MyResumes />} />
               <Route path="resume/:id" element={<ViewResume />} />
               <Route path="resume/:id/edit" element={<CreateResume />} />
               <Route path="ai-assistant" element={<AIAssistant />} />
               <Route path="analyze" element={<AnalyzeResume />} />
               <Route path="settings" element={<Settings />} />
             </Route>

             <Route path="/admin" element={<AdminDashboard />} />
             
             {/* Legacy Routes - keeping for now if needed, though dashboard/my-resumes replaces this */}
             {/* <Route path="/resumes" element={<Resumes />} /> */}
             
             {/* Resume Builder Routes */}
             <Route path="/resumes/new" element={<SelectTemplate />} />
             <Route path="/resumes/create" element={<BuilderCreateResume />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
