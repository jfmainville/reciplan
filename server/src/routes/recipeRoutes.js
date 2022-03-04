const express = require("express");
const mongoose = require("mongoose");
const requireAuth = require("../middlewares/requireAuth");

const Recipe = mongoose.model("Recipe");
const Ingredient = mongoose.model("Ingredient");

const router = express.Router();

// User must be signed in to access these routes
router.use(requireAuth);

router.get("/recipes", async (req, res) => {
	const recipes = await Recipe.find({ userId: req.user._id });
	res.send(recipes);
});

router.post("/recipes/create", async (req, res) => {
	const { recipeName, recipeStyle, recipePreparationTime, recipeCookTime, ingredients } = req.body;

	if (!recipeName || !ingredients) {
		return res.status(422).send({ error: "You must provide all the recipe information to continue" });
	}

	for (const ingredient of ingredients) {
		try {
			Ingredient.findOne({ 'translations.singular': (ingredient["name"]).toLowerCase() }, (err, doc) => {
				if (doc) {
					ingredient["name"] = doc["name"]
				}
			})
		} catch (err) {
			return res.status(422).send({ error: err.message });
		}
	}

	try {
		const recipe = new Recipe({
			name: recipeName,
			style: recipeStyle,
			preparationTime: recipePreparationTime,
			cookTime: recipeCookTime,
			ingredients: ingredients,
			userId: req.user._id
		});
		await recipe.save();
		res.send(recipe);
	} catch (err) {
		return res.status(422).send({ error: err.message });
	}
});

router.put("/recipes/update/:id", (req, res) => {
	const recipeId = req.params.id;
	const { recipeName, recipeStyle, recipePreparationTime, recipeCookTime, ingredients } = req.body;

	if (!recipeId || !recipeName || !recipeStyle || !recipePreparationTime || !recipeCookTime || !ingredients) {
		return res.status(422).send({ error: "You must provide all the recipe information to continue" });
	}

	for (const ingredient of ingredients) {
		try {
			Ingredient.findOne({ 'translations.singular': (ingredient["name"]).toLowerCase() }, (err, doc) => {
				if (doc) {
					ingredient["name"] = doc["name"]
				}
			})
		} catch (err) {
			return res.status(422).send({ error: err.message });
		}
	}

	try {
		Recipe.findById(recipeId, async (err, recipe) => {
			if (!recipe)
				return res.status(422).send({ error: err.message });
			else {
				recipe.name = recipeName;
				recipe.style = recipeStyle;
				recipe.preparationTime = recipePreparationTime;
				recipe.cookTime = recipeCookTime;
				recipe.ingredients = ingredients;
				recipe.userId = req.user._id;

				await recipe.save();
			}
			res.send(recipe);
		});
	} catch (err) {
		return res.status(422).send({ error: err.message });
	}
});

router.delete("/recipes/delete/:id", async (req, res) => {
	const recipeId = req.params.id;

	if (!recipeId) {
		return res.status(422).send({ error: "You must provide all the recipe information to continue" });
	}

	try {
		await Recipe.deleteOne({ _id: recipeId });
		res.send();
	} catch (err) {
		return res.status(422).send({ error: err.message });
	}
});

module.exports = router;