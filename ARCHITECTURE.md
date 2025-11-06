# CalorieContra - React + Node.js Architecture Documentation

## Overview
CalorieContra has been rebuilt using a modern JavaScript stack with React.js for the frontend and Node.js/Express.js for the backend. This document explains the architecture, components, and how they work together.

## Tech Stack

### Frontend
- **React.js** - JavaScript library for building user interfaces
- **Vite** - Fast build tool and development server
- **TailwindCSS** - Utility-first CSS framework for styling
- **React Router** - Client-side routing for navigation
- **Axios** - HTTP client for API requests

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework for Node.js
- **SQLite3** - Lightweight database for storing user data and food logs
- **bcryptjs** - Password hashing library
- **jsonwebtoken** - JWT authentication implementation
- **CORS** - Cross-Origin Resource Sharing middleware

## Project Structure

```
calorie-contra/
├── client/                    # React frontend
│   ├── src/
│   │   ├── components/       # React components
│   │   │   ├── Navbar.jsx           # Navigation bar
│   │   │   ├── Login.jsx            # Login page
│   │   │   ├── Register.jsx         # Registration page
│   │   │   ├── FoodSearch.jsx       # Food search with "Add to Log" 
│   │   │   └── FoodLog.jsx          # View logged foods
│   │   ├── App.jsx           # Main app component with routing
│   │   ├── index.css         # TailwindCSS imports
│   │   └── main.jsx          # App entry point
│   ├── vite.config.js        # Vite configuration with proxy
│   ├── tailwind.config.js    # TailwindCSS configuration
│   └── package.json          # Frontend dependencies
│
├── server/                   # Express backend
│   ├── routes/
│   │   ├── auth.js          # Authentication routes (login/register)
│   │   └── food.js          # Food search and logging routes
│   ├── middleware/
│   │   └── auth.js          # JWT authentication middleware
│   ├── db/
│   │   └── database.js      # SQLite database setup
│   └── index.js             # Express server entry point
│
└── package.json             # Root package.json with scripts
```

## How It Works

### 1. React Frontend (Client)

#### App.jsx - Main Application
The `App.jsx` file is the root component that sets up:
- **React Router** for navigation between pages
- **Authentication state** stored in localStorage
- **Protected routes** that redirect to login if not authenticated

```jsx
// Main routing structure
<Router>
  <Navbar user={user} onLogout={handleLogout} />
  <Routes>
    <Route path="/" element={<FoodSearch />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/log" element={<FoodLog />} />
  </Routes>
</Router>
```

#### FoodSearch.jsx - Food Search with Add to Log
This component provides the core functionality:

1. **Search Interface**: Users enter food names to search the USDA database
2. **Results Display**: Shows nutritional information (calories, protein, carbs, fat)
3. **Add to Log Button**: Each food item has a green "+ Add to Log" button
4. **Instant Feedback**: Success message appears when food is logged

Key features:
```jsx
// Search function
const handleSearch = async () => {
  const response = await axios.get(`/api/food/search?query=${searchQuery}`)
  setSearchResults(response.data.foods)
}

// Add to log function - THIS IS WHAT YOU ASKED FOR!
const handleAddToLog = async (food) => {
  await axios.post('/api/food/log', {
    food_name: food.name,
    calories: food.calories,
    // ... other nutritional data
  }, {
    headers: { Authorization: `Bearer ${token}` }
  })
  setMessage('Successfully logged!')
}
```

#### TailwindCSS Styling
All components use TailwindCSS utility classes:
- `bg-gradient-to-br from-purple-100` - Beautiful gradient backgrounds
- `rounded-lg shadow-xl` - Rounded corners and shadows
- `hover:bg-green-600` - Interactive hover effects
- Responsive design with `md:` and `sm:` prefixes

### 2. Node.js/Express Backend (Server)

#### server/index.js - Main Server
The Express server:
- Runs on port 3000
- Enables CORS for frontend communication
- Routes API requests to appropriate handlers

```javascript
const app = express()
app.use(cors())
app.use(express.json())
app.use('/api/auth', authRoutes)
app.use('/api/food', foodRoutes)
```

#### Authentication (server/routes/auth.js)
Handles user registration and login:

**Register Flow:**
1. Receives username, email, password
2. Hashes password with bcryptjs
3. Stores user in SQLite database
4. Returns JWT token

**Login Flow:**
1. Receives username, password
2. Verifies password against hashed version
3. Returns JWT token if valid

```javascript
// JWT token creation
const token = jwt.sign(
  { userId: user.id, username: user.username },
  JWT_SECRET,
  { expiresIn: '7d' }
)
```

#### Food Routes (server/routes/food.js)
Provides three endpoints:

1. **GET /api/food/search** - Search USDA database
   - Queries USDA FoodData Central API
   - Returns simplified food data with nutrition info

2. **POST /api/food/log** - Log a food (protected route)
   - Requires JWT authentication
   - Saves food to user's log with timestamp
   - Returns success confirmation

3. **GET /api/food/logs** - Get user's logged foods (protected route)
   - Requires JWT authentication
   - Returns all foods logged by the user

#### Database (server/db/database.js)
SQLite database with two tables:

```sql
users:
- id (primary key)
- username (unique)
- email (unique)
- hash (password hash)

food_count:
- id (primary key)
- food_name
- calories, protein, carbs, fat
- month, day, year, hour, minute (timestamp)
- user_id (foreign key)
```

### 3. Communication Flow

#### API Proxy with Vite
The Vite development server proxies API requests:

```javascript
// vite.config.js
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:3000',  // Express backend
      changeOrigin: true,
    },
  },
}
```

When frontend makes request to `/api/food/search`:
1. Vite forwards to `http://localhost:3000/api/food/search`
2. Express handles the request
3. Response sent back to React frontend

#### Authentication Flow
1. User registers/logs in via React form
2. Frontend sends credentials to Express backend
3. Backend validates and returns JWT token
4. Frontend stores token in localStorage
5. All subsequent API requests include token in headers:
   ```javascript
   headers: { Authorization: `Bearer ${token}` }
   ```

#### Food Search and Logging Flow
1. User types food name and clicks "Search"
2. React sends GET request to `/api/food/search?query=apple`
3. Express fetches data from USDA API
4. Results displayed in React with "Add to Log" button
5. User clicks "+ Add to Log" button
6. React sends POST to `/api/food/log` with JWT token
7. Express validates token and saves to database
8. Success message shown to user

## Key Features Implemented

### ✅ Food Search Interface
- Search box with USDA database integration
- Popular food quick-search buttons
- Clean, modern UI with TailwindCSS

### ✅ Add to Log Functionality
- Green "+ Add to Log" button on each search result
- One-click logging of nutritional data
- Success feedback messages
- JWT-protected endpoint

### ✅ Food Log Viewer
- View all logged foods
- Daily totals calculator (calories, macros)
- Timestamps for each entry
- Beautiful card-based layout

### ✅ Authentication System
- Secure registration with password hashing
- JWT-based authentication
- Protected routes on frontend and backend
- Persistent login with localStorage

## Environment Variables

The application uses the following environment variables:

- `JWT_SECRET` - Secret key for JWT token generation (defaults to 'your-secret-key-change-this')
- `USDA_API_KEY` - API key for USDA FoodData Central (optional - uses mock database if not provided)
- `PORT` - Backend port (defaults to 3000)

### USDA API Key (Optional)

The app includes a **mock food database** with 15 common foods, so it works out of the box without an API key. This is perfect for testing and demonstration.

If you want to use real USDA data:
1. Get a free API key from https://fdc.nal.usda.gov/api-guide.html
2. Create a `.env` file in the root directory:
   ```
   USDA_API_KEY=your-api-key-here
   JWT_SECRET=your-custom-secret-key
   ```

The app automatically falls back to the mock database if the USDA API fails or no key is provided.

## Running the Application

### Development Mode

1. **Start Both Servers (Recommended):**
   ```bash
   npm run dev
   ```
   This starts both the Express backend (port 3000) and React frontend (port 5000)

2. **Or start them separately:**
   
   **Backend only:**
   ```bash
   npm run server
   ```
   
   **Frontend only:**
   ```bash
   npm run client
   ```

3. **Access the App:**
   Open http://localhost:5000 in your browser

### Production Considerations

- Set strong `JWT_SECRET` in environment variables
- Use HTTPS for secure token transmission
- Add rate limiting to prevent API abuse
- Implement proper error logging
- Use PostgreSQL instead of SQLite for scalability

## How React, Node.js, and Express Work Together

### Request-Response Cycle Example

**User searches for "banana":**

1. **React (Frontend):**
   ```jsx
   // FoodSearch.jsx
   const handleSearch = async () => {
     const response = await axios.get('/api/food/search?query=banana')
     setSearchResults(response.data.foods)
   }
   ```

2. **Vite Proxy:** Forwards `/api/food/search` → `http://localhost:3000/api/food/search`

3. **Express (Backend):**
   ```javascript
   // server/routes/food.js
   router.get('/search', async (req, res) => {
     const { query } = req.query  // "banana"
     const response = await axios.get('USDA_API_URL', { params: { query } })
     res.json({ foods: formattedFoods })
   })
   ```

4. **React receives data** and displays search results

5. **User clicks "Add to Log":**
   ```jsx
   const handleAddToLog = async (food) => {
     await axios.post('/api/food/log', food, {
       headers: { Authorization: `Bearer ${token}` }
     })
   }
   ```

6. **Express saves to database:**
   ```javascript
   router.post('/log', authMiddleware, async (req, res) => {
     await db.run('INSERT INTO food_count ...')
     res.json({ message: 'Success' })
   })
   ```

## Benefits of This Stack

### React.js
- ✅ Component-based architecture
- ✅ Fast, reactive UI updates
- ✅ Rich ecosystem of libraries
- ✅ Easy state management

### Node.js + Express.js
- ✅ JavaScript on both frontend and backend
- ✅ Fast, non-blocking I/O
- ✅ Simple REST API creation
- ✅ Middleware support for auth, CORS, etc.

### TailwindCSS
- ✅ Rapid UI development
- ✅ Consistent design system
- ✅ No CSS file management
- ✅ Responsive by default

## Summary

This CalorieContra rebuild demonstrates a modern, full-stack JavaScript application:
- **Frontend**: React handles all UI, routing, and user interactions
- **Backend**: Express provides RESTful API endpoints
- **Database**: SQLite stores users and food logs
- **Authentication**: JWT secures API endpoints
- **Styling**: TailwindCSS creates beautiful, responsive UI

The "Add to Log" functionality you requested is implemented as a button on each food search result that immediately saves the food to your personal log with one click!
