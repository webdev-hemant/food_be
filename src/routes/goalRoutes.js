// goalRoutes.js

const express = require('express');
const router = express.Router();
const { getRecommendations } = require('../services/goalRecommender');
const { getUserDetails } = require('../middleware/getUserDetails');
const CalorieMacroTrack = require('../models/calorieMacroTracking');

// GET: Get macro recommendations
router.get('/recommendations', getUserDetails, async (req, res) => {
  try {
    const userId = req.user.id;
    const recs = await getRecommendations(userId);
    res.json(recs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message || 'Failed to get recommendations' });
  }
});

// GET: Get full calorie tracking history
router.get('/history', getUserDetails, async (req, res) => {
  try {
    const userId = req.user.id;

    const records = await CalorieMacroTrack.findAll({
      where: { userId },
      order: [['date', 'DESC']],
    });

    res.json({
      message: 'Calorie tracking history fetched successfully',
      data: records,
    });
  } catch (error) {
    console.error('Failed to fetch calorie tracking history:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
