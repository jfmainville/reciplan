const express = require("express");
const mongoose = require("mongoose");
const pluralize = require("pluralize");
const deeplTranslate = require("../configs/deepl")
const requireAuth = require("../middlewares/requireAuth");

const Ingredient = mongoose.model("Ingredient");

const router = express.Router();

// User must be signed in to access these routes
router.use(requireAuth);

router.post("/ingredients/create", async (req, res) => {
		let { ingredientName } = req.body;

		if (!ingredientName) {
			return res.status(422).send({ error: "You must provide all the recipe information to continue" });
		}

		// Extract the translation for each ingredient
		const ingredientNameSource = await deeplTranslate(ingredientName, "FR", "EN")

		try {
			Ingredient.findOne({ name: ingredientNameSource["data"]["translations"][0]["text"] }, async (err, doc) => {
				if (!doc) {
					if (ingredientName === ingredientNameSource["data"]["translations"][0]["text"]) {
						const { data } = await deeplTranslate(ingredientName, "EN", "FR")
						const ingredient = new Ingredient({
							name: ingredientName,
							translations: [
								{
									singular: ingredientName,
									plural: pluralize(ingredientName),
									languageCode: "EN"
								},
								{
									singular: data["translations"][0]["text"],
									plural: pluralize(data["translations"][0]["text"]),
									languageCode: "FR"
								}
							]
						})
						await ingredient.save();
						res.send(ingredient);
					} else {
						const { data } = await deeplTranslate(ingredientName, null, "EN")
						const ingredient = new Ingredient({
							name: data["translations"][0]["text"],
							translations: [
								{
									singular: data["translations"][0]["text"],
									plural: pluralize(data["translations"][0]["text"]),
									languageCode: "EN"
								},
								{
									singular: ingredientName,
									plural: pluralize(ingredientName),
									languageCode: "FR"
								}
							]
						})
						await ingredient.save();
						res.send(ingredient);
					}
				} else {
					res.send(doc)
				}
			})
		} catch (err) {
			return res.status(422).send({ error: err.message });
		}
	}
)

module.exports = router;