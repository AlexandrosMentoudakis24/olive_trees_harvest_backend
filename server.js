require("dotenv").config();

const app = require("./app");
const { initMongoDB } = require("./services/db");

// Initialize MongoDB, but DO NOT block the export
initMongoDB()
	.then((isDBInitialized) => {
		if (!isDBInitialized) {
			console.error("MongoDB initialization failed. Exiting...");
			process.exit(1);
		} else {
			console.log("✅ MongoDB Connected Successfully");
		}
	})
	.catch((err) => {
		console.error("Error connecting to MongoDB:", err);
		process.exit(1);
	});

module.exports = app;
