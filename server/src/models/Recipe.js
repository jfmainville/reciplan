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
		style: {
			type: "String",
			default: ""
		},
		preparationTime: {
			type: "Number",
			default: ""
		},
		cookTime: {
			type: "Number",
			default: ""
		},
		ingredients: [ingredientSchema]
	},
	{
		timestamps: true
	});

mongoose.model("Recipe", recipeSchema);