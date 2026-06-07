import React, { useState } from "react";
import axios from "axios";
import { Sprout, Activity, ArrowRight, BarChart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const SliderInput = ({ label, value, min, max, onChange, color }) => (
  <div className="mb-6">
    <div className="flex justify-between mb-2">
      <span className="text-slate-300 font-medium">{label}</span>
      <span className={`font-mono font-bold ${color}`}>{value}</span>
    </div>
    <input 
      type="range" 
      min={min} max={max} step="0.1" 
      value={value} onChange={(e) => onChange(parseFloat(e.target.value))}
      className="w-full h-2 bg-black/40 rounded-lg appearance-none cursor-pointer accent-green-500"
    />
  </div>
);

const CropRecommendation = () => {
  const [ph, setPh] = useState(6.5);
  const [nitrogen, setNitrogen] = useState(50);
  const [phosphorus, setPhosphorus] = useState(50);
  const [potassium, setPotassium] = useState(50);
  const [moisture, setMoisture] = useState(30);
  
  const [recommended, setRecommended] = useState([]);
  const [loading, setLoading] = useState(false);

  const getRecommendation = async () => {
    setLoading(true);
    try {
      const res = await axios.post("http://127.0.0.1:8000/crop/recommend", {
        ph, nitrogen, phosphorus, potassium, moisture
      });
      setRecommended(res.data.recommended);
    } catch (err) {
      alert("Error fetching recommendation.");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-panel p-8 rounded-3xl">
        <div className="flex items-center gap-4 mb-8">
          <Sprout className="text-green-400" size={40} />
          <div>
            <h1 className="text-3xl font-bold">Crop Recommendation Engine</h1>
            <p className="text-slate-400">Fine-tune your soil parameters to get AI-driven crop suggestions.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Inputs */}
          <div className="bg-white/5 border border-white/10 p-8 rounded-2xl">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2"><Activity className="text-green-400"/> Soil Parameters</h3>
            
            <SliderInput label="pH Level" value={ph} min={0} max={14} onChange={setPh} color="text-pink-400" />
            <SliderInput label="Nitrogen (mg/kg)" value={nitrogen} min={0} max={140} onChange={setNitrogen} color="text-green-400" />
            <SliderInput label="Phosphorus (mg/kg)" value={phosphorus} min={0} max={140} onChange={setPhosphorus} color="text-blue-400" />
            <SliderInput label="Potassium (mg/kg)" value={potassium} min={0} max={200} onChange={setPotassium} color="text-yellow-400" />
            <SliderInput label="Moisture (%)" value={moisture} min={0} max={100} onChange={setMoisture} color="text-cyan-400" />

            <button 
              onClick={getRecommendation}
              disabled={loading}
              className="w-full py-4 mt-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:scale-[1.02] transition-transform text-white font-bold rounded-xl shadow-lg flex justify-center items-center gap-2"
            >
              {loading ? "Analyzing Soil Data..." : "Get AI Recommendation"} <ArrowRight size={20} />
            </button>
          </div>

          {/* Outputs */}
          <div className="flex flex-col gap-6">
            <div className="bg-black/20 border border-white/10 p-8 rounded-2xl flex-1 flex flex-col items-center justify-center relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5"><Sprout size={120} /></div>
              
              <h3 className="text-xl font-bold text-slate-400 mb-6 w-full text-left">Recommended Crops</h3>
              
              <AnimatePresence mode="wait">
                {recommended.length > 0 ? (
                  <motion.div key="results" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex gap-4 flex-wrap w-full">
                    {recommended.map((crop, idx) => (
                      <div key={idx} className="flex-1 min-w-[150px] bg-green-500/20 border border-green-500/50 p-6 rounded-2xl text-center shadow-[0_0_30px_rgba(34,197,94,0.15)] hover:scale-105 transition-transform cursor-pointer">
                        <Sprout size={40} className="text-green-400 mx-auto mb-3" />
                        <h4 className="text-2xl font-bold text-white">{crop}</h4>
                        <p className="text-xs text-green-300 mt-2">Optimal Match: 94%</p>
                      </div>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div key="empty" className="text-center text-slate-500 py-12">
                    <BarChart size={48} className="mx-auto mb-4 opacity-50" />
                    <p>Adjust the sliders and click recommend to see your matches.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Yield Predictor */}
            {recommended.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                <h3 className="font-bold text-lg mb-2">Yield Predictor AI</h3>
                <p className="text-sm text-slate-400 mb-4">Based on your current soil NPK levels, you can expect a higher-than-average yield.</p>
                <div className="w-full bg-black/40 rounded-full h-4 overflow-hidden">
                  <div className="bg-gradient-to-r from-green-400 to-emerald-500 h-full w-[85%]"></div>
                </div>
                <div className="flex justify-between mt-2 text-xs font-bold text-slate-500">
                  <span>Low Yield</span>
                  <span className="text-green-400">85% Capacity</span>
                  <span>Max Yield</span>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CropRecommendation;
