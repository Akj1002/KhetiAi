import React, { useState, useRef, useEffect } from "react";
import { ShieldAlert, Image as ImageIcon, Upload, Loader2, Activity, Pill, History } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const DiseaseDetection = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const wsRef = useRef(null);

  useEffect(() => {
    wsRef.current = new WebSocket("ws://127.0.0.1:8000/ws/disease");
    wsRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.status === "processing") {
        setLoading(true);
      } else if (data.status === "complete") {
        setLoading(false);
        const newResult = { disease: data.disease, confidence: data.confidence, treatment: data.treatment, id: Date.now() };
        setResult(newResult);
        setHistory(prev => [newResult, ...prev]);
      }
    };
    return () => wsRef.current?.close();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        setImage(reader.result.split(",")[1]);
      };
      reader.readAsDataURL(file);
      setResult(null);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        setImage(reader.result.split(",")[1]);
      };
      reader.readAsDataURL(file);
      setResult(null);
    }
  };

  const handleDragOver = (e) => e.preventDefault();

  const analyzeImage = () => {
    if (!image) return alert("Select an image first!");
    setLoading(true);
    wsRef.current.send(JSON.stringify({ type: "image", data: image, mime_type: "image/jpeg" }));
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-panel p-8 rounded-3xl">
        <div className="flex items-center gap-4 mb-8">
          <ShieldAlert className="text-red-400" size={40} />
          <div>
            <h1 className="text-3xl font-bold">Real-time Disease AI</h1>
            <p className="text-slate-400">Powered by Gemini 3.5 Flash Vision Models with automatic fallback support.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Upload Area */}
          <div className="space-y-6">
            <div 
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              className={`border-2 border-dashed ${preview ? 'border-green-500/50 bg-green-500/5' : 'border-white/20 bg-white/5'} rounded-2xl p-8 text-center relative overflow-hidden transition-colors hover:border-green-400/50 flex flex-col items-center justify-center min-h-[300px]`}
            >
              {preview ? (
                <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
                  <img src={preview} alt="Crop" className="max-h-64 rounded-xl shadow-2xl mb-4 object-cover" />
                  <label className="text-sm text-green-400 cursor-pointer hover:underline">Change Image
                    <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                  </label>
                </div>
              ) : (
                <div className="relative z-10">
                  <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/10">
                    <Upload size={32} className="text-slate-400" />
                  </div>
                  <h3 className="font-bold text-xl mb-2">Drag & Drop Image</h3>
                  <p className="text-slate-400 text-sm mb-6">or click to browse from your device</p>
                  <label className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl cursor-pointer transition font-medium">
                    Browse Files
                    <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                  </label>
                </div>
              )}
            </div>

            <button 
              onClick={analyzeImage} disabled={loading || !image}
              className="w-full py-4 bg-gradient-to-r from-red-500 to-orange-500 hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100 transition-transform font-bold text-white rounded-xl shadow-lg flex justify-center items-center gap-2"
            >
              {loading ? <><Loader2 className="animate-spin" size={20} /> AI Analyzing Sequence...</> : "Start Real-time Analysis"}
            </button>
          </div>

          {/* Results Area */}
          <div className="space-y-6">
            <div className="bg-black/20 border border-white/10 rounded-2xl p-6 min-h-[300px] flex flex-col">
              <h3 className="font-bold text-slate-400 mb-6 flex items-center gap-2 text-sm uppercase tracking-wider"><Activity size={16} /> Diagnostic Stream</h3>
              
              <AnimatePresence mode="wait">
                {!result && !loading && (
                  <motion.div key="empty" className="flex-1 flex flex-col items-center justify-center text-slate-500 opacity-50">
                    <ImageIcon size={48} className="mb-4" />
                    <p>Upload an image to start scanning.</p>
                  </motion.div>
                )}
                
                {loading && (
                  <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 space-y-4">
                    <div className="flex gap-4 items-center text-green-400 animate-pulse">
                      <span>{'>'}</span> <p className="font-mono text-sm">Connecting to global AI server...</p>
                    </div>
                    <div className="flex gap-4 items-center text-green-400 animate-pulse delay-75">
                      <span>{'>'}</span> <p className="font-mono text-sm">Injecting model gemini-1.5-pro...</p>
                    </div>
                    <div className="flex gap-4 items-center text-green-400 animate-pulse delay-150">
                      <span>{'>'}</span> <p className="font-mono text-sm">Analyzing cellular structures...</p>
                    </div>
                  </motion.div>
                )}

                {result && !loading && (
                  <motion.div key="result" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex-1 flex flex-col gap-4">
                    <div className={`p-6 rounded-xl border ${result.disease === 'Healthy' ? 'bg-green-500/10 border-green-500/30' : 'bg-red-500/10 border-red-500/30'}`}>
                      <div className="flex justify-between items-start mb-4">
                        <h2 className="text-2xl font-bold text-white">{result.disease}</h2>
                        <span className="px-3 py-1 rounded-full bg-white/10 text-xs font-bold font-mono border border-white/10">{result.confidence} Confidence</span>
                      </div>
                      
                      <div className="mt-6 pt-6 border-t border-white/10">
                        <h4 className="text-sm font-bold text-slate-400 mb-2 flex items-center gap-2"><Pill size={16} /> Recommended Action:</h4>
                        <p className="text-slate-300 text-sm leading-relaxed">{result.treatment}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* History Gallery */}
            {history.length > 0 && (
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <h3 className="font-bold text-slate-400 mb-4 flex items-center gap-2 text-sm uppercase tracking-wider"><History size={16} /> Scan History</h3>
                <div className="flex gap-3 overflow-x-auto pb-2 custom-scrollbar">
                  {history.map((item, i) => (
                    <div key={i} className="min-w-[120px] p-3 rounded-xl bg-black/40 border border-white/5 flex flex-col justify-between">
                      <span className="text-xs font-bold truncate text-white">{item.disease}</span>
                      <span className="text-[10px] text-slate-500 mt-1">{item.confidence}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DiseaseDetection;
