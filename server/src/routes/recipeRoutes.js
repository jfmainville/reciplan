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
	const { name, locations } = req.body;

	if (!name || !locations) {
		return res.status(422).send({ error: "You must provide a name and locations" });
	}

	try {
		const recipe = new Recipe({ userId: req.user._id, name, locations });
		await recipe.save();
		res.send(recipe);
	} catch (err) {
		return res.status(422).send({ error: err.message });
	}
});

module.exports = router;