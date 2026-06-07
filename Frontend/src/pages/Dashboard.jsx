import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Sprout, CloudRain, ShieldAlert, TrendingUp, Activity, Map, Droplets, Sun, Wind } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  const [telemetry, setTelemetry] = useState([]);
  const wsRef = useRef(null);

  useEffect(() => {
    wsRef.current = new WebSocket("ws://127.0.0.1:8000/ws/dashboard");
    wsRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setTelemetry(prev => {
        const newStats = [...prev, data];
        return newStats.slice(-10); // keep last 10 points
      });
    };
    return () => wsRef.current?.close();
  }, []);

  const latest = telemetry[telemetry.length - 1] || {
    soil_moisture: 0, temperature: 0, wind_speed: 0, crop_health: 0
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      
      {/* Welcome Banner */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative bg-gradient-to-br from-green-500/20 to-blue-500/20 border border-white/10 p-8 rounded-3xl overflow-hidden glass-panel">
        <div className="absolute top-0 right-0 p-12 opacity-10">
          <Sprout size={120} />
        </div>
        <div className="relative z-10 flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Welcome back to KhetiAI 🌾</h1>
            <p className="text-lg text-slate-300">Your farm is looking healthy today. Live telemetry synced.</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-slate-400 font-bold uppercase tracking-wider">Farm Status</p>
            <h2 className="text-3xl font-extrabold text-green-400">OPTIMAL</h2>
          </div>
        </div>
      </motion.div>

      {/* Mini Charts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-panel p-6 rounded-3xl border border-white/10 hover:bg-white/5 transition">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-slate-400 text-sm font-bold uppercase">Soil Moisture</p>
              <h3 className="text-2xl font-bold mt-1">{latest.soil_moisture}%</h3>
            </div>
            <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400"><Droplets size={20}/></div>
          </div>
          <div className="h-16">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={telemetry}>
                <defs><linearGradient id="c1"><stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/><stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/></linearGradient></defs>
                <Area type="monotone" dataKey="soil_moisture" stroke="#3b82f6" fillOpacity={1} fill="url(#c1)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-panel p-6 rounded-3xl border border-white/10 hover:bg-white/5 transition">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-slate-400 text-sm font-bold uppercase">Temperature</p>
              <h3 className="text-2xl font-bold mt-1">{latest.temperature}°C</h3>
            </div>
            <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-400"><Sun size={20}/></div>
          </div>
          <div className="h-16">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={telemetry}>
                <defs><linearGradient id="c2"><stop offset="5%" stopColor="#eab308" stopOpacity={0.3}/><stop offset="95%" stopColor="#eab308" stopOpacity={0}/></linearGradient></defs>
                <Area type="monotone" dataKey="temperature" stroke="#eab308" fillOpacity={1} fill="url(#c2)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-panel p-6 rounded-3xl border border-white/10 hover:bg-white/5 transition">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-slate-400 text-sm font-bold uppercase">Wind Speed</p>
              <h3 className="text-2xl font-bold mt-1">{latest.wind_speed} km/h</h3>
            </div>
            <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400"><Wind size={20}/></div>
          </div>
          <div className="h-16">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={telemetry}>
                <defs><linearGradient id="c3"><stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/><stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/></linearGradient></defs>
                <Area type="monotone" dataKey="wind_speed" stroke="#06b6d4" fillOpacity={1} fill="url(#c3)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass-panel p-6 rounded-3xl border border-white/10 hover:bg-white/5 transition">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-slate-400 text-sm font-bold uppercase">Crop Health</p>
              <h3 className="text-2xl font-bold mt-1 text-green-400">{latest.crop_health}%</h3>
            </div>
            <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-400"><Activity size={20}/></div>
          </div>
          <div className="h-16">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={telemetry}>
                <defs><linearGradient id="c4"><stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/><stop offset="95%" stopColor="#22c55e" stopOpacity={0}/></linearGradient></defs>
                <Area type="monotone" dataKey="crop_health" stroke="#22c55e" fillOpacity={1} fill="url(#c4)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-panel p-6 rounded-3xl border border-white/10">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold flex items-center gap-2"><Map className="text-purple-400" /> Live Farm Map</h3>
            <span className="text-xs bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full font-bold animate-pulse">Live Sync Active</span>
          </div>
          <div className="w-full h-80 rounded-2xl bg-[#0f172a] border border-white/10 relative overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
            <div className={`absolute top-1/4 left-1/4 w-32 h-32 ${latest.soil_moisture > 40 ? 'bg-green-500/30 border-green-500/50' : 'bg-red-500/30 border-red-500/50'} border rounded-lg flex items-center justify-center transition-colors`}>Sec 1</div>
            <div className={`absolute bottom-1/4 right-1/3 w-40 h-24 ${latest.crop_health > 80 ? 'bg-green-500/30 border-green-500/50' : 'bg-yellow-500/30 border-yellow-500/50'} border rounded-lg flex items-center justify-center transition-colors`}>Sec 2</div>
            <div className="absolute top-1/3 right-1/4 w-24 h-48 bg-blue-500/30 border border-blue-500/50 rounded-lg flex items-center justify-center">Irrigation</div>
            
            <div className="absolute top-4 left-4 flex gap-2">
              <span className="flex items-center gap-1 text-xs bg-black/50 px-2 py-1 rounded"><div className="w-2 h-2 rounded-full bg-green-500"></div> Healthy</span>
              <span className="flex items-center gap-1 text-xs bg-black/50 px-2 py-1 rounded"><div className="w-2 h-2 rounded-full bg-yellow-500"></div> Stress</span>
              <span className="flex items-center gap-1 text-xs bg-black/50 px-2 py-1 rounded"><div className="w-2 h-2 rounded-full bg-red-500"></div> Critical</span>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-3xl border border-white/10">
             <h3 className="text-xl font-bold mb-4 flex items-center gap-2"><ShieldAlert className="text-red-400" /> Recent Alerts</h3>
             <div className="space-y-3">
               <div className="bg-red-500/10 border border-red-500/20 p-3 rounded-xl flex justify-between items-center">
                 <div className="text-sm"><span className="font-bold text-red-400">High Risk:</span> Blight detected in Sector 2</div>
                 <span className="text-xs text-slate-400">2m ago</span>
               </div>
               <div className="bg-yellow-500/10 border border-yellow-500/20 p-3 rounded-xl flex justify-between items-center">
                 <div className="text-sm"><span className="font-bold text-yellow-400">Warning:</span> Expected heavy rainfall tomorrow</div>
                 <span className="text-xs text-slate-400">1h ago</span>
               </div>
             </div>
          </div>
          
          <div className="glass-panel p-6 rounded-3xl border border-white/10 bg-gradient-to-b from-transparent to-green-900/20">
             <h3 className="text-xl font-bold mb-4 flex items-center gap-2"><TrendingUp className="text-green-400" /> Market Snapshot</h3>
             <div className="space-y-4">
               <div className="flex justify-between items-center border-b border-white/5 pb-2">
                 <span className="text-slate-300">Wheat (Local)</span>
                 <span className="font-bold text-green-400">₹2,250 <span className="text-xs">↑</span></span>
               </div>
               <div className="flex justify-between items-center">
                 <span className="text-slate-300">Rice (Grade A)</span>
                 <span className="font-bold text-red-400">₹3,400 <span className="text-xs">↓</span></span>
               </div>
             </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Dashboard;
