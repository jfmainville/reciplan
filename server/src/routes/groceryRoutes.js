const express = require("express");
const mongoose = require("mongoose");
const requireAuth = require("../middlewares/requireAuth");

const Grocery = mongoose.model("Grocery");

const router = express.Router();

// User must be signed in to access these routes
router.use(requireAuth);

router.get("/groceries", async (req, res) => {
	const groceries = await Grocery.find({ userId: req.user._id });
	res.send(groceries);
});

router.post("/groceries/ingredients", async (req, res) => {
	const { recipe } = req.body;

	const updatedRecipes = recipe.ingredients.map(ingredient => {
		delete ingredient._id;
		if (recipe._id) {
			ingredient.recipeId = recipe._id;
		} else {
			ingredient.recipeId = null;
		}
		ingredient.userId = req.user._id;
		return ingredient;
	});

	if (!recipe || !updatedRecipes) {
		return res.status(422).send({ error: "You must provide all the recipe information to continue" });
	}

	try {
		Grocery.insertMany(updatedRecipes);
		res.send(updatedRecipes);
	} catch (err) {
		return res.status(422).send({ error: err.message });
	}
});

router.post("/groceries/create", async (req, res) => {
	const { groceryQuantity, groceryWeightUnit, groceryName } = req.body;

	if (!groceryQuantity || !groceryWeightUnit || !groceryName) {
		return res.status(422).send({ error: "You must provide all the recipe information to continue" });
	}

	try {
		const groceryItem = new Grocery({
			quantity: groceryQuantity,
			weightUnit: groceryWeightUnit,
			name: groceryName,
			userId: req.user._id
		});
		await groceryItem.save();
		res.send();
	} catch (err) {
		return res.status(422).send({ error: err.message });
	}
});

router.delete("/groceries/delete/:name", async (req, res) => {
	const groceryName = req.params.name;

	if (!groceryName) {
		return res.status(422).send({ error: "You must provide all the recipe information to continue" });
	}

	try {
		await Grocery.deleteMany({ name: groceryName, userId: req.user._id });
		res.send();
	} catch (err) {
		return res.status(422).send({ error: err.message });
	}
});

module.exports = router;