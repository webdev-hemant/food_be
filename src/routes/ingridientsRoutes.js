const express = require("express");
const { getUserDetails } = require("../middleware/getUserDetails");
const {
  createIngredient,
  updateIngredient,
  getAllIngredients,
} = require("../controllers/ingredientController");

const router = express.Router();

router.post("/create", getUserDetails, createIngredient);
router.put("/update/:id", getUserDetails, updateIngredient);
router.get("/get-all-ingredients", getUserDetails, getAllIngredients);

module.exports = router;
