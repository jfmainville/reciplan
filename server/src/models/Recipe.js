const mongoose = require("mongoose");

const ingredientSchema = new mongoose.Schema({
	name: String,
	weightUnit: String,
	quantity: Number
});

const recipeSchema = new mongoose.Schema({
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		name: {
			type: "String",
			default: ""
		},
		image: {
			type: "String",
			default: ""
		},
		style: {
			type: "String",
			default: ""
		},
		preparationTime: {
			type: "Number",
			default: 0
		},
		cookTime: {
			type: "Number",
			default: 0
		},
		ingredients: [ingredientSchema]
	},
	{
		timestamps: true
	});

module.exports = mongoose.model("Recipe", recipeSchema);