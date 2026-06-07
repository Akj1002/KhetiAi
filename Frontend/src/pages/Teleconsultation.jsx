import React, { useState } from "react";
import { motion } from "framer-motion";
import { Video, Calendar, Phone, Star, MessageSquare, CheckCircle } from "lucide-react";

const experts = [
  { id: 1, name: "Dr. Arvind Sharma", spec: "Plant Pathologist", rating: 4.9, status: "Available", price: "₹500/hr" },
  { id: 2, name: "Dr. Meena Iyer", spec: "Soil Scientist", rating: 4.8, status: "Busy", price: "₹450/hr" },
  { id: 3, name: "Prof. Rajesh Kumar", spec: "Agronomist", rating: 5.0, status: "Available", price: "₹600/hr" }
];

const Teleconsultation = () => {
  const [inCall, setInCall] = useState(false);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-panel p-8 rounded-3xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div className="flex items-center gap-4">
            <Video className="text-pink-400" size={40} />
            <div>
              <h1 className="text-3xl font-bold">Agri-Expert Teleconsultation</h1>
              <p className="text-slate-400">Connect with top agronomists via video call.</p>
            </div>
          </div>
          
          <button className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition flex items-center gap-2 font-bold">
            <Calendar size={18} /> My Appointments
          </button>
        </div>

        {inCall ? (
          <div className="relative bg-black rounded-3xl overflow-hidden border border-white/10 h-[600px] flex items-center justify-center">
            {/* Fake Video Feed */}
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1560493676-04071c5f467b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center opacity-60 mix-blend-luminosity"></div>
            
            {/* Self Video PIP */}
            <div className="absolute bottom-8 right-8 w-48 h-64 bg-slate-800 rounded-2xl border-2 border-white/20 overflow-hidden shadow-2xl">
               <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1592982537447-6f29633ddf34?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80')] bg-cover bg-center opacity-80"></div>
            </div>

            {/* Call Controls */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md px-8 py-4 rounded-full border border-white/10 flex gap-6">
              <button className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition">
                <Video size={20} />
              </button>
              <button 
                onClick={() => setInCall(false)}
                className="w-12 h-12 rounded-full bg-red-500 hover:bg-red-600 shadow-lg shadow-red-500/20 flex items-center justify-center transition"
              >
                <Phone size={20} className="rotate-[135deg]" />
              </button>
              <button className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition">
                <MessageSquare size={20} />
              </button>
            </div>

            <div className="absolute top-8 left-8 bg-black/50 backdrop-blur-md px-4 py-2 rounded-lg border border-white/10">
              <p className="font-bold">Dr. Arvind Sharma</p>
              <p className="text-xs text-green-400 animate-pulse">02:45</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-xl font-bold mb-4">Available Experts</h2>
              {experts.map(expert => (
                <div key={expert.id} className="bg-white/5 border border-white/10 p-6 rounded-2xl flex justify-between items-center hover:bg-white/10 transition">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center text-xl font-bold">
                      {expert.name.charAt(4)}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg flex items-center gap-2">
                        {expert.name} 
                        <span className={`w-2 h-2 rounded-full ${expert.status === 'Available' ? 'bg-green-500' : 'bg-red-500'}`}></span>
                      </h3>
                      <p className="text-slate-400 text-sm">{expert.spec}</p>
                      <div className="flex items-center gap-1 text-yellow-400 text-xs mt-1">
                        <Star size={12} fill="currentColor" /> {expert.rating}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg mb-2">{expert.price}</p>
                    <button 
                      onClick={() => expert.status === 'Available' && setInCall(true)}
                      className={`px-6 py-2 rounded-xl font-bold transition ${expert.status === 'Available' ? 'bg-pink-500 hover:bg-pink-600 text-white' : 'bg-white/10 text-slate-400 cursor-not-allowed'}`}
                    >
                      {expert.status === 'Available' ? 'Call Now' : 'Book Later'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="bg-black/20 border border-white/10 p-6 rounded-2xl">
              <h2 className="text-xl font-bold mb-4">Why Teleconsult?</h2>
              <ul className="space-y-4 text-sm text-slate-300">
                <li className="flex gap-3"><CheckCircle size={18} className="text-green-400 shrink-0"/> Instant access to verified ICAR scientists.</li>
                <li className="flex gap-3"><CheckCircle size={18} className="text-green-400 shrink-0"/> Show crop diseases live on camera for accurate diagnosis.</li>
                <li className="flex gap-3"><CheckCircle size={18} className="text-green-400 shrink-0"/> Get digital prescriptions for pesticides and fertilizers.</li>
              </ul>
              <div className="mt-8 bg-pink-500/10 border border-pink-500/20 p-4 rounded-xl text-center">
                <p className="text-pink-400 font-bold mb-1">First Call Free!</p>
                <p className="text-xs text-slate-400">Use code KHETIAI100</p>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Teleconsultation;
