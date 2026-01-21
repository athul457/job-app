import { useState, useEffect, useContext } from 'react';
import { Card } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { AlertCircle, FileSearch, Sparkles, Check, X, Loader2, ArrowRight } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const AnalyzeResume = () => {
  const { token } = useContext(AuthContext);
  const [resumes, setResumes] = useState([]);
  const [selectedResume, setSelectedResume] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/resumes', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) {
        // The API returns { resumes: [...], meta: {...} } or just [...] depending on implementation
        // Based on controller it seems to return { resumes: [], meta: {} }
        const resumesList = data.resumes || (Array.isArray(data) ? data : []);
        setResumes(resumesList);
        if (resumesList.length > 0) setSelectedResume(resumesList[0]._id);
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to load resumes');
    } finally {
      setLoading(false);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedResume || !jobDescription.trim()) {
      toast.error('Please select a resume and paste a job description');
      return;
    }

    setAnalyzing(true);
    setAnalysisResult(null);

    try {
      const res = await fetch('/api/ai/analyze-custom', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          resumeId: selectedResume,
          jobDescription: jobDescription
        })
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Analysis failed');
      
      setAnalysisResult(data.analysis);
      toast.success('Analysis Complete!');
    } catch (err) {
      console.error(err);
      toast.error(err.message || 'Something went wrong');
    } finally {
      setAnalyzing(false);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-500 border-green-500';
    if (score >= 60) return 'text-yellow-500 border-yellow-500';
    return 'text-red-500 border-red-500';
  };

  return (
    <div className="space-y-6 pb-10 fade-in">
        {/* Header */}
        <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold flex items-center gap-2">
                <FileSearch className="text-blue-600" /> Resume Analyzer
            </h1>
            <p className="text-gray-500">Check your resume ATS score against any job description instantly.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Input Section */}
            <Card className="h-fit">
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Sparkles size={18} className="text-yellow-500" /> Analysis Setup
                </h2>

                <div className="space-y-4">
                     <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Select Resume</label>
                        {loading ? (
                            <div className="h-10 w-full bg-gray-100 rounded-xl animate-pulse" />
                        ) : (
                            <select 
                                value={selectedResume}
                                onChange={(e) => setSelectedResume(e.target.value)}
                                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                            >
                                <option value="" disabled>Select a resume...</option>
                                {resumes.map(r => (
                                    <option key={r._id} value={r._id}>{r.title} ({new Date(r.updatedAt).toLocaleDateString()})</option>
                                ))}
                            </select>
                        )}
                        {resumes.length === 0 && !loading && (
                             <p className="text-xs text-red-500 mt-1">No resumes found. Please create one first.</p>
                        )}
                     </div>

                     <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Job Description (JD)</label>
                        <textarea 
                            value={jobDescription}
                            onChange={(e) => setJobDescription(e.target.value)}
                            placeholder="Paste the full job description here..."
                            className="w-full p-4 h-64 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none resize-none transition-all text-sm"
                        />
                     </div>

                     <Button 
                        onClick={handleAnalyze} 
                        disabled={analyzing || !selectedResume || !jobDescription.trim()}
                        className="w-full"
                        size="lg"
                     >
                        {analyzing ? (
                            <> <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Analyzing... </>
                        ) : (
                            <> Analyze Resume <ArrowRight className="ml-2 h-5 w-5" /> </>
                        )}
                     </Button>
                </div>
            </Card>

            {/* Results Section */}
            <div className="space-y-6">
                 {analyzing && (
                     <Card className="flex flex-col items-center justify-center min-h-[400px] border-dashed">
                          <Loader2 size={48} className="text-blue-500 animate-spin mb-4" />
                          <h3 className="text-lg font-semibold text-gray-700">Analyzing your resume...</h3>
                          <p className="text-gray-400 text-sm mt-2">Checking keywords, formatting, and relevance.</p>
                     </Card>
                 )}

                 {!analyzing && !analysisResult && (
                     <Card className="flex flex-col items-center justify-center min-h-[400px] border-dashed opacity-75">
                         <div className="h-20 w-20 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                             <FileSearch size={32} className="text-blue-300" />
                         </div>
                         <h3 className="text-lg font-semibold text-gray-400">Ready to Analyze</h3>
                         <p className="text-gray-400 text-sm mt-2 max-w-xs text-center">Select your resume and paste a job description to see your ATS score and insights.</p>
                     </Card>
                 )}

                 {!analyzing && analysisResult && (
                     <div className="space-y-6 animate-in slide-in-from-bottom-4 fade-in duration-500">
                         {/* Score Card */}
                         <Card className="relative overflow-hidden">
                             <div className="absolute top-0 right-0 p-32 bg-blue-500/5 blur-3xl rounded-full -mr-16 -mt-16 pointer-events-none" />
                             <div className="flex items-center justify-between">
                                 <div>
                                     <h3 className="text-lg font-semibold text-gray-700">ATS Compatibility Score</h3>
                                     <p className="text-gray-500 text-sm mt-1">Based on keyword matching & relevance</p>
                                 </div>
                                 <div className={`relative h-24 w-24 rounded-full border-4 flex items-center justify-center ${getScoreColor(analysisResult.atsScore)}`}>
                                     <span className="text-2xl font-bold">{analysisResult.atsScore}%</span>
                                 </div>
                             </div>
                         </Card>

                         {/* Keywords */}
                         <Card>
                             <h3 className="font-semibold mb-4 text-gray-800">Keyword Analysis</h3>
                             <div className="space-y-4">
                                 <div>
                                     <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Matched Keywords</p>
                                     <div className="flex flex-wrap gap-2">
                                         {analysisResult.matchedKeywords.length > 0 ? (
                                             analysisResult.matchedKeywords.map((k, i) => (
                                                 <span key={i} className="px-2.5 py-1 bg-green-50 text-green-700 border border-green-100 rounded-md text-sm font-medium flex items-center gap-1">
                                                     <Check size={12} /> {k}
                                                 </span>
                                             ))
                                         ) : (
                                             <span className="text-sm text-gray-400 italic">No exact keyword matches found.</span>
                                         )}
                                     </div>
                                 </div>
                                 
                                 <div>
                                     <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Missing Keywords</p>
                                     <div className="flex flex-wrap gap-2">
                                         {analysisResult.missingKeywords.length > 0 ? (
                                             analysisResult.missingKeywords.map((k, i) => (
                                                 <span key={i} className="px-2.5 py-1 bg-red-50 text-red-700 border border-red-100 rounded-md text-sm font-medium flex items-center gap-1">
                                                     <X size={12} /> {k}
                                                 </span>
                                             ))
                                         ) : (
                                             <span className="text-sm text-green-600 font-medium">Great job! No major keywords missing.</span>
                                         )}
                                     </div>
                                 </div>
                             </div>
                         </Card>

                         {/* Feedback */}
                         <Card>
                             <h3 className="font-semibold mb-4 text-gray-800">AI Feedback</h3>
                             <div className="space-y-4">
                                 <div className="p-4 bg-blue-50/50 rounded-xl border border-blue-100">
                                     <h4 className="flex items-center gap-2 font-medium text-blue-900 mb-2">
                                         <Sparkles size={16} /> Key Strengths
                                     </h4>
                                     <ul className="list-disc list-inside text-sm text-blue-800 space-y-1">
                                         {analysisResult.strengths.map((s, i) => (
                                             <li key={i}>{s}</li>
                                         ))}
                                     </ul>
                                 </div>

                                 <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-100">
                                     <h4 className="flex items-center gap-2 font-medium text-amber-900 mb-2">
                                         <AlertCircle size={16} /> Suggestions for Improvement
                                     </h4>
                                     <ul className="list-disc list-inside text-sm text-amber-800 space-y-1">
                                         {analysisResult.suggestions.map((s, i) => (
                                             <li key={i}>{s}</li>
                                         ))}
                                     </ul>
                                 </div>
                             </div>
                         </Card>
                     </div>
                 )}
            </div>
        </div>
    </div>
  );
};

export default AnalyzeResume;
