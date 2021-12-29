const express = require("express");
const mongoose = require("mongoose");
const requireAuth = require("../middlewares/requireAuth");

const Ingredient = mongoose.model("Ingredient");

const router = express.Router();

// User must be signed in to access these routes
router.use(requireAuth);

router.post("/ingredients", async (req, res) => {
	const { ingredientName } = req.body;

	const ingredient = await Ingredient.find({ name: { $regex: ingredientName + ".*", "$options": "i" } });
	res.send(ingredient);
});

module.exports = router;