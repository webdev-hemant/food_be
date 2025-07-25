const express = require("express");
const { getUserDetails } = require("../middleware/getUserDetails");
const {
  createRecipe,
  updateRecipe,
  getAllRecipes,
} = require("../controllers/recipeController");

const router = express.Router();

router.post("/create", getUserDetails, createRecipe);
router.put("/update/:id", getUserDetails, updateRecipe); // <-- changed to PUT with :id
router.get("/get-all-recipe", getUserDetails, getAllRecipes);

module.exports = router;
