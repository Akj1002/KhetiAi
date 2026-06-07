import React, { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import L from "leaflet";
import { MapPin, Activity, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const cowIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/1998/1998634.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const alertIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/1998/1998634.png',
  iconSize: [38, 38],
  iconAnchor: [19, 38],
  popupAnchor: [0, -38],
  className: 'animate-pulse hue-rotate-180'
});

const Livestock = () => {
  const [cattle, setCattle] = useState([]);
  const wsRef = useRef(null);

  useEffect(() => {
    wsRef.current = new WebSocket("ws://127.0.0.1:8000/ws/livestock");
    wsRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setCattle(data.cattle);
    };
    return () => wsRef.current?.close();
  }, []);

  const center = [28.702, 77.102];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-panel p-8 rounded-3xl">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <MapPin className="text-orange-400" size={40} />
            <div>
              <h1 className="text-3xl font-bold">Livestock GPS Tracker</h1>
              <p className="text-slate-400 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span> Live Satellite Feed
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-xl">
              <span className="text-green-400 font-bold">{cattle.filter(c => c.temp <= 39).length}</span> Healthy
            </div>
            <div className="px-4 py-2 bg-red-500/10 border border-red-500/30 rounded-xl">
              <span className="text-red-400 font-bold">{cattle.filter(c => c.temp > 39).length}</span> Alert
            </div>
          </div>
        </div>

        {/* Live Leaflet Map */}
        <div className="h-[500px] w-full rounded-2xl overflow-hidden border border-white/10 mb-8 relative z-0">
          <MapContainer center={center} zoom={16} style={{ height: '100%', width: '100%' }}>
            {/* Satellite View Layer */}
            <TileLayer
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              attribution="Tiles &copy; Esri"
            />
            
            {/* Farm Boundary Geofence */}
            <Circle center={center} radius={400} pathOptions={{ color: 'yellow', fillColor: 'transparent', weight: 2, dashArray: '10, 10' }} />

            {/* Live Cattle Markers */}
            {cattle.map(c => {
              const isAlert = c.temp > 39;
              return (
                <Marker key={c.id} position={[c.lat, c.lon]} icon={isAlert ? alertIcon : cowIcon}>
                  <Popup>
                    <div className="p-1">
                      <h3 className="font-bold text-lg border-b pb-1 mb-2">{c.id}</h3>
                      <p className="flex items-center gap-2 m-0"><Heart size={14} className="text-pink-500" /> HR: {c.heart_rate} BPM</p>
                      <p className="flex items-center gap-2 m-0"><Activity size={14} className="text-orange-500" /> Temp: {c.temp.toFixed(1)}°C</p>
                      {isAlert && <p className="text-red-500 font-bold text-xs mt-2">FEVER DETECTED!</p>}
                    </div>
                  </Popup>
                </Marker>
              )
            })}
          </MapContainer>
        </div>
      </motion.div>
    </div>
  );
};

export default Livestock;
