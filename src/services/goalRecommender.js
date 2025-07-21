const { Op } = require('sequelize');
const sequelize = require('../config/db');
const macroTrackModel = require('../models/calorieMacroTracking');

function calculateMacroGap(target, consumed) {
  return {
    calories: target.calories - consumed.calories,
    protein: target.protein - consumed.protein,
    carbs: target.carbs - consumed.carbs,
    fats: target.fats - consumed.fats,
  };
}

async function getRecommendations(userId) {
  // Step 1: Find the latest date with logs
  const latestLog = await macroTrackModel.findOne({
    where: { userId },
    order: [['date', 'DESC']],
    attributes: ['date'],
    raw: true,
  });

  if (!latestLog) throw new Error('No logs found for user');

  const latestDate = latestLog.date;

  // Step 2: Get all entries for that date
  const logs = await macroTrackModel.findAll({
    where: {
      userId,
      date: latestDate,
    },
  });

  if (!logs.length) throw new Error('No macro logs found for the latest date');

  // Step 3: Sum consumption for that date
  const consumed = logs.reduce(
    (acc, entry) => ({
      calories: acc.calories + entry.calories,
      protein: acc.protein + entry.protein,
      carbs: acc.carbs + entry.carbs,
      fats: acc.fats + entry.fat,
    }),
    { calories: 0, protein: 0, carbs: 0, fats: 0 }
  );

  const target = {
    calories: 2000,
    protein: 150,
    carbs: 200,
    fats: 60,
  };

  const gap = calculateMacroGap(target, consumed);

  console.log('Latest Date:', latestDate);
  console.log('Target:', target);
  console.log('Consumed:', consumed);
  console.log('Gap:', gap);

  return [{'target': target},{'consumed': consumed},{'gap': gap}];
}

module.exports = { getRecommendations };
