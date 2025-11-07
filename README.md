# 🥗 NutriTrack - Nutrition Tracking Application

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen)](your-demo-link-here)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-blue)](https://github.com/yourusername/nutritrack)
[![Node.js](https://img.shields.io/badge/Node.js-20-green)](https://nodejs.org)
[![React](https://img.shields.io/badge/React-19.1-blue)](https://react.dev)
[![Express](https://img.shields.io/badge/Express-5.1-lightgrey)](https://expressjs.com)

> A modern, full-stack nutrition tracking web application that helps users monitor their daily calorie intake and macronutrients with real-time visual analytics and USDA food database integration.

## 🚀 Features

### Core Features
- **🔍 Smart Food Search** - Search from USDA's comprehensive food database with real-time results
- **📊 Visual Analytics Dashboard** - Beautiful progress bars and nutrient visualizations
- **📱 Modern Responsive UI** - Built with React and Tailwind CSS for seamless experience
- **👤 User Authentication** - Secure JWT-based login and registration system
- **📈 Progress Tracking** - Daily goal monitoring with color-coded progress bars
- **🎨 Interactive Visualizations** - Animated nutrient bars for each food entry

### Advanced Features  
- **Real-time Nutrition Calculation** - Instant macronutrient breakdown for all foods
- **Daily Totals Dashboard** - Gradient cards showing comprehensive daily nutrition
- **Progress Bars** - Visual representation of calories, protein, carbs, and fat goals
- **Food Entry Cards** - Individual visualizations with horizontal nutrient bars
- **Hover Effects** - Smooth animations and interactive transitions
- **Session Management** - Persistent user sessions with secure token storage

## 🛠️ Tech Stack

**Backend:**
- **Runtime:** Node.js 20
- **Framework:** Express 5.1
- **Database:** SQLite3 (lightweight and efficient)
- **Authentication:** JWT (JSON Web Tokens) + bcryptjs for password hashing
- **API Client:** Axios for external API calls
- **Security:** CORS for cross-origin requests

**Frontend:**
- **UI Library:** React 19.1 with Hooks
- **Build Tool:** Vite 7.1 (lightning-fast HMR)
- **Styling:** Tailwind CSS 4.1 (utility-first framework)
- **Routing:** React Router DOM 7.9
- **HTTP Client:** Axios for API communication
- **Animations:** CSS transitions and Tailwind animations

**External APIs:**
- **USDA FoodData Central API** - Comprehensive nutrition database with 300,000+ foods

## 📸 Screenshots

### Dashboard Overview
<img width="1597" height="762" alt="image" src="https://github.com/user-attachments/assets/5c954666-6df1-4f7f-8305-19a612fe354d" />
<img width="1558" height="920" alt="image" src="https://github.com/user-attachments/assets/38eda8fe-432a-4611-b7e7-15195bcabdf2" />



### Food Search Interface  
<img width="1919" height="789" alt="image" src="https://github.com/user-attachments/assets/ce8a10db-5c0e-4ed8-a9e0-aa368490fa12" />



### Food Log Interface
<img width="1894" height="910" alt="image" src="https://github.com/user-attachments/assets/b2fb9437-dbe2-414e-aa45-2a26a103ba39" />


### Food Log with Visual Analytics
<img width="1018" height="335" alt="image" src="https://github.com/user-attachments/assets/a6ec0eab-e842-4cf8-9b5b-ad71120e6c73" />


### Daily Progress Dashboard
<img width="1403" height="836" alt="image" src="https://github.com/user-attachments/assets/697a881f-fda0-458d-9019-fb04ecdfe582" />


### Individual Food Entry Visualizations
<img width="1401" height="882" alt="image" src="https://github.com/user-attachments/assets/5bcf2195-1af9-48ad-8222-2b8555a739fa" />


## 🚀 Quick Start

### Prerequisites
- Node.js 20 or higher
- npm (comes with Node.js)
- USDA API Key ([Get one here](https://fdc.nal.usda.gov/api-guide.html))

### Installation Steps

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/nutritrack.git
cd nutritrack
```

2. **Install server dependencies**
```bash
npm install
```

3. **Install client dependencies**
```bash
cd client
npm install
cd ..
```

4. **Set up environment variables**

Add your USDA API key to Replit Secrets or create a `.env` file:
```env
USDA_API_KEY=your_api_key_here
```

5. **Build the React frontend**
```bash
npm run build
```

6. **Start the server**
```bash
npm start
```

The application will be running at `http://localhost:5000`

## 📂 Project Structure

```
nutritrack/
├── server/
│   ├── index.js           # Express server with API routes
│   └── database.db        # SQLite database
├── client/
│   ├── src/
│   │   ├── components/    # React components
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── FoodSearch.jsx
│   │   │   ├── FoodLog.jsx
│   │   │   └── Navbar.jsx
│   │   ├── App.jsx        # Main application component
│   │   └── main.jsx       # Entry point
│   ├── dist/              # Production build
│   ├── vite.config.js     # Vite configuration
│   └── package.json
├── package.json
└── README.md
```

## 🔌 API Endpoints

### Authentication
- `POST /api/register` - Register a new user
  - Body: `{ username, password }`
  - Returns: Success message

- `POST /api/login` - Login user
  - Body: `{ username, password }`
  - Returns: `{ token }`

### Food Operations
- `GET /api/food/search?query={searchTerm}` - Search for foods in USDA database
  - Requires: JWT token in Authorization header
  - Returns: Array of food items with nutritional data

- `POST /api/food/log` - Add food to user's log
  - Requires: JWT token in Authorization header
  - Body: `{ food_name, calories, protein, carbs, fat }`
  - Returns: Success message with log ID

- `GET /api/food/logs` - Get user's food log entries
  - Requires: JWT token in Authorization header
  - Returns: Array of logged foods with timestamps

## 🎨 Features Highlight

### Visual Progress Tracking
- **Color-coded progress bars** for daily nutrition goals
- **Gradient backgrounds** on cards for visual appeal
- **Animated transitions** for smooth user experience
- **Responsive design** that works on all devices

### Nutrient Visualization
Each food entry displays:
- Horizontal bars for protein, carbs, and fat
- Color coding: Blue (protein), Green (carbs), Yellow (fat)
- Dynamic scaling based on values
- Hover effects for better interactivity

## 🚀 Development

### Run in Development Mode

**Start backend:**
```bash
npm start
```

**Start frontend (in a separate terminal):**
```bash
cd client
npm run dev
```

The React development server will run on port 5173, and the backend will run on port 5000.

## 🔐 Security Features

- **Password Hashing**: bcryptjs with salt rounds
- **JWT Authentication**: Secure token-based authentication
- **Protected Routes**: API endpoints require valid JWT tokens
- **CORS Configuration**: Controlled cross-origin access
- **Environment Variables**: Sensitive data stored in .env files

## 🌟 Future Enhancements

- Weekly and monthly nutrition analytics
- Custom daily goal settings per user
- Meal planning and scheduling features
- Recipe management and creation
- Export data to CSV/PDF
- Dark mode support
- Mobile application (React Native)
- Barcode scanning for quick food entry
- Integration with fitness trackers

## 📝 License

This project is licensed under the ISC License.

---

## 👨‍💻 Developer

**Shubham Sharma**  
M.Tech – K.J. Somaiya College of Engineering
