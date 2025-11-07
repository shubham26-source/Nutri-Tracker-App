🥗 NutriTrack – Full-Stack Nutrition Tracker (React + Node.js + Express)










A modern, full-stack nutrition tracking web application that allows users to search foods, view nutrition details, and maintain a personal calorie log — built using React, TailwindCSS, Node.js, Express.js, and a lightweight database.

✅ Features
🔍 Food Search

Search foods using a local nutrition dataset (fast & offline capable)

Smart suggestions & popular shortcuts

Modern search UI built with React

🍽️ Food Logging

Add food items to your daily log

View calories, portions & nutrition info

Automatically stores logs in the backend database

📊 My Food Log Dashboard

View your eaten items

Track calorie consumption

Organized by date

🎨 Modern UI

Fully responsive React interface

Styled with TailwindCSS + smooth gradients

Clean and modern visual design

🗄 Backend API

Node.js + Express REST API

Separate routes for:
✅ Food Search
✅ Add Food Log
✅ Fetch Log

Clean folder structure

🛠 Tech Stack
Frontend

✅ React (Vite-based setup)

✅ TailwindCSS

✅ Component-based UI

✅ Fetch API for backend communication

Backend

✅ Node.js

✅ Express.js

✅ REST endpoints

✅ API input validation

Database

✅ Local database file (SQLite / .db)

✅ Stores user logs

✅ Lightweight & fast

📁 Project Structure (Simplified)
NutriTrack/
│
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/     # UI components (Search, Log, Cards, Navbar)
│   │   ├── pages/          # Search page, MyLog page
│   │   └── App.jsx
│   ├── public/
│   └── package.json
│
├── server/                 # Backend (Node + Express)
│   ├── routes/
│   │   ├── food.js         # Food search API
│   │   └── log.js          # Add/view food log API
│   ├── db/
│   │   └── database.js     # DB connection + queries
│   ├── index.js            # Server entry
│   └── package.json
│
└── README.md

🚀 Quick Start
✅ 1. Clone the repository
git clone https://github.com/shubham26-source/Nutri-Tracker-App.git
cd Nutri-Tracker-App

✅ 2. Install backend dependencies
cd server
npm install

✅ 3. Install frontend dependencies
cd ../client
npm install

✅ 4. Start the backend
npm start

✅ 5. Start the React frontend
npm run dev

📸 Screenshots
✅ Home / Search Page

(Insert updated screenshot here)

✅ Food Log Page

(Insert updated screenshot here)

✅ Backend API Response

(Optional)

🧩 API Endpoints
🔍 Search Food
GET /api/food/search?query=apple

➕ Add Food Log
POST /api/log/add
{
  "name": "Banana",
  "calories": 105
}

📄 Get Logs
GET /api/log/all

✅ Future Enhancements

Integrate real-time nutrition API (CalorieNinjas / Edamam)

Add user authentication

Add weekly & monthly analytics

Add AI-powered nutrition assistant

🎓 Developed By

Shubham Sharma
B.Tech – K.J. Somaiya College of Engineering
