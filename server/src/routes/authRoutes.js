const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const User = mongoose.model("User");

const router = express.Router();

router.post("/signup", async (req, res) => {
	const { email, password, deviceLanguage } = req.body;

	// Cleanup the email address
	const cleanEmail = (email.toLowerCase()).trim();

	try {
		const user = new User({ email: cleanEmail, password, language: deviceLanguage });
		await user.save();

		const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY);

		res.send({ token });
	} catch (err) {
		return res.status(422).send(err.message);
	}
});

router.post("/signin", async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return res.status(422).send({ error: "Must provide email and password" });
	}

	const user = await User.findOne({ email });

	if (!user) {
		return res.status(422).send({ error: "Invalid password or email" });
	}

	try {
		await user.comparePassword(password);

		const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY);
		res.send({ token });
	} catch (err) {
		return res.status(422).send({ error: "Invalid password or email" });
	}
});

module.exports = router;