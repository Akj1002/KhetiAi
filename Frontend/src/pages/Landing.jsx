import React from "react";
import { Link } from "react-router-dom";
import { Sprout, CloudRain, ShieldAlert, Cpu, Users, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";

const Landing = () => {
  const features = [
    { icon: <Cpu size={40} className="text-purple-400" />, title: "AI Diagnostics", desc: "Real-time disease detection using Gemini Vision AI." },
    { icon: <BarChart3 size={40} className="text-blue-400" />, title: "Live Markets", desc: "Stream real-time commodity prices and trends." },
    { icon: <Sprout size={40} className="text-green-400" />, title: "Smart IoT", desc: "Monitor soil health and automate irrigation systems." },
    { icon: <Users size={40} className="text-orange-400" />, title: "Community", desc: "Connect with expert agronomists instantly." }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] flex flex-col items-center pt-20 px-4 relative overflow-hidden">
      {/* Decorative background blur */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/20 blur-[100px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 blur-[100px] rounded-full pointer-events-none"></div>

      <motion.div initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-center z-10 max-w-4xl">
        <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-sm">
          <Sprout className="text-green-400" size={24} />
          <span className="text-green-300 font-medium tracking-wide">KHETIAI</span>
        </div>
        
        <h1 className="text-6xl md:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-300 to-blue-500 mb-6 drop-shadow-lg">
          The Future of Farming.
        </h1>
        <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed">
          Enterprise-grade agricultural intelligence. Real-time IoT monitoring, Gemini AI diagnostics, and precision farming at your fingertips.
        </p>

        <div className="flex justify-center gap-6">
          <Link to="/auth?mode=register" className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:scale-105 text-white font-bold rounded-2xl shadow-[0_0_30px_rgba(34,197,94,0.3)] transition-all">
            Get Started Free
          </Link>
          <Link to="/auth?mode=login" className="px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/10 text-white font-bold rounded-2xl backdrop-blur-sm transition-all">
            Sign In
          </Link>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-32 z-10 w-full max-w-7xl pb-20">
        {features.map((f, i) => (
          <motion.div 
            key={i} 
            initial={{ y: 50, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }} 
            transition={{ delay: 0.2 + i * 0.1 }}
            className="glass-panel p-8 rounded-3xl hover:-translate-y-2 transition-transform duration-300"
          >
            <div className="mb-4 bg-white/5 inline-block p-4 rounded-2xl border border-white/10">
              {f.icon}
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{f.title}</h3>
            <p className="text-slate-400 leading-relaxed">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Landing;
