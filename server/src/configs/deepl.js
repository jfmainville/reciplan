const axios = require("axios")

const deeplTranslate = async (ingredientName, sourceLanguage, targetLanguage) => {
	const deeplTranslateUrl = `${process.env.DEEPL_URL}/v2/translate?auth_key=${process.env.DEEPL_API_KEY}`
	let response

	if (sourceLanguage) {
		response = await axios.post(deeplTranslateUrl + `&text=${ingredientName}&source_lang=${sourceLanguage}&target_lang=${targetLanguage}`)
	} else {
		response = await axios.post(deeplTranslateUrl + `&text=${ingredientName}&target_lang=${targetLanguage}`)
	}

	return response
}

module.exports = deeplTranslate;