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
</div>

<br />

## 🌟 Overview & Vision

**KhetiAI** is a comprehensive, real-time agricultural intelligence platform built to empower modern farmers with state-of-the-art AI diagnostics, real-time IoT sensor telemetry, and actionable market insights. 

Farming today is plagued by unpredictable weather, crop diseases, and a lack of real-time data. KhetiAI bridges this gap by unifying all farm operations into a single, intuitive dashboard. From autonomous drone mapping and predictive crop recommendations to a vibrant multiplayer community forum, KhetiAI equips farmers with enterprise-grade tools tailored for ease of use.

<br />

<div align="center">
  <h2>📸 Platform Gallery</h2>
  <p><em>(Replace these placeholders with actual screenshots of your application)</em></p>
  <br />
  <img src="https://placehold.co/400x250/0f172a/22c55e?text=Command+Dashboard" width="30%" alt="Dashboard" />
  <img src="https://placehold.co/400x250/0f172a/22c55e?text=Smart+Soil+IoT" width="30%" alt="Soil Health IoT" />
  <img src="https://placehold.co/400x250/0f172a/22c55e?text=Crop+Recommendation" width="30%" alt="Crop Recommendation" />
  <br />
  <br />
  <img src="https://placehold.co/400x250/0f172a/22c55e?text=AI+Disease+Detection" width="30%" alt="Disease Detection" />
  <img src="https://placehold.co/400x250/0f172a/22c55e?text=Govt+Schemes+Matcher" width="30%" alt="Govt Schemes" />
  <img src="https://placehold.co/400x250/0f172a/22c55e?text=Live+Market+Prices" width="30%" alt="Market Prices" />
  <br />
  <br />
  <img src="https://placehold.co/400x250/0f172a/22c55e?text=Drone+Flight+Planner" width="30%" alt="Drone Mapping" />
  <img src="https://placehold.co/400x250/0f172a/22c55e?text=Real-Time+Alerts" width="30%" alt="Smart Alerts" />
  <img src="https://placehold.co/400x250/0f172a/22c55e?text=KhetiAI+Assistant" width="30%" alt="KhetiAI Chatbot" />
  <br />
  <br />
  <img src="https://placehold.co/400x250/0f172a/22c55e?text=Teleconsultation" width="30%" alt="Teleconsultation" />
  <img src="https://placehold.co/400x250/0f172a/22c55e?text=Multiplayer+Community" width="30%" alt="Community" />
  <img src="https://placehold.co/400x250/0f172a/22c55e?text=Irrigation+Pump+Control" width="30%" alt="Irrigation" />
</div>

<br />

## 🚀 Deep Dive: Core Features

### 1. True Real-Time Architecture (WebSockets)
KhetiAI completely abandons static mock data in favor of live WebSocket streams.
* **Telemetry Dashboard**: Uses `recharts` to render live streams of soil moisture, wind speed, and crop health in real-time.
* **Smart Alerts**: A Framer Motion powered timeline that injects critical weather and pest alerts instantly.
* **Bi-directional Irrigation Control**: Toggle farm sector pumps from the UI. The action is sent to the backend, processed, and the new state is broadcasted back to all connected devices.
* **Live Community Forum**: A fully reactive multiplayer feed where farmers can post and receive updates without refreshing.

### 2. Google Generative AI Integrations
* **Disease Diagnostics**: Upload an image of a diseased leaf. Our FastAPI backend securely transmits the image to Google's Gemini 3.5 model to return a structured diagnosis, confidence score, and treatment plan.
* **KhetiAI Chatbot**: A persistent farming assistant that understands context and can converse about local agricultural queries.

### 3. Smart Tools & Analytics
* **Crop Recommendation**: An interactive UI with sliders for N, P, K, pH, and rainfall. A dedicated ML model predicts the most profitable crop to plant.
* **Drone Mapping**: Built on `react-leaflet`, allowing users to draw autonomous flight paths over their sectors and view mock NDVI (thermal/stress) imaging.
* **Government Schemes**: An "AI Eligibility Matcher" that dynamically scores financial and credit schemes (e.g., 95% Match) based on the user's farm profile.
* **Farm Task Board**: A Kanban drag-and-drop board for managing farm laborers.

## 🛠️ Technology Stack

### Frontend Client
* **React.js (Vite)**: Lightning-fast development server and optimized production builds.
* **TailwindCSS**: Utility-first styling for the beautiful, premium dark-mode aesthetic.
* **Framer Motion**: Smooth, layout-aware micro-animations.
* **Lucide React**: Crisp, modern iconography.
* **Recharts & React-Leaflet**: Data visualization and mapping.

### Backend Server
* **Python 3.10+**: Core backend logic.
* **FastAPI**: Extremely fast asynchronous API framework.
* **Uvicorn**: ASGI server to handle complex WebSocket connections.
* **Google Generative AI**: Gemini models for advanced inference.

## 📂 Project Structure

```text
KhetiAI/
├── Backend/
│   ├── main.py              # FastAPI server, WebSocket Hubs, AI routing
│   ├── .env                 # API Keys (Excluded from Git)
│   └── req.txt              # Python dependencies
├── Frontend/
│   ├── src/
│   │   ├── components/      # Reusable UI (Sidebar, Layout)
│   │   ├── pages/           # All 15+ Core Application Pages
│   │   ├── main.jsx         # React DOM Entry
│   │   └── index.css        # Global Tailwind tokens
│   ├── vite.config.js       # Vite Bundler Config
│   └── package.json         # Node.js dependencies
└── README.md                # Project documentation
```

## ⚙️ Installation & Setup

### Prerequisites
* Node.js (v18+)
* Python (v3.10+)
* A valid Google Gemini API Key

### 1. Setup the Backend
```bash
cd Backend
python -m venv venv
# On Windows: venv\Scripts\activate
# On Mac/Linux: source venv/bin/activate
pip install -r req.txt
```

Create a `.env` file in the `Backend` directory and add your key:
```env
GEMINI_API_KEY=your_actual_api_key_here
```

Start the FastAPI Server:
```bash
uvicorn main:app --reload
```
*(The server will run on `http://127.0.0.1:8000`)*

### 2. Setup the Frontend
Open a new terminal and navigate to the frontend:
```bash
cd Frontend
npm install
npm run dev
```
*(The React app will launch on `http://localhost:5173` or `5174`)*

---
<div align="center">
  <p>Made with ❤️ for the future of farming.</p>
</div>
