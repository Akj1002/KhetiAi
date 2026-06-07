import React, { useState, useEffect, useRef } from "react";
import { TestTube, Droplets, Map as MapIcon, RefreshCcw, Download } from "lucide-react";
import { motion } from "framer-motion";

const GridSector = ({ id, active, onClick, data }) => {
  const getStatusColor = (n) => {
    if (n < 40) return "bg-red-500/20 border-red-500/50";
    if (n > 80) return "bg-yellow-500/20 border-yellow-500/50";
    return "bg-green-500/20 border-green-500/50";
  };

  return (
    <div 
      onClick={() => onClick(id)}
      className={`
        aspect-square rounded-xl border-2 transition-all cursor-pointer flex flex-col items-center justify-center
        ${active ? 'ring-4 ring-white shadow-2xl scale-105 z-10' : 'hover:scale-105 hover:bg-white/10'}
        ${data ? getStatusColor(data.n) : 'bg-white/5 border-white/10'}
      `}
    >
      <span className="font-bold text-sm text-white/50 mb-1">Sec {id}</span>
      {data && (
        <div className="flex gap-1 text-[10px] font-mono">
          <span className="text-green-400">N:{data.n}</span>
          <span className="text-blue-400">P:{data.p}</span>
          <span className="text-yellow-400">K:{data.k}</span>
        </div>
      )}
    </div>
  );
};

const SoilHealth = () => {
  const [sensors, setSensors] = useState([]);
  const [activeSector, setActiveSector] = useState(1);
  const wsRef = useRef(null);

  useEffect(() => {
    wsRef.current = new WebSocket("ws://127.0.0.1:8000/ws/soil_iot");
    wsRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setSensors(data.sensors);
    };
    return () => wsRef.current?.close();
  }, []);

  const activeData = sensors.find(s => s.id === `Sensor_${activeSector}`);

  const handleExport = () => {
    alert("Downloading CSV report...");
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-panel p-8 rounded-3xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div className="flex items-center gap-4">
            <TestTube className="text-purple-400" size={40} />
            <div>
              <h1 className="text-3xl font-bold">Smart Soil IoT</h1>
              <p className="text-slate-400 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> NPK & Moisture Sensor Network
              </p>
            </div>
          </div>
          <button onClick={handleExport} className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl transition flex items-center justify-center gap-2 font-bold text-sm">
            <Download size={18} /> Export CSV
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Interactive Farm Grid */}
          <div className="bg-black/20 border border-white/10 p-8 rounded-2xl relative">
            <div className="absolute top-4 right-4 text-slate-500 flex items-center gap-2 text-xs uppercase font-bold">
              <MapIcon size={14} /> Farm Topography
            </div>
            <div className="grid grid-cols-3 gap-3 mt-4">
              {[1,2,3,4,5,6,7,8,9].map(id => (
                <GridSector 
                  key={id} 
                  id={id} 
                  active={activeSector === id} 
                  onClick={setActiveSector}
                  data={sensors.find(s => s.id === `Sensor_${id}`)}
                />
              ))}
            </div>
            
            <div className="mt-8 flex justify-center gap-4 text-xs font-bold text-slate-400">
              <span className="flex items-center gap-2"><div className="w-3 h-3 bg-green-500/50 rounded-full"></div> Optimal</span>
              <span className="flex items-center gap-2"><div className="w-3 h-3 bg-yellow-500/50 rounded-full"></div> High</span>
              <span className="flex items-center gap-2"><div className="w-3 h-3 bg-red-500/50 rounded-full"></div> Critical</span>
            </div>
          </div>

          {/* Detailed Stats */}
          <div className="space-y-6">
            {activeData ? (
              <>
                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-bold">Sector {activeSector} Analytics</h2>
                    <p className="text-sm text-slate-400 mt-1 flex items-center gap-2"><RefreshCcw size={12} className="animate-spin-slow" /> Synced just now</p>
                  </div>
                  <div className="w-16 h-16 rounded-full border-4 border-green-500/50 flex items-center justify-center text-xl font-bold bg-green-500/10">
                    94%
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 border border-white/10 p-5 rounded-2xl relative overflow-hidden group hover:bg-white/10 transition">
                    <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition"><TestTube size={100} /></div>
                    <span className="text-slate-400 text-sm font-bold uppercase tracking-wider">Nitrogen (N)</span>
                    <h3 className="text-4xl font-bold text-green-400 mt-2 font-mono">{activeData.n} <span className="text-sm text-slate-500">mg/kg</span></h3>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-5 rounded-2xl relative overflow-hidden group hover:bg-white/10 transition">
                    <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition"><TestTube size={100} /></div>
                    <span className="text-slate-400 text-sm font-bold uppercase tracking-wider">Phosphorus (P)</span>
                    <h3 className="text-4xl font-bold text-blue-400 mt-2 font-mono">{activeData.p} <span className="text-sm text-slate-500">mg/kg</span></h3>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-5 rounded-2xl relative overflow-hidden group hover:bg-white/10 transition">
                    <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition"><TestTube size={100} /></div>
                    <span className="text-slate-400 text-sm font-bold uppercase tracking-wider">Potassium (K)</span>
                    <h3 className="text-4xl font-bold text-yellow-400 mt-2 font-mono">{activeData.k} <span className="text-sm text-slate-500">mg/kg</span></h3>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-5 rounded-2xl relative overflow-hidden group hover:bg-white/10 transition">
                    <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition"><Droplets size={100} /></div>
                    <span className="text-slate-400 text-sm font-bold uppercase tracking-wider">Moisture</span>
                    <h3 className="text-4xl font-bold text-cyan-400 mt-2 font-mono">{activeData.moisture}%</h3>
                  </div>
                </div>
              </>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-slate-500 bg-white/5 border border-white/10 rounded-2xl">
                <RefreshCcw size={48} className="animate-spin-slow mb-4 opacity-50" />
                <p>Awaiting sensor telemetry...</p>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SoilHealth;
