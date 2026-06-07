<div align="center">
  <h1>🌾 KhetiAI</h1>
  <p><strong>A Next-Generation AI-Powered Farm Management & Intelligence Platform</strong></p>
</div>

<br />

<div align="center">
  <img src="https://via.placeholder.com/300x200.png?text=Dashboard" width="30%" alt="Dashboard" />
  <img src="https://via.placeholder.com/300x200.png?text=Soil+Health+IoT" width="30%" alt="Soil Health IoT" />
  <img src="https://via.placeholder.com/300x200.png?text=Crop+Recommendation" width="30%" alt="Crop Recommendation" />
  <br />
  <img src="https://via.placeholder.com/300x200.png?text=Disease+Detection" width="30%" alt="Disease Detection" />
  <img src="https://via.placeholder.com/300x200.png?text=Govt+Schemes" width="30%" alt="Govt Schemes" />
  <img src="https://via.placeholder.com/300x200.png?text=Market+Prices" width="30%" alt="Market Prices" />
  <br />
  <img src="https://via.placeholder.com/300x200.png?text=Drone+Mapping" width="30%" alt="Drone Mapping" />
  <img src="https://via.placeholder.com/300x200.png?text=Smart+Alerts" width="30%" alt="Smart Alerts" />
  <img src="https://via.placeholder.com/300x200.png?text=KhetiAI+Chatbot" width="30%" alt="KhetiAI Chatbot" />
  <br />
  <img src="https://via.placeholder.com/300x200.png?text=Teleconsultation" width="30%" alt="Teleconsultation" />
  <img src="https://via.placeholder.com/300x200.png?text=Community+Forum" width="30%" alt="Community" />
  <img src="https://via.placeholder.com/300x200.png?text=Irrigation+Control" width="30%" alt="Irrigation" />
</div>

<br />

## 🌟 Overview
**KhetiAI** is a comprehensive, real-time farm intelligence platform built to digitize and empower modern farming. Built with a React (Vite) frontend and a FastAPI backend, KhetiAI seamlessly integrates AI models, live WebSocket telemetry, and an intuitive user interface to help farmers maximize their yield, prevent diseases, and stay updated with the latest market trends.

## 🚀 Key Features & Pages

* **📊 Dashboard**: The centralized command center. Features live mini-charts for soil moisture, temperature, wind speed, and crop health powered by real-time WebSockets, alongside a live farm map and market snapshots.
* **🌱 Crop Recommendation**: Recommends the optimal crop based on interactive N, P, K, pH, and rainfall sliders using an integrated AI model, complete with projected yield metrics.
* **🦠 Disease Detection**: A drag-and-drop diagnostic tool. Farmers can upload images of crop leaves, and the Gemini 3.5 AI instantly analyzes the image to identify diseases and prescribe treatments.
* **💬 KhetiAI Assistant**: A specialized AI chatbot tailored for agricultural queries. It remembers context and provides localized farming advice.
* **📡 Smart Farm IoT**:
  * **Soil Health**: A real-time topography grid mapped to live IoT sensor data for targeted nutrient management.
  * **Irrigation**: Interactive sector controls with an AI Auto-Pilot toggle to manage water distribution over WebSockets.
  * **Livestock Tracking**: Live GPS coordinates, heart rate, and temperature tracking for cattle.
* **🚁 Drone Mapping**: An autonomous flight planner utilizing `react-leaflet` to map farm sectors, coupled with an NDVI (Normalized Difference Vegetation Index) analysis mock for stress detection.
* **🏛️ Government Schemes**: An AI Eligibility Matcher that filters and scores financial, credit, and organic subsidies based on the farmer's profile.
* **📈 Market Prices**: A live chart of commodity prices (Wheat, Rice, Maize) powered by `recharts` to help farmers decide the best time to sell.
* **🚨 Smart Alerts**: A vertical chronological timeline that pushes critical weather and pest alerts to the farmer via live WebSockets.
* **📋 Task Board**: A Kanban-style drag-and-drop interface for farm managers to organize laborers and daily operations (To Do, In Progress, Done).
* **👨‍⚕️ Teleconsultation**: A premium video call mock UI that allows farmers to connect directly with verified agronomists and plant pathologists.
* **🤝 Community**: A Reddit-style multiplayer forum where farmers can post updates, ask questions, upvote, and share knowledge in real time.

## 🛠️ Tech Stack
* **Frontend**: React.js (Vite), TailwindCSS, Framer Motion, Recharts, React-Leaflet, Lucide React.
* **Backend**: Python, FastAPI, Uvicorn, WebSockets.
* **AI Integration**: Google Generative AI (Gemini Flash).

## 💻 Running Locally
1. Clone the repository.
2. Setup the backend: Navigate to `Backend/`, install requirements via `pip install -r req.txt`, and start the server using `uvicorn main:app --reload`.
3. Setup the frontend: Navigate to `Frontend/`, install dependencies using `npm install`, and start the dev server via `npm run dev`.
