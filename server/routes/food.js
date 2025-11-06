const express = require('express');
const axios = require('axios');
const db = require('../db/database');
const authMiddleware = require('../middleware/auth');

const router = express.Router();
const CALORIE_NINJAS_KEY = process.env.CALORIE_NINJAS_KEY || '';

router.get('/search', async (req, res) => {
  const { q } = req.query;

  if (!q) {
    return res.status(400).json({ error: 'Search query required' });
  }

  if (!CALORIE_NINJAS_KEY) {
    return res.status(500).json({ error: 'CalorieNinjas API key not configured' });
  }

  try {
    const response = await axios.get('https://api.calorieninjas.com/v1/nutrition', {
      params: { query: q },
      headers: { 'X-Api-Key': CALORIE_NINJAS_KEY }
    });

    if (!response.data.items || response.data.items.length === 0) {
      return res.json({ foods: [] });
    }

    const foods = response.data.items.map((item, index) => ({
      id: `${item.name}-${index}`,
      name: item.name.charAt(0).toUpperCase() + item.name.slice(1),
      calories: item.calories || 0,
      protein: item.protein_g || 0,
      carbs: item.carbohydrates_total_g || 0,
      fat: item.fat_total_g || 0,
      serving_size: item.serving_size_g || 100
    }));

    res.json({ foods });
  } catch (error) {
    console.error('CalorieNinjas API Error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Error fetching nutrition data from CalorieNinjas API' });
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
