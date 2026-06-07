import React, { useState, useEffect, useRef } from "react";
import { Send, Bot, User, Loader2, Sparkles, Mic } from "lucide-react";
import { motion } from "framer-motion";

const suggestions = [
  "What is the current market price for Wheat?",
  "How can I treat leaf blight in potatoes?",
  "What's the best crop to grow in 6.5 pH soil?",
  "Tell me about the PM-Kisan scheme."
];

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const wsRef = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    wsRef.current = new WebSocket("ws://127.0.0.1:8000/ws/chat");
    wsRef.current.onmessage = (event) => {
      setMessages(prev => [...prev, { sender: "bot", text: event.data }]);
      setLoading(false);
    };
    return () => wsRef.current?.close();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = (text = input) => {
    if (!text.trim()) return;
    setMessages(prev => [...prev, { sender: "user", text }]);
    wsRef.current.send(text);
    setInput("");
    setLoading(true);
  };

  const startVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert("Voice input is not supported in this browser.");
      return;
    }
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = 'en-US'; // Can be mapped to i18n later
    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
    };
    recognition.onend = () => setIsListening(false);
    recognition.start();
  };

  return (
    <div className="max-w-4xl mx-auto h-[85vh] flex flex-col space-y-4">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-panel rounded-3xl flex flex-col flex-1 overflow-hidden relative">
        {/* Header */}
        <div className="p-6 border-b border-white/10 bg-black/20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500/50">
              <Bot className="text-blue-400" size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold">KhetiAI Assistant</h1>
              <p className="text-green-400 text-sm flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span> Online (Gemini 3.5 Flash)
              </p>
            </div>
          </div>
          <Sparkles className="text-blue-400 opacity-50" size={24} />
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
          {messages.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-slate-500">
              <Bot size={64} className="mb-6 opacity-20" />
              <p className="mb-8">Ask me anything about farming, weather, or prices.</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl">
                {suggestions.map((s, i) => (
                  <button 
                    key={i} onClick={() => sendMessage(s)}
                    className="p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-blue-500/20 hover:border-blue-500/50 transition-colors text-sm text-left flex items-start gap-3"
                  >
                    <Sparkles size={16} className="text-blue-400 shrink-0 mt-0.5" />
                    <span className="text-slate-300">{s}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((m, idx) => (
            <div key={idx} className={`flex gap-4 ${m.sender === "user" ? "flex-row-reverse" : "flex-row"}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${m.sender === "user" ? "bg-purple-500/20 text-purple-400" : "bg-blue-500/20 text-blue-400"}`}>
                {m.sender === "user" ? <User size={20} /> : <Bot size={20} />}
              </div>
              <div className={`p-4 rounded-2xl max-w-[80%] ${m.sender === "user" ? "bg-purple-500/20 rounded-tr-none border border-purple-500/30" : "bg-white/5 rounded-tl-none border border-white/10"} leading-relaxed text-slate-200 shadow-xl`}>
                {m.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex gap-4 flex-row">
              <div className="w-10 h-10 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0"><Bot size={20} /></div>
              <div className="p-4 rounded-2xl bg-white/5 rounded-tl-none border border-white/10 flex items-center gap-2">
                <Loader2 className="animate-spin text-blue-400" size={16} /> <span className="text-slate-400 text-sm">Assistant is thinking...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-black/40 border-t border-white/10 backdrop-blur-xl">
          <div className="flex gap-3 max-w-4xl mx-auto items-center relative">
            <button 
              onClick={startVoiceInput}
              className={`absolute left-3 w-10 h-10 rounded-full flex items-center justify-center transition-colors ${isListening ? 'bg-red-500/20 text-red-400 animate-pulse' : 'hover:bg-white/10 text-slate-400'}`}
            >
              <Mic size={20} />
            </button>
            <input 
              type="text" 
              className="flex-1 bg-white/5 border border-white/10 rounded-full px-6 py-4 pl-14 text-white focus:outline-none focus:border-blue-500 focus:bg-white/10 transition-all shadow-inner"
              placeholder={isListening ? "Listening..." : "Type your question here..."}
              value={input} onChange={e => setInput(e.target.value)}
              onKeyPress={e => e.key === 'Enter' && sendMessage()}
            />
            <button 
              onClick={() => sendMessage()} disabled={loading || (!input.trim() && !isListening)}
              className="w-14 h-14 bg-gradient-to-r from-blue-500 to-indigo-600 hover:scale-105 transition-transform text-white rounded-full flex items-center justify-center shadow-lg disabled:opacity-50 disabled:hover:scale-100 shrink-0"
            >
              <Send size={20} className="ml-1" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Chatbot;
