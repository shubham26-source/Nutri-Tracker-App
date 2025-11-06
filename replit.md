# NutriTrack - Modern Full-Stack Nutrition Tracker

## Overview
A modern, full-stack nutrition tracking web application built with **React.js**, **Node.js**, and **Express.js**. The app helps users monitor their daily calorie intake and macronutrients with intelligent food search and easy logging.

## Features
- **Smart Food Search** - Search from a comprehensive food database (USDA API or mock database)
- **One-Click Logging** - "Add to Log" button on each search result for instant tracking
- **Food Log Viewer** - See all logged foods with daily nutrition totals
- **User Authentication** - Secure JWT-based login and registration
- **Modern UI** - Beautiful gradient design with TailwindCSS
- **Real-time Nutrition Calculation** - Instant macronutrient breakdown

## Recent Updates (Nov 6, 2025)
- ✅ **Complete stack migration from Python/Quart to React.js + Node.js/Express.js**
- ✅ Built Express.js REST API with authentication and food endpoints
- ✅ Created React.js SPA with Vite and TailwindCSS v4
- ✅ Implemented JWT authentication with bcrypt password hashing
- ✅ Added mock food database for out-of-the-box functionality
- ✅ **Production-ready single-server setup** - Express serves built React app
- ✅ Configured for Replit deployment with proper host settings
- ✅ Optimized workflow to run single server on port 5000

## Architecture
- **Frontend**: React.js 19.x with Vite build tool
- **Styling**: TailwindCSS v4 (utility-first CSS)
- **Backend**: Node.js 20 with Express.js framework
- **Database**: SQLite3 with promise-based wrapper
- **Authentication**: JWT tokens with bcryptjs password hashing
- **API**: USDA FoodData Central (optional - falls back to mock database)
- **Routing**: React Router for client-side navigation

## Environment Variables
```bash
JWT_SECRET=your-jwt-secret-key
USDA_API_KEY=your-usda-api-key  # Optional - uses mock database if not set
PORT=3000
```

**Note**: The app includes a mock food database with 15 common foods, so it works perfectly without any API keys for testing and demonstration.

## User Preferences
- Clean, modern UI with gradient backgrounds
- Component-based React architecture
- Fast, reactive user experience
- SQLite database for simplicity
- TailwindCSS for rapid styling
- Mock data fallback for easy setup

## Project Structure
```
calorie-contra/
├── client/                    # React frontend (Vite)
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── App.jsx          # Main app with routing
│   │   ├── index.css        # Tailwind imports
│   │   └── main.jsx         # Entry point
│   ├── vite.config.js       # Vite config with proxy
│   └── package.json         # Frontend dependencies
│
├── server/                   # Express backend
│   ├── routes/              # API routes (auth, food)
│   ├── middleware/          # Auth middleware
│   ├── db/                  # Database setup
│   └── index.js            # Server entry point
│
├── package.json            # Root package.json
├── ARCHITECTURE.md         # Detailed technical documentation
└── .env.example           # Environment variable template
```

## Technical Details

### Authentication Flow
- Passwords hashed with bcryptjs before storage
- JWT tokens generated on login/register (7-day expiry)
- Protected routes require valid JWT in Authorization header
- Frontend stores tokens in localStorage

### Food Search with Add to Log
1. User searches for food by name
2. Express backend queries USDA API or mock database
3. Results displayed with nutrition info (calories, protein, carbs, fat)
4. **Green "+ Add to Log" button** on each result
5. One click logs the food to user's personal database
6. Success message confirms the action

### API Endpoints
- `POST /api/auth/register` - Create new user account
- `POST /api/auth/login` - Login and get JWT token
- `GET /api/food/search?query=apple` - Search for foods
- `POST /api/food/log` - Log a food (protected)
- `GET /api/food/logs` - Get user's logged foods (protected)

## Running the Application

**Production Mode (Single Server):**
```bash
npm start
```

This runs the Express server on port 5000, which serves both:
- The REST API at `/api/*` endpoints
- The built React frontend for all other routes

**Development Mode (Frontend only):**
```bash
npm run dev:client
```

This runs the Vite dev server with hot-reload for faster frontend development.

**Build Frontend:**
```bash
npm run build
```

Builds the React app for production. Run this before deploying or testing the production setup.

Access the app at **http://localhost:5000**

## Current Status
✅ **PRODUCTION-READY** - Optimized single-server architecture
- Registration and login working with JWT auth
- Food search working with mock database
- "Add to Log" functionality working perfectly
- Food log viewer showing all logged items
- Beautiful TailwindCSS styling with gradients
- Single Express server serves built React app and API
- Configured for Replit deployment (port 5000, allowed hosts)
- Clean codebase with removed legacy Python files

## Documentation
See **ARCHITECTURE.md** for comprehensive technical documentation including:
- How React, Node.js, and Express.js work together
- Complete request-response flow diagrams
- Component structure and responsibilities
- Database schema
- Security considerations