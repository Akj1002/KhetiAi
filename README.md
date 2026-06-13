<div align="center">
  <h1>🌾 KhetiAI</h1>
  <p><strong>Enterprise-Grade Agricultural Intelligence & Real-Time Farm Management</strong></p>

  <p>
    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind" />
    <img src="https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=FastAPI&logoColor=white" alt="FastAPI" />
    <img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python" />
    <img src="https://img.shields.io/badge/WebSocket-010101?style=for-the-badge&logo=socket.io&logoColor=white" alt="WebSocket" />
    <img src="https://img.shields.io/badge/Gemini_AI-4285F4?style=for-the-badge&logo=google&logoColor=white" alt="Gemini AI" />
  </p>
</div>

<br />

## 📖 Executive Summary
**KhetiAI** is a robust, full-stack digital agriculture ecosystem designed to bridge the gap between traditional farming operations and next-generation Artificial Intelligence. By unifying predictive Machine Learning models, high-frequency IoT sensor telemetry, and low-latency bidirectional WebSockets into a single centralized command center, KhetiAI empowers stakeholders to transition from reactive farming to proactive, data-driven agriculture.

## 🏗️ System Architecture

KhetiAI employs a decoupled, asynchronous client-server architecture:
1. **Frontend Presentation Layer**: Built on React 18 and Vite, the frontend utilizes `framer-motion` for highly performant hardware-accelerated animations and `recharts` for dynamic data visualization. The UI is completely responsive, adhering to modern dark-mode aesthetic principles using TailwindCSS.
2. **Backend API & WebSocket Hub**: A high-performance Python `FastAPI` layer serves as the central nervous system. It handles RESTful API requests, interfaces with external GenAI models, and manages stateful, multiplexed WebSocket connections using `uvicorn`.
3. **AI Inference Layer**: The system integrates securely with Google's Gemini 3.5 (Flash and Vision) models to process unstructured data, such as crop imagery and conversational context, returning highly structured diagnostic JSON payloads.

---

## ⚡ Comprehensive Feature & Page Breakdown

KhetiAI is composed of over **30 specialized modules**, each engineered to tackle a specific facet of modern agricultural management.

### 1. 📊 Real-Time Dashboard (`/dashboard`)
The central nervous system of the farm. Instead of static HTTP requests, this page maintains a persistent `/ws/dashboard` WebSocket connection. It renders live telemetry (Soil Moisture, Temperature, Wind Speed) using `recharts`. It also displays a dynamic Farm Health grid and an automated Revenue vs. Expenses financial tracker, updating instantly as IoT data flows in.

### 2. 🤖 KhetiAI Chatbot (`/dashboard/chatbot`)
A persistent, intelligent conversational agent powered by Google Gemini 3.5. Unlike generic bots, it maintains a localized context window. Farmers can ask complex agronomic questions (e.g., "What is the best time to sow wheat in Punjab?") and receive highly accurate, conversational advice tailored to their specific climatic zone.

### 3. 📈 Market Prices & Economy (`/dashboard/market`)
A financial hub tracking live agricultural commodity metrics. It displays the current trading prices for critical crops (Wheat, Rice, Corn, Sugarcane) alongside historical trends, supply-demand volume ratios, and daily price variance to help farmers maximize their profit margins.

### 4. 🏛️ Government Schemes (`/dashboard/schemes`)
Navigating bureaucracy is difficult. This module features a dynamic "Eligibility Matcher" that algorithmically scores and filters hundreds of state and federal agricultural subsidies, grants, and credit schemes based entirely on the user's specific farm profile (acreage, crop type, region).

### 5. 🧪 Smart Soil Health (`/dashboard/soil`)
A dedicated IoT analytics page for subterranean metrics. It tracks N-P-K (Nitrogen, Phosphorus, Potassium) ratios and pH variance across multiple farm sectors. It includes predictive warnings for soil degradation and nutrient depletion, allowing for precise fertilizer application.

### 6. 💧 Interactive Irrigation Control (`/dashboard/irrigation`)
A bidirectional command module for water management. Connected to `/ws/irrigation`, farm operators can remotely toggle water pumps on or off across different sectors. The state change is processed by the FastAPI backend and instantly synchronized across all connected devices, preventing overlapping commands or water waste.

### 7. 🐄 Livestock GPS Tracker (`/dashboard/livestock`)
A geographic monitoring tool plotting livestock coordinates on an interactive satellite map. It tracks biometric data such as animal heart rates and body temperatures, instantly flagging animals that show signs of distress, illness, or have wandered outside the geo-fenced boundaries.

### 8. 📸 AI Disease Diagnostics (`/dashboard/disease`)
A drag-and-drop diagnostic pipeline. When a user uploads an image of an infected leaf, the FastAPI backend securely transmits the binary payload to Google's Gemini Vision API. The model evaluates necrotic lesions and returns a precise biological disease nomenclature, an AI confidence score, and a multi-step biological/chemical treatment protocol.

### 9. 🌱 Predictive Crop Recommendation (`/dashboard/crop-recommendation`)
A deterministic Machine Learning interface where users manually input environmental vectors (Nitrogen, Phosphorus, Potassium, pH, and average Rainfall). The system computes these variables against agronomic databases to predict the most profitable and biologically viable crop to plant for the upcoming season.

### 10. 🚁 Autonomous Drone Mapping (`/dashboard/drone`)
Built on `react-leaflet`, this interface allows farm managers to draw geo-spatial flight paths over their acreage. It calculates estimated flight times, battery requirements, and displays simulated NDVI (Normalized Difference Vegetation Index) thermal overlays to detect invisible crop stress.

### 11. 🔔 Smart Alerts Pipeline (`/dashboard/alerts`)
A chronological, asynchronous push-notification feed powered by `/ws/alerts`. Critical system events—such as impending frost, localized pest outbreaks, or IoT equipment failures—slide effortlessly into the user's view the millisecond they are triggered, utilizing hardware-accelerated Framer Motion layout injections.

### 12. 👨‍🌾 Multiplayer Community Feed (`/dashboard/community`)
A decentralized, real-time message board (`/ws/community`). When a farmer posts an update, asks for advice, or shares a tip, the payload is routed through a central WebSocket `ConnectionManager` and instantly broadcast to the screens of all active users on the platform, fostering a highly collaborative rural network.

### 13. 📋 Farm Task Board (`/dashboard/tasks`)
A Kanban-style drag-and-drop workspace (To Do, In Progress, Done). It allows farm managers to digitize their daily operations, assign specific labor tasks (e.g., "Repair Fence in Sector 2", "Harvest Wheat"), set priority levels, and track logistical progress in real-time.

### 14. 📞 Agri-Expert Teleconsultation (`/dashboard/teleconsult`)
A premium, integrated video-call scheduling interface. It allows farmers to book and conduct direct 1-on-1 consultations with verified plant pathologists, veterinarians, and agronomists to resolve complex issues that require human expertise.

### 15. 🌍 Seamless Multilingual Support
Recognizing the diverse linguistic landscape of agriculture, KhetiAI utilizes `react-i18next` to offer instant, zero-reload translation. Farmers can seamlessly toggle the entire platform interface between English and Hindi (हिन्दी) to ensure maximum accessibility and usability.

### 16. 🚚 Supply Chain Tracking (`/dashboard/supply-chain`)
Track agricultural produce from the farm straight to the consumer's table, maintaining transparency and logistical accountability.

### 17. 🚜 Machinery Rental (`/dashboard/machinery`)
An Uber-like marketplace for booking and renting heavy agricultural machinery, tractors, and harvesters on demand.

### 18. 💰 Agri-Finance & Loans (`/dashboard/finance`)
A dedicated financial center to apply for micro-loans, monitor credit lines, and track repayment schedules specifically tailored for farmers.

### 19. 🛡️ Crop Insurance (`/dashboard/insurance`)
Browse, purchase, and manage specialized agricultural insurance policies, with features to securely report damage via satellite imagery.

### 20. 📦 Farm Inventory Management (`/dashboard/inventory`)
A digital ledger to track granular stock levels for seeds, fertilizers, pesticides, and other critical operational resources.

### 21. 🍃 Carbon Credits Dashboard (`/dashboard/carbon-credits`)
Calculate your farm's carbon sequestration offsets and trade generated carbon credits directly on environmental exchanges.

### 22. 🏢 B2B Marketplace (`/dashboard/b2b-market`)
A direct-selling portal designed to connect farmers directly with commercial buyers, restaurants, and wholesale distributors, eliminating the middleman.

### 23. 📊 Precision Analytics (`/dashboard/analytics`)
Deep-dive historical yield data, profitability charts, and field heatmaps to optimize future farming decisions.

### 24. 🌾 Seed Sourcing & Genetics (`/dashboard/seeds`)
A marketplace and database to find, compare, and purchase high-yield, climate-resilient crop seeds from local and national vendors.

### 25. 🌊 Water Management (`/dashboard/water-management`)
Detailed oversight of the farm's aquatic resources, tracking borewell depth, reservoir volumes, and automated water usage tracking.

### 26. 📉 Yield Prediction Models (`/dashboard/yield-prediction`)
AI-driven projections calculating expected seasonal harvest outputs based on real-time fluctuating environmental variables.

### 27. ⛺ Agri-Tourism (`/dashboard/agri-tourism`)
A platform for farmers to list their estates for public visits, educational workshops, or immersive rural farm-stays.

### 28. 🎪 Local Events & Fairs (`/dashboard/events`)
A dynamically updated calendar to discover upcoming regional agricultural expos, mandi fairs, and farmer meetups.

### 29. 👷‍♂️ Labor Management (`/dashboard/labor`)
A Human Resources dashboard for hiring seasonal farm workers, tracking daily attendance, and automatically managing daily wage payouts.

### 30. ✈️ Export Logistics (`/dashboard/export`)
A specialized workflow to handle the complex documentation, regulatory compliance, and shipping tracking required for international agricultural exports.

---

## 💻 Technical Stack & Dependencies

### Frontend (Client)
* `react` / `react-dom` (v18.x)
* `vite` - Next Generation Frontend Tooling
* `tailwindcss` - Utility-first CSS framework
* `framer-motion` - Physics-based animation library
* `recharts` - Composable charting library
* `react-leaflet` - React components for Leaflet maps
* `lucide-react` - Scalable vector iconography

### Backend (Server)
* `python` (v3.10+)
* `fastapi` - Modern, fast web framework for building APIs
* `uvicorn[standard]` - Lightning-fast ASGI server
* `google-generativeai` - Official Google Gemini SDK
* `python-dotenv` - Environment configuration management

---

## ⚙️ Environment Configuration

To run KhetiAI securely, you must configure the environment parameters. Create a `.env` file in the root of the `/Backend` directory.

```env
# Google Gemini API Key for Vision & Chatbot Inference
GEMINI_API_KEY="your_secure_api_key_here"

# (Optional) Server Bindings
HOST="127.0.0.1"
PORT=8000
```
> **Warning**: Never commit your `.env` file to version control. The repository includes a `.gitignore` specifically designed to exclude it.

---

## 🚀 Installation & Deployment Guide

### Phase 1: Backend Initialization
1. Navigate to the server directory:
   ```bash
   cd Backend
   ```
2. Initialize and activate a Python virtual environment to isolate dependencies:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows use: venv\Scripts\activate
   ```
3. Install strict pip requirements:
   ```bash
   pip install -r req.txt
   ```
4. Start the Uvicorn ASGI server with hot-reloading:
   ```bash
   uvicorn main:app --reload --host 127.0.0.1 --port 8000
   ```

### Phase 2: Frontend Initialization
1. Open a secondary terminal instance and navigate to the client directory:
   ```bash
   cd Frontend
   ```
2. Install Node packages:
   ```bash
   npm install
   ```
3. Launch the Vite development server:
   ```bash
   npm run dev
   ```
4. Access the application natively at `http://localhost:5173`.

---

## 🛡️ License & Telemetry
KhetiAI is a proprietary software platform. **All Rights Reserved.**
This project was strictly designed for high-performance, real-time agricultural operations and does not natively collect or track external PII (Personally Identifiable Information) beyond the localized deployment environment.

<div align="center">
  <p><strong>Developed for the future of precision agriculture.</strong></p>
</div>
