const mongoose = require("mongoose");

const translationSchema = new mongoose.Schema({
    singular: String,
    plural: String,
    languageCode: String
});

const ingredientSchema = new mongoose.Schema({
        name: {
            type: "String",
            required: true
        },
        translations: [translationSchema]
    },
    {
        timestamps: true
    }
);

mongoose.model("Ingredient", ingredientSchema);