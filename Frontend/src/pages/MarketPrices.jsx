import React, { useState, useEffect, useRef } from "react";
import { TrendingUp, TrendingDown, IndianRupee, Bell, Search, Activity } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const historicalData = {
  Wheat: [
    { name: 'Mon', price: 2150 }, { name: 'Tue', price: 2180 }, { name: 'Wed', price: 2100 },
    { name: 'Thu', price: 2200 }, { name: 'Fri', price: 2250 }, { name: 'Sat', price: 2300 }, { name: 'Sun', price: 2280 }
  ],
  Rice: [
    { name: 'Mon', price: 3400 }, { name: 'Tue', price: 3450 }, { name: 'Wed', price: 3420 },
    { name: 'Thu', price: 3500 }, { name: 'Fri', price: 3550 }, { name: 'Sat', price: 3600 }, { name: 'Sun', price: 3580 }
  ],
  Maize: [
    { name: 'Mon', price: 1800 }, { name: 'Tue', price: 1750 }, { name: 'Wed', price: 1780 },
    { name: 'Thu', price: 1820 }, { name: 'Fri', price: 1850 }, { name: 'Sat', price: 1900 }, { name: 'Sun', price: 1880 }
  ]
};

const MarketPrices = () => {
  const [prices, setPrices] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCrop, setSelectedCrop] = useState("Wheat");
  const wsRef = useRef(null);

  useEffect(() => {
    wsRef.current = new WebSocket("ws://127.0.0.1:8000/ws/market");
    wsRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setPrices(data.market);
    };
    return () => wsRef.current?.close();
  }, []);

  const filtered = prices.filter(p => p.commodity.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-panel p-8 rounded-3xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div className="flex items-center gap-4">
            <TrendingUp className="text-yellow-400" size={40} />
            <div>
              <h1 className="text-3xl font-bold">Real-time Market Prices</h1>
              <p className="text-slate-400 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> Live Mandi API Feed
              </p>
            </div>
          </div>
          
          <div className="flex gap-4">
            <div className="relative w-64">
              <Search className="absolute left-3 top-3.5 text-slate-400" size={18} />
              <input 
                type="text" placeholder="Search commodity..." 
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-yellow-400 transition text-white"
                value={search} onChange={e => setSearch(e.target.value)}
              />
            </div>
            <button className="px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition flex items-center gap-2">
              <Bell size={18} className="text-slate-300" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Live Ticker Cards */}
          <div className="lg:col-span-1 space-y-4 max-h-[500px] overflow-y-auto custom-scrollbar pr-2">
            <AnimatePresence>
              {filtered.map(p => (
                <motion.div 
                  key={p.commodity}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  onClick={() => historicalData[p.commodity] && setSelectedCrop(p.commodity)}
                  className={`p-5 rounded-2xl border cursor-pointer transition-all ${selectedCrop === p.commodity ? 'bg-yellow-500/10 border-yellow-500/50 scale-[1.02]' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-bold text-lg">{p.commodity}</h3>
                    <span className="text-xs text-slate-400 font-mono">{p.market}</span>
                  </div>
                  <div className="flex justify-between items-end">
                    <div className="flex items-center gap-1 text-2xl font-bold font-mono">
                      <IndianRupee size={20} className="text-slate-400" /> {p.price.toFixed(2)}
                    </div>
                    {p.trend === "up" ? (
                      <span className="flex items-center gap-1 text-green-400 font-bold text-sm bg-green-500/20 px-2 py-1 rounded-full"><TrendingUp size={14} /> +2.4%</span>
                    ) : (
                      <span className="flex items-center gap-1 text-red-400 font-bold text-sm bg-red-500/20 px-2 py-1 rounded-full"><TrendingDown size={14} /> -1.2%</span>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Chart Area */}
          <div className="lg:col-span-2 bg-black/20 border border-white/10 rounded-2xl p-6 flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-xl flex items-center gap-2"><Activity className="text-yellow-400" /> {selectedCrop} 7-Day Trend</h3>
              <select className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm outline-none">
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
                <option>This Year</option>
              </select>
            </div>
            
            <div className="flex-1 min-h-[300px]">
              {historicalData[selectedCrop] ? (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={historicalData[selectedCrop]} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#facc15" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#facc15" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" stroke="#64748b" tick={{fill: '#64748b'}} />
                    <YAxis stroke="#64748b" tick={{fill: '#64748b'}} domain={['dataMin - 100', 'dataMax + 100']} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px' }}
                      itemStyle={{ color: '#facc15', fontWeight: 'bold' }}
                    />
                    <Area type="monotone" dataKey="price" stroke="#facc15" strokeWidth={3} fillOpacity={1} fill="url(#colorPrice)" />
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-500">
                  No historical data available for {selectedCrop}.
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MarketPrices;
