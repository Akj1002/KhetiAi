from fastapi import FastAPI, UploadFile, File, Query, WebSocket, WebSocketDisconnect, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pydantic import BaseModel
from pymongo import MongoClient
import requests
import asyncio
import json
import random
import base64
import google.generativeai as genai
import os
from datetime import datetime, timedelta
from jose import JWTError, jwt
import bcrypt
from dotenv import load_dotenv

load_dotenv()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

app = FastAPI(title="KhetiAI API", version="1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Connect to MongoDB
try:
    client = MongoClient("mongodb://localhost:27017", serverSelectionTimeoutMS=5000)
    db = client["khetiai"]
    client.server_info() # Trigger exception if cannot connect
except Exception as e:
    print("WARNING: MongoDB not running on localhost:27017, using mock db.")
    db = None

# --- AUTHENTICATION SETUP ---
SECRET_KEY = "supersecret_khetiai_key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 300

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

mock_users_db = {} # username -> {username, hashed_password}

def verify_password(plain_password, hashed_password):
    return bcrypt.checkpw(plain_password.encode('utf-8'), hashed_password.encode('utf-8'))

def get_password_hash(password):
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

class UserCreate(BaseModel):
    username: str
    password: str

@app.post("/register")
def register(user: UserCreate):
    hashed_password = get_password_hash(user.password)
    if db is not None:
        if db.users.find_one({"username": user.username}):
            raise HTTPException(status_code=400, detail="Username already registered")
        db.users.insert_one({"username": user.username, "hashed_password": hashed_password})
    else:
        if user.username in mock_users_db:
            raise HTTPException(status_code=400, detail="Username already registered")
        mock_users_db[user.username] = {"username": user.username, "hashed_password": hashed_password}
    return {"message": "User created successfully"}

@app.post("/token")
def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user = None
    if db is not None:
        user = db.users.find_one({"username": form_data.username})
    else:
        user = mock_users_db.get(form_data.username)
        
    if not user or not verify_password(form_data.password, user["hashed_password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = create_access_token(data={"sub": user["username"]})
    return {"access_token": access_token, "token_type": "bearer"}


# --- EXISTING & NEW REST ENDPOINTS ---

class CropRequest(BaseModel):
    ph: float
    nitrogen: float
    phosphorus: float
    potassium: float
    moisture: float

@app.get("/")
def root():
    return {"message": "Welcome to KhetiAI API 🌾"}

@app.get("/weather/forecast")
def get_weather(lat: float, lon: float):
    url = f"https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=IST"
    res = requests.get(url)
    return res.json()

@app.post("/crop/recommend")
def recommend_crop(req: CropRequest):
    if req.ph < 5.5:
        rec = ["Rice", "Maize"]
    elif req.ph >= 6.5:
        rec = ["Wheat", "Chickpea"]
    else:
        rec = ["Millets", "Pulses"]
        
    if db is not None:
        db.crop_logs.insert_one(req.dict())
    return {"recommended": rec}

crop_cycles = {
    "wheat": ["Sowing (Nov-Dec)", "Irrigation (Dec-Feb)", "Fertilization (Jan-Feb)", "Harvest (March-April)"],
    "rice": ["Nursery (June)", "Transplant (July)", "Weeding (Aug)", "Harvest (Nov)"]
}

@app.get("/lifecycle/{crop_name}")
def get_crop_lifecycle(crop_name: str):
    crop_name = crop_name.lower()
    if crop_name in crop_cycles:
        return {"crop": crop_name, "cycle": crop_cycles[crop_name]}
    return {"error": "Crop not found"}


# --- REAL-TIME WEBSOCKET ENDPOINTS ---

@app.websocket("/ws/disease")
async def websocket_disease_endpoint(websocket: WebSocket):
    await websocket.accept()
    try:
        data = await websocket.receive_json()
        if data.get("type") == "image":
            image_data = data["data"]
            mime_type = data["mime_type"]
            
            await websocket.send_json({"status": "processing", "message": "Analyzing image with Gemini Vision AI..."})
            
            prompt = "You are an expert plant pathologist. Analyze this image. If it's a plant leaf, identify any disease present. If it's healthy, state 'Healthy'. Also provide a confidence level and a short treatment recommendation. Reply strictly in JSON format with keys: 'disease', 'confidence' (string with %), and 'treatment'. Do not use markdown blocks, just the raw JSON string."
            
            try:
                models_to_try = ['gemini-3.5-flash', 'gemini-2.5-flash', 'gemini-2.0-flash']
                text = None
                for model_name in models_to_try:
                    try:
                        print(f"Trying {model_name} for disease detection...")
                        model = genai.GenerativeModel(model_name)
                        response = model.generate_content([
                            {'mime_type': mime_type, 'data': base64.b64decode(image_data)},
                            prompt
                        ])
                        text = response.text.strip()
                        print(f"Successfully generated response with {model_name}")
                        break
                    except Exception as e:
                        print(f"Error with {model_name}: {e}")
                        continue
                
                if text is None:
                    raise Exception("All Gemini models failed.")
                    
                if text.startswith('```json'): text = text[7:]
                if text.startswith('```'): text = text[3:]
                if text.endswith('```'): text = text[:-3]
                    
                result = json.loads(text.strip())
                await websocket.send_json({
                    "status": "complete", 
                    "disease": result.get("disease", "Unknown"), 
                    "confidence": result.get("confidence", "N/A"),
                    "treatment": result.get("treatment", "No treatment found.")
                })
            except Exception as e:
                print(f"Gemini AI Error: {e}")
                await websocket.send_json({"status": "complete", "disease": "Error", "confidence": "0%", "treatment": f"Failed to analyze image: {str(e)}"})
    except WebSocketDisconnect:
        pass
    except Exception as e:
        print(f"WebSocket Error: {e}")

@app.websocket("/ws/chat")
async def websocket_chat_endpoint(websocket: WebSocket):
    await websocket.accept()
    
    history = [
        {"role": "user", "parts": ["You are an expert agricultural assistant named KhetiAI Assistant. Provide helpful, short, and accurate farming, crop, and weather advice."]},
        {"role": "model", "parts": ["Understood. I am the KhetiAI Assistant. How can I help you today?"]}
    ]
    
    try:
        while True:
            data = await websocket.receive_text()
            history.append({"role": "user", "parts": [data]})
            
            models_to_try = ['gemini-3.5-flash', 'gemini-2.5-flash', 'gemini-2.0-flash']
            response_text = None
            
            for model_name in models_to_try:
                try:
                    print(f"Trying {model_name} for chat...")
                    model = genai.GenerativeModel(model_name)
                    response = model.generate_content(history)
                    response_text = response.text
                    print(f"Success with {model_name}")
                    break
                except Exception as e:
                    print(f"Error with {model_name}: {e}")
                    continue
            
            if response_text is None:
                await websocket.send_text("Sorry, all my AI brains are currently offline or unreachable. Please check API Key or Quotas.")
                history.pop() # Remove the user's message since it failed
            else:
                history.append({"role": "model", "parts": [response_text]})
                await websocket.send_text(response_text)
    except WebSocketDisconnect:
        pass

# -- NEW WEBSOCKET HUBS FOR AGRO 3.0 --

@app.websocket("/ws/market")
async def websocket_market(websocket: WebSocket):
    await websocket.accept()
    commodities = ["Wheat", "Rice", "Maize", "Cotton", "Sugarcane"]
    prices = {c: random.uniform(1500, 3500) for c in commodities}
    try:
        while True:
            # Simulate price fluctuations
            for c in commodities:
                prices[c] += random.uniform(-15, 15)
                
            await websocket.send_json({
                "market": [{"commodity": c, "market": "Local Mandi", "price": round(prices[c], 2), "trend": "up" if random.random() > 0.5 else "down"} for c in commodities]
            })
            await asyncio.sleep(2)
    except WebSocketDisconnect:
        pass

@app.websocket("/ws/soil_iot")
async def websocket_soil_iot(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            await websocket.send_json({
                "sensors": [
                    {
                        "id": f"Sensor_{i}",
                        "n": round(random.uniform(30, 80), 1),
                        "p": round(random.uniform(20, 60), 1),
                        "k": round(random.uniform(40, 90), 1),
                        "moisture": round(random.uniform(15, 45), 1)
                    } for i in range(1, 10)
                ]
            })
            await asyncio.sleep(3)
    except WebSocketDisconnect:
        pass

@app.websocket("/ws/livestock")
async def websocket_livestock(websocket: WebSocket):
    await websocket.accept()
    cattle = [
        {"id": "TAG-101", "lat": 28.7, "lon": 77.1, "heart_rate": 60, "temp": 38.5},
        {"id": "TAG-102", "lat": 28.701, "lon": 77.105, "heart_rate": 62, "temp": 38.6},
        {"id": "TAG-103", "lat": 28.705, "lon": 77.102, "heart_rate": 65, "temp": 39.0}
    ]
    try:
        while True:
            for c in cattle:
                c["lat"] += random.uniform(-0.0001, 0.0001)
                c["lon"] += random.uniform(-0.0001, 0.0001)
                c["heart_rate"] += random.randint(-2, 2)
                c["temp"] += random.uniform(-0.1, 0.1)
                
            await websocket.send_json({"cattle": cattle})
            await asyncio.sleep(2)
    except WebSocketDisconnect:
        pass

# --- REAL-TIME HUBS (PHASE 6) ---

@app.websocket("/ws/dashboard")
async def websocket_dashboard(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            await websocket.send_json({
                "time": datetime.now().strftime("%H:%M"),
                "soil_moisture": random.randint(35, 85),
                "temperature": random.randint(22, 35),
                "wind_speed": random.randint(5, 25),
                "crop_health": random.randint(70, 98)
            })
            await asyncio.sleep(4)
    except WebSocketDisconnect:
        pass

irrigation_sectors = [
    {"id": 1, "status": True, "moisture": 45},
    {"id": 2, "status": False, "moisture": 28},
    {"id": 3, "status": False, "moisture": 62},
    {"id": 4, "status": True, "moisture": 35}
]

@app.websocket("/ws/irrigation")
async def websocket_irrigation(websocket: WebSocket):
    await websocket.accept()
    try:
        # Initial state
        await websocket.send_json({"sectors": irrigation_sectors})
        
        async def state_broadcaster():
            while True:
                for s in irrigation_sectors:
                    if s["status"]:
                        s["moisture"] = min(100, s["moisture"] + random.randint(1, 3))
                    else:
                        s["moisture"] = max(0, s["moisture"] - random.randint(1, 2))
                await websocket.send_json({"sectors": irrigation_sectors})
                await asyncio.sleep(3)
                
        broadcast_task = asyncio.create_task(state_broadcaster())
        
        while True:
            data = await websocket.receive_json()
            if data.get("action") == "toggle":
                sec_id = data.get("sector")
                for s in irrigation_sectors:
                    if s["id"] == sec_id:
                        s["status"] = not s["status"]
                await websocket.send_json({"sectors": irrigation_sectors})
    except WebSocketDisconnect:
        broadcast_task.cancel()

@app.websocket("/ws/alerts")
async def websocket_alerts(websocket: WebSocket):
    await websocket.accept()
    alerts = [
        {"id": 101, "type": "warning", "title": "Weather Warning", "message": "Heavy rainfall expected soon.", "time": "Just now"},
        {"id": 102, "type": "critical", "title": "Pest Detection", "message": "Locust swarm detected nearby.", "time": "Just now"},
        {"id": 103, "type": "success", "title": "Irrigation Complete", "message": "Sector 1 finished watering.", "time": "Just now"}
    ]
    try:
        while True:
            await asyncio.sleep(random.uniform(5, 15))
            new_alert = random.choice(alerts).copy()
            new_alert["id"] = random.randint(1000, 9999)
            new_alert["time"] = datetime.now().strftime("%H:%M:%S")
            await websocket.send_json({"alert": new_alert})
    except WebSocketDisconnect:
        pass

community_connections = []
community_posts = [
    {"id": 1, "author": "Vikram Singh", "role": "Wheat Farmer", "time": "2 hours ago", "content": "Just switched to the new drought-resistant wheat variety.", "upvotes": 142, "replies": 28}
]

@app.websocket("/ws/community")
async def websocket_community(websocket: WebSocket):
    await websocket.accept()
    community_connections.append(websocket)
    try:
        # Send initial posts
        await websocket.send_json({"posts": community_posts})
        while True:
            data = await websocket.receive_json()
            if data.get("action") == "new_post":
                new_post = {
                    "id": random.randint(100, 99999),
                    "author": "You",
                    "role": "Farm Owner",
                    "time": "Just now",
                    "content": data.get("content"),
                    "upvotes": 0,
                    "replies": 0
                }
                community_posts.insert(0, new_post)
                # Broadcast
                for conn in community_connections:
                    await conn.send_json({"posts": community_posts})
    except WebSocketDisconnect:
        community_connections.remove(websocket)
