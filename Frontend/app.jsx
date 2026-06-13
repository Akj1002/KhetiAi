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

// Phase 6 Expansion
import SupplyChainTracking from "./src/pages/SupplyChainTracking";
import MachineryRental from "./src/pages/MachineryRental";
import AgriFinance from "./src/pages/AgriFinance";
import CropInsurance from "./src/pages/CropInsurance";
import FarmInventory from "./src/pages/FarmInventory";
import CarbonCredits from "./src/pages/CarbonCredits";
import B2BMarketplace from "./src/pages/B2BMarketplace";
import PrecisionAnalytics from "./src/pages/PrecisionAnalytics";
import SeedSourcing from "./src/pages/SeedSourcing";
import WaterManagement from "./src/pages/WaterManagement";
import YieldPrediction from "./src/pages/YieldPrediction";
import AgriTourism from "./src/pages/AgriTourism";
import LocalEvents from "./src/pages/LocalEvents";
import LaborManagement from "./src/pages/LaborManagement";
import ExportLogistics from "./src/pages/ExportLogistics";
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

          {/* Phase 6 Expansion Routes */}
          <Route path="supply-chain" element={<SupplyChainTracking />} />
          <Route path="machinery" element={<MachineryRental />} />
          <Route path="finance" element={<AgriFinance />} />
          <Route path="insurance" element={<CropInsurance />} />
          <Route path="inventory" element={<FarmInventory />} />
          <Route path="carbon-credits" element={<CarbonCredits />} />
          <Route path="b2b-market" element={<B2BMarketplace />} />
          <Route path="analytics" element={<PrecisionAnalytics />} />
          <Route path="seeds" element={<SeedSourcing />} />
          <Route path="water-management" element={<WaterManagement />} />
          <Route path="yield-prediction" element={<YieldPrediction />} />
          <Route path="agri-tourism" element={<AgriTourism />} />
          <Route path="events" element={<LocalEvents />} />
          <Route path="labor" element={<LaborManagement />} />
          <Route path="export" element={<ExportLogistics />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
