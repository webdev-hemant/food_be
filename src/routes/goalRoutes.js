const express = require('express');
const router = express.Router();
const { getRecommendations } = require('../services/goalRecommender');
const { getUserDetails } = require('../middleware/getUserDetails');

router.get('/recommendations',getUserDetails, async (req, res) => {
  try {
    const userId = req.user.id; // assuming JWT auth middleware is applied
    console.log(req.user)
    const recs = await getRecommendations(userId);
    res.json(recs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message || 'Failed to get recommendations' });
  }
});

module.exports = router;
