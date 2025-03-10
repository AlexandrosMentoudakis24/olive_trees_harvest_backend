const bodyParser = require("body-parser");
const express = require("express");

const expressApp = express();

const corsConfiguration = require("./middlewares/cors_configuration");

const oliveTreesHarvestRoutes = require("./routes/olive_trees_harvest/olive_trees_harvest");
const oliveTreesExpensesRoutes = require("./routes/olive_trees_harvest/olive_trees_expense");
const oliveMillingsRoutes = require("./routes/olive_trees_harvest/olive_milling");
const oliveSellingsRoutes = require("./routes/olive_trees_harvest/olive_selling");
const authRoutes = require("./routes/auth/auth");

expressApp.use(bodyParser.json({ limit: "250mb" }));
expressApp.use(bodyParser.urlencoded({ extended: true }));
expressApp.use(corsConfiguration);

expressApp.use("/auth", authRoutes);
expressApp.use("/oliveTreesHarvests", oliveTreesHarvestRoutes);
expressApp.use("/oliveTreesExpenses", oliveTreesExpensesRoutes);
expressApp.use("/oliveMillings", oliveMillingsRoutes);
expressApp.use("/oliveSellings", oliveSellingsRoutes);

expressApp.use((error, req, res, next) => {
	console.log(error);

	const status = error.statusCode || 500;
	const message = error.message;

	res.status(status).json({ message: message });
});

module.exports = expressApp;
