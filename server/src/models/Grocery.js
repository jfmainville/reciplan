const mongoose = require("mongoose");

const grocerySchema = new mongoose.Schema({
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		name: {
			type: "String",
			default: ""
		},
		weightUnit: {
			type: "String",
			default: ""
		},
		quantity: {
			type: "Number",
			default: 0
		},
		checked: {
			type: "Boolean",
			default: false
		}
	},
	{
		timestamps: true
	});

mongoose.model("Grocery", grocerySchema);