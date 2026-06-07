import React, { useState } from "react";
import axios from "axios";
import { Cloud, MapPin, Search, Wind, Droplets, Sun } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";

const customIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32]
});

const MapClickHandler = ({ setLat, setLon, fetchWeather }) => {
  useMapEvents({
    click(e) {
      setLat(e.latlng.lat.toFixed(4));
      setLon(e.latlng.lng.toFixed(4));
      fetchWeather(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
};

const Weather = () => {
  const [lat, setLat] = useState("28.6139");
  const [lon, setLon] = useState("77.2090");
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchWeather = async (latitude = lat, longitude = lon) => {
    if (!latitude || !longitude) return;
    setLoading(true);
    try {
      const res = await axios.get(`http://127.0.0.1:8000/weather/forecast?lat=${latitude}&lon=${longitude}`);
      setForecast(res.data.daily);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-panel p-8 rounded-3xl">
        <div className="flex items-center gap-4 mb-6">
          <Cloud className="text-blue-400" size={40} />
          <div>
            <h1 className="text-3xl font-bold">Interactive Weather Radar</h1>
            <p className="text-slate-400">Click anywhere on the map to fetch an instant 7-day forecast.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 h-[400px] rounded-2xl overflow-hidden border border-white/10 relative z-0">
            <MapContainer center={[28.6139, 77.2090]} zoom={5} style={{ height: '100%', width: '100%' }}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <MapClickHandler setLat={setLat} setLon={setLon} fetchWeather={fetchWeather} />
              {lat && lon && <Marker position={[lat, lon]} icon={customIcon} />}
            </MapContainer>
          </div>
          
          <div className="flex flex-col gap-4">
            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
              <h3 className="text-sm text-slate-400 uppercase tracking-wide mb-4">Coordinates</h3>
              <div className="space-y-4">
                <div className="relative">
                  <MapPin className="absolute left-3 top-3.5 text-blue-400" size={20} />
                  <input type="text" readOnly value={lat} className="w-full pl-10 pr-4 py-3 bg-black/40 rounded-xl text-white outline-none" />
                </div>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3.5 text-blue-400" size={20} />
                  <input type="text" readOnly value={lon} className="w-full pl-10 pr-4 py-3 bg-black/40 rounded-xl text-white outline-none" />
                </div>
                <button 
                  onClick={() => fetchWeather(lat, lon)}
                  disabled={loading}
                  className="w-full py-3 bg-blue-500 hover:bg-blue-600 font-bold rounded-xl flex justify-center items-center gap-2"
                >
                  {loading ? "Fetching Data..." : "Refresh Data"}
                </button>
              </div>
            </div>

            {/* Micro gauges */}
            <div className="grid grid-cols-2 gap-4">
               <div className="bg-white/5 p-4 rounded-xl flex flex-col items-center justify-center text-center">
                 <Wind className="text-teal-400 mb-2" size={24} />
                 <span className="text-xs text-slate-400">Wind</span>
                 <span className="font-bold">12 km/h</span>
               </div>
               <div className="bg-white/5 p-4 rounded-xl flex flex-col items-center justify-center text-center">
                 <Droplets className="text-blue-400 mb-2" size={24} />
                 <span className="text-xs text-slate-400">Humidity</span>
                 <span className="font-bold">64%</span>
               </div>
            </div>
          </div>
        </div>

        {forecast && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">7-Day Extended Forecast</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-4">
              <AnimatePresence>
                {forecast.time.map((time, idx) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    key={time} 
                    className="bg-white/5 border border-white/10 p-4 rounded-xl flex flex-col items-center hover:bg-white/10 transition cursor-pointer"
                  >
                    <span className="text-slate-400 text-xs mb-3">{new Date(time).toLocaleDateString('en-US', {weekday: 'short', month:'short', day:'numeric'})}</span>
                    {forecast.precipitation_sum[idx] > 5 ? <Cloud size={32} className="text-blue-400 mb-2" /> : <Sun size={32} className="text-yellow-400 mb-2" />}
                    <span className="font-bold text-lg">{forecast.temperature_2m_max[idx]}°</span>
                    <span className="text-xs text-slate-500 mb-2">{forecast.temperature_2m_min[idx]}°</span>
                    <span className="text-[10px] bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full">{forecast.precipitation_sum[idx]}mm</span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Weather;
