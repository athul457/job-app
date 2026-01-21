import { useState, useContext, useEffect } from "react";
import { User, Lock, Camera, Save, Loader2 } from "lucide-react";
import { AuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";

/**
 * Settings Page
 * Purpose: Manage user profile, password, and account settings.
 */
const Settings = () => {
  const { user, token, setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [passLoading, setPassLoading] = useState(false);

  // Profile State
  const [profile, setProfile] = useState({
    name: "",
    email: ""
  });

  // Password State
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  // Load user data on mount
  useEffect(() => {
    if (user) {
      setProfile({
        name: user.name || "",
        email: user.email || ""
      });
    }
  }, [user]);

  // Handle Profile Update
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("https://job-app-gl03.onrender.com/api/users/update", {
      // const response = await fetch("http://localhost:5000/api/users/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(profile)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update profile");
      }

      // Update context validation
      setUser({ ...user, name: data.name, email: data.email });
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle Password Update
  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    
    if (passwords.newPassword !== passwords.confirmPassword) {
      return toast.error("New passwords do not match");
    }

    if (passwords.newPassword.length < 6) {
      return toast.error("Password must be at least 6 characters");
    }

    setPassLoading(true);

    try {
      const response = await fetch("https://job-app-gl03.onrender.com/api/users/password", {
      // const response = await fetch("http://localhost:5000/api/users/password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          currentPassword: passwords.currentPassword,
          newPassword: passwords.newPassword
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update password");
      }

      toast.success("Password updated successfully");
      setPasswords({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (error) {
      toast.error(error.message);
    } finally {
      setPassLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 pb-20 animate-in fade-in">
      <h1 className="text-2xl font-bold text-gray-100">Account Settings</h1>

      {/* Personal Info Form */}
      <section className="bg-[#1E1E2D] p-6 rounded-xl shadow-xl border border-white/5">
        <div className="flex items-center gap-2 mb-6 text-gray-100">
          <User size={20} className="text-indigo-500" />
          <h2 className="font-semibold">Personal Information</h2>
        </div>
        
        <form onSubmit={handleUpdateProfile} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-400 mb-1 block">Full Name</label>
              <input 
                type="text" 
                value={profile.name}
                onChange={(e) => setProfile({...profile, name: e.target.value})}
                className="w-full p-2.5 bg-[#151521] border border-white/5 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 text-white placeholder-gray-600" 
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-400 mb-1 block">Email Address</label>
              <input 
                type="email" 
                value={profile.email}
                onChange={(e) => setProfile({...profile, email: e.target.value})}
                className="w-full p-2.5 bg-[#151521] border border-white/5 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 text-white placeholder-gray-600" 
              />
            </div>
          </div>
          <div className="pt-2 flex justify-end">
            <button 
              type="submit" 
              disabled={loading}
              className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-500 transition-colors disabled:opacity-50 shadow-lg shadow-indigo-500/20"
            >
              {loading ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
              Update Profile
            </button>
          </div>
        </form>
      </section>

      {/* Security Form */}
      <section className="bg-[#1E1E2D] p-6 rounded-xl shadow-xl border border-white/5">
        <div className="flex items-center gap-2 mb-6 text-gray-100">
          <Lock size={20} className="text-indigo-500" />
          <h2 className="font-semibold">Security</h2>
        </div>
        
        <form onSubmit={handleUpdatePassword} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-400 mb-1 block">Current Password</label>
            <input 
              type="password" 
              value={passwords.currentPassword}
              onChange={(e) => setPasswords({...passwords, currentPassword: e.target.value})}
              required
              className="w-full p-2.5 bg-[#151521] border border-white/5 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 text-white placeholder-gray-600" 
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-400 mb-1 block">New Password</label>
              <input 
                type="password" 
                value={passwords.newPassword}
                onChange={(e) => setPasswords({...passwords, newPassword: e.target.value})}
                required
                className="w-full p-2.5 bg-[#151521] border border-white/5 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 text-white placeholder-gray-600" 
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-400 mb-1 block">Confirm Password</label>
              <input 
                type="password" 
                value={passwords.confirmPassword}
                onChange={(e) => setPasswords({...passwords, confirmPassword: e.target.value})}
                required
                className="w-full p-2.5 bg-[#151521] border border-white/5 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 text-white placeholder-gray-600" 
              />
            </div>
          </div>
          <div className="pt-2 flex justify-end">
            <button 
              type="submit" 
              disabled={passLoading}
              className="flex items-center gap-2 px-6 py-2.5 bg-[#151521] text-indigo-400 border border-indigo-500/30 font-medium rounded-lg hover:bg-indigo-500/10 transition-colors disabled:opacity-50"
            >
              {passLoading ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
              Update Password
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Settings;

