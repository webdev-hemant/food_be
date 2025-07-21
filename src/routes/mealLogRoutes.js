const express = require("express");
const { getUserDetails } = require("../middleware/getUserDetails");
const { createOrUpdateMealLog, getMealLogForDate } = require("../controllers/mealLogController");

const router = express.Router();

router.post("/create", getUserDetails, createOrUpdateMealLog);
router.get("/log/:date", getUserDetails, getMealLogForDate);

module.exports = router;
