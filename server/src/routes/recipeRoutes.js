const express = require("express");
const mongoose = require("mongoose");
const requireAuth = require("../middlewares/requireAuth");

const Recipe = mongoose.model("Recipe");

const router = express.Router();

// User must be signed in to access these routes
router.use(requireAuth);

router.get("/recipes", async (req, res) => {
	const recipes = await Recipe.find({ userId: req.user._id });
	res.send(recipes);
});

router.post("/recipes", async (req, res) => {
	const { recipeName, recipeStyle, recipePreparationTime, recipeCookTime } = req.body;

	if (!recipeName || !recipeStyle || !recipePreparationTime || !recipeCookTime) {
		return res.status(422).send({ error: "You must provide all the recipe information to continue" });
	}

	try {
		const recipe = new Recipe({
			name: recipeName,
			style: recipeStyle,
			preparationTime: recipePreparationTime,
			cookTime: recipeCookTime,
			userId: req.user._id
		});
		await recipe.save();
		res.send(recipe);
	} catch (err) {
		return res.status(422).send({ error: err.message });
	}
});

module.exports = router;