const express = require("express");
const bodyParser = require("body-parser");

const expressApp = express();

const authRoutes = require("./routes/auth/auth");

const oliveTreesHarvestRoutes = require("./routes/olive_trees_harvest/olive_trees_harvest");

const oliveTreesExpensesRoutes = require("./routes/olive_trees_harvest/olive_trees_expense");
const oliveMillingsRoutes = require("./routes/olive_trees_harvest/olive_milling");
const oliveSellingsRoutes = require("./routes/olive_trees_harvest/olive_selling");

const corsConfiguration = require("./middlewares/cors_configuration");
const { User } = require("./models/user");

expressApp.use(bodyParser.json({ limit: "100mb" }));
expressApp.use(bodyParser.urlencoded({ extended: true }));

expressApp.use(corsConfiguration);

expressApp.get("/hello", async (req, res, next) => {
	console.log("Test was successful.");

	const users = await User.find();

	res.status(200).send({ message: "Test Request worked.", user: users[0] });
});

expressApp.post("/demo", (req, res, next) => {
	const body = req.body;

	console.log(body);

	res.status(201).send({ message: "All good!" });
});

expressApp.use("/auth", authRoutes);

expressApp.use("/oliveTreesHarvests", oliveTreesHarvestRoutes);

expressApp.use("/oliveTreesExpenses", oliveTreesExpensesRoutes);

expressApp.use("/oliveMillings", oliveMillingsRoutes);
expressApp.use("/oliveSellings", oliveSellingsRoutes);

expressApp.use((error, req, res, next) => {
	const status = error.statusCode || 500;
	const message = error.message;

	res.status(status).json({ message: message });
});

module.exports = expressApp;
