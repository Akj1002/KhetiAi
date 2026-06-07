import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Bell, AlertTriangle, Info, CheckCircle, Clock } from "lucide-react";

const SmartAlerts = () => {
  const [alerts, setAlerts] = useState([]);
  const wsRef = useRef(null);

  useEffect(() => {
    wsRef.current = new WebSocket("ws://127.0.0.1:8000/ws/alerts");
    wsRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.alert) {
        setAlerts(prev => [data.alert, ...prev].slice(0, 15)); // Keep last 15 alerts
      }
    };
    return () => wsRef.current?.close();
  }, []);

  const getAlertIcon = (type) => {
    switch(type) {
      case "critical": return <AlertTriangle className="text-red-400" size={24} />;
      case "warning": return <AlertTriangle className="text-yellow-400" size={24} />;
      case "success": return <CheckCircle className="text-green-400" size={24} />;
      default: return <Info className="text-blue-400" size={24} />;
    }
  };

  const getAlertColor = (type) => {
    switch(type) {
      case "critical": return "bg-red-500/10 border-red-500/30 hover:bg-red-500/20";
      case "warning": return "bg-yellow-500/10 border-yellow-500/30 hover:bg-yellow-500/20";
      case "success": return "bg-green-500/10 border-green-500/30 hover:bg-green-500/20";
      default: return "bg-blue-500/10 border-blue-500/30 hover:bg-blue-500/20";
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-panel p-8 rounded-3xl">
        <div className="flex items-center gap-4 mb-8">
          <Bell className="text-purple-400" size={40} />
          <div>
            <h1 className="text-3xl font-bold">Smart Notification Center</h1>
            <p className="text-slate-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse"></span> Live Event Stream
            </p>
          </div>
        </div>

        {alerts.length === 0 && (
          <div className="text-center py-12 text-slate-500">
            <Bell size={48} className="mx-auto mb-4 opacity-50" />
            <p>Waiting for incoming alerts...</p>
          </div>
        )}

        <div className="relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300/20 before:to-transparent">
          {alerts.map((alert, idx) => (
            <motion.div 
              key={alert.id}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              layout
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active mb-8"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/20 bg-[#0f172a] group-[.is-active]:bg-slate-800 text-slate-500 group-[.is-active]:text-emerald-50 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                {getAlertIcon(alert.type)}
              </div>
              <div className={`w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-5 rounded-2xl border transition-all ${getAlertColor(alert.type)}`}>
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-bold text-lg text-white">{alert.title}</h3>
                  <span className="text-xs font-mono text-slate-400 flex items-center gap-1"><Clock size={12}/> {alert.time}</span>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">{alert.message}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default SmartAlerts;
