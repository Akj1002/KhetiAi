import React, { useState } from "react";
import { motion } from "framer-motion";
import { MapContainer, TileLayer, Polygon, Marker, Popup } from "react-leaflet";
import { Plane, Layers, Play, Settings, AlertTriangle } from "lucide-react";

const flightPath = [
  [28.7041, 77.1025],
  [28.7045, 77.1025],
  [28.7045, 77.1030],
  [28.7041, 77.1030]
];

const DroneMapping = () => {
  const [activeTab, setActiveTab] = useState("flight"); // flight, ndvi
  const [isFlying, setIsFlying] = useState(false);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-panel p-8 rounded-3xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div className="flex items-center gap-4">
            <Plane className="text-cyan-400" size={40} />
            <div>
              <h1 className="text-3xl font-bold">Drone Mapping</h1>
              <p className="text-slate-400">Autonomous Flight Planning & NDVI Imagery</p>
            </div>
          </div>
          
          <div className="flex bg-black/40 rounded-xl p-1 border border-white/10">
            <button 
              onClick={() => setActiveTab("flight")}
              className={`px-6 py-2 rounded-lg text-sm font-bold transition ${activeTab === 'flight' ? 'bg-cyan-500 text-black shadow-lg' : 'text-slate-400 hover:text-white'}`}
            >
              Flight Planner
            </button>
            <button 
              onClick={() => setActiveTab("ndvi")}
              className={`px-6 py-2 rounded-lg text-sm font-bold transition ${activeTab === 'ndvi' ? 'bg-cyan-500 text-black shadow-lg' : 'text-slate-400 hover:text-white'}`}
            >
              NDVI Analysis
            </button>
          </div>
        </div>

        {activeTab === "flight" ? (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3 h-[500px] rounded-2xl overflow-hidden border border-white/10 relative z-0">
              <MapContainer center={[28.7043, 77.1027]} zoom={18} className="w-full h-full" scrollWheelZoom={false}>
                <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" />
                <Polygon positions={flightPath} pathOptions={{ color: '#06b6d4', weight: 3, dashArray: '10, 10', fillOpacity: 0.2 }} />
                <Marker position={[28.7041, 77.1025]}>
                  <Popup>Drone Launch Pad</Popup>
                </Marker>
              </MapContainer>
              {isFlying && (
                <div className="absolute top-4 left-4 z-[400] bg-black/80 backdrop-blur-md border border-cyan-500/50 px-4 py-2 rounded-lg flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                  <span className="text-cyan-400 font-bold text-sm tracking-wider">DRONE IN FLIGHT</span>
                </div>
              )}
            </div>
            
            <div className="space-y-6">
              <div className="bg-white/5 border border-white/10 p-5 rounded-2xl">
                <h3 className="font-bold mb-4 border-b border-white/10 pb-2">Mission Details</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between"><span className="text-slate-400">Area</span><span className="font-bold">2.4 Acres</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">Est. Time</span><span className="font-bold">14 mins</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">Altitude</span><span className="font-bold">40m</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">Battery Req.</span><span className="font-bold text-green-400">45%</span></div>
                </div>
              </div>
              
              <button 
                onClick={() => setIsFlying(!isFlying)}
                className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition ${isFlying ? 'bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/20' : 'bg-cyan-500 hover:bg-cyan-600 text-black shadow-lg shadow-cyan-500/20'}`}
              >
                {isFlying ? "ABORT MISSION" : <><Play fill="black" size={18} /> START FLIGHT</>}
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-[500px] border border-white/10 rounded-2xl bg-black/20 relative overflow-hidden group">
            {/* Fake NDVI image using a generic texture and color filters */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')] opacity-30 mix-blend-overlay"></div>
            <div className="absolute inset-0 bg-gradient-to-tr from-red-600/40 via-yellow-500/40 to-green-600/60 mix-blend-color"></div>
            
            <div className="z-10 bg-black/60 backdrop-blur-md border border-white/10 p-6 rounded-2xl max-w-md text-center">
              <Layers className="mx-auto mb-4 text-cyan-400" size={40} />
              <h3 className="text-xl font-bold mb-2">NDVI Analysis Complete</h3>
              <p className="text-sm text-slate-300 mb-4">The drone has successfully mapped the sector. The red zones indicate high plant stress (potential drought or pest issues).</p>
              <div className="flex justify-center gap-4 text-xs font-bold">
                <span className="flex items-center gap-1"><div className="w-3 h-3 bg-red-500 rounded-sm"></div> High Stress</span>
                <span className="flex items-center gap-1"><div className="w-3 h-3 bg-yellow-500 rounded-sm"></div> Moderate</span>
                <span className="flex items-center gap-1"><div className="w-3 h-3 bg-green-500 rounded-sm"></div> Healthy</span>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default DroneMapping;
