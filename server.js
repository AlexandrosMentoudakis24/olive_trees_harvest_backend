const app = require("./app");

const { initMongoDB } = require("./services/db");

const serverPort = 8080;

require("dotenv").config();

initMongoDB().then((isDBInitialized) => {
	if (!isDBInitialized) {
		process.exit(1);
	}

	app.listen(serverPort, () => {
		console.log("Server is running on Port: ", serverPort);
	});
});
