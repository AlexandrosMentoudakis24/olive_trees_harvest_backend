const app = require("./app");

const { initMongoDB } = require("./services/db");

const serverPort = process.env.SERVER_CONNECTION_PORT;

initMongoDB().then((isDBInitialized) => {
	if (!isDBInitialized) {
		process.exit(1);
	}

	app.listen(serverPort, () => {
		console.log("Server is running on Port: ", serverPort);
	});
});
