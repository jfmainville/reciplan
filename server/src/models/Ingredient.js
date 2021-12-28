const mongoose = require("mongoose");

const ingredientSchema = new mongoose.Schema({
		name: {
			type: "String",
			ref: "User"
		},
		category: {
			type: "String",
			default: ""
		}
	}
);

mongoose.model("Ingredient", ingredientSchema);