import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { User, Lock, Sprout, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";

const Auth = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(searchParams.get("mode") !== "register");
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isLogin) {
        const formData = new URLSearchParams();
        formData.append("username", username);
        formData.append("password", password);
        
        const res = await axios.post("http://127.0.0.1:8000/token", formData);
        localStorage.setItem("token", res.data.access_token);
        navigate("/dashboard");
      } else {
        await axios.post("http://127.0.0.1:8000/register", { username, password });
        setIsLogin(true);
        alert("Registration successful! Please login.");
      }
    } catch (err) {
      alert(err.response?.data?.detail || "An error occurred");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] flex items-center justify-center p-4">
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="glass-panel w-full max-w-md p-10 rounded-[2.5rem] relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-green-500/20 blur-[60px] rounded-full pointer-events-none"></div>
        
        <div className="flex justify-center mb-8">
          <div className="p-4 bg-gradient-to-br from-green-400 to-emerald-600 rounded-2xl shadow-xl shadow-green-500/20">
            <Sprout size={48} className="text-white" />
          </div>
        </div>

        <h2 className="text-3xl font-extrabold text-white text-center mb-2">
          {isLogin ? "Welcome Back" : "Join KhetiAI"}
        </h2>
        <p className="text-slate-400 text-center mb-8">
          {isLogin ? "Enter your details to access your farm dashboard." : "Create an account to digitize your farm."}
        </p>

        <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
          <div className="relative">
            <User className="absolute left-4 top-4 text-slate-400" size={20} />
            <input 
              type="text" 
              placeholder="Username" 
              required
              value={username} onChange={e => setUsername(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none focus:border-green-400 focus:bg-white/10 transition-all"
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-4 top-4 text-slate-400" size={20} />
            <input 
              type="password" 
              placeholder="Password" 
              required
              value={password} onChange={e => setPassword(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none focus:border-green-400 focus:bg-white/10 transition-all"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold rounded-2xl shadow-lg flex justify-center items-center gap-2 transition-all group disabled:opacity-50"
          >
            {loading ? "Processing..." : isLogin ? "Sign In" : "Create Account"}
            {!loading && <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />}
          </button>
        </form>

        <p className="text-center mt-8 text-slate-400">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button onClick={() => setIsLogin(!isLogin)} className="text-green-400 font-bold hover:underline">
            {isLogin ? "Sign Up" : "Log In"}
          </button>
        </p>
      </motion.div>
    </div>
  );
};

export default Auth;
