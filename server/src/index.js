require("./models/User");
require("./models/Recipe");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const recipeRoutes = require("./routes/recipeRoutes");
const requireAuth = require("./middlewares/requireAuth");

const app = express();

app.use(bodyParser.json());
app.use(authRoutes);
app.use(recipeRoutes);

const mongoUri = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_URL}/${process.env.MONGODB_DATABASE_NAME}?retryWrites=true&w=majority`;
mongoose.connect(mongoUri);
mongoose.connection.on("connected", () => {
	console.log("Connected to mongo instance");
});
mongoose.connection.on("error", (err) => {
	console.error("Error connecting to mongo", err);
});

app.get("/", requireAuth, (req, res) => {
	res.send(`Your email: ${req.user.email}`);
});

app.listen(3000, () => {
	console.log("Listening on port 3000");
});