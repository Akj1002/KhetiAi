import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { 
  LayoutDashboard, CloudRain, Sprout, ShieldAlert, MessageSquare,
  TrendingUp, Landmark, TestTube, Droplet, MapPin, Navigation, 
  BellRing, Users, ListTodo, Video, LogOut, Languages,
  Truck, Tractor, Wallet, Shield, PackageOpen, Leaf, Building2,
  BarChart2, Wheat, Waves, LineChart, Tent, CalendarDays, HardHat, PlaneTakeoff
} from "lucide-react";

const Sidebar = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'hi' : 'en';
    i18n.changeLanguage(newLang);
  };

  const groups = [
    {
      title: t("Core Features"),
      links: [
        { name: t("Dashboard"), path: "/dashboard", icon: <LayoutDashboard size={18} /> },
        { name: t("Weather"), path: "/dashboard/weather", icon: <CloudRain size={18} /> },
        { name: t("Crop Recs"), path: "/dashboard/crops", icon: <Sprout size={18} /> },
        { name: t("Disease AI"), path: "/dashboard/disease", icon: <ShieldAlert size={18} /> },
        { name: t("Chatbot"), path: "/dashboard/chat", icon: <MessageSquare size={18} /> },
      ]
    },
    {
      title: t("Market & Economy"),
      links: [
        { name: t("Market Prices"), path: "/dashboard/market", icon: <TrendingUp size={18} /> },
        { name: t("Gov Schemes"), path: "/dashboard/schemes", icon: <Landmark size={18} /> },
        { name: t("B2B Market"), path: "/dashboard/b2b-market", icon: <Building2 size={18} /> },
        { name: t("Export Logistics"), path: "/dashboard/export", icon: <PlaneTakeoff size={18} /> },
      ]
    },
    {
      title: t("Smart Farm IoT"),
      links: [
        { name: t("Soil Health"), path: "/dashboard/soil", icon: <TestTube size={18} /> },
        { name: t("Irrigation"), path: "/dashboard/irrigation", icon: <Droplet size={18} /> },
        { name: t("Water Mgmt"), path: "/dashboard/water-management", icon: <Waves size={18} /> },
        { name: t("Livestock"), path: "/dashboard/livestock", icon: <MapPin size={18} /> },
        { name: t("Drone Mapping"), path: "/dashboard/drone", icon: <Navigation size={18} /> },
      ]
    },
    {
      title: t("Supply & Inventory"),
      links: [
        { name: t("Supply Chain"), path: "/dashboard/supply-chain", icon: <Truck size={18} /> },
        { name: t("Farm Inventory"), path: "/dashboard/inventory", icon: <PackageOpen size={18} /> },
        { name: t("Seed Sourcing"), path: "/dashboard/seeds", icon: <Wheat size={18} /> },
      ]
    },
    {
      title: t("Finance & Analytics"),
      links: [
        { name: t("Agri Finance"), path: "/dashboard/finance", icon: <Wallet size={18} /> },
        { name: t("Crop Insurance"), path: "/dashboard/insurance", icon: <Shield size={18} /> },
        { name: t("Carbon Credits"), path: "/dashboard/carbon-credits", icon: <Leaf size={18} /> },
        { name: t("Analytics"), path: "/dashboard/analytics", icon: <BarChart2 size={18} /> },
        { name: t("Yield Prediction"), path: "/dashboard/yield-prediction", icon: <LineChart size={18} /> },
      ]
    },
    {
      title: t("Services & Community"),
      links: [
        { name: t("Machinery"), path: "/dashboard/machinery", icon: <Tractor size={18} /> },
        { name: t("Agri Tourism"), path: "/dashboard/agri-tourism", icon: <Tent size={18} /> },
        { name: t("Local Events"), path: "/dashboard/events", icon: <CalendarDays size={18} /> },
        { name: t("Labor Mgmt"), path: "/dashboard/labor", icon: <HardHat size={18} /> },
        { name: t("Smart Alerts"), path: "/dashboard/alerts", icon: <BellRing size={18} /> },
        { name: t("Community"), path: "/dashboard/community", icon: <Users size={18} /> },
        { name: t("Task Board"), path: "/dashboard/tasks", icon: <ListTodo size={18} /> },
        { name: t("Teleconsult"), path: "/dashboard/teleconsult", icon: <Video size={18} /> },
      ]
    }
  ];

  return (
    <aside className="w-64 h-screen bg-[#0f172a] border-r border-white/10 fixed flex flex-col shadow-2xl z-20 overflow-y-auto custom-scrollbar">
      <div className="flex items-center gap-3 p-6 sticky top-0 bg-[#0f172a] z-10 border-b border-white/5">
        <Sprout className="text-green-400" size={28} />
        <h1 className="text-xl font-bold bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">KhetiAI</h1>
      </div>
      
      <div className="flex flex-col gap-6 p-4">
        {groups.map((group, idx) => (
          <div key={idx}>
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 px-2">{group.title}</h3>
            <nav className="flex flex-col gap-1">
              {group.links.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-sm ${
                      isActive 
                        ? "bg-green-500/10 text-green-400 font-semibold"
                        : "text-slate-400 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    {link.icon}
                    <span>{link.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        ))}
      </div>
      
      <div className="mt-auto p-4 sticky bottom-0 bg-[#0f172a] border-t border-white/5 space-y-2">
        <button 
          onClick={toggleLanguage}
          className="w-full flex items-center justify-center gap-2 py-3 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 rounded-xl transition-colors font-medium text-sm"
        >
          <Languages size={18} />
          {i18n.language === 'en' ? 'हिंदी में बदलें' : 'Switch to English'}
        </button>
        <button 
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 py-3 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-xl transition-colors font-medium text-sm"
        >
          <LogOut size={18} />
          {t("Sign Out")}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
