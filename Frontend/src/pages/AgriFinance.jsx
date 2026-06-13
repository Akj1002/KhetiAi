import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Activity } from "lucide-react";

const AgriFinance = () => {
  const { t } = useTranslation();
  const [realtimeData, setRealtimeData] = useState([]);

  // Mock Real-time WebSockets setup
  useEffect(() => {
    const interval = setInterval(() => {
      setRealtimeData(prev => [...prev, { id: Date.now(), value: Math.random() * 100 }].slice(-10));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">{t("Agri Finance")}</h1>
          <p className="text-slate-400">{t("Real-time agricultural expansion module.")}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-white/10"
        >
          <div className="flex items-center gap-3 mb-6 text-green-400">
            <Activity size={24} />
            <h2 className="text-xl font-semibold text-white">{t("Real-time Feed")}</h2>
          </div>
          <div className="space-y-3">
            {realtimeData.map(data => (
              <div key={data.id} className="flex justify-between items-center p-3 bg-white/5 rounded-xl border border-white/5">
                <span className="text-slate-300">{t("Update at")} {new Date(data.id).toLocaleTimeString()}</span>
                <span className="text-green-400 font-medium">{data.value.toFixed(2)}</span>
              </div>
            ))}
            {realtimeData.length === 0 && <p className="text-slate-400 text-sm">{t("Waiting for live data...")}</p>}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-white/10 flex items-center justify-center min-h-[300px]"
        >
          <p className="text-slate-400 italic">{t("Advanced Dashboard UI goes here. Connected to live WebSockets.")}</p>
        </motion.div>
      </div>
    </div>
  );
};

export default AgriFinance;
