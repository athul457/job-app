import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Briefcase, Building, MapPin, Calendar, CheckCircle, Clock, XCircle, Loader2, Trash2 } from "lucide-react";
import { getMyApplications, withdrawApplication } from "../../api/job.api";
import { AuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";

const MyApplications = () => {
    const { token } = useContext(AuthContext);
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [withdrawingId, setWithdrawingId] = useState(null);

    useEffect(() => {
        fetchApplications();
    }, []);

    const fetchApplications = async () => {
        setLoading(true);
        try {
            const data = await getMyApplications(token);
            setApplications(data);
        } catch (error) {
            console.error(error);
            toast.error("Failed to load applications");
        } finally {
            setLoading(false);
        }
    };

    const handleWithdraw = async (applicationId) => {
        if (!window.confirm("Are you sure you want to withdraw this application?")) return;

        setWithdrawingId(applicationId);
        try {
            await withdrawApplication(applicationId, token);
            setApplications(applications.filter(app => app._id !== applicationId));
            toast.success("Application withdrawn successfully");
        } catch (error) {
            console.error(error);
            toast.error(error.message || "Failed to withdraw application");
        } finally {
            setWithdrawingId(null);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Applied': return 'bg-blue-50 text-blue-700';
            case 'Reviewed': return 'bg-yellow-50 text-yellow-700';
            case 'Interview': return 'bg-purple-50 text-purple-700';
            case 'Hired': return 'bg-green-50 text-green-700';
            case 'Rejected': return 'bg-red-50 text-red-700';
            default: return 'bg-gray-50 text-gray-700';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Hired': return <CheckCircle size={16} />;
            case 'Rejected': return <XCircle size={16} />;
            default: return <Clock size={16} />;
        }
    };

    return (
        <div className="space-y-6 pb-20">
            <div>
                <h1 className="text-2xl font-bold text-gray-800">My Applications</h1>
                <p className="text-gray-500 mt-1">Track the status of your job applications.</p>
            </div>

            {loading ? (
                <div className="flex justify-center py-20"><Loader2 className="animate-spin text-blue-600" size={40} /></div>
            ) : applications.length > 0 ? (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 border-b border-gray-100">
                                <tr>
                                    <th className="px-6 py-4 font-semibold text-gray-600 text-sm">Job Role</th>
                                    <th className="px-6 py-4 font-semibold text-gray-600 text-sm">Company</th>
                                    <th className="px-6 py-4 font-semibold text-gray-600 text-sm">Date Applied</th>
                                    <th className="px-6 py-4 font-semibold text-gray-600 text-sm">Resume Used</th>
                                    <th className="px-6 py-4 font-semibold text-gray-600 text-sm">Status</th>
                                    <th className="px-6 py-4 font-semibold text-gray-600 text-sm text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {applications.map((app) => (
                                    <tr key={app._id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-gray-900">{app.job?.title || "Unknown Job"}</div>
                                            <div className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                                                <Briefcase size={10} /> {app.job?.type}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <Building size={16} className="text-gray-400" />
                                                <span className="text-gray-700">{app.job?.company}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {new Date(app.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {app.resume?.title || "Deleted Resume"}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${getStatusColor(app.status)}`}>
                                                {getStatusIcon(app.status)}
                                                {app.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-3">
                                                <Link 
                                                    to={`/dashboard/jobs/${app.job?._id}`}
                                                    className="text-blue-600 hover:text-blue-800 text-sm font-medium hover:underline"
                                                >
                                                    View Job
                                                </Link>
                                                <button
                                                    onClick={() => handleWithdraw(app._id)}
                                                    disabled={withdrawingId === app._id}
                                                    className="text-red-500 hover:text-red-700 p-1.5 hover:bg-red-50 rounded-md transition-colors"
                                                    title="Withdraw Application"
                                                >
                                                    {withdrawingId === app._id ? (
                                                        <Loader2 size={16} className="animate-spin" />
                                                    ) : (
                                                        <Trash2 size={16} />
                                                    )}
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <div className="text-center py-20 bg-white rounded-xl border border-gray-100 border-dashed">
                    <div className="inline-flex h-16 w-16 bg-blue-50 rounded-full items-center justify-center text-blue-500 mb-4">
                        <Briefcase size={32} />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">No applications yet</h3>
                    <p className="text-gray-500 mt-1 mb-6">Start exploring jobs and apply to your dream role!</p>
                    <Link to="/dashboard/jobs" className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
                        Browse Jobs
                    </Link>
                </div>
            )}
        </div>
    );
};

export default MyApplications;
