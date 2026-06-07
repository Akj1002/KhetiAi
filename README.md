<div align="center">
  <h1>🌾 KhetiAI</h1>
  <p><strong>The Next-Generation AI-Powered Farm Management & Real-Time Intelligence Platform</strong></p>

  <p>
    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind" />
    <img src="https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=FastAPI&logoColor=white" alt="FastAPI" />
    <img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python" />
    <img src="https://img.shields.io/badge/WebSocket-010101?style=for-the-badge&logo=socket.io&logoColor=white" alt="WebSocket" />
  </p>
  <p>
    Welcome to <strong>KhetiAI</strong>, an enterprise-grade digital agriculture ecosystem designed to bridge the gap between traditional farming and modern artificial intelligence. By unifying predictive modeling, real-time IoT sensor telemetry, and multiplayer community features into a single elegant interface, KhetiAI empowers farmers to maximize yields, reduce risks, and make data-driven decisions seamlessly.
  </p>
</div>

<br />

## 🌟 Comprehensive System Overview

Farming today is plagued by unpredictable weather, rapidly spreading crop diseases, and a lack of unified real-time data. **KhetiAI** solves this by consolidating every aspect of agricultural management into one master platform.

By establishing persistent, bidirectional WebSocket connections, KhetiAI completely abandons the paradigm of static web pages. When soil moisture drops in a remote farm sector, the dashboard charts animate and reflect the change instantly. When a pest alert is triggered, it flashes onto your screen in real time. It represents a paradigm shift—turning a standard dashboard into a living, breathing **Command Center**.

---

## 🚀 Deep Dive: Core Features & Architecture

### 1. True Real-Time Architecture (WebSockets)
The core infrastructure of KhetiAI runs on high-performance FastAPI WebSockets, streaming JSON payloads continuously.
* **Telemetry Dashboard**: Utilizing `recharts`, the dashboard renders live streams of soil moisture, temperature, wind speed, and crop health metrics dynamically.
* **Bi-directional Irrigation Control**: Users can toggle farm sector pumps directly from the UI. The action is securely transmitted to the backend, processed, and the new state is broadcasted back to all connected devices.
* **Live Community Forum**: A fully reactive multiplayer feed. KhetiAI features a specialized `ConnectionManager` that broadcasts new posts instantly to every active farmer on the platform.
* **Smart Alerts Timeline**: Powered by Framer Motion, critical weather warnings and pest alerts slide effortlessly into the user's view the millisecond they are issued by the backend.

### 2. Google Generative AI Integrations (Gemini 3.5)
KhetiAI leverages state-of-the-art Large Language Models and Vision models to provide instantaneous, expert-level diagnostics.
* **Vision-Based Disease Diagnostics**: Farmers can simply drag and drop an image of an infected leaf. The FastAPI backend securely transmits the image to Google's Gemini Vision model to extract a highly structured diagnosis, an AI confidence score, and a step-by-step treatment plan.
* **KhetiAI Contextual Chatbot**: A persistent, intelligent farming assistant that retains conversation history to provide highly localized, actionable farming advice.

### 3. Advanced Farm Tools & Analytics
* **Predictive Crop Recommendation**: An interactive interface featuring N, P, K, pH, and rainfall sliders. The system computes and predicts the most profitable and biologically viable crop to plant.
* **Autonomous Drone Mapping**: Built on `react-leaflet`, this module allows farm managers to draw autonomous flight paths over their land and view simulated NDVI imaging.
* **Government Schemes Auto-Matcher**: An "AI Eligibility Matcher" that dynamically scores financial and credit schemes based entirely on the user's specific farm profile.
* **Agri-Expert Teleconsultation**: A premium video call interface allowing direct, face-to-face consultations with verified plant pathologists and agronomists.
* **Farm Task Board**: A Kanban-style drag-and-drop workspace dedicated to managing labor, logistics, and daily operations efficiently.

---

<div align="center">
  <h2>📸 Platform Gallery</h2>
  <p><em>A glimpse into the beautiful KhetiAI interface.</em></p>
  <br />
  <img src="https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=400&h=250&q=80" width="24%" alt="Dashboard" />
  <img src="https://images.unsplash.com/photo-1592982537447-6f29633ddf34?auto=format&fit=crop&w=400&h=250&q=80" width="24%" alt="Soil Health IoT" />
  <img src="https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=400&h=250&q=80" width="24%" alt="Crop Recommendation" />
  <img src="https://images.unsplash.com/photo-1611843467160-25afb8df1074?auto=format&fit=crop&w=400&h=250&q=80" width="24%" alt="Disease Detection" />
  <br />
  <br />
  <img src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=400&h=250&q=80" width="24%" alt="Market Prices" />
  <img src="https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&w=400&h=250&q=80" width="24%" alt="Drone Mapping" />
  <img src="https://images.unsplash.com/photo-1516253593875-bd7ba052fbc5?auto=format&fit=crop&w=400&h=250&q=80" width="24%" alt="Smart Alerts" />
  <img src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=400&h=250&q=80" width="24%" alt="Community" />
</div>

---

## 🛠️ Technology Stack

### Frontend Client
* **React.js (Vite)**: Chosen for its lightning-fast Hot Module Replacement (HMR) and optimized production builds.
* **TailwindCSS**: Provides a utility-first styling approach, enabling the beautiful, highly-responsive dark-mode aesthetic.
* **Framer Motion**: Delivers smooth, physics-based layout micro-animations across the application.
* **Lucide React**: Supplies clean, scalable, and modern iconography.
* **Recharts & React-Leaflet**: Powers the rich data visualizations and interactive mapping features.

### Backend Server
* **Python 3.10+**: The robust language driving the core backend logic.
* **FastAPI**: An extremely fast, modern asynchronous API framework.
* **Uvicorn**: An ASGI server perfectly suited to handle thousands of concurrent WebSocket connections.
* **Google Generative AI**: Gemini models leveraged for complex, unstructured data inference.

---

## 📂 Project Directory Structure

```text
KhetiAI/
├── Backend/
│   ├── main.py              # FastAPI server, WebSocket Hubs, AI Routing
│   ├── .env                 # API Keys and Secrets (Git Ignored)
│   └── req.txt              # Python dependency manifest
├── Frontend/
│   ├── src/
│   │   ├── components/      # Reusable UI Architecture (Sidebar, Layouts)
│   │   ├── pages/           # All 15+ Core Application Pages
│   │   ├── main.jsx         # React DOM Entry Point
│   │   └── index.css        # Global Tailwind Design Tokens
│   ├── vite.config.js       # Vite Bundler Configuration
│   └── package.json         # Node.js dependencies
└── README.md                # Project documentation
```

---

## ⚙️ Installation & Local Setup Guide

### Prerequisites
Before running KhetiAI locally, ensure your system has the following installed:
* Node.js (v18 or higher)
* Python (v3.10 or higher)
* A valid Google Gemini API Key

### 1. Setup the Backend Server
Open your terminal and navigate to the backend directory:
```bash
cd Backend

# Create a virtual environment
python -m venv venv

# Activate the virtual environment
# On Windows:
venv\Scripts\activate
# On Mac/Linux:
source venv/bin/activate

# Install the required Python packages
pip install -r req.txt
```

Create a `.env` file in the `Backend` directory and safely add your API key:
```env
GEMINI_API_KEY=your_actual_api_key_here
```

Launch the FastAPI Server:
```bash
uvicorn main:app --reload
```
*(The backend server will now be listening on `http://127.0.0.1:8000`)*

### 2. Setup the Frontend Client
Open a second terminal window and navigate to the frontend directory:
```bash
cd Frontend

# Install the Node.js dependencies
npm install

# Start the Vite development server
npm run dev
```
*(The React application will automatically launch in your browser at `http://localhost:5173` or `5174`)*

---
<div align="center">
  <p>Engineered to digitize and revolutionize modern agriculture.</p>
</div>
