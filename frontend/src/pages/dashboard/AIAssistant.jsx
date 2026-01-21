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
    <div className="h-[calc(100vh-8rem)] flex flex-col bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header & Tabs */}
      <div className="bg-gradient-to-r from-blue-300 to-indigo-300 p-4 text-black">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
            <Bot size={24} className="text-black" />
          </div>
          <div>
            <h1 className="text-lg font-bold">AI Companion</h1>
            <p className="text-black text-xs">Powered by Gemini AI</p>
          </div>
        </div>
        
        <div className="flex gap-2 bg-white/10 p-1 rounded-lg">
          <button
            onClick={() => setMode('chat')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-sm font-medium transition-all ${
              mode === 'chat' ? 'bg-white text-blue-900 shadow-sm' : 'text-blue-900 hover:bg-white/10'
            }`}
          >
            <MessageSquare size={16} /> Chat
          </button>
          <button
            onClick={() => setMode('keywords')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-sm font-medium transition-all ${
              mode === 'keywords' ? 'bg-white text-black shadow-sm' : 'text-black hover:bg-white/10'
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
          <div className="absolute inset-0 flex flex-col bg-gray-50">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] md:max-w-[70%] rounded-2xl p-4 flex items-start gap-3 shadow-sm ${
                    msg.sender === 'user' 
                      ? 'bg-blue-600 text-white rounded-tr-none' 
                      : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none'
                  }`}>
                    <div className={`mt-1 shrink-0 p-1 rounded-full ${msg.sender === 'user' ? 'bg-blue-500' : 'bg-blue-50'}`}>
                      {msg.sender === 'user' 
                        ? <User size={14} className="text-blue-50" /> 
                        : <Bot size={14} className="text-blue-600" />
                      }
                    </div>
                    <div>
                        <p className={`text-sm leading-relaxed whitespace-pre-wrap ${msg.isError ? 'text-red-500' : ''}`}>{msg.text}</p>
                        {msg.source === 'local_fallback' && (
                            <span className="text-[10px] opacity-70 mt-1 block flex items-center gap-1">
                                <AlertCircle size={10} /> Offline Mode
                            </span>
                        )}
                    </div>
                  </div>
                </div>
              ))}
              {thinking && (
                <div className="flex justify-start">
                   <div className="bg-white border border-gray-100 rounded-2xl p-4 rounded-tl-none flex items-center gap-2 shadow-sm">
                        <Loader2 size={16} className="animate-spin text-blue-500" />
                        <span className="text-sm text-gray-500">Thinking...</span>
                   </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 bg-white border-t border-gray-100">
                <div className="flex gap-2 max-w-4xl mx-auto">
                    <input
                        type="text"
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && !thinking && handleSendMessage()}
                        placeholder="Type a message..."
                        className="flex-1 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder:text-gray-400"
                        disabled={thinking}
                    />
                    <button
                        onClick={handleSendMessage}
                        disabled={!inputMessage.trim() || thinking}
                        className="p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md active:scale-95"
                    >
                        <Send size={20} />
                    </button>
                </div>
            </div>
          </div>
        )}

        {/* KEYWORD MODE */}
        {mode === 'keywords' && (
          <div className="absolute inset-0 flex flex-col md:flex-row overflow-hidden bg-white">
             {/* Same Keyword UI as before, just wrapped */}
             <div className="flex-1 p-6 border-b md:border-b-0 md:border-r border-gray-100 flex flex-col overflow-y-auto">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Job Description / Role
                </label>
                <textarea
                    className="flex-1 w-full p-4 border border-gray-200 rounded-xl resize-none focus:ring-2 focus:ring-blue-500 outline-none text-sm bg-gray-50/50 min-h-[300px]"
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
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-blue-600 text-white hover:bg-blue-700 shadow-md"
                    }`}
                    >
                    {loadingKeywords ? <Loader2 size={18} className="animate-spin" /> : <Sparkles size={18} />}
                    {loadingKeywords ? "Analyzing..." : "Extract Keywords"}
                    </button>
                </div>
            </div>

            <div className="flex-1 p-6 bg-gray-50/50 flex flex-col overflow-y-auto">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                        <Sparkles size={16} className="text-blue-500" /> Matches
                    </h2>
                    {keywords.length > 0 && (
                        <button onClick={copyToClipboard} className="text-xs flex items-center gap-1 px-3 py-1.5 bg-white border rounded-md">
                            {copied ? <Check size={14} /> : <Copy size={14} />} {copied ? "Copied" : "Copy"}
                        </button>
                    )}
                </div>
                {keywords.length > 0 ? (
                    <div className="flex flex-wrap gap-2 animate-in fade-in slide-in-from-bottom-2">
                        {keywords.map((k, i) => (
                            <span key={i} className="px-3 py-1.5 bg-white border border-blue-100 text-blue-700 rounded-full text-sm font-medium shadow-sm">{k}</span>
                        ))}
                        {keywordSource === 'local_fallback' && (
                             <div className="w-full mt-4 p-3 bg-yellow-50 text-yellow-800 text-xs rounded-lg border border-yellow-100 flex gap-2">
                                <AlertCircle size={14} /> Local Mode: Results may be generic.
                             </div>
                        )}
                    </div>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
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
