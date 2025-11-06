const express = require('express');
const axios = require('axios');
const db = require('../db/database');
const authMiddleware = require('../middleware/auth');

const router = express.Router();
const USDA_API_KEY = process.env.USDA_API_KEY || '';

const MOCK_FOOD_DATABASE = [
  { id: 1, name: 'Apple, raw', calories: 52, protein: 0.3, carbs: 14, fat: 0.2 },
  { id: 2, name: 'Banana, raw', calories: 89, protein: 1.1, carbs: 23, fat: 0.3 },
  { id: 3, name: 'Chicken breast, grilled', calories: 165, protein: 31, carbs: 0, fat: 3.6 },
  { id: 4, name: 'Rice, white, cooked', calories: 130, protein: 2.7, carbs: 28, fat: 0.3 },
  { id: 5, name: 'Broccoli, cooked', calories: 35, protein: 2.4, carbs: 7, fat: 0.4 },
  { id: 6, name: 'Salmon, cooked', calories: 208, protein: 22, carbs: 0, fat: 13 },
  { id: 7, name: 'Egg, whole, cooked', calories: 155, protein: 13, carbs: 1.1, fat: 11 },
  { id: 8, name: 'Oatmeal, cooked', calories: 71, protein: 2.5, carbs: 12, fat: 1.5 },
  { id: 9, name: 'Greek yogurt, plain', calories: 97, protein: 9, carbs: 3.6, fat: 5 },
  { id: 10, name: 'Sweet potato, baked', calories: 90, protein: 2, carbs: 21, fat: 0.2 },
  { id: 11, name: 'Almonds, raw', calories: 579, protein: 21, carbs: 22, fat: 50 },
  { id: 12, name: 'Avocado, raw', calories: 160, protein: 2, carbs: 9, fat: 15 },
  { id: 13, name: 'Quinoa, cooked', calories: 120, protein: 4.4, carbs: 21, fat: 1.9 },
  { id: 14, name: 'Spinach, raw', calories: 23, protein: 2.9, carbs: 3.6, fat: 0.4 },
  { id: 15, name: 'Ground beef, 90% lean, cooked', calories: 176, protein: 25, carbs: 0, fat: 8 }
];

router.get('/search', async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: 'Search query required' });
  }

  if (!USDA_API_KEY) {
    console.log('Using mock food database (USDA_API_KEY not set)');
    const results = MOCK_FOOD_DATABASE.filter(food => 
      food.name.toLowerCase().includes(query.toLowerCase())
    );
    return res.json({ foods: results });
  }

  try {
    const response = await axios.get('https://api.nal.usda.gov/fdc/v1/foods/search', {
      params: {
        api_key: USDA_API_KEY,
        query: query,
        pageSize: 10
      }
    });

    const foods = response.data.foods.map(food => ({
      id: food.fdcId,
      name: food.description,
      calories: food.foodNutrients.find(n => n.nutrientName === 'Energy')?.value || 0,
      protein: food.foodNutrients.find(n => n.nutrientName === 'Protein')?.value || 0,
      carbs: food.foodNutrients.find(n => n.nutrientName === 'Carbohydrate, by difference')?.value || 0,
      fat: food.foodNutrients.find(n => n.nutrientName === 'Total lipid (fat)')?.value || 0
    }));

    res.json({ foods });
  } catch (error) {
    console.error('USDA API Error:', error.message, '- falling back to mock database');
    const results = MOCK_FOOD_DATABASE.filter(food => 
      food.name.toLowerCase().includes(query.toLowerCase())
    );
    res.json({ foods: results });
  }
});

router.post('/log', authMiddleware, async (req, res) => {
  const { food_name, calories, protein, carbs, fat } = req.body;
  const userId = req.user.userId;
  const now = new Date();

  try {
    const result = await db.run(
      'INSERT INTO food_count (food_name, calories, protein, carbs, fat, month, day, year, hour, minute, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [food_name, calories, protein, carbs, fat, now.getMonth() + 1, now.getDate(), now.getFullYear(), now.getHours(), now.getMinutes(), userId]
    );

    res.status(201).json({ 
      message: 'Food logged successfully',
      id: result.lastID
    });
  } catch (error) {
    res.status(500).json({ error: 'Error logging food' });
  }
});

router.get('/logs', authMiddleware, async (req, res) => {
  const userId = req.user.userId;

  try {
    const logs = await db.all(
      'SELECT * FROM food_count WHERE user_id = ? ORDER BY year DESC, month DESC, day DESC, hour DESC, minute DESC LIMIT 50',
      [userId]
    );

    res.json({ logs });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching logs' });
  }
});

module.exports = router;
