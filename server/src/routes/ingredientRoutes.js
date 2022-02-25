const express = require("express");
const mongoose = require("mongoose");
const pluralize = require("pluralize");
const axios = require("axios");
const requireAuth = require("../middlewares/requireAuth");

const Ingredient = mongoose.model("Ingredient");

const router = express.Router();

// User must be signed in to access these routes
router.use(requireAuth);

router.post("/ingredients/create", async (req, res) => {
        let { ingredientName } = req.body;
        ingredientName = ingredientName.toLowerCase()

        if (!ingredientName) {
            return res.status(422).send({ error: "You must provide all the recipe information to continue" });
        }

        // Extract the translation for each ingredient
        const deeplTranslateUrl = `${process.env.DEEPL_URL}/v2/translate?auth_key=${process.env.DEEPL_API_KEY}`
        const ingredientNameSource = await axios.post(deeplTranslateUrl + `&text=${ingredientName}&source_lang=FR&target_lang=EN`)

        try {
            Ingredient.findOne({ name: ingredientNameSource["data"]["translations"][0]["text"] }, async (err, doc) => {
                if (!doc) {
                    if (ingredientName === ingredientNameSource["data"]["translations"][0]["text"]) {
                        const { data } = await axios.post(deeplTranslateUrl + `&text=${ingredientName}&source_lang=EN&target_lang=FR`)

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
                        const { data } = await axios.post(deeplTranslateUrl + `&text=${ingredientName}&target_lang=EN`)

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