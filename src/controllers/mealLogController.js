const MealLog = require("../models/mealLog");
const CalorieMacroTrack = require("../models/calorieMacroTracking");

exports.createOrUpdateMealLog = async (req, res) => {
  const userId = req.user.id;
  const { date, meals } = req.body;

  try {
    // Compute totals
    const totals = {
      calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0, water: 0,
    };

    for (const meal of meals) {
      for (const item of meal.items) {
        totals.calories += item.calories || 0;
        totals.protein += item.protein || 0;
        totals.carbs += item.carbs || 0;
        totals.fat += item.fat || 0;
        totals.fiber += item.fiber || 0;
        totals.water += item.water || 0;
      }
    }

    // Create or update calorie tracker
    const [track, created] = await CalorieMacroTrack.upsert({
      userId,
      date,
      ...totals,
    }, {
      returning: true,
      conflictFields: ['userId', 'date'],
    });

    const trackId = track.trackId || track.id;

    // Create or update meal log with trackId
    const [log, isNew] = await MealLog.upsert({
      userId,
      date,
      meals,
      trackId,
    }, {
      returning: true,
      conflictFields: ['userId', 'date'],
    });

    return res.status(200).json({
      message: isNew ? "Meal log created" : "Meal log updated",
      data: log,
    });

  } catch (err) {
    console.error("Error saving meal log:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getMealLogForDate = async (req, res) => {
  const userId = req.user.id;
  const date = req.params.date;

  try {
    const logs = await MealLog.findAll({ where: { userId, date } });

    if (!logs || logs.length === 0) {
      return res.status(404).json({ message: "No meal logs found for this date" });
    }

    res.status(200).json({ message: "Success", data: logs });
  } catch (err) {
    console.error("Error fetching meal logs:", err);
    res.status(500).json({ message: "Server error" });
  }
};

