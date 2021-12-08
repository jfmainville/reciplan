const mongoose = require("mongoose");

const ingredientSchema = new mongoose.Schema({
	name: String,
	weight_unit: String,
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
	preparationTime: {
		type: "Number",
		default: ""
	},
	cookTime: {
		type: "Number",
		default: ""
	},
	ingredients: [ingredientSchema]
});

mongoose.model("Recipe", recipeSchema);