import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Droplets, Power, RefreshCcw, Activity } from "lucide-react";

const IrrigationSector = ({ id, status, moisture, onToggle }) => (
  <div className={`p-6 rounded-2xl border transition-all ${status ? 'bg-blue-500/20 border-blue-500/50' : 'bg-white/5 border-white/10'}`}>
    <div className="flex justify-between items-center mb-4">
      <h3 className="font-bold">Sector {id}</h3>
      <button 
        onClick={() => onToggle(id)}
        className={`w-12 h-6 rounded-full relative transition-colors ${status ? 'bg-blue-500' : 'bg-slate-600'}`}
      >
        <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-all ${status ? 'right-1' : 'left-1'}`} />
      </button>
    </div>
    <div className="flex justify-between items-end">
      <div>
        <p className="text-xs text-slate-400 mb-1">Moisture Level</p>
        <p className={`font-mono font-bold text-xl ${moisture < 30 ? 'text-red-400' : 'text-green-400'}`}>{moisture}%</p>
      </div>
      {status && <div className="text-blue-400 animate-pulse"><Droplets size={24} /></div>}
    </div>
  </div>
);

const Irrigation = () => {
  const [sectors, setSectors] = useState([]);
  const [autoMode, setAutoMode] = useState(true);
  const wsRef = useRef(null);

  useEffect(() => {
    wsRef.current = new WebSocket("ws://127.0.0.1:8000/ws/irrigation");
    wsRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.sectors) {
        setSectors(data.sectors);
      }
    };
    return () => wsRef.current?.close();
  }, []);

  const toggleSector = (id) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ action: "toggle", sector: id }));
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-panel p-8 rounded-3xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div className="flex items-center gap-4">
            <Droplets className="text-blue-400" size={40} />
            <div>
              <h1 className="text-3xl font-bold">Smart Irrigation System</h1>
              <p className="text-slate-400 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span> Water Management Network
              </p>
            </div>
          </div>
          
          <div className="flex gap-4">
            <button 
              onClick={() => setAutoMode(!autoMode)}
              className={`px-6 py-3 rounded-xl border transition flex items-center gap-2 font-bold ${autoMode ? 'bg-blue-500/20 border-blue-500/50 text-blue-400' : 'bg-white/5 border-white/10 text-white'}`}
            >
              <Activity size={18} /> {autoMode ? "AI Auto-Pilot: ON" : "AI Auto-Pilot: OFF"}
            </button>
            <button className="px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition">
              <RefreshCcw size={18} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {sectors.map(sector => (
            <IrrigationSector key={sector.id} {...sector} onToggle={toggleSector} />
          ))}
        </div>

        <div className="bg-black/20 border border-white/10 rounded-2xl p-6 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-xl mb-1">Main Pump Control</h3>
            <p className="text-sm text-slate-400">Total water usage today: 1,450 Liters</p>
          </div>
          <button className="w-24 h-24 rounded-full bg-blue-500 hover:bg-blue-600 shadow-[0_0_30px_rgba(59,130,246,0.5)] flex flex-col items-center justify-center transition hover:scale-105">
            <Power size={32} className="text-white mb-1" />
            <span className="font-bold text-xs uppercase tracking-wider text-white">Stop All</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Irrigation;
