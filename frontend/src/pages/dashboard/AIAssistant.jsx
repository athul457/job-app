import { useState, useContext, useRef, useEffect } from "react";
import { Bot, Sparkles, Copy, Check, AlertCircle, Loader2, Send, MessageSquare, FileText, User } from "lucide-react";
import { AuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";

const AIAssistant = () => {
  const { token } = useContext(AuthContext);
  const [mode, setMode] = useState("chat"); // 'keywords' | 'chat'
  
  // Utilizing Vite proxy for robust connection (handles localhost/127.0.0.1 automatically)
  const API_URL = "/api";
  const [jobDescription, setJobDescription] = useState("");
  const [keywords, setKeywords] = useState([]);
  const [loadingKeywords, setLoadingKeywords] = useState(false);
  const [copied, setCopied] = useState(false);
  const [keywordSource, setKeywordSource] = useState(""); 

  // Chat State
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I'm your AI career coach. Ask me about resume tips, interview prep, or career advice.", sender: "ai" }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [thinking, setThinking] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, mode]);

  const handleAnalyzeKeywords = async () => {
    if (!jobDescription.trim()) {
      toast.error("Please enter a job description first.");
      return;
    }

    setLoadingKeywords(true);
    setKeywords([]);
    setKeywordSource("");

    try {
 
      const res = await fetch(`${API_URL}/ai/keywords`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify({ jobDescription })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to analyze job description");

      setKeywords(data.keywords || []);
      setKeywordSource(data.source);
      toast.success("Keywords extracted successfully!");

    } catch (error) {
      console.error(error);
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoadingKeywords(false);
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMsg = { id: Date.now(), text: inputMessage, sender: "user" };
    setMessages(prev => [...prev, userMsg]);
    setInputMessage("");
    setThinking(true);

    try {

      // Format history for context (last 5 messages excluding current user msg)
      const contextMessages = messages.slice(-5).map(m => ({
          role: m.sender === 'user' ? 'user' : 'model',
          parts: [{ text: m.text }]
      }));

      const res = await fetch(`${API_URL}/ai/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify({ message: userMsg.text, previousMessages: contextMessages })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to get response");

      const aiMsg = { id: Date.now() + 1, text: data.reply, sender: "ai", source: data.source };
      setMessages(prev => [...prev, aiMsg]);

    } catch (error) {
      console.error(error);
      const errorMsg = { id: Date.now() + 1, text: "Sorry, I'm having trouble connecting right now. Please try again.", sender: "ai", isError: true };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setThinking(false);
    }
  };

  const copyToClipboard = () => {
    if (keywords.length === 0) return;
    navigator.clipboard.writeText(keywords.join(", "));
    setCopied(true);
    toast.success("Keywords copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col bg-[#1E1E2D] rounded-xl shadow-xl border border-white/5 overflow-hidden">
      {/* Header & Tabs */}
      <div className="bg-gradient-to-r from-indigo-900 to-purple-900 p-4 text-white">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm border border-white/10">
            <Bot size={24} className="text-indigo-300" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white">AI Companion</h1>
            <p className="text-indigo-200 text-xs">Powered by Gemini AI</p>
          </div>
        </div>
        
        <div className="flex gap-2 bg-[#151521]/50 p-1 rounded-lg border border-white/5">
          <button
            onClick={() => setMode('chat')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-sm font-medium transition-all ${
              mode === 'chat' ? 'bg-[#1E1E2D] text-white shadow-sm border border-white/5' : 'text-gray-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            <MessageSquare size={16} /> Chat
          </button>
          <button
            onClick={() => setMode('keywords')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-sm font-medium transition-all ${
              mode === 'keywords' ? 'bg-[#1E1E2D] text-white shadow-sm border border-white/5' : 'text-gray-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            <FileText size={16} /> Keyword Extractor
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-hidden relative">
        
        {/* CHAT MODE */}
        {mode === 'chat' && (
          <div className="absolute inset-0 flex flex-col bg-[#151521]">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] md:max-w-[70%] rounded-2xl p-4 flex items-start gap-3 shadow-md ${
                    msg.sender === 'user' 
                      ? 'bg-indigo-600 text-white rounded-tr-none' 
                      : 'bg-[#1E1E2D] text-gray-200 border border-white/5 rounded-tl-none'
                  }`}>
                    <div className={`mt-1 shrink-0 p-1 rounded-full ${msg.sender === 'user' ? 'bg-indigo-500' : 'bg-white/5'}`}>
                      {msg.sender === 'user' 
                        ? <User size={14} className="text-white" /> 
                        : <Bot size={14} className="text-indigo-400" />
                      }
                    </div>
                    <div>
                        <p className={`text-sm leading-relaxed whitespace-pre-wrap ${msg.isError ? 'text-red-400' : ''}`}>{msg.text}</p>
                        {msg.source === 'local_fallback' && (
                            <span className="text-[10px] opacity-70 mt-1 block flex items-center gap-1 text-yellow-500">
                                <AlertCircle size={10} /> Offline Mode
                            </span>
                        )}
                    </div>
                  </div>
                </div>
              ))}
              {thinking && (
                <div className="flex justify-start">
                   <div className="bg-[#1E1E2D] border border-white/5 rounded-2xl p-4 rounded-tl-none flex items-center gap-2 shadow-sm">
                        <Loader2 size={16} className="animate-spin text-indigo-500" />
                        <span className="text-sm text-gray-400">Thinking...</span>
                   </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 bg-[#1E1E2D] border-t border-white/5">
                <div className="flex gap-2 max-w-4xl mx-auto">
                    <input
                        type="text"
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && !thinking && handleSendMessage()}
                        placeholder="Type a message..."
                        className="flex-1 p-3 bg-[#151521] border border-white/5 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all placeholder:text-gray-600 text-white"
                        disabled={thinking}
                    />
                    <button
                        onClick={handleSendMessage}
                        disabled={!inputMessage.trim() || thinking}
                        className="p-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-indigo-500/20 active:scale-95"
                    >
                        <Send size={20} />
                    </button>
                </div>
            </div>
          </div>
        )}

        {/* KEYWORD MODE */}
        {mode === 'keywords' && (
          <div className="absolute inset-0 flex flex-col md:flex-row overflow-hidden bg-[#1E1E2D]">
             {/* Same Keyword UI as before, just wrapped */}
             <div className="flex-1 p-6 border-b md:border-b-0 md:border-r border-white/5 flex flex-col overflow-y-auto">
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Job Description / Role
                </label>
                <textarea
                    className="flex-1 w-full p-4 border border-white/5 rounded-xl resize-none focus:ring-2 focus:ring-indigo-500 outline-none text-sm bg-[#151521] text-white placeholder-gray-600 min-h-[300px]"
                    placeholder="Paste JD here..."
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                />
                <div className="mt-4 flex justify-end">
                    <button
                    onClick={handleAnalyzeKeywords}
                    disabled={loadingKeywords || !jobDescription.trim()}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-medium transition-all ${
                        loadingKeywords || !jobDescription.trim()
                        ? "bg-[#151521] text-gray-500 cursor-not-allowed border border-white/5"
                        : "bg-indigo-600 text-white hover:bg-indigo-500 shadow-lg shadow-indigo-500/20"
                    }`}
                    >
                    {loadingKeywords ? <Loader2 size={18} className="animate-spin" /> : <Sparkles size={18} />}
                    {loadingKeywords ? "Analyzing..." : "Extract Keywords"}
                    </button>
                </div>
            </div>

            <div className="flex-1 p-6 bg-[#151521]/50 flex flex-col overflow-y-auto">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-sm font-semibold text-gray-300 flex items-center gap-2">
                        <Sparkles size={16} className="text-indigo-400" /> Matches
                    </h2>
                    {keywords.length > 0 && (
                        <button onClick={copyToClipboard} className="text-xs flex items-center gap-1 px-3 py-1.5 bg-[#1E1E2D] border border-white/5 rounded-md text-gray-300 hover:text-white hover:bg-white/5 transition-colors">
                            {copied ? <Check size={14} /> : <Copy size={14} />} {copied ? "Copied" : "Copy"}
                        </button>
                    )}
                </div>
                {keywords.length > 0 ? (
                    <div className="flex flex-wrap gap-2 animate-in fade-in slide-in-from-bottom-2">
                        {keywords.map((k, i) => (
                            <span key={i} className="px-3 py-1.5 bg-[#1E1E2D] border border-white/10 text-indigo-300 rounded-full text-sm font-medium shadow-sm">{k}</span>
                        ))}
                        {keywordSource === 'local_fallback' && (
                             <div className="w-full mt-4 p-3 bg-yellow-500/10 text-yellow-400 text-xs rounded-lg border border-yellow-500/20 flex gap-2">
                                <AlertCircle size={14} /> Local Mode: Results may be generic.
                             </div>
                        )}
                    </div>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-gray-600">
                        <Bot size={40} className="mb-2 opacity-50" />
                        <p className="text-sm">Keywords will appear here</p>
                    </div>
                )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default AIAssistant;
