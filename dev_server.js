require("dotenv").config();

const app = require("./app");
const { initMongoDB } = require("./services/db");

// Initialize MongoDB, but DO NOT block the export
initMongoDB().then((isDBInitialized) => {
	if (!isDBInitialized) {
		process.exit(1);
	}

	app.listen(8080, () => {
		console.log("Dev Server is running...");
	});
});

module.exports = app;
