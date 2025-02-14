const path = require("path");
const fs = require("fs");

const bodyParser = require("body-parser");
const express = require("express");
const multer = require("multer");

const expressApp = express();

const authRoutes = require("./routes/auth/auth");

const oliveTreesHarvestRoutes = require("./routes/olive_trees_harvest/olive_trees_harvest");

const oliveTreesExpensesRoutes = require("./routes/olive_trees_harvest/olive_trees_expense");
const oliveMillingsRoutes = require("./routes/olive_trees_harvest/olive_milling");
const oliveSellingsRoutes = require("./routes/olive_trees_harvest/olive_selling");

const corsConfiguration = require("./middlewares/cors_configuration");
const {
	fileStorage,
	fileFilter,
} = require("./middlewares/multer_configuration");

const { User } = require("./models/user");

expressApp.use(bodyParser.json({ limit: "250mb" }));
expressApp.use(bodyParser.urlencoded({ extended: true }));

expressApp.use(
	multer({
		storage: fileStorage,
		fileFilter: fileFilter,
		limits: { fileSize: 5 * 1024 * 1024 },
	}).single("image"),
);

expressApp.use("/images", express.static(path.join(__dirname, "images")));

expressApp.use(corsConfiguration);

expressApp.get("/hello", async (req, res, next) => {
	console.log("Test was successful.");

	const users = await User.find();

	res.status(200).send({ message: "Test Request worked.", user: users[0] });
});

expressApp.use("/auth", authRoutes);

expressApp.use("/oliveTreesHarvests", oliveTreesHarvestRoutes);

expressApp.use("/oliveTreesExpenses", oliveTreesExpensesRoutes);

expressApp.use("/oliveMillings", oliveMillingsRoutes);
expressApp.use("/oliveSellings", oliveSellingsRoutes);

expressApp.use((error, req, res, next) => {
	console.log(error);

	if (req.file) {
		const imageFilePath = path.join(__dirname, req.file.path);

		fs.unlinkSync(imageFilePath);
	}

	const status = error.statusCode || 500;
	const message = error.message;

	res.status(status).json({ message: message });
});

module.exports = expressApp;
