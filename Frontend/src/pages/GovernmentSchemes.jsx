import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Landmark, Search, Filter, FileText, CheckCircle, ArrowRight } from "lucide-react";

const schemes = [
  { id: 1, name: "PM-KISAN Samman Nidhi", category: "Financial", state: "All India", benefit: "₹6,000/year", match: 95 },
  { id: 2, name: "Pradhan Mantri Fasal Bima Yojana", category: "Insurance", state: "All India", benefit: "Crop Insurance", match: 88 },
  { id: 3, name: "Kisan Credit Card (KCC)", category: "Credit", state: "All India", benefit: "Subsidized Loan", match: 92 },
  { id: 4, name: "Paramparagat Krishi Vikas Yojana", category: "Organic", state: "All India", benefit: "₹50,000/ha subsidy", match: 45 },
  { id: 5, name: "Mukhya Mantri Krishi Ashirwad Yojana", category: "Financial", state: "Jharkhand", benefit: "₹5,000/acre", match: 12 },
  { id: 6, name: "Rythu Bandhu", category: "Financial", state: "Telangana", benefit: "₹10,000/acre", match: 0 },
];

const GovernmentSchemes = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filteredSchemes = schemes.filter(s => 
    (filter === "All" || s.category === filter) &&
    s.name.toLowerCase().includes(search.toLowerCase())
  ).sort((a, b) => b.match - a.match);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-panel p-8 rounded-3xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div className="flex items-center gap-4">
            <Landmark className="text-yellow-400" size={40} />
            <div>
              <h1 className="text-3xl font-bold">Govt Schemes & Subsidies</h1>
              <p className="text-slate-400 flex items-center gap-2">
                AI Auto-Eligibility Matcher
              </p>
            </div>
          </div>
          
          <div className="flex gap-4">
            <div className="relative w-64">
              <Search className="absolute left-3 top-3.5 text-slate-400" size={18} />
              <input 
                type="text" placeholder="Search schemes..." 
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-yellow-400 transition text-white"
                value={search} onChange={e => setSearch(e.target.value)}
              />
            </div>
            <select 
              value={filter} onChange={e => setFilter(e.target.value)}
              className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl outline-none"
            >
              <option value="All">All Categories</option>
              <option value="Financial">Financial</option>
              <option value="Insurance">Insurance</option>
              <option value="Credit">Credit</option>
              <option value="Organic">Organic Farming</option>
            </select>
          </div>
        </div>

        {/* AI Eligibility Banner */}
        <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 p-6 rounded-2xl mb-8 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-400">
              <CheckCircle size={24} />
            </div>
            <div>
              <h3 className="font-bold text-lg text-yellow-400">AI Eligibility Match Completed</h3>
              <p className="text-sm text-slate-300">Based on your farm profile (2 Acres, Wheat, UP), we found 3 highly relevant schemes.</p>
            </div>
          </div>
          <button className="px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded-xl transition">
            Update Profile
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence>
            {filteredSchemes.map((scheme, idx) => (
              <motion.div 
                key={scheme.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition group flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold">{scheme.name}</h3>
                    {scheme.match >= 80 ? (
                      <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap">
                        {scheme.match}% Match
                      </span>
                    ) : scheme.match > 0 ? (
                      <span className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap">
                        {scheme.match}% Match
                      </span>
                    ) : (
                      <span className="bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap">
                        Not Eligible
                      </span>
                    )}
                  </div>
                  
                  <div className="flex gap-3 mb-6">
                    <span className="text-xs bg-black/30 px-3 py-1.5 rounded-lg border border-white/5 text-slate-300 flex items-center gap-1"><FileText size={12}/> {scheme.category}</span>
                    <span className="text-xs bg-black/30 px-3 py-1.5 rounded-lg border border-white/5 text-slate-300">{scheme.state}</span>
                  </div>
                </div>

                <div className="flex justify-between items-end border-t border-white/10 pt-4">
                  <div>
                    <p className="text-xs text-slate-400 uppercase font-bold tracking-wider mb-1">Max Benefit</p>
                    <p className="text-xl font-bold text-yellow-400">{scheme.benefit}</p>
                  </div>
                  <button className="flex items-center gap-2 text-sm font-bold text-white group-hover:text-yellow-400 transition">
                    Apply Now <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default GovernmentSchemes;
