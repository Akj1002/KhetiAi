import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./src/components/Layout";
import Landing from "./src/pages/Landing";
import Auth from "./src/pages/Auth";

// Phase 2
import Dashboard from "./src/pages/Dashboard";
import Weather from "./src/pages/Weather";
import CropRecommendation from "./src/pages/CropRecommendation";
import DiseaseDetection from "./src/pages/DiseaseDetection";
import Chatbot from "./src/pages/Chatbot";

// New Pages (Phases 2-5)
import MarketPrices from "./src/pages/MarketPrices";
import GovernmentSchemes from "./src/pages/GovernmentSchemes";
import SoilHealth from "./src/pages/SoilHealth";
import Irrigation from "./src/pages/Irrigation";
import Livestock from "./src/pages/Livestock";
import DroneMapping from "./src/pages/DroneMapping";
import SmartAlerts from "./src/pages/SmartAlerts";
import Community from "./src/pages/Community";
import TaskBoard from "./src/pages/TaskBoard";
import Teleconsultation from "./src/pages/Teleconsultation";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/auth" />;
  return children;
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />
        
        {/* Protected Dashboard Routes */}
        <Route path="/dashboard" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
          <Route index element={<Dashboard />} />
          <Route path="weather" element={<Weather />} />
          <Route path="crops" element={<CropRecommendation />} />
          <Route path="disease" element={<DiseaseDetection />} />
          <Route path="chat" element={<Chatbot />} />
          
          <Route path="market" element={<MarketPrices />} />
          <Route path="schemes" element={<GovernmentSchemes />} />
          <Route path="soil" element={<SoilHealth />} />
          <Route path="irrigation" element={<Irrigation />} />
          <Route path="livestock" element={<Livestock />} />
          <Route path="drone" element={<DroneMapping />} />
          <Route path="alerts" element={<SmartAlerts />} />
          <Route path="community" element={<Community />} />
          <Route path="tasks" element={<TaskBoard />} />
          <Route path="teleconsult" element={<Teleconsultation />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
