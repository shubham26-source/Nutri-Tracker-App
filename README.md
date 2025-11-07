🥗 NutriTrack – Full-Stack Nutrition Tracker
GitHub Repository
React - Node.js - Express

A modern, full-stack nutrition tracking web application that allows users to search foods, view nutrition details, and maintain a personal calorie log — built with React, TailwindCSS, Node.js, Express.js, and a lightweight local database.

✅ Features
🔍 Food Search

Search foods using a local nutrition dataset (fast & offline capable)

Smart suggestions & popular shortcuts

Modern search UI built with React

🍽️ Food Logging

Add food items to your daily log

View calories, portions & nutrition info

Auto-store logs in backend database

📊 Food Log Dashboard

View eaten items and track calorie consumption

Organized by date

🎨 Modern UI

Fully responsive React interface

Styled with TailwindCSS and smooth gradients

Clean, modern visual design

🗄 Backend API

Node.js + Express REST API

Separate routes for: Food Search, Add Food Log, Fetch Log

Clean folder structure

🛠 Tech Stack
Frontend
React (Vite)

TailwindCSS

Component-based UI

Fetch API integration

Backend
Node.js

Express.js

REST API endpoints

API input validation

Database
Local SQLite / .db file

Stores user logs

Lightweight & fast

📁 Project Structure
text
NutriTrack/
│
├── client/                  # React Frontend
│   ├── src/
│   │   ├── components/      # UI: Search, Log, Cards, Navbar
│   │   ├── pages/           # Search page, MyLog page
│   │   └── App.jsx
│   ├── public/
│   └── package.json
│
├── server/                  # Backend (Node + Express)
│   ├── routes/
│   │   ├── food.js          # Food search API
│   │   └── log.js           # Add/view food log API
│   ├── db/
│   │   └── database.js      # DB connection + queries
│   ├── index.js             # Server entry
│   └── package.json
│
└── README.md
🚀 Quick Start
Clone the repository:

bash
git clone https://github.com/shubham26-source/Nutri-Tracker-App.git
cd Nutri-Tracker-App
Install backend dependencies:

bash
cd server
npm install
Install frontend dependencies:

bash
cd ../client
npm install
Start the backend:

bash
npm start
Start the React frontend:

bash
npm run dev
📸 Screenshots
Home / Search Page
(Insert screenshot here)

Food Log Page
(Insert screenshot here)

Backend API Response (Optional)

🧩 API Endpoints
Search Food

text
GET /api/food/search?query=apple
Add Food Log

text
POST /api/log/add
{
  "name": "Banana",
  "calories": 105
}
Get Logs

text
GET /api/log/all
✅ Future Enhancements
Integrate real-time nutrition API (CalorieNinjas / Edamam)

Add user authentication

Weekly & monthly analytics

AI-powered nutrition assistant

🎓 Developed By
Shubham Sharma
M.Tech – K.J. Somaiya College of Engineering
