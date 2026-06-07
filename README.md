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

## ⚡ Core Subsystems & Modules

### 1. Real-Time Telemetry & Smart IoT Control
KhetiAI completely moves away from HTTP polling in favor of persistent TCP WebSocket connections, ensuring a latency of under 50ms for critical farm operations.
* **Dashboard Hub (`/ws/dashboard`)**: Broadcasts high-frequency state updates containing synthesized soil moisture, temperature, wind speed, and general crop health indices. 
* **Irrigation Control System (`/ws/irrigation`)**: A bidirectional stream allowing users to toggle agricultural water pumps geographically (by Sector). The backend processes state transitions (Idle -> Pumping) and synchronizes the state across all connected remote operators.
* **Alerts Pipeline (`/ws/alerts`)**: An asynchronous push-notification pipeline that delivers structurally validated JSON alerts directly to the UI, driving Framer Motion layout injections.

### 2. Generative AI Diagnostics (Vision)
* **Plant Pathology Engine**: Users upload localized leaf imagery which is encoded and securely transmitted to the Gemini Vision API. The model evaluates necrotic lesions and discoloration against its trained corpus, returning a precise disease nomenclature, an AI confidence interval (e.g., 94%), and actionable biological/chemical treatment protocols.

### 3. Predictive Crop Modeling
* **Agronomic Recommendation Engine**: An interactive deterministic interface where users input N-P-K (Nitrogen, Phosphorus, Potassium) levels, pH variance, and target moisture capacity. A predictive model correlates these vectors to output the most biologically viable and economically profitable crop selections.

### 4. Auxiliary Operations
* **Autonomous Drone Flight Mapping**: Integrated with `react-leaflet` to plan geospatial flight paths, coupled with theoretical NDVI (Normalized Difference Vegetation Index) thermal overlays.
* **Multiplayer Community Feed**: A decentralized, real-time message bus (`/ws/community`) allowing asynchronous communication between farm operators, agronomists, and stakeholders.
* **Dynamic Government Subsidy Matcher**: An algorithm that calculates an "Eligibility Score" based on state-level APIs and farmer profiles to match users with financial credit models.

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
